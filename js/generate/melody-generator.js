import * as tf from '@tensorflow/tfjs';
import { Midi } from '@tonejs/midi';
import localforage from 'localforage';

class MelodyGenerator {
    constructor(modelConfig, mapping, reverse_mapping) {
        this.model = null;
        this.modelConfig = modelConfig;
        this.mapping = mapping;
        this.reverseMapping = reverse_mapping;
    }

    async loadModel() {
        console.log("Attempting to load model...");
        try {
            this.model = await tf.loadLayersModel(this.modelConfig.path);
            console.log("Model loaded successfully!");
        } catch (error) {
            console.error("Error loading the model:", error);
        }
    }

    async blobToArrayBuffer(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
        });
    }

    async generateMelody(seedMidi, noteCount, temparature) {
        console.log("Attempting to generate melody...");
        console.log("Seed MIDI:", seedMidi);
        try {
            if (!this.model) {
                console.error("Model is not loaded yet!");
                return;
            }
            console.log("seedMidi:", seedMidi);
            let arrayBuffer = await this.blobToArrayBuffer(seedMidi);
            console.log("arrayBuffer:", arrayBuffer);
            const seedNotes = this.parseMidi(arrayBuffer);
            console.log("seedNotes:", seedNotes);
            let seed = seedNotes.map(note => this.mapping[note]);
            console.log("seed:", seed);
            // Ensure the seed is the correct len  gth
            const length = 40;  // Or whatever length your model expects
            if (seed.length < length) {
                seed = Array(length - seed.length).fill(0).concat(seed);
            } else if (seed.length > length) {
                seed = seed.slice(seed.length - length);
            }

            // Normalize the seed
            seed = tf.tensor(seed).reshape([1, length, 1]).div(tf.scalar(Object.keys(this.mapping).length));

            let generatedNotes = [];

            for (let i = 0; i < noteCount;) {
                const prediction = this.model.predict(seed);

                // Temperature-like adjustment
                const temperature = temparature;
                const logits = tf.div(tf.log(prediction), temperature);
                const expPreds = tf.exp(logits);
                const probas = tf.div(expPreds, tf.sum(expPreds));
                const predictedNote = probas.argMax(1).dataSync()[0];

                if (this.reverseMapping[predictedNote] !== "0") {  // Check if predicted note is not "0"
                    generatedNotes.push(this.reverseMapping[predictedNote]);
                    i++;  // Increment only if valid note is added
                }

                // Always update the seed regardless of the predicted note
                const newNote = tf.tensor([predictedNote]).reshape([1, 1, 1]).div(tf.scalar(Object.keys(this.mapping).length));
                seed = seed.slice([0, 1, 0]).concat(newNote, 1);
            }

            console.log("Generated Notes:", generatedNotes);
            const decodedNotes = this.decodeGeneratedNotes(generatedNotes);
            console.log("Decoded Notes:", decodedNotes);

            return this.buildMidi(decodedNotes);  // Build MIDI from decoded notes
        } catch (error) {
            console.error("Error in generateMelody:", error);
        }
    }

    parseMidi(midiFile) {
        const midi = new Midi(midiFile);
        const notesAndChords = [];
        midi.tracks.forEach(track => {
            track.notes.forEach(note => {
                if (Array.isArray(note)) {
                    const chordNotes = note.map(n => n.name + n.octave);
                    notesAndChords.push(chordNotes.join('.'));
                } else {
                    notesAndChords.push(note.name);
                }
            });
        });
        return notesAndChords;
    }

    buildMidi(notesAndChords) {
        const midi = new Midi();
        const track = midi.addTrack();

        let currentTime = 0;
        const noteDurationInSeconds = 0.5;

        notesAndChords.forEach(item => {
            console.log("Processing note/chord:", item);

            if (item === "5") {
                console.log("Skipping problematic note:", item);
                return;
            }

            const midiNumbers = noteOrChordToMidi(item);
            midiNumbers.forEach(midiNumber => {
                track.addNote({
                    midi: midiNumber,
                    time: currentTime,  // use time property here instead of passing it as second argument
                    duration: noteDurationInSeconds,
                    velocity: 0.5
                });
            });

            // Move forward in the track by the duration of a note/chord
            currentTime += noteDurationInSeconds;
        });

        console.log("Generated MIDI Array:", midi.toArray());

        return midi.toArray();
    }



    async saveMiditoLocalforage(midiFile) {
        console.log("MIDI to be saved:", midiFile);
        let data = midiFile;
        let blob = new Blob([data], { type: "audio/midi" });
        let filename = "generated-" + new Date().toISOString() + ".mid";
        await localforage.setItem(filename, blob);
        console.log("Saved generated melody to local storage");
        return filename;
    }

    async combineInputWithGenerated(inputMidiBlob, generatedMidiArray) {
        // Convert input Blob to Midi object
        let inputArrayBuffer = await inputMidiBlob.arrayBuffer();
        let inputUint8Array = new Uint8Array(inputArrayBuffer);
        let inputMidi = new Midi(inputUint8Array);

        // Convert generatedMidiArray to Midi object
        let generatedMidi = new Midi(generatedMidiArray);

        // Calculate the total duration of the inputMidi
        let inputDuration = 0;
        for (let track of inputMidi.tracks) {
            for (let note of track.notes) {
                inputDuration = Math.max(inputDuration, note.time + note.duration);
            }
        }

        // Add a small padding to inputDuration
        inputDuration += 0;  // Add half a second padding, adjust as needed

        // Create a combined Midi object
        let combinedMidi = new Midi();

        // Add tracks from inputMidi
        for (let track of inputMidi.tracks) {
            let combinedTrack = combinedMidi.addTrack();
            for (let note of track.notes) {
                combinedTrack.addNote(note);
            }
        }

        // Add tracks from generatedMidi with adjusted time
        for (let track of generatedMidi.tracks) {
            let combinedTrack = combinedMidi.addTrack();
            for (let note of track.notes) {
                let adjustedNote = {
                    ...note,
                    time: note.time + inputDuration,
                };
                combinedTrack.addNote(adjustedNote);
            }
        }

        // Convert combined Midi object back to Blob for storage or download
        let combinedMidiArray = combinedMidi.toArray();
        // let combinedMidiBlob = new Blob([combinedMidiArray], { type: "audio/midi" });
        // let filename = "combined-" + new Date().toISOString() + ".mid";
        // await localforage.setItem(filename, combinedMidiBlob);

        return combinedMidiArray;
    }


    decodeGeneratedNotes(notes) {
        return notes.map(note => {
            if (note.includes('.')) { // It's a chord
                return note.split('.').map(this.decodePitch).join('.');
            } else { // It's a single note
                return this.decodePitch(note);
            }
        });
    }

    decodePitch(pitch) {
        const noteMapping = {
            "0": "C",
            "1": "C#",
            "2": "D",
            "3": "D#",
            "4": "E",
            "5": "F",
            "6": "F#",
            "7": "G",
            "8": "G#",
            "9": "A",
            "10": "A#",
            "11": "B"
        };

        if (Object.values(noteMapping).some(note => pitch.includes(note))) {
            return pitch;
        }

        const noteNumber = pitch.match(/\D+/) ? pitch.match(/\D+/)[0] : pitch;
        const octave = pitch.match(/\d+/) ? pitch.match(/\d+/)[0] : '';

        return noteMapping[noteNumber] + octave;
    }
}

