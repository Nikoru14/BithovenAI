import { Render } from "./Rendering/Render.js"
import { UI } from "./ui/UI.js"
import { InputListeners } from "./InputListeners.js"
import { getPlayer, getPlayerState } from "./player/Player.js"
import { loadJson } from "./Util.js"
import { FileLoader } from "./player/FileLoader.js"
import { clear } from "localforage"

/**
 *
 *
 * TODOs:
 *
 * UI:
 * - Accessability
 * - Mobile
 * - Load from URL / circumvent CORS.. Extension?
 * - channel menu
 * - added song info to "loaded songs"
 * - fix the minimize button
 * - Fix fullscreen on mobile
 *
 * Audio
 * - Figure out how to handle different ADSR envelopes / release times for instruments
 * - implement control messages for
 * 		- sostenuto pedal
 * 			- only keys that are pressed while pedal is hit are sustained
 * 		- soft pedal
 * 			- how does that affect sound?
 * - implement pitch shift
 * - settings for playalong:
 * 		- accuracy needed
 * 		- different modes
 *
 * MISC
 * - add starting songs from piano-midi
 * - make instrument choosable for tracks
 * - Metronome
 * - Update readme - new screenshot, install/ run instructions
 * - Choose License
 * -
 * -
 *
 *
 *
 * bugs:
 * - Fix iOS
 * - too long notes disappear too soon
 */
let ui
let loading


function displayAuthMessage() {
	const style = document.createElement('style');
	style.textContent = `
	body {
		margin: 0;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f0;
		font-family: Arial, sans-serif;
	}
	.auth-message {
		text-align: center;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		background-color: white;
		max-width: 300px;
	}
	.auth-message p {
		font-size: 18px;
		color: #333;
		margin: 0 0 10px;
	}
	.auth-message button {
		padding: 10px 15px;
		border: none;
		border-radius: 5px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		font-size: 16px;
	}
	.auth-message button:hover {
		background-color: #0056b3;
	}
    `;
	document.head.appendChild(style);

	const messageContainer = document.createElement('div');
	messageContainer.className = 'auth-message';
	messageContainer.innerHTML = `
	<p>You must be logged in to access this page.</p>
	<button onclick="location.reload()">Reload</button>
    `;

	document.body.innerHTML = '';
	document.body.appendChild(messageContainer);
}

let isInitialized = false;
let isMessageReceived = false;

window.addEventListener('message', (event) => {
	if (event.data === 'initialize') {
		isMessageReceived = true;
		if (!isInitialized) {
			isInitialized = true;
			initApp();
		}
	}
});

window.onload = () => {
	if (!isMessageReceived) {
		displayAuthMessage();
	}
};

async function initApp() {
	if (isInitialized) {
		clearAuthMessage();
		await init();
		loading = true;
		// renderLoop();
		// loadStartingSong();
	} else {
		displayAuthMessage();
	}
}

function clearAuthMessage() {
	// Check if the auth message element exists and remove it
	const authMessageElement = document.querySelector('.auth-message');
	if (authMessageElement) {
		authMessageElement.parentNode.removeChild(authMessageElement);
	}
}
let listeners

async function init() {
	render = new Render()
	ui = new UI(render)
	listeners = new InputListeners(ui, render)
	renderLoop()

	loadStartingSong()

	loadJson("./js/data/exampleSongs.json", json =>
		ui.setExampleSongs(JSON.parse(json))
	)
}

let render
function renderLoop() {
	render.render(getPlayerState())
	window.requestAnimationFrame(renderLoop)
}
async function loadStartingSong() {
	const domain = window.location.href
	let url = "https://midiano.com/mz_331_3.mid?raw=true" // "https://bewelge.github.io/piano-midi.de-Files/midi/alb_esp1.mid?raw=true" //
	if (domain.split("github").length > 1) {
		url = "https://Bewelge.github.io/MIDIano/mz_331_3.mid?raw=true"
	}

	FileLoader.loadSongFromURL(url, (response, fileName) =>
		getPlayer().loadSong(response, fileName, "Mozart - Turkish March")
	) // Local: "../mz_331_3.mid")
}
