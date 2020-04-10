// Soundtrack to the construction of this app:
// https://open.spotify.com/playlist/0OjvCj2e3dazJvpIKwTkAh?si=K1iQkdFYTnaikR19UJ1BrQ
// Sam's "The Vaccine" playlist
// Wild times we're living in
//
AFRAME.registerComponent("twilight-pink", {
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
		sadeScale: { type: "vec3", default: { x: 9, y: 8, z: 8 } },
		orbitColor: { type: "color", default: "#37428A" },
		anchColor: { type: "color", default: "#EF2D5E" },
		theColor: { type: "color", default: "#EF2D5E" },
		triggerColor: { type: "color", default: "#ffffff" },
	},

	init: function () {
		this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);

		let data = this.data;

		const sceneEl = document.querySelector("a-scene");
		this.oneScaler = 0;
		this.scalerEls = [];

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
			let boxX = Math.floor(Math.random() * Math.floor(27) - 5);
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

			// let oneStar;
			this.oneStar = document.createElement("a-box");
			this.oneStar.setAttribute("id", "oneStar-" + j);
			this.oneStar.setAttribute("scale", this.data.starScale);
			// this.oneStar.setAttribute("scale", {x: 8, y: 8, z: 8});
			this.oneStar.setAttribute("material", { color: data.anchColor });
			this.oneStar.setAttribute("position", {
				x: starX,
				y: starY,
				z: starZ,
			});
			this.oneStar.setAttribute("animation", {
				property: "rotation",
				from: "180 180 180",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true,
			});

			this.scalerEls.push(this.oneStar);
			sceneEl.appendChild(this.oneStar);
		}
	},

	// ————————————————————————————————————o Mapping audio data -->
	// Method to handle mapping of audio data -->
	scaler: function (num, in_min, in_max, out_min, out_max) {
		return (
			((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
		);
	},

	tick: function (time, deltaTime) {
		for (let i = 0; i < this.scalerEls.length; i++) {
			// let scaleTmp = (this.scaleTmp = this.scaleTmp || { x: 2, y: 2, z: 2 });
			let theScale = this.scalerEls[i].getAttribute("scale");
			// console.log('diameter: ' + diameter)
			let mapScale = this.scaler(diameter, 37, 160, 3, 5);
			theScale.x = mapScale;
			theScale.y = mapScale;
			theScale.z = mapScale;
			this.scalerEls[i].setAttribute("scale", theScale);
			// console.log('theScale: ' + theScale.x)

			this.scalerEls[i].setAttribute("material", { color: theColor });
			// cuedUp()
			// console.log('tomato  ' + theColor)
		}
	},
});

// https://localhost:9000
// https://aframe.io/docs/1.0.0/introduction/best-practices.html
