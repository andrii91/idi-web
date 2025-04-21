$(document).ready(function () {

  function isMobile() {
    // Перевірка ширини екрана
    var windowWidth = $(window).width();
  
    // Інші можливі умови для визначення мобільного телефона
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    var isSmallScreen = windowWidth < 1023; // Наприклад, визначити маленький екран як ширину менше 768 пікселів
  
    // Повернути true, якщо виконується хоча б одна умова
    return isTouchDevice || isSmallScreen;
  }

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

  function initMenu() {


    $(".navigation-menu > li").each(function () {
      const $li = $(this);
      const $submenu = $li.find(".navigation-menu-submenu");
  
      if(!isMobile()) {
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
  

  $(window).resize(function(){
    initMenu();

    if(!isMobile()) {
      $('body').removeClass('overflow-hidden')
    }
  })

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


  $('.gallery-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.gallery-slider-nav'
  });

  $('.gallery-slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.gallery-slider',
    dots: false,
    focusOnSelect: true,
    prevArrow: `<svg class="gallery-slider-prev">
              <use xlink:href="#arr-left"></use>
            </svg>`,
    nextArrow: `<svg class="gallery-slider-next">
              <use xlink:href="#arr-right"></use>
            </svg>`,
  });

  $('.dinning-room__tabs li a').click(function(e) {
    e.preventDefault();
    const $this = $(this);
    
    // Переключення табів
    $('.dinning-room__tabs li a, .dinning-room__item').removeClass('active');
    $this.addClass('active');
    $($this.attr('href')).addClass('active');
  
    // Перезапуск slick
    $('.dinning-room__slider').slick('setPosition');
    $('.dinning-room__slider-nav').slick('setPosition');
  });

  $('.reviews__slider').slick({
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
  });
  
  
  $('.fade-in').addClass("hidden_animation").viewportChecker({
    classToAdd: 'visible animated fadeIn', 
    offset: '10%',
    removeClassAfterAnimation: true,
    classToRemove: "hidden_animation"
  });

  $('.fade-in-right').addClass("hidden_animation").viewportChecker({
    classToAdd: 'visible animated fadeInRight', 
    offset: '10%',
    removeClassAfterAnimation: true,
    classToRemove: "hidden_animation"
  });

  $('.fade-in-left').addClass("hidden_animation").viewportChecker({
    classToAdd: 'visible animated fadeInLeft', 
    offset: '10%',
    removeClassAfterAnimation: true,
    classToRemove: "hidden_animation"
  });

  $('.fade-in-up').addClass("hidden_animation").viewportChecker({
    classToAdd: 'visible animated fadeInUp', 
    offset: '10%',
    removeClassAfterAnimation: true,
    classToRemove: "hidden_animation"
  });

  $('.open-submenu').click(function(){
    $('.navigation-menu-submenu').removeClass('open').removeAttr('style');

    $(this).parent().find('.navigation-menu-submenu').addClass('open')
  })

  $('.close-submenu').click(function(){
    $('.navigation-menu-submenu').removeClass('open').removeAttr('style')
  })

  $('.navigation-menu-submenu-cat').click(function(){
    if(isMobile()) {
      $(this).toggleClass('active');
      $(this).parent().find('.navigation-menu-submenu-list').toggleClass('active')
    }
  })

  $('.mobile-btn').click(function(){
    $(this).toggleClass('active');
    $('#navigation-menu').toggleClass('active');
    // $('body').addClass('overflow-hidden')
  })
  

});
