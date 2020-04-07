AFRAME.registerComponent("twilight-pink", {

	// ————————————————————————————————————o Settings Settings -->
	// Settings Settings -->
	//
	schema: {
		// boxScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		// thePos: { type: "vec3", default: { x: 1, y: 1, z: -5 } },
		// newPos: { type: "vec3", default: { x: 0, y: 0, z: -8 } }
	},

	init: function() {

		const sceneEl = document.querySelector("a-scene");
		const aniAnchor = document.querySelector("#aniAnchor");

		for (let i = 0; i < 20; i++) {

			// ————————————————————————————————————o Containers for each element -->
			// Containers for each element -->
			//
			// let wrapper = document.createElement("a-entity");
			// wrapper.setAttribute("id", "wrapper-" + i);

			// ————————————————————————————————————o Need boxHldr to enable orbting -->
			// Need boxHldr to enable orbting animation -->
			//
			let boxHldr = document.createElement("a-entity");
			boxHldr.setAttribute("id", "boxHldr-" + i);
			boxHldr.setAttribute("animation", {
				property: "rotation",
				to: "0 360 0",
				easing: "linear",
				dur: 4000,
				loop: true
			});

			// ————————————————————————————————————o Boxes -->
			// Boxes - Create and assign spins -->
			//
			let posLimit = Math.random() * 27;
			// let randDur = Math.random() * 3600 + 2000;
			let theX = Math.floor(Math.random() * Math.floor(posLimit) - 5)
			let theY = Math.floor(Math.random() * Math.floor(posLimit) + 3)
			let theZ = Math.floor(Math.random() * Math.floor(-30))
			// console.log('theZ: ' + theZ)
			
			let boxer = document.createElement("a-box");
			boxer.setAttribute("id", "boxer-" + i);
			// boxer.setAttribute("position", "0 0 -10");
			boxer.setAttribute("scale", { x: 2, y: 2, z: 2 });
			boxer.setAttribute("material", { color: "#EF2D5E" });
			boxer.setAttribute("position", { x: theX, y: theY, z: theZ })

			// let sphereAnchor = document.createElement('a-sphere')
			// sphereAnchor.setAttribute("id", "sphereAnchor-" + i);
			// sphereAnchor.setAttribute("position", "0 0 -5");
			// sphereAnchor.setAttribute("color", "mediumseagreen");

			// sceneEl.appendChild(wrapper);
			sceneEl.appendChild(boxHldr); // Needs to be in the same container as aniMe, the orbit animation element
			boxHldr.appendChild(boxer);
			// boxer.appendChild(sphereAnchor);
			// wrapper.appendChild(aniMe); // Orbiting animation needs to be in the same container as boxHldr
		}
	},

	tick: function() {}
});