const noteToMidiMap = {
    'C-1': 0, 'C#-1': 1, 'D-1': 2, 'D#-1': 3, 'E-1': 4, 'F-1': 5, 'F#-1': 6, 'G-1': 7, 'G#-1': 8, 'A-1': 9, 'A#-1': 10, 'B-1': 11,
    'C0': 12, 'C#0': 13, 'D0': 14, 'D#0': 15, 'E0': 16, 'F0': 17, 'F#0': 18, 'G0': 19, 'G#0': 20, 'A0': 21, 'A#0': 22, 'B0': 23,
    'C1': 24, 'C#1': 25, 'D1': 26, 'D#1': 27, 'E1': 28, 'F1': 29, 'F#1': 30, 'G1': 31, 'G#1': 32, 'A1': 33, 'A#1': 34, 'B1': 35,
    'C2': 36, 'C#2': 37, 'D2': 38, 'D#2': 39, 'E2': 40, 'F2': 41, 'F#2': 42, 'G2': 43, 'G#2': 44, 'A2': 45, 'A#2': 46, 'B2': 47,
    'C3': 48, 'C#3': 49, 'D3': 50, 'D#3': 51, 'E3': 52, 'F3': 53, 'F#3': 54, 'G3': 55, 'G#3': 56, 'A3': 57, 'A#3': 58, 'B3': 59,
    'C4': 60, 'C#4': 61, 'D4': 62, 'D#4': 63, 'E4': 64, 'F4': 65, 'F#4': 66, 'G4': 67, 'G#4': 68, 'A4': 69, 'A#4': 70, 'B4': 71,
    'C5': 72, 'C#5': 73, 'D5': 74, 'D#5': 75, 'E5': 76, 'F5': 77, 'F#5': 78, 'G5': 79, 'G#5': 80, 'A5': 81, 'A#5': 82, 'B5': 83,
    'C6': 84, 'C#6': 85, 'D6': 86, 'D#6': 87, 'E6': 88, 'F6': 89, 'F#6': 90, 'G6': 91, 'G#6': 92, 'A6': 93, 'A#6': 94, 'B6': 95,
    'C7': 96, 'C#7': 97, 'D7': 98, 'D#7': 99, 'E7': 100, 'F7': 101, 'F#7': 102, 'G7': 103, 'G#7': 104, 'A7': 105, 'A#7': 106, 'B7': 107,
    'C8': 108, 'C#8': 109, 'D8': 110, 'D#8': 111, 'E8': 112, 'F8': 113, 'F#8': 114, 'G8': 115, 'G#8': 116, 'A8': 117, 'A#8': 118, 'B8': 119,
    'C9': 120, 'C#9': 121, 'D9': 122, 'D#9': 123, 'E9': 124, 'F9': 125, 'F#9': 126, 'G9': 127
};

// Function to convert a note name to its corresponding MIDI note number
function noteToMidi(noteName) {
    return noteToMidiMap[noteName];
}

function noteOrChordToMidi(input) {
    // Split the input by '.' to check if it's a chord
    const parts = input.split('.');

    // Map each part to its MIDI note number
    const midiValues = parts.map(part => {
        // Check if the note is out of range and adjust if necessary
        if (!noteToMidiMap[part]) {
            if (parseInt(part.slice(-1)) > 8) {
                part = part.slice(0, -1) + "8"; // Set to 8th octave
            } else if (parseInt(part.slice(-2)) < -1) {
                part = part.slice(0, -2) + "-1"; // Set to -1 octave
            }
        }
        if (noteToMidiMap[part] !== undefined) {
            return noteToMidiMap[part];
        }
        // If the part isn't found in the map, return null
        return null;
    });

    // Filter out null values
    return midiValues.filter(value => value !== null);
}




export default MelodyGenerator;
