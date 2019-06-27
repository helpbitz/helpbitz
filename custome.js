"use strict";
$(document).on("ready", function() {
  var windowVar = $(window);
  var $main = $("html, body");
  var elImg = $(".bg-img");
  var elColor = $(".bg-color");
  var menuItems = $(".all-menu-wrapper .nav-link");
  var menuIcon = $(".menu-icon, #navMenuIcon");
  var menuBlock = $(".all-menu-wrapper");
  var reactToMenu = $(".page-main, .navbar-sidebar, .page-cover");
  var menuLinks = $(".navbar-mainmenu a, .navbar-sidebar a");
  var imageListSlide = $(".slide-show .img");
  var videoBg = $(".video-container video, .video-container object");
  var pageSectionDivs = $(".page-fullpage .section");
  var headerContainer = $(".hh-header");
  var slideElem = $(".slide");
  var arrowElem = $(".p-footer .arrow-d");
  var pageElem = $(".section");
  var mainPage = $("#mainpage");
  var sendEmailForm = $(".send_email_form");
  var sendMessageForm = $(".send_message_form");
  var imageSlides = [];
  var pageSections = [];
  var pageAnchors = [];
  var scrollOverflow = true;
  var css3 = true;
  windowVar.on("load", function() {
    $("#pageloader").addClass("p-hidden");
    $(".section").addClass("anim");
  });
  $.fn.initForm = function(options) {
    var settings = $.extend(
      {
        type: "post",
        serverUrl: "#",
        successClean: this.find(".form-success-clean"),
        successGone: this.find(".form-success-gone"),
        successInvisible: this.find(".form-success-invisible"),
        successVisible: this.find(".form-success-visible"),
        textFeedback: this.find(".form-text-feedback")
      },
      options
    );
    var $ajax = {
      sendRequest: function(p) {
        var form_fill = $(p);
        var form_inputs = form_fill.find(":input");
        var form_data = {};
        form_inputs.each(function() {
          form_data[this.name] = $(this).val();
        });
        $.ajax({
          url: settings.serverUrl,
          type: settings.type,
          data: form_data,
          dataType: "json",
          success: function(data) {
            if (data && !data.error) {
              settings.successClean.val("");
              settings.successInvisible.addClass("invisible");
              settings.successGone.addClass("gone");
              settings.successVisible.removeClass("invisible");
              settings.successVisible.removeClass("gone");
              console.log("Request sent successfully");
            } else {
              settings.textFeedback.removeClass("gone");
              settings.textFeedback.removeClass("invisible");
              settings.textFeedback.html("Error when sending request.");
              console.log("Could not process AJAX request to server");
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            settings.textFeedback.removeClass("gone");
            settings.textFeedback.removeClass("invisible");
            settings.textFeedback.html("Error when sending request.");
            console.log("ajax error");
          }
        });
      }
    };
    if (jQuery.validator) {
      jQuery.validator.setDefaults({
        success: "valid"
      });
      this.validate({
        rules: {
          field: {
            required: true,
            email: true
          }
        }
      });
    }
    this.submit(function(event) {
      event.preventDefault();
      if (jQuery.validator) {
        if ($(this).valid()) {
          $ajax.sendRequest(this);
        }
      } else {
        $ajax.sendRequest(this);
      }
    });
  };
  for (var i = 0; i < elImg.length; i++) {
    var src = elImg[i].getAttribute("data-image-src");
    elImg[i].style.backgroundImage = "url('" + src + "')";
    elImg[i].style.backgroundRepeat = "no-repeat";
    elImg[i].style.backgroundPosition = "center";
    elImg[i].style.backgroundSize = "cover";
  }
  for (var i = 0; i < elColor.length; i++) {
    var src = elColor[i].getAttribute("data-bgcolor");
    elColor[i].style.backgroundColor = src;
  }
  menuIcon.on("click", function() {
    menuIcon.toggleClass("menu-visible");
    menuBlock.toggleClass("menu-visible");
    menuItems.toggleClass("menu-visible");
    reactToMenu.toggleClass("menu-visible");
    return false;
  });
  menuLinks.on("click", function() {
    menuIcon.removeClass("menu-visible");
    menuBlock.removeClass("menu-visible");
    menuItems.removeClass("menu-visible");
    reactToMenu.removeClass("menu-visible");
    return true;
  });
  new Swiper(".carousel-swiper-beta-demo .swiper-container", {
    pagination: ".carousel-swiper-beta-demo .items-pagination",
    paginationClickable: ".carousel-beta-alpha-demo .items-pagination",
    nextButton: ".carousel-swiper-beta-demo .items-button-next",
    prevButton: ".carousel-swiper-beta-demo .items-button-prev",
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      800: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      440: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  });
  new Swiper(".testimonials .swiper-container", {
    pagination: ".testimonials .items-pagination",
    paginationClickable: ".testimonials .items-pagination",
    loop: true,
    grabCursor: true,
    centeredSlides: false,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    slidesPerView: 1,
    spaceBetween: 55,
    effect: "slide"
  });
  for (var i = 0; i < imageListSlide.length; i++) {
    var src = imageListSlide[i].getAttribute("data-src");
    imageSlides.push({
      src: src
    });
  }
  $(".slide-show").vegas({
    delay: 5000,
    shuffle: true,
    slides: imageSlides,
    animation: ["kenburnsUp", "kenburnsDown", "kenburnsLeft", "kenburnsRight"]
  });
  $(".section .content .anim.anim-wrapped").wrap(
    "<span class='anim-wrapper'></span>"
  );
  if (windowVar.width() < 601) {
    scrollOverflow = false;
    css3 = false;
  }
  if (windowVar.height() < 480) {
    scrollOverflow = false;
    css3 = false;
  }
  for (var i = 0; i < pageSectionDivs.length; i++) {
    pageSections.push(pageSectionDivs[i]);
  }
  window.asyncEach(
    pageSections,
    function(pageSection, cb) {
      var anchor = pageSection.getAttribute("data-section");
      pageAnchors.push(anchor + "");
      cb();
    },
    function(err) {
      if (mainPage.width()) {
        mainPage.fullpage({
          menu: "#qmenu",
          anchors: pageAnchors,
          verticalCentered: false,
          css3: css3,
          navigation: true,
          responsiveWidth: 601,
          responsiveHeight: 480,
          scrollOverflow: scrollOverflow,
          scrollOverflowOptions: {
            click: true,
            submit: true
          },
          normalScrollElements: ".section .scrollable",
          afterRender: function() {
            videoBg.maximage("maxcover");
            var isIE = false || !!document.documentMode;
            if (isIE) {
              var contentColumns = $(".section .content .c-columns");
              contentColumns.height(windowVar.height());
              for (var i = 0; i < contentColumns.length; i++) {
                if (contentColumns[i].height <= windowVar.height()) {
                  contentColumns[i].style.height = "100vh";
                }
              }
            }
            var newsletterServerUrl = "./backend.php";
            var messageServerUrl = "./backend.php";
            if (
              sendEmailForm.attr("action") &&
              sendEmailForm.attr("action") != ""
            ) {
              newsletterServerUrl = sendEmailForm.attr("action");
            }
            if (
              sendMessageForm.attr("action") &&
              sendMessageForm.attr("action") != ""
            ) {
              messageServerUrl = sendMessageForm.attr("action");
            }
            sendEmailForm.initForm({
              serverUrl: newsletterServerUrl
            });
            sendMessageForm.initForm({
              serverUrl: messageServerUrl
            });
          },
          afterResize: function() {
            var pluginContainer = $(this);
            $.fn.fullpage.reBuild();
          },
          onLeave: function(index, nextIndex, direction) {
            arrowElem.addClass("gone");
            pageElem.addClass("transition");
            slideElem.removeClass("transition");
            pageElem.removeClass("transition");
          },
          afterLoad: function(anchorLink, index) {
            if ($(".section.active").hasClass("hide-clock")) {
              headerContainer.addClass("gone");
            } else {
              headerContainer.removeClass("gone");
            }
          }
        });
      }
    }
  );
  $(".scrolldown a, .scroll.down").on("click", function() {
    try {
      $.fn.fullpage.moveSectionDown();
    } catch (error) {
      $main.animate(
        {
          scrollTop: window.innerHeight
        },
        400,
        function() {}
      );
    }
  });
  windowVar.on("scroll", function() {
    var scrollpos = $(this).scrollTop();
    var siteHeaderFooter = $(".page-footer, .page-header");
    if (scrollpos > 100) {
      siteHeaderFooter.addClass("scrolled");
    } else {
      siteHeaderFooter.removeClass("scrolled");
    }
  });
});
