import { DomHelper } from "./DomHelper.js"
import { getSettingsDiv } from "../settings/Settings.js"
import { ZoomUI } from "./ZoomUI.js"
import { createTrackDivs } from "./TrackUI.js"
import { getCurrentSong, getPlayer, getSongFilename } from "../player/Player.js"
import { SongUI } from "./SongUI.js"
import { getMidiHandler } from "../MidiInputHandler.js"
import MidiRecorder from "../recording/midi-recorder.js"
import { Midi, Track, Note } from '@tonejs/midi';
import MelodyGenerator from "../generate/melody-generator.js"
import localforage from "localforage"
import { getLoader } from "./Loader.js"

/**
 * Contains all initiation, appending and manipulation of DOM-elements.
 * Callback-bindings for some events are created in  the constructor
 */
export class UI {
	constructor(render, isMobile) {
		this.isMobile = window.matchMedia(
			"only screen and (max-width: 1600px)"
		).matches

		this.recordingInProgress = false;

		this.recordingControlsState = {
			startRecordingVisible: true,
			pauseRecordingVisible: false,
			clearRecordingVisible: false,
			saveRecordingVisible: false,
			exportRecordingVisible: true,
		};

		this.timerInterval = null;

		this.midiRecorder = new MidiRecorder()

		this.modelConfigs = null; // To store all model configurations
		this.selectedModelConfig = null; // To store the selected model configuration

		this.songUI = new SongUI()
		//add callbacks to the player
		getPlayer().newSongCallbacks.push(this.newSongCallback.bind(this))

		document.body.addEventListener("mousemove", this.mouseMoved.bind(this))

		this.createControlMenu()
		let hasActiveInput = false;

		this.menuHeight = 200

		document
			.querySelectorAll(".innerMenuDiv")
			.forEach(
				el =>
				(el.style.height =
					"calc(100% - " + (this.getNavBar().clientHeight + 24) + "px)")
			)

		document.body.appendChild(new ZoomUI().getContentDiv(render))

		this.genDialog = null;

		this.genDialogShown = false; // Track the visibility state of the generate dialog
		this.createGenerateMelodyDialog(); // Call to create the dialog during initialization
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
		let topGroupsContainer = DomHelper.createDivWithClass("container")

		let fileGrp = this.getFileButtonGroup()
		let songSpeedGrp = this.getSpeedButtonGroup()
		let songControlGrp = this.getSongControlButtonGroup()
		let generteMelodyGrp = this.getGenerateMelodyButton()
		let volumeGrp = this.getVolumneButtonGroup()
		let settingsGrpRight = this.getSettingsButtonGroup()
		let trackGrp = this.getTracksButtonGroup()

		DomHelper.addClassToElements("align-middle", [
			fileGrp,
			songSpeedGrp,
			songControlGrp,
			volumeGrp,
			trackGrp
		])

		let leftTop = DomHelper.createElementWithClass("topContainer")
		let middleTop = DomHelper.createElementWithClass("topContainer")
		let rightTop = DomHelper.createElementWithClass("topContainer")

		DomHelper.appendChildren(leftTop, [fileGrp, trackGrp])
		DomHelper.appendChildren(middleTop, [songControlGrp, generteMelodyGrp])
		DomHelper.appendChildren(rightTop, [
			songSpeedGrp,
			volumeGrp,
			settingsGrpRight
		])

		DomHelper.appendChildren(topGroupsContainer, [leftTop, middleTop, rightTop])
		this.getNavBar().appendChild(topGroupsContainer)

		let minimizeButton = this.getMinimizeButton()

		let innerMenuDivsContainer = DomHelper.createElementWithClass(
			"innerMenuDivsContainer"
		)
		DomHelper.appendChildren(innerMenuDivsContainer, [
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
			this.minimizeButton = DomHelper.createGlyphiconButton(
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
		let settingsGrpRight = DomHelper.createButtonGroup(true)
		DomHelper.appendChildren(settingsGrpRight, [
			this.getFullscreenButton(),
			this.getSettingsButton()
		])
		return settingsGrpRight
	}
	setOnMenuHeightChange(func) {
		this.onMenuHeightChange = func
	}

	getTracksButtonGroup() {
		let trackGrp = DomHelper.createButtonGroup(true)
		DomHelper.appendChildren(trackGrp, [
			this.getTracksButton(),
			this.getMidiSetupButton()
			// this.getChannelsButton()
		])
		return trackGrp
	}

	getVolumneButtonGroup() {
		let volumeGrp = DomHelper.createButtonGroup(true)
		DomHelper.appendChildren(volumeGrp, [
			this.getMainVolumeSlider().container,
			this.getMuteButton()
		])
		return volumeGrp
	}

	getSongControlButtonGroup() {
		let songControlGrp = DomHelper.createButtonGroup(false)
		DomHelper.appendChildren(songControlGrp, [
			this.getPlayButton(),
			this.getPauseButton(),
			this.getStopButton(),
			this.getRecordButton()
		])
		return songControlGrp
	}

	getSpeedButtonGroup() {
		let songSpeedGrp = DomHelper.createButtonGroup(true)
		DomHelper.appendChildren(songSpeedGrp, [this.getSpeedDiv()])
		return songSpeedGrp
	}

	getFileButtonGroup() {
		let fileGrp = DomHelper.createButtonGroup(true)
		DomHelper.appendChildren(fileGrp, [
			this.getLoadSongButton(),
			this.getLoadedSongsButton()
		])
		return fileGrp
	}

	getNavBar() {
		if (!this.navBar) {
			this.navBar = DomHelper.createElement(
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
			this.settingsButton = DomHelper.createGlyphiconButton(
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
		if (div) {
			div.classList.add("hidden");
			div.classList.remove("unhidden");
		}
	}

	showDiv(div) {
		if (div) {
			div.classList.remove("hidden");
			div.classList.add("unhidden");
		}
	}
	hideSettings() {
		DomHelper.removeClass("selected", this.getSettingsButton())
		this.settingsShown = false
		this.hideDiv(this.getSettingsDiv())
	}
	showSettings() {
		this.hideAllDialogs()
		DomHelper.addClassToElement("selected", this.getSettingsButton())
		this.settingsShown = true
		this.showDiv(this.getSettingsDiv())
	}
	getSettingsDiv() {
		if (!this.settingsDiv) {
			this.settingsDiv = DomHelper.createDivWithIdAndClass(
				"settingsDiv",
				"innerMenuDiv"
			)
			this.hideDiv(this.settingsDiv)
			this.settingsDiv.appendChild(this.getSettingsContent())
		}
		return this.settingsDiv
	}
	getSettingsContent() {
		return getSettingsDiv()
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
			this.fullscreenButton = DomHelper.createGlyphiconButton(
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
			this.loadSongButton = DomHelper.createFileInput(
				"Upload Midi",
				this.handleFileSelect.bind(this)
			)
			DomHelper.addClassToElement("floatSpanLeft", this.loadSongButton)
		}
		return this.loadSongButton
	}
	getLoadedSongsButton() {
		if (!this.loadedSongsButton) {
			this.loadedSongsButton = DomHelper.createGlyphiconTextButton(
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
		DomHelper.addClassToElement("selected", this.loadedSongsButton)
		this.loadedSongsShown = true
		this.showDiv(this.getLoadedSongsDiv())
	}

	hideLoadedSongsDiv() {
		DomHelper.removeClass("selected", this.loadedSongsButton)
		this.loadedSongsShown = false
		this.hideDiv(this.getLoadedSongsDiv())
	}

	getLoadedSongsDiv() {
		if (!this.loadedSongsDiv) {
			this.loadedSongsDiv = DomHelper.createDivWithClass("innerMenuDiv")
			this.loadedSongsDiv.appendChild(this.songUI.getDivContent())
			this.hideDiv(this.loadedSongsDiv)
		}
		return this.loadedSongsDiv
	}

	createFileDragArea() {
		let dragArea = DomHelper.createElement(
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

		let dragAreaText = DomHelper.createDivWithClass(
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
			getPlayer().loadSong(reader.result, fileName)
		}.bind(this)
		reader.readAsDataURL(file)
	}

	getSpeedDiv() {
		if (!this.speedDiv) {
			this.speedDiv = DomHelper.createDivWithClass(
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
			this.speedUpButton = DomHelper.createGlyphiconButton(
				"speedUp",
				"triangle-top",
				ev => {
					getPlayer().increaseSpeed(0.05)
					this.updateSpeed()
				}
			)
			this.speedUpButton.className += " btn-xs forcedThinButton"
		}
		return this.speedUpButton
	}
	updateSpeed() {
		this.getSpeedDisplayField().value =
			Math.round(getPlayer().playbackSpeed * 100) + "%"
	}
	getSpeedDisplayField() {
		if (!this.speedDisplay) {
			this.speedDisplay = DomHelper.createTextInput(
				ev => {
					let newVal = Math.max(1, Math.min(1000, parseInt(ev.target.value)))
					if (!isNaN(newVal)) {
						ev.target.value = newVal + "%"
						getPlayer().playbackSpeed = newVal / 100
					}
				},
				{
					float: "none",
					textAlign: "center"
				},
				{
					value: Math.floor(getPlayer().playbackSpeed * 100) + "%",
					className: "forcedThinButton",
					type: "text"
				}
			)
		}
		return this.speedDisplay
	}
	getSpeedDownButton() {
		if (!this.speedDownButton) {
			this.speedDownButton = DomHelper.createGlyphiconButton(
				"speedUp",
				"triangle-bottom",
				ev => {
					getPlayer().increaseSpeed(-0.05)
					this.updateSpeed()
				}
			)
			this.speedDownButton.className += " btn-xs forcedThinButton"
		}
		return this.speedDownButton
	}
	getTracksButton() {
		if (!this.tracksButton) {
			this.tracksButton = DomHelper.createGlyphiconTextButton(
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
			DomHelper.addClassToElement("floatSpanLeft", this.tracksButton)
		}
		return this.tracksButton
	}
	hideTracks() {
		DomHelper.removeClass("selected", this.tracksButton)
		this.tracksShown = false
		this.hideDiv(this.getTrackMenuDiv())
	}

	showTracks() {
		this.hideAllDialogs()
		DomHelper.addClassToElement("selected", this.tracksButton)
		this.tracksShown = true
		//instrument of a track could theoretically change during the song.
		document
			.querySelectorAll(".instrumentName")
			.forEach(
				el =>
				(el.innerHTML = getPlayer().getCurrentTrackInstrument(
					el.id.split("instrumentName")[1]
				))
			)
		this.showDiv(this.getTrackMenuDiv())
	}

	getMidiSetupButton() {
		if (!this.midiSetupButton) {
			this.midiSetupButton = DomHelper.createGlyphiconTextButton(
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
			DomHelper.addClassToElement("floatSpanLeft", this.midiSetupButton)
		}
		return this.midiSetupButton
	}
	hideMidiSetupDialog() {
		DomHelper.removeClass("selected", this.midiSetupButton)
		this.midiSetupDialogShown = false
		this.hideDiv(this.getMidiSetupDialog())
	}

	showMidiSetupDialog() {
		this.hideAllDialogs()
		DomHelper.addClassToElement("selected", this.midiSetupButton)
		this.midiSetupDialogShown = true

		this.showDiv(this.getMidiSetupDialog())
	}
	getChannelsButton() {
		if (!this.channelsButton) {
			let channelMenuDiv = this.getChannelMenuDiv()
			this.channelsButton = DomHelper.createGlyphiconTextButton(
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
			DomHelper.addClassToElement("floatSpanLeft", this.channelsButton)

			//Todo. decide what channel info to show...
			this.channelsButton.style.opacity = 0
		}
		return this.channelsButton
	}
	getChannelMenuDiv() {
		if (!this.channelMenuDiv) {
			this.channelMenuDiv = DomHelper.createDivWithId("trackContainerDiv")
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
		DomHelper.addClassToElement("selected", this.tracksButton)
		this.channelsShown = true
		channelMenuDiv.style.display = "block"
	}

	hideChannels(channelMenuDiv) {
		DomHelper.removeClass("selected", this.tracksButton)
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
			this.mainVolumeSlider = DomHelper.createSliderWithLabel(
				"volumeMain",
				"Master Volume",
				getPlayer().volume,
				0,
				100,
				1,
				ev => {
					if (getPlayer().volume == 0 && parseInt(ev.target.value) != 0) {
						DomHelper.replaceGlyph(
							this.getMuteButton(),
							"volume-off",
							"volume-up"
						)
						//this.getMuteButton().firstChild.className = this.muteButton.firstChild.className.replace('volume-off', 'volume-up')
					}
					getPlayer().volume = parseInt(ev.target.value)
					if (getPlayer().volume <= 0) {
						DomHelper.replaceGlyph(
							this.getMuteButton(),
							"volume-up",
							"volume-off"
						)
					} else if (this.getMuteButton().innerHTML == "Unmute") {
						DomHelper.replaceGlyph(
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
			this.muteButton = DomHelper.createGlyphiconButton(
				"mute",
				"volume-up",
				ev => {
					if (getPlayer().muted) {
						getPlayer().muted = false
						if (!isNaN(getPlayer().mutedAtVolume)) {
							if (getPlayer().mutedAtVolume == 0) {
								getPlayer().mutedAtVolume = 100
							}
							this.getMainVolumeSlider().slider.value = getPlayer().mutedAtVolume
							getPlayer().volume = getPlayer().mutedAtVolume
						}
						DomHelper.replaceGlyph(this.muteButton, "volume-off", "volume-up")
					} else {
						getPlayer().mutedAtVolume = getPlayer().volume
						getPlayer().muted = true
						getPlayer().volume = 0
						this.getMainVolumeSlider().slider.value = 0
						DomHelper.replaceGlyph(this.muteButton, "volume-up", "volume-off")
					}
				}
			)
		}
		return this.muteButton
	}
	getPlayButton() {
		if (!this.playButton) {
			this.playButton = DomHelper.createGlyphiconButton(
				"play",
				"play",
				this.clickPlay.bind(this)
			)
			DomHelper.addClassToElement("btn-lg", this.playButton)
		}
		return this.playButton
	}
	clickPlay(ev) {
		if (getPlayer().song) {
			DomHelper.removeClass("selected", this.getPauseButton())
			getPlayer().startPlay()
			DomHelper.addClassToElement("selected", this.playButton)
		}
	}
	getPauseButton() {
		if (!this.pauseButton) {
			this.pauseButton = DomHelper.createGlyphiconButton(
				"pause",
				"pause",
				this.clickPause.bind(this)
			)
			DomHelper.addClassToElement("btn-lg", this.pauseButton)
		}
		return this.pauseButton
	}
	clickPause(ev) {
		getPlayer().pause()
		DomHelper.removeClass("selected", this.getPlayButton())

		DomHelper.addClassToElement("selected", this.pauseButton)
	}

	getStopButton() {
		if (!this.stopButton) {
			this.stopButton = DomHelper.createGlyphiconButton(
				"stop",
				"stop",
				this.clickStop.bind(this)
			)

			DomHelper.addClassToElement("btn-lg", this.stopButton)
		}
		return this.stopButton
	}
	clickStop(ev) {
		getPlayer().stop()
		DomHelper.removeClass("selected", this.getPlayButton())
		DomHelper.removeClass("selected", this.getPauseButton())
	}
	getRecordButton() {
		if (!this.recordButton) {
			this.recordButton = DomHelper.createGlyphiconButton(
				"record",
				"record",
				this.clickRecord.bind(this)
			);
			DomHelper.addClassToElement("btn-lg", this.recordButton);
		}
		return this.recordButton;
	}

	getGenerateMelodyButton() {
		if (!this.generateMelodyButton) {
			this.generateMelodyButton = DomHelper.createGlyphiconTextButton(
				"generateMelody",
				"music", // Assuming the glyph icon for music is "music"
				"Generate Melody",
				this.toggleGenerateMelodyDialog.bind(this) // Toggle dialog on click
			);
			DomHelper.addClassToElement("btn-lg", this.generateMelodyButton);
		}
		return this.generateMelodyButton;
	}

	getGenerateMelodyDialog() {
		if (!this.genDialog) {
			this.genDialog = this.createGenerateMelodyDialog();
		}
		return this.genDialog;
	}

	toggleGenerateMelodyDialog() {
		this.genDialogShown = !this.genDialogShown; // Toggle the visibility state
		if (this.genDialogShown) {
			this.showDiv(this.genDialog); // Show the dialog
			DomHelper.addClassToElement("selected", this.generateMelodyButton);
		} else {
			this.hideDiv(this.genDialog); // Hide the dialog
			DomHelper.removeClass("selected", this.generateMelodyButton);
		}
	}

	async createGenerateMelodyDialog() {
		if (this.genDialog) return; // Prevent creating multiple dialogs

		// Create dialog container
		this.genDialog = DomHelper.createDivWithIdAndClass(
			"generateMelodyDialog",
			"centeredMenuDiv"
		);
		// Load and store the model configurations
		this.modelConfigs = await this.loadModelConfig();

		// Dropdown for model selection
		let modelNames = this.modelConfigs.map(model => model.name);
		let modelSelect = DomHelper.createInputSelect(
			"Model",
			modelNames,
			(selectedModelName) => {
				// Find and store the selected model configuration
				this.selectedModelConfig = this.modelConfigs.find(model => model.name === selectedModelName);
				console.log("Model selected:", this.selectedModelConfig);
			}
		);
		this.genDialog.appendChild(modelSelect);

		// Dispatch the change event to set the initial model configuration
		modelSelect.dispatchEvent(new Event('change'));

		// Number input for note count
		let noteCountInput = DomHelper.createSliderWithLabelAndField(
			"noteCount",
			"Number of Notes",
			100, 1, 200, 1,
			(value) => console.log("Note count:", value)
		);
		this.genDialog.appendChild(noteCountInput.container);

		// Number input for temperature
		let temperatureInput = DomHelper.createSliderWithLabelAndField(
			"temperature",
			"Temperature",
			1.0, 0.1, 2.0, 0.1,
			(value) => console.log("Temperature:", value)
		);
		this.genDialog.appendChild(temperatureInput.container);

		// Container for the generate button
		let generateButtonContainer = DomHelper.createDivWithClass("generateButtonContainer");
		generateButtonContainer.style.display = "flex";
		generateButtonContainer.style.justifyContent = "center"; // Center button horizontally
		generateButtonContainer.style.marginBottom = "10px"; // Adds space below the container		

		let generateButton = DomHelper.createTextButton(
			"generateMelody",
			"Generate Melody",
			() => {
				this.clickGenerateMelody();
			}
		);

		generateButtonContainer.appendChild(generateButton);
		this.genDialog.appendChild(generateButtonContainer);

		// Container for variation buttons
		let variationButtonsContainer = DomHelper.createDivWithClass("variationButtonsContainer");
		variationButtonsContainer.style.justifyContent = "center"; // Center button horizontally
		variationButtonsContainer.style.marginBottom = "10px"; // Adds space below the container
		variationButtonsContainer.style.display = "flex";

		for (let i = 1; i <= 3; i++) {
			let variationButton = DomHelper.createTextButton(
				"variation" + i,
				"Variation " + i,
				() => this.switchVariation(i - 1) // Subtract 1 to convert button number to array index
			);
			variationButtonsContainer.appendChild(variationButton);
		}


		this.genDialog.appendChild(variationButtonsContainer);

		document.body.appendChild(this.genDialog); // Append the dialog to the body here
		this.hideDiv(this.genDialog); // Hide the dialog immediately after creation

		this.genDialog.style.marginTop = this.getNavBar().clientHeight + 25 + "px";

	}

	// Utility function to load JSON files
	async loadJson(jsonPath) {
		const response = await fetch(jsonPath);
		if (!response.ok) {
			throw new Error(`Could not load JSON at path: ${jsonPath}`);
		}
		return response.json();
	}

	async loadModelConfig() {
		try {
			const response = await fetch('./js/generate/model_config.json');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const config = await response.json();
			return config.models; // Return the array of models
		} catch (error) {
			console.error("Could not load the model config JSON:", error);
			return []; // Return an empty array to indicate failure
		}
	}

	/*	async clickGenerateMelody(ev) {
			try {
				this.clickStop(); // Stop any current playback
	
				if (!this.selectedModelConfig) {
					console.error("No model selected.");
					return;
				}
	
				// Load the mappings for the selected model
				const mapping = await this.loadJson(this.selectedModelConfig.mappings);
				const reverseMapping = await this.loadJson(this.selectedModelConfig.reverse_mappings);
	
				// Create a new instance of the MelodyGenerator with the loaded configurations
				const generator = new MelodyGenerator(this.selectedModelConfig, mapping, reverseMapping);
	
				getLoader().startLoad();
				getLoader().setLoadMessage("Loading LSTM model");
	
				await generator.loadModel();
	
				let midiFile = await getSongFilename();
	
				// Check if song name is null or undefined
				if (!midiFile) {
					console.error("Song name is null or undefined.");
					return; // Exit the function
				}
	
				const seedMidi = await localforage.getItem(midiFile);
	
				// Get the values from sliders
				const noteCount = parseInt(document.getElementById('noteCount').value, 10);
				const temperature = parseFloat(document.getElementById('temperature').value);
	
				// Handle if user presses Cancel or inputs an invalid number
				if (isNaN(noteCount) || noteCount <= 0 || noteCount > 100) {
					window.messageBox("Invalid number of notes. Please enter a number between 1 and 100.");
					return;
				}
	
				getLoader().setLoadMessage("Gennerating Melody ")
	
				const generatedMidi = await generator.generateMelody(seedMidi, noteCount, temperature);
				console.log("Generated melody:", generatedMidi);
	
				this.midiRecorder.recordedTracks.push(new Midi(generatedMidi).tracks[0]);
	
				getLoader().stopLoad();
				let file = await generator.combineInputWithGenerated(seedMidi, generatedMidi);
				getPlayer().loadFromlocalforage(file);
	
			} catch (error) {
				console.error("Error in clickGenerateMelody:", error);
			}
		}*/

	async clickGenerateMelody(ev) {
		try {
			this.clickStop(); // Stop any current playback

			if (!this.selectedModelConfig) {
				console.error("No model selected.");
				return;
			}

			// Load the mappings for the selected model
			const mapping = await this.loadJson(this.selectedModelConfig.mappings);
			const reverseMapping = await this.loadJson(this.selectedModelConfig.reverse_mappings);

			// Create a new instance of the MelodyGenerator with the loaded configurations
			const generator = new MelodyGenerator(this.selectedModelConfig, mapping, reverseMapping);

			await generator.loadModel();

			const midiFile = await getSongFilename();
			if (!midiFile) {
				console.error("Song name is null or undefined.");
				return; // Exit the function
			}

			const seedMidi = await localforage.getItem(midiFile);
			const noteCount = parseInt(document.getElementById('noteCount').value, 10);
			let temperature = parseFloat(document.getElementById('temperature').value);

			// Generate three variations
			const variations = [];
			for (let i = 0; i < 3; i++) {
				if (i > 0) {
					temperature = temperature + 1
				}
				getLoader().setLoadMessage(`Generating Melody Variation ${i + 1}`);
				const generatedMidi = await generator.generateMelody(seedMidi, noteCount, temperature);
				console.log(`Generated melody variation ${i + 1}:`, generatedMidi);

				// Combine seed and generated MIDI
				let combinedMidi = await generator.combineInputWithGenerated(seedMidi, generatedMidi);

				// Save combined variation to localforage

				let midiBlob = new Blob([combinedMidi], { type: "audio/midi" });

				let variationName = `combined-variation-${i + 1}-${Date.now()}.mid`;
				await localforage.setItem(variationName, midiBlob);
				variations.push(variationName);
			}

			// Load the first variation as the default
			const firstVariationMidiBlob = await localforage.getItem(variations[0]);
			const firstVariationMidiArrayBuffer = await firstVariationMidiBlob.arrayBuffer();

			const firstVariationMidi = new Midi(firstVariationMidiArrayBuffer);

			this.midiRecorder.recordedTracks.push(firstVariationMidi.tracks[firstVariationMidi.tracks.length - 1]);
			getLoader().stopLoad();

			// Load the first variation into the player
			getPlayer().loadFromlocalforage(variations[0]);

			// Store the variations in the UI instance for later access
			this.variations = variations;

		} catch (error) {
			console.error("Error in clickGenerateMelody:", error);
		}
	}

	async switchVariation(variationIndex) {
		try {
			const variationName = this.variations[variationIndex];
			if (!variationName) {
				console.error("Variation does not exist.");
				return;
			}

			// Load the selected variation
			const variationMidiBlob = await localforage.getItem(variationName);
			if (!variationMidiBlob) {
				console.error("Failed to load variation MIDI.");
				return;
			}

			const variationMidiArrayBuffer = await variationMidiBlob.arrayBuffer();
			const variationMidi = new Midi(variationMidiArrayBuffer);

			// Get the last track from the variation MIDI
			const lastTrack = variationMidi.tracks[variationMidi.tracks.length - 1];

			// Assume there is always at least one track in the recordedTracks
			// Replace the last track with the new variation's last track
			this.midiRecorder.recordedTracks.pop();
			this.midiRecorder.recordedTracks.push(lastTrack);

			// Load the variation into the player
			getPlayer().loadFromlocalforage(variationName);

			console.log(`Switched to variation ${variationIndex + 1}`);
		} catch (error) {
			console.error("Error when switching variations:", error);
		}
	}

	getRecordingDialog() {
		if (!this.recordingDialog) {
			this.recordingDialog = DomHelper.createDivWithIdAndClass(
				"recordingDialog",
				"centeredMenuDiv"
			);
			this.hideDiv(this.recordingDialog);
			document.body.appendChild(this.recordingDialog);

			let text = DomHelper.createDivWithClass(
				"centeredBigText",
				{ marginTop: "25px" },
				{ innerHTML: "Recording Controls:" }
			);

			this.recordingControlsContainer = document.createElement("div"); // Create a container for recording controls

			this.recordingDialog.appendChild(text);
			this.recordingDialog.appendChild(this.recordingControlsContainer); // Append the controls container

			if (this.hasActiveInput) {
				let recordingControls = this.getRecordingControls.bind(this)();
				recordingControls.forEach(control => {
					this.recordingControlsContainer.appendChild(control); // Append controls to the container
				});
			} else {
				let noInputText = DomHelper.createDivWithClass(
					"centeredBigText",
					{ marginTop: "25px" },
					{ innerHTML: "No MIDI input device selected" }
				);
				this.recordingControlsContainer.appendChild(noInputText); // Append the "No MIDI input device selected" message
			}
		}
		this.recordingDialog.style.marginTop =
			this.getNavBar().clientHeight + 25 + "px";
		return this.recordingDialog;
	}
	checkMIDIInput() {
		if (this.inputDevicesDiv) {
			let inputDevicesDivs = this.inputDevicesDiv.childNodes;

			for (let i = 0; i < inputDevicesDivs.length; i++) {
				if (inputDevicesDivs[i].classList.contains('selected')) {
					this.hasActiveInput = true;
					break;
				}
				else {
					this.hasActiveInput = false;
				}
			}
		}
	}
	clickRecord(ev) {
		this.checkMIDIInput();

		if (this.recordingDialogShown) {
			// If the dialog is already shown, hide it and update the controls
			this.hideDiv(this.getRecordingDialog());
			DomHelper.removeClass("selected", this.recordButton);
			this.recordingDialogShown = false;
			this.updateRecordingControls();
		} else {
			// If the dialog is not shown, show it and update the controls
			this.showDiv(this.getRecordingDialog());
			DomHelper.addClassToElement("selected", this.recordButton);
			this.recordingDialogShown = true;
			this.updateRecordingControls();
		}
	}

	resetTrackMenuDiv() {
		let menuDiv = this.getTrackMenuDiv()
		menuDiv.innerHTML = ""
		DomHelper.appendChildren(menuDiv, createTrackDivs())
	}
	newSongCallback() {
		this.resetTrackMenuDiv()
		this.clickStop()
		this.songUI.newSongCallback(getCurrentSong())
	}

	getMidiSetupDialog() {
		if (!this.midiSetupDialog) {
			this.midiSetupDialog = DomHelper.createDivWithIdAndClass(
				"midiSetupDialog",
				"centeredMenuDiv"
			)
			this.hideDiv(this.midiSetupDialog)
			document.body.appendChild(this.midiSetupDialog)

			let text = DomHelper.createDivWithClass(
				"centeredBigText",
				{ marginTop: "25px" },
				{ innerHTML: "Choose Midi device:" }
			)
			this.midiSetupDialog.appendChild(text)

			this.inputDevicesDiv = DomHelper.createDivWithClass("halfContainer")
			this.outputDevicesDiv = DomHelper.createDivWithClass("halfContainer")
			this.midiSetupDialog.appendChild(this.inputDevicesDiv)
			this.midiSetupDialog.appendChild(this.outputDevicesDiv)
		}
		let inputDevices = getMidiHandler().getAvailableInputDevices()
		if (inputDevices.length == 0) {
			this.inputDevicesDiv.innerHTML = "No MIDI input-devices found."
		} else {
			this.inputDevicesDiv.innerHTML = ""
			let inputTitle = DomHelper.createElementWithClass("row", "span")
			inputTitle.innerHTML = "Input: "
			this.inputDevicesDiv.appendChild(inputTitle)
			inputDevices.forEach(device => {
				this.inputDevicesDiv.appendChild(this.createDeviceDiv(device))
			})
		}

		let outputDevices = getMidiHandler().getAvailableOutputDevices()
		if (outputDevices.length == 0) {
			this.outputDevicesDiv.innerHTML = "No MIDI output-devices found."
		} else {
			this.outputDevicesDiv.innerHTML = ""
			let outputTitle = DomHelper.createDivWithClass("row")
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
		let deviceDiv = DomHelper.createTextButton(
			"midiInDeviceDiv" + device.id,
			device.name,
			() => {
				if (deviceDiv.classList.contains("selected")) {
					DomHelper.removeClass("selected", deviceDiv);
					getMidiHandler().clearInput(device);
				} else {
					DomHelper.addClassToElement("selected", deviceDiv);
					getMidiHandler().addInput(device);
				}
				this.updateRecordingControls(); // Update recording controls when MIDI device is selected
			}
		);
		if (getMidiHandler().isDeviceActive(device)) {
			DomHelper.addClassToElement("selected", deviceDiv);
		}

		return deviceDiv;
	}
	createOutputDeviceDiv(device) {
		let deviceDiv = DomHelper.createTextButton(
			"midiOutDeviceDiv" + device.id,
			device.name,
			() => {
				if (deviceDiv.classList.contains("selected")) {
					DomHelper.removeClass("selected", deviceDiv)
					getMidiHandler().clearOutput(device)
				} else {
					DomHelper.addClassToElement("selected", deviceDiv)
					getMidiHandler().addOutput(device)
				}
			}
		)
		if (getMidiHandler().isOutputDeviceActive(device)) {
			document
				.querySelectorAll(".midiOutDeviceDiv")
				.forEach(el =>
					el.classList.contains("selected")
						? el.classList.remove("selected")
						: null
				)
			DomHelper.addClassToElement("selected", deviceDiv)
		}
		deviceDiv.classList.add("midiOutDeviceDiv")

		return deviceDiv
	}
	getTrackMenuDiv() {
		if (!this.trackMenuDiv) {
			this.trackMenuDiv = DomHelper.createDivWithIdAndClass(
				"trackContainerDiv",
				"innerMenuDiv"
			)
			this.hideDiv(this.trackMenuDiv)
		}
		return this.trackMenuDiv
	}

	getRecordingControls() {
		let startRecordingButton = DomHelper.createGlyphiconTextButton(
			"startRecording",
			"record",
			"Start Recording",
			this.startRecording.bind(this)
		);
		startRecordingButton.classList.add("recordingControl");
		startRecordingButton.style.display = this.recordingControlsState.startRecordingVisible ? "inline" : "none";

		// Hide these buttons initially
		let pauseRecordingButton = DomHelper.createGlyphiconTextButton(
			"pauseRecording",
			"pause",
			"Pause Recording",
			this.pauseRecording.bind(this)
		);
		pauseRecordingButton.classList.add("recordingControl");
		pauseRecordingButton.style.display = this.recordingControlsState.pauseRecordingVisible ? "inline" : "none";

		let clearRecordingButton = DomHelper.createGlyphiconTextButton(
			"clearRecording",
			"remove",
			"Clear Recording",
			this.clearRecording.bind(this)
		);
		clearRecordingButton.classList.add("recordingControl");
		clearRecordingButton.style.display = this.recordingControlsState.clearRecordingVisible ? "inline" : "none";

		let saveRecordingButton = DomHelper.createGlyphiconTextButton(
			"saveRecording",
			"save",
			"Save Recording",
			this.saveRecording.bind(this)
		);
		saveRecordingButton.classList.add("recordingControl");
		saveRecordingButton.style.display = this.recordingControlsState.saveRecordingVisible ? "inline" : "none";

		let exportRecordingButton = DomHelper.createGlyphiconTextButton(
			"exportRecording",
			"export",
			"Export Recording",
			this.exportRecording.bind(this)
		);
		exportRecordingButton.classList.add("recordingControl");
		exportRecordingButton.style.display = this.recordingControlsState.exportRecordingVisible ? "inline" : "none";

		// Timer for visualizing the recording
		let timer = document.createElement("span");
		timer.id = "recordingTimer";
		timer.innerHTML = "00:00:00";

		// Red record symbol
		let recordSymbol = document.createElement("span");
		recordSymbol.id = "recordSymbol";
		recordSymbol.innerHTML = "&#9679;";
		recordSymbol.style.color = "red";
		recordSymbol.style.display = "none";

		// If a MIDI input has been selected, show the "Start Recording" button
		// Otherwise, show a message asking the user to select an input device
		if (this.hasActiveInput) {
			return [
				startRecordingButton,
				pauseRecordingButton,
				clearRecordingButton,
				saveRecordingButton,
				exportRecordingButton,
				timer,
				recordSymbol
			];
		} else {
			let message = document.createElement("p");
			message.innerHTML = "Please select a MIDI input device in the MIDI setup.";
			return [message];
		}
	}

	updateRecordingControls() {
		// Update recording controls based on the recording in progress state
		const recordingControls = this.getRecordingControls();
		recordingControls.forEach((control) => {
			const controlId = control.id;
			const controlVisible = this.recordingControlsState[controlId + "Visible"];
			control.style.display = controlVisible ? "inline" : "none";
		});
	}

	startRecording() {
		if (this.hasActiveInput) {
			this.clickStop()
			this.midiRecorder.startRecording();
			this.recordingInProgress = true; // Set recording in progress to true

			this.recordingControlsState.startRecordingVisible = true;
			this.recordingControlsState.pauseRecordingVisible = true;
			this.recordingControlsState.clearRecordingVisible = true;
			this.recordingControlsState.saveRecordingVisible = true;
			this.recordingControlsState.exportRecordingVisible = true;
			// Show the timer and the red record symbol
			document.getElementById("recordingTimer").style.display = "inline";
			document.getElementById("recordSymbol").style.display = "inline";

			const checkInterval = setInterval(() => {
				if (this.checkAndStartTimer()) {
					clearInterval(checkInterval);
				}
			}, 100);

			// Make the other buttons visible
			document.getElementById("pauseRecording").style.display = "inline";
			document.getElementById("clearRecording").style.display = "inline";
			document.getElementById("saveRecording").style.display = "inline";
		}
	}

	startTimer() {
		this.timerStartTime = Date.now();
		this.timerInterval = setInterval(this.updateTimerDisplay.bind(this), 1000);
	}

	checkAndStartTimer() {
		if (this.midiRecorder.isFirstNotePlayed() && !this.timerInterval) {
			this.startTimer();
			return true;
		}
		return false;
	}

	updateTimerDisplay() {
		const elapsedSeconds = Math.floor((Date.now() - this.timerStartTime) / 1000);
		const hours = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
		const minutes = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
		const seconds = String(elapsedSeconds % 60).padStart(2, '0');
		document.getElementById("recordingTimer").innerHTML = `${hours}:${minutes}:${seconds}`;
	}

	clearRecording() {
		this.midiRecorder.clearRecording();
		this.recordingInProgress = false; // Set recording in progress to false when cleared

		this.recordingControlsState.startRecordingVisible = true;
		this.recordingControlsState.pauseRecordingVisible = false;
		this.recordingControlsState.clearRecordingVisible = false;
		this.recordingControlsState.saveRecordingVisible = false;
		this.recordingControlsState.exportRecordingVisible = false;
		clearInterval(this.timerInterval);
		this.timerInterval = null;
		document.getElementById("recordSymbol").style.display = "none";
		// Reset the timer and hide the other buttons
		document.getElementById("recordingTimer").innerHTML = "00:00:00";
		document.getElementById("pauseRecording").style.display = "none";
		document.getElementById("saveRecording").style.display = "none";
	}

	pauseRecording() {
		this.midiRecorder.pauseRecording();
		clearInterval(this.timerInterval);
		this.timerInterval = null; // Pause the timer
	}

	async exportRecording() {
		let file = getSongFilename();
		await this.midiRecorder.saveRecording(file);
	}
	async saveRecording() {
		let file = await this.midiRecorder.saveRecordingToLocalStorage();
		console.log(file);
		clearInterval(this.timerInterval);
		this.timerInterval = null; // Pause the timer
		getPlayer().loadFromlocalforage(file);
	}

}
