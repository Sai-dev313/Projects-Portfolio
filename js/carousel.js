(function () {
  function initCarousel(root, index) {
    var imgs = root.querySelectorAll("img");
    if (imgs.length === 0) return;

    var dotsWrap = document.createElement("div");
    dotsWrap.className = "dots";
    imgs.forEach(function () {
      var d = document.createElement("span");
      dotsWrap.appendChild(d);
    });
    root.appendChild(dotsWrap);
    var dots = dotsWrap.querySelectorAll("span");

    var current = 0;
    imgs[0].classList.add("active");
    dots[0].classList.add("active");

    var interval = parseInt(root.getAttribute("data-interval"), 10) || 2800;
    var stagger = index * 450; // offsets multiple carousels so they don't flip in sync

    function advance() {
      imgs[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (current + 1) % imgs.length;
      imgs[current].classList.add("active");
      dots[current].classList.add("active");
    }

    setTimeout(function () {
      setInterval(advance, interval);
    }, stagger);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var carousels = document.querySelectorAll(".carousel");
    carousels.forEach(function (el, i) {
      initCarousel(el, i);
    });
  });
})();
