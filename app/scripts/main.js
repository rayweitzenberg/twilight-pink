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
		randDur: { type: "int", default: Math.floor(Math.random() * 8600 + 6500) },
		boxScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
		starScale: { type: "vec3", default: { x: 2, y: 2, z: 2 } }
	},

	init: function() {

		const sceneEl = document.querySelector("a-scene");
		let randDur = Math.random() * 8600 + 6500;

		// ————————————————————————————————————o————————————————————————————————————o Cubing -->
		// Cubing -->
		// ————————————————————————————————————o————————————————————————————————————o Cubing —>
		// 
		for (let i = 0; i < 60; i++) {

			let randDur = Math.random() * 8600 + 6500;

			// ————————————————————————————————————o Need boxHldr to enable orbting -->
			// Need boxHldr to enable orbting animation -->
			//
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
			let boxX = Math.floor(Math.random() * Math.floor(27) - 5)
			let boxY = Math.floor(Math.random() * Math.floor(-30) + 20)
			let boxZ = Math.floor(Math.random() * Math.floor(-30) - 20)
			
			let boxer = document.createElement("a-box");
			boxer.setAttribute("id", "boxer-" + i);
			boxer.setAttribute("scale", this.data.boxScale);
			boxer.setAttribute("material", { color: "#37428A" });
			boxer.setAttribute("position", { x: boxX, y: boxY, z: boxZ })
			boxer.setAttribute("animation", {
				property: "rotation",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true
			});

			sceneEl.appendChild(boxHldr);
			boxHldr.appendChild(boxer);	// Put boxer in a parent container to achieve orbital rotation
			
			// I can't kick this feelin when it hits
		}

		// ————————————————————————————————————o————————————————————————————————————o Anchored Asteroids -->
		// Anchored Asteroids -->
		// ————————————————————————————————————o————————————————————————————————————o Anchored Asteroids —>
		// 
		for (let j = 0; j < 500; j++) {

			// let randDur = Math.random() * 8600 + 6500;	// Using randDur defined above to keep rotations of all stars in sync
			
			let starX = Math.floor(Math.random() * (30 + 60) - 40)
			let starY = Math.floor(Math.random() * (30 + 60) - 40)
			let starZ = Math.floor(Math.random() * (30 + 60) - 40)
			let starScaleAll = 2
			let starPos = Math.floor(Math.random() * Math.floor(-60) + 30)
			
			let oneStar = document.createElement("a-box");
			oneStar.setAttribute("id", "oneStar-" + j);
			oneStar.setAttribute("scale", this.data.starScale);
			oneStar.setAttribute("material", { color: "#EF2D5E" });
			oneStar.setAttribute("position", { x: starX, y: starY, z: starZ })
			oneStar.setAttribute("animation", {
				property: "rotation",
				from: "180 180 180",
				to: "360 360 360",
				easing: "linear",
				dur: randDur,
				loop: true
			});

			sceneEl.appendChild(oneStar);
		}
	}
});
