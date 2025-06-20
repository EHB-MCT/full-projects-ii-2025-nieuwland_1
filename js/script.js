function main() {
  const tiles = document.querySelectorAll(".tile");
  const grid = document.querySelector(".tile-grid");

  if (!grid) return;

  function updateTilesLayout() {
    const isDesktop = window.innerWidth >= 768;
    const rect = grid.getBoundingClientRect();

    const centerX = isDesktop ? rect.width / 2 : -90;
    const centerY = isDesktop ? rect.height + 730 : rect.height / 2;
    const radius = isDesktop ? 950 : 310;
    const angleStart = isDesktop ? -Math.PI / 4 : -Math.PI / 2;
    const angleEnd = isDesktop ? Math.PI / 4 : Math.PI / 2;
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

function loadVideo1(wrapper) {
  if (!wrapper) return;
  const video = document.createElement("video");
  video.src =
    "./video/Inschrijven in Brussel 2025-2026_ kleuter- en lager onderwijs (1).mp4";
  video.controls = true;
  video.autoplay = true;
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.borderRadius = "12px";

  wrapper.innerHTML = "";
  wrapper.appendChild(video);
}

function loadVideo(wrapper) {
  if (!wrapper) return;
  const video = document.createElement("video");
  video.src = "./video/Final.mp4";
  video.controls = true;
  video.autoplay = true;
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.borderRadius = "12px";

  wrapper.innerHTML = "";
  wrapper.appendChild(video);
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

function laadPosts() {
  const container = document.getElementById("postContainer");
  if (!container) return;

  fetch("http://127.0.0.1:8090/api/collections/posts/records")
    .then((res) => {
      if (!res.ok) throw new Error("Netwerkfout");
      return res.json();
    })
    .then((data) => {
      container.innerHTML = "";

      data.items.forEach((post) => {
        const tile = document.createElement("div");
        tile.className = "foto-tile";

        let imageHTML = "";
        if (post.afbeelding) {
          const imgUrl = `http://127.0.0.1:8090/api/files/posts/${post.id}/${post.afbeelding}`;
          imageHTML = `<img src="${imgUrl}" alt="${post.titel}" />`;
        }

        tile.innerHTML = `
          ${imageHTML}
          <div class="foto-button">${post.titel}</div>
          <p>${post.beschrijving || ""}</p>
        `;

        container.appendChild(tile);
      });
    })
    .catch((err) => {
      alert("Er is een fout opgetreden bij het laden van posts.");
      console.error(err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  main();
  navIcon();

  // Video wrappers
  const wrapper1 = document.getElementById("videoWrapper1");
  const wrapper2 = document.getElementById("videoWrapper2");
  loadVideo1(wrapper1);
  loadVideo(wrapper2);

  // Post-loader button
  const laadPostsBtn = document.getElementById("laadPosts");
  if (laadPostsBtn) {
    laadPostsBtn.addEventListener("click", laadPosts);
  }
});
//https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
//https://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle
//https://javascript.plainenglish.io/javascript-create-video-element-ded3d63367c4
//https://stackoverflow.com/questions/54154293/how-to-create-elements-set-attribute-use-innerhtml-and-appendchild-with-js-an?
