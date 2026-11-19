(function () {
  var MAX_TILT = 22; // degrees

  document.addEventListener("DOMContentLoaded", function () {
    var imgs = document.querySelectorAll(".avatar img");
    if (imgs.length === 0) return;

    window.addEventListener("mousemove", function (e) {
      imgs.forEach(function (img) {
        var rect = img.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;

        var dx = (e.clientX - cx) / (window.innerWidth / 2);
        var dy = (e.clientY - cy) / (window.innerHeight / 2);

        dx = Math.max(-1, Math.min(1, dx));
        dy = Math.max(-1, Math.min(1, dy));

        var rotateY = dx * MAX_TILT;
        var rotateX = -dy * MAX_TILT;

        img.style.transform =
          "rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
      });
    });
  });
})();
