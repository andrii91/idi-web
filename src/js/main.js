$(document).ready(function () {
  function isMobile() {
    const windowWidth = $(window).width();
    const isTouchDevice = "ontouchstart" in document.documentElement;
    const isSmallScreen = windowWidth < 1024;
    return isSmallScreen;
  }

  function openSearchPanel() {
    // Disable body scroll when search panel opens
    $("body").css("overflow", "hidden");

    $("#navigation-menu-row").fadeOut(200, function () {
      if (isMobile()) {
        $(".navigation-logo").fadeOut(200);
        $(".navigation-content").addClass("w-full");
      }
      $("#search-block").fadeIn(200, function() {
        // Calculate search results height after panel is visible
        calculateSearchResultsHeight();
      }).find("input").focus();
    });
  }

  function closeSearchPanel() {
    $("#search-block").fadeOut(200, function () {
      // Enable body scroll when search panel closes
      $("body").css("overflow", "");
      
      $("#navigation-menu-row").fadeIn(200);
      if (isMobile()) {
        $(".navigation-logo").fadeIn(200);
        $(".navigation-content").removeClass("w-full");
      }
    });
    $(document).off("click.searchOutside");
    $(document).off("keydown.searchEscape");
  }

  function calculateSearchResultsHeight() {
    if (isMobile()) {
      const windowHeight = $(window).height();
      const navigationHeight = $(".navigation").outerHeight() || 0;
      const bannerHeight = $("#banner-info").is(":visible") ? $("#banner-info").outerHeight() : 0;
      
      // Calculate available height for search results
      const availableHeight = windowHeight - navigationHeight - bannerHeight;
      
      // Set the height for both search results blocks
      $("#search-results").css("height", availableHeight + "px");
      $("#search-results-list").css("height", availableHeight + "px");
    } else {
      // Remove height restriction on desktop
      $("#search-results").css("height", "");
      $("#search-results-list").css("height", "");
    }
  }

  function adaptSearchPanelOnResize() {
    // Check if search panel is currently visible
    if ($("#search-block").is(":visible")) {
      // Hide navigation menu row if not already hidden
      if ($("#navigation-menu-row").is(":visible")) {
        $("#navigation-menu-row").hide();
      }
      
      // Apply mobile/desktop specific styles
      if (isMobile()) {
        $(".navigation-logo").hide();
        $(".navigation-content").addClass("w-full");
      } else {
        $(".navigation-logo").show();
        $(".navigation-content").removeClass("w-full");
      }
      
      // Recalculate search results height
      calculateSearchResultsHeight();
    }
  }

  $(window).scroll(function () {
    return $(".navigation").toggleClass("scroll", $(window).scrollTop() > 0);
  });

  // Handle window resize to adapt search panel behavior
  $(window).resize(function () {
    adaptSearchPanelOnResize();
  });

  // Initial calculation on page load if search panel is visible
  $(document).ready(function() {
    if ($("#search-block").is(":visible")) {
      calculateSearchResultsHeight();
    }
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
      
      // Recalculate search results height if search panel is open
      if ($("#search-block").is(":visible")) {
        calculateSearchResultsHeight();
      }
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

  // Product colors tabs
  $(".tabs-list__item-link").click(function (e) {
    e.preventDefault();
    const $this = $(this);
    const targetId = $this.attr("href");

    // Remove active class from all tabs and content items
    $(".tabs-list__item-link").removeClass("active");
    $(".product-colors__content-item").removeClass("active");

    // Add active class to clicked tab and corresponding content
    $this.addClass("active");
    $(targetId).addClass("active");
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

  const animationObserver = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        for (const key in fadeMap) {
          if (el.classList.contains(key)) {
            el.classList.add("visible", "animated", fadeMap[key]);
            el.classList.remove("hidden_animation");
            
            // Add event listener to remove animation classes after animation completes
            const animationDuration = 1000; // 1 second animation duration
            setTimeout(() => {
              el.classList.remove("animated", fadeMap[key]);
            }, animationDuration);
            
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
      animationObserver.observe(el);
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
    openSearchPanel();

    // Add handler after short pause
    setTimeout(() => {
      $(document).on("click.searchOutside", function (e) {
        if (
          !$(e.target).closest("#search-block").length &&
          !$(e.target).is("#search-button")
        ) {
          closeSearchPanel();
        }
      });

      // Add Escape key handler for closing search panel
      $(document).on("keydown.searchEscape", function (e) {
        if (e.key === "Escape" && $("#search-block").is(":visible")) {
          closeSearchPanel();
        }
      });

      // Handle input focus - show popular searches
      $("#search-block input").on("focus", function () {
        const value = $(this).val();
        
        if (value.length < 3) {
          $("#search-results-list").fadeOut(200);
          $("#search-results").fadeIn(200, function() {
            calculateSearchResultsHeight();
          });
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
          $("#search-results").fadeOut(200);
          $("#search-results-list").fadeIn(200, function() {
            // Calculate height when results are shown
            calculateSearchResultsHeight();
          });
        } else {
          $("#search-results-list").fadeOut(200);
          $("#search-results").fadeIn(200, function() {
            calculateSearchResultsHeight();
          });
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

        // Hide both search results blocks
        $("#search-results").fadeOut(200);
        $("#search-results-list").fadeOut(200);

        // Close search panel completely
        closeSearchPanel();
      });
    }, 10);
  });

  $(".filters__button").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("current");
    
    // Check if this is a key features filter button
    if ($(this).parents('.filters-key-features__types').length) {
      const activeFiltersCount = $('.filters-key-features__types .filters__button.current').length;
      
      if(activeFiltersCount > 0) {
        $('.filters-key-features__reset-all').addClass('active');
      } else {
        $('.filters-key-features__reset-all').removeClass('active');
      }
    }
  });

  function checkFilters() {
    let filtersSelectsCount = 0;

    // Check only multiple selects (filters), exclude sort_by select
    $(".group-selects select[multiple]").each(function () {
      const val = $(this).val();
      if (val && val.length > 0) {
        filtersSelectsCount++;
      }
    });

    if (filtersSelectsCount > 0) {
      $(".filters__reset-all").show();
    } else {
      $(".filters__reset-all").hide();
    }
  }

  checkFilters();

  // Listen to changes only on filter selects (multiple), not on sort_by
  $(".group-selects select[multiple]").change(checkFilters);

  $(".filters__reset-all").on("click", function () {
    
    const $groupSelects = $(this).closest('.group-selects');
    
    // Clear only multiple selects (filters), exclude sort_by
    $groupSelects.find("select[multiple]").each(function () {
      const $select = $(this);
      // For multiple selects, uncheck all selected options
      $select.find("option").prop("selected", false);
      $select.val(null); // Explicitly set to null
    });

    // If custom selects are used, update them
    $groupSelects.find(".dropdown-wrapper").each(function () {
      const $dropdown = $(this);
      const $select = $dropdown.prev("select");
      
      // Only reset if it's a multiple select (filter)
      if ($select.attr("multiple")) {
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
      }
    });

    // Check filters after a small delay to ensure values are updated
    setTimeout(function() {
      checkFilters();
    }, 50);
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
    // Disable body scroll when sidebar opens
    $("body").css("overflow", "hidden");
    $(`#${id}`).css({ right: '-100%', display: 'block' }).animate({ right: '0' }, 200, function() {
      // Update button text when configure sidebar opens
      if (id === 'configure-sidebar' && typeof updateNextStepButtonText === 'function') {
        updateNextStepButtonText();
      }
    });
  })

  $('[data-sidebar-close]').click(function () {
    $(this).parents('.sidebar').animate({ right: '-100%' }, 200, function () {
      $(this).hide();
      // Enable body scroll when sidebar closes
      $("body").css("overflow", "");
    });
  })

  $('[data-sidebar-select-finish]').click(function () {
    $(this).parents('.sidebar').animate({ right: '-100%' }, 200, function () {
      $(this).hide();
      // Enable body scroll when sidebar closes
      $("body").css("overflow", "");
    });
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
      // Enable body scroll when sidebar closes
      $("body").css("overflow", "");
    });
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
      const type = $field.attr('type');
      const message = $field.data('valid') || defaultError;
      const $parent = $field.closest('label');

      // Clear previous alerts
      $field.removeClass('error');
      $parent.find('.error-allert').remove();

      // Special validation for radio buttons and checkboxes
      if (type === 'radio' || type === 'checkbox') {
        const name = $field.attr('name');
        const $group = $form.find(`[name="${name}"]`);
        const isChecked = $group.is(':checked');
        
        if (!isChecked) {
          // For radio buttons, show error on all radio buttons in the group
          if (type === 'radio') {
            $group.each(function() {
              const $radio = $(this);
              const $radioParent = $radio.closest('label');
              showError($radio, $radioParent, message);
            });
          } else {
            showError($field, $parent, message);
          }
          error = 1;
          return false;
        }
      } else {
        // Regular input validation
        const value = $field.val().trim();
        
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
      }
    });

    if (!error) {
      $form.unbind('submit').submit();
    }

    function showError($field, $parent, msg) {
      $field.addClass('error');
      // Check if error message already exists to avoid duplicates
      if ($parent.find('.error-allert').length === 0) {
        $parent.append(`<div class="error-allert">${msg}</div>`);
      }
      $field.focus();
    }
  });

  // Clear errors when radio buttons or checkboxes are selected
  $('input[type="radio"], input[type="checkbox"]').on('change', function() {
    const $field = $(this);
    const type = $field.attr('type');
    const name = $field.attr('name');
    const $form = $field.closest('form');
    
    if (type === 'radio') {
      // Clear errors for all radio buttons in the group
      const $group = $form.find(`[name="${name}"]`);
      $group.removeClass('error');
      $group.each(function() {
        $(this).closest('label').find('.error-allert').remove();
      });
    } else {
      // Clear error for this checkbox
      $field.removeClass('error');
      $field.closest('label').find('.error-allert').remove();
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

  $('input[name="phone"]').inputmask({
    mask: "+9{1,15}",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });


  $(window).on("resize", function () {
    // Update parallax with additional checks
    updateParallaxElements();

    playHeaderAnimation();
    initRoomFurnitureSlider();
    updateBannerMargin();
    scrollToCurrentStep();
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

  /**order page steps scroll logic */
  function scrollToCurrentStep() {
    const $stepsWrapper = $('.order-page__steps');
    
    if (!$stepsWrapper.length) return;
    
    let $targetStep;
    
    if (isMobile()) {
      // On mobile, scroll to current step
      $targetStep = $('.order-page__step.current');
    } else {
      // On desktop, scroll to completed step
      $targetStep = $('.order-page__step.completed');
    }
    
    if ($targetStep.length) {
      const $stepsContainer = $('.order-page__steps-container');
      
      if ($stepsContainer.length) {
        // Calculate the position to scroll to
        const stepOffset = $targetStep.position().left;
        const containerWidth = $stepsWrapper.width();
        const stepWidth = $targetStep.outerWidth();
        
        // Center the target step in the viewport
        const scrollPosition = stepOffset - (containerWidth / 2) + (stepWidth / 2) + 55;
        
        // Animate scroll to the target step
        $stepsWrapper.animate({
          scrollLeft: scrollPosition
        }, 500);
      }
    }
  }

  // Call function on page load if on order page
  if ($('.order-page').length) {
    // Small delay to ensure DOM is fully loaded
    setTimeout(scrollToCurrentStep, 100);
  }

  /**end order page steps scroll logic */

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

  // Configure Now button sticky functionality
  let configureButtonContainer = null;
  
  function updateConfigureButtonPosition() {
    const $configureButton = $('#configure-now');
    if ($configureButton.length && isMobile() && !$configureButton.hasClass('scroll')) {
      // Store button container (product-info__price-item block)
      const $container = $configureButton.closest('.product-info__price-item');
      if ($container.length) {
        configureButtonContainer = {
          top: $container.offset().top,
          bottom: $container.offset().top + $container.outerHeight()
        };
      }
    }
  }
  
  // Update position on resize
  $(window).on('resize', function() {
    const $configureButton = $('#configure-now');
    if ($configureButton.length && isMobile()) {
      $configureButton.removeClass('scroll');
      configureButtonContainer = null;
      setTimeout(updateConfigureButtonPosition, 100);
    }
  });
  
  // Set initial position
  updateConfigureButtonPosition();
  
  $(window).on('scroll', function() {
    const $configureButton = $('#configure-now');
    if ($configureButton.length && isMobile()) {
      if (configureButtonContainer === null) {
        updateConfigureButtonPosition();
      }
      
      if (configureButtonContainer !== null) {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const windowBottom = scrollTop + windowHeight;
        
        // Button should be fixed when:
        // 1. User scrolled below the start of the block
        // 2. And bottom of screen is below bottom of container (i.e., scrolled past the block)
        const shouldBeFixed = scrollTop > 0 && windowBottom > configureButtonContainer.bottom;
        
        if (shouldBeFixed) {
          $configureButton.addClass('scroll');
        } else {
          $configureButton.removeClass('scroll');
        }
      }
    }
  });

  /**checkout page functionality */
  // Initialize checkout page state
  if ($('.checkout-page').length) {
    // Set initial state of billing fields based on checkbox
    const $billingRequiredFields = $('.checkout-page__billing-address input[required]');
    if ($('#same-as-shipping').is(':checked')) {
      $billingRequiredFields.removeAttr('required');
      $('.checkout-page__billing-address').addClass('checkout-page__billing-address--hidden');
    } else {
      $billingRequiredFields.attr('required', 'required');
      $('.checkout-page__billing-address').removeClass('checkout-page__billing-address--hidden');
    }
  }
  
  // Handle billing address same as shipping checkbox
  $('#same-as-shipping').on('change', function() {
    const $billingAddress = $('.checkout-page__billing-address');
    const $billingRequiredFields = $billingAddress.find('input[required]');
    const $billingFields = $billingAddress.find('input');
    
    if ($(this).is(':checked')) {
      $billingAddress.addClass('checkout-page__billing-address--hidden');
      // Remove required attribute from billing fields
      $billingRequiredFields.removeAttr('required');
      // Copy shipping address values to billing address
      copyShippingToBilling();
    } else {
      $billingAddress.removeClass('checkout-page__billing-address--hidden');
      // Add required attribute back to billing fields
      $billingRequiredFields.attr('required', 'required');
      // Clear billing address fields when showing them
      $billingFields.val('');
    }
  });

  // Copy shipping address to billing address
  function copyShippingToBilling() {
    const fieldMappings = [
      { shipping: '#shipping-first-name', billing: '#billing-first-name' },
      { shipping: '#shipping-last-name', billing: '#billing-last-name' },
      { shipping: '#shipping-phone', billing: '#billing-phone' },
      { shipping: '#shipping-email', billing: '#billing-email' },
      { shipping: '#shipping-address', billing: '#billing-address' },
      { shipping: '#shipping-city', billing: '#billing-city' },
      { shipping: '#shipping-state', billing: '#billing-state' },
      { shipping: '#shipping-zip', billing: '#billing-zip' }
    ];
    
    fieldMappings.forEach(mapping => {
      const shippingValue = $(mapping.shipping).val();
      $(mapping.billing).val(shippingValue);
    });
  }

  // Handle coupon remove button
  $('.order-summary__coupon-remove').on('click', function() {
    const $couponSection = $('.order-summary__coupon-section');
    const $orderTotal = $('.order-summary__total-text--price');
    const currentTotal = parseFloat($orderTotal.text().replace('$', '').replace(',', ''));
    const couponDiscount = 511.00;
    const newTotal = currentTotal + couponDiscount;
    
    $couponSection.fadeOut(300, function() {
      $(this).remove();
      $orderTotal.text('$' + newTotal.toFixed(2));
    });
  });



  /**end checkout page functionality */

  $('[data-tooltip]').hover(function() {
    const tooltipText = $(this).data('tooltip');
    const $tooltipElement = $(`<div class="tooltip">${tooltipText}</div>`);
    $(this).append($tooltipElement);
    
    // Calculate position to prevent tooltip from being cut off
    const $trigger = $(this);
    
    // Get positions
    const triggerRect = $trigger[0].getBoundingClientRect();
    const tooltipRect = $tooltipElement[0].getBoundingClientRect();
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    
    // Calculate available space
    const spaceRight = windowWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;
    const spaceTop = triggerRect.top;
    const spaceBottom = windowHeight - triggerRect.bottom;
    
    // Position tooltip
    let left = 0;
    let top = 0;
    
    // Horizontal positioning
    if (spaceRight >= tooltipRect.width) {
      // Enough space on the right
      left = 0;
    } else if (spaceLeft >= tooltipRect.width) {
      // Enough space on the left
      left = -(tooltipRect.width - triggerRect.width);
    } else {
      // Not enough space on either side, adjust to fit within viewport
      if (tooltipRect.width > windowWidth) {
        // Tooltip is wider than viewport, center it
        left = -(tooltipRect.width - triggerRect.width) / 2;
      } else {
        // Adjust to fit within viewport
        if (triggerRect.left + tooltipRect.width > windowWidth) {
          left = windowWidth - triggerRect.right - tooltipRect.width;
        } else if (triggerRect.left < 0) {
          left = -triggerRect.left;
        } else {
          left = -(tooltipRect.width - triggerRect.width) / 2;
        }
      }
    }
    
    // Vertical positioning
    if (spaceTop >= tooltipRect.height) {
      // Show above (preferred)
      top = -(tooltipRect.height + 8);
    } else if (spaceBottom >= tooltipRect.height) {
      // Show below
      top = triggerRect.height + 8;
    } else {
      // Not enough vertical space, try horizontal positioning
      if (spaceRight >= tooltipRect.width) {
        // Show to the right
        left = triggerRect.width + 8;
        top = (triggerRect.height - tooltipRect.height) / 2;
      } else if (spaceLeft >= tooltipRect.width) {
        // Show to the left
        left = -(tooltipRect.width + 8);
        top = (triggerRect.height - tooltipRect.height) / 2;
      } else {
        // Not enough horizontal space either, adjust to fit
        if (tooltipRect.width > windowWidth) {
          // Tooltip is wider than viewport, center it horizontally
          left = -(tooltipRect.width - triggerRect.width) / 2;
          top = (triggerRect.height - tooltipRect.height) / 2;
        } else {
          // Adjust horizontal position to fit within viewport
          if (triggerRect.left + tooltipRect.width > windowWidth) {
            left = windowWidth - triggerRect.right - tooltipRect.width;
          } else if (triggerRect.left < 0) {
            left = -triggerRect.left;
          } else {
            left = -(tooltipRect.width - triggerRect.width) / 2;
          }
          top = (triggerRect.height - tooltipRect.height) / 2;
        }
      }
    }
    
    // Apply positioning
    $tooltipElement.css({
      position: 'absolute',
      left: left + 'px',
      top: top + 'px',
      zIndex: 1000
    });
    
  }, function() {
    $(this).find('.tooltip').remove();
  })


  $('input[name="card_number"]').inputmask({
    mask: "9999 9999 9999 9999",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('input[name="exp_month"]').inputmask({
    mask: "99",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('input[name="exp_year"]').inputmask({
    mask: "9999",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('input[name="cvv"]').inputmask({
    mask: "9999",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });

  // === Card type detection logic ===
  function getCardType(number) {
    // Remove all non-digit characters
    number = number.replace(/\D/g, '');
    if (/^4/.test(number)) return 'visa';
    if (/^(5[1-5])/.test(number)) return 'mastercard';
    if (/^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^6(?:011|5)/.test(number)) return 'discover';
    if (/^35(2[89]|[3-8][0-9])/.test(number)) return 'jcb';
    if (/^3(?:0[0-5]|[68])/.test(number)) return 'diners';
    return 'unknown';
  }

  // When card number changes, determine type and change icon
  $('input[name="card_number"]').on('input', function() {
    const cardNumber = $(this).val();
    const cardType = getCardType(cardNumber);
    
    // Find SVG card icon
    const $cardIcon = $(this).closest('form').find('.card-icon use');
    if ($cardIcon.length) {
      // Change href based on card type
      switch(cardType) {
        case 'visa':
          $cardIcon.attr('href', '#visa');
          break;
        case 'mastercard':
          $cardIcon.attr('href', '#mastercard');
          break;
        case 'amex':
          $cardIcon.attr('href', '#amex');
          break;
        case 'discover':
          $cardIcon.attr('href', '#discover');
          break;
        case 'jcb':
          $cardIcon.attr('href', '#jcb');
          break;
        case 'diners':
          $cardIcon.attr('href', '#diners');
          break;
        default:
          $cardIcon.attr('href', '#default-card'); 
          break;
      }
    }
  });

  $('#checkout-terms-checkbox').on('change', function() {
    if ($(this).is(':checked')) {
      $('#checkout-submit').removeAttr('disabled');
    } else {
      $('#checkout-submit').attr('disabled', 'disabled');
    }
  });

  // === Floating Label Functionality ===
  function initFloatingLabels() {
    $('.input-text').each(function() {
      const $input = $(this);
      const placeholder = $input.attr('placeholder');
      
      if (placeholder) {
        // Create floating label element
        const $floatingLabel = $('<span class="floating-label"></span>')
          .text(placeholder)
          .css({
            position: 'absolute',
            left: '0',
            bottom: '5px',
            fontSize: '24px',
            fontWeight: '300',
            color: $input.hasClass('dark') ? '#B3B3B3' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.3s ease',
            pointerEvents: 'none',
            zIndex: '1'
          });

        // Wrap input in a container if not already wrapped
        if (!$input.parent().hasClass('input-wrapper')) {
          $input.wrap('<div class="input-wrapper" style="position: relative;"></div>');
        }
        
        const $wrapper = $input.parent();
        $wrapper.append($floatingLabel);
        
        // Remove original placeholder
        $input.removeAttr('placeholder');
        
        // Handle focus events
        $input.on('focus', function() {
          $floatingLabel.css({
            fontSize: '16px',
            bottom: '40px',
            color: $input.hasClass('dark') ? '#B3B3B3' : 'rgba(255, 255, 255, 0.6)'
          });
        });
        
        // Handle blur events
        $input.on('blur', function() {
          if ($input.val().trim() === '') {
            $floatingLabel.css({
              fontSize: '24px',
              bottom: '5px',
              color: $input.hasClass('dark') ? '#B3B3B3' : 'rgba(255, 255, 255, 0.6)'
            });
          }
        });
        
        // Handle input events (for when user types)
        $input.on('input', function() {
          if ($input.val().trim() !== '') {
            $floatingLabel.css({
              fontSize: '16px',
              bottom: '40px',
              color: $input.hasClass('dark') ? '#B3B3B3' : 'rgba(255, 255, 255, 0.6)'
            });
          } else {
            $floatingLabel.css({
              fontSize: '24px',
              bottom: '5px',
              color: $input.hasClass('dark') ? '#B3B3B3' : 'rgba(255, 255, 255, 0.6)'
            });
          }
        });
        
        // Handle error state
        $input.on('input', function() {
          if ($input.hasClass('error')) {
            $floatingLabel.css('color', '#FF0000');
          } else {
            $floatingLabel.css('color', $input.hasClass('dark') ? '#B3B3B3' : 'rgba(255, 255, 255, 0.6)');
          }
        });
        
        // Initialize state if input already has value
        if ($input.val().trim() !== '') {
          $floatingLabel.css({
            fontSize: '16px',
            bottom: '40px',
            color: $input.hasClass('dark') ? '#B3B3B3' : 'rgba(255, 255, 255, 0.6)'
          });
        }
      }
    });
  }

  // Initialize floating labels
  initFloatingLabels();

  // Re-initialize floating labels for dynamically added inputs using MutationObserver
  const floatingLabelsObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            if ($(node).hasClass('input-text')) {
              initFloatingLabels();
            } else if ($(node).find('.input-text').length) {
              initFloatingLabels();
            }
          }
        });
      }
    });
  });

  // Start observing the document body for changes
  floatingLabelsObserver.observe(document.body, {
    childList: true,
    subtree: true
  });


  $(".blog-post-page__slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".blog-post-page__slider-nav",
  });

  $(".blog-post-page__slider-nav").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".blog-post-page__slider",
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

  // Function to manage filters display in 2 rows
  function manageFiltersDisplay() {
    const $container = $('.filters-key-features__types');
    if (!$container.length) return;

    const $items = $container.find('li:not(:has(.show-more-less))');
    const $showMoreBtn = $container.find('li:has(.show-more-less)');
    
    if ($items.length === 0) return;

    // Temporarily remove d-none from all items
    $items.removeClass('d-none');
    $showMoreBtn.hide();
    
    // Force layout recalculation
    $container[0].offsetHeight;
    
    let itemsToShow = [];
    
    // Mobile: show fixed 12 items
    if (isMobile()) {
      const maxMobileItems = 12;
      const needsShowMore = $items.length > maxMobileItems;
      
      if (needsShowMore) {
        // Show first 12 items
        for (let i = 0; i < maxMobileItems; i++) {
          itemsToShow.push(i);
        }
        
        // Hide the rest
        $items.each(function(index) {
          if (index >= maxMobileItems) {
            $(this).addClass('d-none');
          }
        });
        
        $showMoreBtn.show();
      } else {
        // All items fit
        $showMoreBtn.hide();
      }
    } else {
      // Desktop: calculate based on 2 rows
      const firstItemTop = $items.first().offset().top;
      const firstItemHeight = $items.first().outerHeight();
      const verticalGap = 16; // vertical gap from CSS: gap: 16px 18px;
      const horizontalGap = 18; // horizontal gap between items
      
      // Calculate threshold for third row
      // 2 rows = first item top + (height * 2) + (gap * 1) + small tolerance
      const thirdRowThreshold = firstItemTop + (firstItemHeight * 2) + verticalGap + 5;
      
      // Identify items in first two rows
      $items.each(function(index) {
        const $item = $(this);
        const itemTop = $item.offset().top;
        
        if (itemTop < thirdRowThreshold) {
          itemsToShow.push(index);
        }
      });
      
      // Check if we need show-more button
      const allItemsFit = itemsToShow.length >= $items.length;
      
      if (!allItemsFit) {
        // Remove items to ensure button fits in the last row
        // Remove 2-3 items to guarantee space for the button
        const itemsToRemove = Math.min(2, itemsToShow.length);
        for (let i = 0; i < itemsToRemove; i++) {
          if (itemsToShow.length > 0) {
            itemsToShow.pop();
          }
        }
        
        // Hide items that don't fit
        $items.each(function(index) {
          if (!itemsToShow.includes(index)) {
            $(this).addClass('d-none');
          }
        });
        
        $showMoreBtn.show();
      } else {
        // All items fit, hide show-more button
        $showMoreBtn.hide();
      }
    }
  }

  // Call on page load
  manageFiltersDisplay();
  
  // Call on window resize
  let resizeTimer;
  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Only recalculate if not in active state
      if (!$('.filters-key-features__types').hasClass('active')) {
        manageFiltersDisplay();
      }
    }, 250);
  });

  $('.show-more-less').click(function (e) {
    e.preventDefault();
    const $container = $(this).parents('.filters-key-features').find('.filters-key-features__types');
    $container.toggleClass('active');
    $(this).toggleClass('active');
    
    if ($container.hasClass('active')) {
      // Show all items
      $container.find('li:not(:has(.show-more-less))').removeClass('d-none');
    } else {
      // Re-apply 2 rows limit
      manageFiltersDisplay();
    }
  })

  $('.filters-key-features__reset-button').click(function (e) {
    e.preventDefault();
    const $container = $(this).parents('.filters-key-features').find('.filters__button');
    $container.removeClass('current');
    $(this).parent().removeClass('active');
  })

  // Filters colors logic
  function updateColorsResetButton() {
    const $checkedColors = $('.filters-colors__checkbox:checked');
    const $resetButton = $('.filters-colors__reset-button');
    
    if ($checkedColors.length >= 2) {
      $resetButton.addClass('active');
    } else {
      $resetButton.removeClass('active');
    }
  }

  // Handle color checkbox change
  $('.filters-colors__checkbox').on('change', function() {
    updateColorsResetButton();
  });

  // Handle reset button click
  $('.filters-colors__reset-button').click(function(e) {
    e.preventDefault();
    $('.filters-colors__checkbox').prop('checked', false);
    $(this).removeClass('active');
  });

  // Initialize on page load
  updateColorsResetButton();

  // Function to update next step button text based on current step
  function updateNextStepButtonText() {
    const $sidebar = $('.configure-sidebar');
    if (!$sidebar.length) return;
    
    const $currentStep = $sidebar.find('.configure-steps__item.current-step');
    const $nextStepBtn = $sidebar.find('.next-step');
    
    if ($currentStep.length && $nextStepBtn.length) {
      // Try both attr and data methods to ensure we get the value
      const buttonText = $currentStep.attr('data-button-text') || $currentStep.data('button-text');
      if (buttonText) {
        $nextStepBtn.text(buttonText);
      }
    }
  }

  // Function to check if option is selected in current step
  function checkCurrentStepOption() {
    const $sidebar = $('.configure-sidebar');
    if (!$sidebar.length) return;
    
    const $currentStep = $sidebar.find('.configure-steps__item.current-step');
    const $nextStepBtn = $sidebar.find('.next-step');
    
    if ($currentStep.length && $nextStepBtn.length) {
      const $currentStepContent = $currentStep.find('.configure-steps__item-content');
      const $currentStepCurrent = $currentStepContent.find('.configure-steps__current');
      const isOptionSelected = $currentStepCurrent.hasClass('active');
      
      $nextStepBtn.prop('disabled', !isOptionSelected);
    }
  }

  // Function to check if all steps are completed and toggle buttons visibility
  function checkAllStepsCompleted() {
    const $sidebar = $('.configure-sidebar');
    if (!$sidebar.length) return;
    
    const $allSteps = $sidebar.find('.configure-steps__item');
    const $nextStepBtn = $sidebar.find('.next-step');
    const $sendRequestBtn = $sidebar.find('.send-request');
    
    if (!$allSteps.length || !$nextStepBtn.length || !$sendRequestBtn.length) return;
    
    let allStepsCompleted = true;
    
    $allSteps.each(function() {
      const $step = $(this);
      const $stepContent = $step.find('.configure-steps__item-content');
      const $stepCurrent = $stepContent.find('.configure-steps__current');
      const isStepCompleted = $stepCurrent.hasClass('active');
      
      if (!isStepCompleted) {
        allStepsCompleted = false;
        return false; // break loop
      }
    });
    
    if (allStepsCompleted) {
      $nextStepBtn.addClass('d-none');
      $sendRequestBtn.removeClass('d-none');
    } else {
      $nextStepBtn.removeClass('d-none');
      $sendRequestBtn.addClass('d-none');
    }
  }

  $('.configure-steps__item-link').click(function(e) {
    e.preventDefault();
    const $this = $(this);
    $this.parents('.configure-steps__item-content').find('.configure-steps__list').removeClass('active');
    $this.parents('.configure-steps__item-content').find('.configure-steps__current').addClass('active');
    $this.parents('.configure-steps__item').removeClass('active');
    $this.parents('.configure-steps__item-content').find('.configure-steps__current img').attr('src', $this.data('scheme'));
    $this.parents('.configure-steps__item-content').find('.configure-steps__current-description-info').html($this.data('description') + ' ' + $this.data('price'));
    checkCurrentStepOption();
    checkAllStepsCompleted();
  });

  $('.configure-steps__current').click(function(e) {
    e.preventDefault();
    const $this = $(this);
    $this.parents('.configure-steps__item-content').find('.configure-steps__list').addClass('active');
    $this.parents('.configure-steps__item-content').find('.configure-steps__current').removeClass('active');
    $this.parents('.configure-steps__item').addClass('active');
    checkCurrentStepOption();
    checkAllStepsCompleted();
  });

  $('.next-step').click(function(e) {
    e.preventDefault();
    const $this = $(this);
    if ($this.prop('disabled')) return;
    
    const $sidebar = $this.parents('.configure-sidebar');
    const $currentStep = $sidebar.find('.configure-steps__item.current-step');
    const $nextStep = $currentStep.next('.configure-steps__item');
    
    if ($nextStep.length) {
      $currentStep.removeClass('current-step active');
      $nextStep.addClass('current-step active');
      updateNextStepButtonText();
      checkCurrentStepOption();
      checkAllStepsCompleted();
    }
  });

  // Initialize button state on page load
  updateNextStepButtonText();
  checkCurrentStepOption();
  checkAllStepsCompleted();
});