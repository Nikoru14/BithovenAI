import { Track, NoteEvent, Writer } from 'midi-writer-js';
import localforage from 'localforage';

class MidiRecorder {
    constructor() {
        this.recording = false;
        this.track = new Track();
        this.startTime = null;
        this.notesOn = {};
    }

    async startRecording() {
        this.recording = true;
        this.startTime = Date.now();
        let midiAccess = await navigator.requestMIDIAccess();
        let inputs = midiAccess.inputs.values();
        for (let input of inputs) {
            input.onmidimessage = this.handleMIDIMessage.bind(this);
        }
    }

    pauseRecording() {
        this.recording = false;
    }

    clearRecording() {
        this.track = new Track();
    }

    async saveRecording() {
        this.recording = false;
        let write = new Writer(this.track);
        let midiBlob = write.blob();
        let filename = "recording-" + new Date().toISOString() + ".midi";
        await localforage.setItem(filename, midiBlob);
        return filename;
    }

    handleMIDIMessage(event) {
        if (!this.recording) return;
        let [status, note, velocity] = event.data;
        let deltaTime = Date.now() - this.startTime;
        if (status === 144) {  // note on
            this.notesOn[note] = deltaTime;
        } else if (status === 128) {  // note off
            let noteOnTime = this.notesOn[note];
            if (noteOnTime !== undefined) {
                let durationInMilliseconds = deltaTime - noteOnTime;
                // Convert duration from milliseconds to ticks
                // 500 ms (a quarter note at 120 BPM) is 128 ticks
                let durationInTicks = (durationInMilliseconds / 500) * 128;
                this.track.addEvent(new NoteEvent({ pitch: [note], duration: durationInTicks, velocity: velocity, wait: noteOnTime }));
                delete this.notesOn[note];
            }
        }
    }

}

export default MidiRecorder;
