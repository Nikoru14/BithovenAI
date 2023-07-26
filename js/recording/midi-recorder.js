import { Midi, Track, Note } from '@tonejs/midi';

class MidiRecorder {
    constructor() {
        this.recording = false;
        this.midi = new Midi();
        this.track = this.midi.addTrack();
        this.startTime = null;
        this.notesOn = {};
    }

    async startRecording() {
        this.recording = true;
        this.startTime = Date.now();
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
    }

    clearRecording() {
        this.midi = new Midi();
        this.track = this.midi.addTrack();
    }

    async saveRecording() {
        this.recording = false;
        let data = this.midi.toArray();
        let blob = new Blob([data], { type: "audio/midi" });
        let filename = "recording-" + new Date().toISOString() + ".mid";
        saveAs(blob, filename);
        return filename;
    }

    handleMIDIMessage(event) {
        console.log('Received MIDI message', event.data);
        if (!this.recording) return;
        console.log('Recording is active');
        let [status, noteNumber, velocity] = event.data;
        let messageType = status & 0xF0;
        let deltaTime = (Date.now() - this.startTime) / 1000;  // convert to seconds
        if (messageType === 0x90 && velocity > 0) {  // note on
            this.notesOn[noteNumber] = deltaTime;
            console.log('Note on message received');
        } else if ((messageType === 0x80) || (messageType === 0x90 && velocity === 0)) {  // note off
            let noteOnTime = this.notesOn[noteNumber];
            if (noteOnTime !== undefined) {
                let duration = deltaTime - noteOnTime;
                let channel = status & 0x0F;
                try {
                    this.track.addNote({
                        midi: noteNumber,
                        time: noteOnTime,
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
