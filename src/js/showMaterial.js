$(document).ready(function () {
  let showTimeout;
  let followInterval;
  let targetX = 0;
  let targetY = 0;
  let moving = false;

  $(".classHandbook").on("mouseenter", function (e) {
    const $this = $(this);
    const $img = $this.find("img");
    const largeSrc = $img.attr("material-src"); 

    if (largeSrc) {
      $("#idMaterial img").attr("src", largeSrc); 
    }

    $this.addClass("active-material");

    targetX = e.pageX + 20;
    targetY = e.pageY + 20;

    clearTimeout(showTimeout);
    showTimeout = setTimeout(() => {
      const $material = $("#idMaterial");

      $material
        .css({
          opacity: 0,
          transform: "scale(0.8)",
          display: "block",
          top: targetY + "px",
          left: targetX + "px",
        })
        .animate({ opacity: 1 }, 300)
        .css({ transform: "scale(1)" });

      followInterval = setInterval(followMouseSmooth, 16);
    }, 150);
  });

  $(".classHandbook").on("mousemove", function (e) {
    moving = true;
    targetX = e.pageX + 20;
    targetY = e.pageY + 20;
  });

  $(".classHandbook").on("mouseleave", function () {
    clearTimeout(showTimeout);
    clearInterval(followInterval);
    moving = false;

    $(this).removeClass("active-material");

    const $material = $("#idMaterial");
    $material.animate({ opacity: 0 }, 300, function () {
      $material.hide();
    });
  });

  function followMouseSmooth() {
    const $material = $("#idMaterial");
    if (!$material.is(":visible")) return;

    let currentTop = parseFloat($material.css("top")) || 0;
    let currentLeft = parseFloat($material.css("left")) || 0;

    let newTop = currentTop + (targetY - currentTop) * 0.2;
    let newLeft = currentLeft + (targetX - currentLeft) * 0.2;

    const winWidth = $(window).width();
    const winHeight = $(window).height();
    const boxWidth = $material.outerWidth();
    const boxHeight = $material.outerHeight();

    // Перевірка, щоб не виходити за межі екрану
    if (newLeft + boxWidth > winWidth) {
      newLeft = winWidth - boxWidth - 10;
    }
    if (newTop + boxHeight > winHeight) {
      newTop = winHeight - boxHeight - 10;
    }
    if (newLeft < 10) {
      newLeft = 10;
    }
    if (newTop < 10) {
      newTop = 10;
    }

    $material.css({
      top: newTop + "px",
      left: newLeft + "px",
      opacity: moving ? 0.9 : 1,
    });

    moving = false;
  }
});
