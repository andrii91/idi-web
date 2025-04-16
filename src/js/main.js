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


  $('.dinning-room__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.dinning-room__slider-nav'
  });

  $('.dinning-room__slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.dinning-room__slider',
    dots: false,
    focusOnSelect: true
  });
  
  
});
