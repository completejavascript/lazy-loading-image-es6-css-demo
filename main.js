document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.querySelector(".grid");

  // Template for each cell in grid
  const cellTemplate = id => `
    <div class="cell">
      <div class="lazy-image" id="${id}"></div>
      <div class="caption">${id.replace("-", " ")}</div>
    </div>
  `;

  const NUMBER_IMAGE = 18;

  // Render all images with default background as place_holder.png
  for (let i = 1; i <= NUMBER_IMAGE; i++) {
    const id = `image-${i < 10 ? `0${i}` : i}`;
    const tmpl = cellTemplate(id);
    const frag = document.createRange().createContextualFragment(tmpl);
    gridContainer.appendChild(frag);
  }

  // store all images DOM in array
  let arrayImages = [].slice.call(document.querySelectorAll(".lazy-image"));

  // handle scroll
  handleScroll();

  let debounceTimer;
  window.addEventListener("scroll", function () {
    if (debounceTimer) {
      window.clearTimeout(debounceTimer);
    }

    debounceTimer = window.setTimeout(function () {
      handleScroll();
    }, 100);
  });

  function handleScroll() {
    for (let i = arrayImages.length - 1; i >= 0; i--) {
      if (elementInViewport(arrayImages[i])) {
        arrayImages[i].classList.add("visible");
        arrayImages.splice(i, 1);
      }
    }
  }

  // Check if a DOM element is in the viewport
  function elementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }
});