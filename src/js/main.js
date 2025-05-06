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
      // console.log("Мобільний пристрій або вузький екран");
      // Наприклад: $('#menu').addClass('mobile');
    } else {
      // десктопна логіка
      // console.log("Десктоп");
      // Наприклад: $('#menu').removeClass('mobile');
    }
  }

  handleResponsiveBehavior(); // перевірка при старті



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
      $('.parallax-window').parallax('refresh');
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
        },
      },
    ],
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
    autoplay: true,
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

    // Перелистування на перший слайд
    $(".dinning-room__slider").slick("slickGoTo", 0);
    $(".dinning-room__slider-nav").slick("slickGoTo", 0);
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
    $('body').toggleClass('overflow-hidden')
  });


  function initRoomFurnitureSlider() {
    if (isMobile()) {
      if (!$(".room-furniture__slider").hasClass("slick-initialized")) {
        $(".room-furniture__slider").slick({
          dots: true,
          arrows: false,
          variableWidth: true,
          slidesToShow: 1,
        });
      }
    } else {

      if ($(".room-furniture__slider").hasClass("slick-initialized")) {
        $(".room-furniture__slider").slick("unslick"); // Знищуємо слайдер
      }
      if($("#navigation-menu").hasClass("active")) {
        $('body').removeClass('overflow-hidden')
      }
    }
  }
  
  // Викликаємо функцію при завантаженні сторінки
  initRoomFurnitureSlider();

  function playHeaderAnimation() {
    const scrollSpeedMultiplier = 1;
  
    function calculateHeaderAnimation() {
      const scrollY = $(window).scrollTop();
  
      $(".scroll-section").each(function () {
        const $section = $(this);
        const $headers = $section.find(".scroll-header"); // Знаходимо всі заголовки в секції
        let totalHeaderHeight = 0;
  
        // Обчислюємо загальну висоту всіх заголовків
        $headers.each(function () {
          totalHeaderHeight += $(this).outerHeight();
        });
  
        let sectionTop = $section.offset().top - 100;
  
        // Отримуємо gradientP і перевіряємо його
        let gradientP = Number($section.data("numb"));
  
        if (!gradientP || gradientP <= 0) {
          gradientP = 0.5; // Значення за замовчуванням
        }
  
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
          const p = scrollProgress / gradientP; // gradientP тепер завжди коректний
          start = (100 - (100 - 66.86) * p).toFixed(2);
          end = (100 - (100 - 67.16) * p).toFixed(2);
        }
  
        const whiteProgress = (100 - parseFloat(start)) / 100;
        const translateY = totalHeaderHeight * whiteProgress; // Використовуємо загальну висоту заголовків
  
        const gradient = `linear-gradient(180deg, #000 0%, #000 ${start}%, #FFF ${end}%, #FFF 100%)`;
  
        $headers.css({
          transform: `translateY(${translateY}px)`,
          background: gradient,
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        });
      });
    }
  
    // Викликаємо функцію при скролі
    $(window).on("scroll", calculateHeaderAnimation);
  
    // Викликаємо функцію при зміні розміру вікна
    $(window).on("resize", calculateHeaderAnimation);
  
    // Викликаємо функцію один раз при завантаженні сторінки
    calculateHeaderAnimation();
  }


  playHeaderAnimation();

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

      if (filtersSelectsCount > 0) {
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

  $('.sidebar__select-finish-list li').click(function(){
    $('.sidebar__select-finish-list li').removeClass('active')
    $(this).addClass('active');

    $('.texture-info').text(`ver. ${$(this).attr('propertyvalue')} / Code: ${$(this).attr('propertycode')} / ${$(this).attr('propertyvalue')}`)
  })

  $('[data-sidebar]').click(function(e){
    e.preventDefault();
    const id = $(this).data('sidebar');
    $("body").addClass("overflow-hidden");
    $(`#${id}`).css({ right: '-100%', display: 'block' }).animate({ right: '0' }, 200);
  })

  $('[data-sidebar-close]').click(function(){
    $(this).parents('.sidebar').animate({ right: '-100%' }, 200, function () {
      $(this).hide();
    });
    $("body").removeClass("overflow-hidden");
  })

  $('[data-sidebar-select-finish]').click(function(){
    $(this).parents('.sidebar').animate({ right: '-100%' }, 200, function () {
      $(this).hide();
    });
    $("body").removeClass("overflow-hidden");
    const src = $(this).parents('.sidebar').find('.sidebar__select-finish-list li.active img').attr('src');
    const price = $(this).parents('.sidebar').find('.sidebar__select-finish-price span').text();
    if(!!src) {
      $('.product-info__texture .exemple').html(`
        <span>With leather pad – ${price}</span>
         <img src="${src}" alt="">
     `)
    }
  })

  $('.sidebar__composition-item:not(.sidebar__composition-banner)').click(function(){
    $('.sidebar__composition-item').removeClass('active');
    $(this).addClass('active');

    $('.mob-composition').html(`
      <div class="sidebar__composition-footer">
       ${
        $(this).find('.sidebar__composition-footer').html()
       }
      </div>
      `).show();
  })
  
  $('[data-sidebar-select-composition]').click(function(e){
    e.preventDefault();
    $(this).parents('.sidebar').animate({ right: '-100%' }, 200, function () {
      $(this).hide();
    });
    $("body").removeClass("overflow-hidden");
    const src = $(this).parents('.sidebar').find('.sidebar__composition-item.active img').attr('src');
    const price = $(this).parents('.sidebar').find('.sidebar__select-finish-price span').text();
    if(!!src) {
      $('.product-info__composition .exemple').html(`
        <span>${price}</span>
         <img src="${src}" alt="">
     `)
    }
  })

  $(".interior-overview__slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".interior-overview__slider-nav", 
  });

  $(".interior-overview__slider-nav").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".interior-overview__slider",
    dots: false,
    focusOnSelect: true,
    prevArrow: `<svg class="gallery-slider-prev">
              <use xlink:href="#arr-left"></use>
            </svg>`,
    nextArrow: `<svg class="gallery-slider-next">
              <use xlink:href="#arr-right"></use>
            </svg>`,
          variableWidth: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  $(document).on('keydown', function (e) {
    if ($('.interior-overview__slider').is(':visible')) {
      if (e.key === "ArrowRight") {
        $(".interior-overview__slider").slick('slickNext');
      } else if (e.key === "ArrowLeft") {
        $(".interior-overview__slider").slick('slickPrev');
      }
    }
  });

  $('[data-modal]').on('click', function () {
    $('body').css('overflow', 'hidden');
    $(`#${$(this).data('modal')}`).fadeIn(300).css('display', 'flex');

    if($(this).hasClass('gallery-thumb')) {
      const index = $(this).data('index');
      $(".interior-overview__slider").slick("setPosition");
      $(".interior-overview__slider-nav").slick("setPosition");

      $(".interior-overview__slider").slick('slickGoTo', index, true);
      $(".interior-overview__slider-nav").slick('slickGoTo', index, true);
    }

  });

  $('.modal').on('click', function (e) {
    if (!$(e.target).closest('.modal__container').length) {
      $('body').css('overflow', '');
      $(this).fadeOut(300).css('display', 'none');
    }
  });

  $('.modal__close').on('click', function (e) {
    $('body').css('overflow', '');
    $(this).parents('.modal').fadeOut(300).css('display', 'none');
  });


  $('.accordion__title').on('click', function(){
    $(this).toggleClass('open');
    $(this).parent().find('.accordion__content').slideToggle(200).toggleClass('d-flex');
  })


  const defaultError = 'Please fill out this field correctly.';

  $('.submit').on('click', function (e) {
    e.preventDefault();
    let error = 0;
    const $form = $(this).closest('form');
    const $requiredFields = $form.find('[required]');

    $requiredFields.each(function () {
      const $field = $(this);
      const value = $field.val().trim();
      const type = $field.attr('type');
      const message = $field.data('valid') || defaultError;
      const $parent = $field.closest('label');

      // Очистити попередні алерти
      $field.removeClass('error');
      $parent.find('.error-allert').remove();

      // Перевірка заповнення
      if (value === '') {
        showError($field, $parent, message);
        error = 1;
        return false;
      }

      // Перевірка email
      if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          $field.val('');
          showError($field, $parent, message);
          error = 1;
          return false;
        }
      }

      // Перевірка телефону
      if (type === 'tel') {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!phoneRegex.test(value)) {
          $field.val('');
          showError($field, $parent, message);
          error = 1;
          return false;
        }
      }
    });

    if (!error) {
      $form.unbind('submit').submit();
    }

    function showError($field, $parent, msg) {
      $field.addClass('error');
      $parent.append(`<div class="error-allert">${msg}</div>`);
      $field.focus();
    }
  });


  $('.text-short-more').click(function(){
    $(this).parent().find('.text-short').addClass('open');
    $(this).hide();
  })

  const $navContainer = $('.other-overview__content-nav');
  const $navLinks = $navContainer.find('a');
  const offsetMargin = 200; // для кращої чутливості, можеш змінити

  function onScroll() {
    let currentId = '';

    $('.nav-content-item').each(function () {
      const sectionTop = $(this).offset().top - offsetMargin;
      if ($(window).scrollTop() >= sectionTop) {
        currentId = $(this).attr('id');
      }
    });

    $navLinks.each(function () {
      const $link = $(this);
      const href = $link.attr('href'); // без #
      if (href === '#'+currentId) {
        $link.addClass('active');
        scrollToActive($link);
      } else {
        $link.removeClass('active');
      }
    });
  }

  function scrollToActive($link) {
    const container = $navContainer[0];
    const linkLeft = $link.position().left;
    const linkWidth = $link.outerWidth();
    const containerWidth = $navContainer.outerWidth();
  
    const scrollTo = container.scrollLeft + linkLeft - (containerWidth / 2) + (linkWidth / 2);
  
    $navContainer.stop().animate({
      scrollLeft: scrollTo
    }, 300);
  }

  $(window).on('scroll', onScroll);
  
  onScroll();
  
  $('input[name="phone"]').inputmask("+9{1,15}");

  
  $(window).on("resize", function () {
    handleResponsiveBehavior(); // перевірка при зміні розміру
    $('.parallax-window').parallax('refresh');
    playHeaderAnimation();
    initRoomFurnitureSlider();

  });

});
