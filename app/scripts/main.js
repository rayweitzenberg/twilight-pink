AFRAME.registerComponent("twilight-pink", {

	// ————————————————————————————————————o Settings Settings -->
	// Settings Settings -->
	//
	schema: {
		boxScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		thePos: { type: "vec3", default: { x: 1, y: 1, z: -5 } },
		newPos: { type: "vec3", default: { x: 0, y: 0, z: -8 } }
	},

	init: function() {

		const sceneEl = document.querySelector("a-scene");

		for (let i = 0; i < 20; i++) {
			let posLimit = Math.random() * 27;
			let randDur = Math.random() * 3600 + 2000;

			// ————————————————————————————————————o Containers for each element -->
			// Containers for each element -->
			//
			let wrapper = document.createElement("a-entity");
			wrapper.setAttribute("id", "wrapper-" + i);

			// ————————————————————————————————————o Need inner to enable orbting -->
			// Need inner to enable orbting animation -->
			//
			let inner = document.createElement("a-entity");
			inner.setAttribute("id", "inner-" + i);
			inner.setAttribute("position", "0 0 -5");

			// ————————————————————————————————————o Boxes -->
			// Boxes - Create and assign spins -->
			//
			let boxer = document.createElement("a-box");
			boxer.setAttribute("id", "boxer-" + i);
			boxer.setAttribute("scale", this.data.boxScale);
			boxer.setAttribute("material", { color: "#EF2D5E" });
			boxer.setAttribute("position", {
				x: Math.random() * Math.floor(posLimit) - 5,
				y: Math.random() * Math.floor(posLimit) + 3,
				z: Math.random() * Math.floor(-30)
			});
			boxer.setAttribute("animation", {
				property: "rotation",
				to: { x: 0, y: 360, z: 360 },
				easing: "easeInBounce",
				dur: randDur,
				loop: true
			});

			// ————————————————————————————————————o Orbiting Functionality -->
			// Orbiting Functionality -->
			//
			let aniMe = sceneEl.querySelector("#rotator-" + i);
			aniMe.setAttribute("attribute", "rotation");
			aniMe.setAttribute("to", "0 360 0");
			aniMe.setAttribute("dur", Math.random() * 12000 + 4000); // Orbit Speed
			aniMe.setAttribute("easing", "linear");
			aniMe.setAttribute("repeat", "indefinite");

			sceneEl.appendChild(wrapper);
			wrapper.appendChild(inner); // Needs to be in the same container as aniMe, the orbit animation element
			inner.appendChild(boxer);
			wrapper.appendChild(aniMe); // Orbiting animation needs to be in the same container as inner
		}
	},

	tick: function() {}
});
