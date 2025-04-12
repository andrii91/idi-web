$(document).ready(function () {
  $(window).scroll(function () {
    return $(".navigation").toggleClass("scroll", $(window).scrollTop() > 0);
  });

  if (localStorage.getItem("bannerDismissed") !== "true") {
    $("#banner-info").show();
    $(".navigation").css("margin-top", $("#banner-info").outerHeight() + "px");
  } else {
    $("#banner-info").hide();
    $(".navigation").css("margin-top", "0");
  }

  $("#banner-info #cancel-icon").click(function () {
    $("#banner-info").fadeOut(500, function () {
      $("#banner-info").remove();
      $(".navigation").css("margin-top", "0");
      localStorage.setItem("bannerDismissed", "true");
    });
  });

  $(".navigation-menu > li").each(function () {
    const $li = $(this);
    const $submenu = $li.find(".navigation-menu-submenu");

    // Показати підменю при наведенні
    $li.on("mouseenter", function () {
      $submenu.stop(true, true).fadeIn(200);
    });

    // Приховати підменю, коли курсор вийде з li + submenu
    let isHoveredLi = false;
    let isHoveredSubmenu = false;

    $li
      .on("mouseenter", function () {
        isHoveredLi = true;
      })
      .on("mouseleave", function () {
        isHoveredLi = false;
        setTimeout(() => {
          if (!isHoveredLi && !isHoveredSubmenu) {
            $submenu.stop(true, true).fadeOut(200);
          }
        }, 100);
      });

    $submenu
      .on("mouseenter", function () {
        isHoveredSubmenu = true;
      })
      .on("mouseleave", function () {
        isHoveredSubmenu = false;
        setTimeout(() => {
          if (!isHoveredLi && !isHoveredSubmenu) {
            $submenu.stop(true, true).fadeOut(200);
          }
        }, 100);
      });
  });

  $(".scroll").click(function (e) {
    e.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;

    $("body,html").animate(
      {
        scrollTop: top - 50,
      },
      500
    );
  });

  $(".slider").slick({
    dots: true,
    arrows: true,
    autoplay: true,
    prevArrow: $(".slider-controls__prev"),
    nextArrow: $(".slider-controls__next"),
    autoplaySpeed: 5000,
  });
  
  const $headers = $(".scroll-section .scroll-header");
  const $section = $(".scroll-section");
  const headerHeight = $headers.outerHeight();
  const scrollSpeedMultiplier = 1; // 👉 збільшує чутливість

  $(window).on("scroll", function () {
    const scrollY = $(this).scrollTop();
    const sectionTop = $section.offset().top - 100;
    const sectionHeight = $section.outerHeight();

    const sectionScroll = scrollY + window.innerHeight - sectionTop;

    // Прискорений скрол-прогрес (більше multiplier = швидше ефект)
    const scrollProgress = Math.min(
      Math.max(sectionScroll / (sectionHeight / scrollSpeedMultiplier), 0),
      1
    );

    if (scrollProgress <= 0) return;

    $headers.each(function (index, header) {
      const $header = $(header);

      // ⚡ Паралакс: рух вниз до 50% заголовка
      const translateY = headerHeight * 0.5 * scrollProgress *1.6;
      $header.css("transform", `translateY(${translateY}px)`);

      // ⚡ Прискорений градієнт
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

      const gradient = `linear-gradient(180deg, #000 0%, #000 ${start}%, #FFF ${end}%, #FFF 100%)`;

      $header.css({
        background: gradient,
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "background-clip": "text",
      });
    });
  });
  
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
          $img.css('transform', `translate3d(0, ${yOffset}px, 0)`);
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
});
