//https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle
function main() {
	const tiles = document.querySelectorAll(".tile");
	const grid = document.querySelector(".tile-grid");

	//als geen grid
	if (!grid) return;

	function updateTilesLayout() {
		const isDesktop = window.innerWidth >= 768;
		const rect = grid.getBoundingClientRect();

		const centerX = isDesktop ? rect.width / 2 : -90;
		const centerY = isDesktop ? rect.height + 130 : rect.height / 2;

		const radius = 310;
		const angleStart = isDesktop ? 0 : -Math.PI / 2;
		const angleEnd = isDesktop ? Math.PI : Math.PI / 2;
		const angleStep =
			((angleEnd - angleStart) / (tiles.length + 1)) * (isDesktop ? -1 : 1);

		tiles.forEach((tile, index) => {
			const angle = angleStart + (index + 1) * angleStep;
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			const deg = angle * (180 / Math.PI) + 90;

			tile.style.left = `${x}px`;
			tile.style.top = `${y}px`;
			tile.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;

			const content = tile.querySelector(".tile__content");
			if (content) {
				content.style.transform = `rotate(${-deg}deg)`;
			}
		});
	}

	updateTilesLayout();
	window.addEventListener("resize", updateTilesLayout);
}

function navIcon() {
	const navToggle = document.getElementById("navToggle");
	const navMenu = document.getElementById("navMenu");

	// Alleen uitvoeren op mobiel
	if (window.innerWidth < 768 && navToggle && navMenu) {
		navToggle.addEventListener("click", () => {
			navMenu.classList.toggle("active");
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	if (typeof main === "function") {
		main();
	}
	navIcon();
});
