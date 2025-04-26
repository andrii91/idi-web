$(document).ready(function () {
  function isMobile() {
    const windowWidth = $(window).width();
    const isTouchDevice = "ontouchstart" in document.documentElement;
    const isSmallScreen = windowWidth < 1023;
    return isTouchDevice || isSmallScreen;
  }

  function handleResponsiveBehavior() {
    if (isMobile()) {
      // мобільна логіка
      console.log("Мобільний пристрій або вузький екран");
      // Наприклад: $('#menu').addClass('mobile');
    } else {
      // десктопна логіка
      console.log("Десктоп");
      // Наприклад: $('#menu').removeClass('mobile');
    }
  }

  handleResponsiveBehavior(); // перевірка при старті

  $(window).on("resize", function () {
    handleResponsiveBehavior(); // перевірка при зміні розміру
  });

  $(window).scroll(function () {
    return $(".navigation").toggleClass("scroll", $(window).scrollTop() > 0);
  });

  if (localStorage.getItem("bannerDismissed") !== "true") {
    $("#banner-info").show();
    $(".navigation, header").css(
      "margin-top",
      $("#banner-info").outerHeight() + "px"
    );
  } else {
    $("#banner-info").hide();
    $(".navigation, header").css("margin-top", "0");
  }

  $("#banner-info #cancel-icon").click(function () {
    $("#banner-info").fadeOut(500, function () {
      $("#banner-info").remove();
      $(".navigation, header").css("margin-top", "0");
      localStorage.setItem("bannerDismissed", "true");
    });
  });

  function initMenu() {
    $(".navigation-menu > li").each(function () {
      const $li = $(this);
      const $submenu = $li.find(".navigation-menu-submenu");

      if (!isMobile()) {
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
      }
    });
  }

  initMenu();

  $(window).resize(function () {
    initMenu();

    if (!isMobile()) {
      $("body").removeClass("overflow-hidden");
    }
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
    autoplaySpeed: 7000,
  });

  $(".gallery-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".gallery-slider-nav",
  });

  $(".gallery-slider-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".gallery-slider",
    dots: false,
    focusOnSelect: true,
    prevArrow: `<svg class="gallery-slider-prev">
              <use xlink:href="#arr-left"></use>
            </svg>`,
    nextArrow: `<svg class="gallery-slider-next">
              <use xlink:href="#arr-right"></use>
            </svg>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  });

  $(".dinning-room__tabs li a").click(function (e) {
    e.preventDefault();
    const $this = $(this);

    // Переключення табів
    $(".dinning-room__tabs li a, .dinning-room__item").removeClass("active");
    $this.addClass("active");
    $($this.attr("href")).addClass("active");

    // Перезапуск slick
    $(".dinning-room__slider").slick("setPosition");
    $(".dinning-room__slider-nav").slick("setPosition");
  });

  $(".reviews__slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow: `<svg class="reviews__slider-prev">
    <use xlink:href="#arr-left"></use>
  </svg>`,
    nextArrow: `<svg class="reviews__slider-next">
    <use xlink:href="#arr-right"></use>
  </svg>`,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
          arrows: false,
        },
      },
    ],
  });

  $(".fade-in").addClass("hidden_animation").viewportChecker({
    classToAdd: "visible animated fadeIn",
    offset: "10%",
    removeClassAfterAnimation: true,
    classToRemove: "hidden_animation",
  });

  $(".fade-in-right").addClass("hidden_animation").viewportChecker({
    classToAdd: "visible animated fadeInRight",
    offset: "10%",
    removeClassAfterAnimation: true,
    classToRemove: "hidden_animation",
  });

  $(".fade-in-left").addClass("hidden_animation").viewportChecker({
    classToAdd: "visible animated fadeInLeft",
    offset: "10%",
    removeClassAfterAnimation: true,
    classToRemove: "hidden_animation",
  });

  $(".fade-in-up").addClass("hidden_animation").viewportChecker({
    classToAdd: "visible animated fadeInUp",
    offset: "10%",
    removeClassAfterAnimation: true,
    classToRemove: "hidden_animation",
  });

  $(".open-submenu").click(function () {
    $(".navigation-menu-submenu").removeClass("open").removeAttr("style");

    $(this).parent().find(".navigation-menu-submenu").addClass("open");
  });

  $(".close-submenu").click(function () {
    $(".navigation-menu-submenu").removeClass("open").removeAttr("style");
  });

  $(".navigation-menu-submenu-cat").click(function () {
    if (isMobile()) {
      $(this).toggleClass("active");
      $(this)
        .parent()
        .find(".navigation-menu-submenu-list")
        .toggleClass("active");
    }
  });

  $(".mobile-btn").click(function () {
    $(this).toggleClass("active");
    $("#navigation-menu").toggleClass("active");
    // $('body').addClass('overflow-hidden')
  });

  if (isMobile()) {
    $(".room-furniture__slider").slick({
      dots: true,
      arrows: false,
      variableWidth: true,
      slidesToShow: 1,
    });
  } else {
  }

  const scrollSpeedMultiplier = 1;

  $(window).on("scroll", function () {
    const scrollY = $(this).scrollTop();

    $(".scroll-section").each(function () {
      const $section = $(this);
      const $header = $section.find(".scroll-header");
      const headerHeight = $header.outerHeight();
      let sectionTop = $section.offset().top - 100;

      if (isMobile()) {
        sectionTop = $section.offset().top + 120;
      }

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

  $("#search-button").click(function (e) {
    e.preventDefault();

    $("#navigation-menu-row").fadeOut(200, function () {
      if (isMobile()) {
        $(".navigation-logo").fadeOut(200);
        $(".navigation-content").addClass("w-full");
      }
      $("#search-block").fadeIn(200).find("input").focus();
    });

    // Додаємо обробник після короткої паузи
    setTimeout(() => {
      $(document).on("click.searchOutside", function (e) {
        if (
          !$(e.target).closest("#search-block").length &&
          !$(e.target).is("#search-button")
        ) {
          $("#search-block").fadeOut(200, function () {
            $("#navigation-menu-row").fadeIn(200);
            if (isMobile()) {
              $(".navigation-logo").fadeIn(200);
              $(".navigation-content").removeClass("w-full");
            }
          });
          $(document).off("click.searchOutside");
        }
      });

      // Правильний обробник вводу
      $("#search-block input").on("input", function () {
        const value = $(this).val();
        if (value.length > 2) {
          $("#search-results").fadeIn(200);
        } else {
          $("#search-results").fadeOut(200);
        }
      });
    }, 10);
  });

  $(".filters__button").click(function () {
    $(this).toggleClass("current");
  });

  function checkFilters() {
    let filtersSelectsCount = 0;

    $(".group-selects select").each(function () {
      if ($(this).val().length > 0) {
        filtersSelectsCount++;
      }

      if (filtersSelectsCount > 1) {
        $(".filters__reset-all").show();
      } else {
        $(".filters__reset-all").hide();
      }
    });
  }

  checkFilters();

  $(".group-selects select").change(checkFilters);

  $(".filters__reset-all").on("click", function () {
    // Очищаємо всі селекти
    $(this)
      .parents()
      .find("select")
      .each(function () {
        const $select = $(this);
        if ($select.attr("multiple")) {
          // Для multiple-селектів знімаємо всі вибрані опції
          $select.find("option").prop("selected", false);
        } else {
          // Для звичайних селектів вибираємо перший пункт (або placeholder)
          $select.prop("selectedIndex", 0);
        }
        $select.trigger("change"); // Викликаємо подію change для оновлення
      });

    // Якщо використовуються кастомні селекти, оновлюємо їх
    $(".dropdown-wrapper").each(function () {
      const $dropdown = $(this);
      const $select = $dropdown.prev("select");
      const placeholder = $select.data("placeholder") || "Choose options";

      // Оновлюємо текст тригера
      $dropdown
        .find(".dropdown-trigger")
        .removeClass("is-selected")
        .html(
          `${placeholder} <svg class="arrow"><use xlink:href="#arrow-select"></use></svg>`
        );

      // Знімаємо всі вибрані опції
      $dropdown.find("input").prop("checked", false);
    });
  });

  $(
    ".filters-mobile__open, .filters-mobile__apply, .filters-mobile__close"
  ).click(function () {
    $(".filters-mobile").toggleClass("open");
  });


  $(".product-gallery__slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".product-gallery__slider-nav", 
  });

  $(".product-gallery__slider-nav").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".product-gallery__slider",
    dots: false,
    focusOnSelect: true,
    prevArrow: `<svg class="gallery-slider-prev">
              <use xlink:href="#arr-left"></use>
            </svg>`,
    nextArrow: `<svg class="gallery-slider-next">
              <use xlink:href="#arr-right"></use>
            </svg>`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  });

  $('.product-info__text-btn').click(function(){
    $(this).hide();
    $(this).parent().find('.product-info__text').addClass('open')
  })

  
});
