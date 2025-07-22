$(document).ready(function () {
  function isMobile() {
    const windowWidth = $(window).width();
    const isTouchDevice = "ontouchstart" in document.documentElement;
    const isSmallScreen = windowWidth < 1024;
    return isSmallScreen;
  }

  $(window).scroll(function () {
    return $(".navigation").toggleClass("scroll", $(window).scrollTop() > 0);
  });

  function updateBannerMargin() {
    const isBannerDismissed = localStorage.getItem("bannerDismissed") === "true";

    if (!isBannerDismissed && $("#banner-info").length) {
      const bannerHeight = isMobile() ? 60 : 56;
      $(".navigation, header").css("margin-top", bannerHeight + "px");
    } else {
      $(".navigation, header").css("margin-top", "0");
    }
  }

  // Function to update parallax elements
  function updateParallaxElements() {
    if ($('.parallax-window').length) {
      // Small delay to ensure resize completion
      setTimeout(() => {
        $('.parallax-window').parallax('refresh');
      }, 100);
    }
  }

  if (localStorage.getItem("bannerDismissed") !== "true") {
    $("#banner-info").show();
    $("#banner-info").css("opacity", 1);
  } else {
    $("#banner-info").hide();
    $("#banner-info").css("opacity", 0);
  }

  // Call updateBannerMargin() after setting banner state
  updateBannerMargin();

  $("#banner-info #cancel-icon").click(function () {
    $("#banner-info").fadeOut(500, function () {
      localStorage.setItem("bannerDismissed", "true");
      updateBannerMargin();
      $("#banner-info").remove();
      $('.parallax-window').parallax('refresh');
    });
  });

  function initMenu() {
    $(".navigation-menu > li").each(function () {
      const $li = $(this);
      const $submenu = $li.find(".navigation-menu-submenu");

      if (!isMobile()) {
        // Show submenu on hover
        $li.on("mouseenter", function () {
          $submenu.stop(true, true).fadeIn(200);
        });

        // Hide submenu when cursor leaves li + submenu
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
    updateBannerMargin();
    if (!isMobile()) {
      $("body").removeClass("overflow-hidden");
    }
  });

  $(".scroll").click(function (e) {
    e.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;

    // Calculate offset based on navigation height and banner
    let offset = $('.navigation').outerHeight();
    
    // Add banner height if it's visible
    if ($("#banner-info").is(":visible")) {
      offset += $("#banner-info").outerHeight();
    }
    
    // Add mobile sidebar height if on privacy policy page and mobile
    if ($('.privacy-policy').length && isMobile() && $('.privacy-policy__sidebar-mobile').length) {
      offset += $('.privacy-policy__sidebar-mobile').outerHeight();
    }
    
    // Add some extra space for better visibility
    offset += 20;

    $("body,html").animate(
      {
        scrollTop: top - offset,
      },
      0
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

    // Switch tabs
    $(".dinning-room__tabs li a, .dinning-room__item").removeClass("active");
    $this.addClass("active");
    $($this.attr("href")).addClass("active");

    // Restart slick
    $(".dinning-room__slider").slick("setPosition");
    $(".dinning-room__slider-nav").slick("setPosition");

    // Go to first slide
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

  /**animate */
  const fadeMap = {
    "fade-in": "fadeIn",
    "fade-in-right": "fadeInRight",
    "fade-in-left": "fadeInLeft",
    "fade-in-up": "fadeInUp",
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        for (const key in fadeMap) {
          if (el.classList.contains(key)) {
            el.classList.add("visible", "animated", fadeMap[key]);
            el.classList.remove("hidden_animation");
            break;
          }
        }

        observerInstance.unobserve(el);
      }
    });
  }, {
    threshold: 0.1
  });

  for (const fadeClass in fadeMap) {
    document.querySelectorAll(`.${fadeClass}`).forEach(el => {
      el.classList.add("hidden_animation");
      observer.observe(el);
    });
  }

  /**end animate */

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
        $(".room-furniture__slider").slick("unslick"); // Destroy slider
      }
      if ($("#navigation-menu").hasClass("active")) {
        $('body').removeClass('overflow-hidden')
      }
    }
  }

  // Call function on page load
  initRoomFurnitureSlider();

  function playHeaderAnimation() {
    const scrollSpeedMultiplier = 1;
    const triggerOffset = window.innerHeight * 0.6; // 60% of screen height

    function calculateHeaderAnimation() {
      const scrollY = $(window).scrollTop();

      $(".scroll-section").each(function () {
        const $section = $(this);
        const $headers = $section.find(".scroll-header"); // Find all headers in section
        let totalHeaderHeight = 0;

        // Calculate total height of all headers
        $headers.each(function () {
          totalHeaderHeight += $(this).outerHeight();
        });

        let sectionTop = $section.offset().top - 100;

        // Get gradientP and check it
        let gradientP = Number($section.data("numb"));

        if (!gradientP || gradientP <= 0) {
          gradientP = 0.5; // Default value
        }

        if (isMobile()) {
          sectionTop = $section.offset().top + 120;
        }

        const sectionHeight = $section.outerHeight();
        const sectionScroll = scrollY + window.innerHeight - sectionTop;

        // Check if user has scrolled enough to start animation
        const hasScrolledEnough = sectionScroll >= triggerOffset;

        if (!hasScrolledEnough) {
          // If not scrolled enough, reset styles
          $headers.css({
            transform: 'translateY(0px)',
            background: 'linear-gradient(180deg, #000 0%, #000 100%, #FFF 100%, #FFF 100%)',
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            "background-clip": "text",
          });
          return;
        }

        // Calculate scroll progress with delay consideration
        const adjustedScroll = sectionScroll - triggerOffset;
        const adjustedSectionHeight = sectionHeight - triggerOffset;

        const scrollProgress = Math.min(
          Math.max(adjustedScroll / (adjustedSectionHeight / scrollSpeedMultiplier), 0),
          1
        );

        if (scrollProgress <= 0) return;

        let start, end;

        if (scrollProgress <= 0.5) {
          const p = scrollProgress / gradientP; // gradientP is now always correct
          start = (100 - (100 - 66.86) * p).toFixed(2);
          end = (100 - (100 - 67.16) * p).toFixed(2);
        }

        const whiteProgress = (100 - parseFloat(start)) / 100;
        const translateY = totalHeaderHeight * whiteProgress; // Use total header height

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

    // Call function on scroll
    $(window).on("scroll", calculateHeaderAnimation);

    // Call function on window resize
    $(window).on("resize", calculateHeaderAnimation);

    // Call function once on page load
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

    // Add handler after short pause
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

      // Correct input handler
      $("#search-block input").on("input", function () {
        const value = $(this).val();
        const $resetButton = $(this).closest('.search__form').find('.search__reset');

        if (value.length > 0) {
          $resetButton.fadeIn(200);
        } else {
          $resetButton.fadeOut(200);
        }

        if (value.length > 2) {
          $("#search-results").fadeIn(200);
        } else {
          $("#search-results").fadeOut(200);
        }
      });

      // Handler for search reset button
      $("#search-block .search__reset").on("click", function (e) {
        e.preventDefault();
        const $input = $(this).closest('.search__form').find('input');
        const $resetButton = $(this);

        // Clear input field
        $input.val('');

        // Hide reset button
        $resetButton.fadeOut(200);

        // Hide search results
        $("#search-results").fadeOut(200);

        // Return focus to input field
        $input.focus();
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
    // Clear all selects
    $(this)
      .parents()
      .find("select")
      .each(function () {
        const $select = $(this);
        if ($select.attr("multiple")) {
          // For multiple selects, uncheck all selected options
          $select.find("option").prop("selected", false);
        } else {
          // For regular selects, select first item (or placeholder)
          $select.prop("selectedIndex", 0);
        }
        $select.trigger("change"); // Trigger change event for update
      });

    // If custom selects are used, update them
    $(".dropdown-wrapper").each(function () {
      const $dropdown = $(this);
      const $select = $dropdown.prev("select");
      const placeholder = $select.data("placeholder") || "Choose options";

      // Update trigger text
      $dropdown
        .find(".dropdown-trigger")
        .removeClass("is-selected")
        .html(
          `${placeholder} <svg class="arrow"><use xlink:href="#arrow-select"></use></svg>`
        );

      // Uncheck all selected options
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

  $('.product-info__text-btn').click(function () {
    $(this).hide();
    $(this).parent().find('.product-info__text').addClass('open')
  })

  $('.sidebar__select-finish-list li').click(function () {
    $('.sidebar__select-finish-list li').removeClass('active')
    $(this).addClass('active');

    $('.texture-info').text(`ver. ${$(this).attr('propertyvalue')} / Code: ${$(this).attr('propertycode')} / ${$(this).attr('propertyvalue')}`)
  })

  $('[data-sidebar]').click(function (e) {
    e.preventDefault();
    const id = $(this).data('sidebar');
    $("body").addClass("overflow-hidden");
    $(`#${id}`).css({ right: '-100%', display: 'block' }).animate({ right: '0' }, 200);
  })

  $('[data-sidebar-close]').click(function () {
    $(this).parents('.sidebar').animate({ right: '-100%' }, 200, function () {
      $(this).hide();
    });
    $("body").removeClass("overflow-hidden");
  })

  $('[data-sidebar-select-finish]').click(function () {
    $(this).parents('.sidebar').animate({ right: '-100%' }, 200, function () {
      $(this).hide();
    });
    $("body").removeClass("overflow-hidden");
    const src = $(this).parents('.sidebar').find('.sidebar__select-finish-list li.active img').attr('src');
    const price = $(this).parents('.sidebar').find('.sidebar__select-finish-price span').text();
    if (!!src) {
      $('.product-info__texture .exemple').html(`
        <span>With leather pad – ${price}</span>
         <img src="${src}" alt="">
     `)
    }
  })

  $('.sidebar__composition-item:not(.sidebar__composition-banner)').click(function () {
    $('.sidebar__composition-item').removeClass('active');
    $(this).addClass('active');

    $('.mob-composition').html(`
      <div class="sidebar__composition-footer">
       ${$(this).find('.sidebar__composition-footer').html()
      }
      </div>
      `).show();
  })

  $('[data-sidebar-select-composition]').click(function (e) {
    e.preventDefault();
    $(this).parents('.sidebar').animate({ right: '-100%' }, 200, function () {
      $(this).hide();
    });
    $("body").removeClass("overflow-hidden");
    const src = $(this).parents('.sidebar').find('.sidebar__composition-item.active img').attr('src');
    const price = $(this).parents('.sidebar').find('.sidebar__select-finish-price span').text();
    if (!!src) {
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

    if ($(this).hasClass('gallery-thumb')) {
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


  $('.accordion__title').on('click', function () {
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

      // Clear previous alerts
      $field.removeClass('error');
      $parent.find('.error-allert').remove();

      // Check if field is filled
      if (value === '') {
        showError($field, $parent, message);
        error = 1;
        return false;
      }

      // Email validation
      if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          $field.val('');
          showError($field, $parent, message);
          error = 1;
          return false;
        }
      }

      // Phone validation
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


  $('.text-short-more').click(function () {
    $(this).parent().find('.text-short').addClass('open');
    $(this).hide();
  })

  const $navContainer = $('.other-overview__content-nav');
  const $navLinks = $navContainer.find('a');
  const offsetMargin = 200; // for better sensitivity, you can change

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
      const href = $link.attr('href'); // without #
      if (href === '#' + currentId) {
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
    // Update parallax with additional checks
    updateParallaxElements();

    playHeaderAnimation();
    initRoomFurnitureSlider();
    updateBannerMargin();
  });

  // Initialize Fancybox
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
    loop: true,
    buttons: [
      "zoom",
      "slideShow",
      "fullScreen",
      "thumbs",
      "close"
    ],
    animationEffect: "fade",
    transitionEffect: "fade",
    thumbs: {
      autoStart: false
    }
  });



  $('form').on('submit', function (e) {
    e.preventDefault();
    const $button = $(this).find('.submit');
    addLoading($button);

    setTimeout(() => {
      removeLoading($button);
    }, 4000);
  })

  /**
  * Add Loading Animation
  */
  const addLoading = ($button) => {
    const $addLoader = $('<div class="btn-loader"></div>');

    $button.append($addLoader);
    $button.addClass("is-loading");
    $button.attr("disabled", "disabled");
  };

  /**
  * Remove Loading Animation
  */
  const removeLoading = ($button) => {
    const $loader = $button.find(".btn-loader");

    if ($loader.length) {
      $button.removeClass("is-loading");
      $loader.remove();
      $button.removeAttr("disabled");
    }
  };

  $('[data-notice-close]').click(function () {
    $(this).parents('.notice').fadeOut(200, function () {
      $(this).remove();
    });
  })

  const fileInput = document.getElementById('file');
  if (fileInput) {
    fileInput.addEventListener('change', function (e) {
      const status = document.getElementById('file-status');
      if (status) {
        status.textContent = e.target.files.length ? e.target.files[0].name : 'No file choosen';
      }

      if (e.target.files.length > 0) {
        $(this).parents('.custom-file-upload').find('.icon').show();
        $(this).parents('.custom-file-upload').find('img').hide();
      } else {
        $(this).parents('.custom-file-upload').find('.icon').hide();
        $(this).parents('.custom-file-upload').find('img').show();
      }
    });
  }

  /**shopping-card-tooltip */
  $('.shopping-card-button').click(function (e) {
    e.preventDefault();
    const $tooltip = $('.shopping-card-tooltip');
    const $button = $(this);
    
    if ($tooltip.hasClass('active')) {
      // Close tooltip with animation
      $tooltip.removeClass('active').fadeOut(300, function() {
        if (isMobile()) {
          $("body").removeClass("overflow-hidden");
        }
      });
      $button.removeClass('active');
    } else {
      // Open tooltip with animation
      $tooltip.addClass('active').fadeIn(300, function() {
        if (isMobile()) {
          $("body").addClass("overflow-hidden");
        }
      });
      $button.addClass('active');
    }
  })

  $('.shopping-card-tooltip-close').click(function () {
    const $tooltip = $(this).parents('.shopping-card-tooltip');
    const $button = $('.shopping-card-button');
    
    $tooltip.removeClass('active').fadeOut(300, function() {
      if (isMobile()) {
        $("body").removeClass("overflow-hidden");
      }
    });
    $button.removeClass('active');
  })

  /**end shopping-card-tooltip */

  /**shopping-card-modal */

  /**end shopping-card-modal */

  /**shopping-cart-counter */
  $('.input-counter-button').click(function() {
    const $counter = $(this).closest('.input-counter');
    const $input = $counter.find('input[type="number"]');
    const currentValue = parseInt($input.val()) || 0;
    const minValue = parseInt($input.attr('min')) || 1;
    const maxValue = parseInt($input.attr('max')) || 999;
    
    if ($(this).hasClass('plus')) {
      // Increase value
      const newValue = Math.min(currentValue + 1, maxValue);
      $input.val(newValue);
    } else if ($(this).hasClass('minus')) {
      // Decrease value
      const newValue = Math.max(currentValue - 1, minValue);
      $input.val(newValue);
    }
    
    // Trigger change event to update price
    $input.trigger('change');
  });

  // Handle direct input in field
  $('.input-counter input[type="number"]').on('input', function() {
    const $input = $(this);
    const value = parseInt($input.val()) || 0;
    const minValue = parseInt($input.attr('min')) || 1;
    const maxValue = parseInt($input.attr('max')) || 999;
    
    // Limit value within acceptable bounds
    if (value < minValue) {
      $input.val(minValue);
    } else if (value > maxValue) {
      $input.val(maxValue);
    }
  });

  // Update price when quantity changes
  $('.input-counter input[type="number"]').on('change', function() {
    // const $input = $(this);
    // const quantity = parseInt($input.val()) || 1;
    // const $cartItem = $input.closest('.shopping-cart-content-item');
    // const $priceElement = $cartItem.find('.shopping-cart-price');
    
    // Get base price (without quantity consideration)
    // const basePriceText = $priceElement.text().replace(/[^\d.]/g, '');
    // const basePrice = parseFloat(basePriceText) || 0;
    
    // Calculate new price
    // const newPrice = basePrice * quantity;
    
    // Update price display
    // $priceElement.text(`$${newPrice.toFixed(2)}`);
    
    // Update cart total (if exists)
    updateCartTotal();
  });

  // Function to update cart total
  function updateCartTotal() {
    let total = 0;
    
    $('.shopping-cart-content-item').each(function() {
      const $item = $(this);
      const $priceElement = $item.find('.shopping-cart-price');
      const $quantityInput = $item.find('.input-counter input[type="number"]');
      
      const priceText = $priceElement.text().replace(/[^\d.]/g, '');
      const price = parseFloat(priceText) || 0;
      const quantity = parseInt($quantityInput.val()) || 1;
      
      total += price * quantity;
    });
    
    // Update total amount (if element exists for display)
    const $totalElement = $('.shopping-cart-total, .cart-total');
    if ($totalElement.length) {
      $totalElement.text(`$${total.toFixed(2)}`);
    }
  }

  // Remove item from cart
  $('.shopping-cart-price-delete-button').click(function() {
    const $cartItem = $(this).closest('.shopping-cart-content-item');
    
    // Remove animation
    $cartItem.fadeOut(300, function() {
      $(this).remove();
      updateCartTotal();
      
      // Check if any items remain in cart
      if ($('.shopping-cart-content-item').length === 0) {
        $('.shopping-cart-content').html('<p class="empty-cart">Your shopping cart is empty</p>');
      }
    });
  });

  /**end shopping-cart-counter */

  /**privacy-policy sidebar navigation */
  function initPrivacyPolicySidebar() {
    const $sidebarNavs = $('.privacy-policy__sidebar-nav');
    const $sidebarTitles = $('.privacy-policy__sidebar-title');
    let currentActiveSection = null;
    let updateTimeout = null;
    
    // Hide all navs by default
    $sidebarNavs.removeClass('active');
    
    function updateActiveSidebarNav() {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const offset = 200; // Offset from top to trigger activation
      
      let activeSection = null;
      
      // If at the top of the page, don't show any active section
      if (scrollTop < 100) {
        if (currentActiveSection !== null) {
          $sidebarNavs.removeClass('active');
          $sidebarTitles.removeClass('active');
          currentActiveSection = null;
        }
        return;
      }
      
      // Check each section to find which one is currently in view
      $sidebarTitles.each(function() {
        const $title = $(this);
        const targetId = $title.attr('href');
        const $targetSection = $(targetId);
        
        if ($targetSection.length) {
          const sectionTop = $targetSection.offset().top;
          const sectionBottom = sectionTop + $targetSection.outerHeight();
          
          // Check if section is in viewport with more precise logic
          if (scrollTop + offset >= sectionTop && scrollTop + offset < sectionBottom) {
            activeSection = targetId;
          }
        }
      });
      
      // If at the bottom of the page, activate the last section
      if (!activeSection && scrollTop + windowHeight >= $(document).height() - 100) {
        const $lastTitle = $sidebarTitles.last();
        activeSection = $lastTitle.attr('href');
      }
      
              // Only update if active section changed
        if (activeSection !== currentActiveSection) {
          $sidebarNavs.removeClass('active');
          $sidebarTitles.removeClass('active');
          
          if (activeSection) {
            const $activeTitle = $(`[href="${activeSection}"]`);
            const $activeNav = $activeTitle.siblings('.privacy-policy__sidebar-nav');
            
            $activeTitle.addClass('active');
            $activeNav.addClass('active');
            
            // Update mobile navigation
            $('.privacy-policy__sidebar-mobile a').removeClass('active');
            $(`.privacy-policy__sidebar-mobile a[href="${activeSection}"]`).addClass('active');
          } else {
            // Clear mobile navigation if no active section
            $('.privacy-policy__sidebar-mobile a').removeClass('active');
          }
          
          currentActiveSection = activeSection;
        }
    }
    
    // Debounce function for better performance
    function debounce(func, wait) {
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => func.apply(context, args), wait);
      };
    }
    
    // Call on scroll and resize with debouncing
    $(window).on('scroll', debounce(updateActiveSidebarNav, 50));
    $(window).on('resize', debounce(updateActiveSidebarNav, 100));
    
    // Initial call
    updateActiveSidebarNav();
    
    // Handle hash in URL on page load
    if (window.location.hash) {
      setTimeout(() => {
        updateActiveSidebarNav();
      }, 100);
    }
    
    // Handle hash change
    $(window).on('hashchange', function() {
      setTimeout(() => {
        updateActiveSidebarNav();
      }, 100);
    });
    
    // Handle smooth scroll completion
    $('.scroll').on('click', function() {
      setTimeout(() => {
        updateActiveSidebarNav();
      }, 600); // Wait for smooth scroll to complete
    });
  }
  
  // Initialize privacy policy sidebar if on privacy policy page
  if ($('.privacy-policy').length) {
    initPrivacyPolicySidebar();
    
    // Handle clicks on sidebar titles
    $('.privacy-policy__sidebar-title').on('click', function(e) {
      const $title = $(this);
      const $nav = $title.siblings('.privacy-policy__sidebar-nav');
      
      // If nav is already active, don't prevent default (allow scroll)
      if (!$nav.hasClass('active')) {
        e.preventDefault();
        $nav.addClass('active');
        $title.addClass('active');
      }
    });
    
    // Handle clicks on sidebar links
    $('.privacy-policy__sidebar-link').on('click', function() {
      // Update active state after scroll
      setTimeout(() => {
        updateActiveSidebarNav();
      }, 500);
    });
    
    // Handle mobile navigation clicks
    $('.privacy-policy__sidebar-mobile a').on('click', function() {
      const $link = $(this);
      const targetId = $link.attr('href');
      
      // Update mobile navigation active state
      $('.privacy-policy__sidebar-mobile a').removeClass('active');
      $link.addClass('active');
      
      // Update desktop sidebar after scroll
      setTimeout(() => {
        updateActiveSidebarNav();
      }, 500);
    });
  }

  /**end privacy-policy sidebar navigation */


  // Store element position once
  let elementNaturalPosition = null;
  
  function updateElementPosition() {
    const $orderSummaryTotalWrapper = $('.shopping-cart-order-summary-total-wrapper');
    if ($orderSummaryTotalWrapper.length && isMobile()) {
      const elementOffset = $orderSummaryTotalWrapper.offset().top;
      const elementHeight = $orderSummaryTotalWrapper.outerHeight();
      elementNaturalPosition = elementOffset + elementHeight;
    }
  }
  
  // Update position on resize
  $(window).on('resize', updateElementPosition);
  
  // Set initial position
  updateElementPosition();
  
  $(window).on('scroll', function() {
    const $orderSummaryTotalWrapper = $('.shopping-cart-order-summary-total-wrapper');
    if ($orderSummaryTotalWrapper.length && isMobile() && elementNaturalPosition !== null) {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      
      // If scroll is more than 50px and block hasn't reached its natural position
      const shouldBeFixed = scrollTop > 0 && scrollTop + windowHeight < elementNaturalPosition;
      
      if (shouldBeFixed) {
        $orderSummaryTotalWrapper.addClass('scroll');
      } else {
        $orderSummaryTotalWrapper.removeClass('scroll');
      }
    }
  });

});