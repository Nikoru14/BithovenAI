/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/InputListeners.js":
/*!******************************!*\
  !*** ./js/InputListeners.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputListeners: () => (/* binding */ InputListeners)
/* harmony export */ });
/* harmony import */ var _player_Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player/Player.js */ "./js/player/Player.js");
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings/Settings.js */ "./js/settings/Settings.js");



class InputListeners {
	constructor(ui, render) {
		this.grabSpeed = []
		this.delay = false

		this.addMouseAndTouchListeners(render, ui)

		document.body.addEventListener("wheel", this.onWheel())

		this.addProgressBarMouseListeners(render)

		window.addEventListener("keydown", this.onKeyDown(ui))

		ui.setOnMenuHeightChange(val => render.onMenuHeightChanged(val))

		ui.fireInitialListeners()

		let player = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)()
		render.setPianoInputListeners(
			player.addInputNoteOn.bind(player),
			player.addInputNoteOff.bind(player)
		)
	}

	addMouseAndTouchListeners(render, ui) {
		window.addEventListener("mouseup", ev => this.onMouseUp(ev, render))
		document.body.addEventListener(
			"mousedown",
			ev => this.onMouseDown(ev, render),
			{ passive: false }
		)
		document.body.addEventListener(
			"mousemove",
			ev => this.onMouseMove(ev, render, ui),
			{ passive: false }
		)
		window.addEventListener("touchend", ev => this.onMouseUp(ev, render), {
			passive: false
		})
		document.body.addEventListener(
			"touchstart",
			ev => this.onMouseDown(ev, render),
			{ passive: false }
		)
		document.body.addEventListener(
			"touchmove",
			ev => this.onMouseMove(ev, render, ui),
			{ passive: false }
		)
	}

	addProgressBarMouseListeners(render) {
		render
			.getProgressBarCanvas()
			.addEventListener("mousemove", this.onMouseMoveProgressCanvas(render))
		render
			.getProgressBarCanvas()
			.addEventListener("mousedown", this.onMouseDownProgressCanvas(render))
	}

	onWheel() {
		return event => {
			if (event.target != document.body) {
				return
			}
			if (this.delay) {
				return
			}
			this.delay = true

			let alreadyScrolling = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().scrolling != 0

			//Because Firefox does not set .wheelDelta
			let wheelDelta = event.wheelDelta ? event.wheelDelta : -1 * event.deltaY

			let evDel =
				((wheelDelta + 1) / (Math.abs(wheelDelta) + 1)) *
				Math.min(500, Math.abs(wheelDelta))

			var wheel = (evDel / Math.abs(evDel)) * 500

			;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().scrolling -= 0.001 * wheel
			if (!alreadyScrolling) {
				(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().handleScroll()
			}
			this.delay = false
		}
	}

	onKeyDown(ui) {
		return e => {
			if (!(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().isFreeplay) {
				if (e.code == "Space") {
					e.preventDefault()
					if (!(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().paused) {
						ui.clickPause(e)
					} else {
						ui.clickPlay(e)
					}
				} else if (e.code == "ArrowUp") {
					(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().increaseSpeed(0.05)
					ui.getSpeedDisplayField().value =
						Math.floor((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().playbackSpeed * 100) + "%"
				} else if (e.code == "ArrowDown") {
					(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().increaseSpeed(-0.05)
					ui.getSpeedDisplayField().value =
						Math.floor((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().playbackSpeed * 100) + "%"
				} else if (e.code == "ArrowLeft") {
					(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().setTime((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().getTime() - 5)
				} else if (e.code == "ArrowRight") {
					(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().setTime((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().getTime() + 5)
				}
			}
		}
	}

	onMouseDownProgressCanvas(render) {
		return ev => {
			ev.preventDefault()
			if (ev.target == render.getProgressBarCanvas()) {
				this.grabbedProgressBar = true
				;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().wasPaused = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().paused
				;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().pause()
				let newTime =
					(ev.clientX / render.renderDimensions.windowWidth) *
					((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().song.getEnd() / 1000)

				;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().setTime(newTime)
			}
		}
	}

	onMouseMoveProgressCanvas(render) {
		return ev => {
			if (this.grabbedProgressBar && (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().song) {
				let newTime =
					(ev.clientX / render.renderDimensions.windowWidth) *
					((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().song.getEnd() / 1000)
				;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().setTime(newTime)
			}
		}
	}

	onMouseMove(ev, render, ui) {
		let pos = this.getXYFromMouseEvent(ev)
		if (this.grabbedProgressBar && (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().song) {
			let newTime =
				(ev.clientX / render.renderDimensions.windowWidth) *
				((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().song.getEnd() / 1000)
			;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().setTime(newTime)
			return
		}

		if (this.grabbedMainCanvas && (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().song) {
			if (this.lastYGrabbed) {
				let alreadyScrolling = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().scrolling != 0
				let yChange =
					((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("reverseNoteDirection") ? -1 : 1) *
					(this.lastYGrabbed - pos.y)
				if (!alreadyScrolling) {
					(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().setTime(
						(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().getTime() - render.getTimeFromHeight(yChange)
					)
					this.grabSpeed.push(yChange)
					if (this.grabSpeed.length > 3) {
						this.grabSpeed.splice(0, 1)
					}
				}
			}
			this.lastYGrabbed = pos.y
		}

		render.setMouseCoords(ev.clientX, ev.clientY)

		ui.mouseMoved()
	}

	onMouseDown(ev, render) {
		let pos = this.getXYFromMouseEvent(ev)
		if (
			ev.target == document.body &&
			render.isOnMainCanvas(pos) &&
			!this.grabbedProgressBar
		) {
			(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().wasPaused = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().paused
			ev.preventDefault()
			this.grabbedMainCanvas = true
			;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().pause()
		}
	}

	onMouseUp(ev, render) {
		let pos = this.getXYFromMouseEvent(ev)
		if (ev.target == document.body && render.isOnMainCanvas(pos)) {
			ev.preventDefault()
		}
		if (this.grabSpeed.length) {
			(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().scrolling = this.grabSpeed[this.grabSpeed.length - 1] / 50
			;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().handleScroll()
			this.grabSpeed = []
		}
		if (this.grabbedProgressBar || this.grabbedMainCanvas) {
			if (!(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().wasPaused) {
				(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().resume()
			}
		}
		this.grabbedProgressBar = false
		this.grabbedMainCanvas = false
		this.lastYGrabbed = false
	}

	getXYFromMouseEvent(ev) {
		if (ev.clientX == undefined) {
			if (ev.touches.length) {
				return {
					x: ev.touches[ev.touches.length - 1].clientX,
					y: ev.touches[ev.touches.length - 1].clientY
				}
			} else {
				return { x: -1, y: -1 }
			}
		}
		return { x: ev.clientX, y: ev.clientY }
	}
}


/***/ }),

/***/ "./js/MicInputHandler.js":
/*!*******************************!*\
  !*** ./js/MicInputHandler.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentMicFrequency: () => (/* binding */ getCurrentMicFrequency),
/* harmony export */   getCurrentMicNote: () => (/* binding */ getCurrentMicNote),
/* harmony export */   getMicInputHandler: () => (/* binding */ getMicInputHandler)
/* harmony export */ });
class MicInputHandler {
	constructor() {
		if (navigator.mediaDevices === undefined) {
			navigator.mediaDevices = {}
		}

		if (navigator.mediaDevices.getUserMedia === undefined) {
			navigator.mediaDevices.getUserMedia = function (constraints) {
				// First get ahold of the legacy getUserMedia, if present
				var getUserMedia =
					navigator.webkitGetUserMedia ||
					navigator.mozGetUserMedia ||
					navigator.msGetUserMedia

				// Some browsers just don't implement it - return a rejected promise with an error
				// to keep a consistent interface
				if (!getUserMedia) {
					return Promise.reject(
						new Error("getUserMedia is not implemented in this browser")
					)
				}

				// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
				return new Promise(function (resolve, reject) {
					getUserMedia.call(navigator, constraints, resolve, reject)
				})
			}
		}
		this.frequencies = {}
		this.lastStrongestFrequency = 0
		let audioContext = new (window.AudioContext || window.webkitAudioContext)({
			sampleRate: 8000
		})
		var source
		var analyser = audioContext.createAnalyser()
		analyser.minDecibels = -90
		analyser.maxDecibels = -10
		analyser.smoothingTimeConstant = 0.5
		this.audioContext = audioContext
		this.analyser = analyser

		if (navigator.mediaDevices.getUserMedia) {
			console.log("getUserMedia supported.")
			var constraints = { audio: true }
			navigator.mediaDevices
				.getUserMedia(constraints)
				.then(
					function (stream) {
						source = audioContext.createMediaStreamSource(stream)
						// source.connect(audioContext.destination)
						source.connect(analyser)

						// this.getCurrentFrequency()
					}.bind(this)
				)
				.catch(function (err) {
					console.log("The following gUM error occured: " + err)
				})
		}
	}
	getCurrentFrequency() {
		this.analyser.fftSize = 2048
		var bufferLength = this.analyser.fftSize
		var dataArray = new Float32Array(bufferLength)
		this.analyser.getFloatTimeDomainData(dataArray)
		return this.autoCorrelate(dataArray, this.audioContext.sampleRate)

		// var dataArray = new Uint8Array(bufferLength)
		// this.analyser.getByteFrequencyData(dataArray)
		// let maxIndex = 0
		// let max = -Infinity
		// let tot = dataArray.reduce((a, b) => a + b, 0)
		// let weightedFrequency = 0
		// let strongestFrequency = 0
		// let sampleRate = this.audioContext.sampleRate
		// dataArray.forEach((value, index) => {
		// 	if (value > max && value > 50) {
		// 		max = value
		// 		maxIndex = index

		// 		strongestFrequency = (sampleRate / 2) * (index / bufferLength)

		// 		if (index > 0 && index < bufferLength) {
		// 			let nextFreq = (sampleRate / 2) * ((index + 1) / bufferLength)
		// 			let nextVal = dataArray[index + 1]
		// 			let nextDiff = Math.abs(nextVal - value)

		// 			let prevFreq = (sampleRate / 2) * ((index - 1) / bufferLength)
		// 			let prevVal = dataArray[index - 1]
		// 			let prevDiff = Math.abs(prevVal - value)

		// 			let totVals = value + prevVal + nextVal
		// 			let totDiff = nextDiff + prevDiff

		// 			strongestFrequency =
		// 				(strongestFrequency * value) / totVals +
		// 				(nextVal / totVals) * nextFreq +
		// 				(prevVal / totVals) * prevFreq
		// 		}
		// 	}
		// 	weightedFrequency +=
		// 		(value / tot) * (sampleRate / 2) * (index / bufferLength)
		// })
		// if (max > 0) {
		// 	console.log(strongestFrequency)
		// }
		// return strongestFrequency
	}
	autoCorrelate(buf, sampleRate) {
		// Implements the ACF2+ algorithm
		var SIZE = buf.length
		var rms = 0

		for (var i = 0; i < SIZE; i++) {
			var val = buf[i]
			rms += val * val
		}
		rms = Math.sqrt(rms / SIZE)
		if (rms < 0.01)
			// not enough signal
			return -1

		var r1 = 0,
			r2 = SIZE - 1,
			thres = 0.2
		for (var i = 0; i < SIZE / 2; i++)
			if (Math.abs(buf[i]) < thres) {
				r1 = i
				break
			}
		for (var i = 1; i < SIZE / 2; i++)
			if (Math.abs(buf[SIZE - i]) < thres) {
				r2 = SIZE - i
				break
			}

		buf = buf.slice(r1, r2)
		SIZE = buf.length

		var c = new Array(SIZE).fill(0)
		for (var i = 0; i < SIZE; i++)
			for (var j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i]

		var d = 0
		while (c[d] > c[d + 1]) d++
		var maxval = -1,
			maxpos = -1
		for (var i = d; i < SIZE; i++) {
			if (c[i] > maxval) {
				maxval = c[i]
				maxpos = i
			}
		}
		var T0 = maxpos

		var x1 = c[T0 - 1],
			x2 = c[T0],
			x3 = c[T0 + 1]
		let a = (x1 + x3 - 2 * x2) / 2
		let b = (x3 - x1) / 2
		if (a) T0 = T0 - b / (2 * a)

		return sampleRate / T0
	}
	frequencyToNote(frequency) {
		let note = 12 * (Math.log(frequency / 440) / Math.log(2))
		return Math.round(note) + 48
	}

	setupUserMedia() {
		if (navigator.mediaDevices === undefined) {
			navigator.mediaDevices = {}
		}

		if (navigator.mediaDevices.getUserMedia === undefined) {
			navigator.mediaDevices.getUserMedia = function (constraints) {
				// First get ahold of the legacy getUserMedia, if present
				var getUserMedia =
					navigator.webkitGetUserMedia ||
					navigator.mozGetUserMedia ||
					navigator.msGetUserMedia

				// Some browsers just don't implement it - return a rejected promise with an error
				// to keep a consistent interface
				if (!getUserMedia) {
					return Promise.reject(
						new Error("getUserMedia is not implemented in this browser")
					)
				}

				// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
				return new Promise(function (resolve, reject) {
					getUserMedia.call(navigator, constraints, resolve, reject)
				})
			}
		}
	}
}

var theMicInputHandler = null // new MicInputHandler()

const getMicInputHandler = () => {
	return theMicInputHandler
}
const getCurrentMicFrequency = () => {
	if (!theMicInputHandler) return -1
	return theMicInputHandler.getCurrentFrequency()
}

const getCurrentMicNote = () => {
	if (!theMicInputHandler) return -1
	return theMidInputHandler.frequencyToNote(
		theMicInputHandler.getCurrentFrequency()
	)
}


/***/ }),

/***/ "./js/MidiInputHandler.js":
/*!********************************!*\
  !*** ./js/MidiInputHandler.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMidiHandler: () => (/* binding */ getMidiHandler)
/* harmony export */ });
class MidiInputHandler {
	constructor() {
		// patch up prefixes
		window.AudioContext = window.AudioContext || window.webkitAudioContext

		this.noMidiMessage =
			"You will only be able to play Midi-Files. To play along, you need to use a browser with Midi-support, connect a Midi-Device to your computer and reload the page."
		this.init()
	}
	init() {
		if (navigator.requestMIDIAccess)
			navigator
				.requestMIDIAccess()
				.then(this.onMIDIInit.bind(this), this.onMIDIReject.bind(this))
		else
			alert(
				"No MIDI support present in your browser.  Check https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess#Browser_compatibility to see which Browsers support this feature."
			)
	}
	getAvailableInputDevices() {
		try {
			return Array.from(this.midiAccess.inputs.values())
		} catch (e) {
			return []
		}
	}
	getAvailableOutputDevices() {
		try {
			return Array.from(this.midiAccess.outputs.values())
		} catch (e) {
			return []
		}
	}
	setNoteOnCallback(callback) {
		this.noteOnCallback = callback
	}
	addInput(device) {
		device.onmidimessage = this.MIDIMessageEventHandler.bind(this)
	}
	clearInput(device) {
		device.onmidimessage = null
	}
	addOutput(device) {
		this.activeOutput = device
	}
	clearOutput(device) {
		if (this.activeOutput == device) {
			this.activeOutput = null
		}
	}
	clearInputs() {
		Array.from(this.midiAccess.inputs.values()).forEach(
			device => (device.onmidimessage = null)
		)
	}
	isDeviceActive(device) {
		return device.onmidimessage != null
	}
	isOutputDeviceActive(device) {
		return this.activeOutput == device
	}
	onMIDIInit(midi) {
		this.midiAccess = midi
	}
	setNoteOffCallback(callback) {
		this.noteOffCallback = callback
	}
	onMIDIReject(err) {
		alert("The MIDI system failed to start. " + this.noMidiMessage)
	}

	MIDIMessageEventHandler(event) {
		// Mask off the lower nibble (MIDI channel, which we don't care about)
		switch (event.data[0] & 0xf0) {
			case 0x90:
				if (event.data[2] != 0) {
					// if velocity != 0 => note-on
					this.noteOnCallback(parseInt(event.data[1]) - 21)
					return
				}
			case 0x80:
				this.noteOffCallback(parseInt(event.data[1]) - 21)
				return
		}
	}
	getActiveMidiOutput() {
		return this.activeOutput
	}
	isOutputActive() {
		return this.activeOutput ? true : false
	}
	isInputActive() {
		let devices = this.getAvailableInputDevices()
		for (let i = 0; i < devices.length; i++) {
			if (this.isDeviceActive(devices[i])) {
				return true
			}
		}
		return false
	}
	playNote(noteNumber, velocity, noteOffVelocity, delayOn, delayOff) {
		let noteOnEvent = [0x90, noteNumber, velocity]
		let noteOffEvent = [0x80, noteNumber, noteOffVelocity]
		this.activeOutput.send(noteOnEvent, window.performance.now() + delayOn)
		this.activeOutput.send(noteOffEvent, window.performance.now() + delayOff)
	}
	midiOutNoteOff() {}
	noteOnCallback() {}
	noteOffCallback() {}
}
const theMidiHandler = new MidiInputHandler()
const getMidiHandler = () => {
	return theMidiHandler
}


/***/ }),

/***/ "./js/MidiLoader.js":
/*!**************************!*\
  !*** ./js/MidiLoader.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MidiLoader: () => (/* binding */ MidiLoader)
/* harmony export */ });
class MidiLoader {
	/**
	 *
	 * @param {String} url
	 */
	static async loadFile(url) {
		const response = await fetch(url)
		if (response.ok) {
			let arrayBuffer = await response.arrayBuffer()
			if (arrayBuffer) {
				arrayBuffer = new Uint8Array(arrayBuffer)

				return parseMidi(arrayBuffer)
			}
		} else {
			throw new Error(`could not load ${url}`)
		}
	}
}
function parseMidi(data) {
	var p = new Parser(data)

	var headerChunk = p.readChunk()
	if (headerChunk.id != "MThd")
		throw "Bad MIDI file.  Expected 'MHdr', got: '" + headerChunk.id + "'"
	var header = parseHeader(headerChunk.data)

	var tracks = []
	for (var i = 0; !p.eof() && i < header.numTracks; i++) {
		var trackChunk = p.readChunk()
		if (trackChunk.id != "MTrk")
			throw "Bad MIDI file.  Expected 'MTrk', got: '" + trackChunk.id + "'"
		var track = parseTrack(trackChunk.data)
		tracks.push(track)
	}

	let midiData = {
		header: header,
		tracks: tracks
	}

	let temporalData = Parser.setTemporal(midiData)
	return {
		header: header,
		tracks: tracks,
		temporalData: temporalData
	}
}

function parseHeader(data) {
	var p = new Parser(data)

	var format = p.readUInt16()
	var numTracks = p.readUInt16()

	var result = {
		format: format,
		numTracks: numTracks
	}

	var timeDivision = p.readUInt16()
	if (timeDivision & 0x8000) {
		result.framesPerSecond = 0x100 - (timeDivision >> 8)
		result.ticksPerFrame = timeDivision & 0xff
	} else {
		result.ticksPerBeat = timeDivision
	}

	return result
}

function parseTrack(data) {
	let parser = new Parser(data)

	let events = []
	while (!parser.eof()) {
		let event = readEvent()
		events.push(event)
	}

	return events

	var lastEventTypeByte = null

	function readEvent() {
		var event = {}
		event.deltaTime = parser.readVarInt()

		var eventTypeByte = parser.readUInt8()

		if ((eventTypeByte & 0xf0) === 0xf0) {
			// system / meta event
			if (eventTypeByte === 0xff) {
				// meta event
				event.meta = true
				var metatypeByte = parser.readUInt8()
				var length = parser.readVarInt()
				switch (metatypeByte) {
					case 0x00:
						event.type = "sequenceNumber"
						if (length !== 2)
							throw (
								"Expected length for sequenceNumber event is 2, got " + length
							)
						event.number = parser.readUInt16()
						return event
					case 0x01:
						event.type = "text"
						event.text = parser.readString(length)
						return event
					case 0x02:
						event.type = "copyrightNotice"
						event.text = parser.readString(length)
						return event
					case 0x03:
						event.type = "trackName"
						event.text = parser.readString(length)
						return event
					case 0x04:
						event.type = "instrumentName"
						event.text = parser.readString(length)
						return event
					case 0x05:
						event.type = "lyrics"
						event.text = parser.readString(length)
						return event
					case 0x06:
						event.type = "marker"
						event.text = parser.readString(length)
						return event
					case 0x07:
						event.type = "cuePoint"
						event.text = parser.readString(length)
						return event
					case 0x20:
						event.type = "channelPrefix"
						if (length != 1)
							throw (
								"Expected length for channelPrefix event is 1, got " + length
							)
						event.channel = parser.readUInt8()
						return event
					case 0x21:
						event.type = "portPrefix"
						if (length != 1)
							throw "Expected length for portPrefix event is 1, got " + length
						event.port = parser.readUInt8()
						return event
					case 0x2f:
						event.type = "endOfTrack"
						if (length != 0)
							throw "Expected length for endOfTrack event is 0, got " + length
						return event
					case 0x51:
						event.type = "setTempo"
						if (length != 3)
							throw "Expected length for setTempo event is 3, got " + length
						event.microsecondsPerBeat = parser.readUInt24()
						return event
					case 0x54:
						event.type = "smpteOffset"
						if (length != 5)
							throw "Expected length for smpteOffset event is 5, got " + length
						var hourByte = parser.readUInt8()
						var FRAME_RATES = { 0x00: 24, 0x20: 25, 0x40: 29, 0x60: 30 }
						event.frameRate = FRAME_RATES[hourByte & 0x60]
						event.hour = hourByte & 0x1f
						event.min = parser.readUInt8()
						event.sec = parser.readUInt8()
						event.frame = parser.readUInt8()
						event.subFrame = parser.readUInt8()
						return event
					case 0x58:
						event.type = "timeSignature"
						if (length != 4)
							throw (
								"Expected length for timeSignature event is 4, got " + length
							)
						event.numerator = parser.readUInt8()
						event.denominator = 1 << parser.readUInt8()
						event.metronome = parser.readUInt8()
						event.thirtyseconds = parser.readUInt8()
						return event
					case 0x59:
						event.type = "keySignature"
						if (length != 2)
							throw "Expected length for keySignature event is 2, got " + length
						event.key = parser.readInt8()
						event.scale = parser.readUInt8()
						return event
					case 0x7f:
						event.type = "sequencerSpecific"
						event.data = parser.readBytes(length)
						return event
					default:
						event.type = "unknownMeta"
						event.data = parser.readBytes(length)
						event.metatypeByte = metatypeByte
						return event
				}
			} else if (eventTypeByte == 0xf0) {
				event.type = "sysEx"
				var length = parser.readVarInt()
				event.data = parser.readBytes(length)
				return event
			} else if (eventTypeByte == 0xf7) {
				event.type = "endSysEx"
				var length = parser.readVarInt()
				event.data = parser.readBytes(length)
				return event
			} else {
				throw "Unrecognised MIDI event type byte: " + eventTypeByte
			}
		} else {
			// channel event
			var param1
			if ((eventTypeByte & 0x80) === 0) {
				// running status - reuse lastEventTypeByte as the event type.
				// eventTypeByte is actually the first parameter
				if (lastEventTypeByte === null)
					throw "Running status byte encountered before status byte"
				param1 = eventTypeByte
				eventTypeByte = lastEventTypeByte
				event.running = true
			} else {
				param1 = parser.readUInt8()
				lastEventTypeByte = eventTypeByte
			}
			var eventType = eventTypeByte >> 4
			event.channel = eventTypeByte & 0x0f
			switch (eventType) {
				case 0x08:
					event.type = "noteOff"
					event.midiNoteNumber = param1
					event.noteNumber = param1 - 21
					event.velocity = parser.readUInt8()
					return event
				case 0x09:
					var velocity = parser.readUInt8()
					event.type = velocity === 0 ? "noteOff" : "noteOn"
					event.midiNoteNumber = param1
					event.noteNumber = param1 - 21
					event.velocity = velocity
					if (velocity === 0) event.byte9 = true
					return event
				case 0x0a:
					event.type = "noteAftertouch"
					event.midiNoteNumber = param1
					event.noteNumber = param1 - 21
					event.amount = parser.readUInt8()
					return event
				case 0x0b:
					event.type = "controller"
					event.controllerType = param1
					event.value = parser.readUInt8()
					return event
				case 0x0c:
					event.type = "programChange"
					event.programNumber = param1
					return event
				case 0x0d:
					event.type = "channelAftertouch"
					event.amount = param1
					return event
				case 0x0e:
					event.type = "pitchBend"
					event.value = param1 + (parser.readUInt8() << 7) - 0x2000
					return event
				default:
					throw "Unrecognised MIDI event type: " + eventType
			}
		}
	}
}

class Parser {
	constructor(data) {
		this.buffer = data
		this.bufferLen = this.buffer.length
		this.pos = 0
	}

	eof() {
		return this.pos >= this.bufferLen
	}
	readUInt8() {
		let result = this.buffer[this.pos]
		this.pos += 1
		return result
	}
	readInt8() {
		let u = this.readUInt8()
		return u & 0x80 ? u - 0x100 : u
	}
	readUInt16() {
		let b0 = this.readUInt8()
		let b1 = this.readUInt8()
		return (b0 << 8) + b1
	}
	readInt16() {
		let u = this.readUInt16()
		return u & 0x8000 ? u - 0x10000 : u
	}
	readUInt24() {
		let b0 = this.readUInt8()
		let b1 = this.readUInt8()
		let b2 = this.readUInt8()
		return (b0 << 16) + (b1 << 8) + b2
	}
	readInt24() {
		let u = this.readUInt24()
		return u & 0x800000 ? u - 0x1000000 : u
	}
	readUInt32() {
		let b0 = this.readUInt8()
		let b1 = this.readUInt8()
		let b2 = this.readUInt8()
		let b3 = this.readUInt8()
		return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3
	}
	readBytes(length) {
		let bytes = this.buffer.slice(this.pos, this.pos + length)
		this.pos += length
		return bytes
	}
	readString(length) {
		let bytes = this.readBytes(length)
		return String.fromCharCode.apply(null, bytes)
	}
	readVarInt() {
		let result = 0
		while (!this.eof()) {
			let b = this.readUInt8()
			if (b & 0x80) {
				result += b & 0x7f
				result <<= 7
			} else {
				return result + b
			}
		}
		return result
	}
	readChunk() {
		let id = this.readString(4)
		let length = this.readUInt32()
		let data = this.readBytes(length)
		return {
			id: id,
			data: data,
			length: length
		}
	}

	/*********
	 * <ADAPTED FROM JASMID>
	 * Replayer.js
	 *********/
	static setTemporal(midiObj) {
		let trackStates = []
		let beatsPerMinute = 120
		let ticksPerBeat = midiObj.header.ticksPerBeat
		var totTime = 0
		var bpms = []
		var generatedBeats = 0
		var beatsBySecond = { 0: [0] }
		var sustainsBySecond = {}
		let channels = getDefaultChannels()
		for (let t in midiObj.tracks) {
			let track = midiObj.tracks[t]
			trackStates.push({
				nextEventIndex: 0,
				ticksToNextEvent: track.length ? track[0].deltaTime : null
			})
		}
		var midiEvent

		function getNextEvent() {
			var ticksToNextEvent = null
			var nextEventTrack = null
			var nextEventIndex = null

			//search all tracks for next event.
			for (var i = 0; i < trackStates.length; i++) {
				if (
					trackStates[i].ticksToNextEvent != null &&
					(ticksToNextEvent == null ||
						trackStates[i].ticksToNextEvent < ticksToNextEvent)
				) {
					ticksToNextEvent = trackStates[i].ticksToNextEvent
					nextEventTrack = i
					nextEventIndex = trackStates[i].nextEventIndex
				}
			}
			if (nextEventTrack != null) {
				// get next event from that track and
				var nextEvent = midiObj.tracks[nextEventTrack][nextEventIndex]
				if (midiObj.tracks[nextEventTrack][nextEventIndex + 1]) {
					trackStates[nextEventTrack].ticksToNextEvent +=
						midiObj.tracks[nextEventTrack][nextEventIndex + 1].deltaTime
				} else {
					trackStates[nextEventTrack].ticksToNextEvent = null
				}
				trackStates[nextEventTrack].nextEventIndex += 1
				// advance timings on all tracks
				for (var i = 0; i < trackStates.length; i++) {
					if (trackStates[i].ticksToNextEvent != null) {
						trackStates[i].ticksToNextEvent -= ticksToNextEvent
					}
				}
				return {
					ticksToEvent: ticksToNextEvent,
					event: nextEvent,
					track: nextEventTrack
				}
			} else {
				return null
			}
		} //end getNextEvent

		function processNext() {
			let newBPM = false
			if (midiEvent.event.type == "setTempo") {
				// tempo change events can occur anywhere in the middle and affect events that follow
				beatsPerMinute = 60000000 / midiEvent.event.microsecondsPerBeat
				newBPM = true
			}
			if (
				midiEvent.event.type == "controller" &&
				midiEvent.event.controllerType == 7
			) {
				channels[midiEvent.event.channel].volume = midiEvent.event.value
			}

			var beatsToGenerate = 0
			var secondsToGenerate = 0
			if (midiEvent.ticksToEvent > 0) {
				beatsToGenerate = midiEvent.ticksToEvent / ticksPerBeat
				secondsToGenerate = beatsToGenerate / (beatsPerMinute / 60)
			}
			var time = secondsToGenerate * 1000 || 0
			midiEvent.event.temporalDelta = time
			totTime += time
			midiEvent.event.timestamp = totTime

			//Keep track of sustain on/offs
			if (
				midiEvent.event.type == "controller" &&
				midiEvent.event.controllerType == 64
			) {
				let currentSecond = Math.floor(totTime / 1000)
				if (!sustainsBySecond.hasOwnProperty(currentSecond)) {
					sustainsBySecond[currentSecond] = []
				}
				sustainsBySecond[currentSecond].push({
					timestamp: totTime,
					isOn: midiEvent.event.value > 64,
					value: midiEvent.event.value
				})
			}

			//keep track of completed beats to show beatLines
			generatedBeats +=
				Math.floor(ticksPerBeat * beatsToGenerate) / ticksPerBeat
			while (generatedBeats >= 1) {
				generatedBeats -= 1
				let beatTime = totTime - generatedBeats * secondsToGenerate * 1000
				let beatSecond = Math.floor(beatTime / 1000)
				if (!beatsBySecond.hasOwnProperty(beatSecond)) {
					beatsBySecond[beatSecond] = []
				}
				beatsBySecond[beatSecond].push(beatTime)
			}

			if (midiEvent.event.hasOwnProperty("channel")) {
				midiEvent.event.channelVolume = channels[midiEvent.event.channel].volume
			}
			midiEvent = getNextEvent()
			if (newBPM) {
				bpms.push({
					bpm: beatsPerMinute,
					timestamp: totTime
				})
			}
		} //end processNext

		if ((midiEvent = getNextEvent())) {
			while (midiEvent) processNext(true)
		}
		/*********
		 * </ADAPTED FROM JASMID>
		 *********/
		return { bpms, beatsBySecond, sustainsBySecond: sustainsBySecond }
	}
}

function getDefaultChannels() {
	let channels = {}
	for (var i = 0; i <= 15; i++) {
		channels[i] = {
			instrument: i,
			pitchBend: 0,
			volume: 127,
			volumeControl: 50,
			mute: false,
			mono: false,
			omni: false,
			solo: false
		}
	}
	channels[9].instrument = -1
	return channels
}


/***/ }),

/***/ "./js/Rendering/BackgroundRender.js":
/*!******************************************!*\
  !*** ./js/Rendering/BackgroundRender.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackgroundRender: () => (/* binding */ BackgroundRender)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");


/**
 * Class that renders the background of the main canvas
 */
class BackgroundRender {
	constructor(ctx, renderDimensions) {
		this.ctx = ctx
		this.renderDimensions = renderDimensions
		this.renderDimensions.registerResizeCallback(this.render.bind(this))
		this.render()
	}
	renderIfColorsChanged() {
		if (
			this.col1 != (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("bgCol1") ||
			this.col2 != (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("bgCol2") ||
			this.col3 != (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("bgCol3") ||
			this.pianoPosition != (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("pianoPosition")
		) {
			this.render()
		}
	}
	render() {
		let c = this.ctx
		c.clearRect(
			0,
			0,
			this.renderDimensions.windowWidth,
			this.renderDimensions.windowHeight
		)

		let reversed = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("reverseNoteDirection")
		let bgHeight = reversed
			? this.renderDimensions.windowHeight -
			  this.renderDimensions.getAbsolutePianoPosition()
			: this.renderDimensions.getAbsolutePianoPosition()
		let bgY = reversed ? this.renderDimensions.getAbsolutePianoPosition() : 0
		const col1 = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("bgCol1")
		const col2 = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("bgCol2")
		const col3 = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("bgCol3")
		c.strokeStyle = col1
		c.fillStyle = col2
		let whiteKey = 0
		for (let i = 0; i < 88; i++) {
			if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.isBlack)(i)) {
				c.strokeStyle = col3
				c.fillStyle = (i + 2) % 2 ? col1 : col2
				c.lineWidth = 1

				let dim = this.renderDimensions.getKeyDimensions(i)
				c.fillRect(dim.x, bgY, dim.w, bgHeight)

				if (1 + (whiteKey % 7) == 3) {
					c.lineWidth = 2
					c.beginPath()
					c.moveTo(dim.x, bgY)
					c.lineTo(dim.x, bgY + bgHeight)
					c.stroke()
					c.closePath()
				}
				whiteKey++
			}
		}
		this.col1 = col1
		this.col2 = col2
		this.col3 = col3
		this.pianoPosition = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("pianoPosition")
	}
}


/***/ }),

/***/ "./js/Rendering/DebugRender.js":
/*!*************************************!*\
  !*** ./js/Rendering/DebugRender.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DebugRender: () => (/* binding */ DebugRender)
/* harmony export */ });
/* harmony import */ var _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/CONST.js */ "./js/data/CONST.js");
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");




/**
 * Class to render some general debug-info or when mouse is hovered over a note.
 */
class DebugRender {
	constructor(active, ctx, renderDimensions) {
		this.noteInfoBoxesToDraw = []
		this.active = active
		this.ctx = ctx
		this.renderDimensions = renderDimensions

		this.fpsFilterStrength = 5
		this.frameTime = 0
		this.lastTimestamp = window.performance.now()
	}
	addNote(note) {
		this.noteInfoBoxesToDraw.push(note)
	}
	render(renderInfos, mouseX, mouseY, menuHeight) {
		this.thisTimestamp = window.performance.now()
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("showFps")) {
			let timePassed = this.thisTimestamp - this.lastTimestamp
			this.frameTime += (timePassed - this.frameTime) / this.fpsFilterStrength
			this.ctx.font = "20px Arial black"
			this.ctx.fillStyle = "rgba(255,255,255,0.8)"
			this.ctx.fillText(
				(1000 / this.frameTime).toFixed(0) + " FPS",
				20,
				menuHeight + 60
			)
		}

		this.lastTimestamp = this.thisTimestamp

		this.renderNoteDebugInfo(renderInfos, mouseX, mouseY)
	}
	renderNoteDebugInfo(renderInfos, mouseX, mouseY) {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("showNoteDebugInfo")) {
			let amountOfNotesDrawn = 0
			Object.keys(renderInfos).forEach(trackIndex => {
				renderInfos[trackIndex].black
					.filter(renderInfo =>
						this.isMouseInRenderInfo(renderInfo, mouseX, mouseY)
					)
					.forEach(renderInfo => {
						this.drawNoteInfoBox(renderInfo, mouseX, mouseY, amountOfNotesDrawn)
						amountOfNotesDrawn++
					})
				renderInfos[trackIndex].white
					.filter(renderInfo =>
						this.isMouseInRenderInfo(renderInfo, mouseX, mouseY)
					)
					.forEach(renderInfo => {
						this.drawNoteInfoBox(renderInfo, mouseX, mouseY, amountOfNotesDrawn)
						amountOfNotesDrawn++
					})
			})
		}
	}
	isMouseInRenderInfo(renderInfo, mouseX, mouseY) {
		return (
			mouseX > renderInfo.x &&
			mouseX < renderInfo.x + renderInfo.w &&
			mouseY > renderInfo.y &&
			mouseY < renderInfo.y + renderInfo.h
		)
	}

	drawNoteInfoBox(renderInfo, mouseX, mouseY, amountOfNotesDrawn) {
		let c = this.ctx
		c.fillStyle = "white"
		c.font = "12px Arial black"
		c.textBaseline = "top"
		c.strokeStyle = renderInfo.fillStyle
		c.lineWidth = 4

		let lines = [
			"Note: " + _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__.CONST.MIDI_NOTE_TO_KEY[renderInfo.noteNumber],
			"NoteNumber: " + renderInfo.noteNumber,
			"MidiNoteNumber: " + renderInfo.midiNoteNumber,
			"Start: " + renderInfo.timestamp,
			"End: " + renderInfo.offTime,
			"Duration: " + renderInfo.duration,
			"Velocity: " + renderInfo.velocity,
			"Instrument: " + renderInfo.instrument,
			"Track: " + renderInfo.track,
			"Channel: " + renderInfo.channel
		]
		let left = mouseX > this.renderDimensions.windowWidth / 2 ? -160 : 60
		let top =
			mouseY > this.renderDimensions.windowHeight / 2
				? -10 - 14 * lines.length
				: 10

		top += amountOfNotesDrawn * lines.length * 15
		c.beginPath()
		c.moveTo(mouseX + left - 4, mouseY + top)
		c.lineTo(mouseX + left - 4, mouseY + top + lines.length * 14)
		c.stroke()
		for (let l in lines) {
			c.fillText(lines[l], mouseX + left, mouseY + top + 14 * l)
		}
	}
}


/***/ }),

/***/ "./js/Rendering/InSongTextRenderer.js":
/*!********************************************!*\
  !*** ./js/Rendering/InSongTextRenderer.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InSongTextRenderer: () => (/* binding */ InSongTextRenderer)
/* harmony export */ });
/* harmony import */ var _player_Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player/Player.js */ "./js/player/Player.js");
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");



/**
 * Class to render the markers in the midi-song
 */
class InSongTextRenderer {
	constructor(ctx, renderDimensions) {
		this.ctx = ctx
		this.renderDimensions = renderDimensions
	}
	render(time) {
		if (time > -0.7) return

		let c = this.ctx
		c.fillStyle = "rgba(255,255,255,0.8)"
		c.strokeStyle = "rgba(255,255,255,0.8)"
		c.font = "40px Arial black"
		c.textBaseline = "top"
		c.lineWidth = 1.5
		let text = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentSong)().name
		let y = this.renderDimensions.getYForTime(-700 - time * 1000)
		let txtWd = c.measureText(text).width
		c.fillText(text, this.renderDimensions.windowWidth / 2 - txtWd / 2, y + 3)
	}
}


/***/ }),

/***/ "./js/Rendering/MarkerRenderer.js":
/*!****************************************!*\
  !*** ./js/Rendering/MarkerRenderer.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarkerRenderer: () => (/* binding */ MarkerRenderer)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");


/**
 * Class to render the markers in the midi-song
 */
class MarkerRenderer {
	constructor(ctx, renderDimensions) {
		this.ctx = ctx
		this.renderDimensions = renderDimensions
	}
	render(time, markers) {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showMarkersSong")) {
			let lookAheadTime = Math.ceil(
				time + this.renderDimensions.getSecondsDisplayedBefore() + 1
			)

			let c = this.ctx
			c.fillStyle = "rgba(255,255,255,0.8)"
			c.strokeStyle = "rgba(255,255,255,0.8)"
			c.font = "25px Arial black"
			c.textBaseline = "top"
			c.lineWidth = 1.5
			markers.forEach(marker => {
				if (
					marker.timestamp / 1000 >= time &&
					marker.timestamp / 1000 < lookAheadTime
				) {
					let y = this.renderDimensions.getYForTime(
						marker.timestamp - time * 1000
					)
					let txtWd = c.measureText(marker.text).width
					c.fillText(
						marker.text,
						this.renderDimensions.windowWidth / 2 - txtWd / 2,
						y + 3
					)
					c.beginPath()
					c.moveTo(0, y)
					c.lineTo(this.renderDimensions.windowWidth, y)
					c.closePath()
					c.stroke()
				}
			})
		}
	}
}


/***/ }),

/***/ "./js/Rendering/MeasureLinesRender.js":
/*!********************************************!*\
  !*** ./js/Rendering/MeasureLinesRender.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeasureLinesRender: () => (/* binding */ MeasureLinesRender)
/* harmony export */ });
/**
 * Class to render measure lines on the main canvas.
 */
class MeasureLinesRender {
	constructor(ctx, renderDimensions) {
		this.ctx = ctx
		this.renderDimensions = renderDimensions
	}
	render(time, measureLines) {
		let ctx = this.ctx

		ctx.strokeStyle = "rgba(255,255,255,0.3)"

		ctx.lineWidth = 0.5
		let currentSecond = Math.floor(time)
		ctx.beginPath()
		let firstSecondShown =
			currentSecond - this.renderDimensions.getSecondsDisplayedAfter() - 1
		let lastSecondShown =
			currentSecond + this.renderDimensions.getSecondsDisplayedBefore() + 1
		for (let i = firstSecondShown; i < lastSecondShown; i++) {
			if (!measureLines[i]) {
				continue
			}
			measureLines[i].forEach(tempoLine => {
				let ht = this.renderDimensions.getYForTime(tempoLine - time * 1000)

				ctx.moveTo(0, ht)
				ctx.lineTo(this.renderDimensions.windowWidth, ht)
			})
		}
		ctx.closePath()
		ctx.stroke()
	}
}


/***/ }),

/***/ "./js/Rendering/NoteParticleRender.js":
/*!********************************************!*\
  !*** ./js/Rendering/NoteParticleRender.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoteParticleRender: () => (/* binding */ NoteParticleRender)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");


/**
 * Particles handler
 */
class NoteParticleRender {
	constructor(ctx, renderDimensions) {
		this.ctx = ctx
		this.renderDimensions = renderDimensions
		this.particles = new Map()
	}
	createParticles(x, y, w, h, color, velocity) {
		let amnt = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleAmount")
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showParticlesTop")) {
			for (let i = 0; i < Math.random() * 0.5 * amnt + 0.5 * amnt; i++) {
				let rndX = x + 3 + w * 0.5 + w * 0.5 * (-1 + 2 * Math.random())
				let motX =
					(Math.random() - Math.random()) * 0.5 * (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleSpeed")
				let motY =
					(-Math.random() * (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleSpeed") * velocity) / 127
				let radius =
					(0.5 + 0.5 * Math.random()) * (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleSize") + 0.5
				rndX -= radius / 2
				let lifeTime = Math.random() * (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleLife") + 2
				this.createParticle(rndX, y, motX, motY, radius, color, lifeTime)
			}
		}
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showParticlesBottom")) {
			for (let i = 0; i < Math.random() * 0.5 * amnt + 0.5 * amnt; i++) {
				let rndX = x + 3 + w * 0.5 + w * 0.5 * (-1 + 2 * Math.random())
				let motX =
					(Math.random() - Math.random()) * 0.5 * (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleSpeed")
				let motY =
					(-Math.random() * (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleSpeed") * velocity) / 127
				let radius =
					(0.5 + 0.5 * Math.random()) * (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleSize") + 0.5
				rndX -= radius / 2
				let lifeTime = Math.random() * (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleLife") + 2
				this.createParticle(
					rndX,
					y + h,
					motX,
					-1 * motY * 0.5,
					radius,
					color,
					lifeTime
				)
			}
		}
	}
	createParticle(x, y, motX, motY, radius, color, lifeTime) {
		if (!this.particles.has(color)) {
			this.particles.set(color, [])
		}
		this.particles.get(color).push([x, y, motX, motY, radius, lifeTime, 0])
	}
	updateParticles() {
		this.particles.forEach(particleArray =>
			particleArray.forEach(particle => this.updateParticle(particle))
		)
		this.clearDeadParticles()
	}
	clearDeadParticles() {
		this.particles.forEach((particleArray, color) => {
			for (let i = particleArray.length - 1; i >= 0; i--) {
				if (particleArray[i][6] >= particleArray[i][5]) {
					particleArray.splice(i, 1)
				}
			}
			if (particleArray.length == 0) {
				this.particles.delete(color)
			}
		})
	}

	updateParticle(particle) {
		particle[0] += particle[2]
		particle[1] += particle[3]

		// particle[3] *= 1 + (particle[6] / particle[5]) * 0.05
		particle[3] += (particle[6] / particle[5]) * 0.3

		//dampen xy-motion
		particle[2] *= 0.95
		// particle[3] *= 0.92

		//particle lifetime ticker
		particle[6] += particle[4] * 0.1
	}
	render() {
		let stroke = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("particleStroke")
		this.ctx.globalAlpha = 0.5
		if (stroke) {
			this.ctx.strokeStyle = "rgba(255,255,255,0.8)"
			this.ctx.lineWidth = 0.5
		}
		this.particles.forEach((particleArray, color) => {
			let c = this.ctx
			c.fillStyle = color
			c.beginPath()
			particleArray.forEach(particle => this.renderParticle(particle))
			c.fill()
			if (stroke) {
				c.stroke()
			}
			c.closePath()
		})
		this.updateParticles()
		this.ctx.globalAlpha = 1
	}
	renderParticle(particle) {
		this.ctx.moveTo(particle[0], particle[1])
		let rad = Math.max(0.1, (1 - particle[6] / particle[5]) * particle[4])
		this.ctx.arc(particle[0], particle[1], rad, 0, Math.PI * 2, 0)
	}
}


/***/ }),

/***/ "./js/Rendering/NoteRender.js":
/*!************************************!*\
  !*** ./js/Rendering/NoteRender.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoteRender: () => (/* binding */ NoteRender)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");
/* harmony import */ var _NoteParticleRender_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NoteParticleRender.js */ "./js/Rendering/NoteParticleRender.js");
/* harmony import */ var _PianoParticleRender_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PianoParticleRender.js */ "./js/Rendering/PianoParticleRender.js");





/**
 * Class to render the notes on screen.
 */
class NoteRender {
	constructor(ctx, ctxForeground, renderDimensions, pianoRender) {
		this.ctx = ctx
		this.renderDimensions = renderDimensions
		this.ctxForeground = ctxForeground

		this.pianoRender = pianoRender
		this.lastActiveNotes = {}
		this.noteParticleRender = new _NoteParticleRender_js__WEBPACK_IMPORTED_MODULE_2__.NoteParticleRender(
			this.ctxForeground,
			this.renderDimensions
		)
		this.pianoParticleRender = new _PianoParticleRender_js__WEBPACK_IMPORTED_MODULE_3__.PianoParticleRender(
			this.pianoRender.playedKeysCtxWhite,
			this.pianoRender.playedKeysCtxBlack,
			this.renderDimensions
		)
	}
	render(time, renderInfoByTrackMap, inputActiveNotes, inputPlayedNotes) {
		this.noteParticleRender.render()

		//sustained note "tails"
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showSustainedNotes")) {
			this.drawSustainedNotes(renderInfoByTrackMap, time)
		}

		let activeNotesByTrackMap = this.getActiveNotesByTrackMap(
			renderInfoByTrackMap
		)
		//Active notes effect
		Object.keys(activeNotesByTrackMap).forEach(trackIndex => {
			this.renderActiveNotesEffects(activeNotesByTrackMap[trackIndex])
		})

		//Notes
		Object.keys(renderInfoByTrackMap).forEach(trackIndex => {
			this.drawNotes(
				renderInfoByTrackMap[trackIndex].white,
				renderInfoByTrackMap[trackIndex].black
			)
		})
		let currentActiveNotes = {}
		//Active keys on piano + stroking of active notes
		Object.keys(activeNotesByTrackMap).forEach(trackIndex => {
			this.renderActivePianoKeys(
				activeNotesByTrackMap[trackIndex],
				currentActiveNotes
			)

			this.createNoteParticles(activeNotesByTrackMap[trackIndex])
		})
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("drawPianoKeyHitEffect")) {
			this.pianoParticleRender.render()
		}

		this.lastActiveNotes = currentActiveNotes

		this.drawInputNotes(inputActiveNotes, inputPlayedNotes)
	}

	drawSustainedNotes(renderInfoByTrackMap, time) {
		Object.keys(renderInfoByTrackMap).forEach(trackIndex => {
			let notesRenderInfoBlack = renderInfoByTrackMap[trackIndex].black
			let notesRenderInfoWhite = renderInfoByTrackMap[trackIndex].white

			this.ctx.globalAlpha = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("sustainedNotesOpacity") / 100
			this.ctx.strokeStyle = "rgba(0,0,0,1)"
			this.ctx.lineWidth = 1
			if (notesRenderInfoWhite.length > 0) {
				this.ctx.fillStyle = notesRenderInfoWhite[0].fillStyle
			}
			notesRenderInfoWhite.forEach(renderInfo =>
				this.drawSustainedNote(renderInfo)
			)
			if (notesRenderInfoBlack.length > 0) {
				this.ctx.fillStyle = notesRenderInfoBlack[0].fillStyle
			}
			notesRenderInfoBlack.forEach(renderInfo =>
				this.drawSustainedNote(renderInfo)
			)
		})
	}

	drawSustainedNote(renderInfos) {
		let ctx = this.ctx

		let x = renderInfos.x
		let w = renderInfos.w / 2

		if (renderInfos.sustainH && renderInfos.sustainY) {
			ctx.beginPath()
			ctx.rect(x + w / 2, renderInfos.sustainY, w, renderInfos.sustainH)
			ctx.closePath()
			ctx.fill()
		}
	}

	getActiveNotesByTrackMap(renderInfoByTrackMap) {
		return Object.keys(renderInfoByTrackMap).map(trackIndex =>
			this.getActiveNotes(
				renderInfoByTrackMap[trackIndex].black,
				renderInfoByTrackMap[trackIndex].white
			)
		)
	}
	getActiveNotes(notesRenderInfoBlack, notesRenderInfoWhite) {
		let activeNotesBlack = notesRenderInfoBlack
			.slice(0)
			.filter(renderInfo => renderInfo.isOn)

		let activeNotesWhite = notesRenderInfoWhite
			.slice(0)
			.filter(renderInfo => renderInfo.isOn)
		return { white: activeNotesWhite, black: activeNotesBlack }
	}

	renderActiveNotesEffects(activeNotes) {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showHitKeys")) {
			if (activeNotes.white.length) {
				this.ctx.fillStyle = activeNotes.white[0].fillStyle
			}
			activeNotes.white.forEach(note => this.renderActiveNoteEffect(note))

			if (activeNotes.black.length) {
				this.ctx.fillStyle = activeNotes.black[0].fillStyle
			}
			activeNotes.black.forEach(note => this.renderActiveNoteEffect(note))
		}
	}

	renderActiveNoteEffect(renderInfos) {
		let ctx = this.ctx
		ctx.globalAlpha = Math.max(
			0,
			0.7 - Math.min(0.7, renderInfos.noteDoneRatio)
		)
		let wOffset = Math.pow(
			this.renderDimensions.whiteKeyWidth / 2,
			1 + Math.min(1, renderInfos.noteDoneRatio) * renderInfos.isOn
		)
		this.doNotePath(renderInfos, {
			x: renderInfos.x - wOffset / 2,
			w: renderInfos.w + wOffset,
			y:
				renderInfos.y -
				((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("reverseNoteDirection")
					? this.renderDimensions.whiteKeyHeight
					: 0),
			h: renderInfos.h + this.renderDimensions.whiteKeyHeight
		})

		ctx.fill()
		ctx.globalAlpha = 1
	}

	drawNotes(notesRenderInfoWhite, notesRenderInfoBlack) {
		let {
			incomingWhiteNotes,
			incomingBlackNotes,
			playedWhiteNotes,
			playedBlackNotes
		} = this.getIncomingAndPlayedNotes(
			notesRenderInfoWhite,
			notesRenderInfoBlack
		)

		this.ctx.globalAlpha = 1
		this.ctx.strokeStyle = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotesColor")
		this.ctx.lineWidth = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotesWidth")

		this.drawIncomingNotes(incomingWhiteNotes, incomingBlackNotes)

		this.drawPlayedNotes(playedWhiteNotes, playedBlackNotes)
	}

	rectAbovePiano() {
		this.ctx.rect(
			0,
			0,
			this.renderDimensions.windowWidth,
			this.renderDimensions.getAbsolutePianoPosition()
		)
	}
	rectBelowPiano() {
		this.ctx.rect(
			0,
			this.renderDimensions.getAbsolutePianoPosition() +
				this.renderDimensions.whiteKeyHeight,
			this.renderDimensions.windowWidth,
			this.renderDimensions.windowHeight -
				(this.renderDimensions.getAbsolutePianoPosition() +
					this.renderDimensions.whiteKeyHeight)
		)
	}
	drawPlayedNotes(playedWhiteNotes, playedBlackNotes) {
		this.ctx.save()
		this.ctx.beginPath()
		;(0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("reverseNoteDirection")
			? this.rectAbovePiano()
			: this.rectBelowPiano()

		this.ctx.clip()
		this.ctx.closePath()
		this.ctx.fillStyle = playedWhiteNotes.length
			? playedWhiteNotes[0].fillStyle
			: ""

		playedWhiteNotes.forEach(renderInfo => {
			this.drawNoteAfter(renderInfo)
			this.ctx.fill()
			this.strokeActiveAndOthers(renderInfo)
		})

		this.ctx.fillStyle = playedBlackNotes.length
			? playedBlackNotes[0].fillStyle
			: ""
		playedBlackNotes.forEach(renderInfo => {
			this.drawNoteAfter(renderInfo)
			this.ctx.fill()
			this.strokeActiveAndOthers(renderInfo)
		})

		this.ctx.restore()
	}

	strokeActiveAndOthers(renderInfo) {
		if (renderInfo.isOn) {
			this.ctx.strokeStyle = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeActiveNotesColor")
			this.ctx.lineWidth = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeActiveNotesWidth")
			this.ctx.stroke()
		} else if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotes")) {
			this.ctx.strokeStyle = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotesColor")
			this.ctx.lineWidth = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotesWidth")
			this.ctx.stroke()
		}
	}

	drawIncomingNotes(incomingWhiteNotes, incomingBlackNotes) {
		this.ctx.save()
		this.ctx.beginPath()
		;(0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("reverseNoteDirection")
			? this.rectBelowPiano()
			: this.rectAbovePiano()
		this.ctx.clip()
		this.ctx.closePath()
		this.ctx.fillStyle = incomingWhiteNotes.length
			? incomingWhiteNotes[0].fillStyle
			: ""
		incomingWhiteNotes.forEach(renderInfo => {
			this.drawNoteBefore(renderInfo)
			this.ctx.fill()
			this.strokeActiveAndOthers(renderInfo)
		})

		this.ctx.fillStyle = incomingBlackNotes.length
			? incomingBlackNotes[0].fillStyle
			: ""
		incomingBlackNotes.forEach(renderInfo => {
			this.drawNoteBefore(renderInfo)
			this.ctx.fill()
			this.strokeActiveAndOthers(renderInfo)
		})
		this.ctx.restore()
	}

	getIncomingAndPlayedNotes(notesRenderInfoWhite, notesRenderInfoBlack) {
		let incomingWhiteNotes = []
		let playedWhiteNotes = []
		notesRenderInfoWhite
			.filter(renderInfo => renderInfo.w > 0 && renderInfo.h > 0)
			.forEach(renderInfo => {
				if (renderInfo.noteDoneRatio < 1) {
					incomingWhiteNotes.push(renderInfo)
				}
				if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("pianoPosition") != 0 && renderInfo.noteDoneRatio > 0) {
					playedWhiteNotes.push(renderInfo)
				}
			})
		let incomingBlackNotes = []
		let playedBlackNotes = []
		notesRenderInfoBlack
			.filter(renderInfo => renderInfo.w > 0 && renderInfo.h > 0)
			.forEach(renderInfo => {
				if (renderInfo.noteDoneRatio < 1) {
					incomingBlackNotes.push(renderInfo)
				}
				if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("pianoPosition") != 0 && renderInfo.noteDoneRatio > 0) {
					playedBlackNotes.push(renderInfo)
				}
			})
		return {
			incomingWhiteNotes,
			incomingBlackNotes,
			playedWhiteNotes,
			playedBlackNotes
		}
	}

	drawInputNotes(inputActiveNotes, inputPlayedNotes) {
		this.ctx.globalAlpha = 1
		this.ctx.strokeStyle = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotesColor")
		this.ctx.lineWidth = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotesWidth")
		this.ctx.fillStyle = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("inputNoteColor")
		let whiteActive = inputActiveNotes.filter(noteInfo => !noteInfo.isBlack)
		inputActiveNotes.forEach(noteInfo => {
			this.createNoteParticle(noteInfo)
			this.pianoRender.drawActiveInputKey(
				parseInt(noteInfo.noteNumber),
				this.ctx.fillStyle
			)
			this.drawNoteAfter(noteInfo)
			this.ctx.fill()
		})
		inputPlayedNotes.forEach(noteInfo => {
			// noteInfo.y += this.renderDimensions.whiteKeyHeight
			this.drawNoteAfter(noteInfo)
			this.ctx.fill()
		})
	}
	drawNote(renderInfos) {
		let ctx = this.ctx

		if (renderInfos.w <= 0 || renderInfos.h <= 0) {
			return
		}

		let fadeInAlpha = 1
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("fadeInNotes")) {
			fadeInAlpha = this.getAlphaFromY(renderInfos.y + renderInfos.h)
		}

		ctx.globalAlpha = fadeInAlpha

		if (renderInfos.noteDoneRatio < 1) {
			this.drawNoteBefore(renderInfos)
			ctx.fill()
			if (!renderInfos.isOn && (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotes")) {
				ctx.stroke()
			}
		}

		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("pianoPosition") != 0 && renderInfos.noteDoneRatio > 0) {
			this.drawNoteAfter(renderInfos)
			ctx.fill()
			if (!renderInfos.isOn && (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("strokeNotes")) {
				ctx.stroke()
			}
		}

		ctx.globalAlpha = 1
	}
	drawNoteAfter(renderInfos) {
		let y =
			renderInfos.y +
			((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("reverseNoteDirection") ? -1 : 1) *
				this.renderDimensions.whiteKeyHeight

		this.doNotePath(renderInfos, {
			y
		})
	}

	drawNoteBefore(renderInfos) {
		//Done by .clip() now. Keep in case clipping isn't performant
		// let h = Math.min(
		// 	renderInfos.h,
		// 	this.renderDimensions.getAbsolutePianoPosition() - renderInfos.y
		// )
		this.doNotePath(renderInfos /*, { h }*/)
	}

	renderActivePianoKeys(activeNotes, currentActiveNotes) {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("highlightActivePianoKeys")) {
			activeNotes.white.forEach(noteRenderInfo => {
				this.pianoRender.drawActiveKey(noteRenderInfo, noteRenderInfo.fillStyle)
			})
			activeNotes.black.forEach(noteRenderInfo => {
				this.pianoRender.drawActiveKey(noteRenderInfo, noteRenderInfo.fillStyle)
			})

			//stroke newly hit ones
			//TODO: Doesn't look very nice.
			if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("drawPianoKeyHitEffect")) {
				activeNotes.white.forEach(noteRenderInfo => {
					currentActiveNotes[noteRenderInfo.noteId] = true
					if (!this.lastActiveNotes.hasOwnProperty(noteRenderInfo.noteId)) {
						this.pianoParticleRender.add(noteRenderInfo)
					}
				})
				activeNotes.black.forEach(noteRenderInfo => {
					currentActiveNotes[noteRenderInfo.noteId] = true
					if (!this.lastActiveNotes.hasOwnProperty(noteRenderInfo.noteId)) {
						this.pianoParticleRender.add(noteRenderInfo)
					}
				})
			}
		}
	}

	strokeNote(renderInfo) {
		this.drawNoteBefore(renderInfo)
		this.ctx.stroke()

		if (renderInfo.isOn) {
			this.drawNoteAfter(renderInfo)
			this.ctx.stroke()
		}
	}

	doNotePath(renderInfo, overWriteParams) {
		if (!overWriteParams) {
			overWriteParams = {}
		}
		for (let key in renderInfo) {
			if (!overWriteParams.hasOwnProperty(key)) {
				overWriteParams[key] = renderInfo[key]
			}
		}
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("roundedNotes") || (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("noteBorderRadius") > 0) {
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.drawRoundRect)(
				this.ctx,
				overWriteParams.x,
				overWriteParams.y,
				overWriteParams.w,
				overWriteParams.h,
				overWriteParams.rad,
				(0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("roundedNotes")
			)
		} else {
			this.ctx.beginPath()
			this.ctx.rect(
				overWriteParams.x,
				overWriteParams.y,
				overWriteParams.w,
				overWriteParams.h
			)
			this.ctx.closePath()
		}
	}

	createNoteParticles(activeNotes, colWhite, colBlack) {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showParticlesTop") || (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showParticlesBottom")) {
			activeNotes.white.forEach(noteRenderInfo =>
				this.createNoteParticle(noteRenderInfo)
			)
			activeNotes.black.forEach(noteRenderInfo =>
				this.createNoteParticle(noteRenderInfo)
			)
		}
	}
	createNoteParticle(noteRenderInfo) {
		this.noteParticleRender.createParticles(
			noteRenderInfo.x,
			this.renderDimensions.getAbsolutePianoPosition(),
			noteRenderInfo.w,
			this.renderDimensions.whiteKeyHeight,
			noteRenderInfo.fillStyle,
			noteRenderInfo.velocity
		)
	}

	getAlphaFromY(y) {
		//TODO broken.
		return Math.min(
			1,
			Math.max(
				0,
				(y - this.menuHeight - 5) /
					((this.renderDimensions.windowHeight - this.menuHeight) * 0.5)
			)
		)
	}
	/**
	 * Sets Menu (Navbar) Height.  Required to calculate fadeIn alpha value
	 *
	 * @param {Number} menuHeight
	 */
	setMenuHeight(menuHeight) {
		this.menuHeight = menuHeight
	}
}


/***/ }),

/***/ "./js/Rendering/OverlayRender.js":
/*!***************************************!*\
  !*** ./js/Rendering/OverlayRender.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OverlayRender: () => (/* binding */ OverlayRender)
/* harmony export */ });
/**
 * Class to display message-overlays on screen
 */
class OverlayRender {
	constructor(ctx, renderDimensions) {
		this.ctx = ctx
		this.renderDimensions = renderDimensions
		this.overlays = []
	}
	/**
	 * add a overlay-message to the screen
	 *
	 * @param {String} message
	 * @param {Number} duration
	 */
	addOverlay(message, duration) {
		let totalDuration = duration
		this.overlays.push({ message, totalDuration, duration })
	}
	/**
	 * Render / Update the overlays.
	 */
	render() {
		for (let i = this.overlays.length - 1; i >= 0; i--) {
			let overlay = this.overlays[i]
			overlay.duration--
			if (overlay.duration < 0) {
				this.overlays.splice(i, 1)
			}
		}

		if (this.overlays.length) {
			this.globalAlpha = this.setAlphaForOverlay(
				this.overlays[this.overlays.length - 1]
			)
			this.ctx.fillStyle = "rgba(0,0,0,0.9)"
			this.ctx.fillRect(
				0,
				0,
				this.renderDimensions.windowWidth,
				this.renderDimensions.windowHeight
			)
		}
		for (let i = 0; i < this.overlays.length; i++) {
			let overlay = this.overlays[i]

			this.setAlphaForOverlay(overlay)

			this.ctx.font = "32px 'Source Sans Pro', sans-serif"
			this.ctx.fillStyle = "white"

			let wd = this.ctx.measureText(overlay.message).width
			this.ctx.fillText(
				overlay.message,
				this.renderDimensions.windowWidth / 2 - wd / 2,
				this.renderDimensions.windowHeight / 4 + i * 40
			)
		}
		this.ctx.globalAlpha = 1
	}

	setAlphaForOverlay(overlay) {
		let ratio = 1 - overlay.duration / overlay.totalDuration
		if (ratio < 0.1) {
			this.ctx.globalAlpha = ratio / 0.1
		} else {
			this.ctx.globalAlpha = (0.9 - (ratio - 0.1)) / 0.9
		}
		return ratio
	}
}


/***/ }),

/***/ "./js/Rendering/PianoParticleRender.js":
/*!*********************************************!*\
  !*** ./js/Rendering/PianoParticleRender.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PianoParticleRender: () => (/* binding */ PianoParticleRender)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");


const PARTICLE_LIFE_TIME = 22

class PianoParticleRender {
	constructor(ctxWhite, ctxBlack, renderDimensions) {
		this.ctxWhite = ctxWhite
		this.ctxBlack = ctxBlack
		this.renderDimensions = renderDimensions
		this.particles = {
			white: new Map(),
			black: new Map()
		}
	}
	add(noteRenderinfo, isWhite) {
		let keyDims = this.renderDimensions.getKeyDimensions(
			noteRenderinfo.noteNumber
		)

		let color = noteRenderinfo.fillStyle

		let keyColor = noteRenderinfo.isBlack ? "black" : "white"

		if (!this.particles[keyColor].has(color)) {
			this.particles[keyColor].set(color, [])
		}
		this.particles[keyColor]
			.get(color)
			.push([
				keyDims.x,
				0,
				keyDims.w,
				keyDims.h,
				(PARTICLE_LIFE_TIME * noteRenderinfo.velocity) / 127
			])
		return
	}

	updateParticles() {
		this.particles.white.forEach(particleArray =>
			particleArray.forEach(particle => this.updateParticle(particle))
		)
		this.particles.black.forEach(particleArray =>
			particleArray.forEach(particle => this.updateParticle(particle))
		)
		this.clearDeadParticles()
	}
	clearDeadParticles() {
		this.particles.white.forEach((particleArray, color) => {
			for (let i = particleArray.length - 1; i >= 0; i--) {
				if (particleArray[i][4] < 0) {
					particleArray.splice(i, 1)
				}
			}
			if (particleArray.length == 0) {
				this.particles.white.delete(color)
			}
		})
		this.particles.black.forEach((particleArray, color) => {
			for (let i = particleArray.length - 1; i >= 0; i--) {
				if (particleArray[i][4] < 0) {
					particleArray.splice(i, 1)
				}
			}
			if (particleArray.length == 0) {
				this.particles.black.delete(color)
			}
		})
	}

	updateParticle(particle) {
		particle[4]--
	}
	render() {
		this.particles.white.forEach((particleArray, color) => {
			let c = this.ctxWhite
			c.strokeStyle = "rgba(255,255,255,0.4)"
			c.lineWidth = 2
			c.beginPath()
			particleArray.forEach(particle => this.renderParticle(particle, c))
			c.stroke()
			c.closePath()
		})
		this.particles.black.forEach((particleArray, color) => {
			let c = this.ctxBlack
			c.strokeStyle = "rgba(255,255,255,0.4)"
			c.lineWidth = 2
			c.beginPath()
			particleArray.forEach(particle => this.renderParticle(particle, c))
			c.stroke()
			c.closePath()
		})
		this.updateParticles()
	}
	renderParticle(particle, ctx) {
		let doneRat = 1 - particle[4] / PARTICLE_LIFE_TIME
		let wdRatio = (doneRat - 0.1) * particle[2] * 0.3
		ctx.moveTo(particle[0] - wdRatio / 2, 5)
		ctx.lineTo(particle[0] - wdRatio / 2, particle[3])

		ctx.moveTo(particle[0] - wdRatio / 2 + particle[2] + wdRatio, 5)
		ctx.lineTo(particle[0] - wdRatio / 2 + particle[2] + wdRatio, particle[3])

		// ctx.rect(
		// 	particle[0] + doneRat / 2,
		// 	particle[1],
		// 	particle[2] - doneRat,
		// 	particle[3]
		// )
	}
}


/***/ }),

/***/ "./js/Rendering/PianoRender.js":
/*!*************************************!*\
  !*** ./js/Rendering/PianoRender.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PianoRender: () => (/* binding */ PianoRender)
/* harmony export */ });
/* harmony import */ var _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/CONST.js */ "./js/data/CONST.js");
/* harmony import */ var _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/DomHelper.js */ "./js/ui/DomHelper.js");
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");




/**
 * Class to render the piano (and the colored keys played on the piano)
 */
class PianoRender {
	constructor(renderDimensions) {
		this.renderDimensions = renderDimensions
		this.renderDimensions.registerResizeCallback(this.resize.bind(this))
		this.clickCallback = null
		this.blackKeyImg = new Image()
		this.blackKeyImg.src = "../../blackKey.svg"
		this.blackKeyImg.onload
		this.positionY = 50 //from bottom

		this.resize()
	}
	/**
	 * Resize canvases and redraw piano.
	 */
	resize() {
		this.resizeCanvases()
		this.drawPiano(this.ctxWhite, this.ctxBlack)
	}
	/**
	 * pass listeners that are called with the note number as argument when piano canvas is clicked.
	 * @param {Function} onNoteOn
	 * @param {Function} onNoteOff
	 */
	setPianoInputListeners(onNoteOn, onNoteOff) {
		this.onNoteOn = onNoteOn
		this.onNoteOff = onNoteOff
	}
	/**
	 * Register a callback to trigger when user clicks the piano Canvas. Callback is called with
	 */
	setClickCallback(callback) {
		this.clickCallback = callback
	}
	getAllCanvases() {
		return [
			this.getPianoCanvasWhite(),
			this.getPlayedKeysWhite(),
			this.getPianoCanvasBlack(),
			this.getPlayedKeysBlack()
		]
	}

	/**
	 * Resizes all piano canvases.
	 */
	resizeCanvases() {
		this.getAllCanvases().forEach(canvas => {
			_ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.setCanvasSize(
				canvas,
				this.renderDimensions.windowWidth,
				Math.max(
					this.renderDimensions.whiteKeyHeight,
					this.renderDimensions.blackKeyHeight
				)
			)
		})
		this.repositionCanvases()
	}

	repositionCanvases() {
		this.getAllCanvases().forEach(canvas => {
			canvas.style.top = this.renderDimensions.getAbsolutePianoPosition() + "px"
		})
	}
	/**
	 *
	 * @param {Integer} noteNumber
	 */
	drawActiveInputKey(noteNumber, color) {
		let dim = this.renderDimensions.getKeyDimensions(noteNumber)
		let isKeyBlack = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isBlack)(noteNumber)
		let ctx = isKeyBlack ? this.playedKeysCtxBlack : this.playedKeysCtxWhite

		if (isKeyBlack) {
			this.drawBlackKey(ctx, dim, color, true)
		} else {
			this.drawWhiteKey(ctx, dim, color, true)
		}
	}

	drawActiveKey(renderInfo, color) {
		let dim = this.renderDimensions.getKeyDimensions(renderInfo.noteNumber)
		let isKeyBlack = renderInfo.isBlack
		let ctx = isKeyBlack ? this.playedKeysCtxBlack : this.playedKeysCtxWhite

		ctx.fillStyle = color
		if (isKeyBlack) {
			this.drawBlackKey(ctx, dim, color)
		} else {
			this.drawWhiteKey(ctx, dim, color)
		}
	}

	clearPlayedKeysCanvases() {
		this.playedKeysCtxWhite.clearRect(
			0,
			0,
			this.renderDimensions.windowWidth,
			Math.max(
				this.renderDimensions.whiteKeyHeight,
				this.renderDimensions.blackKeyHeight
			)
		)
		this.playedKeysCtxBlack.clearRect(
			0,
			0,
			this.renderDimensions.windowWidth,
			Math.max(
				this.renderDimensions.whiteKeyHeight,
				this.renderDimensions.blackKeyHeight
			)
		)
	}

	drawPiano(ctxWhite, ctxBlack) {
		ctxWhite.clearRect(
			0,
			0,
			this.renderDimensions.windowWidth,
			Math.max(
				this.renderDimensions.whiteKeyHeight,
				this.renderDimensions.blackKeyHeight
			)
		)
		ctxBlack.clearRect(
			0,
			0,
			this.renderDimensions.windowWidth,
			Math.max(
				this.renderDimensions.whiteKeyHeight,
				this.renderDimensions.blackKeyHeight
			)
		)
		//Background
		ctxWhite.fillStyle = "rgba(0,0,0,1)"
		ctxWhite.fillRect(
			0,
			5,
			this.renderDimensions.windowWidth,
			this.renderDimensions.whiteKeyHeight
		)

		this.drawWhiteKeys(ctxWhite)
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_2__.getSetting)("showKeyNamesOnPianoWhite")) {
			this.drawWhiteKeyNames(ctxWhite)
		}
		// var img = new Image()
		// img.src = "../../blackKey.svg"
		// img.onload = function () {
		this.drawBlackKeys(ctxBlack)
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_2__.getSetting)("showKeyNamesOnPianoBlack")) {
			this.drawBlackKeyNames(ctxBlack)
		}
		// }.bind(this)

		//velvet
		ctxWhite.strokeStyle = "rgba(155,50,50,1)"
		ctxWhite.shadowColor = "rgba(155,50,50,1)"
		ctxWhite.shadowOffsetY = 2
		ctxWhite.shadowBlur = 2
		ctxWhite.lineWidth = 4
		ctxWhite.beginPath()
		ctxWhite.moveTo(this.renderDimensions.windowWidth, 2)
		ctxWhite.lineTo(0, 2)
		ctxWhite.closePath()
		ctxWhite.stroke()
		ctxWhite.shadowColor = "rgba(0,0,0,0)"
		ctxWhite.shadowBlur = 0
	}

	drawWhiteKeys(ctxWhite) {
		for (
			let i = Math.max(0, this.renderDimensions.minNoteNumber);
			i <= this.renderDimensions.maxNoteNumber;
			i++
		) {
			let dims = this.renderDimensions.getKeyDimensions(i)
			if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isBlack)(i)) {
				this.drawWhiteKey(ctxWhite, dims, "rgba(255,255,255,1)")
			}
		}
	}

	drawBlackKeys(ctxBlack) {
		for (
			let i = Math.max(0, this.renderDimensions.minNoteNumber);
			i <= this.renderDimensions.maxNoteNumber;
			i++
		) {
			let dims = this.renderDimensions.getKeyDimensions(i)
			if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isBlack)(i)) {
				this.drawBlackKey(ctxBlack, dims, "black", true)
			}
		}
	}
	drawWhiteKeyNames(ctx) {
		ctx.fillStyle = "black"
		const fontSize = this.renderDimensions.whiteKeyWidth / 2.2
		ctx.font = fontSize + "px Arial black"
		for (
			let i = Math.max(0, this.renderDimensions.minNoteNumber);
			i <= this.renderDimensions.maxNoteNumber;
			i++
		) {
			let dims = this.renderDimensions.getKeyDimensions(i)
			if (!(0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isBlack)(i)) {
				let txt = this.getDisplayKey(_data_CONST_js__WEBPACK_IMPORTED_MODULE_0__.CONST.MIDI_NOTE_TO_KEY[i + 21] || "")
				let txtWd = ctx.measureText(txt).width
				ctx.fillText(
					txt,
					dims.x + dims.w / 2 - txtWd / 2,
					this.renderDimensions.whiteKeyHeight - fontSize / 3
				)
			}
		}
	}
	drawBlackKeyNames(ctx) {
		ctx.fillStyle = "white"
		const fontSize = this.renderDimensions.blackKeyWidth / 2.1
		ctx.font = Math.ceil(fontSize) + "px Arial black"
		for (
			let i = Math.max(0, this.renderDimensions.minNoteNumber);
			i <= this.renderDimensions.maxNoteNumber;
			i++
		) {
			let dims = this.renderDimensions.getKeyDimensions(i)
			if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isBlack)(i)) {
				let txt = this.getDisplayKey(_data_CONST_js__WEBPACK_IMPORTED_MODULE_0__.CONST.MIDI_NOTE_TO_KEY[i + 21] || "")
				let txtWd = ctx.measureText(txt).width
				ctx.fillText(
					txt,
					dims.x + dims.w / 2 - txtWd / 2,
					this.renderDimensions.blackKeyHeight - 2
				)
			}
		}
	}
	getDisplayKey(key) {
		let blackToHash = (0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.replaceAllString)(key, "b", "#")
		return blackToHash.replace(/[0-9]/g, "")
	}
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Dimensions} dims
	 */
	drawWhiteKey(ctx, dims, color) {
		let radius = Math.ceil(this.renderDimensions.whiteKeyWidth / 20)
		let x = dims.x
		let y = Math.floor(dims.y) + 6
		let height = Math.floor(dims.h) - 8
		let width = dims.w

		this.getWhiteKeyPath(ctx, x, y, width, height, radius)

		ctx.fillStyle = color
		ctx.fill()

		ctx.fillStyle = this.getKeyGradient(ctx)
		ctx.fill()

		ctx.closePath()
	}
	getKeyGradient(ctx) {
		if (this.keyGradient == null) {
			this.keyGradient = ctx.createLinearGradient(
				this.renderDimensions.windowWidth / 2,
				0,
				this.renderDimensions.windowWidth / 2,
				this.renderDimensions.whiteKeyHeight
			)
			this.keyGradient.addColorStop(0, "rgba(0,0,0,1)")
			this.keyGradient.addColorStop(1, "rgba(255,255,255,0.5)")
		}
		return this.keyGradient
	}
	getWhiteKeyPath(ctx, x, y, width, height, radius) {
		ctx.beginPath()
		ctx.moveTo(x + 1, y)
		ctx.lineTo(x - 1 + width, y)
		ctx.lineTo(x - 1 + width, y + height - radius)
		ctx.lineTo(x - 1 + width - radius, y + height)
		ctx.lineTo(x + 1 + radius, y + height)
		ctx.lineTo(x + 1, y + height - radius)
		ctx.lineTo(x + 1, y)
	}

	strokeWhiteKey(dims, color) {
		let radius = Math.ceil(this.renderDimensions.whiteKeyWidth / 20)
		let x = dims.x
		let y = Math.floor(dims.y) + 6
		let height = Math.floor(dims.h) - 8
		let width = dims.w
		let ctx = this.playedKeysCtxWhite

		this.getWhiteKeyPath(ctx, x, y, width, height, radius)
		ctx.strokeStyle = "black"
		ctx.lineWidth = 50
		ctx.fill()
		ctx.closePath()
	}
	drawBlackKeySvg(ctx, dims, color) {
		let radiusTop = this.renderDimensions.blackKeyWidth / 15
		let radiusBottom = this.renderDimensions.blackKeyWidth / 8
		let x = dims.x
		let y = dims.y + 5
		let height = dims.h
		let width = dims.w

		ctx.drawImage(this.blackKeyImg, x, y, width, height)
	}
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Dimensions} dims
	 */
	drawBlackKey(ctx, dims, color, noShadow) {
		let radiusTop = 0 //this.renderDimensions.blackKeyWidth / 15
		let radiusBottom = this.renderDimensions.blackKeyWidth / 8
		let x = dims.x
		let y = dims.y + 6
		let height = dims.h
		let width = dims.w
		color = color || "black"

		this.getBlackKeyPath(ctx, x, y, radiusTop, width, height, radiusBottom)

		ctx.fillStyle = color
		ctx.fill()
		if (!noShadow) {
			ctx.fillStyle = this.getKeyGradient()
			ctx.fill()
		}
		ctx.closePath()
	}
	strokeBlackKey(dims, color) {
		let radiusTop = 0 //this.renderDimensions.blackKeyWidth / 15
		let radiusBottom = this.renderDimensions.blackKeyWidth / 8
		let x = dims.x
		let y = dims.y + 6
		let height = dims.h
		let width = dims.w
		let ctx = this.playedKeysCtxBlack
		color = color || "white"

		this.getBlackKeyPath(ctx, x, y, radiusTop, width, height, radiusBottom)

		ctx.strokeStyle = color
		ctx.stroke()
		ctx.closePath()
	}

	getBlackKeyPath(ctx, x, y, radiusTop, width, height, radiusBottom) {
		ctx.beginPath()
		ctx.moveTo(x + 1, y + radiusTop)
		ctx.lineTo(x + 1 + radiusTop, y)
		ctx.lineTo(x - 1 - radiusTop + width, y)
		ctx.lineTo(x - 1 + width, y + radiusTop)
		ctx.lineTo(x - 1 + width, y + height - radiusBottom)
		ctx.lineTo(x - 1 + width - radiusBottom, y + height)
		ctx.lineTo(x + 1 + radiusBottom, y + height)
		ctx.lineTo(x + 1, y + height - radiusBottom)
		ctx.lineTo(x + 1, y)
	}

	getPianoCanvasWhite() {
		if (!this.pianoCanvasWhite) {
			this.pianoCanvasWhite = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createCanvas(
				this.renderDimensions.windowWidth,
				Math.max(
					this.renderDimensions.whiteKeyHeight,
					this.renderDimensions.blackKeyHeight
				),
				{
					position: "absolute",
					left: "0px",
					zIndex: 99
				}
			)
			this.pianoCanvasWhite.className = "pianoCanvas"
			document.body.appendChild(this.pianoCanvasWhite)
			this.ctxWhite = this.pianoCanvasWhite.getContext("2d")
		}
		return this.pianoCanvasWhite
	}
	getPlayedKeysWhite() {
		if (!this.playedKeysCanvasWhite) {
			this.playedKeysCanvasWhite = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createCanvas(
				this.renderDimensions.windowWidth,
				Math.max(
					this.renderDimensions.whiteKeyHeight,
					this.renderDimensions.blackKeyHeight
				),
				{
					position: "absolute",
					left: "0px",
					zIndex: 99
				}
			)
			this.playedKeysCanvasWhite.className = "pianoCanvas"
			document.body.appendChild(this.playedKeysCanvasWhite)
			this.playedKeysCtxWhite = this.playedKeysCanvasWhite.getContext("2d")
		}
		return this.playedKeysCanvasWhite
	}
	getPianoCanvasBlack() {
		if (!this.pianoCanvasBlack) {
			this.pianoCanvasBlack = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createCanvas(
				this.renderDimensions.windowWidth,
				Math.max(
					this.renderDimensions.whiteKeyHeight,
					this.renderDimensions.blackKeyHeight
				),
				{
					position: "absolute",
					left: "0px",
					zIndex: 99,
					boxShadow: "0px 0px 15px 15px rgba(0,0,0,0.4)"
				}
			)
			this.pianoCanvasBlack.className = "pianoCanvas"
			document.body.appendChild(this.pianoCanvasBlack)
			this.ctxBlack = this.pianoCanvasBlack.getContext("2d")
		}
		return this.pianoCanvasBlack
	}
	getPlayedKeysBlack() {
		if (!this.playedKeysCanvasBlack) {
			this.playedKeysCanvasBlack = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createCanvas(
				this.renderDimensions.windowWidth,
				Math.max(
					this.renderDimensions.whiteKeyHeight,
					this.renderDimensions.blackKeyHeight
				),
				{
					position: "absolute",
					left: "0px",
					zIndex: 99
				}
			)
			this.playedKeysCanvasBlack.className = "pianoCanvas"
			document.body.appendChild(this.playedKeysCanvasBlack)
			this.playedKeysCtxBlack = this.playedKeysCanvasBlack.getContext("2d")

			this.playedKeysCanvasBlack.addEventListener(
				"mousedown",
				this.onPianoMousedown.bind(this)
			)
			this.playedKeysCanvasBlack.addEventListener(
				"mouseup",
				this.onPianoMouseup.bind(this)
			)
			this.playedKeysCanvasBlack.addEventListener(
				"mousemove",
				this.onPianoMousemove.bind(this)
			)
			this.playedKeysCanvasBlack.addEventListener(
				"mouseleave",
				this.onPianoMouseleave.bind(this)
			)
		}
		return this.playedKeysCanvasBlack
	}
	onPianoMousedown(ev) {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_2__.getSetting)("clickablePiano")) {
			let { x, y } = this.getCanvasPosFromMouseEvent(ev)
			let keyUnderMouse = this.getKeyAtPos(x, y)
			if (keyUnderMouse >= 0) {
				this.currentKeyUnderMouse = keyUnderMouse
				this.isMouseDown = true
				this.onNoteOn(keyUnderMouse)
			} else {
				this.clearCurrentKeyUnderMouse()
			}
		}
	}

	onPianoMouseup(ev) {
		this.isMouseDown = false
		this.clearCurrentKeyUnderMouse()
	}
	onPianoMouseleave(ev) {
		this.isMouseDown = false
		this.clearCurrentKeyUnderMouse()
	}

	onPianoMousemove(ev) {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_2__.getSetting)("clickablePiano")) {
			let { x, y } = this.getCanvasPosFromMouseEvent(ev)
			let keyUnderMouse = this.getKeyAtPos(x, y)
			if (this.isMouseDown && keyUnderMouse >= 0) {
				if (this.currentKeyUnderMouse != keyUnderMouse) {
					this.onNoteOff(this.currentKeyUnderMouse)
					this.onNoteOn(keyUnderMouse)
					this.currentKeyUnderMouse = keyUnderMouse
				}
			} else {
				this.clearCurrentKeyUnderMouse()
			}
		}
	}
	clearCurrentKeyUnderMouse() {
		if (this.currentKeyUnderMouse >= 0) {
			this.onNoteOff(this.currentKeyUnderMouse)
		}
		this.currentKeyUnderMouse = -1
	}
	getKeyAtPos(x, y) {
		let clickedKey = -1
		for (let i = 0; i <= 87; i++) {
			let dims = this.renderDimensions.getKeyDimensions(i)
			if (x > dims.x && x < dims.x + dims.w) {
				if (y > dims.y && y < dims.y + dims.h) {
					if (clickedKey == -1) {
						clickedKey = i
					} else if ((0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isBlack)(i) && !(0,_Util_js__WEBPACK_IMPORTED_MODULE_3__.isBlack)(clickedKey)) {
						clickedKey = i
						break
					}
				}
			}
		}
		return clickedKey
	}
	getCanvasPosFromMouseEvent(ev) {
		let canvHt = Math.max(
			this.renderDimensions.whiteKeyHeight,
			this.renderDimensions.blackKeyHeight
		)
		let x = ev.clientX
		let y =
			ev.clientY -
			(this.renderDimensions.windowHeight -
				canvHt -
				(this.renderDimensions.windowHeight -
					canvHt -
					this.renderDimensions.getAbsolutePianoPosition()))
		return { x, y }
	}
}


/***/ }),

/***/ "./js/Rendering/ProgressBarRender.js":
/*!*******************************************!*\
  !*** ./js/Rendering/ProgressBarRender.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgressBarRender: () => (/* binding */ ProgressBarRender)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");


/**
 * Renders the progress bar of the song
 */
class ProgressBarRender {
	constructor(ctx, renderDimensions) {
		this.ctx = ctx
		this.ctx.canvas.addEventListener(
			"mousemove",
			function (ev) {
				this.mouseX = ev.clientX
			}.bind(this)
		)
		this.ctx.canvas.addEventListener(
			"mouseleave",
			function (ev) {
				this.mouseX = -1000
			}.bind(this)
		)
		this.renderDimensions = renderDimensions
	}
	render(time, end, markers) {
		this.ctx.clearRect(
			0,
			0,
			this.renderDimensions.windowWidth,
			this.renderDimensions.windowHeight
		)
		let ctx = this.ctx
		let progressPercent = time / (end / 1000)
		ctx.fillStyle = "rgba(80,80,80,0.8)"
		ctx.fillRect(this.renderDimensions.windowWidth * progressPercent, 0, 2, 20)
		ctx.fillStyle = "rgba(50,150,50,0.8)"
		ctx.fillRect(0, 0, this.renderDimensions.windowWidth * progressPercent, 20)

		let isShowingAMarker = false

		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showMarkersTimeline")) {
			markers.forEach(marker => {
				let xPos = (marker.timestamp / end) * this.renderDimensions.windowWidth
				if (Math.abs(xPos - this.mouseX) < 10) {
					isShowingAMarker = true
					let txtWd = ctx.measureText(marker.text).width
					ctx.fillStyle = "black"
					ctx.fillText(
						marker.text,
						Math.max(
							5,
							Math.min(
								this.renderDimensions.windowWidth - txtWd - 5,
								xPos - txtWd / 2
							)
						),
						15
					)
				} else {
					ctx.strokeStyle = "black"
					ctx.lineWidth = 2
					ctx.beginPath()
					ctx.moveTo(xPos, 0)
					ctx.lineTo(xPos, 25)

					ctx.closePath()
					ctx.stroke()
				}
			})
		}

		if (!isShowingAMarker) {
			ctx.fillStyle = "rgba(0,0,0,1)"
			let showMilis = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showMiliseconds")
			let text =
				(0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(Math.min(time, end), showMilis) +
				" / " +
				(0,_Util_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(end / 1000, showMilis)
			let wd = ctx.measureText(text).width
			ctx.font = "14px Arial black"
			ctx.fillText(text, this.renderDimensions.windowWidth / 2 - wd / 2, 15)
		}
	}
}


/***/ }),

/***/ "./js/Rendering/Render.js":
/*!********************************!*\
  !*** ./js/Rendering/Render.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Render: () => (/* binding */ Render)
/* harmony export */ });
/* harmony import */ var _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/DomHelper.js */ "./js/ui/DomHelper.js");
/* harmony import */ var _PianoRender_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PianoRender.js */ "./js/Rendering/PianoRender.js");
/* harmony import */ var _DebugRender_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DebugRender.js */ "./js/Rendering/DebugRender.js");
/* harmony import */ var _OverlayRender_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OverlayRender.js */ "./js/Rendering/OverlayRender.js");
/* harmony import */ var _NoteRender_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NoteRender.js */ "./js/Rendering/NoteRender.js");
/* harmony import */ var _SustainRenderer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SustainRenderer.js */ "./js/Rendering/SustainRenderer.js");
/* harmony import */ var _MarkerRenderer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MarkerRenderer.js */ "./js/Rendering/MarkerRenderer.js");
/* harmony import */ var _RenderDimensions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./RenderDimensions.js */ "./js/Rendering/RenderDimensions.js");
/* harmony import */ var _BackgroundRender_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BackgroundRender.js */ "./js/Rendering/BackgroundRender.js");
/* harmony import */ var _MeasureLinesRender_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MeasureLinesRender.js */ "./js/Rendering/MeasureLinesRender.js");
/* harmony import */ var _ProgressBarRender_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProgressBarRender.js */ "./js/Rendering/ProgressBarRender.js");
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");
/* harmony import */ var _player_Tracks_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../player/Tracks.js */ "./js/player/Tracks.js");
/* harmony import */ var _player_Player_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../player/Player.js */ "./js/player/Player.js");
/* harmony import */ var _InSongTextRenderer_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./InSongTextRenderer.js */ "./js/Rendering/InSongTextRenderer.js");

















const DEBUG = true

const DEFAULT_LOOK_BACK_TIME = 4
const LOOK_AHEAD_TIME = 10

const PROGRESS_BAR_CANVAS_HEIGHT = 20

/**
 * Class that handles all rendering
 */
class Render {
	constructor() {
		this.renderDimensions = new _RenderDimensions_js__WEBPACK_IMPORTED_MODULE_7__.RenderDimensions()
		this.renderDimensions.registerResizeCallback(this.setupCanvases.bind(this))

		;(0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.setSettingCallback)("particleBlur", this.setCtxBlur.bind(this))

		this.setupCanvases()

		this.pianoRender = new _PianoRender_js__WEBPACK_IMPORTED_MODULE_1__.PianoRender(this.renderDimensions)

		this.overlayRender = new _OverlayRender_js__WEBPACK_IMPORTED_MODULE_3__.OverlayRender(this.ctx, this.renderDimensions)
		// this.addStartingOverlayMessage()

		this.debugRender = new _DebugRender_js__WEBPACK_IMPORTED_MODULE_2__.DebugRender(DEBUG, this.ctx, this.renderDimensions)
		this.noteRender = new _NoteRender_js__WEBPACK_IMPORTED_MODULE_4__.NoteRender(
			this.ctx,
			this.ctxForeground,
			this.renderDimensions,
			this.pianoRender
		)
		this.sustainRender = new _SustainRenderer_js__WEBPACK_IMPORTED_MODULE_5__.SustainRender(this.ctx, this.renderDimensions)
		this.markerRender = new _MarkerRenderer_js__WEBPACK_IMPORTED_MODULE_6__.MarkerRenderer(this.ctx, this.renderDimensions)
		this.inSongTextRender = new _InSongTextRenderer_js__WEBPACK_IMPORTED_MODULE_15__.InSongTextRenderer(
			this.ctx,
			this.renderDimensions
		)

		this.measureLinesRender = new _MeasureLinesRender_js__WEBPACK_IMPORTED_MODULE_9__.MeasureLinesRender(
			this.ctx,
			this.renderDimensions
		)

		this.progressBarRender = new _ProgressBarRender_js__WEBPACK_IMPORTED_MODULE_10__.ProgressBarRender(
			this.progressBarCtx,
			this.renderDimensions
		)

		this.backgroundRender = new _BackgroundRender_js__WEBPACK_IMPORTED_MODULE_8__.BackgroundRender(
			this.ctxBG,
			this.renderDimensions
		)

		this.mouseX = 0
		this.mouseY = 0

		this.playerState = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_14__.getPlayerState)()

		this.showKeyNamesOnPianoWhite = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("showKeyNamesOnPianoWhite")
		this.showKeyNamesOnPianoBlack = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("showKeyNamesOnPianoBlack")
	}

	setCtxBlur() {
		let blurPx = parseInt((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("particleBlur"))
		if (blurPx == 0) {
			this.ctxForeground.filter = "none"
		} else {
			this.ctxForeground.filter = "blur(" + blurPx + "px)"
		}
	}
	setPianoInputListeners(onNoteOn, onNoteOff) {
		this.pianoRender.setPianoInputListeners(onNoteOn, onNoteOff)
	}

	/**
	 * Main rendering function
	 */
	render(playerState) {
		this.playerState = playerState
		this.ctx.clearRect(
			0,
			0,
			this.renderDimensions.windowWidth,
			this.renderDimensions.windowHeight
		)
		this.ctxForeground.clearRect(
			0,
			0,
			this.renderDimensions.windowWidth,
			this.renderDimensions.windowHeight
		)

		this.pianoRender.clearPlayedKeysCanvases()
		if (
			this.showKeyNamesOnPianoWhite != (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("showKeyNamesOnPianoWhite") ||
			this.showKeyNamesOnPianoBlack != (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("showKeyNamesOnPianoBlack")
		) {
			this.showKeyNamesOnPianoWhite = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("showKeyNamesOnPianoWhite")
			this.showKeyNamesOnPianoBlack = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("showKeyNamesOnPianoBlack")
			this.pianoRender.resize()
		}

		if (
			this.renderDimensions.pianoPositionY !=
			parseInt((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("pianoPosition"))
		) {
			this.renderDimensions.pianoPositionY = parseInt(
				(0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("pianoPosition")
			)
			this.pianoRender.repositionCanvases()
		}
		this.backgroundRender.renderIfColorsChanged()

		let renderInfosByTrackMap = this.getRenderInfoByTrackMap(playerState)
		let inputActiveRenderInfos = this.getInputActiveRenderInfos(playerState)
		let inputPlayedRenderInfos = this.getInputPlayedRenderInfos(playerState)
		const time = this.getRenderTime(playerState)
		const end = playerState.end
		if (!playerState.loading && playerState.song) {
			const measureLines = playerState.song
				? playerState.song.getMeasureLines()
				: []

			this.progressBarRender.render(time, end, playerState.song.markers)
			this.measureLinesRender.render(time, measureLines)
			this.sustainRender.render(
				time,
				playerState.song.sustainsBySecond,
				playerState.song.sustainPeriods
			)

			this.noteRender.render(
				time,
				renderInfosByTrackMap,
				inputActiveRenderInfos,
				inputPlayedRenderInfos
			)
			this.markerRender.render(time, playerState.song.markers)
			this.inSongTextRender.render(time, playerState.song.markers)
		}

		this.overlayRender.render()

		this.debugRender.render(
			renderInfosByTrackMap,
			this.mouseX,
			this.mouseY,
			this.renderDimensions.menuHeight
		)

		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("showBPM")) {
			this.drawBPM(playerState)
		}
	}
	/**
	 * Returns current time adjusted for the render-offset from the settings
	 * @param {Object} playerState
	 */
	getRenderTime(playerState) {
		return playerState.time + (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("renderOffset") / 1000
	}
	getRenderInfoByTrackMap(playerState) {
		let renderInfoByTrackMap = {}
		if (playerState)
			if (playerState.song) {
				playerState.song.activeTracks.forEach((track, trackIndex) => {
					if ((0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_13__.isTrackDrawn)(trackIndex)) {
						renderInfoByTrackMap[trackIndex] = { black: [], white: [] }

						let time = this.getRenderTime(playerState)
						let firstSecondShown = Math.floor(
							time - this.renderDimensions.getSecondsDisplayedAfter() - 4
						)
						let lastSecondShown = Math.ceil(
							time + this.renderDimensions.getSecondsDisplayedBefore()
						)

						for (let i = firstSecondShown; i < lastSecondShown; i++) {
							if (track.notesBySeconds[i]) {
								track.notesBySeconds[i]
									// .filter(note => note.instrument != "percussion")
									.map(note => this.getNoteRenderInfo(note, time))
									.forEach(renderInfo =>
										renderInfo.isBlack
											? renderInfoByTrackMap[trackIndex].black.push(renderInfo)
											: renderInfoByTrackMap[trackIndex].white.push(renderInfo)
									)
							}
						}
					}
				})
			}
		return renderInfoByTrackMap
	}
	getInputActiveRenderInfos(playerState) {
		let inputRenderInfos = []
		for (let key in playerState.inputActiveNotes) {
			let activeInputNote = playerState.inputActiveNotes[key]
			inputRenderInfos.push(
				this.getNoteRenderInfo(
					{
						timestamp: activeInputNote.timestamp,
						noteNumber: activeInputNote.noteNumber,
						offTime: playerState.ctxTime * 1000 + 0,
						duration: playerState.ctxTime * 1000 - activeInputNote.timestamp,
						velocity: 127,
						fillStyle: (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("inputNoteColor")
					},
					playerState.ctxTime
				)
			)
		}
		return inputRenderInfos
	}
	getInputPlayedRenderInfos(playerState) {
		let inputRenderInfos = []
		for (let key in playerState.inputPlayedNotes) {
			let playedInputNote = playerState.inputPlayedNotes[key]
			inputRenderInfos.push(
				this.getNoteRenderInfo(
					{
						timestamp: playedInputNote.timestamp,
						noteNumber: playedInputNote.noteNumber,
						offTime: playedInputNote.offTime,
						duration: playerState.ctxTime * 1000 - playedInputNote.timestamp,
						velocity: 127,
						fillStyle: (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_11__.getSetting)("inputNoteColor")
					},
					playerState.ctxTime
				)
			)
		}
		return inputRenderInfos
	}
	getNoteRenderInfo(note, time) {
		time *= 1000
		let noteDims = this.renderDimensions.getNoteDimensions(
			note.noteNumber,
			time,
			note.timestamp,
			note.offTime,
			note.sustainOffTime
		)
		let isOn = note.timestamp < time && note.offTime > time ? 1 : 0
		let elapsedTime = Math.max(0, time - note.timestamp)
		let noteDoneRatio = elapsedTime / note.duration

		let isKeyBlack = (0,_Util_js__WEBPACK_IMPORTED_MODULE_12__.isBlack)(note.noteNumber)
		//TODO Clean up. Right now it returns more info than necessary to use in DebugRender..
		return {
			noteNumber: note.noteNumber,
			timestamp: note.timestamp,
			offTime: note.offTime,
			duration: note.duration,
			instrument: note.instrument,
			track: note.track,
			channel: note.channel,
			fillStyle: note.fillStyle
				? note.fillStyle
				: isKeyBlack
				? (0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_13__.getTrackColor)(note.track).black
				: (0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_13__.getTrackColor)(note.track).white,
			currentTime: time,
			isBlack: isKeyBlack,
			noteDims: noteDims,
			isOn: isOn,
			noteDoneRatio: noteDoneRatio,
			rad: noteDims.rad,
			x: noteDims.x + 1,
			y: noteDims.y,
			w: noteDims.w - 2,
			h: noteDims.h,
			sustainH: noteDims.sustainH,
			sustainY: noteDims.sustainY,
			velocity: note.velocity,
			noteId: note.id
		}
	}

	drawBPM(playerState) {
		this.ctx.font = "20px Arial black"
		this.ctx.fillStyle = "rgba(255,255,255,0.8)"
		this.ctx.textBaseline = "top"
		this.ctx.fillText(
			Math.round(playerState.bpm) + " BPM",
			20,
			this.renderDimensions.menuHeight + PROGRESS_BAR_CANVAS_HEIGHT + 12
		)
	}

	addStartingOverlayMessage() {
		this.overlayRender.addOverlay("MIDiano", 150)
		this.overlayRender.addOverlay("A Javascript MIDI-Player", 150)
		this.overlayRender.addOverlay(
			"Example song by Bernd Krueger from piano-midi.de",
			150
		)
	}

	/**
	 *
	 */
	setupCanvases() {
		_ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.setCanvasSize(
			this.getBgCanvas(),
			this.renderDimensions.windowWidth,
			this.renderDimensions.windowHeight
		)

		_ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.setCanvasSize(
			this.getMainCanvas(),
			this.renderDimensions.windowWidth,
			this.renderDimensions.windowHeight
		)

		_ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.setCanvasSize(
			this.getProgressBarCanvas(),
			this.renderDimensions.windowWidth,
			20
		)

		_ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.setCanvasSize(
			this.getForegroundCanvas(),
			this.renderDimensions.windowWidth,
			this.renderDimensions.windowHeight
		)
		this.setCtxBlur()
	}
	getBgCanvas() {
		if (!this.cnvBG) {
			this.cnvBG = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createCanvas(
				this.renderDimensions.windowWidth,
				this.renderDimensions.windowHeight,
				{
					backgroundColor: "black",
					position: "absolute",
					top: "0px",
					left: "0px"
				}
			)
			document.body.appendChild(this.cnvBG)
			this.ctxBG = this.cnvBG.getContext("2d")
		}
		return this.cnvBG
	}
	getMainCanvas() {
		if (!this.cnv) {
			this.cnv = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createCanvas(
				this.renderDimensions.windowWidth,
				this.renderDimensions.windowHeight,
				{
					position: "absolute",
					top: "0px",
					left: "0px"
				}
			)
			document.body.appendChild(this.cnv)
			this.ctx = this.cnv.getContext("2d")
		}
		return this.cnv
	}
	getForegroundCanvas() {
		if (!this.cnvForeground) {
			this.cnvForeground = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createCanvas(
				this.renderDimensions.windowWidth,
				this.renderDimensions.windowHeight,
				{
					position: "absolute",
					top: "0px",
					left: "0px"
				}
			)
			this.cnvForeground.style.pointerEvents = "none"
			this.cnvForeground.style.zIndex = "101"
			document.body.appendChild(this.cnvForeground)
			this.ctxForeground = this.cnvForeground.getContext("2d")
		}
		return this.cnvForeground
	}

	getProgressBarCanvas() {
		if (!this.progressBarCanvas) {
			this.progressBarCanvas = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createCanvas(
				this.renderDimensions.windowWidth,
				PROGRESS_BAR_CANVAS_HEIGHT,
				{}
			)
			this.progressBarCanvas.id = "progressBarCanvas"
			document.body.appendChild(this.progressBarCanvas)
			this.progressBarCtx = this.progressBarCanvas.getContext("2d")
		}
		return this.progressBarCanvas
	}

	isNoteDrawn(note, tracks) {
		return !tracks[note.track] || !tracks[note.track].draw
	}

	isOnMainCanvas(position) {
		return (
			(position.x > this.renderDimensions.menuHeight &&
				position.y < this.renderDimensions.getAbsolutePianoPosition()) ||
			position.y >
				this.renderDimensions.getAbsolutePianoPosition() +
					this.renderDimensions.whiteKeyHeight
		)
	}
	setMouseCoords(x, y) {
		this.mouseX = x
		this.mouseY = y
	}
	getTimeFromHeight(height) {
		return (
			(height * this.renderDimensions.getNoteToHeightConst()) /
			(this.renderDimensions.windowHeight -
				this.renderDimensions.whiteKeyHeight) /
			1000
		)
	}
	onMenuHeightChanged(menuHeight) {
		this.renderDimensions.menuHeight = menuHeight
		this.pianoRender.repositionCanvases()
		this.getProgressBarCanvas().style.top = menuHeight + "px"
		this.noteRender.setMenuHeight(menuHeight)
	}
}


/***/ }),

/***/ "./js/Rendering/RenderDimensions.js":
/*!******************************************!*\
  !*** ./js/Rendering/RenderDimensions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderDimensions: () => (/* binding */ RenderDimensions)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");



const MAX_NOTE_NUMBER = 87
const MIN_NOTE_NUMBER = 0

const MIN_WIDTH = 1040
const MIN_HEIGHT = 560

/**
 * Class to handle all the calculation of dimensions of the Notes & Keys on Screen-
 */
class RenderDimensions {
	constructor() {
		window.addEventListener("resize", this.resize.bind(this))
		this.resizeCallbacks = []
		this.numberOfWhiteKeysShown = 52
		this.minNoteNumber = MIN_NOTE_NUMBER
		this.maxNoteNumber = MAX_NOTE_NUMBER
		this.menuHeight = 200
		;(0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.setSettingCallback)("blackKeyHeight", this.resize.bind(this))
		;(0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.setSettingCallback)("whiteKeyHeight", this.resize.bind(this))
		this.resize()
	}
	/**
	 * Recompute all dimensions dependent on Screen Size
	 */
	resize() {
		this.windowWidth = Math.max(MIN_WIDTH, Math.floor(window.innerWidth))
		this.windowHeight = Math.floor(window.innerHeight)

		this.keyDimensions = {}
		this.computeKeyDimensions()
		this.resizeCallbacks.forEach(func => func())
	}
	registerResizeCallback(callback) {
		this.resizeCallbacks.push(callback)
	}

	/**
	 * Computes the key dimensions. Should be called on resize.
	 */
	computeKeyDimensions() {
		this.pianoPositionY = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("pianoPosition")
		this.whiteKeyWidth =
			// Math.max(
			// 	20,
			this.windowWidth / this.numberOfWhiteKeysShown
		// )

		this.whiteKeyHeight = Math.min(
			Math.floor(this.windowHeight * 0.2),
			this.whiteKeyWidth * 4.5
		)
		this.blackKeyWidth = Math.floor(this.whiteKeyWidth * 0.5829787234)
		this.blackKeyHeight =
			Math.floor((this.whiteKeyHeight * 2) / 3) *
			((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("blackKeyHeight") / 100)

		//Do this after computing blackKey, as its dependent on the white key size ( without adjusting for the setting )
		this.whiteKeyHeight *= (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("whiteKeyHeight") / 100
	}

	/**
	 * Returns the dimensions for the piano-key of the given note
	 *
	 * @param {Number} noteNumber
	 */
	getKeyDimensions(noteNumber) {
		if (!this.keyDimensions.hasOwnProperty(noteNumber)) {
			let isNoteBlack = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(noteNumber)
			let x = this.getKeyX(noteNumber)

			this.keyDimensions[noteNumber] = {
				x: x,
				y: 0,
				w: isNoteBlack ? this.blackKeyWidth : this.whiteKeyWidth,
				h: isNoteBlack ? this.blackKeyHeight : this.whiteKeyHeight,
				black: isNoteBlack
			}
		}
		return this.keyDimensions[noteNumber]
	}
	getAbsolutePianoPosition() {
		let pianoSettingsRatio = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("reverseNoteDirection")
			? 1 - parseInt(this.pianoPositionY) / 100
			: parseInt(this.pianoPositionY) / 100
		let y =
			this.windowHeight -
			this.whiteKeyHeight -
			Math.ceil(
				pianoSettingsRatio *
					(this.windowHeight - this.whiteKeyHeight - this.menuHeight - 24)
			)

		return y
	}

	/**
	 * Returns x-value  of the given Notenumber
	 *
	 * @param {Integer} noteNumber
	 */
	getKeyX(noteNumber) {
		return (
			(this.getWhiteKeyNumber(noteNumber) -
				this.getWhiteKeyNumber(this.minNoteNumber)) *
				this.whiteKeyWidth +
			(this.whiteKeyWidth - this.blackKeyWidth / 2) * (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(noteNumber)
		)
	}

	/**
	 * Returns the "white key index" of the note number. Ignores if the key itself is black
	 * @param {Number} noteNumber
	 */
	getWhiteKeyNumber(noteNumber) {
		return (
			noteNumber -
			Math.floor(Math.max(0, noteNumber + 11) / 12) -
			Math.floor(Math.max(0, noteNumber + 8) / 12) -
			Math.floor(Math.max(0, noteNumber + 6) / 12) -
			Math.floor(Math.max(0, noteNumber + 3) / 12) -
			Math.floor(Math.max(0, noteNumber + 1) / 12)
		)
	}

	/**
	 * Returns y value corresponding to the given time
	 *
	 * @param {Number} time
	 */
	getYForTime(time) {
		const height = this.windowHeight - this.whiteKeyHeight
		let noteToHeightConst = this.getNoteToHeightConst()
		if (time < 0) {
			noteToHeightConst /= (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("playedNoteFalloffSpeed")
		}

		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("reverseNoteDirection")) {
			return (
				(time / noteToHeightConst) * height +
				this.getAbsolutePianoPosition() +
				this.whiteKeyHeight
			)
		} else {
			return (
				height -
				(time / noteToHeightConst) * height -
				(height - this.getAbsolutePianoPosition())
			)
		}
	}

	/**
     *Returns rendering x/y-location & size for the given note & time-info
     
	 * @param {Integer} noteNumber 
	 * @param {Number} currentTime
	 * @param {Number} noteStartTime
	 * @param {Number} noteEndTime
	 * @param {Number} sustainOffTime
	 */
	getNoteDimensions(
		noteNumber,
		currentTime,
		noteStartTime,
		noteEndTime,
		sustainOffTime
	) {
		const dur = noteEndTime - noteStartTime
		const isKeyBlack = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(noteNumber)
		let x = this.getKeyX(noteNumber)
		let w = isKeyBlack ? this.blackKeyWidth : this.whiteKeyWidth
		let h =
			(dur / this.getNoteToHeightConst()) *
			(this.windowHeight - this.whiteKeyHeight)

		let hCorrection = 0
		let minNoteHeight = parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("minNoteHeight"))
		if (h < minNoteHeight + 2) {
			hCorrection = minNoteHeight + 2 - h
			h = minNoteHeight + 2
		}

		let rad = ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("noteBorderRadius") / 100) * w
		if (h < rad * 2) {
			rad = h / 2
		}
		let y = this.getYForTime(noteEndTime - currentTime)
		let reversed = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("reverseNoteDirection")
		if (reversed) {
			y -= h
		}

		let sustainY = 0
		let sustainH = 0
		if (sustainOffTime > noteEndTime) {
			sustainH =
				((sustainOffTime - noteEndTime) / this.getNoteToHeightConst()) *
				(this.windowHeight - this.whiteKeyHeight)
			sustainY = this.getYForTime(sustainOffTime - currentTime)
			if (reversed) {
				sustainY -= sustainH
			}
		}

		//adjust height/y for notes that have passed the piano / have been played
		let showSustainedNotes = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("showSustainedNotes")
		let endTime = showSustainedNotes
			? Math.max(isNaN(sustainOffTime) ? 0 : sustainOffTime, noteEndTime)
			: noteEndTime

		if (showSustainedNotes) {
			if (!isNaN(sustainOffTime) && sustainOffTime < currentTime) {
				sustainY += (reversed ? -1 : 1) * this.whiteKeyHeight
			}
			if (
				!isNaN(sustainOffTime) &&
				sustainOffTime > currentTime &&
				noteEndTime < currentTime
			) {
				sustainH += this.whiteKeyHeight
				if (reversed) {
					sustainY -= this.whiteKeyHeight
				}
			}
		}

		if (endTime < currentTime) {
			let endRatio =
				(currentTime - endTime) / this.getMilisecondsDisplayedAfter()

			endRatio = Math.max(0, 1 - (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("noteEndedShrink") * endRatio)

			x = x + (w - w * endRatio) / 2
			w *= endRatio

			let tmpH = h
			h *= endRatio
			y += (reversed ? -1 : 1) * (tmpH - h)

			let tmpSustainH = sustainH
			sustainH *= endRatio
			sustainY +=
				(reversed ? -1 : 1) * (tmpSustainH - sustainH) +
				(reversed ? -1 : 1) * (tmpH - h)
		}
		return {
			x: x + 1,
			y: y + 1 - hCorrection,
			w: w - 2,
			h: h - 2,
			rad: rad,
			sustainH: sustainH,
			sustainY: sustainY,
			isBlack: isKeyBlack
		}
	}

	getNoteToHeightConst() {
		return (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("noteToHeightConst") * this.windowHeight
	}

	getSecondsDisplayedBefore() {
		let pianoPos = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("pianoPosition") / 100
		return Math.ceil(((1 - pianoPos) * this.getNoteToHeightConst()) / 1000)
	}
	getSecondsDisplayedAfter() {
		return Math.ceil(this.getMilisecondsDisplayedAfter() / 1000)
	}
	getMilisecondsDisplayedAfter() {
		let pianoPos = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("pianoPosition") / 100
		return (
			pianoPos *
			(this.getNoteToHeightConst() / (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSetting)("playedNoteFalloffSpeed"))
		)
	}

	//ZOOM
	showAll() {
		this.setZoom(MIN_NOTE_NUMBER, MAX_NOTE_NUMBER)
	}
	fitSong(range) {
		range.min = Math.max(range.min, MIN_NOTE_NUMBER)
		range.max = Math.min(range.max, MAX_NOTE_NUMBER)
		while (
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(range.min - MIN_NOTE_NUMBER) &&
			range.min > MIN_NOTE_NUMBER
		) {
			range.min--
		}
		while (
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(range.max - MIN_NOTE_NUMBER) &&
			range.max < MAX_NOTE_NUMBER
		) {
			range.max++
		}
		this.setZoom(range.min, range.max)
	}
	zoomIn() {
		this.minNoteNumber++
		this.maxNoteNumber--
		while (
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(this.minNoteNumber - MIN_NOTE_NUMBER) &&
			this.minNoteNumber < this.maxNoteNumber
		) {
			this.minNoteNumber++
		}
		while (
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(this.maxNoteNumber - MIN_NOTE_NUMBER) &&
			this.maxNoteNumber > this.minNoteNumber
		) {
			this.maxNoteNumber--
		}
		this.setZoom(this.minNoteNumber, this.maxNoteNumber)
	}
	zoomOut() {
		this.minNoteNumber--
		this.maxNoteNumber++
		while (
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(this.minNoteNumber - MIN_NOTE_NUMBER) &&
			this.minNoteNumber > MIN_NOTE_NUMBER
		) {
			this.minNoteNumber--
		}
		while (
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(this.maxNoteNumber - MIN_NOTE_NUMBER) &&
			this.maxNoteNumber < MAX_NOTE_NUMBER
		) {
			this.maxNoteNumber++
		}
		this.setZoom(
			Math.max(MIN_NOTE_NUMBER, this.minNoteNumber),
			Math.min(MAX_NOTE_NUMBER, this.maxNoteNumber)
		)
	}
	moveViewLeft() {
		if (this.minNoteNumber == MIN_NOTE_NUMBER) return
		this.minNoteNumber--
		this.maxNoteNumber--
		while (
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(this.minNoteNumber - MIN_NOTE_NUMBER) &&
			this.minNoteNumber > MIN_NOTE_NUMBER
		) {
			this.minNoteNumber--
		}
		while ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(this.maxNoteNumber - MIN_NOTE_NUMBER)) {
			this.maxNoteNumber--
		}
		this.setZoom(
			Math.max(MIN_NOTE_NUMBER, this.minNoteNumber),
			this.maxNoteNumber
		)
	}
	moveViewRight() {
		if (this.maxNoteNumber == MAX_NOTE_NUMBER) return
		this.minNoteNumber++
		this.maxNoteNumber++
		while ((0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(this.minNoteNumber - MIN_NOTE_NUMBER)) {
			this.minNoteNumber++
		}
		while (
			(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(this.maxNoteNumber - MIN_NOTE_NUMBER) &&
			this.maxNoteNumber < MAX_NOTE_NUMBER
		) {
			this.maxNoteNumber++
		}

		this.setZoom(
			this.minNoteNumber,
			Math.min(MAX_NOTE_NUMBER, this.maxNoteNumber)
		)
	}

	/**
	 *
	 * @param {Number} minNoteNumber
	 * @param {Number} maxNoteNumber
	 */
	setZoom(minNoteNumber, maxNoteNumber) {
		let numOfWhiteKeysInRange = 0
		for (let i = minNoteNumber; i <= maxNoteNumber; i++) {
			numOfWhiteKeysInRange += (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.isBlack)(i - MIN_NOTE_NUMBER) ? 0 : 1
		}
		this.minNoteNumber = minNoteNumber
		this.maxNoteNumber = maxNoteNumber
		this.numberOfWhiteKeysShown = numOfWhiteKeysInRange

		this.resize()
	}
}


/***/ }),

/***/ "./js/Rendering/SustainRenderer.js":
/*!*****************************************!*\
  !*** ./js/Rendering/SustainRenderer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SustainRender: () => (/* binding */ SustainRender)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");


/**
 * Class to render the sustain events in the midi-song. Can fill the sustain periods or draw lines for the individual control-events.
 */
class SustainRender {
	constructor(ctx, renderDimensions, lookBackTime, lookAheadTime) {
		this.ctx = ctx
		this.renderDimensions = renderDimensions

		this.sustainPeriodFillStyle = "rgba(0,0,0,0.4)"
		this.sustainOnStrokeStyle = "rgba(55,155,55,0.6)"
		this.sustainOffStrokeStyle = "rgba(155,55,55,0.6)"
		this.sustainOnOffFont = "12px Arial black"
	}
	render(time, sustainsBySecond, sustainPeriods) {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showSustainOnOffs")) {
			this.renderSustainOnOffs(time, sustainsBySecond)
		}
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("showSustainPeriods")) {
			this.renderSustainPeriods(time, sustainPeriods)
		}
	}
	/**
	 * Renders On/Off Sustain Control-Events as lines on screen.
	 *
	 * @param {Number} time
	 * @param {Object} sustainsBySecond
	 */
	renderSustainOnOffs(time, sustainsBySecond) {
		let lookBackTime = Math.floor(
			time - this.renderDimensions.getSecondsDisplayedAfter() - 4
		)
		let lookAheadTime = Math.ceil(
			time + this.renderDimensions.getSecondsDisplayedBefore() + 1
		)

		for (
			let lookUpTime = lookBackTime;
			lookUpTime < lookAheadTime;
			lookUpTime++
		) {
			if (sustainsBySecond.hasOwnProperty(lookUpTime)) {
				sustainsBySecond[lookUpTime].forEach(sustain => {
					this.ctx.lineWidth = "1"
					let text = ""
					this.ctx.fillStyle = "rgba(0,0,0,0.8)"
					if (sustain.isOn) {
						this.ctx.strokeStyle = this.sustainOnStrokeStyle
						text = "Sustain On"
					} else {
						this.ctx.strokeStyle = this.sustainOffStrokeStyle
						text = "Sustain Off"
					}
					let y = this.renderDimensions.getYForTime(
						sustain.timestamp - time * 1000
					)
					this.ctx.beginPath()
					this.ctx.moveTo(0, y)
					this.ctx.lineTo(this.renderDimensions.windowWidth, y)
					this.ctx.closePath()
					this.ctx.stroke()

					this.ctx.fillStyle = "rgba(200,200,200,0.9)"
					this.ctx.font = this.sustainOnOffFont
					this.ctx.fillText(text, 10, y - 12)
				})
			}
		}
	}
	/**
	 * Renders Sustain Periods as rectangles on screen.
	 * @param {Number} time
	 * @param {Array} sustainPeriods
	 */
	renderSustainPeriods(time, sustainPeriods) {
		let firstSecondShown = Math.floor(
			time - this.renderDimensions.getSecondsDisplayedAfter() - 4
		)
		let lastSecondShown = Math.ceil(
			time + this.renderDimensions.getSecondsDisplayedBefore() + 1
		)
		this.ctx.fillStyle = this.sustainPeriodFillStyle

		sustainPeriods
			.filter(
				period =>
					(period.start < lastSecondShown * 1000 &&
						period.start > firstSecondShown * 1000) ||
					(period.start < firstSecondShown * 1000 &&
						period.end > firstSecondShown * 1000)
			)
			.forEach(period => {
				let yStart = this.renderDimensions.getYForTime(
					period.start - time * 1000
				)
				let yEnd = this.renderDimensions.getYForTime(period.end - time * 1000)

				this.ctx.fillRect(
					0,
					yEnd,
					this.renderDimensions.windowWidth,
					yStart - yEnd
				)
			})
	}
}


/***/ }),

/***/ "./js/Song.js":
/*!********************!*\
  !*** ./js/Song.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Song: () => (/* binding */ Song)
/* harmony export */ });
/* harmony import */ var _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/CONST.js */ "./js/data/CONST.js");

class Song {
	constructor(midiData, fileName, name) {
		this.fileName = fileName
		this.name = name || fileName
		this.text = []
		this.timeSignature
		this.keySignarture
		this.duration = 0
		this.speed = 1
		this.notesBySeconds = {}
		this.controlEvents = []
		this.temporalData = midiData.temporalData
		this.sustainsBySecond = midiData.temporalData.sustainsBySecond

		this.header = midiData.header
		this.tracks = midiData.tracks
		this.markers = []
		this.otherTracks = []
		this.activeTracks = []
		this.microSecondsPerBeat = 10
		this.channels = this.getDefaultChannels()
		this.idCounter = 0

		this.processEvents(midiData)
		console.log(this)
	}
	getStart() {
		return this.getNoteSequence()[0].timestamp
	}
	getEnd() {
		if (!this.end) {
			let noteSequence = this.getNoteSequence().sort(
				(a, b) => a.offTime - b.offTime
			)
			let lastNote = noteSequence[noteSequence.length - 1]
			this.end = lastNote.offTime
		}
		return this.end
	}
	getOffset() {
		if (!this.smpteOffset) {
			return 0 //
		} else {
			return (
				((this.smpteOffset.hour * 60 + this.smpteOffset.min) * 60 +
					this.smpteOffset.sec) *
				1000
			)
		}
	}
	getMeasureLines() {
		if (!this.measureLines) {
			this.setMeasureLines()
		}
		return this.measureLines
	}
	setMeasureLines() {
		let timeSignature = this.timeSignature || {
			numerator: 4,
			denominator: 4,
			thirtySeconds: 8
		}
		let numerator = timeSignature.numerator || 4
		let denominator = timeSignature.denominator || 4
		let thirtySeconds = timeSignature.thirtyseconds || 8

		let beatsPerMeasure = numerator / (denominator * (thirtySeconds / 32))
		let skippedBeats = beatsPerMeasure - 1
		this.measureLines = {}
		Object.keys(this.temporalData.beatsBySecond).forEach(second => {
			this.temporalData.beatsBySecond[second].forEach(beat => {
				if (skippedBeats < beatsPerMeasure - 1) {
					skippedBeats++
					return
				}
				skippedBeats = 0
				if (!this.measureLines.hasOwnProperty(second)) {
					this.measureLines[second] = []
				}
				this.measureLines[second].push(beat)
			})
		})
	}
	setSustainPeriods() {
		this.sustainPeriods = []
		let isOn = false
		for (let second in this.sustainsBySecond) {
			this.sustainsBySecond[second].forEach(sustain => {
				if (isOn) {
					if (!sustain.isOn) {
						isOn = false
						this.sustainPeriods[this.sustainPeriods.length - 1].end =
							sustain.timestamp
					}
				} else {
					if (sustain.isOn) {
						isOn = true
						this.sustainPeriods.push({
							start: sustain.timestamp,
							value: sustain.value
						})
					}
				}
			})
		}
	}
	getMicrosecondsPerBeat() {
		return this.microSecondsPerBeat
	}
	getBPM(time) {
		for (let i = this.temporalData.bpms.length - 1; i >= 0; i--) {
			if (this.temporalData.bpms[i].timestamp < time) {
				return this.temporalData.bpms[i].bpm
			}
		}
	}

	getNotes(from, to) {
		let secondStart = Math.floor(from)
		let secondEnd = Math.floor(to)
		let notes = []
		for (let i = secondStart; i < secondEnd; i++) {
			for (let track in this.activeTracks) {
				if (this.activeTracks[track].notesBySeconds.hasOwnProperty(i)) {
					for (let n in this.activeTracks[track].notesBySeconds[i]) {
						let note = this.activeTracks[track].notesBySeconds[i][n]
						if (note.timestamp > from) {
							notes.push(note)
						}
					}
				}
			}
		}
		return notes
	}
	getAllInstruments() {
		let instruments = {}
		let programs = {}
		this.controlEvents = {}
		this.tracks.forEach(track => {
			track.forEach(event => {
				let channel = event.channel

				if (event.type == "programChange") {
					programs[channel] = event.programNumber
				}

				if (event.type == "controller" && event.controllerType == 7) {
					if (
						!this.controlEvents.hasOwnProperty(
							Math.floor(event.timestamp / 1000)
						)
					) {
						this.controlEvents[Math.floor(event.timestamp / 1000)] = []
					}
					this.controlEvents[Math.floor(event.timestamp / 1000)].push(event)
				}

				if (event.type == "noteOn") {
					if (channel != 9) {
						let program = programs[channel]
						let instrument =
							_data_CONST_js__WEBPACK_IMPORTED_MODULE_0__.CONST.INSTRUMENTS.BY_ID[isFinite(program) ? program : channel]
						instruments[instrument.id] = true
						event.instrument = instrument.id
					} else {
						instruments["percussion"] = true
						event.instrument = "percussion"
					}
				}
			})
		})
		return Object.keys(instruments)
	}
	processEvents(midiData) {
		this.setSustainPeriods()
		midiData.tracks.forEach(midiTrack => {
			let newTrack = {
				notes: [],
				meta: [],
				tempoChanges: []
			}

			this.distributeEvents(midiTrack, newTrack)

			if (newTrack.notes.length) {
				this.activeTracks.push(newTrack)
			} else {
				this.otherTracks.push(newTrack)
			}
		})

		this.activeTracks.forEach((track, trackIndex) => {
			track.notesBySeconds = {}
			this.setNoteOffTimestamps(track.notes)
			this.setNoteSustainTimestamps(track.notes)
			track.notes = track.notes.slice(0).filter(note => note.type == "noteOn")
			track.notes.forEach(note => (note.track = trackIndex))
			this.setNotesBySecond(track)
		})
	}
	distributeEvents(track, newTrack) {
		track.forEach(event => {
			event.id = this.idCounter++
			if (event.type == "noteOn" || event.type == "noteOff") {
				newTrack.notes.push(event)
			} else if (event.type == "setTempo") {
				newTrack.tempoChanges.push(event)
			} else if (event.type == "trackName") {
				newTrack.name = event.text
			} else if (event.type == "text") {
				this.text.push(event.text)
			} else if (event.type == "timeSignature") {
				this.timeSignature = event
			} else if (event.type == "keySignature") {
				newTrack.keySignature = event
			} else if (event.type == "smpteOffset") {
				this.smpteOffset = event
			} else if (event.type == "marker") {
				this.markers.push(event)
			} else {
				newTrack.meta.push(event)
			}
		})
	}

	setNotesBySecond(track) {
		track.notes.forEach(note => {
			let second = Math.floor(note.timestamp / 1000)
			if (track.notesBySeconds.hasOwnProperty(second)) {
				track.notesBySeconds[second].push(note)
			} else {
				track.notesBySeconds[second] = [note]
			}
		})
	}
	getNoteSequence() {
		if (!this.notesSequence) {
			let tracks = []
			for (let t in this.activeTracks) [tracks.push(this.activeTracks[t].notes)]

			this.noteSequence = [].concat
				.apply([], tracks)
				.sort((a, b) => a.timestamp - b.timestamp)
		}
		return this.noteSequence.slice(0)
	}
	getNoteRange() {
		let seq = this.getNoteSequence()
		let min = 87
		let max = 0
		seq.forEach(note => {
			if (note.noteNumber > max) {
				max = note.noteNumber
			}
			if (note.noteNumber < min) {
				min = note.noteNumber
			}
		})
		return { min, max }
	}
	setNoteSustainTimestamps(notes) {
		for (let i = 0; i < notes.length; i++) {
			let note = notes[i]
			let currentSustains = this.sustainPeriods.filter(
				period =>
					(period.start < note.timestamp && period.end > note.timestamp) ||
					(period.start < note.offTime && period.end > note.offTime)
			)
			if (currentSustains.length) {
				note.sustainOnTime = currentSustains[0].start
				let end = Math.max.apply(
					null,
					currentSustains.map(sustain => sustain.end)
				)
				note.sustainOffTime = end
				note.sustainDuration = note.sustainOffTime - note.timestamp
			}
		}
	}

	setNoteOffTimestamps(notes) {
		for (let i = 0; i < notes.length; i++) {
			let note = notes[i]
			if (note.type == "noteOn") {
				Song.findOffNote(i, notes.slice(0))
			}
		}
	}

	static findOffNote(index, notes) {
		let onNote = notes[index]
		for (let i = index + 1; i < notes.length; i++) {
			if (
				notes[i].type == "noteOff" &&
				onNote.noteNumber == notes[i].noteNumber
			) {
				onNote.offTime = notes[i].timestamp
				onNote.offVelocity = notes[i].velocity
				onNote.duration = onNote.offTime - onNote.timestamp

				break
			}
		}
	}

	getDefaultChannels() {
		let channels = {}
		for (var i = 0; i <= 15; i++) {
			channels[i] = {
				instrument: i,
				pitchBend: 0,
				volume: 127,
				volumeControl: 50,
				mute: false,
				mono: false,
				omni: false,
				solo: false
			}
		}
		channels[9].instrument = -1
		return channels
	}
}


/***/ }),

/***/ "./js/SoundfontLoader.js":
/*!*******************************!*\
  !*** ./js/SoundfontLoader.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SoundfontLoader: () => (/* binding */ SoundfontLoader)
/* harmony export */ });
/* harmony import */ var _audio_Buffers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio/Buffers.js */ "./js/audio/Buffers.js");
/* harmony import */ var _ui_Loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/Loader.js */ "./js/ui/Loader.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Util.js */ "./js/Util.js");



class SoundfontLoader {
	/**
	 *
	 * @param {String} instrument
	 */
	static async loadInstrument(instrument, soundfontName) {
		let baseUrl = "https://gleitz.github.io/midi-js-soundfonts/"
		if (instrument == "percussion") {
			soundfontName = "FluidR3_GM"
			baseUrl = ""
		}
		let fileType = _Util_js__WEBPACK_IMPORTED_MODULE_2__.iOS ? "mp3" : "ogg"
		return fetch(
			baseUrl + soundfontName + "/" + instrument + "-" + fileType + ".js"
		)
			.then(response => {
				if (response.ok) {
					(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_1__.getLoader)().setLoadMessage(
						"Loaded " + instrument + " from " + soundfontName + " soundfont."
					)
					return response.text()
				}
				throw Error(response.statusText)
			})
			.then(data => {
				let scr = document.createElement("script")
				scr.language = "javascript"
				scr.type = "text/javascript"
				let newData = (0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.replaceAllString)(data, "Soundfont", soundfontName)
				scr.text = newData
				document.body.appendChild(scr)
			})
			.catch(function (error) {
				console.error("Error fetching soundfont: \n", error)
			})
	}
	static async loadInstruments(instruments) {
		return await Promise.all(
			instruments
				.slice(0)
				.map(instrument => SoundfontLoader.loadInstrument(instrument))
		)
	}
	static async getBuffers(ctx) {
		let sortedBuffers = null
		await SoundfontLoader.createBuffers(ctx).then(
			unsortedBuffers => {
				unsortedBuffers.forEach(noteBuffer => {
					;(0,_audio_Buffers_js__WEBPACK_IMPORTED_MODULE_0__.setBuffer)(
						noteBuffer.soundfontName,
						noteBuffer.instrument,
						noteBuffer.noteKey,
						noteBuffer.buffer
					)
				})
			},
			error => console.error(error)
		)
		return sortedBuffers
	}
	static async createBuffers(ctx) {
		let promises = []
		for (let soundfontName in MIDI) {
			for (let instrument in MIDI[soundfontName]) {
				if (!(0,_audio_Buffers_js__WEBPACK_IMPORTED_MODULE_0__.hasBuffer)(soundfontName, instrument)) {
					console.log(
						"Loaded '" + soundfontName + "' instrument : " + instrument
					)
					for (let noteKey in MIDI[soundfontName][instrument]) {
						let base64Buffer = SoundfontLoader.getBase64Buffer(
							MIDI[soundfontName][instrument][noteKey]
						)
						promises.push(
							SoundfontLoader.getNoteBuffer(
								ctx,
								base64Buffer,
								soundfontName,
								noteKey,
								instrument
							)
						)
					}
				}
			}
		}
		return await Promise.all(promises)
	}
	static async getNoteBuffer(
		ctx,
		base64Buffer,
		soundfontName,
		noteKey,
		instrument
	) {
		let promise = new Promise((resolve, reject) => {
			ctx.decodeAudioData(
				base64Buffer,
				decodedBuffer => {
					resolve({
						buffer: decodedBuffer,
						noteKey: noteKey,
						instrument: instrument,
						soundfontName: soundfontName
					})
				},
				error => reject(error)
			)
		})
		return await promise

		//ios can't handle the promise based decodeAudioData
		// return await ctx
		// 	.decodeAudioData(base64Buffer, function (decodedBuffer) {
		// 		audioBuffer = decodedBuffer
		// 	})
		// 	.then(
		// 		() => {
		// 			return {
		// 				buffer: audioBuffer,
		// 				noteKey: noteKey,
		// 				instrument: instrument,
		// 				soundfontName: soundfontName
		// 			}
		// 		},
		// 		e => {
		// 			console.log(e)
		// 		}
		// 	)
	}
	static getBase64Buffer(str) {
		let base64 = str.split(",")[1]
		return Base64Binary.decodeArrayBuffer(base64)
	}
}


/***/ }),

/***/ "./js/Util.js":
/*!********************!*\
  !*** ./js/Util.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawRoundRect: () => (/* binding */ drawRoundRect),
/* harmony export */   formatTime: () => (/* binding */ formatTime),
/* harmony export */   groupArrayBy: () => (/* binding */ groupArrayBy),
/* harmony export */   iOS: () => (/* binding */ iOS),
/* harmony export */   isBlack: () => (/* binding */ isBlack),
/* harmony export */   loadJson: () => (/* binding */ loadJson),
/* harmony export */   replaceAllString: () => (/* binding */ replaceAllString),
/* harmony export */   sum: () => (/* binding */ sum)
/* harmony export */ });
function formatTime(seconds, showMilis) {
	seconds = Math.max(seconds, 0)
	let date = new Date(seconds * 1000)
	let timeStrLength = showMilis ? 11 : 8
	try {
		let timeStr = date.toISOString().substr(11, timeStrLength)
		if (timeStr.substr(0, 2) == "00") {
			timeStr = timeStr.substr(3)
		}
		return timeStr
	} catch (e) {
		console.error(e)
		//ignore this. only seems to happend when messing with breakpoints in devtools
	}
}
/**
 *  Checks whether a note Number corresponds to a black piano key
 * @param {Number} noteNumber
 */
function isBlack(noteNumber) {
	return (noteNumber + 11) % 12 == 0 ||
		(noteNumber + 8) % 12 == 0 ||
		(noteNumber + 6) % 12 == 0 ||
		(noteNumber + 3) % 12 == 0 ||
		(noteNumber + 1) % 12 == 0
		? 1
		: 0
}
function sum(arr) {
	return arr.reduce((previousVal, currentVal) => previousVal + currentVal)
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} radius
 */
function drawRoundRect(ctx, x, y, width, height, radius, isRounded) {
	// radius = radius * 2 < ( Math.min( height, width ) ) ? radius : ( Math.min( height, width ) ) / 2
	if (typeof radius === "undefined") {
		radius = 0
	}
	if (typeof radius === "number") {
		radius = Math.min(radius, Math.min(width / 2, height / 2))
		radius = {
			tl: radius,
			tr: radius,
			br: radius,
			bl: radius
		}
	} else {
		var defaultRadius = {
			tl: 0,
			tr: 0,
			br: 0,
			bl: 0
		}
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side]
		}
	}

	ctx.beginPath()
	if (!isRounded) {
		ctx.moveTo(x + radius.tl, y)
		ctx.lineTo(x + width - radius.tr, y)
		ctx.lineTo(x + width, y + radius.tr)
		ctx.lineTo(x + width, y + height - radius.br)
		ctx.lineTo(x + width - radius.br, y + height)
		ctx.lineTo(x + radius.bl, y + height)
		ctx.lineTo(x, y + height - radius.bl)
		ctx.lineTo(x, y + radius.tl)
		ctx.lineTo(x + radius.tl, y)
	} else {
		ctx.moveTo(x + radius.tl, y)
		ctx.lineTo(x + width - radius.tr, y)
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
		ctx.lineTo(x + width, y + height - radius.br)
		ctx.quadraticCurveTo(
			x + width,
			y + height,
			x + width - radius.br,
			y + height
		)
		ctx.lineTo(x + radius.bl, y + height)
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
		ctx.lineTo(x, y + radius.tl)
		ctx.quadraticCurveTo(x, y, x + radius.tl, y)
	}
	ctx.closePath()
}

function replaceAllString(text, replaceThis, withThat) {
	return text.replace(new RegExp(replaceThis, "g"), withThat)
}

function groupArrayBy(arr, keyFunc) {
	let keys = {}
	arr.forEach(el => (keys[keyFunc(el)] = []))
	Object.keys(keys).forEach(key => {
		arr.forEach(el => (keyFunc(el) == key ? keys[keyFunc(el)].push(el) : null))
	})
	return keys
}
function loadJson(url, callback) {
	let request = new XMLHttpRequest()
	request.overrideMimeType("application/json")
	request.open("GET", url, true)
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == "200") {
			callback(request.responseText)
		}
	}
	request.send(null)
}

function iOS() {
	return (
		[
			"iPad Simulator",
			"iPhone Simulator",
			"iPod Simulator",
			"iPad",
			"iPhone",
			"iPod"
		].includes(navigator.platform) ||
		// iPad on iOS 13 detection
		(navigator.userAgent.includes("Mac") && "ontouchend" in document)
	)
}




/***/ }),

/***/ "./js/audio/AudioNote.js":
/*!*******************************!*\
  !*** ./js/audio/AudioNote.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCompleteAudioNote: () => (/* binding */ createCompleteAudioNote),
/* harmony export */   createContinuousAudioNote: () => (/* binding */ createContinuousAudioNote)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _GainNodeController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GainNodeController.js */ "./js/audio/GainNodeController.js");



class AudioNote {
	constructor(context, buffer) {
		this.source = context.createBufferSource()
		this.source.buffer = buffer
	}

	connectSource(context, gainNode) {
		this.source.connect(gainNode)
		this.getGainNode().connect(context.destination)
	}
	getGainNode() {
		return this.gainNodeController.gainNode
	}
	suspend() {
		this.source.stop(0)
	}
	play(time) {
		this.source.start(time)
	}
	endAt(time, isSustained) {
		let endTime = this.gainNodeController.endAt(time, isSustained)
		this.endSourceAt(endTime + 0.5)
	}
	endSourceAt(time) {
		this.source.stop(time)
	}
}

const createContinuousAudioNote = (context, buffer, volume) => {
	let audioNote = new AudioNote(context, buffer)

	audioNote.gainNodeController = (0,_GainNodeController_js__WEBPACK_IMPORTED_MODULE_1__.createContinuousGainNode)(
		context,
		context.currentTime,
		volume
	)

	audioNote.connectSource(context, audioNote.gainNodeController.gainNode)
	audioNote.play(context.currentTime)
	return audioNote
}

const createCompleteAudioNote = (
	note,
	currentSongTime,
	playbackSpeed,
	volume,
	isPlayalong,
	context,
	buffer
) => {
	let audioNote = new AudioNote(context, buffer)
	const gainValue = getNoteGain(note, volume)
	if (gainValue == 0) {
		return audioNote
	}

	let contextTimes = getContextTimesForNote(
		context,
		note,
		currentSongTime,
		playbackSpeed,
		isPlayalong
	)
	const isSustained = contextTimes.end < contextTimes.sustainOff

	audioNote.gainNodeController = (0,_GainNodeController_js__WEBPACK_IMPORTED_MODULE_1__.createCompleteGainNode)(
		context,
		gainValue,
		contextTimes,
		isSustained
	)

	audioNote.connectSource(context, audioNote.getGainNode())

	audioNote.play(contextTimes.start)
	audioNote.endAt(
		isSustained ? contextTimes.sustainOff : contextTimes.end,
		isSustained
	)

	return audioNote
}

function getContextTimesForNote(
	context,
	note,
	currentSongTime,
	playbackSpeed,
	isPlayAlong
) {
	let delayUntilNote = (note.timestamp / 1000 - currentSongTime) / playbackSpeed
	let delayCorrection = 0
	if (isPlayAlong) {
		delayCorrection = getPlayalongDelayCorrection(delayUntilNote)
		delayUntilNote = Math.max(0, delayUntilNote)
	}
	let start = context.currentTime + delayUntilNote

	let end = start + note.duration / 1000 / playbackSpeed + delayCorrection

	let sustainOff = start + note.sustainDuration / 1000 / playbackSpeed
	return { start, end, sustainOff }
}

function getPlayalongDelayCorrection(delayUntilNote) {
	let delayCorrection = 0
	if (delayUntilNote < 0) {
		console.log("negative delay")
		delayCorrection = -1 * (delayUntilNote - 0.1)
		delayUntilNote = 0.1
	}

	return delayCorrection
}

function getNoteGain(note, volume) {
	let gain = 2 * (note.velocity / 127) * volume

	let clampedGain = Math.min(10.0, Math.max(-1.0, gain))
	return clampedGain
}


/***/ }),

/***/ "./js/audio/AudioPlayer.js":
/*!*********************************!*\
  !*** ./js/audio/AudioPlayer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AudioPlayer: () => (/* binding */ AudioPlayer)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _SoundfontLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SoundfontLoader.js */ "./js/SoundfontLoader.js");
/* harmony import */ var _ui_Loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Loader.js */ "./js/ui/Loader.js");
/* harmony import */ var _AudioNote_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AudioNote.js */ "./js/audio/AudioNote.js");
/* harmony import */ var _Buffers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Buffers.js */ "./js/audio/Buffers.js");






class AudioPlayer {
	constructor() {
		window.AudioContext = window.AudioContext || window.webkitAudioContext

		this.context = new AudioContext()
		this.buffers = {}
		this.audioNotes = []
		this.soundfontName = "MusyngKite"

		this.loadMetronomeSounds()
	}

	getContextTime() {
		return this.context.currentTime
	}
	getContext() {
		return this.context
	}
	isRunning() {
		return this.context.state == "running"
	}
	resume() {
		this.context.resume()
	}
	suspend() {
		this.context.suspend()
	}
	stopAllSources() {
		this.audioNotes.forEach(audioNote => {
			try {
				audioNote.source.stop(0)
			} catch (error) {
				//Lets ignore this. Happens when notes are created while jumping on timeline
			}
		})
	}
	createContinuousNote(noteNumber, volume, instrument) {
		if (this.context.state === "suspended") {
			this.wasSuspended = true
			this.context.resume()
		}
		let audioNote = (0,_AudioNote_js__WEBPACK_IMPORTED_MODULE_3__.createContinuousAudioNote)(
			this.context,
			(0,_Buffers_js__WEBPACK_IMPORTED_MODULE_4__.getBufferForNote)(this.soundfontName, instrument, noteNumber),
			volume / 100
		)

		return audioNote
	}
	noteOffContinuous(audioNote) {
		audioNote.endAt(this.context.currentTime + 0.1, false)
	}

	playCompleteNote(currentTime, note, playbackSpeed, volume, isPlayAlong) {
		const buffer = (0,_Buffers_js__WEBPACK_IMPORTED_MODULE_4__.getBufferForNote)(
			this.soundfontName,
			note.instrument,
			note.noteNumber
		)

		let audioNote = (0,_AudioNote_js__WEBPACK_IMPORTED_MODULE_3__.createCompleteAudioNote)(
			note,
			currentTime,
			playbackSpeed,
			volume,
			isPlayAlong,
			this.context,
			buffer
		)
		this.audioNotes.push(audioNote)
	}

	playBeat(time, newMeasure) {
		if (time < 0) return
		this.context.resume()
		let ctxTime = this.context.currentTime

		const source = this.context.createBufferSource()
		const gainNode = this.context.createGain()
		gainNode.gain.value = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("metronomeVolume")
		source.buffer = newMeasure ? this.metronomSound1 : this.metronomSound2
		source.connect(gainNode)
		gainNode.connect(this.context.destination)
		source.start(ctxTime + time)
		source.stop(ctxTime + time + 0.2)
	}

	async switchSoundfont(soundfontName, currentSong) {
		this.soundfontName = soundfontName
		;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_2__.getLoader)().setLoadMessage("Loading Instruments")
		await this.loadInstrumentsForSong(currentSong)
		;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_2__.getLoader)().setLoadMessage("Loading Buffers")
		return await this.loadBuffers()
	}
	loadMetronomeSounds() {
		let audioPl = this

		const request = new XMLHttpRequest()
		request.open("GET", "../../metronome/1.wav")
		request.responseType = "arraybuffer"
		request.onload = function () {
			let undecodedAudio = request.response
			audioPl.context.decodeAudioData(
				undecodedAudio,
				data => (audioPl.metronomSound1 = data)
			)
		}
		request.send()

		const request2 = new XMLHttpRequest()
		request2.open("GET", "../../metronome/2.wav")
		request2.responseType = "arraybuffer"
		request2.onload = function () {
			let undecodedAudio = request2.response
			audioPl.context.decodeAudioData(
				undecodedAudio,
				data => (audioPl.metronomSound2 = data)
			)
		}
		request2.send()
	}
	async loadInstrumentsForSong(currentSong) {
		if (!this.buffers.hasOwnProperty(this.soundfontName)) {
			this.buffers[this.soundfontName] = {}
		}

		let instrumentsOfSong = currentSong.getAllInstruments()

		//filter instruments we've loaded already and directly map onto promise
		let neededInstruments = instrumentsOfSong
			.filter(
				instrument =>
					!this.buffers[this.soundfontName].hasOwnProperty(instrument)
			)
			.map(instrument =>
				_SoundfontLoader_js__WEBPACK_IMPORTED_MODULE_1__.SoundfontLoader.loadInstrument(instrument, this.soundfontName)
			)
		if (instrumentsOfSong.includes("percussion")) {
			neededInstruments.push(
				_SoundfontLoader_js__WEBPACK_IMPORTED_MODULE_1__.SoundfontLoader.loadInstrument("percussion", "FluidR3_GM")
			)
		}
		if (neededInstruments.length == 0) {
			return Promise.resolve()
		}
		await Promise.all(neededInstruments)
	}

	async loadBuffers() {
		return await _SoundfontLoader_js__WEBPACK_IMPORTED_MODULE_1__.SoundfontLoader.getBuffers(this.context).then(buffers => {
			console.log("Buffers loaded")
			this.loading = false
		})
	}
}


/***/ }),

/***/ "./js/audio/Buffers.js":
/*!*****************************!*\
  !*** ./js/audio/Buffers.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBufferForNote: () => (/* binding */ getBufferForNote),
/* harmony export */   getBuffers: () => (/* binding */ getBuffers),
/* harmony export */   hasBuffer: () => (/* binding */ hasBuffer),
/* harmony export */   setBuffer: () => (/* binding */ setBuffer)
/* harmony export */ });
/* harmony import */ var _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/CONST.js */ "./js/data/CONST.js");


const buffers = {}
const getBuffers = () => {
	return buffers
}
const getBufferForNote = (soundfontName, instrument, noteNumber) => {
	let noteKey = _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__.CONST.MIDI_NOTE_TO_KEY[noteNumber + 21]
	let buffer
	if (instrument == "percussion") {
		soundfontName = "FluidR3_GM"
	}
	try {
		buffer = buffers[soundfontName][instrument][noteKey]
	} catch (e) {
		console.error(e)
	}
	return buffer
}
const hasBuffer = (soundfontName, instrument) =>
	buffers.hasOwnProperty(soundfontName) &&
	buffers[soundfontName].hasOwnProperty(instrument)

const setBuffer = (soundfontName, instrument, noteKey, buffer) => {
	if (!buffers.hasOwnProperty(soundfontName)) {
		buffers[soundfontName] = {}
	}
	if (!buffers[soundfontName].hasOwnProperty(instrument)) {
		buffers[soundfontName][instrument] = {}
	}
	buffers[soundfontName][instrument][noteKey] = buffer
}


/***/ }),

/***/ "./js/audio/GainNodeController.js":
/*!****************************************!*\
  !*** ./js/audio/GainNodeController.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCompleteGainNode: () => (/* binding */ createCompleteGainNode),
/* harmony export */   createContinuousGainNode: () => (/* binding */ createContinuousGainNode)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");


const TIME_CONST = 0.05
class GainNodeController {
	constructor(context) {
		this.createGainNode(context)
	}
	createGainNode(context) {
		this.gainNode = context.createGain()
		this.gainNode.value = 0
		this.gainNode.gain.setTargetAtTime(0, 0, TIME_CONST)
	}

	setAttackAndDecay(start, gainValue, adsrValues) {
		let endOfAttackTime = start + adsrValues.attack

		this.sustainValue = gainValue * adsrValues.sustain
		this.endOfDecayTime = endOfAttackTime + adsrValues.decay

		//Start at 0
		this.gainNode.gain.linearRampToValueAtTime(0, start, TIME_CONST)

		//Attack
		this.gainNode.gain.linearRampToValueAtTime(
			gainValue,
			endOfAttackTime,
			TIME_CONST
		)
		//Decay
		this.gainNode.gain.linearRampToValueAtTime(
			this.sustainValue,
			this.endOfDecayTime,
			TIME_CONST
		)
	}
	setReleaseGainNode(end, release) {
		this.gainNode.gain.linearRampToValueAtTime(
			this.sustainValue,
			end,
			TIME_CONST
		)
		//Release
		this.gainNode.gain.linearRampToValueAtTime(0.001, end + release)
		this.gainNode.gain.linearRampToValueAtTime(
			0,
			end + release + 0.001,
			TIME_CONST
		)
		this.gainNode.gain.setTargetAtTime(0, end + release + 0.005, TIME_CONST)
	}
	endAt(endTime, isSustained) {
		const release = isSustained
			? parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrReleasePedal"))
			: parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrReleaseKey"))
		endTime = Math.max(endTime, this.endOfDecayTime)
		this.setReleaseGainNode(endTime, release)
		return endTime
	}
}

function getAdsrValues() {
	let attack = parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrAttack"))
	let decay = parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrDecay"))
	let sustain = parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrSustain")) / 100
	let releasePedal = parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrReleasePedal"))
	let releaseKey = parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrReleaseKey"))
	return { attack, decay, sustain, releasePedal, releaseKey }
}
function getAdsrAdjustedForDuration(duration) {
	let maxGainLevel = 1
	let adsrValues = getAdsrValues()
	//If duration is smaller than decay and attack, shorten decay / set it to 0
	if (duration < adsrValues.attack + adsrValues.decay) {
		adsrValues.decay = Math.max(duration - adsrValues.attack, 0)
	}
	//if attack alone is longer than duration, linearly lower the maximum gain value that will be reached before
	//the sound starts to release.
	if (duration < adsrValues.attack) {
		let ratio = duration / adsrValues.attack
		maxGainLevel *= ratio
		adsrValues.attack *= ratio
		adsrValues.decay = 0
		adsrValues.sustain = 1
	}
	adsrValues.maxGainLevel = maxGainLevel
	return adsrValues
}

const createContinuousGainNode = (context, start, gainValue) => {
	const gainNodeGen = new GainNodeController(context)

	gainNodeGen.setAttackAndDecay(start, gainValue, getAdsrValues())
	return gainNodeGen
}

const createCompleteGainNode = (
	context,
	gainValue,
	ctxTimes,
	isSustained
) => {
	const gainNodeGen = new GainNodeController(context)

	const adsrValues = getAdsrAdjustedForDuration(
		(isSustained ? ctxTimes.sustainOff : ctxTimes.end) - ctxTimes.start
	)

	//Adjust gain value if attack period is longer than duration of entire note.
	gainValue *= adsrValues.maxGainLevel

	gainNodeGen.setAttackAndDecay(ctxTimes.start, gainValue, adsrValues)

	let end = ctxTimes.end
	let release = parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrReleaseKey"))
	if (isSustained && (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("sustainEnabled")) {
		end = ctxTimes.sustainOff
		release = parseFloat((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("adsrReleasePedal"))
	}

	return gainNodeGen
}


/***/ }),

/***/ "./js/data/CONST.js":
/*!**************************!*\
  !*** ./js/data/CONST.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONST: () => (/* binding */ CONST)
/* harmony export */ });
var CONST = {
	TRACK_COLORS: [
		{ white: "#ffa000", black: "#ff8f00" }, //orange
		{ white: "#1e88e5", black: "#1976d2" }, //blue
		{ white: "#43a047", black: "#388e3c" }, //green
		{ white: "#ffeb3b", black: "#fdd835" }, //yellow
		{ white: "#9c27b0", black: "#8e24aa" }, //pink
		{ white: "#f44336", black: "#e53935" }, //red
		{ white: "#673ab7", black: "#5e35b1" } //purple

		// { white: "rgb(40,50,90)", black: "Blue" },
		// { white: "rgb(50,90,60)", black: "rgb(20,85,40)" },
		// { white: "rgb(40,50,90)", black: "Blue" },
		// { white: "rgb(50,90,60)", black: "rgb(20,85,40)" }
	],
	INSTRUMENTS: {
		BY_ID: {
			0: {
				id: "acoustic_grand_piano",
				instrument: "Acoustic Grand Piano",
				number: 0,
				category: "Piano"
			},
			1: {
				id: "bright_acoustic_piano",
				instrument: "Bright Acoustic Piano",
				number: 1,
				category: "Piano"
			},
			2: {
				id: "electric_grand_piano",
				instrument: "Electric Grand Piano",
				number: 2,
				category: "Piano"
			},
			3: {
				id: "honkytonk_piano",
				instrument: "Honky-tonk Piano",
				number: 3,
				category: "Piano"
			},
			4: {
				id: "electric_piano_1",
				instrument: "Electric Piano 1",
				number: 4,
				category: "Piano"
			},
			5: {
				id: "electric_piano_2",
				instrument: "Electric Piano 2",
				number: 5,
				category: "Piano"
			},
			6: {
				id: "harpsichord",
				instrument: "Harpsichord",
				number: 6,
				category: "Piano"
			},
			7: {
				id: "clavinet",
				instrument: "Clavinet",
				number: 7,
				category: "Piano"
			},
			8: {
				id: "celesta",
				instrument: "Celesta",
				number: 8,
				category: "Chromatic Percussion"
			},
			9: {
				id: "glockenspiel",
				instrument: "Glockenspiel",
				number: 9,
				category: "Chromatic Percussion"
			},
			10: {
				id: "music_box",
				instrument: "Music Box",
				number: 10,
				category: "Chromatic Percussion"
			},
			11: {
				id: "vibraphone",
				instrument: "Vibraphone",
				number: 11,
				category: "Chromatic Percussion"
			},
			12: {
				id: "marimba",
				instrument: "Marimba",
				number: 12,
				category: "Chromatic Percussion"
			},
			13: {
				id: "xylophone",
				instrument: "Xylophone",
				number: 13,
				category: "Chromatic Percussion"
			},
			14: {
				id: "tubular_bells",
				instrument: "Tubular Bells",
				number: 14,
				category: "Chromatic Percussion"
			},
			15: {
				id: "dulcimer",
				instrument: "Dulcimer",
				number: 15,
				category: "Chromatic Percussion"
			},
			16: {
				id: "drawbar_organ",
				instrument: "Drawbar Organ",
				number: 16,
				category: "Organ"
			},
			17: {
				id: "percussive_organ",
				instrument: "Percussive Organ",
				number: 17,
				category: "Organ"
			},
			18: {
				id: "rock_organ",
				instrument: "Rock Organ",
				number: 18,
				category: "Organ"
			},
			19: {
				id: "church_organ",
				instrument: "Church Organ",
				number: 19,
				category: "Organ"
			},
			20: {
				id: "reed_organ",
				instrument: "Reed Organ",
				number: 20,
				category: "Organ"
			},
			21: {
				id: "accordion",
				instrument: "Accordion",
				number: 21,
				category: "Organ"
			},
			22: {
				id: "harmonica",
				instrument: "Harmonica",
				number: 22,
				category: "Organ"
			},
			23: {
				id: "tango_accordion",
				instrument: "Tango Accordion",
				number: 23,
				category: "Organ"
			},
			24: {
				id: "acoustic_guitar_nylon",
				instrument: "Acoustic Guitar (nylon)",
				number: 24,
				category: "Guitar"
			},
			25: {
				id: "acoustic_guitar_steel",
				instrument: "Acoustic Guitar (steel)",
				number: 25,
				category: "Guitar"
			},
			26: {
				id: "electric_guitar_jazz",
				instrument: "Electric Guitar (jazz)",
				number: 26,
				category: "Guitar"
			},
			27: {
				id: "electric_guitar_clean",
				instrument: "Electric Guitar (clean)",
				number: 27,
				category: "Guitar"
			},
			28: {
				id: "electric_guitar_muted",
				instrument: "Electric Guitar (muted)",
				number: 28,
				category: "Guitar"
			},
			29: {
				id: "overdriven_guitar",
				instrument: "Overdriven Guitar",
				number: 29,
				category: "Guitar"
			},
			30: {
				id: "distortion_guitar",
				instrument: "Distortion Guitar",
				number: 30,
				category: "Guitar"
			},
			31: {
				id: "guitar_harmonics",
				instrument: "Guitar Harmonics",
				number: 31,
				category: "Guitar"
			},
			32: {
				id: "acoustic_bass",
				instrument: "Acoustic Bass",
				number: 32,
				category: "Bass"
			},
			33: {
				id: "electric_bass_finger",
				instrument: "Electric Bass (finger)",
				number: 33,
				category: "Bass"
			},
			34: {
				id: "electric_bass_pick",
				instrument: "Electric Bass (pick)",
				number: 34,
				category: "Bass"
			},
			35: {
				id: "fretless_bass",
				instrument: "Fretless Bass",
				number: 35,
				category: "Bass"
			},
			36: {
				id: "slap_bass_1",
				instrument: "Slap Bass 1",
				number: 36,
				category: "Bass"
			},
			37: {
				id: "slap_bass_2",
				instrument: "Slap Bass 2",
				number: 37,
				category: "Bass"
			},
			38: {
				id: "synth_bass_1",
				instrument: "Synth Bass 1",
				number: 38,
				category: "Bass"
			},
			39: {
				id: "synth_bass_2",
				instrument: "Synth Bass 2",
				number: 39,
				category: "Bass"
			},
			40: {
				id: "violin",
				instrument: "Violin",
				number: 40,
				category: "Strings"
			},
			41: {
				id: "viola",
				instrument: "Viola",
				number: 41,
				category: "Strings"
			},
			42: {
				id: "cello",
				instrument: "Cello",
				number: 42,
				category: "Strings"
			},
			43: {
				id: "contrabass",
				instrument: "Contrabass",
				number: 43,
				category: "Strings"
			},
			44: {
				id: "tremolo_strings",
				instrument: "Tremolo Strings",
				number: 44,
				category: "Strings"
			},
			45: {
				id: "pizzicato_strings",
				instrument: "Pizzicato Strings",
				number: 45,
				category: "Strings"
			},
			46: {
				id: "orchestral_harp",
				instrument: "Orchestral Harp",
				number: 46,
				category: "Strings"
			},
			47: {
				id: "timpani",
				instrument: "Timpani",
				number: 47,
				category: "Strings"
			},
			48: {
				id: "string_ensemble_1",
				instrument: "String Ensemble 1",
				number: 48,
				category: "Ensemble"
			},
			49: {
				id: "string_ensemble_2",
				instrument: "String Ensemble 2",
				number: 49,
				category: "Ensemble"
			},
			50: {
				id: "synth_strings_1",
				instrument: "Synth Strings 1",
				number: 50,
				category: "Ensemble"
			},
			51: {
				id: "synth_strings_2",
				instrument: "Synth Strings 2",
				number: 51,
				category: "Ensemble"
			},
			52: {
				id: "choir_aahs",
				instrument: "Choir Aahs",
				number: 52,
				category: "Ensemble"
			},
			53: {
				id: "voice_oohs",
				instrument: "Voice Oohs",
				number: 53,
				category: "Ensemble"
			},
			54: {
				id: "synth_choir",
				instrument: "Synth Choir",
				number: 54,
				category: "Ensemble"
			},
			55: {
				id: "orchestra_hit",
				instrument: "Orchestra Hit",
				number: 55,
				category: "Ensemble"
			},
			56: {
				id: "trumpet",
				instrument: "Trumpet",
				number: 56,
				category: "Brass"
			},
			57: {
				id: "trombone",
				instrument: "Trombone",
				number: 57,
				category: "Brass"
			},
			58: {
				id: "tuba",
				instrument: "Tuba",
				number: 58,
				category: "Brass"
			},
			59: {
				id: "muted_trumpet",
				instrument: "Muted Trumpet",
				number: 59,
				category: "Brass"
			},
			60: {
				id: "french_horn",
				instrument: "French Horn",
				number: 60,
				category: "Brass"
			},
			61: {
				id: "brass_section",
				instrument: "Brass Section",
				number: 61,
				category: "Brass"
			},
			62: {
				id: "synth_brass_1",
				instrument: "Synth Brass 1",
				number: 62,
				category: "Brass"
			},
			63: {
				id: "synth_brass_2",
				instrument: "Synth Brass 2",
				number: 63,
				category: "Brass"
			},
			64: {
				id: "soprano_sax",
				instrument: "Soprano Sax",
				number: 64,
				category: "Reed"
			},
			65: {
				id: "alto_sax",
				instrument: "Alto Sax",
				number: 65,
				category: "Reed"
			},
			66: {
				id: "tenor_sax",
				instrument: "Tenor Sax",
				number: 66,
				category: "Reed"
			},
			67: {
				id: "baritone_sax",
				instrument: "Baritone Sax",
				number: 67,
				category: "Reed"
			},
			68: {
				id: "oboe",
				instrument: "Oboe",
				number: 68,
				category: "Reed"
			},
			69: {
				id: "english_horn",
				instrument: "English Horn",
				number: 69,
				category: "Reed"
			},
			70: {
				id: "bassoon",
				instrument: "Bassoon",
				number: 70,
				category: "Reed"
			},
			71: {
				id: "clarinet",
				instrument: "Clarinet",
				number: 71,
				category: "Reed"
			},
			72: {
				id: "piccolo",
				instrument: "Piccolo",
				number: 72,
				category: "Pipe"
			},
			73: {
				id: "flute",
				instrument: "Flute",
				number: 73,
				category: "Pipe"
			},
			74: {
				id: "recorder",
				instrument: "Recorder",
				number: 74,
				category: "Pipe"
			},
			75: {
				id: "pan_flute",
				instrument: "Pan Flute",
				number: 75,
				category: "Pipe"
			},
			76: {
				id: "blown_bottle",
				instrument: "Blown Bottle",
				number: 76,
				category: "Pipe"
			},
			77: {
				id: "shakuhachi",
				instrument: "Shakuhachi",
				number: 77,
				category: "Pipe"
			},
			78: {
				id: "whistle",
				instrument: "Whistle",
				number: 78,
				category: "Pipe"
			},
			79: {
				id: "ocarina",
				instrument: "Ocarina",
				number: 79,
				category: "Pipe"
			},
			80: {
				id: "lead_1_square",
				instrument: "Lead 1 (square)",
				number: 80,
				category: "Synth Lead"
			},
			81: {
				id: "lead_2_sawtooth",
				instrument: "Lead 2 (sawtooth)",
				number: 81,
				category: "Synth Lead"
			},
			82: {
				id: "lead_3_calliope",
				instrument: "Lead 3 (calliope)",
				number: 82,
				category: "Synth Lead"
			},
			83: {
				id: "lead_4_chiff",
				instrument: "Lead 4 (chiff)",
				number: 83,
				category: "Synth Lead"
			},
			84: {
				id: "lead_5_charang",
				instrument: "Lead 5 (charang)",
				number: 84,
				category: "Synth Lead"
			},
			85: {
				id: "lead_6_voice",
				instrument: "Lead 6 (voice)",
				number: 85,
				category: "Synth Lead"
			},
			86: {
				id: "lead_7_fifths",
				instrument: "Lead 7 (fifths)",
				number: 86,
				category: "Synth Lead"
			},
			87: {
				id: "lead_8_bass__lead",
				instrument: "Lead 8 (bass + lead)",
				number: 87,
				category: "Synth Lead"
			},
			88: {
				id: "pad_1_new_age",
				instrument: "Pad 1 (new age)",
				number: 88,
				category: "Synth Pad"
			},
			89: {
				id: "pad_2_warm",
				instrument: "Pad 2 (warm)",
				number: 89,
				category: "Synth Pad"
			},
			90: {
				id: "pad_3_polysynth",
				instrument: "Pad 3 (polysynth)",
				number: 90,
				category: "Synth Pad"
			},
			91: {
				id: "pad_4_choir",
				instrument: "Pad 4 (choir)",
				number: 91,
				category: "Synth Pad"
			},
			92: {
				id: "pad_5_bowed",
				instrument: "Pad 5 (bowed)",
				number: 92,
				category: "Synth Pad"
			},
			93: {
				id: "pad_6_metallic",
				instrument: "Pad 6 (metallic)",
				number: 93,
				category: "Synth Pad"
			},
			94: {
				id: "pad_7_halo",
				instrument: "Pad 7 (halo)",
				number: 94,
				category: "Synth Pad"
			},
			95: {
				id: "pad_8_sweep",
				instrument: "Pad 8 (sweep)",
				number: 95,
				category: "Synth Pad"
			},
			96: {
				id: "fx_1_rain",
				instrument: "FX 1 (rain)",
				number: 96,
				category: "Synth Effects"
			},
			97: {
				id: "fx_2_soundtrack",
				instrument: "FX 2 (soundtrack)",
				number: 97,
				category: "Synth Effects"
			},
			98: {
				id: "fx_3_crystal",
				instrument: "FX 3 (crystal)",
				number: 98,
				category: "Synth Effects"
			},
			99: {
				id: "fx_4_atmosphere",
				instrument: "FX 4 (atmosphere)",
				number: 99,
				category: "Synth Effects"
			},
			100: {
				id: "fx_5_brightness",
				instrument: "FX 5 (brightness)",
				number: 100,
				category: "Synth Effects"
			},
			101: {
				id: "fx_6_goblins",
				instrument: "FX 6 (goblins)",
				number: 101,
				category: "Synth Effects"
			},
			102: {
				id: "fx_7_echoes",
				instrument: "FX 7 (echoes)",
				number: 102,
				category: "Synth Effects"
			},
			103: {
				id: "fx_8_scifi",
				instrument: "FX 8 (sci-fi)",
				number: 103,
				category: "Synth Effects"
			},
			104: {
				id: "sitar",
				instrument: "Sitar",
				number: 104,
				category: "Ethnic"
			},
			105: {
				id: "banjo",
				instrument: "Banjo",
				number: 105,
				category: "Ethnic"
			},
			106: {
				id: "shamisen",
				instrument: "Shamisen",
				number: 106,
				category: "Ethnic"
			},
			107: {
				id: "koto",
				instrument: "Koto",
				number: 107,
				category: "Ethnic"
			},
			108: {
				id: "kalimba",
				instrument: "Kalimba",
				number: 108,
				category: "Ethnic"
			},
			109: {
				id: "bagpipe",
				instrument: "Bagpipe",
				number: 109,
				category: "Ethnic"
			},
			110: {
				id: "fiddle",
				instrument: "Fiddle",
				number: 110,
				category: "Ethnic"
			},
			111: {
				id: "shanai",
				instrument: "Shanai",
				number: 111,
				category: "Ethnic"
			},
			112: {
				id: "tinkle_bell",
				instrument: "Tinkle Bell",
				number: 112,
				category: "Percussive"
			},
			113: {
				id: "agogo",
				instrument: "Agogo",
				number: 113,
				category: "Percussive"
			},
			114: {
				id: "steel_drums",
				instrument: "Steel Drums",
				number: 114,
				category: "Percussive"
			},
			115: {
				id: "woodblock",
				instrument: "Woodblock",
				number: 115,
				category: "Percussive"
			},
			116: {
				id: "taiko_drum",
				instrument: "Taiko Drum",
				number: 116,
				category: "Percussive"
			},
			117: {
				id: "melodic_tom",
				instrument: "Melodic Tom",
				number: 117,
				category: "Percussive"
			},
			118: {
				id: "synth_drum",
				instrument: "Synth Drum",
				number: 118,
				category: "Percussive"
			},
			119: {
				id: "reverse_cymbal",
				instrument: "Reverse Cymbal",
				number: 119,
				category: "Sound effects"
			},
			120: {
				id: "guitar_fret_noise",
				instrument: "Guitar Fret Noise",
				number: 120,
				category: "Sound effects"
			},
			121: {
				id: "breath_noise",
				instrument: "Breath Noise",
				number: 121,
				category: "Sound effects"
			},
			122: {
				id: "seashore",
				instrument: "Seashore",
				number: 122,
				category: "Sound effects"
			},
			123: {
				id: "bird_tweet",
				instrument: "Bird Tweet",
				number: 123,
				category: "Sound effects"
			},
			124: {
				id: "telephone_ring",
				instrument: "Telephone Ring",
				number: 124,
				category: "Sound effects"
			},
			125: {
				id: "helicopter",
				instrument: "Helicopter",
				number: 125,
				category: "Sound effects"
			},
			126: {
				id: "applause",
				instrument: "Applause",
				number: 126,
				category: "Sound effects"
			},
			127: {
				id: "gunshot",
				instrument: "Gunshot",
				number: 127,
				category: "Sound effects"
			},
			"-1": {
				id: "percussion",
				instrument: "Percussion",
				number: -1,
				category: "Percussion"
			}
		}
	},
	KEY_TO_NOTE: {
		A0: 21,
		Bb0: 22,
		B0: 23,
		C1: 24,
		Db1: 25,
		D1: 26,
		Eb1: 27,
		E1: 28,
		F1: 29,
		Gb1: 30,
		G1: 31,
		Ab1: 32,
		A1: 33,
		Bb1: 34,
		B1: 35,
		C2: 36,
		Db2: 37,
		D2: 38,
		Eb2: 39,
		E2: 40,
		F2: 41,
		Gb2: 42,
		G2: 43,
		Ab2: 44,
		A2: 45,
		Bb2: 46,
		B2: 47,
		C3: 48,
		Db3: 49,
		D3: 50,
		Eb3: 51,
		E3: 52,
		F3: 53,
		Gb3: 54,
		G3: 55,
		Ab3: 56,
		A3: 57,
		Bb3: 58,
		B3: 59,
		C4: 60,
		Db4: 61,
		D4: 62,
		Eb4: 63,
		E4: 64,
		F4: 65,
		Gb4: 66,
		G4: 67,
		Ab4: 68,
		A4: 69,
		Bb4: 70,
		B4: 71,
		C5: 72,
		Db5: 73,
		D5: 74,
		Eb5: 75,
		E5: 76,
		F5: 77,
		Gb5: 78,
		G5: 79,
		Ab5: 80,
		A5: 81,
		Bb5: 82,
		B5: 83,
		C6: 84,
		Db6: 85,
		D6: 86,
		Eb6: 87,
		E6: 88,
		F6: 89,
		Gb6: 90,
		G6: 91,
		Ab6: 92,
		A6: 93,
		Bb6: 94,
		B6: 95,
		C7: 96,
		Db7: 97,
		D7: 98,
		Eb7: 99,
		E7: 100,
		F7: 101,
		Gb7: 102,
		G7: 103,
		Ab7: 104,
		A7: 105,
		Bb7: 106,
		B7: 107,
		C8: 108
	},
	MIDI_NOTE_TO_KEY: {
		21: "A0",
		22: "Bb0",
		23: "B0",
		24: "C1",
		25: "Db1",
		26: "D1",
		27: "Eb1",
		28: "E1",
		29: "F1",
		30: "Gb1",
		31: "G1",
		32: "Ab1",
		33: "A1",
		34: "Bb1",
		35: "B1",
		36: "C2",
		37: "Db2",
		38: "D2",
		39: "Eb2",
		40: "E2",
		41: "F2",
		42: "Gb2",
		43: "G2",
		44: "Ab2",
		45: "A2",
		46: "Bb2",
		47: "B2",
		48: "C3",
		49: "Db3",
		50: "D3",
		51: "Eb3",
		52: "E3",
		53: "F3",
		54: "Gb3",
		55: "G3",
		56: "Ab3",
		57: "A3",
		58: "Bb3",
		59: "B3",
		60: "C4",
		61: "Db4",
		62: "D4",
		63: "Eb4",
		64: "E4",
		65: "F4",
		66: "Gb4",
		67: "G4",
		68: "Ab4",
		69: "A4",
		70: "Bb4",
		71: "B4",
		72: "C5",
		73: "Db5",
		74: "D5",
		75: "Eb5",
		76: "E5",
		77: "F5",
		78: "Gb5",
		79: "G5",
		80: "Ab5",
		81: "A5",
		82: "Bb5",
		83: "B5",
		84: "C6",
		85: "Db6",
		86: "D6",
		87: "Eb6",
		88: "E6",
		89: "F6",
		90: "Gb6",
		91: "G6",
		92: "Ab6",
		93: "A6",
		94: "Bb6",
		95: "B6",
		96: "C7",
		97: "Db7",
		98: "D7",
		99: "Eb7",
		100: "E7",
		101: "F7",
		102: "Gb7",
		103: "G7",
		104: "Ab7",
		105: "A7",
		106: "Bb7",
		107: "B7",
		108: "C8"
	}
}


/***/ }),

/***/ "./js/player/FileLoader.js":
/*!*********************************!*\
  !*** ./js/player/FileLoader.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileLoader: () => (/* binding */ FileLoader)
/* harmony export */ });
/* harmony import */ var _ui_Loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/Loader.js */ "./js/ui/Loader.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);



class FileLoader {
	static async loadSongFromURL(url, callback) {
		(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_0__.getLoader)().setLoadMessage(`Loading Song from ${url}`)
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
		(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_0__.getLoader)().setLoadMessage(`Loading Song from LocalStorage with key ${key}`);
		const midiDataUri = await localforage__WEBPACK_IMPORTED_MODULE_1___default().getItem(key);

		// Check if the data was retrieved successfully
		if (midiDataUri) {
			// Pass the data to the callback function
			callback(midiDataUri, key, () => { });
		} else {
			console.error('Error loading MIDI data:', err);
		}
	}
}


/***/ }),

/***/ "./js/player/Player.js":
/*!*****************************!*\
  !*** ./js/player/Player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentSong: () => (/* binding */ getCurrentSong),
/* harmony export */   getPlayer: () => (/* binding */ getPlayer),
/* harmony export */   getPlayerState: () => (/* binding */ getPlayerState),
/* harmony export */   pianoNotes: () => (/* binding */ pianoNotes)
/* harmony export */ });
/* harmony import */ var _MidiLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MidiLoader.js */ "./js/MidiLoader.js");
/* harmony import */ var _Song_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Song.js */ "./js/Song.js");
/* harmony import */ var _audio_AudioPlayer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../audio/AudioPlayer.js */ "./js/audio/AudioPlayer.js");
/* harmony import */ var _ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/Loader.js */ "./js/ui/Loader.js");
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MidiInputHandler.js */ "./js/MidiInputHandler.js");
/* harmony import */ var _MicInputHandler_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MicInputHandler.js */ "./js/MicInputHandler.js");
/* harmony import */ var _Tracks_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Tracks.js */ "./js/player/Tracks.js");
/* harmony import */ var _ui_Notification_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ui/Notification.js */ "./js/ui/Notification.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_9__);












const LOOK_AHEAD_TIME = 0.2
const LOOK_AHEAD_TIME_WHEN_PLAYALONG = 0.02

class Player {
	constructor() {
		this.audioPlayer = new _audio_AudioPlayer_js__WEBPACK_IMPORTED_MODULE_2__.AudioPlayer()

		;(0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_5__.getMidiHandler)().setNoteOnCallback(this.addInputNoteOn.bind(this))
		;(0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_5__.getMidiHandler)().setNoteOffCallback(this.addInputNoteOff.bind(this))

		this.startDelay = -2.5
		this.lastTime = this.audioPlayer.getContextTime()
		this.progress = 0
		this.paused = true
		this.playing = false
		this.scrolling = 0
		this.loadedSongs = new Set()
		this.muted = false
		this.volume = 100
		this.mutedAtVolume = 100
		this.soundfontName = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_4__.getSetting)("soundfontName")
		this.inputInstrument = "acoustic_grand_piano"
		this.lastMicNote = -1

		this.newSongCallbacks = []
		this.inputActiveNotes = {}
		this.inputPlayedNotes = []

		this.playbackSpeed = 1

		console.log("Player created.")
		this.playTick()
	}
	getState() {
		let time = this.getTime()
		return {
			time: time,
			ctxTime: this.audioPlayer.getContextTime(),
			end: this.song ? this.song.getEnd() : 0,
			loading: this.audioPlayer.loading,
			song: this.song,
			inputActiveNotes: this.inputActiveNotes,
			inputPlayedNotes: this.inputPlayedNotes,
			bpm: this.getBPM(time)
		}
	}
	addNewSongCallback(callback) {
		this.newSongCallbacks.push(callback)
	}
	switchSoundfont(soundfontName) {
		this.wasPaused = this.paused
		this.pause()
		;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().startLoad()
		let nowTime = window.performance.now()
		this.soundfontName = soundfontName
		this.audioPlayer.switchSoundfont(soundfontName, this.song).then(resolve => {
			window.setTimeout(() => {
				if (!this.wasPaused) {
					this.resume()
				}
				(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().stopLoad()
			}, Math.max(0, 500 - (window.performance.now() - nowTime)))
		})
	}

	getTimeWithScrollOffset(scrollOffset) {
		return this.progress + this.startDelay - scrollOffset
	}
	getTime() {
		return this.progress + this.startDelay - this.scrollOffset
	}
	getTimeWithoutScrollOffset() {
		return this.progress + this.startDelay
	}
	setTime(seconds) {
		this.audioPlayer.stopAllSources()
		this.progress += seconds - this.getTime()
		this.resetNoteSequence()
	}
	increaseSpeed(val) {
		this.playbackSpeed = Math.max(
			0,
			Math.round((this.playbackSpeed + val) * 100) / 100
		)
	}
	getChannel(track) {
		if (this.song.activeTracks[track].notes.length) {
			return this.channels[this.song.activeTracks[track].notes[0].channel]
		}
	}
	getCurrentTrackInstrument(trackIndex) {
		let i = 0
		let noteSeq = this.song.getNoteSequence()
		let nextNote = noteSeq[i]
		while (nextNote.track != trackIndex && i < noteSeq.length - 1) {
			i++
			nextNote = noteSeq[i]
		}
		if (nextNote.track == trackIndex) {
			return nextNote.instrument
		}
	}

	async loadSong(theSong, fileName, name) {
		this.audioPlayer.stopAllSources()
		;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().startLoad()
		;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Loading " + fileName + ".")
		if (this.audioPlayer.isRunning()) {
			this.audioPlayer.suspend()
		}

		this.loading = true

		;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Parsing Midi File.")
		try {
			let midiFile = await _MidiLoader_js__WEBPACK_IMPORTED_MODULE_0__.MidiLoader.loadFile(theSong)
			this.setSong(new _Song_js__WEBPACK_IMPORTED_MODULE_1__.Song(midiFile, fileName, name))
			;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Loading Instruments")

			await this.audioPlayer.loadInstrumentsForSong(this.song)

			;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Creating Buffers")
			return this.audioPlayer.loadBuffers().then(v => (0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().stopLoad())
		} catch (error) {
			console.log(error)
			_ui_Notification_js__WEBPACK_IMPORTED_MODULE_8__.Notification.create("Couldn't read Midi-File - " + error, 2000)
			;(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().stopLoad()
		}
	}

	async loadFromRecording(fileName, name) {
		this.audioPlayer.stopAllSources();
		(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().startLoad();
		(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Loading " + fileName + ".");

		if (this.audioPlayer.isRunning()) {
			this.audioPlayer.suspend();
		}

		this.loading = true;

		(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Retrieving Midi File from localForage.");

		try {
			// Retrieve the MIDI file from localForage
			let theSong = await localforage__WEBPACK_IMPORTED_MODULE_9___default().getItem(fileName);

			if (theSong == null) {
				throw new Error("No file found with the name " + fileName);
			}

			(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Parsing Midi File.");

			let midiFile = await _MidiLoader_js__WEBPACK_IMPORTED_MODULE_0__.MidiLoader.loadFile(theSong);
			this.setSong(new _Song_js__WEBPACK_IMPORTED_MODULE_1__.Song(midiFile, fileName, name));
			(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Loading Instruments");

			await this.audioPlayer.loadInstrumentsForSong(this.song);

			(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().setLoadMessage("Creating Buffers");
			return this.audioPlayer.loadBuffers().then(v => (0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().stopLoad());
		} catch (error) {
			console.log(error);
			_ui_Notification_js__WEBPACK_IMPORTED_MODULE_8__.Notification.create("Couldn't read Midi-File - " + error, 2000);
			(0,_ui_Loader_js__WEBPACK_IMPORTED_MODULE_3__.getLoader)().stopLoad();
		}
	}


	setSong(song) {
		this.pause()
		this.playing = false
		this.paused = true
		this.wasPaused = true
		this.progress = 0
		this.scrollOffset = 0
		this.song = song
		if (this.loadedSongs.has(song)) {
			this.loadedSongs.add(song)
		}
		(0,_Tracks_js__WEBPACK_IMPORTED_MODULE_7__.setupTracks)(song.activeTracks)
		this.newSongCallbacks.forEach(callback => callback())
	}
	startPlay() {
		console.log("Starting Song")
		this.wasPaused = false

		this.resetNoteSequence()
		this.lastTime = this.audioPlayer.getContextTime()
		this.resume()
	}
	handleScroll(stacksize) {
		if (this.scrolling != 0) {
			if (!this.song) {
				this.scrolling = 0
				return
			}
			this.lastTime = this.audioPlayer.getContextTime()
			let newScrollOffset = this.scrollOffset + 0.01 * this.scrolling
			//get hypothetical time with new scrollOffset.
			let oldTime = this.getTimeWithScrollOffset(this.scrollOffset)
			let newTime = this.getTimeWithScrollOffset(newScrollOffset)

			//limit scroll past end
			if (this.song && newTime > 1 + this.song.getEnd() / 1000) {
				this.scrolling = 0
				newScrollOffset =
					this.getTimeWithoutScrollOffset() - (1 + this.song.getEnd() / 1000)
				this.scrollOffset + (1 + this.song.getEnd() / 1000 - this.getTime()) ||
					this.scrollOffset
			}

			//limit scroll past beginning
			if (newTime < oldTime && newTime < this.startDelay) {
				this.scrolling = 0
				newScrollOffset = this.getTimeWithoutScrollOffset() - this.startDelay
			}

			this.scrollOffset = newScrollOffset

			//dampen scroll amount somehow...
			this.scrolling =
				(Math.abs(this.scrolling) -
					Math.max(
						Math.abs(this.scrolling * 0.003),
						this.playbackSpeed * 0.001
					)) *
				(Math.abs(this.scrolling) / this.scrolling) || 0

			//set to zero if only minimal scrollingspeed left
			if (Math.abs(this.scrolling) <= this.playbackSpeed * 0.005) {
				this.scrolling = 0
				this.resetNoteSequence()
			}
			//limit recursion
			if (!stacksize) stacksize = 0
			if (stacksize > 50) {
				window.setTimeout(() => {
					this.handleScroll()
				}, 25)
				return
			}
			this.handleScroll(++stacksize)
			return
		}
	}
	getBPM(time) {
		let val = 0
		if (this.song) {
			for (let i = this.song.temporalData.bpms.length - 1; i >= 0; i--) {
				if (time * 1000 > this.song.temporalData.bpms[i].timestamp) {
					val = this.song.temporalData.bpms[i].bpm
					break
				}
			}
		}
		return val
	}
	playTick() {
		let currentContextTime = this.audioPlayer.getContextTime()

		let delta = (currentContextTime - this.lastTime) * this.playbackSpeed

		//Setting doesnt exist yet. Pitch detection is too bad for a whole piano.
		this.addMicInputNotes()

		this.clearOldPlayedInputNotes()

		//cap max updaterate.
		if (delta < 0.0069) {
			this.requestNextTick()
			return
		}

		let oldProgress = this.progress
		this.lastTime = currentContextTime
		if (!this.paused && this.scrolling == 0) {
			this.progress += Math.min(0.1, delta)
		} else {
			this.requestNextTick()
			return
		}

		let soundfontName = (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_4__.getSetting)("soundfontName")
		if (soundfontName != this.soundfontName) {
			this.switchSoundfont(soundfontName)
			this.requestNextTick()
			return
		}

		let currentTime = this.getTime()

		if (this.isSongEnded(currentTime - 5)) {
			this.pause()
			this.requestNextTick()
			return
		}
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_4__.getSetting)("enableMetronome")) {
			this.playMetronomeBeats(currentTime)
		}
		while (this.isNextNoteReached(currentTime)) {
			let toRemove = 0
			forLoop: for (let i = 0; i < this.noteSequence.length; i++) {
				if (currentTime > 0.05 + this.noteSequence[i].timestamp / 1000) {
					toRemove++
				} else {
					break forLoop
				}
			}
			if (toRemove > 0) {
				this.noteSequence.splice(0, toRemove)
			}

			if (
				this.noteSequence[0] &&
				(!(0,_Tracks_js__WEBPACK_IMPORTED_MODULE_7__.isTrackRequiredToPlay)(this.noteSequence[0].track) ||
					this.isInputKeyPressed(this.noteSequence[0].noteNumber))
			) {
				this.playNote(this.noteSequence.shift())
			} else {
				this.progress = oldProgress
				break
			}
		}

		this.requestNextTick()
	}

	playMetronomeBeats(currentTime) {
		this.playedBeats = this.playedBeats || {}
		let beatsBySecond = getCurrentSong().temporalData.beatsBySecond
		let secondsToCheck = [Math.floor(currentTime), Math.floor(currentTime) + 1]
		secondsToCheck.forEach(second => {
			if (beatsBySecond[second]) {
				beatsBySecond[second].forEach(beatTimestamp => {
					if (
						!this.playedBeats.hasOwnProperty(beatTimestamp) &&
						beatTimestamp / 1000 < currentTime + 0.5
					) {
						let newMeasure =
							getCurrentSong().measureLines[Math.floor(beatTimestamp / 1000)] &&
							getCurrentSong().measureLines[
								Math.floor(beatTimestamp / 1000)
							].includes(beatTimestamp)
						this.playedBeats[beatTimestamp] = true
						this.audioPlayer.playBeat(
							beatTimestamp / 1000 - currentTime,
							newMeasure
						)
					}
				})
			}
		})
	}

	clearOldPlayedInputNotes() {
		//TODO - Clear those that arent displayed anymore.. And/Or save them somewhere for playback.
	}

	addMicInputNotes() {
		if ((0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_4__.getSetting)("micInputEnabled")) {
			let currentMicNote = (0,_MicInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getCurrentMicNote)()

			// console.log(currentMicFrequency)
			if (this.lastMicNote != currentMicNote) {
				if (this.lastMicNote > -1) {
					this.addInputNoteOff(this.lastMicNote)
				}
				if (currentMicNote > -1) {
					this.addInputNoteOn(currentMicNote)
				}
			}
			this.lastMicNote = currentMicNote
		}
	}

	requestNextTick() {
		window.requestAnimationFrame(this.playTick.bind(this))
	}

	isInputKeyPressed(noteNumber) {
		if (
			this.inputActiveNotes.hasOwnProperty(noteNumber) &&
			!this.inputActiveNotes[noteNumber].wasUsed
		) {
			this.inputActiveNotes[noteNumber].wasUsed = true
			return true
		}
		return false
	}
	isSongEnded(currentTime) {
		return currentTime >= this.song.getEnd() / 1000
	}

	isNextNoteReached(currentTime) {
		let lookahead = (0,_Tracks_js__WEBPACK_IMPORTED_MODULE_7__.isAnyTrackPlayalong)()
			? LOOK_AHEAD_TIME_WHEN_PLAYALONG
			: LOOK_AHEAD_TIME
		return (
			this.noteSequence.length &&
			this.noteSequence[0].timestamp / 1000 <
			currentTime + lookahead * this.playbackSpeed
		)
	}

	stop() {
		this.progress = 0
		this.scrollOffset = 0
		this.playing = false
		this.pause()
	}
	resume() {
		if (!this.song || !this.paused) return
		console.log("Resuming Song")
		this.paused = false
		this.resetNoteSequence()
		this.audioPlayer.resume()
	}
	resetNoteSequence() {
		this.noteSequence = this.song.getNoteSequence()
		this.noteSequence = this.noteSequence.filter(
			note => note.timestamp > this.getTime()
		)
		this.inputActiveNotes = {}
		this.playedBeats = {}
	}

	pause() {
		console.log("Pausing Song")
		this.pauseTime = this.getTime()
		this.paused = true
	}

	playNote(note) {
		if (!note.hasOwnProperty("channel") || !note.hasOwnProperty("noteNumber")) {
			return
		}
		let currentTime = this.getTime()

		if ((0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_5__.getMidiHandler)().isOutputActive()) {
			(0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_5__.getMidiHandler)().playNote(
				note.noteNumber + 21,
				note.velocity,
				note.noteOffVelocity,
				(note.timestamp - currentTime * 1000) / this.playbackSpeed,
				(note.offTime - currentTime * 1000) / this.playbackSpeed
			)
		} else {
			this.audioPlayer.playCompleteNote(
				currentTime,
				note,
				this.playbackSpeed,
				this.getNoteVolume(note),
				(0,_Tracks_js__WEBPACK_IMPORTED_MODULE_7__.isAnyTrackPlayalong)()
			)
		}
	}
	getNoteVolume(note) {
		return (
			(this.volume / 100) *
			((0,_Tracks_js__WEBPACK_IMPORTED_MODULE_7__.getTrackVolume)(note.track) / 100) *
			(note.channelVolume / 127)
		)
	}

	addInputNoteOn(noteNumber) {
		console.log(pianoNotes[noteNumber])
		if (this.inputActiveNotes.hasOwnProperty(noteNumber)) {
			console.log("NOTE ALREADY PLAING")
			this.audioPlayer.noteOffContinuous(
				this.inputActiveNotes[noteNumber].audioNote
			)
			delete this.inputActiveNotes[noteNumber]
		}
		let audioNote = this.audioPlayer.createContinuousNote(
			noteNumber,
			this.volume,
			this.inputInstrument
		)
		let activeNoteObj = {
			audioNote: audioNote,
			wasUsed: false,
			noteNumber: noteNumber,
			timestamp: this.audioPlayer.getContextTime() * 1000
		}

		this.inputActiveNotes[noteNumber] = activeNoteObj
	}
	addInputNoteOff(noteNumber) {
		if (!this.inputActiveNotes.hasOwnProperty(noteNumber)) {
			console.log("NOTE NOT PLAYING")
			return
		}
		this.audioPlayer.noteOffContinuous(
			this.inputActiveNotes[noteNumber].audioNote
		)
		this.inputActiveNotes[noteNumber].offTime =
			this.audioPlayer.getContextTime() * 1000
		this.inputPlayedNotes.push(this.inputActiveNotes[noteNumber])


		delete this.inputActiveNotes[noteNumber]
		console.log(this.inputPlayedNotes)
	}
}
const thePlayer = new Player()
const getPlayer = () => {
	return thePlayer
}

const getCurrentSong = () => {
	return thePlayer.song
}

const getPlayerState = () => {
	return thePlayer.getState()
}
function getPianoNotes() {
	const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
	const numOctaves = 8; // 7 octaves from A0 to A7
	const pianoNotes = [];

	for (let octave = 0; octave <= numOctaves; octave++) {
		for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
			if (noteIndex < 9 && octave === 0) {
				continue; // Skip C0 to G#8
			}

			const noteWithOctave = `${notes[noteIndex]}${octave}`;
			pianoNotes.push(noteWithOctave);

			if (notes[noteIndex] === "C" && octave === 8) {
				break; // Stop after C8
			}
		}
	}

	return pianoNotes;
}

const pianoNotes = getPianoNotes();
console.log(pianoNotes);


/***/ }),

/***/ "./js/player/Tracks.js":
/*!*****************************!*\
  !*** ./js/player/Tracks.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTrack: () => (/* binding */ getTrack),
/* harmony export */   getTrackColor: () => (/* binding */ getTrackColor),
/* harmony export */   getTrackVolume: () => (/* binding */ getTrackVolume),
/* harmony export */   getTracks: () => (/* binding */ getTracks),
/* harmony export */   isAnyTrackPlayalong: () => (/* binding */ isAnyTrackPlayalong),
/* harmony export */   isTrackDrawn: () => (/* binding */ isTrackDrawn),
/* harmony export */   isTrackRequiredToPlay: () => (/* binding */ isTrackRequiredToPlay),
/* harmony export */   setTrackColor: () => (/* binding */ setTrackColor),
/* harmony export */   setupTracks: () => (/* binding */ setupTracks)
/* harmony export */ });
/* harmony import */ var _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/CONST.js */ "./js/data/CONST.js");


/**
 *
 */

var theTracks = {}
const getTracks = () => {
	return theTracks
}
const getTrack = trackId => {
	return theTracks[trackId]
}
const setupTracks = activeTracks => {
	theTracks = {}
	for (let trackId in activeTracks) {
		if (!theTracks.hasOwnProperty(trackId)) {
			theTracks[trackId] = {
				draw: true,
				color: _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__.CONST.TRACK_COLORS[trackId % 4],
				volume: 100,
				name: activeTracks[trackId].name || "Track " + trackId,
				requiredToPlay: false,
				index: trackId
			}
		}
		theTracks[trackId].color = _data_CONST_js__WEBPACK_IMPORTED_MODULE_0__.CONST.TRACK_COLORS[trackId % 4]
	}
}

const isTrackRequiredToPlay = trackId => {
	return theTracks[trackId].requiredToPlay
}

const isAnyTrackPlayalong = () => {
	return (
		Object.keys(theTracks).filter(trackId => theTracks[trackId].requiredToPlay)
			.length > 0
	)
}

const getTrackVolume = trackId => {
	return theTracks[trackId].volume
}

const isTrackDrawn = trackId => {
	return theTracks[trackId] && theTracks[trackId].draw
}

const getTrackColor = trackId => {
	return theTracks[trackId] ? theTracks[trackId].color : "rgba(0,0,0,0)"
}

const setTrackColor = (trackId, colorId, color) => {
	theTracks[trackId].color[colorId] = color
}


/***/ }),

/***/ "./js/recording/midi-recorder.js":
/*!***************************************!*\
  !*** ./js/recording/midi-recorder.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var midi_writer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! midi-writer-js */ "./node_modules/midi-writer-js/build/index.js");
/* harmony import */ var midi_writer_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(midi_writer_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);



class MidiRecorder {
    constructor() {
        this.recording = false;
        this.track = new midi_writer_js__WEBPACK_IMPORTED_MODULE_0__.Track();
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
        this.track = new midi_writer_js__WEBPACK_IMPORTED_MODULE_0__.Track();
    }

    async saveRecording() {
        this.recording = false;
        let write = new midi_writer_js__WEBPACK_IMPORTED_MODULE_0__.Writer(this.track);
        let midiBlob = write.blob();
        let filename = "recording-" + new Date().toISOString() + ".midi";
        await localforage__WEBPACK_IMPORTED_MODULE_1___default().setItem(filename, midiBlob);
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
                this.track.addEvent(new midi_writer_js__WEBPACK_IMPORTED_MODULE_0__.NoteEvent({ pitch: [note], duration: durationInTicks, velocity: velocity, wait: noteOnTime }));
                delete this.notesOn[note];
            }
        }
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MidiRecorder);


/***/ }),

/***/ "./js/settings/DefaultSettings.js":
/*!****************************************!*\
  !*** ./js/settings/DefaultSettings.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultSettings: () => (/* binding */ getDefaultSettings)
/* harmony export */ });
/* harmony import */ var _Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.js */ "./js/settings/Settings.js");


const getDefaultSettings = () => {
	let copy = {}
	for (let tab in defaultSettings) {
		copy[tab] = {}
		for (let category in defaultSettings[tab]) {
			copy[tab][category] = []
			defaultSettings[tab][category].forEach(setting => {
				let settingCopy = {}
				for (let attribute in setting) {
					settingCopy[attribute] = setting[attribute]
				}
				copy[tab][category].push(settingCopy)
			})
		}
	}
	return copy
}
const TAB_GENERAL = "General"
const TAB_AUDIO = "Audio"
const TAB_VIDEO = "Video"

const defaultSettings = {
	//tabs
	General: {
		//default or subcategory
		default: [
			{
				type: "slider",
				id: "renderOffset",
				label: "Render offset (ms)",
				value: 0,
				min: -250,
				max: 250,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("renderOffset", value)
			},
			{
				type: "checkbox",
				id: "reverseNoteDirection",
				label: "Reverse note direction",
				value: false,
				onChange: ev => {
					;(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("reverseNoteDirection", ev.target.checked)
					;(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)(
						"pianoPosition",
						Math.abs(parseInt((0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSetting)("pianoPosition")) + 1)
					)
				}
			},

			{
				type: "checkbox",
				id: "showBPM",
				label: "Show BPM",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showBPM", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showMiliseconds",
				label: "Show Miliseconds",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showMiliseconds", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showNoteDebugInfo",
				label: "Enable debug info on hover over note",
				value: false,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showNoteDebugInfo", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showMarkersSong",
				label: "Show markers in the song",
				value: false,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showMarkersSong", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showMarkersTimeline",
				label: "Show markers on timeline",
				value: false,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showMarkersTimeline", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showFps",
				label: "Show FPS",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showFps", ev.target.checked)
			},
			{
				type: "color",
				id: "inputNoteColor",
				label: "Your note color",
				value: "rgba(40,155,155,0.8)",
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("inputNoteColor", value)
			}
		],
		"On Screen Piano": [
			{
				type: "checkbox",
				id: "clickablePiano",
				label: "Clickable piano",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("clickablePiano", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showKeyNamesOnPianoWhite",
				label: "Show white key names on piano",
				value: true,
				onChange: ev =>
					(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showKeyNamesOnPianoWhite", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showKeyNamesOnPianoBlack",
				label: "Show black key names on piano",
				value: true,
				onChange: ev =>
					(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showKeyNamesOnPianoBlack", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "highlightActivePianoKeys",
				label: "Color active piano keys",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showPianoKeys", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "drawPianoKeyHitEffect",
				label: "Piano Hit key effect",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("drawPianoKeyHitEffect", ev.target.checked)
			},
			{
				type: "slider",
				id: "pianoPosition",
				label: "Piano Position",
				value: 20,
				min: 0,
				max: 100,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("pianoPosition", value)
			},
			{
				type: "slider",
				id: "whiteKeyHeight",
				label: "Height (%) - White keys",
				value: 100,
				min: 0,
				max: 200,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("whiteKeyHeight", value)
			},
			{
				type: "slider",
				id: "blackKeyHeight",
				label: "Height (%) - Black keys",
				value: 100,
				min: 0,
				max: 200,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("blackKeyHeight", value)
			}
		]
	},

	Video: {
		default: [
			{
				type: "slider",
				id: "noteToHeightConst",
				label: "Seconds shown on screen",
				value: 3,
				min: 0.1,
				max: 30,
				step: 0.1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("noteToHeightConst", value)
			}
		],
		"Note Appearance": [
			{
				type: "checkbox",
				id: "showHitKeys",
				label: "Active Notes effect",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showHitKeys", ev.target.checked)
			},

			{
				type: "checkbox",
				id: "strokeActiveNotes",
				label: "Stroke active notes",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("strokeActiveNotes", ev.target.checked)
			},
			{
				type: "color",
				id: "strokeActiveNotesColor",
				label: "Stroke color",
				value: "rgba(240,240,240,0.5)",
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("strokeActiveNotesColor", value)
			},
			{
				type: "slider",
				id: "strokeActiveNotesWidth",
				label: "Stroke width",
				value: "4",
				min: 1,
				max: 10,
				step: 0.5,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("strokeActiveNotesWidth", value)
			},
			{
				type: "checkbox",
				id: "strokeNotes",
				label: "Stroke notes",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("strokeNotes", ev.target.checked)
			},
			{
				type: "color",
				id: "strokeNotesColor",
				label: "Stroke color",
				value: "rgba(0,0,0,1)",
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("strokeNotesColor", value)
			},
			{
				type: "slider",
				id: "strokeNotesWidth",
				label: "Stroke width",
				value: "1",
				min: 1,
				max: 10,
				step: 0.5,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("strokeNotesWidth", value)
			},
			{
				type: "checkbox",
				id: "roundedNotes",
				label: "Rounded notes",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("roundedNotes", ev.target.checked)
			},
			//TODO fix getAlphaFromY in Noterender.
			// {
			// 	type: "checkbox",
			// 	id: "fadeInNotes",
			// 	label: "Enable fade in effect",
			// 	value: true,
			// 	onChange: ev => setSetting("fadeInNotes", ev.target.checked)
			// },
			{
				type: "slider",
				id: "noteBorderRadius",
				label: "Note border radius (%)",
				value: 15,
				min: 0,
				max: 50,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("noteBorderRadius", value)
			},
			{
				type: "slider",
				id: "minNoteHeight",
				label: "Minimum Note height (px)",
				value: 10,
				min: 1,
				max: 50,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("minNoteHeight", value)
			},
			{
				type: "slider",
				id: "noteEndedShrink",
				label: "Played Notes shrink speed",
				value: 1,
				min: 0,
				max: 5,
				step: 0.1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("noteEndedShrink", value)
			},
			{
				type: "slider",
				id: "playedNoteFalloffSpeed",
				label: "Played Note Speed",
				value: 1,
				min: 0.1,
				max: 10,
				step: 0.1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("playedNoteFalloffSpeed", value)
			}
		],
		Sustain: [
			{
				type: "checkbox",
				id: "showSustainOnOffs",
				label: "Draw Sustain On/Off Events",
				value: false,
				onChange: function (ev) {
					(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showSustainOnOffs", ev.target.checked)
				}
			},
			{
				type: "checkbox",
				id: "showSustainPeriods",
				label: "Draw Sustain Periods",
				value: false,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showSustainPeriods", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showSustainedNotes",
				label: "Draw Sustained Notes",
				value: false,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showSustainedNotes", ev.target.checked)
			},
			{
				type: "slider",
				id: "sustainedNotesOpacity",
				label: "Sustained Notes Opacity (%)",
				value: 50,
				min: 0,
				max: 100,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("sustainedNotesOpacity", value)
			}
		],
		Particles: [
			{
				type: "checkbox",
				id: "showParticlesTop",
				label: "Enable top particles",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showParticlesTop", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "showParticlesBottom",
				label: "Enable bottom particles ",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("showParticlesBottom", ev.target.checked)
			},
			{
				type: "checkbox",
				id: "particleStroke",
				label: "Stroke particles",
				value: true,
				onChange: ev => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("particleStroke", ev.target.checked)
			},
			{
				type: "slider",
				id: "particleBlur",
				label: "Particle blur amount (px)",
				value: 3,
				min: 0,
				max: 10,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("particleBlur", value)
			},
			{
				type: "slider",
				id: "particleAmount",
				label: "Particle Amount (per frame)",
				value: 3,
				min: 0,
				max: 15,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("particleAmount", value)
			},
			{
				type: "slider",
				id: "particleSize",
				label: "Particle Size",
				value: 6,
				min: 0,
				max: 10,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("particleSize", value)
			},
			{
				type: "slider",
				id: "particleLife",
				label: "Particle Duration",
				value: 20,
				min: 1,
				max: 150,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("particleLife", value)
			},
			{
				type: "slider",
				id: "particleSpeed",
				label: "Particle Speed",
				value: 4,
				min: 1,
				max: 15,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("particleSpeed", value)
			}
		],
		Background: [
			{
				type: "color",
				id: "bgCol1",
				label: "Background fill color 1",
				value: "rgba(40,40,40,0.8)",
				onChange: value => {
					(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("bgCol1", value)
				}
			},
			{
				type: "color",
				id: "bgCol2",
				label: "Background fill color 2",
				value: "rgba(25,25,25,1)",
				onChange: value => {
					(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("bgCol2", value)
				}
			},
			{
				type: "color",
				id: "bgCol3",
				label: "Background stroke color",
				value: "rgba(10,10,10,0.5)",
				onChange: value => {
					(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("bgCol3", value)
				}
			}
		]
	},
	Audio: {
		default: [
			{
				type: "list",
				id: "soundfontName",
				label: "Soundfont",
				value: "MusyngKite",
				list: ["MusyngKite", "FluidR3_GM", "FatBoy"],
				onChange: newVal => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("soundfontName", newVal)
			},
			{
				type: "checkbox",
				id: "sustainEnabled",
				label: "Enable Sustain",
				value: true,
				onChange: function (ev) {
					(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("sustainEnabled", ev.target.checked)
				}.bind(undefined)
			},
			{
				type: "checkbox",
				id: "enableMetronome",
				label: "Enable Metronome",
				value: true,
				onChange: function (ev) {
					(0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("enableMetronome", ev.target.checked)
				}.bind(undefined)
			},
			{
				type: "slider",
				id: "metronomeVolume",
				label: "Metronome Volume",
				value: 0.5,
				min: 0,
				max: 1,
				step: 0.1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("metronomeVolume", value)
			}
		],
		"ADSR Envelope": [
			{
				type: "slider",
				id: "adsrAttack",
				label: "Attack (Seconds)",
				value: 0,
				min: 0,
				max: 2,
				step: 0.01,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("adsrAttack", value)
			},
			{
				type: "slider",
				id: "adsrDecay",
				label: "Decay (Seconds)",
				value: 0,
				min: 0,
				max: 0.5,
				step: 0.01,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("adsrDecay", value)
			},
			{
				type: "slider",
				id: "adsrSustain",
				label: "Sustain (%)",
				value: 100,
				min: 0,
				max: 100,
				step: 1,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("adsrSustain", value)
			},
			{
				type: "slider",
				id: "adsrReleaseKey",
				label: "Release - Key (Seconds)",
				value: 0.2,
				min: 0,
				max: 2,
				step: 0.01,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("adsrReleaseKey", value)
			},
			{
				type: "slider",
				id: "adsrReleasePedal",
				label: "Release - Pedal (Seconds)",
				value: 0.2,
				min: 0,
				max: 2,
				step: 0.01,
				onChange: value => (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.setSetting)("adsrReleasePedal", value)
			}
		]
	}
}


/***/ }),

/***/ "./js/settings/LocalStorageHandler.js":
/*!********************************************!*\
  !*** ./js/settings/LocalStorageHandler.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGlobalSavedSettings: () => (/* binding */ getGlobalSavedSettings),
/* harmony export */   saveCurrentSettings: () => (/* binding */ saveCurrentSettings)
/* harmony export */ });
/* harmony import */ var _Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.js */ "./js/settings/Settings.js");


const SAVE_PATH_ROOT = "Midiano/SavedSettings"
const getGlobalSavedSettings = () => {
	let obj = {}
	if (window.localStorage) {
		let storedObj = window.localStorage.getItem(SAVE_PATH_ROOT)
		if (storedObj) {
			obj = JSON.parse(storedObj)
		}
	}
	return obj
}

const saveCurrentSettings = () => {
	if (window.localStorage) {
		let saveObj = (0,_Settings_js__WEBPACK_IMPORTED_MODULE_0__.getSettingObject)()
		window.localStorage.setItem(SAVE_PATH_ROOT, JSON.stringify(saveObj))
	}
}


/***/ }),

/***/ "./js/settings/Settings.js":
/*!*********************************!*\
  !*** ./js/settings/Settings.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSetting: () => (/* binding */ getSetting),
/* harmony export */   getSettingObject: () => (/* binding */ getSettingObject),
/* harmony export */   getSettingsDiv: () => (/* binding */ getSettingsDiv),
/* harmony export */   resetSettingsToDefault: () => (/* binding */ resetSettingsToDefault),
/* harmony export */   setSetting: () => (/* binding */ setSetting),
/* harmony export */   setSettingCallback: () => (/* binding */ setSettingCallback)
/* harmony export */ });
/* harmony import */ var _DefaultSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultSettings.js */ "./js/settings/DefaultSettings.js");
/* harmony import */ var _ui_SettingUI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/SettingUI.js */ "./js/ui/SettingUI.js");
/* harmony import */ var _LocalStorageHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocalStorageHandler.js */ "./js/settings/LocalStorageHandler.js");




class Settings {
	constructor(ui) {
		this.settings = (0,_DefaultSettings_js__WEBPACK_IMPORTED_MODULE_0__.getDefaultSettings)()
		let savedSettings = (0,_LocalStorageHandler_js__WEBPACK_IMPORTED_MODULE_2__.getGlobalSavedSettings)()

		this.settingsById = {}
		Object.keys(this.settings).forEach(tabId =>
			Object.keys(this.settings[tabId]).forEach(categoryId =>
				this.settings[tabId][categoryId].forEach(setting => {
					this.settingsById[setting.id] = setting

					if (savedSettings.hasOwnProperty(setting.id)) {
						setting.value = savedSettings[setting.id]
					}
				})
			)
		)
		this.settingsUi = new _ui_SettingUI_js__WEBPACK_IMPORTED_MODULE_1__.SettingUI()
	}
	setSettingValue(settingId, value) {
		this.settingsById[settingId].value = value
	}
}

const globalSettings = new Settings()
const getSetting = settingId => {
	if (globalSettings == null) {
		globalSettings = new Settings()
	}
	return globalSettings.settingsById[settingId]
		? globalSettings.settingsById[settingId].value
		: null
}
const setSetting = (settingId, value) => {
	globalSettings.settingsById[settingId].value = value
	if (settingCallbacks.hasOwnProperty(settingId)) {
		settingCallbacks[settingId].forEach(callback => callback())
	}
	(0,_LocalStorageHandler_js__WEBPACK_IMPORTED_MODULE_2__.saveCurrentSettings)()
}
const getSettingsDiv = () => {
	return globalSettings.settingsUi.getSettingsDiv(globalSettings.settings)
}
var settingCallbacks = {}
const setSettingCallback = (settingId, callback) => {
	if (!settingCallbacks.hasOwnProperty(settingId)) {
		settingCallbacks[settingId] = []
	}
	settingCallbacks[settingId].push(callback)
}
const getSettingObject = () => {
	let obj = {}
	for (let key in globalSettings.settingsById) {
		obj[key] = globalSettings.settingsById[key].value
	}
	return obj
}

const resetSettingsToDefault = () => {
	let defaultSettings = (0,_DefaultSettings_js__WEBPACK_IMPORTED_MODULE_0__.getDefaultSettings)()
	Object.keys(defaultSettings).forEach(tabId =>
		Object.keys(defaultSettings[tabId]).forEach(categoryId =>
			defaultSettings[tabId][categoryId].forEach(setting => {
				globalSettings.settingsById[setting.id].value = setting.value
			})
		)
	)

	let parent = globalSettings.settingsUi.getSettingsDiv(globalSettings.settings)
		.parentElement
	parent.removeChild(
		globalSettings.settingsUi.getSettingsDiv(globalSettings.settings)
	)
	globalSettings.settingsUi.mainDiv = null
	parent.appendChild(getSettingsDiv())
}


/***/ }),

/***/ "./js/ui/DomHelper.js":
/*!****************************!*\
  !*** ./js/ui/DomHelper.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DomHelper: () => (/* binding */ DomHelper)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");


class DomHelper {
	static createCanvas(width, height, styles) {
		return DomHelper.createElement("canvas", styles, {
			width: width,
			height: height
		})
	}
	static createSpinner() {
		return DomHelper.createDivWithIdAndClass("loadSpinner", "loader")
	}
	static setCanvasSize(cnv, width, height) {
		if (cnv.width != width) {
			cnv.width = width
		}
		if (cnv.height != height) {
			cnv.height = height
		}
	}
	static replaceGlyph(element, oldIcon, newIcon) {
		element.children.forEach(childNode => {
			if (childNode.classList.contains("glyphicon-" + oldIcon)) {
				childNode.className = childNode.className.replace(
					"glyphicon-" + oldIcon,
					"glyphicon-" + newIcon
				)
			}
		})
	}
	static removeClass(className, element) {
		if (element.classList.contains(className)) {
			element.classList.remove(className)
		}
	}
	static removeClassFromElementsSelector(selector, className) {
		document.querySelectorAll(selector).forEach(el => {
			if (el.classList.contains(className)) {
				el.classList.remove(className)
			}
		})
	}
	static createSliderWithLabel(id, label, val, min, max, step, onChange) {
		let cont = DomHelper.createElement(
			"div",
			{},
			{ id: id + "container", className: "sliderContainer" }
		)
		let labelDiv = DomHelper.createElement(
			"label",
			{},
			{ id: id + "label", className: "sliderLabel", innerHTML: label }
		)
		let slider = DomHelper.createSlider(id, val, min, max, step, onChange)
		cont.appendChild(labelDiv)
		cont.appendChild(slider)
		return { slider: slider, container: cont }
	}
	static createSliderWithLabelAndField(
		id,
		label,
		val,
		min,
		max,
		step,
		onChange
	) {
		let displayDiv = DomHelper.createElement(
			"div",
			{},
			{ id: id + "Field", className: "sliderVal", innerHTML: val }
		)

		let onChangeInternal = ev => {
			displayDiv.innerHTML = ev.target.value
			onChange(ev.target.value)
		}

		let cont = DomHelper.createElement(
			"div",
			{},
			{ id: id + "container", className: "sliderContainer" }
		)
		let labelDiv = DomHelper.createElement(
			"label",
			{},
			{ id: id + "label", className: "sliderLabel", innerHTML: label }
		)
		let slider = DomHelper.createSlider(
			id,
			val,
			min,
			max,
			step,
			onChangeInternal
		)
		cont.appendChild(labelDiv)
		cont.appendChild(displayDiv)
		cont.appendChild(slider)

		return { slider: slider, container: cont }
	}
	static createGlyphiconButton(id, glyph, onClick) {
		let bt = DomHelper.createButton(id, onClick)
		bt.appendChild(this.getGlyphicon(glyph))
		return bt
	}
	static createGlyphiconTextButton(id, glyph, text, onClick) {
		let bt = DomHelper.createButton(id, onClick)
		bt.appendChild(this.getGlyphicon(glyph))
		bt.innerHTML += " " + text
		return bt
	}
	static createDiv(styles, attributes) {
		return DomHelper.createElement("div", styles, attributes)
	}
	static createDivWithId(id, styles, attributes) {
		attributes = attributes || {}
		attributes.id = id
		return DomHelper.createElement("div", styles, attributes)
	}
	static createDivWithClass(className, styles, attributes) {
		attributes = attributes || {}
		attributes.className = className
		return DomHelper.createElement("div", styles, attributes)
	}
	static createDivWithIdAndClass(id, className, styles, attributes) {
		attributes = attributes || {}
		attributes.id = id
		attributes.className = className
		return DomHelper.createElement("div", styles, attributes)
	}
	static createElementWithId(id, tag, styles, attributes) {
		attributes = attributes || {}
		attributes.id = id
		return DomHelper.createElement(tag, styles, attributes)
	}
	static createElementWithClass(className, tag, styles, attributes) {
		attributes = attributes || {}
		attributes.className = className
		return DomHelper.createElement(tag, styles, attributes)
	}
	static createElementWithIdAndClass(id, className, tag, styles, attributes) {
		styles = styles || {}
		attributes = attributes || {}
		attributes.id = id
		attributes.className = className
		return DomHelper.createElement(tag, styles, attributes)
	}
	static getGlyphicon(name) {
		return DomHelper.createElement(
			"span",
			{},
			{ className: "glyphicon glyphicon-" + name }
		)
	}
	static createSlider(id, val, min, max, step, onChange) {
		let el = DomHelper.createElement(
			"input",
			{},
			{
				id: id,
				oninput: onChange,
				type: "range",
				value: val,
				min: min,
				max: max,
				step: step
			}
		)
		el.value = val
		return el
	}
	static createTextInput(onChange, styles, attributes) {
		attributes = attributes || {}
		attributes.type = "text"
		attributes.onchange = onChange
		return DomHelper.createElement("input", styles, attributes)
	}
	static createCheckbox(text, onChange, value, isChecked) {
		let id = (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.replaceAllString)(text, " ", "") + "checkbox"
		let cont = DomHelper.createDivWithIdAndClass(id, "checkboxCont")
		let checkbox = DomHelper.createElementWithClass("checkboxInput", "input")
		checkbox.setAttribute("type", "checkbox")
		checkbox.checked = value
		checkbox.setAttribute("name", id)
		checkbox.onchange = onChange

		let label = DomHelper.createElementWithClass(
			"checkboxlabel",
			"label",
			{},
			{ innerHTML: text, for: id }
		)

		label.setAttribute("for", id)

		cont.appendChild(checkbox)
		cont.appendChild(label)
		cont.addEventListener("click", ev => {
			if (ev.target != checkbox) {
				checkbox.click()
				if (isChecked) {
					checkbox.checked = isChecked()
				}
			}
		})
		return cont
	}
	static addClassToElements(className, elements) {
		elements.forEach(element => DomHelper.addClassToElement(className, element))
	}
	static addClassToElement(className, element) {
		if (!element.classList.contains(className)) {
			element.classList.add(className)
		}
	}
	static createFlexContainer() {
		return DomHelper.createElement("div", {}, { className: "flexContainer" })
	}
	static addToFlexContainer(el) {
		let cont = DomHelper.createFlexContainer()
		cont.appendChild(el)
		return cont
	}
	static appendChildren(parent, children) {
		children.forEach(child => parent.appendChild(child))
	}
	static createButtonGroup(vertical) {
		return vertical
			? DomHelper.createElement(
				"div",
				{ justifyContent: "space-around" },
				{ className: "btn-group btn-group-vertical", role: "group" }
			)
			: DomHelper.createElement(
				"div",
				{ justifyContent: "space-around" },
				{ className: "btn-group", role: "group" }
			)
	}
	static createFileInput(text, callback) {
		let customFile = DomHelper.createElement(
			"label",
			{},
			{ className: "btn btn-default btn-file" }
		)
		customFile.appendChild(DomHelper.getGlyphicon("folder-open"))
		customFile.innerHTML += " " + text
		let inp = DomHelper.createElement(
			"input",
			{ display: "none" },
			{ type: "file" }
		)

		customFile.appendChild(inp)
		inp.onchange = callback

		return customFile
	}
	static getDivider() {
		return DomHelper.createElement("div", {}, { className: "divider" })
	}
	static createButton(id, onClick) {
		let bt = DomHelper.createElement(
			"button",
			{},
			{
				id: id,
				type: "button",
				className: "btn btn-default",
				onclick: onClick
			}
		)
		bt.appendChild(DomHelper.getButtonSelectLine())
		return bt
	}
	static createTextButton(id, text, onClick) {
		let bt = DomHelper.createElement(
			"button",
			{},
			{
				id: id,
				type: "button",
				className: "btn btn-default",
				onclick: onClick,
				innerHTML: text
			}
		)
		bt.appendChild(DomHelper.getButtonSelectLine())
		return bt
	}
	static getButtonSelectLine() {
		return DomHelper.createDivWithClass("btn-select-line")
	}
	static createElement(tag, styles, attributes) {
		tag = tag || "div"
		attributes = attributes || {}
		styles = styles || {}
		let el = document.createElement(tag)
		Object.keys(attributes).forEach(attr => {
			el[attr] = attributes[attr]
		})
		Object.keys(styles).forEach(style => {
			el.style[style] = styles[style]
		})
		return el
	}

	static createInputSelect(title, items, callback) {
		let selectBox = DomHelper.createDivWithId(title)
		let label = DomHelper.createElementWithClass(
			"inputSelectLabel",
			"label",
			{},
			{ innerHTML: title }
		)
		selectBox.appendChild(label)
		let selectTag = DomHelper.createElementWithIdAndClass(
			title,
			"inputSelect",
			"select"
		)
		selectBox.appendChild(selectTag)
		items.forEach((item, index) => {
			let option = DomHelper.createElement(
				"option",
				{},
				{
					value: item,
					innerHTML: item
				}
			)
			selectTag.appendChild(option)
		})
		selectBox.addEventListener("change", ev => {
			callback(selectTag.value)
		})
		return selectBox
	}

	static createColorPickerGlyphiconText(glyph, text, startColor, onChange) {
		let pickrEl = null
		let pickrElCont = DomHelper.createDiv()
		let glyphBut = DomHelper.createGlyphiconTextButton(
			"colorPickerGlyph" + glyph + (0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.replaceAllString)(text, " ", "_"),
			glyph,
			text,
			() => {
				pickrEl.show()
			}
		)

		glyphBut.appendChild(pickrElCont)

		pickrEl = Pickr.create({
			el: pickrElCont,
			theme: "nano",
			useAsButton: true,
			components: {
				hue: true,
				preview: true,
				opacity: true,
				interaction: {
					input: true
				}
			}
		})

		let getGlyphEl = () =>
			glyphBut.querySelector(
				"#colorPickerGlyph" +
				glyph +
				(0,_Util_js__WEBPACK_IMPORTED_MODULE_0__.replaceAllString)(text, " ", "_") +
				" .glyphicon"
			)

		pickrEl.on("init", () => {
			pickrEl.setColor(startColor)
			getGlyphEl().style.color = startColor
		})
		pickrEl.on("change", color => {
			let colorString = color.toRGBA().toString()
			getGlyphEl().style.color = colorString
			onChange(colorString)
		})
		return glyphBut
	}
	/**
	 *
	 * @param {String} text
	 * @param {String} startColor
	 * @param {Function} onChange  A color string of the newly selected color will be passed as argument
	 */
	static createColorPickerText(text, startColor, onChange) {
		let cont = DomHelper.createDivWithClass("settingContainer")

		let label = DomHelper.createDivWithClass(
			"colorLabel settingLabel",
			{},
			{ innerHTML: text }
		)

		let colorButtonContainer = DomHelper.createDivWithClass(
			"colorPickerButtonContainer"
		)
		let colorButton = DomHelper.createDivWithClass("colorPickerButton")
		colorButtonContainer.appendChild(colorButton)

		cont.appendChild(label)
		cont.appendChild(colorButtonContainer)

		let colorPicker = Pickr.create({
			el: colorButton,
			theme: "nano",
			defaultRepresentation: "RGBA",
			components: {
				hue: true,
				preview: true,
				opacity: true,
				interaction: {
					input: true
				}
			}
		})
		colorButtonContainer.style.backgroundColor = startColor
		cont.onclick = () => colorPicker.show()
		colorPicker.on("init", () => {
			colorPicker.show()
			colorPicker.setColor(startColor)
			colorPicker.hide()
		})
		colorPicker.on("change", color => {
			colorButtonContainer.style.backgroundColor = colorPicker
				.getColor()
				.toRGBA()
				.toString()
			onChange(color.toRGBA().toString())
		})

		return cont
	}

	static removeClassFromElement(className, element) {
		if (element.classList.contains(className)) {
			element.classList.remove(className);
		}
	}

}


/***/ }),

/***/ "./js/ui/ElementHighlight.js":
/*!***********************************!*\
  !*** ./js/ui/ElementHighlight.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElementHighlight: () => (/* binding */ ElementHighlight)
/* harmony export */ });
class ElementHighlight {
	constructor(element, time) {
		time = time || 1500

		element.classList.add("highlighted")
		window.setTimeout(() => {
			element.classList.remove("highlighted")
		}, time)
	}
}


/***/ }),

/***/ "./js/ui/Loader.js":
/*!*************************!*\
  !*** ./js/ui/Loader.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLoader: () => (/* binding */ getLoader)
/* harmony export */ });
/* harmony import */ var _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomHelper.js */ "./js/ui/DomHelper.js");

class Loader {
	startLoad() {
		this.getLoadingDiv().style.display = "block"
		this.getLoadingText().innerHTML = "Loading"
		this.loading = true
		this.loadAnimation()
	}
	stopLoad() {
		this.getLoadingDiv().style.display = "none"
		this.loading = false
	}
	loadAnimation() {
		let currentText = this.getLoadingText().innerHTML
		currentText = currentText.replace("...", " ..")
		currentText = currentText.replace(" ..", ". .")
		currentText = currentText.replace(". .", ".. ")
		currentText = currentText.replace(".. ", "...")
		this.getLoadingText().innerHTML = currentText
		if (this.loading) {
			window.requestAnimationFrame(this.loadAnimation.bind(this))
		}
	}
	setLoadMessage(msg) {
		this.getLoadingText().innerHTML = msg + "..."
	}
	getLoadingText() {
		if (!this.loadingText) {
			this.loadingText = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createElement("p")
			this.getLoadingDiv().appendChild(this.loadingText)
		}
		return this.loadingText
	}
	getLoadingDiv() {
		if (!this.loadingDiv) {
			this.loadingDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithIdAndClass(
				"loadingDiv",
				"fullscreen"
			)

			let spinner = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createSpinner()
			this.loadingDiv.appendChild(spinner)
			document.body.appendChild(this.loadingDiv)
		}
		return this.loadingDiv
	}
}

const getLoader = () => loaderSingleton
const loaderSingleton = new Loader()


/***/ }),

/***/ "./js/ui/Notification.js":
/*!*******************************!*\
  !*** ./js/ui/Notification.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Notification: () => (/* binding */ Notification)
/* harmony export */ });
/* harmony import */ var _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomHelper.js */ "./js/ui/DomHelper.js");


class Notification {
	static create(message, time) {
		time = time || 1500
		let notifEl = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass("notification")
		notifEl.innerHTML = message
		document.body.appendChild(notifEl)
		window.setTimeout(() => document.body.removeChild(notifEl), time)
	}
}


/***/ }),

/***/ "./js/ui/SettingUI.js":
/*!****************************!*\
  !*** ./js/ui/SettingUI.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingUI: () => (/* binding */ SettingUI)
/* harmony export */ });
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/DomHelper.js */ "./js/ui/DomHelper.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");



/**
 * Class to create the DOM Elements used to manipulate the settings.
 */
class SettingUI {
	constructor() {
		this.tabs = {}
		this.activeTab = "General"
		this.mainDiv = null
	}
	/**
	 * returns a div with the following structure:
	 * 	.settingsContainer {
	 * 		.settingsTabButtonContainer {
	 * 			.settingsTabButton ...
	 * 		}
	 * 		.settingsContentContainer {
	 * 			.settingContainer ...
	 * 		}
	 * }
	 *
	 * @param {Object} settings  as defined in DefaultSettings.js
	 */
	getSettingsDiv(settings) {
		if (this.mainDiv == null) {
			this.mainDiv = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createDivWithClass("settingsContainer")
			this.mainDiv.appendChild(this.getTabDiv(Object.keys(settings)))
			this.mainDiv.appendChild(this.getContentDiv(settings))

			this.mainDiv
				.querySelectorAll(".settingsTabContent" + this.activeTab)
				.forEach(el => (el.style.display = "block"))
			this.mainDiv
				.querySelector("#" + this.activeTab + "Tab")
				.classList.add("selected")
		}
		return this.mainDiv
	}
	getTabDiv(tabIds) {
		let cont = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createDivWithClass("settingsTabButtonContainer")
		tabIds.forEach(tabId => {
			let tabButton = this.createTabButton(tabId)
			tabButton.classList.add("settingsTabButton")
			cont.appendChild(tabButton)
		})
		return cont
	}
	createTabButton(tabName) {
		let butEl = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createTextButton(tabName + "Tab", tabName, ev => {
			document
				.querySelectorAll(".settingsTabButton")
				.forEach(el => el.classList.remove("selected"))

			butEl.classList.add("selected")

			document
				.querySelectorAll(".settingsTabContentContainer")
				.forEach(settingEl => (settingEl.style.display = "none"))
			document
				.querySelectorAll(".settingsTabContent" + tabName)
				.forEach(settingEl => (settingEl.style.display = "block"))
		})
		return butEl
	}
	getContentDiv(settings) {
		let cont = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createDivWithClass("settingsContentContainer")
		Object.keys(settings).forEach(tabId => {
			cont.appendChild(this.createSettingTabContentDiv(tabId, settings[tabId]))
		})

		return cont
	}
	createSettingTabContentDiv(tabName, settingGroups) {
		let cont = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createDivWithClass(
			"settingsTabContentContainer settingsTabContent" + tabName
		)
		Object.keys(settingGroups).forEach(groupId => {
			cont.appendChild(
				this.createSettingGroupDiv(groupId, settingGroups[groupId])
			)
		})
		if (tabName == "General") {
			cont.appendChild(this.getResetButton())
		}
		return cont
	}
	getResetButton() {
		let but = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createTextButton(
			"settingsResetButton",
			"Reset to defaults",
			() => {
				(0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_0__.resetSettingsToDefault)()
			}
		)
		return but
	}
	createSettingGroupDiv(categoryName, settingsList) {
		let cont = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createDivWithClass(
			"settingsGroupContainer innerMenuContDiv"
		)
		if (categoryName != "default") {
			cont.classList.add("collapsed")
			let label = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createElementWithClass(
				"settingsGroupLabel clickableTitle",
				"div",
				{},
				{ innerHTML: categoryName + ": " }
			)
			cont.appendChild(label)

			let collapsed = true
			let glyph = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.getGlyphicon("plus")
			glyph.classList.add("collapserGlyphSpan")
			label.appendChild(glyph)

			label.onclick = () => {
				if (collapsed == true) {
					collapsed = false
					cont.classList.remove("collapsed")
					_ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.replaceGlyph(label, "plus", "minus")
				} else {
					collapsed = true
					cont.classList.add("collapsed")
					_ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.replaceGlyph(label, "minus", "plus")
				}
			}
		}

		settingsList.forEach(setting =>
			cont.appendChild(SettingUI.createSettingDiv(setting))
		)
		return cont
	}
	static createSettingDiv(setting) {
		switch (setting.type) {
			case "list":
				return SettingUI.createListSettingDiv(setting)
			case "checkbox":
				return SettingUI.createCheckboxSettingDiv(setting)
			case "slider":
				return SettingUI.createSliderSettingDiv(setting)
			case "color":
				return SettingUI.createColorSettingDiv(setting)
		}
	}
	static createListSettingDiv(setting) {
		let el = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createInputSelect(
			setting.label,
			setting.list,
			setting.onChange
		)
		el.classList.add("settingContainer")
		return el
	}
	static createCheckboxSettingDiv(setting) {
		let el = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createCheckbox(
			setting.label,
			setting.onChange,
			setting.value,
			setting.isChecked
		)
		el.classList.add("settingContainer")
		return el
	}
	static createSliderSettingDiv(setting) {
		let el = _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createSliderWithLabelAndField(
			setting.id + "Slider",
			setting.label,
			parseFloat(setting.value),
			setting.min,
			setting.max,
			setting.step,
			setting.onChange
		).container
		el.classList.add("settingContainer")
		return el
	}
	static createColorSettingDiv(setting) {
		return _ui_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createColorPickerText(
			setting.label,
			setting.value,
			setting.onChange
		)
	}
}


/***/ }),

/***/ "./js/ui/SongUI.js":
/*!*************************!*\
  !*** ./js/ui/SongUI.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SongUI: () => (/* binding */ SongUI)
/* harmony export */ });
/* harmony import */ var _player_FileLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player/FileLoader.js */ "./js/player/FileLoader.js");
/* harmony import */ var _player_Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../player/Player.js */ "./js/player/Player.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Util.js */ "./js/Util.js");
/* harmony import */ var _DomHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DomHelper.js */ "./js/ui/DomHelper.js");
/* harmony import */ var _Loader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loader.js */ "./js/ui/Loader.js");






class SongUI {
	constructor() {
		this.songDivs = {}
		this.wrapper = _DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.createDiv()
	}
	getDivContent() {
		return this.wrapper
	}
	setExampleSongs(jsonSongs) {
		jsonSongs.forEach(exampleSongJson => {
			let songDivObj = createUnloadedSongDiv(exampleSongJson)
			this.songDivs[exampleSongJson.fileName] = songDivObj
			this.wrapper.appendChild(songDivObj.wrapper)
		})
	}
	newSongCallback(song) {
		if (!this.songDivs.hasOwnProperty(song.fileName)) {
			let songDivObj = createLoadedSongDiv(song)
			this.songDivs[song.fileName] = songDivObj
			this.wrapper.appendChild(songDivObj.wrapper)
		} else {
			this.replaceNowLoadedSongDiv(song)
		}
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.removeClassFromElementsSelector(".songButton", "selected")
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.addClassToElement("selected", song.div)
	}
	replaceNowLoadedSongDiv(song) {
		song.div = this.songDivs[song.fileName].button
		song.div.onclick = () => loadedButtonClickCallback(song)
	}
}
function createUnloadedSongDiv(songJson) {
	let wrapper = _DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.createDivWithIdAndClass(
		"songWrap" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.replaceAllString)(songJson.fileName, " ", "_"),
		"innerMenuContDiv"
	)
	let button = createUnloadedSongButton(songJson)

	wrapper.appendChild(button)

	return {
		wrapper: wrapper,
		name: songJson.name,
		button: button
	}
}

function createLoadedSongDiv(song) {
	let wrapper = _DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.createDivWithIdAndClass(
		"songWrap" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.replaceAllString)(song.fileName, " ", "_"),
		"innerMenuContDiv"
	)
	let button = createLoadedSongButton(song)
	song.div = button
	wrapper.appendChild(song.div)

	return {
		wrapper: wrapper,
		name: song.name,
		button: button
	}
}
function createUnloadedSongButton(songJson) {
	let but = _DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.createTextButton(
		"song" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.replaceAllString)(songJson.fileName, " ", "_"),
		songJson.name,
		() => {
			(0,_Loader_js__WEBPACK_IMPORTED_MODULE_4__.getLoader)().setLoadMessage("Downloading Song")
			_player_FileLoader_js__WEBPACK_IMPORTED_MODULE_0__.FileLoader.loadSongFromURL(songJson.url, respone => {
				;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_1__.getPlayer)().loadSong(respone, songJson.fileName, songJson.name)
			})
		}
	)
	but.classList.add("songButton")
	return but
}
function createLoadedSongButton(song) {
	let but = _DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.createTextButton(
		"song" + (0,_Util_js__WEBPACK_IMPORTED_MODULE_2__.replaceAllString)(song.fileName, " ", "_"),
		song.name,
		() => loadedButtonClickCallback(song)
	)
	but.classList.add("songButton")
	return but
}

function loadedButtonClickCallback(song) {
	let currentSong = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_1__.getCurrentSong)()
	if (currentSong != song) {
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.removeClassFromElementsSelector(".songButton", "selected")
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_3__.DomHelper.addClassToElement("selected", song.div)
		;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_1__.getPlayer)().setSong(song)
	}
}


/***/ }),

/***/ "./js/ui/TrackUI.js":
/*!**************************!*\
  !*** ./js/ui/TrackUI.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTrackDiv: () => (/* binding */ createTrackDiv),
/* harmony export */   createTrackDivs: () => (/* binding */ createTrackDivs)
/* harmony export */ });
/* harmony import */ var _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomHelper.js */ "./js/ui/DomHelper.js");
/* harmony import */ var _player_Tracks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../player/Tracks.js */ "./js/player/Tracks.js");
/* harmony import */ var _player_Player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../player/Player.js */ "./js/player/Player.js");
/* harmony import */ var _SettingUI_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingUI.js */ "./js/ui/SettingUI.js");
/* harmony import */ var _ElementHighlight_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ElementHighlight.js */ "./js/ui/ElementHighlight.js");
/* harmony import */ var _Notification_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Notification.js */ "./js/ui/Notification.js");
/* harmony import */ var _MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MidiInputHandler.js */ "./js/MidiInputHandler.js");








/**
 *  Handles creation of the Track-Divs that give control over volume, diplay, color...
 *
 *  Directly changes values in the track objects
 */

const createTrackDivs = () => {
	return Object.keys((0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_1__.getTracks)()).map(trackId => createTrackDiv(trackId))
}

const createTrackDiv = trackId => {
	const trackObj = (0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_1__.getTrack)(trackId)
	let volumeSlider,
		muteButton,
		hideButton,
		trackName,
		instrumentName,
		requireToPlayAlongButton,
		clickableTitleDiv

	let trackDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithIdAndClass(
		"trackDiv" + trackId,
		"innerMenuContDiv settingGroupContainer",
		{
			borderLeft: "5px solid " + (0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_1__.getTrackColor)(trackId).white
		}
	)

	clickableTitleDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass("clickableTitle")
	let collapsed = instrumentName == "percussion" ? true : false

	let glyph = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.getGlyphicon(collapsed ? "plus" : "minus")
	glyph.classList.add("collapserGlyphSpan")
	clickableTitleDiv.appendChild(glyph)

	if (collapsed) {
		trackDiv.classList.add("collapsed")
	}
	clickableTitleDiv.onclick = () => {
		if (collapsed) {
			collapsed = false
			trackDiv.classList.remove("collapsed")
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.replaceGlyph(clickableTitleDiv, "plus", "minus")
		} else {
			collapsed = true
			trackDiv.classList.add("collapsed")
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.replaceGlyph(clickableTitleDiv, "minus", "plus")
		}
	}

	//Name
	trackName = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithIdAndClass(
		"trackName" + trackId,
		"trackName"
	)
	trackName.innerHTML = trackObj.name || "Track " + trackId

	//Instrument
	let currentInstrument = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_2__.getPlayer)().getCurrentTrackInstrument(trackObj.index)
	instrumentName = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithIdAndClass(
		"instrumentName" + trackObj.index,
		"instrumentName"
	)
	instrumentName.innerHTML = currentInstrument

	window.setInterval(
		() =>
			(instrumentName.innerHTML = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_2__.getPlayer)().getCurrentTrackInstrument(
				trackObj.index
			)),
		2000
	)

	let btnGrp = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createButtonGroup(false)

	//Track Volume
	volumeSlider = _SettingUI_js__WEBPACK_IMPORTED_MODULE_3__.SettingUI.createSettingDiv({
		type: "slider",
		label: "Volume ",
		value: trackObj.volume,
		min: 0,
		max: 200,
		step: 1,
		onChange: value => {
			if (trackObj.volume == 0 && value != 0) {
				muteButton.querySelector("input").checked = false
			} else if (trackObj.volume != 0 && value == 0) {
				muteButton.querySelector("input").checked = true
			}
			trackObj.volume = parseInt(value)
		}
	})
	// DomHelper.createSliderWithLabel(
	// 	"volume" + trackId,
	// 	"Volume",
	// 	trackObj.volume,
	// 	0,
	// 	200,
	// 	1,
	// 	ev => {
	// 		trackObj.volume = parseInt(ev.target.value)
	// 	}
	// )

	//Hide Track
	hideButton = _SettingUI_js__WEBPACK_IMPORTED_MODULE_3__.SettingUI.createSettingDiv({
		type: "checkbox",
		label: "Show track",
		value: trackObj.draw,
		onChange: () => {
			if (trackObj.draw) {
				trackObj.draw = false
			} else {
				trackObj.draw = true
			}
		}
	})

	//Mute Track
	muteButton = _SettingUI_js__WEBPACK_IMPORTED_MODULE_3__.SettingUI.createSettingDiv({
		type: "checkbox",
		label: "Mute track",
		value: trackObj.volume == 0,
		onChange: () => {
			let volumeSliderInput = volumeSlider.querySelector("input")
			let volumeSliderLabel = volumeSlider.querySelector(".sliderVal")
			if (trackObj.volume == 0) {
				let volume = trackObj.volumeAtMute || 100
				trackObj.volume = volume
				volumeSliderInput.value = volume
				trackObj.volumeAtMute = 0
				volumeSliderLabel.innerHTML = volume
			} else {
				trackObj.volumeAtMute = trackObj.volume
				trackObj.volume = 0
				volumeSliderInput.value = 0
				volumeSliderLabel.innerHTML = 0
			}
		}
	})

	//Require Track to play along
	requireToPlayAlongButton = _SettingUI_js__WEBPACK_IMPORTED_MODULE_3__.SettingUI.createSettingDiv({
		type: "checkbox",
		label: "Require playalong",
		value: trackObj.requiredToPlay,
		isChecked: () => trackObj.requiredToPlay,
		onChange: () => {
			console.log(trackObj.requiredToPlay)
			if (!trackObj.requiredToPlay) {
				if (!(0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().isInputActive()) {
					_Notification_js__WEBPACK_IMPORTED_MODULE_5__.Notification.create(
						"You have to choose a Midi Input Device to play along.",
						5000
					)
					new _ElementHighlight_js__WEBPACK_IMPORTED_MODULE_4__.ElementHighlight(document.querySelector("#midiInput"))

					return
				}
				trackObj.requiredToPlay = true
			} else {
				trackObj.requiredToPlay = false
			}
		}
	})

	let colorPickerWhite = _SettingUI_js__WEBPACK_IMPORTED_MODULE_3__.SettingUI.createColorSettingDiv({
		type: "color",
		label: "White note color",
		value: (0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_1__.getTrackColor)(trackId).white,
		onChange: colorString => {
			trackDiv.style.borderLeft = "5px solid " + colorString
			;(0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_1__.setTrackColor)(trackId, "white", colorString)
		}
	})
	let colorPickerBlack = _SettingUI_js__WEBPACK_IMPORTED_MODULE_3__.SettingUI.createColorSettingDiv({
		type: "color",
		label: "Black note color",
		value: (0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_1__.getTrackColor)(trackId).black,
		onChange: colorString => (0,_player_Tracks_js__WEBPACK_IMPORTED_MODULE_1__.setTrackColor)(trackId, "black", colorString)
	})

	_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(btnGrp, [
		hideButton,
		muteButton,
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.getDivider(),
		requireToPlayAlongButton,
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.getDivider(),
		colorPickerWhite,
		colorPickerBlack
	])

	_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(clickableTitleDiv, [trackName, instrumentName])
	_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(trackDiv, [
		clickableTitleDiv,
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.getDivider(),
		volumeSlider,
		btnGrp
	])

	return trackDiv
}


/***/ }),

/***/ "./js/ui/UI.js":
/*!*********************!*\
  !*** ./js/ui/UI.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UI: () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomHelper.js */ "./js/ui/DomHelper.js");
/* harmony import */ var _settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../settings/Settings.js */ "./js/settings/Settings.js");
/* harmony import */ var _ZoomUI_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ZoomUI.js */ "./js/ui/ZoomUI.js");
/* harmony import */ var _TrackUI_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TrackUI.js */ "./js/ui/TrackUI.js");
/* harmony import */ var _player_Player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../player/Player.js */ "./js/player/Player.js");
/* harmony import */ var _SongUI_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SongUI.js */ "./js/ui/SongUI.js");
/* harmony import */ var _MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MidiInputHandler.js */ "./js/MidiInputHandler.js");
/* harmony import */ var _recording_midi_recorder_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../recording/midi-recorder.js */ "./js/recording/midi-recorder.js");









/**
 * Contains all initiation, appending and manipulation of DOM-elements.
 * Callback-bindings for some events are created in  the constructor
 */
class UI {
	constructor(render, isMobile) {
		this.isMobile = window.matchMedia(
			"only screen and (max-width: 1600px)"
		).matches

		this.midiRecrder = new _recording_midi_recorder_js__WEBPACK_IMPORTED_MODULE_7__["default"]()

		this.songUI = new _SongUI_js__WEBPACK_IMPORTED_MODULE_5__.SongUI()
		//add callbacks to the player
		;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().newSongCallbacks.push(this.newSongCallback.bind(this))

		document.body.addEventListener("mousemove", this.mouseMoved.bind(this))

		this.createControlMenu()

		this.menuHeight = 200

		document
			.querySelectorAll(".innerMenuDiv")
			.forEach(
				el =>
				(el.style.height =
					"calc(100% - " + (this.getNavBar().clientHeight + 24) + "px)")
			)

		document.body.appendChild(new _ZoomUI_js__WEBPACK_IMPORTED_MODULE_2__.ZoomUI().getContentDiv(render))
	}

	setExampleSongs(exampleSongsJson) {
		this.songUI.setExampleSongs(exampleSongsJson)
	}

	fireInitialListeners() {
		this.onMenuHeightChange(this.getNavBar().clientHeight)
		window.setTimeout(
			() => this.onMenuHeightChange(this.getNavBar().clientHeight),
			500
		)
	}

	mouseMoved() {
		this.getMinimizeButton().style.opacity = 1
		if (!this.fadingOutMinimizeButton) {
			this.fadingOutMinimizeButton = true
			window.setTimeout(() => {
				this.getMinimizeButton().style.opacity = 0
				this.fadingOutMinimizeButton = false
			}, 1000)
		}
	}
	createControlMenu() {
		let topGroupsContainer = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass("container")

		let fileGrp = this.getFileButtonGroup()
		let songSpeedGrp = this.getSpeedButtonGroup()
		let songControlGrp = this.getSongControlButtonGroup()
		let volumeGrp = this.getVolumneButtonGroup()
		let settingsGrpRight = this.getSettingsButtonGroup()
		let trackGrp = this.getTracksButtonGroup()

		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElements("align-middle", [
			fileGrp,
			songSpeedGrp,
			songControlGrp,
			volumeGrp,
			trackGrp
		])

		let leftTop = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createElementWithClass("topContainer")
		let middleTop = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createElementWithClass("topContainer")
		let rightTop = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createElementWithClass("topContainer")

		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(leftTop, [fileGrp, trackGrp])
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(middleTop, [songControlGrp])
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(rightTop, [
			songSpeedGrp,
			volumeGrp,
			settingsGrpRight
		])

		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(topGroupsContainer, [leftTop, middleTop, rightTop])
		this.getNavBar().appendChild(topGroupsContainer)

		let minimizeButton = this.getMinimizeButton()

		let innerMenuDivsContainer = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createElementWithClass(
			"innerMenuDivsContainer"
		)
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(innerMenuDivsContainer, [
			this.getTrackMenuDiv(),
			this.getLoadedSongsDiv(),
			this.getSettingsDiv()
		])

		document.body.appendChild(minimizeButton)
		document.body.appendChild(this.getNavBar())
		document.body.appendChild(innerMenuDivsContainer)

		this.createFileDragArea()
	}

	getMinimizeButton() {
		if (!this.minimizeButton) {
			this.minimizeButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"minimizeMenu",
				"chevron-up",
				() => {
					if (!this.navMinimized) {
						this.getNavBar().style.marginTop =
							"-" + this.getNavBar().clientHeight + "px"
						this.navMinimized = true
						this.minimizeButton
							.querySelector("span")
							.classList.remove("glyphicon-chevron-up")
						this.minimizeButton
							.querySelector("span")
							.classList.add("glyphicon-chevron-down")
						this.onMenuHeightChange(0)
					} else {
						this.getNavBar().style.marginTop = "0px"
						this.navMinimized = false

						this.minimizeButton
							.querySelector("span")
							.classList.add("glyphicon-chevron-up")
						this.minimizeButton
							.querySelector("span")
							.classList.remove("glyphicon-chevron-down")
						this.onMenuHeightChange(this.getNavBar().clientHeight)
					}
				}
			)
			this.minimizeButton.style.padding = "0px"
			this.minimizeButton.style.fontSize = "0.5em"
		}
		let navbarHeight = this.navMinimized ? 0 : this.getNavBar().clientHeight
		this.minimizeButton.style.top = navbarHeight + 23 + "px"
		return this.minimizeButton
	}

	getSettingsButtonGroup() {
		let settingsGrpRight = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createButtonGroup(true)
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(settingsGrpRight, [
			this.getFullscreenButton(),
			this.getSettingsButton()
		])
		return settingsGrpRight
	}
	setOnMenuHeightChange(func) {
		this.onMenuHeightChange = func
	}

	getTracksButtonGroup() {
		let trackGrp = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createButtonGroup(true)
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(trackGrp, [
			this.getTracksButton(),
			this.getMidiSetupButton()
			// this.getChannelsButton()
		])
		return trackGrp
	}

	getVolumneButtonGroup() {
		let volumeGrp = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createButtonGroup(true)
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(volumeGrp, [
			this.getMainVolumeSlider().container,
			this.getMuteButton()
		])
		return volumeGrp
	}

	getSongControlButtonGroup() {
		let songControlGrp = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createButtonGroup(false)
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(songControlGrp, [
			this.getPlayButton(),
			this.getPauseButton(),
			this.getStopButton(),
			this.getRecordButton()
		])
		return songControlGrp
	}

	getSpeedButtonGroup() {
		let songSpeedGrp = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createButtonGroup(true)
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(songSpeedGrp, [this.getSpeedDiv()])
		return songSpeedGrp
	}

	getFileButtonGroup() {
		let fileGrp = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createButtonGroup(true)
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(fileGrp, [
			this.getLoadSongButton(),
			this.getLoadedSongsButton()
		])
		return fileGrp
	}

	getNavBar() {
		if (!this.navBar) {
			this.navBar = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createElement(
				"nav",
				{},
				{
					className: "navbar navbar-wrapper"
				}
			)
		}
		return this.navBar
	}
	getSettingsButton() {
		if (!this.settingsButton) {
			this.settingsButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"settingsButton",
				"cog",
				() => {
					if (this.settingsShown) {
						this.hideSettings()
					} else {
						this.showSettings()
					}
				}
			)
		}
		return this.settingsButton
	}
	hideDiv(div) {
		div.classList.add("hidden")
		div.classList.remove("unhidden")
	}
	showDiv(div) {
		div.classList.remove("hidden")
		div.classList.add("unhidden")
	}
	hideSettings() {
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.getSettingsButton())
		this.settingsShown = false
		this.hideDiv(this.getSettingsDiv())
	}
	showSettings() {
		this.hideAllDialogs()
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", this.getSettingsButton())
		this.settingsShown = true
		this.showDiv(this.getSettingsDiv())
	}
	getSettingsDiv() {
		if (!this.settingsDiv) {
			this.settingsDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithIdAndClass(
				"settingsDiv",
				"innerMenuDiv"
			)
			this.hideDiv(this.settingsDiv)
			this.settingsDiv.appendChild(this.getSettingsContent())
		}
		return this.settingsDiv
	}
	getSettingsContent() {
		return (0,_settings_Settings_js__WEBPACK_IMPORTED_MODULE_1__.getSettingsDiv)()
	}
	getFullscreenButton() {
		if (!this.fullscreenButton) {
			this.fullscreen = false
			let clickFullscreen = () => {
				if (!this.fullscreen) {
					document.body.requestFullscreen()
				} else {
					document.exitFullscreen()
				}
			}
			this.fullscreenButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"fullscreenButton",
				"fullscreen",
				clickFullscreen.bind(this)
			)
			let fullscreenSwitch = () => (this.fullscreen = !this.fullscreen)
			document.body.onfullscreenchange = fullscreenSwitch.bind(this)
		}
		return this.fullscreenButton
	}
	getLoadSongButton() {
		if (!this.loadSongButton) {
			this.loadSongButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createFileInput(
				"Upload Midi",
				this.handleFileSelect.bind(this)
			)
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("floatSpanLeft", this.loadSongButton)
		}
		return this.loadSongButton
	}
	getLoadedSongsButton() {
		if (!this.loadedSongsButton) {
			this.loadedSongsButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconTextButton(
				"mute",
				"music",
				"Loaded Songs",
				ev => {
					if (this.loadedSongsShown) {
						this.hideLoadedSongsDiv()
					} else {
						this.showLoadedSongsDiv()
					}
				}
			)
		}
		return this.loadedSongsButton
	}
	showLoadedSongsDiv() {
		this.hideAllDialogs()
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", this.loadedSongsButton)
		this.loadedSongsShown = true
		this.showDiv(this.getLoadedSongsDiv())
	}

	hideLoadedSongsDiv() {
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.loadedSongsButton)
		this.loadedSongsShown = false
		this.hideDiv(this.getLoadedSongsDiv())
	}

	getLoadedSongsDiv() {
		if (!this.loadedSongsDiv) {
			this.loadedSongsDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass("innerMenuDiv")
			this.loadedSongsDiv.appendChild(this.songUI.getDivContent())
			this.hideDiv(this.loadedSongsDiv)
		}
		return this.loadedSongsDiv
	}

	createFileDragArea() {
		let dragArea = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createElement(
			"div",
			{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 10000,
				visibility: "hidden",
				opacity: "0",
				backgroundColor: "rgba(0,0,0,0.2)",
				transition: "all 0.2s ease-out"
			},
			{
				draggable: "true"
			}
		)

		let dragAreaText = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass(
			"centeredBigText",
			{
				marginTop: "25%",
				fontSize: "35px",
				color: "rgba(225,225,225,0.8)"
			},
			{ innerHTML: "Drop Midi File anywhere!" }
		)
		dragArea.appendChild(dragAreaText)

		dragArea.ondrop = ev => {
			dragArea.style.backgroundColor = "rgba(0,0,0,0)"
			this.handleDragDropFileSelect(ev)
		}
		let lastTarget
		window.ondragenter = ev => {
			ev.preventDefault()
			lastTarget = ev.target
			dragArea.style.visibility = ""
			dragArea.style.opacity = "1"
		}
		window.ondragleave = ev => {
			if (ev.target === lastTarget || ev.target === document) {
				dragArea.style.visibility = "hidden"
				dragArea.style.opacity = "0"
			}
		}
		window.ondragover = ev => ev.preventDefault()
		window.ondrop = ev => {
			ev.preventDefault()
			dragArea.style.visibility = "hidden"
			dragArea.style.opacity = "0"
			this.handleDragDropFileSelect(ev)
		}
		document.body.appendChild(dragArea)
	}
	handleDragOverFile(ev) {
		this.createFileDragArea().style
	}
	handleDragDropFileSelect(ev) {
		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			if (ev.dataTransfer.items.length > 0) {
				if (ev.dataTransfer.items[0].kind === "file") {
					var file = ev.dataTransfer.items[0].getAsFile()
					this.readFile(file)
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			if (ev.dataTransfer.files.length > 0) {
				var file = ev.dataTransfer.files[0]
				this.readFile(file)
			}
		}
	}
	handleFileSelect(evt) {
		var files = evt.target.files
		for (var i = 0, f; (f = files[i]); i++) {
			this.readFile(f)
		}
	}
	readFile(file) {
		let reader = new FileReader()
		let fileName = file.name
		reader.onload = function (theFile) {
			;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().loadSong(reader.result, fileName)
		}.bind(this)
		reader.readAsDataURL(file)
	}

	getSpeedDiv() {
		if (!this.speedDiv) {
			this.speedDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass(
				"btn-group btn-group-vertical"
			)
			this.speedDiv.appendChild(this.getSpeedUpButton())
			this.speedDiv.appendChild(this.getSpeedDisplayField())
			this.speedDiv.appendChild(this.getSpeedDownButton())
		}
		return this.speedDiv
	}
	getSpeedUpButton() {
		if (!this.speedUpButton) {
			this.speedUpButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"speedUp",
				"triangle-top",
				ev => {
					(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().increaseSpeed(0.05)
					this.updateSpeed()
				}
			)
			this.speedUpButton.className += " btn-xs forcedThinButton"
		}
		return this.speedUpButton
	}
	updateSpeed() {
		this.getSpeedDisplayField().value =
			Math.round((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().playbackSpeed * 100) + "%"
	}
	getSpeedDisplayField() {
		if (!this.speedDisplay) {
			this.speedDisplay = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createTextInput(
				ev => {
					let newVal = Math.max(1, Math.min(1000, parseInt(ev.target.value)))
					if (!isNaN(newVal)) {
						ev.target.value = newVal + "%"
						;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().playbackSpeed = newVal / 100
					}
				},
				{
					float: "none",
					textAlign: "center"
				},
				{
					value: Math.floor((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().playbackSpeed * 100) + "%",
					className: "forcedThinButton",
					type: "text"
				}
			)
		}
		return this.speedDisplay
	}
	getSpeedDownButton() {
		if (!this.speedDownButton) {
			this.speedDownButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"speedUp",
				"triangle-bottom",
				ev => {
					(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().increaseSpeed(-0.05)
					this.updateSpeed()
				}
			)
			this.speedDownButton.className += " btn-xs forcedThinButton"
		}
		return this.speedDownButton
	}
	getTracksButton() {
		if (!this.tracksButton) {
			this.tracksButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconTextButton(
				"tracks",
				"align-justify",
				"Tracks",
				ev => {
					if (this.tracksShown) {
						this.hideTracks()
					} else {
						this.showTracks()
					}
				}
			)
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("floatSpanLeft", this.tracksButton)
		}
		return this.tracksButton
	}
	hideTracks() {
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.tracksButton)
		this.tracksShown = false
		this.hideDiv(this.getTrackMenuDiv())
	}

	showTracks() {
		this.hideAllDialogs()
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", this.tracksButton)
		this.tracksShown = true
		//instrument of a track could theoretically change during the song.
		document
			.querySelectorAll(".instrumentName")
			.forEach(
				el =>
				(el.innerHTML = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().getCurrentTrackInstrument(
					el.id.split("instrumentName")[1]
				))
			)
		this.showDiv(this.getTrackMenuDiv())
	}

	getMidiSetupButton() {
		if (!this.midiSetupButton) {
			this.midiSetupButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconTextButton(
				"midiSetup",
				"tower",
				"Midi-Setup",
				ev => {
					if (this.midiSetupDialogShown) {
						this.hideMidiSetupDialog()
					} else {
						this.showMidiSetupDialog()
					}
				}
			)
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("floatSpanLeft", this.midiSetupButton)
		}
		return this.midiSetupButton
	}
	hideMidiSetupDialog() {
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.midiSetupButton)
		this.midiSetupDialogShown = false
		this.hideDiv(this.getMidiSetupDialog())
	}

	showMidiSetupDialog() {
		this.hideAllDialogs()
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", this.midiSetupButton)
		this.midiSetupDialogShown = true

		this.showDiv(this.getMidiSetupDialog())
	}
	getChannelsButton() {
		if (!this.channelsButton) {
			let channelMenuDiv = this.getChannelMenuDiv()
			this.channelsButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconTextButton(
				"channels",
				"align-justify",
				"Channels",
				ev => {
					if (this.channelsShown) {
						this.hideChannels(channelMenuDiv)
					} else {
						this.showChannels(channelMenuDiv)
					}
				}
			)
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("floatSpanLeft", this.channelsButton)

			//Todo. decide what channel info to show...
			this.channelsButton.style.opacity = 0
		}
		return this.channelsButton
	}
	getChannelMenuDiv() {
		if (!this.channelMenuDiv) {
			this.channelMenuDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithId("trackContainerDiv")
			this.channelMenuDiv.style.display = "none"
			this.channelMenuDiv.style.top = this.getNavBar().style.height
			document.body.appendChild(this.channelMenuDiv)
		}
		return this.channelMenuDiv
	}
	showChannels(channelMenuDiv) {
		if (this.tracksShown) {
			this.hideTracks()
		}
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", this.tracksButton)
		this.channelsShown = true
		channelMenuDiv.style.display = "block"
	}

	hideChannels(channelMenuDiv) {
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.tracksButton)
		this.channelsShown = false
		channelMenuDiv.style.display = "none"
	}
	hideAllDialogs() {
		// this.hideChannels()
		this.hideMidiSetupDialog()
		this.hideSettings()
		this.hideLoadedSongsDiv()
		this.hideTracks()
		this.hideLoadedSongsDiv()
	}

	getMainVolumeSlider() {
		if (!this.mainVolumeSlider) {
			this.mainVolumeSlider = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createSliderWithLabel(
				"volumeMain",
				"Master Volume",
				(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().volume,
				0,
				100,
				1,
				ev => {
					if ((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().volume == 0 && parseInt(ev.target.value) != 0) {
						_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.replaceGlyph(
							this.getMuteButton(),
							"volume-off",
							"volume-up"
						)
						//this.getMuteButton().firstChild.className = this.muteButton.firstChild.className.replace('volume-off', 'volume-up')
					}
					(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().volume = parseInt(ev.target.value)
					if ((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().volume <= 0) {
						_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.replaceGlyph(
							this.getMuteButton(),
							"volume-up",
							"volume-off"
						)
					} else if (this.getMuteButton().innerHTML == "Unmute") {
						_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.replaceGlyph(
							this.getMuteButton(),
							"volume-off",
							"volume-up"
						)
					}
				}
			)
		}
		return this.mainVolumeSlider
	}
	getMuteButton() {
		if (!this.muteButton) {
			this.muteButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"mute",
				"volume-up",
				ev => {
					if ((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().muted) {
						(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().muted = false
						if (!isNaN((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().mutedAtVolume)) {
							if ((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().mutedAtVolume == 0) {
								(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().mutedAtVolume = 100
							}
							this.getMainVolumeSlider().slider.value = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().mutedAtVolume
							;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().volume = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().mutedAtVolume
						}
						_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.replaceGlyph(this.muteButton, "volume-off", "volume-up")
					} else {
						(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().mutedAtVolume = (0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().volume
						;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().muted = true
						;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().volume = 0
						this.getMainVolumeSlider().slider.value = 0
						_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.replaceGlyph(this.muteButton, "volume-up", "volume-off")
					}
				}
			)
		}
		return this.muteButton
	}
	getPlayButton() {
		if (!this.playButton) {
			this.playButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"play",
				"play",
				this.clickPlay.bind(this)
			)
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("btn-lg", this.playButton)
		}
		return this.playButton
	}
	clickPlay(ev) {
		if ((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().song) {
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.getPauseButton())
			;(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().startPlay()
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", this.playButton)
		}
	}
	getPauseButton() {
		if (!this.pauseButton) {
			this.pauseButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"pause",
				"pause",
				this.clickPause.bind(this)
			)
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("btn-lg", this.pauseButton)
		}
		return this.pauseButton
	}
	clickPause(ev) {
		(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().pause()
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.getPlayButton())

		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", this.pauseButton)
	}

	getStopButton() {
		if (!this.stopButton) {
			this.stopButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"stop",
				"stop",
				this.clickStop.bind(this)
			)

			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("btn-lg", this.stopButton)
		}
		return this.stopButton
	}
	clickStop(ev) {
		(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().stop()
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.getPlayButton())
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.getPauseButton())
	}
	getRecordButton() {
		if (!this.recordButton) {
			this.recordButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconButton(
				"record",
				"record",
				this.clickRecord.bind(this)
			);
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("btn-lg", this.recordButton);
		}
		return this.recordButton;
	}
	getRecordingDialog() {
		if (!this.recordingDialog) {
			this.recordingDialog = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithIdAndClass(
				"recordingDialog",
				"centeredMenuDiv"
			);
			this.hideDiv(this.recordingDialog);
			document.body.appendChild(this.recordingDialog);

			let text = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass(
				"centeredBigText",
				{ marginTop: "25px" },
				{ innerHTML: "Recording Controls:" }
			);
			this.recordingDialog.appendChild(text);

			let recordingControls = this.getRecordingControls.bind(this)();
			recordingControls.forEach(control => {
				this.recordingDialog.appendChild(control);
			});

		}
		this.recordingDialog.style.marginTop =
			this.getNavBar().clientHeight + 25 + "px";
		return this.recordingDialog;
	}

	clickRecord(ev) {
		if (this.recordingDialogShown) {
			this.hideDiv(this.getRecordingDialog());
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", this.recordButton)
			this.recordingDialogShown = false;
		} else {
			this.showDiv(this.getRecordingDialog());
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", this.recordButton)
			this.recordingDialogShown = true;
		}
	}

	resetTrackMenuDiv() {
		let menuDiv = this.getTrackMenuDiv()
		menuDiv.innerHTML = ""
		_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.appendChildren(menuDiv, (0,_TrackUI_js__WEBPACK_IMPORTED_MODULE_3__.createTrackDivs)())
	}
	newSongCallback() {
		this.resetTrackMenuDiv()
		this.clickStop()
		this.songUI.newSongCallback((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getCurrentSong)())
	}

	getMidiSetupDialog() {
		if (!this.midiSetupDialog) {
			this.midiSetupDialog = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithIdAndClass(
				"midiSetupDialog",
				"centeredMenuDiv"
			)
			this.hideDiv(this.midiSetupDialog)
			document.body.appendChild(this.midiSetupDialog)

			let text = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass(
				"centeredBigText",
				{ marginTop: "25px" },
				{ innerHTML: "Choose Midi device:" }
			)
			this.midiSetupDialog.appendChild(text)

			this.inputDevicesDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass("halfContainer")
			this.outputDevicesDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass("halfContainer")
			this.midiSetupDialog.appendChild(this.inputDevicesDiv)
			this.midiSetupDialog.appendChild(this.outputDevicesDiv)
		}
		let inputDevices = (0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().getAvailableInputDevices()
		if (inputDevices.length == 0) {
			this.inputDevicesDiv.innerHTML = "No MIDI input-devices found."
		} else {
			this.inputDevicesDiv.innerHTML = ""
			let inputTitle = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createElementWithClass("row", "span")
			inputTitle.innerHTML = "Input: "
			this.inputDevicesDiv.appendChild(inputTitle)
			inputDevices.forEach(device => {
				this.inputDevicesDiv.appendChild(this.createDeviceDiv(device))
			})
		}

		let outputDevices = (0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().getAvailableOutputDevices()
		if (outputDevices.length == 0) {
			this.outputDevicesDiv.innerHTML = "No MIDI output-devices found."
		} else {
			this.outputDevicesDiv.innerHTML = ""
			let outputTitle = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithClass("row")
			outputTitle.innerHTML = "Output: "
			this.outputDevicesDiv.appendChild(outputTitle)
			outputDevices.forEach(device => {
				this.outputDevicesDiv.appendChild(this.createOutputDeviceDiv(device))
			})
		}
		this.midiSetupDialog.style.marginTop =
			this.getNavBar().clientHeight + 25 + "px"
		return this.midiSetupDialog
	}
	createDeviceDiv(device) {
		let deviceDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createTextButton(
			"midiInDeviceDiv" + device.id,
			device.name,
			() => {
				if (deviceDiv.classList.contains("selected")) {
					_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", deviceDiv)
					;(0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().clearInput(device)
				} else {
					_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", deviceDiv)
					;(0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().addInput(device)
				}
			}
		)
		if ((0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().isDeviceActive(device)) {
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", deviceDiv)
		}

		return deviceDiv
	}
	createOutputDeviceDiv(device) {
		let deviceDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createTextButton(
			"midiOutDeviceDiv" + device.id,
			device.name,
			() => {
				if (deviceDiv.classList.contains("selected")) {
					_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.removeClass("selected", deviceDiv)
					;(0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().clearOutput(device)
				} else {
					_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", deviceDiv)
					;(0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().addOutput(device)
				}
			}
		)
		if ((0,_MidiInputHandler_js__WEBPACK_IMPORTED_MODULE_6__.getMidiHandler)().isOutputDeviceActive(device)) {
			document
				.querySelectorAll(".midiOutDeviceDiv")
				.forEach(el =>
					el.classList.contains("selected")
						? el.classList.remove("selected")
						: null
				)
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.addClassToElement("selected", deviceDiv)
		}
		deviceDiv.classList.add("midiOutDeviceDiv")

		return deviceDiv
	}
	getTrackMenuDiv() {
		if (!this.trackMenuDiv) {
			this.trackMenuDiv = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createDivWithIdAndClass(
				"trackContainerDiv",
				"innerMenuDiv"
			)
			this.hideDiv(this.trackMenuDiv)
		}
		return this.trackMenuDiv
	}

	getRecordingControls() {
		let startRecordingButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconTextButton(
			"startRecording",
			"record",
			"Start Recording",
			this.startRecording.bind(this)
		);
		startRecordingButton.classList.add("recordingControl");

		let pauseRecordingButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconTextButton(
			"pauseRecording",
			"pause",
			"Pause Recording",
			this.pauseRecording.bind(this)
		);
		pauseRecordingButton.classList.add("recordingControl");
		let clearRecordingButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconTextButton(
			"clearRecording",
			"remove",
			"Clear Recording",
			this.clearRecording.bind(this)
		);
		clearRecordingButton.classList.add("recordingControl");

		let saveRecordingButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_0__.DomHelper.createGlyphiconTextButton(
			"saveRecording",
			"save",
			"Save Recording",
			this.saveRecording.bind(this)
		);
		saveRecordingButton.classList.add("recordingControl");

		return [startRecordingButton, pauseRecordingButton, clearRecordingButton, saveRecordingButton];
	}

	startRecording() {
		this.midiRecrder.startRecording();
	}

	pauseRecording() {
		this.midiRecrder.pauseRecording();
	}

	clearRecording() {
		this.midiRecrder.clearRecording();
	}

	async saveRecording() {
		let filename = await this.midiRecrder.saveRecording();
		(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_4__.getPlayer)().loadFromRecording(filename);
	}

}


/***/ }),

/***/ "./js/ui/ZoomUI.js":
/*!*************************!*\
  !*** ./js/ui/ZoomUI.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZoomUI: () => (/* binding */ ZoomUI)
/* harmony export */ });
/* harmony import */ var _player_Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player/Player.js */ "./js/player/Player.js");
/* harmony import */ var _DomHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DomHelper.js */ "./js/ui/DomHelper.js");



class ZoomUI {
	constructor() {}
	getContentDiv(render) {
		let cont = _DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createDivWithClass("zoomGroup btn-group")
		//zoomIn
		cont.appendChild(
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createGlyphiconButton("zoomInButton", "zoom-in", () =>
				render.renderDimensions.zoomIn()
			)
		)

		//zoomOut
		cont.appendChild(
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createGlyphiconButton("zoomOutButton", "zoom-out", () =>
				render.renderDimensions.zoomOut()
			)
		)
		//moveLeft
		cont.appendChild(
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createGlyphiconButton("moveViewLeftButton", "arrow-left", () =>
				render.renderDimensions.moveViewLeft()
			)
		)

		//moveRight
		cont.appendChild(
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createGlyphiconButton("moveViewLeftButton", "arrow-right", () =>
				render.renderDimensions.moveViewRight()
			)
		)
		const fitSongButton = _DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createTextButton(
			"fitSongButton",
			"Fit Song",
			() => render.renderDimensions.fitSong((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_0__.getPlayer)().song.getNoteRange())
		)
		fitSongButton.style.float = "none"
		//FitSong
		cont.appendChild(fitSongButton)
		//ShowAll
		cont.appendChild(
			_DomHelper_js__WEBPACK_IMPORTED_MODULE_1__.DomHelper.createTextButton("showAllButton", "Show All", () =>
				render.renderDimensions.showAll()
			)
		)
		return cont
	}
}


/***/ }),

/***/ "./node_modules/localforage/dist/localforage.js":
/*!******************************************************!*\
  !*** ./node_modules/localforage/dist/localforage.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=undefined;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=undefined;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            var db = openreq.result;
            db.onversionchange = function (e) {
                // Triggered when the database is modified (e.g. adding an objectStore) or
                // deleted (even when initiated by other sessions in different tabs).
                // Closing the connection here prevents those operations from being blocked.
                // If the database is accessed again later by this instance, the connection
                // will be reopened or the database recreated as needed.
                e.target.close();
            };
            resolve(db);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(req.error);
                    };

                    req.onblocked = function () {
                        // Closing all open connections in onversionchange handler should prevent this situation, but if
                        // we do get here, it just means the request remains pending - eventually it will succeed or error
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});


/***/ }),

/***/ "./node_modules/midi-writer-js/build/index.js":
/*!****************************************************!*\
  !*** ./node_modules/midi-writer-js/build/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var tonalMidi = __webpack_require__(/*! tonal-midi */ "./node_modules/tonal-midi/index.js");

/**
 * MIDI file format constants.
 * @return {Constants}
 */
var Constants = {
  VERSION: '2.1.4',
  HEADER_CHUNK_TYPE: [0x4d, 0x54, 0x68, 0x64],
  // Mthd
  HEADER_CHUNK_LENGTH: [0x00, 0x00, 0x00, 0x06],
  // Header size for SMF
  HEADER_CHUNK_FORMAT0: [0x00, 0x00],
  // Midi Type 0 id
  HEADER_CHUNK_FORMAT1: [0x00, 0x01],
  // Midi Type 1 id
  HEADER_CHUNK_DIVISION: [0x00, 0x80],
  // Defaults to 128 ticks per beat
  TRACK_CHUNK_TYPE: [0x4d, 0x54, 0x72, 0x6b],
  // MTrk,
  META_EVENT_ID: 0xFF,
  META_TEXT_ID: 0x01,
  META_COPYRIGHT_ID: 0x02,
  META_TRACK_NAME_ID: 0x03,
  META_INSTRUMENT_NAME_ID: 0x04,
  META_LYRIC_ID: 0x05,
  META_MARKER_ID: 0x06,
  META_CUE_POINT: 0x07,
  META_TEMPO_ID: 0x51,
  META_SMTPE_OFFSET: 0x54,
  META_TIME_SIGNATURE_ID: 0x58,
  META_KEY_SIGNATURE_ID: 0x59,
  META_END_OF_TRACK_ID: [0x2F, 0x00],
  CONTROLLER_CHANGE_STATUS: 0xB0,
  // includes channel number (0)
  PITCH_BEND_STATUS: 0xE0 // includes channel number (0)

};

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _wrapRegExp() {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, void 0, groups);
  };

  var _super = RegExp.prototype,
      _groups = new WeakMap();

  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);

    return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
  }

  function buildGroups(result, re) {
    var g = _groups.get(re);

    return Object.keys(g).reduce(function (groups, name) {
      return groups[name] = result[g[name]], groups;
    }, Object.create(null));
  }

  return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);

    return result && (result.groups = buildGroups(result, this)), result;
  }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if ("string" == typeof substitution) {
      var groups = _groups.get(this);

      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    }

    if ("function" == typeof substitution) {
      var _this = this;

      return _super[Symbol.replace].call(this, str, function () {
        var args = arguments;
        return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
      });
    }

    return _super[Symbol.replace].call(this, str, substitution);
  }, _wrapRegExp.apply(this, arguments);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/**
 * Static utility functions used throughout the library.
 */

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "version",
    value:
    /**
     * Gets MidiWriterJS version number.
     * @return {string}
     */
    function version() {
      return Constants.VERSION;
    }
    /**
     * Convert a string to an array of bytes
     * @param {string} string
     * @return {array}
     */

  }, {
    key: "stringToBytes",
    value: function stringToBytes(string) {
      return string.split('').map(function (_char) {
        return _char.charCodeAt();
      });
    }
    /**
     * Checks if argument is a valid number.
     * @param {*} n - Value to check
     * @return {boolean}
     */

  }, {
    key: "isNumeric",
    value: function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    /**
     * Returns the correct MIDI number for the specified pitch.
     * Uses Tonal Midi - https://github.com/danigb/tonal/tree/master/packages/midi
     * @param {(string|number)} pitch - 'C#4' or midi note code
     * @param {string} middleC
     * @return {number}
     */

  }, {
    key: "getPitch",
    value: function getPitch(pitch) {
      var middleC = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'C4';
      return 60 - tonalMidi.toMidi(middleC) + tonalMidi.toMidi(pitch);
    }
    /**
     * Translates number of ticks to MIDI timestamp format, returning an array of
     * hex strings with the time values. Midi has a very particular time to express time,
     * take a good look at the spec before ever touching this function.
     * Thanks to https://github.com/sergi/jsmidi
     *
     * @param {number} ticks - Number of ticks to be translated
     * @return {array} - Bytes that form the MIDI time value
     */

  }, {
    key: "numberToVariableLength",
    value: function numberToVariableLength(ticks) {
      ticks = Math.round(ticks);
      var buffer = ticks & 0x7F; // eslint-disable-next-line no-cond-assign

      while (ticks = ticks >> 7) {
        buffer <<= 8;
        buffer |= ticks & 0x7F | 0x80;
      }

      var bList = [];

      while (true) {
        bList.push(buffer & 0xff);
        if (buffer & 0x80) buffer >>= 8;else {
          break;
        }
      }

      return bList;
    }
    /**
     * Counts number of bytes in string
     * @param {string} s
     * @return {array}
     */

  }, {
    key: "stringByteCount",
    value: function stringByteCount(s) {
      return encodeURI(s).split(/%..|./).length - 1;
    }
    /**
     * Get an int from an array of bytes.
     * @param {array} bytes
     * @return {number}
     */

  }, {
    key: "numberFromBytes",
    value: function numberFromBytes(bytes) {
      var hex = '';
      var stringResult;
      bytes.forEach(function (_byte) {
        stringResult = _byte.toString(16); // ensure string is 2 chars

        if (stringResult.length == 1) stringResult = "0" + stringResult;
        hex += stringResult;
      });
      return parseInt(hex, 16);
    }
    /**
     * Takes a number and splits it up into an array of bytes.  Can be padded by passing a number to bytesNeeded
     * @param {number} number
     * @param {number} bytesNeeded
     * @return {array} - Array of bytes
     */

  }, {
    key: "numberToBytes",
    value: function numberToBytes(number, bytesNeeded) {
      bytesNeeded = bytesNeeded || 1;
      var hexString = number.toString(16);

      if (hexString.length & 1) {
        // Make sure hex string is even number of chars
        hexString = '0' + hexString;
      } // Split hex string into an array of two char elements


      var hexArray = hexString.match(/.{2}/g); // Now parse them out as integers

      hexArray = hexArray.map(function (item) {
        return parseInt(item, 16);
      }); // Prepend empty bytes if we don't have enough

      if (hexArray.length < bytesNeeded) {
        while (bytesNeeded - hexArray.length > 0) {
          hexArray.unshift(0);
        }
      }

      return hexArray;
    }
    /**
     * Converts value to array if needed.
     * @param {string} value
     * @return {array}
     */

  }, {
    key: "toArray",
    value: function toArray(value) {
      if (Array.isArray(value)) return value;
      return [value];
    }
    /**
     * Converts velocity to value 0-127
     * @param {number} velocity - Velocity value 1-100
     * @return {number}
     */

  }, {
    key: "convertVelocity",
    value: function convertVelocity(velocity) {
      // Max passed value limited to 100
      velocity = velocity > 100 ? 100 : velocity;
      return Math.round(velocity / 100 * 127);
    }
    /**
     * Gets the total number of ticks of a specified duration.
     * Note: type=='note' defaults to quarter note, type==='rest' defaults to 0
     * @param {(string|array)} duration
     * @return {number}
     */

  }, {
    key: "getTickDuration",
    value: function getTickDuration(duration) {
      if (Array.isArray(duration)) {
        // Recursively execute this method for each item in the array and return the sum of tick durations.
        return duration.map(function (value) {
          return Utils.getTickDuration(value);
        }).reduce(function (a, b) {
          return a + b;
        }, 0);
      }

      duration = duration.toString();

      if (duration.toLowerCase().charAt(0) === 't') {
        // If duration starts with 't' then the number that follows is an explicit tick count
        var ticks = parseInt(duration.substring(1));

        if (isNaN(ticks) || ticks < 0) {
          throw new Error(duration + ' is not a valid duration.');
        }

        return ticks;
      } // Need to apply duration here.  Quarter note == Constants.HEADER_CHUNK_DIVISION


      var quarterTicks = Utils.numberFromBytes(Constants.HEADER_CHUNK_DIVISION);
      var tickDuration = quarterTicks * Utils.getDurationMultiplier(duration);
      return Utils.getRoundedIfClose(tickDuration);
    }
    /**
     * Due to rounding errors in JavaScript engines,
     * it's safe to round when we're very close to the actual tick number
     *
     * @static
     * @param {number} tick
     * @return {number}
     */

  }, {
    key: "getRoundedIfClose",
    value: function getRoundedIfClose(tick) {
      var roundedTick = Math.round(tick);
      return Math.abs(roundedTick - tick) < 0.000001 ? roundedTick : tick;
    }
    /**
     * Due to low precision of MIDI,
     * we need to keep track of rounding errors in deltas.
     * This function will calculate the rounding error for a given duration.
     *
     * @static
     * @param {number} tick
     * @return {number}
     */

  }, {
    key: "getPrecisionLoss",
    value: function getPrecisionLoss(tick) {
      var roundedTick = Math.round(tick);
      return roundedTick - tick;
    }
    /**
     * Gets what to multiple ticks/quarter note by to get the specified duration.
     * Note: type=='note' defaults to quarter note, type==='rest' defaults to 0
     * @param {string} duration
     * @return {number}
     */

  }, {
    key: "getDurationMultiplier",
    value: function getDurationMultiplier(duration) {
      // Need to apply duration here.
      // Quarter note == Constants.HEADER_CHUNK_DIVISION ticks.
      if (duration === '0') return 0;
      var match = duration.match( /*#__PURE__*/_wrapRegExp(/^(d+)?(\d+)(?:t(\d*))?/, {
        dotted: 1,
        base: 2,
        tuplet: 3
      }));

      if (match) {
        var base = Number(match.groups.base); // 1 or any power of two:

        var isValidBase = base === 1 || (base & base - 1) === 0;

        if (isValidBase) {
          // how much faster or slower is this note compared to a quarter?
          var ratio = base / 4;
          var durationInQuarters = 1 / ratio;
          var _match$groups = match.groups,
              dotted = _match$groups.dotted,
              tuplet = _match$groups.tuplet;

          if (dotted) {
            var thisManyDots = dotted.length;
            var divisor = Math.pow(2, thisManyDots);
            durationInQuarters = durationInQuarters + durationInQuarters * ((divisor - 1) / divisor);
          }

          if (typeof tuplet === 'string') {
            var fitInto = durationInQuarters * 2; // default to triplet:

            var thisManyNotes = Number(tuplet || '3');
            durationInQuarters = fitInto / thisManyNotes;
          }

          return durationInQuarters;
        }
      }

      throw new Error(duration + ' is not a valid duration.');
    }
  }]);

  return Utils;
}();

/**
 * Holds all data for a "controller change" MIDI event
 * @param {object} fields {controllerNumber: integer, controllerValue: integer, delta: integer}
 * @return {ControllerChangeEvent}
 */

var ControllerChangeEvent = /*#__PURE__*/_createClass(function ControllerChangeEvent(fields) {
  _classCallCheck(this, ControllerChangeEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'controller'; // delta time defaults to 0.

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.CONTROLLER_CHANGE_STATUS, fields.controllerNumber, fields.controllerValue);
});

/**
 * Object representation of a cue point meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {CuePointEvent}
 */

var CuePointEvent = /*#__PURE__*/_createClass(function CuePointEvent(fields) {
  _classCallCheck(this, CuePointEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'cue-point';
  var textBytes = Utils.stringToBytes(fields.text); // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_CUE_POINT, Utils.numberToVariableLength(textBytes.length), // Size
  textBytes // Text
  );
});

/**
 * Object representation of a end track meta event.
 * @param {object} fields {delta: integer}
 * @return {EndTrackEvent}
 */

var EndTrackEvent = /*#__PURE__*/_createClass(function EndTrackEvent(fields) {
  _classCallCheck(this, EndTrackEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'end-track'; // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_END_OF_TRACK_ID);
});

/**
 * Object representation of an instrument name meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {InstrumentNameEvent}
 */

var InstrumentNameEvent = /*#__PURE__*/_createClass(function InstrumentNameEvent(fields) {
  _classCallCheck(this, InstrumentNameEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'instrument-name';
  var textBytes = Utils.stringToBytes(fields.text); // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_INSTRUMENT_NAME_ID, Utils.numberToVariableLength(textBytes.length), // Size
  textBytes // Instrument name
  );
});

/**
 * Object representation of a key signature meta event.
 * @return {KeySignatureEvent}
 */

var KeySignatureEvent = /*#__PURE__*/_createClass(function KeySignatureEvent(sf, mi) {
  _classCallCheck(this, KeySignatureEvent);

  this.type = 'key-signature';
  var mode = mi || 0;
  sf = sf || 0; //	Function called with string notation

  if (typeof mi === 'undefined') {
    var fifths = [['Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'], ['ab', 'eb', 'bb', 'f', 'c', 'g', 'd', 'a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#']];
    var _sflen = sf.length;
    var note = sf || 'C';
    if (sf[0] === sf[0].toLowerCase()) mode = 1;

    if (_sflen > 1) {
      switch (sf.charAt(_sflen - 1)) {
        case 'm':
          mode = 1;
          note = sf.charAt(0).toLowerCase();
          note = note.concat(sf.substring(1, _sflen - 1));
          break;

        case '-':
          mode = 1;
          note = sf.charAt(0).toLowerCase();
          note = note.concat(sf.substring(1, _sflen - 1));
          break;

        case 'M':
          mode = 0;
          note = sf.charAt(0).toUpperCase();
          note = note.concat(sf.substring(1, _sflen - 1));
          break;

        case '+':
          mode = 0;
          note = sf.charAt(0).toUpperCase();
          note = note.concat(sf.substring(1, _sflen - 1));
          break;
      }
    }

    var fifthindex = fifths[mode].indexOf(note);
    sf = fifthindex === -1 ? 0 : fifthindex - 7;
  } // Start with zero time delta


  this.data = Utils.numberToVariableLength(0x00).concat(Constants.META_EVENT_ID, Constants.META_KEY_SIGNATURE_ID, [0x02], // Size
  Utils.numberToBytes(sf, 1), // Number of sharp or flats ( < 0 flat; > 0 sharp)
  Utils.numberToBytes(mode, 1) // Mode: 0 major, 1 minor
  );
});

/**
 * Object representation of a lyric meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {LyricEvent}
 */

var LyricEvent = /*#__PURE__*/_createClass(function LyricEvent(fields) {
  _classCallCheck(this, LyricEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'lyric';
  var textBytes = Utils.stringToBytes(fields.text); // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_LYRIC_ID, Utils.numberToVariableLength(textBytes.length), // Size
  textBytes // Text
  );
});

/**
 * Object representation of a marker meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {MarkerEvent}
 */

var MarkerEvent = /*#__PURE__*/_createClass(function MarkerEvent(fields) {
  _classCallCheck(this, MarkerEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'marker';
  var textBytes = Utils.stringToBytes(fields.text); // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_MARKER_ID, Utils.numberToVariableLength(textBytes.length), // Size
  textBytes // Text
  );
});

/**
 * Holds all data for a "note on" MIDI event
 * @param {object} fields {data: []}
 * @return {NoteOnEvent}
 */

var NoteOnEvent = /*#__PURE__*/function () {
  function NoteOnEvent(fields) {
    _classCallCheck(this, NoteOnEvent);

    // Set default fields
    fields = Object.assign({
      channel: 1,
      startTick: null,
      velocity: 50,
      wait: 0
    }, fields);
    this.type = 'note-on';
    this.channel = fields.channel;
    this.pitch = fields.pitch;
    this.wait = fields.wait;
    this.velocity = fields.velocity;
    this.startTick = fields.startTick;
    this.tick = null;
    this.delta = null;
    this.data = fields.data;
  }
  /**
   * Builds int array for this event.
   * @param {Track} track - parent track
   * @return {NoteOnEvent}
   */


  _createClass(NoteOnEvent, [{
    key: "buildData",
    value: function buildData(track, precisionDelta) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.data = []; // Explicitly defined startTick event

      if (this.startTick) {
        this.tick = Utils.getRoundedIfClose(this.startTick); // If this is the first event in the track then use event's starting tick as delta.

        if (track.tickPointer == 0) {
          this.delta = this.tick;
        }
      } else {
        this.delta = Utils.getTickDuration(this.wait);
        this.tick = Utils.getRoundedIfClose(track.tickPointer + this.delta);
      }

      this.deltaWithPrecisionCorrection = Utils.getRoundedIfClose(this.delta - precisionDelta);
      this.data = Utils.numberToVariableLength(this.deltaWithPrecisionCorrection).concat(this.getStatusByte(), Utils.getPitch(this.pitch, options.middleC), Utils.convertVelocity(this.velocity));
      return this;
    }
    /**
     * Gets the note on status code based on the selected channel. 0x9{0-F}
     * Note on at channel 0 is 0x90 (144)
     * 0 = Ch 1
     * @return {number}
     */

  }, {
    key: "getStatusByte",
    value: function getStatusByte() {
      return 144 + this.channel - 1;
    }
  }]);

  return NoteOnEvent;
}();

/**
 * Holds all data for a "note off" MIDI event
 * @param {object} fields {data: []}
 * @return {NoteOffEvent}
 */

var NoteOffEvent = /*#__PURE__*/function () {
  function NoteOffEvent(fields) {
    _classCallCheck(this, NoteOffEvent);

    // Set default fields
    fields = Object.assign({
      channel: 1,
      velocity: 50,
      tick: null
    }, fields);
    this.type = 'note-off';
    this.channel = fields.channel;
    this.pitch = fields.pitch;
    this.duration = fields.duration;
    this.velocity = fields.velocity;
    this.tick = fields.tick;
    this.delta = Utils.getTickDuration(this.duration);
    this.data = fields.data;
  }
  /**
   * Builds int array for this event.
   * @param {Track} track - parent track
   * @return {NoteOffEvent}
   */


  _createClass(NoteOffEvent, [{
    key: "buildData",
    value: function buildData(track, precisionDelta) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (this.tick === null) {
        this.tick = Utils.getRoundedIfClose(this.delta + track.tickPointer);
      }

      this.deltaWithPrecisionCorrection = Utils.getRoundedIfClose(this.delta - precisionDelta);
      this.data = Utils.numberToVariableLength(this.deltaWithPrecisionCorrection).concat(this.getStatusByte(), Utils.getPitch(this.pitch, options.middleC), Utils.convertVelocity(this.velocity));
      return this;
    }
    /**
     * Gets the note off status code based on the selected channel. 0x8{0-F}
     * Note off at channel 0 is 0x80 (128)
     * 0 = Ch 1
     * @return {number}
     */

  }, {
    key: "getStatusByte",
    value: function getStatusByte() {
      return 128 + this.channel - 1;
    }
  }]);

  return NoteOffEvent;
}();

/**
 * Wrapper for noteOnEvent/noteOffEvent objects that builds both events.
 * @param {object} fields - {pitch: '[C4]', duration: '4', wait: '4', velocity: 1-100}
 * @return {NoteEvent}
 */

var NoteEvent = /*#__PURE__*/function () {
  function NoteEvent(fields) {
    _classCallCheck(this, NoteEvent);

    // Set default fields
    fields = Object.assign({
      channel: 1,
      repeat: 1,
      sequential: false,
      startTick: null,
      velocity: 50,
      wait: 0
    }, fields);
    this.data = [];
    this.type = 'note';
    this.pitch = Utils.toArray(fields.pitch);
    this.channel = fields.channel;
    this.duration = fields.duration;
    this.grace = fields.grace;
    this.repeat = fields.repeat;
    this.sequential = fields.sequential;
    this.startTick = fields.startTick;
    this.velocity = fields.velocity;
    this.wait = fields.wait;
    this.tickDuration = Utils.getTickDuration(this.duration);
    this.restDuration = Utils.getTickDuration(this.wait);
    this.events = []; // Hold actual NoteOn/NoteOff events
  }
  /**
   * Builds int array for this event.
   * @return {NoteEvent}
   */


  _createClass(NoteEvent, [{
    key: "buildData",
    value: function buildData() {
      var _this = this;

      // Reset data array
      this.data = []; // Apply grace note(s) and subtract ticks (currently 1 tick per grace note) from tickDuration so net value is the same

      if (this.grace) {
        var graceDuration = 1;
        this.grace = Utils.toArray(this.grace);
        this.grace.forEach(function () {
          var noteEvent = new NoteEvent({
            pitch: _this.grace,
            duration: 'T' + graceDuration
          });
          _this.data = _this.data.concat(noteEvent.data);
        });
      } // fields.pitch could be an array of pitches.
      // If so create note events for each and apply the same duration.
      // By default this is a chord if it's an array of notes that requires one NoteOnEvent.
      // If this.sequential === true then it's a sequential string of notes that requires separate NoteOnEvents.


      if (!this.sequential) {
        // Handle repeat
        for (var j = 0; j < this.repeat; j++) {
          // Note on
          this.pitch.forEach(function (p, i) {
            var noteOnNew;

            if (i == 0) {
              noteOnNew = new NoteOnEvent({
                channel: _this.channel,
                wait: _this.wait,
                velocity: _this.velocity,
                pitch: p,
                startTick: _this.startTick
              });
            } else {
              // Running status (can ommit the note on status)
              //noteOn = new NoteOnEvent({data: [0, Utils.getPitch(p), Utils.convertVelocity(this.velocity)]});
              noteOnNew = new NoteOnEvent({
                channel: _this.channel,
                wait: 0,
                velocity: _this.velocity,
                pitch: p,
                startTick: _this.startTick
              });
            }

            _this.events.push(noteOnNew);
          }); // Note off

          this.pitch.forEach(function (p, i) {
            var noteOffNew;

            if (i == 0) {
              //noteOff = new NoteOffEvent({data: Utils.numberToVariableLength(tickDuration).concat(this.getNoteOffStatus(), Utils.getPitch(p), Utils.convertVelocity(this.velocity))});
              noteOffNew = new NoteOffEvent({
                channel: _this.channel,
                duration: _this.duration,
                velocity: _this.velocity,
                pitch: p,
                tick: _this.startTick !== null ? Utils.getTickDuration(_this.duration) + _this.startTick : null
              });
            } else {
              // Running status (can ommit the note off status)
              //noteOff = new NoteOffEvent({data: [0, Utils.getPitch(p), Utils.convertVelocity(this.velocity)]});
              noteOffNew = new NoteOffEvent({
                channel: _this.channel,
                duration: 0,
                velocity: _this.velocity,
                pitch: p,
                tick: _this.startTick !== null ? Utils.getTickDuration(_this.duration) + _this.startTick : null
              });
            }

            _this.events.push(noteOffNew);
          });
        }
      } else {
        // Handle repeat
        for (var _j = 0; _j < this.repeat; _j++) {
          this.pitch.forEach(function (p, i) {
            var noteOnNew = new NoteOnEvent({
              channel: _this.channel,
              wait: i > 0 ? 0 : _this.wait,
              // wait only applies to first note in repetition
              velocity: _this.velocity,
              pitch: p,
              startTick: _this.startTick
            });
            var noteOffNew = new NoteOffEvent({
              channel: _this.channel,
              duration: _this.duration,
              velocity: _this.velocity,
              pitch: p
            });

            _this.events.push(noteOnNew, noteOffNew);
          });
        }
      }

      return this;
    }
  }]);

  return NoteEvent;
}();

/**
 * Holds all data for a "Pitch Bend" MIDI event
 * [ -1.0, 0, 1.0 ] ->  [ 0, 8192, 16383]
 * @param {object} fields { bend : float, channel : int, delta: int }
 * @return {PitchBendEvent}
 */

var scale14bits = function scale14bits(zeroOne) {
  if (zeroOne <= 0) {
    return Math.floor(16384 * (zeroOne + 1) / 2);
  }

  return Math.floor(16383 * (zeroOne + 1) / 2);
};

var PitchBendEvent = /*#__PURE__*/_createClass(function PitchBendEvent(fields) {
  _classCallCheck(this, PitchBendEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'pitch-bend';
  var bend14 = scale14bits(fields.bend);
  var channel = fields.channel || 0;
  var lsbValue = bend14 & 0x7f;
  var msbValue = bend14 >> 7 & 0x7f;
  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.PITCH_BEND_STATUS | channel, lsbValue, msbValue);
});

/**
 * Holds all data for a "program change" MIDI event
 * @param {object} fields {instrument: integer, delta: integer}
 * @return {ProgramChangeEvent}
 */

var ProgramChangeEvent = /*#__PURE__*/function () {
  function ProgramChangeEvent(fields) {
    _classCallCheck(this, ProgramChangeEvent);

    // Set default fields
    this.fields = Object.assign({
      channel: 1,
      delta: 0x00
    }, fields);
    this.type = 'program'; // delta time defaults to 0.

    this.data = Utils.numberToVariableLength(this.fields.delta).concat(this.getStatusByte(), this.fields.instrument);
  }
  /**
   * Gets the status code based on the selected channel. 0xC{0-F}
   * Program change status byte for channel 0 is 0xC0 (192)
   * 0 = Ch 1
   * @return {number}
   */


  _createClass(ProgramChangeEvent, [{
    key: "getStatusByte",
    value: function getStatusByte() {
      return 192 + this.fields.channel - 1;
    }
  }]);

  return ProgramChangeEvent;
}();

/**
 * Object representation of a tempo meta event.
 * @param {object} fields {bpm: integer, delta: integer}
 * @return {TempoEvent}
 */

var TempoEvent = /*#__PURE__*/_createClass(function TempoEvent(fields) {
  _classCallCheck(this, TempoEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'tempo';
  this.tick = fields.tick;
  var tempo = Math.round(60000000 / fields.bpm); // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_TEMPO_ID, [0x03], // Size
  Utils.numberToBytes(tempo, 3) // Tempo, 3 bytes
  );
});

/**
 * Object representation of a tempo meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {TextEvent}
 */

var TextEvent = /*#__PURE__*/_createClass(function TextEvent(fields) {
  _classCallCheck(this, TextEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'text';
  var textBytes = Utils.stringToBytes(fields.text); // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_TEXT_ID, Utils.numberToVariableLength(textBytes.length), // Size
  textBytes // Text
  );
});

/**
 * Object representation of a time signature meta event.
 * @return {TimeSignatureEvent}
 */

var TimeSignatureEvent = /*#__PURE__*/_createClass(function TimeSignatureEvent(numerator, denominator, midiclockspertick, notespermidiclock) {
  _classCallCheck(this, TimeSignatureEvent);

  this.type = 'time-signature'; // Start with zero time delta

  this.data = Utils.numberToVariableLength(0x00).concat(Constants.META_EVENT_ID, Constants.META_TIME_SIGNATURE_ID, [0x04], // Size
  Utils.numberToBytes(numerator, 1), // Numerator, 1 bytes
  Utils.numberToBytes(Math.log2(denominator), 1), // Denominator is expressed as pow of 2, 1 bytes
  Utils.numberToBytes(midiclockspertick || 24, 1), // MIDI Clocks per tick, 1 bytes
  Utils.numberToBytes(notespermidiclock || 8, 1) // Number of 1/32 notes per MIDI clocks, 1 bytes
  );
});

/**
 * Object representation of a tempo meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {CopyrightEvent}
 */

var CopyrightEvent = /*#__PURE__*/_createClass(function CopyrightEvent(fields) {
  _classCallCheck(this, CopyrightEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'copyright';
  var textBytes = Utils.stringToBytes(fields.text); // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_COPYRIGHT_ID, Utils.numberToVariableLength(textBytes.length), // Size
  textBytes // Text
  );
});

/**
 * Object representation of a tempo meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {TrackNameEvent}
 */

var TrackNameEvent = /*#__PURE__*/_createClass(function TrackNameEvent(fields) {
  _classCallCheck(this, TrackNameEvent);

  // Set default fields
  fields = Object.assign({
    delta: 0x00
  }, fields);
  this.type = 'track-name';
  var textBytes = Utils.stringToBytes(fields.text); // Start with zero time delta

  this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.META_EVENT_ID, Constants.META_TRACK_NAME_ID, Utils.numberToVariableLength(textBytes.length), // Size
  textBytes // Text
  );
});

/**
 * Holds all data for a track.
 * @param {object} fields {type: number, data: array, size: array, events: array}
 * @return {Track}
 */

var Track = /*#__PURE__*/function () {
  function Track() {
    _classCallCheck(this, Track);

    this.type = Constants.TRACK_CHUNK_TYPE;
    this.data = [];
    this.size = [];
    this.events = [];
    this.explicitTickEvents = []; // If there are any events with an explicit tick defined then we will create a "sub" track for those
    // and merge them in and the end.

    this.tickPointer = 0; // Each time an event is added this will increase
  }
  /**
   * Adds any event type to the track.
   * Events without a specific startTick property are assumed to be added in order of how they should output.
   * Events with a specific startTick property are set aside for now will be merged in during build process.
   * @param {(NoteEvent|ProgramChangeEvent)} events - Event object or array of Event objects.
   * @param {function} mapFunction - Callback which can be used to apply specific properties to all events.
   * @return {Track}
   */


  _createClass(Track, [{
    key: "addEvent",
    value: function addEvent(events, mapFunction) {
      var _this = this;

      Utils.toArray(events).forEach(function (event, i) {
        if (event instanceof NoteEvent) {
          // Handle map function if provided
          if (typeof mapFunction === 'function') {
            var properties = mapFunction(i, event);

            if (_typeof(properties) === 'object') {
              for (var j in properties) {
                switch (j) {
                  case 'channel':
                    event.channel = properties[j];
                    break;

                  case 'duration':
                    event.duration = properties[j];
                    break;

                  case 'sequential':
                    event.sequential = properties[j];
                    break;

                  case 'velocity':
                    event.velocity = Utils.convertVelocity(properties[j]);
                    break;
                }
              }
            }
          } // If this note event has an explicit startTick then we need to set aside for now


          if (event.startTick !== null) {
            _this.explicitTickEvents.push(event);
          } else {
            // Push each on/off event to track's event stack
            event.buildData().events.forEach(function (e) {
              return _this.events.push(e);
            });
          }
        } else if (event instanceof EndTrackEvent) {
          // Only one EndTrackEvent is allowed, so remove
          // any existing ones before adding.
          _this.removeEventsByType('end-track');

          _this.events.push(event);
        } else {
          _this.events.push(event);
        }
      });
      return this;
    }
    /**
     * Builds int array of all events.
     * @param {object} options
     * @return {Track}
     */

  }, {
    key: "buildData",
    value: function buildData() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // If the last event isn't EndTrackEvent, then tack it onto the data.
      if (!this.events.length || !(this.events[this.events.length - 1] instanceof EndTrackEvent)) {
        this.addEvent(new EndTrackEvent());
      } // Reset


      this.data = [];
      this.size = [];
      this.tickPointer = 0;
      var precisionLoss = 0;
      this.events.forEach(function (event) {
        // Build event & add to total tick duration
        if (event instanceof NoteOnEvent || event instanceof NoteOffEvent) {
          var built = event.buildData(_this2, precisionLoss, options);
          precisionLoss = Utils.getPrecisionLoss(event.deltaWithPrecisionCorrection || 0);
          _this2.data = _this2.data.concat(built.data);
          _this2.tickPointer = Utils.getRoundedIfClose(event.tick);
        } else if (event instanceof TempoEvent) {
          _this2.tickPointer = Utils.getRoundedIfClose(event.tick);
          _this2.data = _this2.data.concat(event.data);
        } else {
          _this2.data = _this2.data.concat(event.data);
        }
      });
      this.mergeExplicitTickEvents();
      this.size = Utils.numberToBytes(this.data.length, 4); // 4 bytes long

      return this;
    }
  }, {
    key: "mergeExplicitTickEvents",
    value: function mergeExplicitTickEvents() {
      var _this3 = this;

      if (!this.explicitTickEvents.length) return; // First sort asc list of events by startTick

      this.explicitTickEvents.sort(function (a, b) {
        return a.startTick - b.startTick;
      }); // Now this.explicitTickEvents is in correct order, and so is this.events naturally.
      // For each explicit tick event, splice it into the main list of events and
      // adjust the delta on the following events so they still play normally.

      this.explicitTickEvents.forEach(function (noteEvent) {
        // Convert NoteEvent to it's respective NoteOn/NoteOff events
        // Note that as we splice in events the delta for the NoteOff ones will
        // Need to change based on what comes before them after the splice.
        noteEvent.buildData().events.forEach(function (e) {
          return e.buildData(_this3);
        }); // Merge each event indivually into this track's event list.

        noteEvent.events.forEach(function (event) {
          return _this3.mergeSingleEvent(event);
        });
      }); // Hacky way to rebuild track with newly spliced events.  Need better solution.

      this.explicitTickEvents = [];
      this.buildData();
    }
    /**
     * Merges another track's events with this track.
     * @param {Track} track
     * @return {Track}
     */

  }, {
    key: "mergeTrack",
    value: function mergeTrack(track) {
      var _this4 = this;

      // First build this track to populate each event's tick property
      this.buildData(); // Then build track to be merged so that tick property is populated on all events & merge each event.

      track.buildData().events.forEach(function (event) {
        return _this4.mergeSingleEvent(event);
      });
    }
    /**
     * Merges a single event into this track's list of events based on event.tick property.
     * @param {NoteOnEvent|NoteOffEvent} - event
     * @return {Track}
     */

  }, {
    key: "mergeSingleEvent",
    value: function mergeSingleEvent(event) {
      // There are no events yet, so just add it in.
      if (!this.events.length) {
        this.addEvent(event);
        return;
      } // Find index of existing event we need to follow with


      var lastEventIndex;

      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].tick > event.tick) break;
        lastEventIndex = i;
      }

      var splicedEventIndex = lastEventIndex + 1; // Need to adjust the delta of this event to ensure it falls on the correct tick.

      event.delta = event.tick - this.events[lastEventIndex].tick; // Splice this event at lastEventIndex + 1

      this.events.splice(splicedEventIndex, 0, event); // Now adjust delta of all following events

      for (var _i = splicedEventIndex + 1; _i < this.events.length; _i++) {
        // Since each existing event should have a tick value at this point we just need to
        // adjust delta to that the event still falls on the correct tick.
        this.events[_i].delta = this.events[_i].tick - this.events[_i - 1].tick;
      }
    }
    /**
     * Removes all events matching specified type.
     * @param {string} eventType - Event type
     * @return {Track}
     */

  }, {
    key: "removeEventsByType",
    value: function removeEventsByType(eventType) {
      var _this5 = this;

      this.events.forEach(function (event, index) {
        if (event.type === eventType) {
          _this5.events.splice(index, 1);
        }
      });
      return this;
    }
    /**
     * Sets tempo of the MIDI file.
     * @param {number} bpm - Tempo in beats per minute.
     * @param {number} tick - Start tick.
     * @return {Track}
     */

  }, {
    key: "setTempo",
    value: function setTempo(bpm) {
      var tick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this.addEvent(new TempoEvent({
        bpm: bpm,
        tick: tick
      }));
    }
    /**
     * Sets time signature.
     * @param {number} numerator - Top number of the time signature.
     * @param {number} denominator - Bottom number of the time signature.
     * @param {number} midiclockspertick - Defaults to 24.
     * @param {number} notespermidiclock - Defaults to 8.
     * @return {Track}
     */

  }, {
    key: "setTimeSignature",
    value: function setTimeSignature(numerator, denominator, midiclockspertick, notespermidiclock) {
      return this.addEvent(new TimeSignatureEvent(numerator, denominator, midiclockspertick, notespermidiclock));
    }
    /**
     * Sets key signature.
     * @param {*} sf -
     * @param {*} mi -
     * @return {Track}
     */

  }, {
    key: "setKeySignature",
    value: function setKeySignature(sf, mi) {
      return this.addEvent(new KeySignatureEvent(sf, mi));
    }
    /**
     * Adds text to MIDI file.
     * @param {string} text - Text to add.
     * @return {Track}
     */

  }, {
    key: "addText",
    value: function addText(text) {
      return this.addEvent(new TextEvent({
        text: text
      }));
    }
    /**
     * Adds copyright to MIDI file.
     * @param {string} text - Text of copyright line.
     * @return {Track}
     */

  }, {
    key: "addCopyright",
    value: function addCopyright(text) {
      return this.addEvent(new CopyrightEvent({
        text: text
      }));
    }
    /**
     * Adds Sequence/Track Name.
     * @param {string} text - Text of track name.
     * @return {Track}
     */

  }, {
    key: "addTrackName",
    value: function addTrackName(text) {
      return this.addEvent(new TrackNameEvent({
        text: text
      }));
    }
    /**
     * Sets instrument name of track.
     * @param {string} text - Name of instrument.
     * @return {Track}
     */

  }, {
    key: "addInstrumentName",
    value: function addInstrumentName(text) {
      return this.addEvent(new InstrumentNameEvent({
        text: text
      }));
    }
    /**
     * Adds marker to MIDI file.
     * @param {string} text - Marker text.
     * @return {Track}
     */

  }, {
    key: "addMarker",
    value: function addMarker(text) {
      return this.addEvent(new MarkerEvent({
        text: text
      }));
    }
    /**
     * Adds cue point to MIDI file.
     * @param {string} text - Text of cue point.
     * @return {Track}
     */

  }, {
    key: "addCuePoint",
    value: function addCuePoint(text) {
      return this.addEvent(new CuePointEvent({
        text: text
      }));
    }
    /**
     * Adds lyric to MIDI file.
     * @param {string} text - Lyric text to add.
     * @return {Track}
     */

  }, {
    key: "addLyric",
    value: function addLyric(text) {
      return this.addEvent(new LyricEvent({
        text: text
      }));
    }
    /**
     * Channel mode messages
     * @return {Track}
     */

  }, {
    key: "polyModeOn",
    value: function polyModeOn() {
      var event = new NoteOnEvent({
        data: [0x00, 0xB0, 0x7E, 0x00]
      });
      return this.addEvent(event);
    }
    /**
     * Sets a pitch bend.
     * @param {float} bend - Bend value ranging [-1,1], zero meaning no bend.
     * @return {Track}
     */

  }, {
    key: "setPitchBend",
    value: function setPitchBend(bend) {
      return this.addEvent(new PitchBendEvent({
        bend: bend
      }));
    }
    /**
     * Adds a controller change event
     * @param {number} number - Control number.
     * @param {number} value - Control value.
     * @return {Track}
     */

  }, {
    key: "controllerChange",
    value: function controllerChange(number, value) {
      return this.addEvent(new ControllerChangeEvent({
        controllerNumber: number,
        controllerValue: value
      }));
    }
  }]);

  return Track;
}();

var VexFlow = /*#__PURE__*/function () {
  function VexFlow() {
    _classCallCheck(this, VexFlow);
  }

  _createClass(VexFlow, [{
    key: "trackFromVoice",
    value:
    /**
     * Support for converting VexFlow voice into MidiWriterJS track
     * @return MidiWriter.Track object
     */
    function trackFromVoice(voice) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        addRenderedAccidentals: false
      };
      var track = new Track();
      var wait = [];
      voice.tickables.forEach(function (tickable) {
        if (tickable.noteType === 'n') {
          track.addEvent(new NoteEvent({
            pitch: tickable.keys.map(function (pitch, index) {
              return _this.convertPitch(pitch, index, tickable, options.addRenderedAccidentals);
            }),
            duration: _this.convertDuration(tickable),
            wait: wait
          })); // reset wait

          wait = [];
        } else if (tickable.noteType === 'r') {
          // move on to the next tickable and add this to the stack
          // of the `wait` property for the next note event
          wait.push(_this.convertDuration(tickable));
        }
      }); // There may be outstanding rests at the end of the track,
      // pad with a ghost note (zero duration and velocity), just to capture the wait.

      if (wait.length > 0) {
        track.addEvent(new NoteEvent({
          pitch: '[c4]',
          duration: '0',
          wait: wait,
          velocity: '0'
        }));
      }

      return track;
    }
    /**
     * Converts VexFlow pitch syntax to MidiWriterJS syntax
     * @param pitch string
     * @param index pitch index
     * @param note struct from Vexflow
     * @param addRenderedAccidentals adds Vexflow rendered accidentals
     */

  }, {
    key: "convertPitch",
    value: function convertPitch(pitch, index, note) {
      var addRenderedAccidentals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      // Splits note name from octave
      var pitchParts = pitch.split('/'); // Retrieves accidentals from pitch
      // Removes natural accidentals since they are not accepted in Tonal Midi

      var accidentals = pitchParts[0].substring(1).replace('n', '');

      if (addRenderedAccidentals) {
        var _note$getAccidentals;

        (_note$getAccidentals = note.getAccidentals()) === null || _note$getAccidentals === void 0 ? void 0 : _note$getAccidentals.forEach(function (accidental) {
          if (accidental.index === index) {
            if (accidental.type === 'n') {
              accidentals = '';
            } else {
              accidentals += accidental.type;
            }
          }
        });
      }

      return pitchParts[0][0] + accidentals + pitchParts[1];
    }
    /**
     * Converts VexFlow duration syntax to MidiWriterJS syntax
     * @param note struct from VexFlow
     */

  }, {
    key: "convertDuration",
    value: function convertDuration(note) {
      return 'd'.repeat(note.dots) + this.convertBaseDuration(note.duration) + (note.tuplet ? 't' + note.tuplet.num_notes : '');
    }
    /**
     * Converts VexFlow base duration syntax to MidiWriterJS syntax
     * @param duration Vexflow duration
     * @returns MidiWriterJS duration
     */

  }, {
    key: "convertBaseDuration",
    value: function convertBaseDuration(duration) {
      switch (duration) {
        case 'w':
          return '1';

        case 'h':
          return '2';

        case 'q':
          return '4';

        default:
          return duration;
      }
    }
  }]);

  return VexFlow;
}();

/**
 * Object representation of a header chunk section of a MIDI file.
 * @param {number} numberOfTracks - Number of tracks
 * @return {HeaderChunk}
 */

var HeaderChunk = /*#__PURE__*/_createClass(function HeaderChunk(numberOfTracks) {
  _classCallCheck(this, HeaderChunk);

  this.type = Constants.HEADER_CHUNK_TYPE;
  var trackType = numberOfTracks > 1 ? Constants.HEADER_CHUNK_FORMAT1 : Constants.HEADER_CHUNK_FORMAT0;
  this.data = trackType.concat(Utils.numberToBytes(numberOfTracks, 2), // two bytes long,
  Constants.HEADER_CHUNK_DIVISION);
  this.size = [0, 0, 0, this.data.length];
});

/**
 * Object that puts together tracks and provides methods for file output.
 * @param {array|Track} tracks - A single {Track} object or an array of {Track} objects.
 * @param {object} options - {middleC: 'C4'}
 * @return {Writer}
 */

var Writer = /*#__PURE__*/function () {
  function Writer(tracks) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Writer);

    // Ensure tracks is an array
    this.tracks = Utils.toArray(tracks);
    this.options = options;
  }
  /**
   * Builds array of data from chunkschunks.
   * @return {array}
   */


  _createClass(Writer, [{
    key: "buildData",
    value: function buildData() {
      var _this = this;

      var data = [];
      data.push(new HeaderChunk(this.tracks.length)); // For each track add final end of track event and build data

      this.tracks.forEach(function (track) {
        data.push(track.buildData(_this.options));
      });
      return data;
    }
    /**
     * Builds the file into a Uint8Array
     * @return {Uint8Array}
     */

  }, {
    key: "buildFile",
    value: function buildFile() {
      var build = []; // Data consists of chunks which consists of data

      this.buildData().forEach(function (d) {
        return build = build.concat(d.type, d.size, d.data);
      });
      return new Uint8Array(build);
    }
    /**
     * Convert file buffer to a base64 string.  Different methods depending on if browser or node.
     * @return {string}
     */

  }, {
    key: "base64",
    value: function base64() {
      if (typeof btoa === 'function') return btoa(String.fromCharCode.apply(null, this.buildFile()));
      return Buffer.from(this.buildFile()).toString('base64');
    }
    /**
     * Get the data URI.
     * @return {string}
     */

  }, {
    key: "dataUri",
    value: function dataUri() {
      return 'data:audio/midi;base64,' + this.base64();
    }
    /**
     * Set option on instantiated Writer.
     * @param {string} key
     * @param {any} value
     * @return {Writer}
     */

  }, {
    key: "setOption",
    value: function setOption(key, value) {
      this.options[key] = value;
      return this;
    }
    /**
     * Output to stdout
     * @return {string}
     */

  }, {
    key: "stdout",
    value: function stdout() {
      return process.stdout.write(Buffer.from(this.buildFile()));
    }
  }]);

  return Writer;
}();

var main = {
  Constants: Constants,
  ControllerChangeEvent: ControllerChangeEvent,
  CuePointEvent: CuePointEvent,
  EndTrackEvent: EndTrackEvent,
  InstrumentNameEvent: InstrumentNameEvent,
  KeySignatureEvent: KeySignatureEvent,
  LyricEvent: LyricEvent,
  MarkerEvent: MarkerEvent,
  NoteOnEvent: NoteOnEvent,
  NoteOffEvent: NoteOffEvent,
  NoteEvent: NoteEvent,
  PitchBendEvent: PitchBendEvent,
  ProgramChangeEvent: ProgramChangeEvent,
  TempoEvent: TempoEvent,
  TextEvent: TextEvent,
  TimeSignatureEvent: TimeSignatureEvent,
  Track: Track,
  TrackNameEvent: TrackNameEvent,
  Utils: Utils,
  VexFlow: VexFlow,
  Writer: Writer
};

module.exports = main;


/***/ }),

/***/ "./node_modules/note-parser/index.js":
/*!*******************************************!*\
  !*** ./node_modules/note-parser/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   acc: () => (/* binding */ acc),
/* harmony export */   alt: () => (/* binding */ alt),
/* harmony export */   build: () => (/* binding */ build),
/* harmony export */   chroma: () => (/* binding */ chroma),
/* harmony export */   freq: () => (/* binding */ freq),
/* harmony export */   letter: () => (/* binding */ letter),
/* harmony export */   midi: () => (/* binding */ midi),
/* harmony export */   oct: () => (/* binding */ oct),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   pc: () => (/* binding */ pc),
/* harmony export */   regex: () => (/* binding */ regex),
/* harmony export */   step: () => (/* binding */ step)
/* harmony export */ });


// util
function fillStr (s, num) { return Array(num + 1).join(s) }
function isNum (x) { return typeof x === 'number' }
function isStr (x) { return typeof x === 'string' }
function isDef (x) { return typeof x !== 'undefined' }
function midiToFreq (midi, tuning) {
  return Math.pow(2, (midi - 69) / 12) * (tuning || 440)
}

var REGEX = /^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/
/**
 * A regex for matching note strings in scientific notation.
 *
 * @name regex
 * @function
 * @return {RegExp} the regexp used to parse the note name
 *
 * The note string should have the form `letter[accidentals][octave][element]`
 * where:
 *
 * - letter: (Required) is a letter from A to G either upper or lower case
 * - accidentals: (Optional) can be one or more `b` (flats), `#` (sharps) or `x` (double sharps).
 * They can NOT be mixed.
 * - octave: (Optional) a positive or negative integer
 * - element: (Optional) additionally anything after the duration is considered to
 * be the element name (for example: 'C2 dorian')
 *
 * The executed regex contains (by array index):
 *
 * - 0: the complete string
 * - 1: the note letter
 * - 2: the optional accidentals
 * - 3: the optional octave
 * - 4: the rest of the string (trimmed)
 *
 * @example
 * var parser = require('note-parser')
 * parser.regex.exec('c#4')
 * // => ['c#4', 'c', '#', '4', '']
 * parser.regex.exec('c#4 major')
 * // => ['c#4major', 'c', '#', '4', 'major']
 * parser.regex().exec('CMaj7')
 * // => ['CMaj7', 'C', '', '', 'Maj7']
 */
function regex () { return REGEX }

var SEMITONES = [0, 2, 4, 5, 7, 9, 11]
/**
 * Parse a note name in scientific notation an return it's components,
 * and some numeric properties including midi number and frequency.
 *
 * @name parse
 * @function
 * @param {String} note - the note string to be parsed
 * @param {Boolean} isTonic - true the strings it's supposed to contain a note number
 * and some category (for example an scale: 'C# major'). It's false by default,
 * but when true, en extra tonicOf property is returned with the category ('major')
 * @param {Float} tunning - The frequency of A4 note to calculate frequencies.
 * By default it 440.
 * @return {Object} the parsed note name or null if not a valid note
 *
 * The parsed note name object will ALWAYS contains:
 * - letter: the uppercase letter of the note
 * - acc: the accidentals of the note (only sharps or flats)
 * - pc: the pitch class (letter + acc)
 * - step: s a numeric representation of the letter. It's an integer from 0 to 6
 * where 0 = C, 1 = D ... 6 = B
 * - alt: a numeric representation of the accidentals. 0 means no alteration,
 * positive numbers are for sharps and negative for flats
 * - chroma: a numeric representation of the pitch class. It's like midi for
 * pitch classes. 0 = C, 1 = C#, 2 = D ... 11 = B. Can be used to find enharmonics
 * since, for example, chroma of 'Cb' and 'B' are both 11
 *
 * If the note has octave, the parser object will contain:
 * - oct: the octave number (as integer)
 * - midi: the midi number
 * - freq: the frequency (using tuning parameter as base)
 *
 * If the parameter `isTonic` is set to true, the parsed object will contain:
 * - tonicOf: the rest of the string that follows note name (left and right trimmed)
 *
 * @example
 * var parse = require('note-parser').parse
 * parse('Cb4')
 * // => { letter: 'C', acc: 'b', pc: 'Cb', step: 0, alt: -1, chroma: -1,
 *         oct: 4, midi: 59, freq: 246.94165062806206 }
 * // if no octave, no midi, no freq
 * parse('fx')
 * // => { letter: 'F', acc: '##', pc: 'F##', step: 3, alt: 2, chroma: 7 })
 */
function parse (str, isTonic, tuning) {
  if (typeof str !== 'string') return null
  var m = REGEX.exec(str)
  if (!m || (!isTonic && m[4])) return null

  var p = { letter: m[1].toUpperCase(), acc: m[2].replace(/x/g, '##') }
  p.pc = p.letter + p.acc
  p.step = (p.letter.charCodeAt(0) + 3) % 7
  p.alt = p.acc[0] === 'b' ? -p.acc.length : p.acc.length
  var pos = SEMITONES[p.step] + p.alt
  p.chroma = pos < 0 ? 12 + pos : pos % 12
  if (m[3]) { // has octave
    p.oct = +m[3]
    p.midi = pos + 12 * (p.oct + 1)
    p.freq = midiToFreq(p.midi, tuning)
  }
  if (isTonic) p.tonicOf = m[4]
  return p
}

var LETTERS = 'CDEFGAB'
function accStr (n) { return !isNum(n) ? '' : n < 0 ? fillStr('b', -n) : fillStr('#', n) }
function octStr (n) { return !isNum(n) ? '' : '' + n }

/**
 * Create a string from a parsed object or `step, alteration, octave` parameters
 * @param {Object} obj - the parsed data object
 * @return {String} a note string or null if not valid parameters
 * @since 1.2
 * @example
 * parser.build(parser.parse('cb2')) // => 'Cb2'
 *
 * @example
 * // it accepts (step, alteration, octave) parameters:
 * parser.build(3) // => 'F'
 * parser.build(3, -1) // => 'Fb'
 * parser.build(3, -1, 4) // => 'Fb4'
 */
function build (s, a, o) {
  if (s === null || typeof s === 'undefined') return null
  if (s.step) return build(s.step, s.alt, s.oct)
  if (s < 0 || s > 6) return null
  return LETTERS.charAt(s) + accStr(a) + octStr(o)
}

/**
 * Get midi of a note
 *
 * @name midi
 * @function
 * @param {String|Integer} note - the note name or midi number
 * @return {Integer} the midi number of the note or null if not a valid note
 * or the note does NOT contains octave
 * @example
 * var parser = require('note-parser')
 * parser.midi('A4') // => 69
 * parser.midi('A') // => null
 * @example
 * // midi numbers are bypassed (even as strings)
 * parser.midi(60) // => 60
 * parser.midi('60') // => 60
 */
function midi (note) {
  if ((isNum(note) || isStr(note)) && note >= 0 && note < 128) return +note
  var p = parse(note)
  return p && isDef(p.midi) ? p.midi : null
}

/**
 * Get freq of a note in hertzs (in a well tempered 440Hz A4)
 *
 * @name freq
 * @function
 * @param {String} note - the note name or note midi number
 * @param {String} tuning - (Optional) the A4 frequency (440 by default)
 * @return {Float} the freq of the number if hertzs or null if not valid note
 * @example
 * var parser = require('note-parser')
 * parser.freq('A4') // => 440
 * parser.freq('A') // => null
 * @example
 * // can change tuning (440 by default)
 * parser.freq('A4', 444) // => 444
 * parser.freq('A3', 444) // => 222
 * @example
 * // it accepts midi numbers (as numbers and as strings)
 * parser.freq(69) // => 440
 * parser.freq('69', 442) // => 442
 */
function freq (note, tuning) {
  var m = midi(note)
  return m === null ? null : midiToFreq(m, tuning)
}

function letter (src) { return (parse(src) || {}).letter }
function acc (src) { return (parse(src) || {}).acc }
function pc (src) { return (parse(src) || {}).pc }
function step (src) { return (parse(src) || {}).step }
function alt (src) { return (parse(src) || {}).alt }
function chroma (src) { return (parse(src) || {}).chroma }
function oct (src) { return (parse(src) || {}).oct }


/***/ }),

/***/ "./node_modules/tonal-midi/index.js":
/*!******************************************!*\
  !*** ./node_modules/tonal-midi/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   note: () => (/* binding */ note),
/* harmony export */   toMidi: () => (/* binding */ toMidi)
/* harmony export */ });
/* harmony import */ var note_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! note-parser */ "./node_modules/note-parser/index.js");
/**
 * A midi note number is a number representation of a note pitch. It can be
 * integers so it's equal tempered tuned, or float to indicate it's not
 * tuned into equal temepered scale.
 *
 * This module contains functions to convert to and from midi notes.
 *
 * @example
 * var midi = require('tonal-midi')
 * midi.toMidi('A4') // => 69
 * midi.note(69) // => 'A4'
 * midi.note(61) // => 'Db4'
 * midi.note(61, true) // => 'C#4'
 *
 * @module midi
 */



/**
 * Convert the given note to a midi note number. If you pass a midi number it
 * will returned as is.
 *
 * @param {Array|String|Number} note - the note to get the midi number from
 * @return {Integer} the midi number or null if not valid pitch
 * @example
 * midi.toMidi('C4') // => 60
 * midi.toMidi(60) // => 60
 * midi.toMidi('60') // => 60
 */
function toMidi (val) {
  if (Array.isArray(val) && val.length === 2) return val[0] * 7 + val[1] * 12 + 12
  return (0,note_parser__WEBPACK_IMPORTED_MODULE_0__.midi)(val)
}

var FLATS = 'C Db D Eb E F Gb G Ab A Bb B'.split(' ')
var SHARPS = 'C C# D D# E F F# G G# A A# B'.split(' ')

/**
 * Given a midi number, returns a note name. The altered notes will have
 * flats unless explicitly set with the optional `useSharps` parameter.
 *
 * @function
 * @param {Integer} midi - the midi note number
 * @param {Boolean} useSharps - (Optional) set to true to use sharps instead of flats
 * @return {String} the note name
 * @example
 * var midi = require('tonal-midi')
 * midi.note(61) // => 'Db4'
 * midi.note(61, true) // => 'C#4'
 * // it rounds to nearest note
 * midi.note(61.7) // => 'D4'
 */
function note (num, sharps) {
  if (num === true || num === false) return function (m) { return note(m, num) }
  num = Math.round(num)
  var pcs = sharps === true ? SHARPS : FLATS
  var pc = pcs[num % 12]
  var o = Math.floor(num / 12) - 1
  return pc + o
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Rendering_Render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering/Render.js */ "./js/Rendering/Render.js");
/* harmony import */ var _ui_UI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/UI.js */ "./js/ui/UI.js");
/* harmony import */ var _InputListeners_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputListeners.js */ "./js/InputListeners.js");
/* harmony import */ var _player_Player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player/Player.js */ "./js/player/Player.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Util.js */ "./js/Util.js");
/* harmony import */ var _player_FileLoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./player/FileLoader.js */ "./js/player/FileLoader.js");







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
let listeners

window.onload = async function () {
	await init()
	loading = true

	//	loadSongFromURL("http://www.piano-midi.de/midis/brahms/brahms_opus1_1_format0.mid")
}

async function init() {
	render = new _Rendering_Render_js__WEBPACK_IMPORTED_MODULE_0__.Render()
	ui = new _ui_UI_js__WEBPACK_IMPORTED_MODULE_1__.UI(render)
	listeners = new _InputListeners_js__WEBPACK_IMPORTED_MODULE_2__.InputListeners(ui, render)
	renderLoop()

	loadStartingSong()

	;(0,_Util_js__WEBPACK_IMPORTED_MODULE_4__.loadJson)("./js/data/exampleSongs.json", json =>
		ui.setExampleSongs(JSON.parse(json))
	)
}

let render
function renderLoop() {
	render.render((0,_player_Player_js__WEBPACK_IMPORTED_MODULE_3__.getPlayerState)())
	window.requestAnimationFrame(renderLoop)
}
async function loadStartingSong() {
	const domain = window.location.href
	let url = "https://midiano.com/mz_331_3.mid?raw=true" // "https://bewelge.github.io/piano-midi.de-Files/midi/alb_esp1.mid?raw=true" //
	if (domain.split("github").length > 1) {
		url = "https://Bewelge.github.io/MIDIano/mz_331_3.mid?raw=true"
	}

	_player_FileLoader_js__WEBPACK_IMPORTED_MODULE_5__.FileLoader.loadSongFromURL(url, (response, fileName) =>
		(0,_player_Player_js__WEBPACK_IMPORTED_MODULE_3__.getPlayer)().loadSong(response, fileName, "Mozart - Turkish March")
	) // Local: "../mz_331_3.mid")
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map