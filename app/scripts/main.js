AFRAME.registerComponent("boxes-setup", {
	schema: {
		boxScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		thePos: { type: "vec3", default: { x: 1, y: 1, z: -5 } },
		newPos: { type: "vec3", default: { x: 0, y: 0, z: -8 } }
	},

	init: function() {
		// console.log(this.el);

		const sceneEl = document.querySelector("a-scene");
		const protoBox = sceneEl.querySelector("#oneBox");
		console.log("sceneEl: " + sceneEl);

		// const boxRotat = protoBox.components.animation__rotation;

		// const posLimit = 17;
		const scaleLimit = 3;

		for (let i = 0; i < 1; i++) {
			// let posLimit = Math.random() * 27;
			// let randDur = Math.random() * 3600 + 2000;

			let wrapper = document.createElement("a-entity");
			wrapper.setAttribute("id", "wrapper-" + i);

			let inner = document.createElement("a-entity");
			inner.setAttribute("id", "inner-" + i);
			inner.setAttribute("position", "0 0 -5");

			let boxer = document.createElement("a-box");
			boxer.setAttribute("id", "boxer-" + i);
			boxer.setAttribute("scale", this.data.boxScale);
			boxer.setAttribute("material", { color: "#EF2D5E" });

            let aniMe = sceneEl.querySelector("#rotator");
            aniMe.setAttribute('to', '0 360 0')

			sceneEl.appendChild(wrapper);
			wrapper.appendChild(inner);
			inner.appendChild(boxer);
			wrapper.appendChild(aniMe);
		}
	},

	tick: function() {}
});
