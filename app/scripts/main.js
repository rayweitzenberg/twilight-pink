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
		orbiterScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		starScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		orbitColor: { type: "color", default: "#37428A" },
		staticColor: { type: "color", default: "#EF2D5E" },
	},

	init: function () {
		this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);

		let data = this.data;

		const sceneEl = document.querySelector("a-scene");
		
		this.staticConts = [];
		console.log('newRotY: ' + newRotY)
		this.oneScaler = 0;
		this.scalerEls = [];
		this.oldDiameter = undefined;
		this.oldColor
		this.oldRotation
		this.oldDurat = false
		this.duratTrigger = false
		
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

		// ————————————————————————————————————o————————————————————————————————————o Cubing -->
		// Cubing -->
		// ————————————————————————————————————o————————————————————————————————————o Cubing —>
		//
		for (let i = 0; i < 20; i++) {
			let randDur = Math.random() * 8600 + 6500;

			// ————————————————————————————————————o Need orbiterHldr to enable orbting -->
			// Need orbiterHldr to enable orbting animation -->
			//
			let orbiterHldr = document.createElement("a-entity");
			orbiterHldr.setAttribute("id", "orbiterHldr-" + i);
			orbiterHldr.setAttribute("animation", {
				property: "rotation",
				to: "0 360 0", // Orbit around Y axis
				easing: "linear",
				dur: randDur, // Random duration of orbit
				loop: true,
			});

			// ————————————————————————————————————o Boxes -->
			// Boxes - Create and assign spins -->
			//
			let orbiterX = Math.floor(Math.random() * Math.floor(-30) + 30);
			let orbiterY = Math.floor(Math.random() * Math.floor(-50) + 30);
			let orbiterZ = Math.floor(Math.random() * Math.floor(-15) - 15);

			let orbiter = document.createElement("a-box");
			orbiter.setAttribute("id", "orbiter-" + i);
			orbiter.setAttribute("scale", data.orbiterScale);
			orbiter.setAttribute("material", { color: data.orbitColor });
			orbiter.setAttribute("position", { x: orbiterX, y: orbiterY, z: orbiterZ });
			orbiter.setAttribute("animation", {
				property: "rotation",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true,
			});

			sceneEl.appendChild(orbiterHldr);
			orbiterHldr.appendChild(orbiter); // Put orbiter in a parent container to achieve orbital rotation

			// I can't kick this feelin when it hits
		}

		// ————————————————————————————————————o————————————————————————————————————o Anchored Asteroids -->
		// Anchored Asteroids -->
		// ————————————————————————————————————o————————————————————————————————————o Anchored Asteroids —>
		//
		for (let j = 0; j < 200; j++) {
			// let randDur = Math.random() * 8600 + 6500;	// Using randDur defined above to keep rotations of all stars in sync

			// ————————————————————————————————————o Need staticHldr to enable orbting -->
			// Need staticHldr to enable orbting animation -->
			//
			let staticHldr = this.staticHldr
			staticHldr = document.createElement("a-entity");
			staticHldr.setAttribute("id", "staticHldr-" + j);
			staticHldr.setAttribute("animation", {
				property: "rotation",
				// to: "0 0 0", // Orbit around Y axis
				to: {x: 0, y: newRotY, z: 0}, // Orbit around Y axis
				easing: "linear",
				dur: this.data.randDur, // Random duration of orbit
				loop: true,
			});

			let starX = Math.floor(Math.random() * (30 + 60) - 40);
			let starY = Math.floor(Math.random() * (30 + 60) - 40);
			let starZ = Math.floor(Math.random() * (30 + 60) - 40);
			let starScaleAll = 2;
			let starPos = Math.floor(Math.random() * Math.floor(-60) + 30);

			let oneStatic = this.oneStatic;
			oneStatic = document.createElement("a-box");
			oneStatic.setAttribute("id", "oneStatic-" + j);
			oneStatic.setAttribute("scale", this.data.starScale);
			// this.oneStatic.setAttribute("scale", {x: 8, y: 8, z: 8});
			oneStatic.setAttribute("material", { color: data.staticColor });
			oneStatic.setAttribute("position", {
				x: starX,
				y: starY,
				z: starZ,
			});
			oneStatic.setAttribute("animation", {
				property: "rotation",
				from: "180 180 180",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true,
			});

			oneStatic.eventHandlerFn = function () {
				console.log(self.data.tmpColor);
			};

			this.staticConts.push(staticHldr);
			this.scalerEls.push(oneStatic);
			sceneEl.appendChild(staticHldr);
			staticHldr.appendChild(oneStatic)
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

	// ————————————————————————————————————o Changing Colors on Cues -->
	// Triggered in tick() below -->
	//
	setNewRot: function (newColor) {
		for (let i = 0; i < this.staticConts.length; i++) {
			if (this.oldDurat != duratTrigger) {
				this.theDurat = Math.random() * 8600 + 6500;
				// duratTrigger = false
				console.log('this.theDurat true :' + this.theDurat)
			} else {
				this.theDurat = 8000
				console.log('this.theDurat false :' + this.theDurat)
			}
			this.staticConts[i].setAttribute("animation", {
				property: "rotation",
				to: {x: 0, y: newRotY, z: 0}, // Orbit around Y axis
				easing: "linear",
				dur: this.theDurat, // Random duration of orbit
				loop: true,
			});
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

		// ————————————————————————————————————o Changing Colors on Cues -->
		// setColor() above -->
		//
		if (this.oldRotation != newRotY) {
			this.setNewRot(newRotY);
			this.oldRotation = newRotY;
		}
	},
});

// https://localhost:9000
// https://aframe.io/docs/1.0.0/introduction/best-practices.html
