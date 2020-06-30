/**
 * DEMO:  Use p5.Amplitude (volume) to change the size of an ellipse
 * 		  https://p5js.org/reference/#/p5.Amplitude
 */

let cnv;
var royksopp;
let addCue;
let cuedUp;
var amplitude;
var volume;
var diameter;
let theColor = "#EF2D5E";
let newRotY = 0;
let directionRot = 0;
let newDurat = 0;

function preload() {
	royksopp = loadSound(
		"//neoneon.one/sky-walking/images/royksopp.mp3"
	);
}

function setup() {
	cnv = createCanvas(100, 100);

	// ————————————————————————————————————o Play Button -->
	// Play Button -->
	//
	let playSound = () => {
		if (royksopp.isPlaying()) {
			royksopp.stop();
			button.html("PLAY");
			theColor = "#EF2D5E";
			directionRot = 0;
		} else {
			royksopp.play();
			button.html("STOP");
		}
	};

	// masterVolume(0.02)
	// royksopp.play();

	// ————————————————————————————————————o Reload Scene at End -->
	// Reload Scene at the End of the Track -->
	//
	royksopp.onended(function () {
		let reload = window.location.href;
		if (reload.indexOf("?") > -1) {
			reload += "&reloaded";
		} else {
			reload += "?reloaded";
		}
		// window.location.href = reload;

		directionRot = 0;
		button.html("PLAY");
	});

	let button;
	button = createButton("PLAY");
	button.id("playBtn");
	button.mouseClicked(playSound);

	cnv.html(text, true);

	amplitude = new p5.Amplitude();

	// ————————————————————————————————————o Audio Cues -->
	// Audio Cues -->
	//
	royksopp.addCue(47.7, cuedUp, "cue01");
	royksopp.addCue(63.2, cuedUp, "cue02");
	royksopp.addCue(102.6, cuedUp, "cue03");
	royksopp.addCue(110.2, cuedUp, "cue03b");
	royksopp.addCue(141.6, cuedUp, "cue04");
	royksopp.addCue(157.4, cuedUp, "cue05");
	royksopp.addCue(172.6, cuedUp, "cue06");

	// royksopp.addCue(5, cuedUp, "tempCue01");
	// royksopp.addCue(15, cuedUp, "tempCue02");
	// royksopp.addCue(25, cuedUp, "tempCue03");
}

// ————————————————————————————————————o Audio Cue Logic -->
// Audio Cue Logic -->
//
cuedUp = (val) => {
	switch (val) {
		case "cue01":
			theColor = "deepskyblue";
			console.log("cue01: deepskyblue");
			break;
		case "cue02":
			theColor = "tomato";
			console.log("cue02: tomato");
			break;
		case "cue03":
			theColor = "#EF2D5E";
			console.log("cue03: #EF2D5E");
			break;
		case "cue03b":
			theColor = "tomato";
			directionRot = 1; // ——————————————————o Rotation -->
			console.log("cue03b: tomato + directionRot: " + directionRot);
			break;
		case "cue04":
			theColor = "deepskyblue";
			directionRot = 0; // ——————————————————o Rotation -->
			console.log("cue04: deepskyblue + directionRot: " + directionRot);
			break;
		case "cue05":
			theColor = "tomato";
			directionRot = 2; // ——————————————————o Rotation -->
			console.log("cue05: tomato + directionRot: " + directionRot);
			break;
		case "cue06":
			theColor = "#EF2D5E";
			directionRot = 2; // ——————————————————o Rotation -->
			newDurat = Math.random() * 11600 + 8500;
			console.log("cue06: #EF2D5E + directionRot: " + directionRot);
			break;

		// ————————————————————————————————————o testing cue points -->
		// testing cue points -->
		//
		case "tempCue01":
			theColor = "deepskyblue";
			directionRot = 2; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			break;
		case "tempCue02":
			theColor = "tomato";
			directionRot = 0; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			break;
		case "tempCue03":
			theColor = "deepskyblue";
			directionRot = 3; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			break;
	}
};

function draw() {
	// get volume from the amplitude process
	volume = amplitude.getLevel();

	// Change size based on volume. First, map to useful values.
	diameter = map(volume, 0, 1.0, 25, 400);
}
