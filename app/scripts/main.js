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
		minorityScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		starScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		minorityColor: { type: "color", default: "#37428A" },
		staticColor: { type: "color", default: "#EF2D5E" },
		grandTotalRot: { type: "int", default: 0 },
		countingRot: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
	},

	init: function () {
		this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);

		let data = this.data;

		const sceneEl = document.querySelector("a-scene");

		this.minorityConts = [];
		this.staticConts = [];
		this.oneScaler = 0;
		this.scalerEls = [];
		this.oldDiameter = undefined;
		this.oldColor;
		// this.countingRot = 0;
		this.directionRot = false;

		let randDur = Math.random() * 8600 + 6500;
		this.injectRot = 180;

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

		// ————————————————————————————————————o————————————————————————————————————o Low earth wOrbit -->
		// Low earth wOrbit -->
		// ————————————————————————————————————o————————————————————————————————————o Low earth wOrbit —>
		//
		for (let i = 0; i < 20; i++) {
			let randDur = Math.random() * 8600 + 6500;

			// ————————————————————————————————————o Need minorityHldr to enable orbting -->
			// Need minorityHldr to enable orbting animation -->
			//
			let minorityHldr = document.createElement("a-entity");
			minorityHldr.setAttribute("id", "minorityHldr-" + i);
			minorityHldr.setAttribute("animation", {
				property: "rotation",
				to: "0 360 0", // Orbit around Y axis
				easing: "linear",
				dur: randDur, // Random duration of orbit
				loop: true,
			});

			// minorityHldr.object3D.rotation.set(
			// 	THREE.Math.degToRad(0),
			// 	THREE.Math.degToRad(0),
			// 	THREE.Math.degToRad(0)
			// );

			// el.object3D.rotation.x += Math.PI;

			// ————————————————————————————————————o Boxes -->
			// Boxes - Create and assign spins -->
			//
			let minorityX = Math.floor(Math.random() * Math.floor(-30) + 30);
			let minorityY = Math.floor(Math.random() * Math.floor(-50) + 30);
			let minorityZ = Math.floor(Math.random() * Math.floor(-15) - 15);

			let minority = document.createElement("a-box");
			minority.setAttribute("id", "minority-" + i);
			minority.setAttribute("scale", data.minorityScale);
			minority.setAttribute("material", { color: data.minorityColor });
			minority.setAttribute("position", {
				x: minorityX,
				y: minorityY,
				z: minorityZ,
			});
			minority.setAttribute("animation", {
				property: "rotation",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true,
			});

			// this.minorityConts.push(minorityHldr)
			sceneEl.appendChild(minorityHldr);
			minorityHldr.appendChild(minority); // Put minority in a parent container to achieve orbital rotation

			// I can't kick this feelin when it hits
		}

		// ————————————————————————————————————o————————————————————————————————————o Majority Cubes -->
		// Majority Cubes -->
		// ————————————————————————————————————o————————————————————————————————————o Majority Cubes —>
		//
		for (let j = 0; j < 200; j++) {
			// let randDur = Math.random() * 8600 + 6500;	// Using randDur defined above to keep rotations of all stars in sync

			// ————————————————————————————————————o Need majorHldr to enable orbting -->
			// Need majorHldr to enable orbting animation -->
			//
			let majorHldr = this.majorHldr;
			majorHldr = document.createElement("a-entity");
			majorHldr.setAttribute("id", "majorHldr-" + j);
			majorHldr.setAttribute("animation", {
				property: "rotation",
				// to: "0 0 0", // Orbit around Y axis
				to: { x: 0, y: newRotY, z: 0 }, // Orbit around Y axis
				easing: "linear",
				dur: this.data.randDur, // Random duration of orbit
				loop: true,
			});

			let starX = Math.floor(Math.random() * (30 + 60) - 40);
			let starY = Math.floor(Math.random() * (30 + 60) - 40);
			let starZ = Math.floor(Math.random() * (30 + 60) - 40);

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
			// oneStatic.setAttribute("animation", {
			// 	property: "rotation",
			// 	from: "180 180 180",
			// 	to: "360 360 360",
			// 	easing: "linear",
			// 	dur: randDur,
			// 	loop: true,
			// });

			oneStatic.object3D.rotation.set(
				THREE.Math.degToRad(0),
				THREE.Math.degToRad(360),
				THREE.Math.degToRad(0)
			);

			oneStatic.eventHandlerFn = function () {
				console.log(self.data.tmpColor);
			};

			this.staticConts.push(majorHldr);
			this.scalerEls.push(oneStatic);
			sceneEl.appendChild(majorHldr);
			majorHldr.appendChild(oneStatic);
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

	// // ————————————————————————————————————o Send "static cubes" into Orbit on Cues -->
	// // Triggered in tick() below -->
	// //
	// setNewRot: function (changeRot) {
	// 	let changingRot = this.data.countingRot.y;
	// 	// console.log('changingRot: ' + changingRot)

	// 	// ——————————————————o Set Direction of Orbit -->
	// 	if (directionRot) {
	// 		changingRot = 0;
	// 	} else {
	// 		changingRot = 360;
	// 	}

	// 	for (let i = 0; i < this.staticConts.length; i++) {
	// 		this.staticConts[i].setAttribute("animation", {
	// 			property: "rotation",
	// 			// to: "0 360 0",
	// 			to: {
	// 				x: this.data.countingRot.x,
	// 				y: changingRot,
	// 				z: this.data.countingRot.z,
	// 			},
	// 			easing: "linear",
	// 			dur: 12000,
	// 			loop: true,
	// 		});
	// 	}
	// },

	tick: function (time, deltaTime) {
		for (let i = 0; i < this.staticConts.length; i++) {
			this.staticConts[i].object3D.rotation.y += 0.01;
		}

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

		// ————————————————————————————————————o Send "static cubes" into Orbit on Cues -->
		// setNewRot() above -->
		//
		// this.setNewRot();
	},
});

// ————————————————————————————————————o Loading Screen Functionality -->
// Loading Screen Functionality -->
//
function loadScene() {
	if (document.getElementById("defaultCanvas0")) {
		let theScene = document.getElementById("theScene");
		theScene.classList.add("loaded");

		// Animate Button Text as Progress Indicator
		//
		$(".loading").animate({ opacity: "0" }, 100, function () {
			$(".enter").animate({ opacity: "1" }, 500);
		});

		// Fade out Splash Page
		//
		let fadeMsg = document.getElementById("splashPg");
		fadeMsg.onclick = () => {
			fadeMsg.classList.add("fadeOut");
			document.body.classList.add("unfade");
			setTimeout(function () {
				fadeMsg.style.display = "none";
			}, 1000);
		};
	} else {
		setTimeout(loadScene, 90);
	}
}
loadScene();

// ————————————————————————————————————o Set Loading Screen Height -->
// Set Loading Screen Height -->
// Accounts for the space stolen on mobile browsers
//
function setLoadingHt() {
	if (document.getElementById("splashPg")) {
		document.getElementById("splashPg").style.height =
			window.innerHeight + "px";
	} else {
		setTimeout(setLoadingHt, 90);
	}
}
setLoadingHt();

// https://localhost:9000
// https://aframe.io/docs/1.0.0/introduction/best-practices.html
