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
  
  
});
