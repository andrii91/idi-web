

$(function () {
    const activeImages = new Set();
  let ticking = false;

  // Паралакс ефект
  function updateParallax() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    activeImages.forEach((img) => {
      const $img = $(img);
      const speed = parseFloat($img.data('speed')) || 0.5;
      const container = $img.parent();
      const offsetTop = container.offset().top;
      const height = container.outerHeight();

      // Рахуємо зміщення тільки якщо видно
      if (scrollTop + windowHeight > offsetTop && scrollTop < offsetTop + height) {
        const yOffset = (scrollTop - offsetTop) * speed;
        $img.css({
          transform: `translate3d(0, ${yOffset}px, 0)`,
          willChange: 'transform'
        });
      }
    });

    ticking = false;
  }

  // Виклик через requestAnimationFrame
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  $(window).on('scroll resize', onScroll);

  // Intersection Observer: додає або прибирає картинки з активного списку
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeImages.add(entry.target);
      } else {
        activeImages.delete(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0
  });

  // Спостерігаємо за всіма .parallax-img
  $('.parallax-img').each(function () {
    observer.observe(this);
  });

});