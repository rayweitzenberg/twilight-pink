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
		majorColor: { type: "color", default: "#EF2D5E" },
	},

	init: function () {
		this.tick = AFRAME.utils.throttleTick(this.tick, 10, this); // Slow tick() to 10ms

		let data = this.data;

		const sceneEl = document.querySelector("a-scene");
		this.minorityConts = [];
		this.majorityConts = [];
		this.scalerEls = [];
		this.oldDiameter = undefined;
		this.oldColor;
		let randDur = Math.random() * 8600 + 6500;
		this.randSpeed = []	// Random Speeds for Majority Orbiters
		for (let spd = 0; spd < 4; spd++) {
			this.randSpeed.push(Math.random() * (0.0026 - 0.0094) + 0.0094)
			console.log('this.randSpeed: ' + this.randSpeed)
		}

		// ————————————————————————————————————o Trigger Audio Play -->
		// Trigger Audio Play -->
		//
		sceneEl.addEventListener("enter-vr", function () {
			royksopp.play();
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

			// ————————————————————————————————————o Need majorHldr to enable orbting -->
			// Need majorHldr to enable orbting animation -->
			//
			let majorHldr = this.majorHldr;
			majorHldr = document.createElement("a-entity");
			majorHldr.setAttribute("id", "majorHldr-" + j);
			majorHldr.setAttribute("animation", {
				property: "rotation",
				to: { x: 0, y: newRotY, z: 0 }, // Orbit around Y axis
				easing: "linear",
				dur: this.data.randDur, // Random duration of orbit
				loop: true,
			});

			let starX = Math.floor(Math.random() * (30 + 60) - 40);
			let starY = Math.floor(Math.random() * (30 + 60) - 40);
			let starZ = Math.floor(Math.random() * (30 + 60) - 40);

			let oneMajor = this.oneMajor;
			oneMajor = document.createElement("a-box");
			oneMajor.setAttribute("id", "oneMajor-" + j);
			oneMajor.setAttribute("scale", this.data.starScale);
			oneMajor.setAttribute("material", { color: data.majorColor });
			oneMajor.setAttribute("position", {
				x: starX,
				y: starY,
				z: starZ,
			});


			// ————————————————————————————————————o Pivoting Majority Cubes -->
			// Pivoting Majority Cubes -->
			//
			oneMajor.setAttribute("animation", {
				property: "rotation",
				from: "180 180 180",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true,
			});

			oneMajor.eventHandlerFn = function () {
				console.log(self.data.tmpColor);
			};

			this.majorityConts.push(majorHldr);
			this.scalerEls.push(oneMajor);
			sceneEl.appendChild(majorHldr);
			majorHldr.appendChild(oneMajor);
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

		// ————————————————————————————————————o Rotate Majority -->
		// Rotate Majority -->
		//
		if (directionRot == 0) {
			// You Can't Rotate Bruce

		} else if (directionRot == 1) {
			for (let i = 0; i < this.majorityConts.length; i++) {
				this.majorityConts[i].object3D.rotation.y += 0.006;
			}

		// ————————————————————————————————————o Multiple Orbit Speeds -->
		// Set Multiple Majority Orbit Speeds -->
		//
		} else if (directionRot == 2) {
			for (let i = 0; i < this.randSpeed.length; i++) {
				for (let j = 0; j < this.majorityConts.length; j++) {
					if (j < 49) {
						this.majorityConts[j].object3D.rotation.y += this.randSpeed[0]
					} else if (j >= 50 && j < 99) {
						this.majorityConts[j].object3D.rotation.y += this.randSpeed[1]
					} else if (j >= 100 && j < 150) {
						this.majorityConts[j].object3D.rotation.y += this.randSpeed[2] * -1
					} else if (j >= 150 && j < 200) {
						this.majorityConts[j].object3D.rotation.y += this.randSpeed[3]
					}
				}
				this.majorityConts[i].object3D.rotation.y += 0.006;
			}
		} else {
			for (let i = 0; i < this.majorityConts.length; i++) {
				this.majorityConts[i].object3D.rotation.y -= 0.006;
			}
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

		// Enter Cubeville
		//
		let fadeMsg = document.getElementById("splashPg");
		$('.enter').click(function() {
			fadeMsg.classList.add("fadeOut");
			document.body.classList.add("unfade");
			setTimeout(function () {
				fadeMsg.style.display = "none";
			}, 1000);
		})
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
