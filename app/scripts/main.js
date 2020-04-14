// Soundtrack to the construction of this app:
// https://open.spotify.com/playlist/0OjvCj2e3dazJvpIKwTkAh?si=K1iQkdFYTnaikR19UJ1BrQ
// Sam's "The Vaccine" playlist
// Wild times we're living in
//
AFRAME.registerComponent("sky-walking", {
	// ————————————————————————————————————o Settings Settings -->
	// Settings Settings -->
	//
	schema: {
		randDur: {
			type: "int",
			default: Math.floor(Math.random() * 8600 + 6500),
		},
		boxScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		starScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		orbitColor: { type: "color", default: "#37428A" },
		staticColor: { type: "color", default: "#EF2D5E" },
	},

	init: function () {
		this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);

		let data = this.data;

		const sceneEl = document.querySelector("a-scene");
		this.oneScaler = 0;
		this.scalerEls = [];
		this.tempColor = "#EF2D5E";
		this.oldDiameter = undefined;
		this.oldColor = 0;

		let randDur = Math.random() * 8600 + 6500;

		// ————————————————————————————————————o Trigger Audio Play -->
		// Trigger Audio Play -->
		//
		// sceneEl.addEventListener("triggerdown", function (evt) {
		// 	soundFile.play();
		// 	console.log("Trigger Down");
		// });
		sceneEl.addEventListener("enter-vr", function () {
			soundFile.play();
		});
		// sceneEl.setAttribute("fog", { type: linear });

		// ————————————————————————————————————o————————————————————————————————————o Cubing -->
		// Cubing -->
		// ————————————————————————————————————o————————————————————————————————————o Cubing —>
		//
		for (let i = 0; i < 20; i++) {
			let randDur = Math.random() * 8600 + 6500;

			// ————————————————————————————————————o Need boxHldr to enable orbting -->
			// Need boxHldr to enable orbting animation -->
			//
			let boxHldr = document.createElement("a-entity");
			boxHldr.setAttribute("id", "boxHldr-" + i);
			boxHldr.setAttribute("animation", {
				property: "rotation",
				to: "0 360 0", // Orbit around Y axis
				easing: "linear",
				dur: randDur, // Random duration of orbit
				loop: true,
			});

			// ————————————————————————————————————o Boxes -->
			// Boxes - Create and assign spins -->
			//
			let boxX = Math.floor(Math.random() * Math.floor(27) - 25);
			let boxY = Math.floor(Math.random() * Math.floor(-30) + 20);
			let boxZ = Math.floor(Math.random() * Math.floor(-30) - 20);

			let boxer = document.createElement("a-box");
			boxer.setAttribute("id", "boxer-" + i);
			boxer.setAttribute("scale", data.boxScale);
			boxer.setAttribute("material", { color: data.orbitColor });
			boxer.setAttribute("position", { x: boxX, y: boxY, z: boxZ });
			boxer.setAttribute("animation", {
				property: "rotation",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true,
			});

			sceneEl.appendChild(boxHldr);
			boxHldr.appendChild(boxer); // Put boxer in a parent container to achieve orbital rotation

			// I can't kick this feelin when it hits
		}

		// ————————————————————————————————————o————————————————————————————————————o Anchored Asteroids -->
		// Anchored Asteroids -->
		// ————————————————————————————————————o————————————————————————————————————o Anchored Asteroids —>
		//
		for (let j = 0; j < 200; j++) {
			// let randDur = Math.random() * 8600 + 6500;	// Using randDur defined above to keep rotations of all stars in sync

			let starX = Math.floor(Math.random() * (30 + 60) - 40);
			let starY = Math.floor(Math.random() * (30 + 60) - 40);
			let starZ = Math.floor(Math.random() * (30 + 60) - 40);
			let starScaleAll = 2;
			let starPos = Math.floor(Math.random() * Math.floor(-60) + 30);

			let oneStar = this.oneStar;
			oneStar = document.createElement("a-box");
			oneStar.setAttribute("id", "oneStar-" + j);
			oneStar.setAttribute("scale", this.data.starScale);
			// this.oneStar.setAttribute("scale", {x: 8, y: 8, z: 8});
			oneStar.setAttribute("material", { color: data.staticColor });
			oneStar.setAttribute("position", {
				x: starX,
				y: starY,
				z: starZ,
			});
			oneStar.setAttribute("animation", {
				property: "rotation",
				from: "180 180 180",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true,
			});

			oneStar.eventHandlerFn = function () {
				console.log(self.data.tmpColor);
			};

			this.scalerEls.push(oneStar);
			sceneEl.appendChild(oneStar);
		}
	},

	// ————————————————————————————————————o Mapping audio data -->
	// Method to handle mapping of audio data -->
	scaler: function (num, in_min, in_max, out_min, out_max) {
		return (
			((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
		);
	},

	// ————————————————————————————————————o Animating scale -->
	// Animating scale based on sound volume -->
	//
	setDiameter: function (diameter) {
		for (let i = 0; i < this.scalerEls.length; i++) {
			// console.log('diameter: ' + diameter)
			let mapScale = this.scaler(diameter, 37, 160, 3, 5);
			this.scalerEls[i].setAttribute("scale", {
				x: mapScale,
				y: mapScale,
				z: mapScale,
			});
		}
	},

	// ————————————————————————————————————o Changing Colors on Cues -->
	// Triggered in tick() below -->
	//
	setColor: function (newColor) {
		for (let i = 0; i < this.scalerEls.length; i++) {
			this.scalerEls[i].setAttribute("material", { color: newColor });
		}
	},

	tick: function (time, deltaTime) {
		// ————————————————————————————————————o Animating scale -->
		// setDiameter() above -->
		//
		if (this.oldDiameter != diameter || this.oldDiameter != 25) {
			this.setDiameter(diameter);
			this.oldDiameter = diameter;
		}

		// ————————————————————————————————————o Changing Colors on Cues -->
		// setColor() above -->
		//
		if (this.oldColor != theColor) {
			this.setColor(theColor);
			this.oldColor = theColor;
		}
	},
});

// https://localhost:9000
// https://aframe.io/docs/1.0.0/introduction/best-practices.html
