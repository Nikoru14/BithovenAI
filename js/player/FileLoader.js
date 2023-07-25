import { getLoader } from "../ui/Loader.js"
import localforage from "localforage"

export class FileLoader {
	static async loadSongFromURL(url, callback) {
		getLoader().setLoadMessage(`Loading Song from ${url}`)
		const response = fetch(url, {
			method: "GET"
		}).then(response => {
			const filename = url
			response.blob().then(blob => {
				const reader = new FileReader()
				reader.onload = function (theFile) {
					callback(reader.result, filename, () => { })
				}
				reader.readAsDataURL(blob)
			})
		})
	}

	static async loadSongFromLocalStorage(key, callback) {
		getLoader().setLoadMessage(`Loading Song from LocalStorage with key ${key}`);
		const midiDataUri = await localforage.getItem(key);

		// Check if the data was retrieved successfully
		if (midiDataUri) {
			// Pass the data to the callback function
			callback(midiDataUri, key, () => { });
		} else {
			console.error('Error loading MIDI data:', err);
		}
	}
}
