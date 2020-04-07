AFRAME.registerComponent("twilight-pink", {

	// ————————————————————————————————————o Settings Settings -->
	// Settings Settings -->
	//
	schema: {
		randDur: { type: "int", default: Math.floor(Math.random() * 8600 + 6500) },
		boxScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		starScaleAll: { type: "int", default: 2 }
		starScale: { type: "vec3", default: { x: starScaleAll, y: starScaleAll, z: starScaleAll } }
	},

	init: function() {

		const sceneEl = document.querySelector("a-scene");


		// ————————————————————————————————————o————————————————————————————————————o Cubing -->
		// Cubing -->
		// ————————————————————————————————————o————————————————————————————————————o Cubing —>
		// 
		for (let i = 0; i < 20; i++) {

			// ————————————————————————————————————o Need boxHldr to enable orbting -->
			// Need boxHldr to enable orbting animation -->
			//
			// let randDur = Math.random() * 8600 + 6500;

			let boxHldr = document.createElement("a-entity");
			boxHldr.setAttribute("id", "boxHldr-" + i);
			boxHldr.setAttribute("animation", {
				property: "rotation",
				to: "0 360 0",	// Orbit around Y axis
				easing: "linear",
				dur: this.data.randDur,	// Random duration of orbit
				loop: true
			});

			// ————————————————————————————————————o Boxes -->
			// Boxes - Create and assign spins -->
			//			
			let boxX = Math.floor(Math.random() * Math.floor(27) - 5)
			let boxY = Math.floor(Math.random() * Math.floor(-30) + 20)
			let boxZ = Math.floor(Math.random() * Math.floor(-30) - 20)
			
			let boxer = document.createElement("a-box");
			boxer.setAttribute("id", "boxer-" + i);
			boxer.setAttribute("scale", this.data.boxScale);
			boxer.setAttribute("material", { color: "#EF2D5E" });
			boxer.setAttribute("position", { x: boxX, y: boxY, z: boxZ })
			boxer.setAttribute("animation", {
				property: "rotation",
				to: "360 360 360",
				easing: "linear",
				dur: this.data.randDur,
				loop: true
			});

			sceneEl.appendChild(boxHldr);
			boxHldr.appendChild(boxer);
		}

		// ————————————————————————————————————o————————————————————————————————————o Starfield -->
		// Starfield -->
		// ————————————————————————————————————o————————————————————————————————————o Starfield —>
		// 
		for (let j = 0; j < 500; j++) {
			
			let starX = Math.floor(Math.random() * Math.floor(-60) + 30)
			let starY = Math.floor(Math.random() * Math.floor(-60) + 30)
			let starZ = Math.floor(Math.random() * Math.floor(-60) + 30)
			let starPos = Math.floor(Math.random() * Math.floor(-60) + 30)
			
			let oneStar = document.createElement("a-box");
			oneStar.setAttribute("id", "oneStar-" + j);
			oneStar.setAttribute("scale", this.data.starScale);
			oneStar.setAttribute("material", { color: "#EF2D5E" });
			// oneStar.setAttribute("position", { x: starX, y: starY, z: starZ })
			oneStar.setAttribute("position", { x: starPos, y: starPos, z: starPos })

			sceneEl.appendChild(oneStar);
		}
	},

	tick: function() {}
});
