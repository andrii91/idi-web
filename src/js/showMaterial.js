$(document).ready(function () {
  const $material = $('#idMaterial');
  if (!$material.length) {
    return;
  }

  const throttledUpdate = throttle(updateMaterialPosition, 16);

  $('.classHandbook').on('mouseenter', function (e) {
    const $this = $(this);
    const $img = $this.find('img');
    const largeSrc = $img.attr('material-src');

    if (largeSrc) {
      const $materialImg = $material.find('img');
      $materialImg.attr('src', largeSrc).fadeIn(100);
    }

    $(".propertycode").text($this.attr('propertycode'));
    $(".propertyprice").text($this.attr('propertyprice'));

    $('.mob-finish').show();

    $this.addClass('active-material');
    $material.stop(true, true).fadeIn(200);
    updateMaterialPosition(e);
  });

  $('.classHandbook').on('mousemove', function (e) {
    throttledUpdate(e);
  });

  $('.classHandbook').on('mouseleave', function () {
    $(this).removeClass('active-material');
    $material.stop(true, true).fadeOut(200);
  });

  function updateMaterialPosition(e) {
    const materialWidth = $material.outerWidth();
    const materialHeight = $material.outerHeight();
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    let offsetX = 20; // відступ від курсора
    let offsetY = 20;

    let top;
    let left = e.pageX + offsetX;

    // Перевіряємо, чи є місце знизу
    if (e.pageY + offsetY + materialHeight <= windowHeight) {
      // Є місце знизу — показуємо підказку внизу курсора
      top = e.pageY + offsetY;
    } else if (e.pageY - offsetY - materialHeight >= 0) {
      // Є місце зверху — показуємо над курсором
      top = e.pageY - offsetY - materialHeight;
    } else {
      // Якщо ні вгору, ні вниз нормально не влазить — ставимо зверху екрана
      top = 10;
    }

    // Перевіряємо праву межу
    if (left + materialWidth > windowWidth) {
      left = windowWidth - materialWidth - 10;
    }

    // Перевіряємо ліву межу
    if (left < 0) {
      left = 10;
    }

    $material.css({
      top: top,
      left: left,
    });
  }

  function throttle(callback, delay) {
    let lastCall = 0;
    let timeout;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback(...args);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          lastCall = new Date().getTime();
          callback(...args);
        }, delay - (now - lastCall));
      }
    };
  }
});
