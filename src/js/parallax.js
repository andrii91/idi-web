

$(function () {

  const scrollSpeedMultiplier = 1;

  $(window).on("scroll", function () {
    const scrollY = $(this).scrollTop();
  
    $(".scroll-section").each(function () {
      const $section = $(this);
      const $header = $section.find(".scroll-header");
      const headerHeight = $header.outerHeight();
  
      const sectionTop = $section.offset().top - 100;
      const sectionHeight = $section.outerHeight();
      const sectionScroll = scrollY + window.innerHeight - sectionTop;
  
      const scrollProgress = Math.min(
        Math.max(sectionScroll / (sectionHeight / scrollSpeedMultiplier), 0),
        1
      );
  
      if (scrollProgress <= 0) return;
  
      let start, end;
  
      if (scrollProgress <= 0.5) {
        const p = scrollProgress / 0.5;
        start = (100 - (100 - 66.86) * p).toFixed(2);
        end = (100 - (100 - 67.16) * p).toFixed(2);
      } else {
        const p = (scrollProgress - 0.5) / 0.5;
        start = (66.86 - 66.86 * p).toFixed(2);
        end = (67.16 - 67.16 * p).toFixed(2);
      }
  
      const whiteProgress = (100 - parseFloat(start)) / 100;
      const translateY = headerHeight * whiteProgress;
  
      const gradient = `linear-gradient(180deg, #000 0%, #000 ${start}%, #FFF ${end}%, #FFF 100%)`;
  
      $header.css({
        transform: `translateY(${translateY}px)`,
        background: gradient,
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "background-clip": "text",
      });
    });
  });
  
/**
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
 */
});