AFRAME.registerComponent("twilight-pink", {

	// ————————————————————————————————————o Settings Settings -->
	// Settings Settings -->
	//
	schema: {
		boxScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } }
	},

	init: function() {

		const sceneEl = document.querySelector("a-scene");

		for (let i = 0; i < 20; i++) {

			// ————————————————————————————————————o Need boxHldr to enable orbting -->
			// Need boxHldr to enable orbting animation -->
			//
			let randDur = Math.random() * 8600 + 6500;

			let boxHldr = document.createElement("a-entity");
			boxHldr.setAttribute("id", "boxHldr-" + i);
			boxHldr.setAttribute("animation", {
				property: "rotation",
				to: "0 360 0",	// Orbit around Y axis
				easing: "linear",
				dur: randDur,	// Random duration of orbit
				loop: true
			});

			// ————————————————————————————————————o Boxes -->
			// Boxes - Create and assign spins -->
			//			
			let theX = Math.floor(Math.random() * Math.floor(27) - 5)
			let theY = Math.floor(Math.random() * Math.floor(-30) + 20)
			let theZ = Math.floor(Math.random() * Math.floor(-30) - 20)
			
			let boxer = document.createElement("a-box");
			boxer.setAttribute("id", "boxer-" + i);
			boxer.setAttribute("scale", this.data.boxScale);
			boxer.setAttribute("material", { color: "#EF2D5E" });
			boxer.setAttribute("position", { x: theX, y: theY, z: theZ })
			boxer.setAttribute("animation", {
				property: "rotation",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true
			});

			sceneEl.appendChild(boxHldr);
			boxHldr.appendChild(boxer);
		}
	},

	tick: function() {}
});
