import { Midi, Track, Note } from '@tonejs/midi';
import localforage from 'localforage';

class MidiRecorder {
    constructor() {
        this.recording = false;
        this.midi = new Midi();
        this.track = this.midi.addTrack();
        this.startTime = null;
        this.pauseTime = null;
        this.totalTime = 0;
        this.currentTrack = null;
        this.totalPauseDuration = 0;
        this.notesOn = {};
        this.firstNotePlayed = false;
        this.recordedTracks = [];
        this.tracks = [];
    }

    async startRecording() {
        if (this.recording) {
            console.log("Already recording.");
            return;
        }

        this.recording = true;

        // Start a new track
        this.currentTrack = this.midi.addTrack();
        this.firstNotePlayed = false;  // Set to false when starting a new recording

        let midiAccess = await navigator.requestMIDIAccess();

        console.log("MIDI access granted. Enumerating inputs...");

        let inputs = midiAccess.inputs.values();
        let inputCount = 0;
        for (let input of inputs) {
            console.log(`Setting up message handler for input ${input.id} (${input.name})`);
            input.onmidimessage = this.handleMIDIMessage.bind(this);
            inputCount++;
        }

        console.log(`${inputCount} MIDI input(s) found.`);
    }

    pauseRecording() {
        this.recording = false;
        // If we are pausing, calculate the total time recorded so far and save the pause time
        if (this.startTime !== null) {
            this.totalTime += (Date.now() - this.startTime) / 1000;
            this.pauseTime = Date.now();
            this.startTime = null;
        }
        // Complete any notes that are currently playing
        for (let noteNumber in this.notesOn) {
            if (this.notesOn.hasOwnProperty(noteNumber)) {
                let noteOnData = this.notesOn[noteNumber];
                let noteOnTime = noteOnData.deltaTime;
                let noteOffTime = (Date.now() - this.startTime) / 1000 - this.totalPauseDuration;
                let duration = noteOffTime - noteOnTime;

                // Ensure duration is not negative
                if (duration < 0) {
                    console.error(`Negative duration for note ${noteNumber}: ${duration}`);
                    duration = 0;
                }

                try {
                    this.track.addNote({
                        midi: noteNumber,
                        time: Math.max(noteOnTime, 0),  // Ensure time is not negative
                        duration: duration,
                        velocity: 127 / 127,  // Use a default velocity for completed notes
                        channel: 0,  // Use a default channel for completed notes
                    });
                    console.log('Note completed on pause');
                } catch (error) {
                    console.log('Error adding note to track:', error);
                }

                delete this.notesOn[noteNumber];
            }
        }
        // Add current track to the list of tracks and reset the current track
        this.recordedTracks.push(this.track);
        this.track = this.midi.addTrack();
    }


    clearRecording() {
        this.recording = false;  // Set to false when clearing the recording
        this.midi = new Midi();
        this.track = this.midi.addTrack();
        this.startTime = null;
        this.totalTime = 0;
        this.pauseTime = 0;
        this.currentTrack = null;
        this.tracks = [];
        this.recordedTracks = [];
        this.notesOn = {};
        this.totalPauseDuration = 0;
        this.firstNotePlayed = false;
    }

    async saveRecording(key) {
        this.recording = false;
        try {
            let data = await localforage.getItem(key);
            let filename = key;
            await saveAs(data, filename);
            return filename;
        } catch (err) {
            console.log("Error to local storage:", err);
            return null;
        }
    }

    async saveRecordingToLocalStorage() {
        if (this.recording) {
            this.pauseRecording();
            this.recording = false;
        }
        // Create a new Midi instance to combine all the tracks
        let finalMidi = new Midi();

        let totalTime = 0;  // Keep track of the total time of all tracks

        for (let track of this.recordedTracks) {
            let finalTrack = finalMidi.addTrack();
            for (let note of track.notes) {
                // Adjust the note time by the total time of all previous tracks
                let adjustedNote = {
                    ...note,
                    time: note.time + totalTime,
                };
                finalTrack.addNote(adjustedNote);
            }
            // Update the total time for the next track
            totalTime += track.duration;
        }

        let data = finalMidi.toArray();
        let blob = new Blob([data], { type: "audio/midi" });
        let filename = "recording-" + new Date().toISOString() + ".mid";
        await localforage.setItem(filename, blob);
        console.log("Saved recording to local storage");
        return filename;
    }

    isFirstNotePlayed() {
        return this.firstNotePlayed;
    }

    handleMIDIMessage(event) {
        console.log('Received MIDI message', event.data);
        if (!this.recording || !this.firstNotePlayed && event.data[2] === 0) return;
        console.log('Recording is active');
        let [status, noteNumber, velocity] = event.data;
        let messageType = status & 0xF0;

        if (messageType === 0x90 && velocity > 0) {  // note on
            // If this is the first note, set the start time
            if (this.startTime === null) {
                this.startTime = Date.now();
                this.firstNotePlayed = true;
            }

            let deltaTime = (Date.now() - this.startTime) / 1000 - this.totalPauseDuration;
            this.notesOn[noteNumber] = { start: Date.now(), deltaTime: deltaTime };
            console.log('Note on message received');
        } else if ((messageType === 0x80) || (messageType === 0x90 && velocity === 0)) {  // note off
            let noteOnData = this.notesOn[noteNumber];

            if (noteOnData !== undefined) {
                let noteOnTime = noteOnData.deltaTime;
                let noteOffTime = (Date.now() - this.startTime) / 1000 - this.totalPauseDuration;
                let duration = noteOffTime - noteOnTime;

                // Ensure duration is not negative
                if (duration < 0) {
                    console.error(`Negative duration for note ${noteNumber}: ${duration}`);
                    duration = 0;
                }

                let channel = status & 0x0F;

                try {
                    this.track.addNote({
                        midi: noteNumber,
                        time: Math.max(noteOnTime, 0),  // Ensure time is not negative
                        duration: duration,
                        velocity: velocity / 127,
                        channel: channel,
                    });
                    console.log('Note added to track');
                } catch (error) {
                    console.log('Error adding note to track:', error);
                }

                delete this.notesOn[noteNumber];
            }
        }
    }
}

export default MidiRecorder;
