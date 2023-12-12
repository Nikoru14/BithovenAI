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

        this.updateTotalTime();

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
        if (!this.recording) {
            console.warn("Cannot pause because recording is not active.");
            return;
        }
        this.recording = false;

        const now = performance.now();
        if (this.startTime !== null) {
            this.totalTime += (now - this.startTime) / 1000;
            this.pauseTime = now;
            this.startTime = null;
        }

        // Complete any notes that are currently "on"
        for (const noteNumber in this.notesOn) {
            if (this.notesOn.hasOwnProperty(noteNumber)) {
                const noteOnData = this.notesOn[noteNumber];
                const noteDuration = (now - noteOnData.startTime) / 1000;
                this.track.addNote({
                    midi: noteNumber,
                    time: noteOnData.deltaTime,
                    duration: noteDuration,
                    velocity: 127 / 127
                });
                console.log(`Note ${noteNumber} completed at pause`);
            }
        }

        // Clear the notesOn since we've just completed them
        this.notesOn = {};

        // Track the total pause duration
        this.totalPauseDuration += (now - this.pauseTime) / 1000;

        // Push the current track to the recorded tracks and prepare a new one
        this.recordedTracks.push(this.track);
        this.track = this.midi.addTrack();

        console.log("Recording paused.");
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
        if (!this.recording) return;

        const [status, noteNumber, velocity] = event.data;
        const messageType = status & 0xF0;
        const now = event.receivedTime || performance.now(); // Use high-resolution time if available

        if (messageType === 0x90 && velocity > 0) {  // note on
            if (!this.firstNotePlayed) {
                this.startTime = now;
                this.firstNotePlayed = true;
            }
            const deltaTime = (now - this.startTime) / 1000 - this.totalPauseDuration;
            this.notesOn[noteNumber] = { startTime: now, deltaTime: deltaTime };
            console.log('Note on message received');
        } else if ((messageType === 0x80) || (messageType === 0x90 && velocity === 0)) {  // note off
            const noteOnData = this.notesOn[noteNumber];
            if (noteOnData) {
                const duration = (now - noteOnData.startTime) / 1000;
                this.track.addNote({
                    midi: noteNumber,
                    time: noteOnData.deltaTime,
                    duration: duration,
                    velocity: velocity / 127
                });
                delete this.notesOn[noteNumber];
                console.log('Note off message received');
            }
        }
    }
    // After each recording session
    updateTotalTime() {
        if (this.recordedTracks.length > 0) {
            const lastTrack = this.recordedTracks[this.recordedTracks.length - 1];
            const lastNote = lastTrack.notes[lastTrack.notes.length - 1];
            if (lastNote) {
                this.totalTime = lastNote.time + lastNote.duration;
            }
        }
    }
}

export default MidiRecorder;
