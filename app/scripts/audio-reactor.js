/**
 * DEMO:  Use p5.Amplitude (volume) to change the size of an ellipse
 * 		  https://p5js.org/reference/#/p5.Amplitude
 */

let cnv;
var soundFile;
let addCue;
let cuedUp;
var amplitude;
var volume;
var diameter;
let theColor = "#EF2D5E";
var smoothing = 0.01;
var smoothSlider, smoothLabel;
let newRotY = 0;
let directionRot = true
let newDurat = 0;

function preload() {
	soundFile = loadSound(
		"https://cdn.glitch.com/f5e18228-4ad6-44e5-8691-28fc5f4b1dc6%2Froyksopp.mp3?v=1586317404647"
	);
}

function setup() {
	cnv = createCanvas(100, 100);
	// ————————————————————————————————————o Play Button -->
	// Play Button -->
	//
	let button;
	button = createButton("PLAY");
	button.id("playBtn");
	button.mouseClicked(function () {
		if (soundFile.isPlaying()) {
			soundFile.stop()
			button.html("PLAY")
			theColor = "#EF2D5E";
		} else {
			soundFile.play()
			button.html("STOP")
		}
	});

	cnv.html(text, true);

	// create a new p5.Amplitude. Optionally, give it a 'smoothing' value betw 0.0 and .999
	amplitude = new p5.Amplitude();

	// smoothSlider = createSlider(0.0, 99.9, smoothing * 100);
	// smoothLabel = createP("Smoothing: " + smoothing);

	// ————————————————————————————————————o Audio Cues -->
	// Audio Cues -->
	//
	soundFile.addCue(47.7, cuedUp, "cue01");
	soundFile.addCue(63.2, cuedUp, "cue02");
	soundFile.addCue(102.6, cuedUp, "cue03");
	soundFile.addCue(110.2, cuedUp, "cue03b");
	soundFile.addCue(141.6, cuedUp, "cue04");
	soundFile.addCue(157.4, cuedUp, "cue05");
	soundFile.addCue(172.6, cuedUp, "cue06");
	
	// soundFile.addCue(5, cuedUp, "tempCue01");
	// soundFile.addCue(15, cuedUp, "tempCue02");
	// soundFile.addCue(25, cuedUp, "tempCue03");
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
			console.log("cue01: deepskyblue");
			break;
		case "cue03":
			theColor = "#EF2D5E";
			console.log("cue03: #EF2D5E");
			break;
		case "cue03b":
			theColor = "tomato";
			directionRot = false; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			console.log("cue03b: tomato");
			break;
		case "cue04":
			theColor = "deepskyblue";
			directionRot = true; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			console.log("cue04: deepskyblue");
			break;
		case "cue05":
			theColor = "tomato";
			directionRot = false; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			console.log("cue05: tomato");
			break;
		case "cue06":
			theColor = "#EF2D5E";
			directionRot = false; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			newDurat = Math.random() * 11600 + 8500;
			console.log("cue06: #EF2D5");
			break;

		// ————————————————————————————————————o testing cue points -->
		// testing cue points -->
		//
		case "tempCue01":
			theColor = "deepskyblue";
			directionRot = false; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			break;
		case "tempCue02":
			theColor = "tomato";
			directionRot = true; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			break;
		case "tempCue03":
			theColor = "deepskyblue";
			directionRot = false; // ——————————————————o Rotation -->
			console.log("directionRot: " + directionRot);
			break;
	}
};

function draw() {
	// background(50);

	// get volume from the amplitude process
	volume = amplitude.getLevel();

	// Change size based on volume. First, map to useful values.
	diameter = map(volume, 0, 1.0, 25, 400);

	// // change smoothing
	// smoothing = smoothSlider.value() / 100;
	// smoothLabel.html("Smoothing: " + smoothing);
	// amplitude.smooth(smoothing);
}

// 	// 'n' keypress toggles normalize on/off
// 	if (e.keyCode == 78) {
// 		amplitude.toggleNormalize();
// 	}
// }
