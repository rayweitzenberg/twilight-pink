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
let theColor;
var smoothing = 0.01;
var smoothSlider, smoothLabel;

function preload() {
	soundFile = loadSound(
		"https://cdn.glitch.com/f5e18228-4ad6-44e5-8691-28fc5f4b1dc6%2Froyksopp.mp3?v=1586317404647"
	);
}

function setup() {
	cnv = createCanvas(100, 100);

	cnv.mouseClicked(function () {
		soundFile.play();
	});

	let button
	button = createButton('Play Musics');
	button.position(25, windowHeight - 59);
	button.style('padding', '5px 10px');
	button.style('font-size', '20px');
	button.style('border-radius', '8px')
	button.mouseClicked(function() {
		soundFile.play();
	});

	cnv.html(text, true)

	// create a new p5.Amplitude. Optionally, give it a 'smoothing' value betw 0.0 and .999
	amplitude = new p5.Amplitude(smoothing);

	smoothSlider = createSlider(0.0, 99.9, smoothing * 100);
	// smoothLabel = createP("Smoothing: " + smoothing);

	soundFile.addCue(47.9, cuedUp, "cue01");
	soundFile.addCue(63.6, cuedUp, "cue02");
	soundFile.addCue(102.6, cuedUp, "cue03");
	soundFile.addCue(141.6, cuedUp, "cue04");
	soundFile.addCue(157.6, cuedUp, "cue05");
	soundFile.addCue(172.6, cuedUp, "cue06");
}

cuedUp = (val) => {
	switch (val) {
		case "cue01":
			theColor = "tomato";
			console.log("47.9");
			break;
		case "cue02":
			theColor = "deepskyblue";
			console.log("63.6");
			break;
		case "cue03":
			theColor = "#EF2D5E";
			console.log("102.6");
			break;
		case "cue04":
			theColor = "tomato";
			console.log("141.6");
			break;
		case "cue05":
			theColor = "deepskyblue";
			console.log("157.6");
			break;
		case "cue06":
			theColor = "#EF2D5E";
			console.log("172.6");
			break;
	}
};

function draw() {
	// background(50);

	// get volume from the amplitude process
	volume = amplitude.getLevel();

	// Change size based on volume. First, map to useful values.
	diameter = map(volume, 0, 1.0, 25, 400);
	// ellipse(width / 2, height / 2, diameter, diameter);

	// // change smoothing
	// smoothing = smoothSlider.value() / 100;
	// // smoothLabel.html("Smoothing: " + smoothing);
	// amplitude.smooth(smoothing);
}

// 	// 'n' keypress toggles normalize on/off
// 	if (e.keyCode == 78) {
// 		amplitude.toggleNormalize();
// 	}
// }