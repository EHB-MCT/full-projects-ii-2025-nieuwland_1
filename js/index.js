//https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle
function main() {
  function cirkelTiles() {
    const tiles = document.querySelectorAll(".tile");

    const centerX = -82;
    const centerY = 175;
    const radius = 310;

    const angleStart = -Math.PI / 2;
    const angleEnd = Math.PI / 2;
    const angleStep = (angleEnd - angleStart) / (tiles.length + 1);

    tiles.forEach((tile, index) => {
      const angle = angleStart + (index + 1) * angleStep;

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      tile.style.left = `${x}px`;
      tile.style.top = `${y}px`;

      const deg = angle * (180 / Math.PI) + 90;
      tile.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;

      const content = tile.querySelector("div");
      if (content) {
        content.style.transform = `rotate(${-deg}deg)`;
      }
    });
  }

  function navIcon() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });
    }
  }

  // Wait for DOM to load before running these
  document.addEventListener("DOMContentLoaded", () => {
    cirkelTiles();
    navIcon();
  });
}

main();
