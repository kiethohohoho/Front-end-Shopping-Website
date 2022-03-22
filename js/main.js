"use strict";
var $ = jQuery.noConflict();
$.extend($.easing, {
  def: "easeOutQuad",
  swing: function (e, t, i, n, o) {
    return $.easing[$.easing.def](e, t, i, n, o);
  },
  easeOutQuad: function (e, t, i, n, o) {
    return -n * (t /= o) * (t - 2) + i;
  },
  easeOutQuint: function (e, t, i, n, o) {
    return n * ((t = t / o - 1) * t * t * t * t + 1) + i;
  },
}),
  (window.Riode = {}),
  (function () {
    var e, t, i, n;
    (Riode.$window = $(window)),
      (Riode.$body = $(document.body)),
      (Riode.status = ""),
      (Riode.minDesktopWidth = 992),
      (Riode.isIE = navigator.userAgent.indexOf("Trident") >= 0),
      (Riode.isEdge = navigator.userAgent.indexOf("Edge") >= 0),
      (Riode.isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )),
      (Riode.resizeChanged = !1),
      (Riode.canvasWidth = window.innerWidth),
      (Riode.resizeTimeStamp = 0),
      (Riode.defaults = {
        animation: { name: "fadeIn", duration: "1.2s", delay: ".2s" },
        isotope: {
          itemsSelector: ".grid-item",
          layoutMode: "masonry",
          percentPosition: !0,
          masonry: { columnWidth: ".grid-space" },
          sortBy: "original-order",
        },
        minipopup: {
          message: "",
          productClass: "",
          imageSrc: "",
          imageLink: "#",
          name: "",
          nameLink: "#",
          price: "",
          count: null,
          rating: null,
          actionTemplate: "",
          isPurchased: !1,
          delay: 4e3,
          space: 20,
          priceTemplate: '<span class="product-price">{{price}}</span>',
          ratingTemplate:
            '<div class="ratings-container"><div class="ratings-full"><span class="ratings" style="width:{{rating}}"></span><span class="tooltiptext tooltip-top"></span></div></div>',
          priceQuantityTemplate:
            '<div class="price-box"><span class="product-quantity">{{count}}</span><span class="product-price">{{price}}</span></div>',
          purchasedTemplate:
            '<span class="purchased-time">12 MINUTES AGO</span>',
          template:
            '<div class="minipopup-box"><p class="minipopup-title">{{message}}</p><div class="product product-purchased {{productClass}} mb-0"><figure class="product-media"><a href="{{imageLink}}"><img src="{{imageSrc}}" alt="product" width="90" height="90"></a></figure><div class="product-detail"><a href="{{nameLink}}" class="product-name">{{name}}</a>{{detailTemplate}}</div></div>{{actionTemplate}}</div>',
        },
        popup: {
          removalDelay: 350,
          callbacks: {
            open: function () {
              $("html").css("overflow-y", "hidden"),
                $("body").css("overflow-x", "visible"),
                $(".mfp-wrap").css("overflow", "hidden auto"),
                $(".sticky-header.fixed").css(
                  "padding-right",
                  window.innerWidth - document.body.clientWidth
                );
            },
            close: function () {
              $("html").css("overflow-y", ""),
                $("body").css("overflow-x", "hidden"),
                $(".mfp-wrap").css("overflow", ""),
                $(".sticky-header.fixed").css("padding-right", "");
            },
          },
        },
        popupPresets: {
          login: {
            type: "ajax",
            mainClass: "mfp-login mfp-fade",
            tLoading: "",
            preloader: !1,
          },
          video: {
            type: "iframe",
            mainClass: "mfp-fade",
            preloader: !1,
            closeBtnInside: !1,
          },
          img: {
            type: "iframe",
            mainClass: "mfp-fade",
            preloader: !1,
            closeBtnInside: !1,
          },
          quickview: {
            type: "ajax",
            mainClass: "mfp-product mfp-fade",
            tLoading: "",
            preloader: !1,
          },
        },
        slider: {
          responsiveClass: !0,
          navText: [
            '<i class="d-icon-angle-left">',
            '<i class="d-icon-angle-right">',
          ],
          checkVisible: !1,
          items: 1,
          smartSpeed: Riode.isEdge ? 200 : 500,
          autoplaySpeed: Riode.isEdge ? 200 : 1e3,
          autoplayTimeout: 1e4,
        },
        sliderPresets: {
          "intro-slider": { animateIn: "fadeIn", animateOut: "fadeOut" },
          "product-single-carousel": { dots: !1, nav: !0 },
          "product-gallery-carousel": {
            dots: !1,
            nav: !0,
            margin: 20,
            items: 1,
            responsive: { 576: { items: 2 }, 768: { items: 3 } },
          },
          "rotate-slider": {
            dots: !1,
            nav: !0,
            margin: 0,
            items: 1,
            animateIn: "",
            animateOut: "",
          },
        },
        sliderThumbs: {
          margin: 0,
          items: 4,
          dots: !1,
          nav: !0,
          navText: [
            '<i class="fas fa-chevron-left">',
            '<i class="fas fa-chevron-right">',
          ],
        },
        stickyContent: {
          minWidth: Riode.minDesktopWidth,
          maxWidth: 2e4,
          top: 300,
          hide: !1,
          max_index: 1060,
          scrollMode: !1,
        },
        stickyHeader: { activeScreenWidth: 768 },
        stickyFooter: {
          minWidth: 0,
          maxWidth: 767,
          top: 150,
          hide: !0,
          scrollMode: !0,
        },
        stickyToolbox: { minWidth: 0, maxWidth: 767, top: !1, scrollMode: !0 },
        stickySidebar: {
          autoInit: !0,
          minWidth: 991,
          containerSelector: ".sticky-sidebar-wrapper",
          autoFit: !0,
          activeClass: "sticky-sidebar-fixed",
          paddingOffsetTop: 67,
          paddingOffsetBottom: 0,
        },
        templateCartAddedAlert:
          '<div class="alert alert-simple alert-btn cart-added-alert"><a href="cart.html" class="btn btn-success btn-md">View Cart</a><span>"{{name}}" has been added to your cart.</span><button type="button" class="btn btn-link btn-close"><i class="d-icon-times"></i></button></div>',
        zoomImage: {
          responsive: !0,
          zoomWindowFadeIn: 750,
          zoomWindowFadeOut: 500,
          borderSize: 0,
          zoomType: "inner",
          cursor: "crosshair",
        },
      }),
      (Riode.$ = function (e) {
        return e instanceof jQuery ? e : $(e);
      }),
      (Riode.call = function (e, t) {
        setTimeout(e, t);
      }),
      (Riode.byId = function (e) {
        return document.getElementById(e);
      }),
      (Riode.byTag = function (e, t) {
        return t ? t.getElementsByTagName(e) : document.getElementsByTagName(e);
      }),
      (Riode.byClass = function (e, t) {
        return t
          ? t.getElementsByClassName(e)
          : document.getElementsByClassName(e);
      }),
      (Riode.setCookie = function (e, t, i) {
        var n = new Date();
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3),
          (document.cookie =
            e + "=" + t + ";expires=" + n.toUTCString() + ";path=/");
      }),
      (Riode.getCookie = function (e) {
        for (
          var t = e + "=", i = document.cookie.split(";"), n = 0;
          n < i.length;
          ++n
        ) {
          for (var o = i[n]; " " == o.charAt(0); ) o = o.substring(1);
          if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
        }
        return "";
      }),
      (Riode.parseOptions = function (e) {
        return "string" == typeof e
          ? JSON.parse(e.replace(/'/g, '"').replace(";", ""))
          : {};
      }),
      (Riode.parseTemplate = function (e, t) {
        return e.replace(/\{\{(\w+)\}\}/g, function () {
          return t[arguments[1]];
        });
      }),
      (Riode.isOnScreen = function (e, t, i) {
        var n = window.pageXOffset,
          o = window.pageYOffset,
          a = e.getBoundingClientRect(),
          s = a.left + n,
          d = a.top + o,
          r = void 0 === t ? 0 : t,
          l = void 0 === i ? 0 : i;
        return (
          d + a.height + l >= o &&
          d <= o + window.innerHeight + l &&
          s + a.width + r >= n &&
          s <= n + window.innerWidth + r
        );
      }),
      (Riode.windowResized = function (e) {
        return (
          e == Riode.resizeTimeStamp ||
            (Riode.canvasWidth != window.innerWidth
              ? (Riode.resizeChanged = !0)
              : (Riode.resizeChanged = !1),
            (Riode.canvasWidth = window.innerWidth),
            (Riode.resizeTimeStamp = e)),
          Riode.resizeChanged
        );
      }),
      (Riode.doLoading = function (e, t) {
        var i = Riode.$(e);
        void 0 === t
          ? i.append('<div class="d-loading"><i></i></div>')
          : "small" == t
          ? i.append('<div class="d-loading small"><i></i></div>')
          : "simple" == t && i.append('<div class="d-loading small"></div>'),
          "static" == i.css("position") &&
            Riode.$(e).css("position", "relative");
      }),
      (Riode.endLoading = function (e) {
        Riode.$(e).find(".d-loading").remove(), Riode.$(e).css("position", "");
      }),
      (Riode.appear =
        ((t = []),
        (i = !1),
        (n = function () {
          for (var i = t.length; i--; )
            (e = t[i]),
              Riode.isOnScreen(e.el, e.options.accX, e.options.accY) &&
                ("function" == typeof $(e.el).data("appear-callback") &&
                  $(e.el).data("appear-callback").call(e.el, e.data),
                e.fn && e.fn.call(e.el, e.data),
                t.splice(i, 1));
        }),
        window.addEventListener("scroll", n, { passive: !0 }),
        window.addEventListener("resize", n, { passive: !0 }),
        $(window).on("appear.check", n),
        function (e, o, a) {
          var s = { data: void 0, accX: 0, accY: 0 };
          a &&
            (a.data && (s.data = a.data),
            a.accX && (s.accX = a.accX),
            a.accY && (s.accY = a.accY)),
            t.push({ el: e, fn: o, options: s }),
            i || (i = Riode.requestTimeout(n, 100));
        })),
      (Riode.zoomImageObjects = []),
      (Riode.zoomImage = function (e) {
        $.fn.elevateZoom &&
          e &&
          Riode.$(e)
            .find("img")
            .each(function () {
              var e = $(this);
              (Riode.defaults.zoomImage.zoomContainer = e.parent()),
                e.elevateZoom(Riode.defaults.zoomImage),
                Riode.zoomImageObjects.push(e);
            });
      }),
      (Riode.initZoom = function () {
        window.addEventListener(
          "resize",
          function () {
            Riode.zoomImageObjects.forEach(function (e) {
              e.each(function () {
                var e = $(this),
                  t = e.data("elevateZoom");
                e.closest(".rotate-slider").length > 0 && t
                  ? setTimeout(function () {
                      t.refresh();
                    }, 1200)
                  : t && t.refresh();
              });
            });
          },
          { passive: !0 }
        );
      }),
      (Riode.countTo = function (e) {
        $.fn.numerator &&
          Riode.$(e).each(function () {
            var e = $(this),
              t = {
                fromValue: e.data("fromvalue"),
                toValue: e.data("tovalue"),
                duration: e.data("duration"),
                delimiter: e.data("delimiter"),
                rounding: e.data("round"),
              };
            Riode.appear(this, function () {
              setTimeout(function () {
                e.numerator(t);
              }, 300);
            });
          });
      }),
      (Riode.countdown = function (e) {
        $.fn.countdown &&
          Riode.$(e).each(function () {
            var e = $(this),
              t = e.data("until"),
              i = e.data("compact"),
              n = e.data("format") ? e.data("format") : "DHMS",
              o = e.data("labels-short")
                ? ["Years", "Months", "Weeks", "Days", "Hours", "Mins", "Secs"]
                : [
                    "Years",
                    "Months",
                    "Weeks",
                    "Days",
                    "Hours",
                    "Minutes",
                    "Seconds",
                  ],
              a = e.data("labels-short")
                ? ["Year", "Month", "Week", "Day", "Hour", "Min", "Sec"]
                : ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"];
            if (e.data("relative")) d = t;
            else
              var s = t.split(", "),
                d = new Date(s[0], s[1] - 1, s[2]);
            e.countdown({
              until: d,
              format: n,
              padZeroes: !0,
              compact: i,
              compactLabels: [" y", " m", " w", " days, "],
              timeSeparator: " : ",
              labels: o,
              labels1: a,
            });
          });
      }),
      (Riode.priceSlider = function (e, t) {
        "object" == typeof noUiSlider &&
          Riode.$(e).each(function () {
            var e = this;
            noUiSlider.create(
              e,
              $.extend(
                !0,
                {
                  start: [18, 35],
                  connect: !0,
                  step: 1,
                  range: { min: 18, max: 35 },
                },
                t
              )
            ),
              e.noUiSlider.on("update", function (t, i) {
                t = t.map(function (e) {
                  return "$" + parseInt(e);
                });
                $(e).parent().find(".filter-price-range").text(t.join(" - "));
              });
          });
      }),
      (Riode.lazyload = function (e, t) {
        function i() {
          this.setAttribute("src", this.getAttribute("data-src")),
            this.addEventListener("load", function () {
              (this.style["padding-top"] = ""),
                this.classList.remove("lazy-img");
            });
        }
        Riode.$(e)
          .find(".lazy-img")
          .each(function () {
            void 0 !== t && t ? i.call(this) : Riode.appear(this, i);
          });
      }),
      (Riode.isotopes = function (e, t) {
        if ("function" == typeof imagesLoaded && $.fn.isotope) {
          Riode.$(e).each(function () {
            var e = $(this),
              i = $.extend(
                !0,
                {},
                Riode.defaults.isotope,
                Riode.parseOptions(e.attr("data-grid-options")),
                t || {}
              );
            Riode.lazyload(e),
              e.imagesLoaded(function () {
                i.customInitHeight && e.height(e.height()),
                  i.customDelay &&
                    Riode.call(function () {
                      e.isotope(i);
                    }, parseInt(i.customDelay)),
                  e.isotope(i);
              });
          });
        }
      }),
      (Riode.initNavFilter = function (e) {
        $.fn.isotope &&
          Riode.$(e).on("click", function (e) {
            var t = $(this),
              i = t.attr("data-filter"),
              n = t.parent().parent().attr("data-target");
            $(n || ".grid")
              .isotope({ filter: i })
              .isotope("on", "arrangeComplete", function () {
                Riode.$window.trigger("appear.check");
              }),
              t.parent().siblings().children().removeClass("active"),
              t.addClass("active"),
              e.preventDefault();
          });
      }),
      (Riode.initShowVendorSearch = function (e) {
        Riode.$body.on("click", e, function (e) {
          var t = $(this).closest(".toolbox").next(".form-wrapper");
          t.hasClass("open")
            ? t.slideUp().removeClass("open")
            : t.slideDown().addClass("open"),
            e.preventDefault();
        });
      }),
      (Riode.parallax = function (e, t) {
        $.fn.themePluginParallax &&
          Riode.$(e).each(function () {
            var e = $(this);
            e.themePluginParallax(
              $.extend(
                !0,
                Riode.parseOptions(e.attr("data-parallax-options")),
                t
              )
            );
          });
      }),
      (Riode.initFloatingElements = function (e) {
        $.fn.parallax &&
          Riode.$(e).each(function () {
            var e = $(this);
            e.attr("data-floating-depth")
              ? e
                  .children(".layer")
                  .attr("data-depth", e.attr("data-floating-depth"))
              : e.children(".layer").attr("data-depth", ".3"),
              e.parallax(e.data("options"));
          });
      }),
      (Riode.initAdvancedMotions = function (e) {
        if (!Riode.isMobile && "undefined" != typeof skrollr) {
          var t = Riode.$(e);
          t.each(function () {
            var e = $(this),
              t = {
                "data-bottom-top": "transform: translate(10%, 0);",
                "data-center": "transform: translate(-10%, 0);",
              },
              i = [];
            e.data("options") &&
              ((t = e.data("options")), (i = Object.keys(t))),
              "object" == typeof t &&
                (i = Object.keys(t)).length &&
                i.forEach(function (i) {
                  e.attr(i, t[i]);
                });
          }),
            t.length && skrollr.init({ forceHeight: !1, smoothScrolling: !0 });
        }
      }),
      (Riode.degree360 = function (e) {
        $.fn.ThreeSixty &&
          Riode.$(e).ThreeSixty({
            imagePath: "images/demos/demo-single-product/degree/",
            filePrefix: "360-",
            ext: ".png",
            totalFrames: 32,
            endFrame: 32,
            currentFrame: 1,
            imgList: Riode.$body.find(".product-degree-images"),
            progress: ".d-loading",
            height: 500,
            width: 830,
            navigation: !0,
          });
      }),
      (Riode.headerToggleSearch = function (e) {
        var t = Riode.$(e);
        t
          .find(".form-control")
          .on("focusin", function (e) {
            t.addClass("show");
          })
          .on("focusout", function (e) {
            t.removeClass("show");
          }),
          Riode.$body.on(
            "click",
            ".sticky-footer .search-toggle",
            function (e) {
              $(this).parent().toggleClass("show"), e.preventDefault();
            }
          );
      }),
      (Riode.closeTopNotice = function (e) {
        var t = Riode.$(e);
        t.on("click", function (e) {
          e.preventDefault(), t.closest(".top-notice").css("display", "none");
        });
      }),
      (Riode.stickyHeader = function (e) {
        var t = Riode.$(e);
        if (0 != t.length) {
          var i,
            n,
            o = !1,
            a = function () {
              ((i = t[0].offsetHeight),
              (n = t.offset().top + i),
              t.hasClass("has-dropdown")) &&
                t.find(".category-dropdown .dropdown-box").length &&
                (n += t.find(".category-dropdown .dropdown-box")[0]
                  .offsetHeight);
              !o &&
                window.innerWidth >=
                  Riode.defaults.stickyHeader.activeScreenWidth &&
                ((o = !0),
                t.wrap(
                  '<div class="sticky-wrapper" style="height:' +
                    i +
                    'px"></div>'
                )),
                Riode.$window.off("resize", a);
            },
            s = function () {
              window.innerWidth >=
                Riode.defaults.stickyHeader.activeScreenWidth &&
              window.pageYOffset >= n
                ? (t[0].classList.add("fixed"),
                  document.body.classList.add("sticky-header-active"))
                : (t[0].classList.remove("fixed"),
                  document.body.classList.remove("sticky-header-active"));
            };
          window.addEventListener("scroll", s, { passive: !0 }),
            Riode.$window.on("resize", a),
            Riode.$window.on("resize", s),
            Riode.call(a, 500),
            Riode.call(s, 500);
        }
      }),
      (Riode.stickyContent = function (e, t) {
        var i = Riode.$(e),
          n = $.extend({}, Riode.defaults.stickyContent, t),
          o = window.pageYOffset;
        if (0 != i.length) {
          var a = function () {
              i.each(function (e) {
                var t = $(this);
                if (t.data("is-wrap"))
                  (window.innerWidth < n.minWidth ||
                    window.innerWidth >= n.maxWidth) &&
                    (t.unwrap(".sticky-content-wrapper"),
                    t.data("is-wrap", !1));
                else {
                  var i,
                    o = t.removeClass("fixed").outerHeight(!0);
                  if (((i = t.offset().top + o), t.hasClass("has-dropdown"))) {
                    var a = t.find(".category-dropdown .dropdown-box");
                    a.length && (i += a[0].offsetHeight);
                  }
                  t.data("top", i),
                    (function (e, t) {
                      window.innerWidth >= n.minWidth &&
                        window.innerWidth <= n.maxWidth &&
                        (e.wrap('<div class="sticky-content-wrapper"></div>'),
                        e.parent().css("height", t + "px"),
                        e.data("is-wrap", !0));
                    })(t, o);
                }
              });
            },
            s = function (e) {
              (e && !e.isTrusted) ||
                i.each(function (e) {
                  var t = $(this),
                    i = !0;
                  n.scrollMode &&
                    ((i = o > window.pageYOffset), (o = window.pageYOffset)),
                    window.pageYOffset > (0 == n.top ? t.data("top") : n.top) &&
                    window.innerWidth >= n.minWidth &&
                    window.innerWidth <= n.maxWidth
                      ? (t.hasClass("fix-top")
                          ? (void 0 === t.data("offset-top") &&
                              (function (e) {
                                var t = 0,
                                  i = 0;
                                $(".sticky-content.fixed.fix-top").each(
                                  function () {
                                    (t += $(this)[0].offsetHeight), i++;
                                  }
                                ),
                                  e.data("offset-top", t),
                                  e.data("z-index", n.max_index - i);
                              })(t),
                            t.css("margin-top", t.data("offset-top") + "px"))
                          : t.hasClass("fix-bottom") &&
                            (void 0 === t.data("offset-bottom") &&
                              (function (e) {
                                var t = 0,
                                  i = 0;
                                $(".sticky-content.fixed.fix-bottom").each(
                                  function () {
                                    (t += $(this)[0].offsetHeight), i++;
                                  }
                                ),
                                  e.data("offset-bottom", t),
                                  e.data("z-index", n.max_index - i);
                              })(t),
                            t.css(
                              "margin-bottom",
                              t.data("offset-bottom") + "px"
                            )),
                        t.css("z-index", t.data("z-index")),
                        n.scrollMode
                          ? (i && t.hasClass("fix-top")) ||
                            (!i && t.hasClass("fix-bottom"))
                            ? (t.addClass("fixed"),
                              t
                                .closest(".page-wrapper")
                                .find(".header")
                                .hasClass(".header-transparent") &&
                                (Riode.$body.hasClass("sidebar-active") ||
                                Riode.$body.hasClass("top-sidebar-active") ||
                                Riode.$body.hasClass("right-sidebar-active")
                                  ? t.closest(".main").css("z-index", "unset")
                                  : t.closest(".main").css("z-index", "19")))
                            : (t.removeClass("fixed"),
                              t.css("margin", ""),
                              t
                                .closest(".page-wrapper")
                                .find(".header")
                                .hasClass(".header-transparent") &&
                                (Riode.$body.hasClass("sidebar-active") ||
                                Riode.$body.hasClass("top-sidebar-active") ||
                                Riode.$body.hasClass("right-sidebar-active")
                                  ? t.closest(".main").css("z-index", "unset")
                                  : t.closest(".main").css("z-index", "19")))
                          : t.addClass("fixed"),
                        n.hide &&
                          t
                            .parent(".sticky-content-wrapper")
                            .css("display", ""))
                      : (t.removeClass("fixed"),
                        t.css("margin-top", ""),
                        t.css("margin-bottom", ""),
                        n.hide &&
                          t
                            .parent(".sticky-content-wrapper")
                            .css("display", "none"));
                });
            },
            d = function (e) {
              i
                .removeData("offset-top")
                .removeData("offset-bottom")
                .removeClass("fixed")
                .css("margin", "")
                .css("z-index", ""),
                Riode.call(function () {
                  a(), s();
                });
            };
          setTimeout(a, 550),
            setTimeout(s, 600),
            Riode.call(function () {
              window.addEventListener("scroll", s, { passive: !0 }),
                Riode.$window.on("resize", d);
            }, 700);
        }
      }),
      (Riode.initAlert = function (e) {
        Riode.$body.on("click", e + " .btn-close", function (t) {
          $(this)
            .closest(e)
            .fadeOut(function () {
              $(this).remove();
            });
        });
      }),
      (Riode.initAccordion = function (e) {
        Riode.$body.on("click", e, function (e) {
          var i = $(this),
            n = i.closest(".card").find(i.attr("href")),
            o = i.closest(".accordion");
          e.preventDefault(),
            0 === o.find(".collapsing").length &&
              0 === o.find(".expanding").length &&
              (n.hasClass("expanded")
                ? o.hasClass("radio-type") || t(n)
                : n.hasClass("collapsed") &&
                  (o.find(".expanded").length > 0
                    ? Riode.isIE
                      ? t(o.find(".expanded"), function () {
                          t(n);
                        })
                      : (t(o.find(".expanded")), t(n))
                    : t(n)));
        });
        var t = function (t, i) {
          var n = t.closest(".card").find(e);
          t.hasClass("expanded")
            ? (n.removeClass("collapse").addClass("expand"),
              t.addClass("collapsing").slideUp(300, function () {
                t.removeClass("expanded collapsing").addClass("collapsed"),
                  i && i();
              }))
            : t.hasClass("collapsed") &&
              (n.removeClass("expand").addClass("collapse"),
              t.addClass("expanding").slideDown(300, function () {
                t.removeClass("collapsed expanding").addClass("expanded"),
                  i && i();
              }));
        };
      }),
      (Riode.initTab = function (e) {
        Riode.$body
          .on("click", ".tab .nav-link", function (e) {
            var t = $(this);
            if ((e.preventDefault(), !t.hasClass("active"))) {
              var i = $(t.attr("href"));
              i.siblings().removeClass("in active"),
                i.addClass("active in"),
                Riode.slider(i.find(".owl-carousel")),
                t.parent().parent().find(".active").removeClass("active"),
                t.addClass("active");
            }
          })
          .on(
            "click",
            ".single-product:not(.element-single-product) .link-to-tab",
            function (e) {
              var t = $(e.currentTarget).attr("href"),
                i = $(t),
                n = i.parent().siblings(".nav");
              e.preventDefault(),
                i.siblings().removeClass("active in"),
                i.addClass("active in"),
                n.find(".nav-link").removeClass("active"),
                n.find('[href="' + t + '"]').addClass("active"),
                $("html").animate({ scrollTop: i.offset().top - 150 });
            }
          );
      }),
      (Riode.playableVideo = function (e) {
        $(e + " .video-play").on("click", function (t) {
          var i = $(this).closest(e);
          i.hasClass("playing")
            ? i
                .removeClass("playing")
                .addClass("paused")
                .find("video")[0]
                .pause()
            : i
                .removeClass("paused")
                .addClass("playing")
                .find("video")[0]
                .play(),
            t.preventDefault();
        }),
          $(e + " video").on("ended", function () {
            $(this).closest(e).removeClass("playing");
          });
      }),
      (Riode.appearAnimate = function (e) {
        Riode.$(e).each(function () {
          var e = this;
          Riode.appear(e, function () {
            if (e.classList.contains("appear-animate")) {
              var t = $.extend(
                {},
                Riode.defaults.animation,
                Riode.parseOptions(e.getAttribute("data-animation-options"))
              );
              Riode.call(function () {
                setTimeout(
                  function () {
                    (e.style["animation-duration"] = t.duration),
                      e.classList.add(t.name),
                      e.classList.add("appear-animation-visible");
                  },
                  t.delay ? 1e3 * Number(t.delay.slice(0, -1)) : 0
                );
              });
            }
          });
        });
      }),
      (Riode.stickySidebar = function (e) {
        $.fn.themeSticky &&
          Riode.$(e).each(function () {
            var e = $(this);
            e.themeSticky(
              $.extend(
                Riode.defaults.stickySidebar,
                Riode.parseOptions(e.attr("data-sticky-options"))
              )
            ),
              e.trigger("recalc.pin");
          });
      }),
      (Riode.refreshSidebar = function (e) {
        $.fn.themeSticky &&
          Riode.$(e).each(function () {
            $(this).trigger("recalc.pin");
          });
      }),
      (Riode.ratingTooltip = function (e) {
        for (
          var t = Riode.byClass("ratings-full", e || document.body),
            i = t.length,
            n = function () {
              var e =
                parseInt(this.firstElementChild.style.width.slice(0, -1)) / 20;
              this.lastElementChild.innerText = e ? e.toFixed(2) : e;
            },
            o = 0;
          o < i;
          ++o
        )
          t[o].addEventListener("mouseover", n, { passive: !0 }),
            t[o].addEventListener("touchstart", n, { passive: !0 });
      }),
      (Riode.popup = function (e, t) {
        var i = $.magnificPopup.instance,
          n = $.extend(
            !0,
            {},
            Riode.defaults.popup,
            void 0 !== t ? Riode.defaults.popupPresets[t] : {},
            e
          );
        i.isOpen && i.content
          ? (i.close(),
            setTimeout(function () {
              $.magnificPopup.open(n);
            }, 500))
          : $.magnificPopup.open(n);
      }),
      (Riode.initPopups = function () {
        Riode.$body
          .on("click", "a.login, .login-link", function (e) {
            e.preventDefault(),
              Riode.popup(
                { items: { src: $(e.currentTarget).attr("href") } },
                "login"
              );
          })
          .on("click", ".register-link", function (e) {
            e.preventDefault(),
              Riode.popup(
                {
                  items: { src: $(e.currentTarget).attr("href") },
                  callbacks: {
                    ajaxContentAdded: function () {
                      this.wrap.find('[href="#register"]').click();
                    },
                  },
                },
                "login"
              );
          })
          .on("click", ".btn-iframe", function (e) {
            e.preventDefault(),
              Riode.popup(
                {
                  items: {
                    src:
                      '<video src="' +
                      $(e.currentTarget).attr("href") +
                      '" autoplay loop controls>',
                    type: "inline",
                  },
                  mainClass: "mfp-video-popup",
                },
                "video"
              );
          }),
          $(".home > #newsletter-popup").length > 0 &&
            "true" !== Riode.getCookie("hideNewsletterPopup") &&
            setTimeout(function () {
              Riode.popup({
                items: { src: "#newsletter-popup" },
                type: "inline",
                tLoading: "",
                mainClass: "mfp-newsletter mfp-flip-popup",
                callbacks: {
                  beforeClose: function () {
                    $("#hide-newsletter-popup")[0].checked &&
                      Riode.setCookie("hideNewsletterPopup", !0, 7);
                  },
                },
              });
            }, 7500);
      }),
      (Riode.initPurchasedMinipopup = function () {
        setInterval(function () {
          Riode.Minipopup.open(
            {
              message: "Someone Purchased",
              productClass: "product-cart",
              name: "Daisy Shoes Sonia by Sonia-Blue",
              nameLink: "product.html",
              imageSrc: "images/cart/product-1.jpg",
              isPurchased: !0,
            },
            function (e) {
              Riode.ratingTooltip(e[0]);
            }
          );
        }, 6e4);
      }),
      (Riode.initScrollTopButton = function () {
        var e = Riode.byId("scroll-top");
        if (e) {
          e.addEventListener("click", function (e) {
            $("html, body").animate({ scrollTop: 0 }, 600), e.preventDefault();
          });
          var t = function () {
            window.pageYOffset > 400
              ? e.classList.add("show")
              : e.classList.remove("show");
          };
          Riode.call(t, 500),
            window.addEventListener("scroll", t, { passive: !0 });
        }
      }),
      (Riode.scrollTo = function (e, t) {
        var i = 0,
          n = void 0 === t ? 600 : t;
        (i = "number" == typeof e ? e : Riode.$(e).offset().top),
          $("html,body").stop().animate({ scrollTop: i }, n);
      }),
      (Riode.scrollSet = function (e) {
        var t = $(e);
        Riode.$window.on("scroll", function (e) {
          var i = $(this),
            n = i.scrollTop(),
            o = i.outerHeight();
          $(".section").each(function (e) {
            var i = $(this),
              a = $(this).offset().top;
            n <= a &&
              a <= n + o / 2 &&
              t
                .filter('[href="#' + i.attr("id") + '"]')
                .parent()
                .addClass("active")
                .siblings()
                .removeClass("active");
          });
        }),
          Riode.$body.on("click", e, function (e) {
            var t = $(this),
              i = e.currentTarget,
              n = i.hash ? i.hash : i.slice(i.lastIndexOf("#"));
            n.startsWith("#") &&
              ($(".mobile-menu-overlay").click(),
              Riode.scrollTo(n),
              e.preventDefault()),
              t
                .closest("li")
                .addClass("active")
                .siblings()
                .removeClass("active");
          });
      }),
      (Riode.requestTimeout = function (e, t) {
        var i =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame;
        if (!i) return setTimeout(e, t);
        var n,
          o = new Object();
        return (
          (o.val = i(function a(s) {
            n || (n = s), s - n >= t ? e() : (o.val = i(a));
          })),
          o
        );
      }),
      (Riode.requestInterval = function (e, t, i) {
        var n =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame;
        if (!n) return i ? setInterval(e, t) : setTimeout(e, i);
        var o,
          a,
          s = new Object();
        return (
          (s.val = n(function d(r) {
            o || (o = a = r),
              !i || r - o < i
                ? r - a > t
                  ? ((s.val = n(d)), e(), (a = r))
                  : (s.val = n(d))
                : e();
          })),
          s
        );
      }),
      (Riode.deleteTimeout = function (e) {
        if (e) {
          var t =
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame;
          return t ? (e.val ? t(e.val) : void 0) : clearTimeout(e);
        }
      }),
      (Riode.sidebar = (function () {
        var e = window.innerWidth < Riode.minDesktopWidth,
          t = function () {
            window.innerWidth < Riode.minDesktopWidth && !e
              ? (this.$sidebar
                  .find(".sidebar-content, .filter-clean")
                  .removeAttr("style"),
                this.$sidebar.find(".sidebar-content").attr("style", ""),
                this.$sidebar
                  .siblings(".toolbox")
                  .children(":not(:first-child)")
                  .removeAttr("style"))
              : window.innerWidth >= Riode.minDesktopWidth &&
                !this.$sidebar.hasClass("closed") &&
                e &&
                (this.$sidebar.addClass("closed"),
                this.$sidebar.find(".sidebar-content").css("display", "none")),
              (e = window.innerWidth < Riode.minDesktopWidth);
          };
        function i(e) {
          return this.init(e);
        }
        return (
          (i.prototype.init = function (e) {
            var i = this;
            return (
              (i.name = e),
              (i.$sidebar = $("." + e)),
              (i.isNavigation = !1),
              i.$sidebar.length &&
                ((i.isNavigation =
                  i.$sidebar.hasClass("sidebar-fixed") &&
                  i.$sidebar.parent().hasClass("toolbox-wrap")),
                i.isNavigation &&
                  ((t = t.bind(this)), Riode.$window.on("resize", t)),
                Riode.$body.find(".header").hasClass("header-transparent") &&
                  Riode.$body.find(".main").css("z-index", "19"),
                Riode.$window.on("resize", function () {
                  Riode.$body.removeClass(e + "-active"),
                    Riode.$body
                      .find(".header")
                      .hasClass("header-transparent") &&
                      setTimeout(function () {
                        Riode.$body.find(".main").css("z-index", "19");
                      }, 400);
                }),
                i.$sidebar
                  .find(".sidebar-toggle, .sidebar-toggle-btn")
                  .add(
                    "sidebar" === e
                      ? ".left-sidebar-toggle"
                      : "." + e + "-toggle"
                  )
                  .on("click", function (e) {
                    i.toggle(),
                      $(this).blur(),
                      $(".sticky-sidebar").trigger("recalc.pin.left", [400]),
                      Riode.$body
                        .find(".header")
                        .hasClass("header-transparent") &&
                        $(window).innerWidth() < 992 &&
                        Riode.$body.find(".main").css("z-index", "unset"),
                      e.preventDefault();
                  }),
                i.$sidebar
                  .find(".sidebar-overlay, .sidebar-close")
                  .on("click", function (t) {
                    Riode.$body.removeClass(e + "-active"),
                      Riode.$body
                        .find(".header")
                        .hasClass("header-transparent") &&
                        setTimeout(function () {
                          Riode.$body.find(".main").css("z-index", "19");
                        }, 400),
                      $(".sticky-sidebar").trigger("recalc.pin.left", [400]),
                      t.preventDefault();
                  }),
                setTimeout(function () {
                  $(".sticky-sidebar").trigger("recalc.pin", [400]);
                })),
              !1
            );
          }),
          (i.prototype.toggle = function () {
            var e = this;
            if (
              window.innerWidth >= Riode.minDesktopWidth &&
              e.$sidebar.hasClass("sidebar-fixed")
            ) {
              var t = e.$sidebar.hasClass("closed");
              if (
                (e.isNavigation &&
                  (t || e.$sidebar.find(".filter-clean").hide(),
                  e.$sidebar
                    .siblings(".toolbox")
                    .children(":not(:first-child)")
                    .fadeToggle("fast"),
                  e.$sidebar
                    .find(".sidebar-content")
                    .stop()
                    .animate(
                      { height: "toggle", "margin-bottom": t ? "toggle" : -6 },
                      function () {
                        $(this).css("margin-bottom", ""),
                          t && e.$sidebar.find(".filter-clean").fadeIn("fast");
                      }
                    )),
                e.$sidebar.hasClass("shop-sidebar"))
              ) {
                var i = $(".main-content .product-wrapper");
                if (i.length)
                  if (i.hasClass("product-lists"))
                    i.toggleClass("row cols-xl-2", !t);
                  else {
                    var n = i.data("toggle-cols"),
                      o = i.attr("class").match(/cols-\w*-*\d/g),
                      a = o
                        ? Math.max.apply(
                            null,
                            o.map(function (e) {
                              return e.match(/\d/)[0];
                            })
                          )
                        : 0;
                    t
                      ? 4 === a && 3 == n && i.removeClass("cols-md-4")
                      : 3 === a &&
                        (i.addClass("cols-md-4"),
                        n || i.data("toggle-cols", 3));
                  }
              }
              e.$sidebar.toggleClass("closed");
            } else
              e.$sidebar
                .find(".sidebar-overlay .sidebar-close")
                .css(
                  "margin-left",
                  -(window.innerWidth - document.body.clientWidth)
                ),
                Riode.$body
                  .toggleClass(e.name + "-active")
                  .removeClass("closed"),
                window.innerWidth >= 1200 &&
                  Riode.$body.hasClass("with-flex-container") &&
                  $(".owl-carousel").trigger("refresh.owl.carousel");
          }),
          function (e) {
            return new i(e);
          }
        );
      })()),
      (Riode.initProductSingle = (function () {
        function e(e) {
          return this.init(e);
        }
        var t = function (e) {
            var t = e.$thumbsWrap.offset().top + e.$thumbsWrap[0].offsetHeight,
              i = e.$thumbs.offset().top + e.thumbsHeight;
            i >= t + e.$productThumb[0].offsetHeight
              ? (e.$thumbs.css(
                  "top",
                  parseInt(e.$thumbs.css("top")) -
                    e.$productThumb[0].offsetHeight
                ),
                e.$thumbUp.removeClass("disabled"))
              : i > t
              ? (e.$thumbs.css(
                  "top",
                  parseInt(e.$thumbs.css("top")) - Math.ceil(i - t)
                ),
                e.$thumbUp.removeClass("disabled"),
                e.$thumbDown.addClass("disabled"))
              : e.$thumbDown.addClass("disabled");
          },
          i = function (e) {
            var t = e.$thumbsWrap.offset().top,
              i = e.$thumbs.offset().top;
            i <= t - e.$productThumb[0].offsetHeight
              ? (e.$thumbs.css(
                  "top",
                  parseInt(e.$thumbs.css("top")) +
                    e.$productThumb[0].offsetHeight
                ),
                e.$thumbDown.removeClass("disabled"))
              : i < t
              ? (e.$thumbs.css(
                  "top",
                  parseInt(e.$thumbs.css("top")) - Math.ceil(i - t)
                ),
                e.$thumbDown.removeClass("disabled"),
                e.$thumbUp.addClass("disabled"))
              : e.$thumbUp.addClass("disabled");
          },
          n = function (e) {
            if (void 0 !== e.$thumbs) {
              var t = void 0 !== e.thumbsIsVertical && e.thumbsIsVertical;
              (e.thumbsIsVertical =
                e._isPgvertical && window.innerWidth >= Riode.minDesktopWidth),
                e.thumbsIsVertical
                  ? (e.$thumbs.hasClass("owl-carousel") &&
                      e.$thumbs
                        .trigger("destroy.owl.carousel")
                        .removeClass("owl-carousel"),
                    (e.thumbsHeight =
                      e.$productThumb[0].offsetHeight * e.thumbsCount +
                      parseInt(e.$productThumb.css("margin-bottom")) *
                        (e.thumbsCount - 1)),
                    e.$thumbUp.addClass("disabled"),
                    e.$thumbDown.toggleClass(
                      "disabled",
                      e.thumbsHeight <= e.$thumbsWrap[0].offsetHeight
                    ),
                    e.isQuickview && o())
                  : (t && e.$thumbs.css("top", ""),
                    e.$thumbs.hasClass("owl-carousel") ||
                      e.$thumbs
                        .addClass("owl-carousel")
                        .owlCarousel(
                          $.extend(
                            !0,
                            e.isQuickview
                              ? { onInitialized: o, onResized: o }
                              : {},
                            Riode.defaults.sliderThumbs
                          )
                        ));
            }
          },
          o = function () {
            this.$wrapper
              .find(".product-details")
              .css(
                "height",
                window.innerWidth > 767
                  ? this.$wrapper.find(".product-gallery")[0].clientHeight
                  : ""
              );
          };
        return (
          (e.prototype.init = function (e) {
            var a = this,
              s = e.find(".product-single-carousel");
            (a.$wrapper = e),
              (a.isQuickview = !!e.closest(".mfp-content").length),
              (a._isPgvertical = !1),
              a.isQuickview && ((o = o.bind(this)), Riode.ratingTooltip()),
              s
                .on("initialized.owl.carousel", function (e) {
                  document.body.classList.contains("home") ||
                    a.isQuickview ||
                    s.append(
                      '<a href="#" class="product-image-full"><i class="d-icon-zoom"></i></a>'
                    ),
                    s.parent().hasClass("product-gallery-degree") &&
                      (a.isQuickView ||
                        s.append(
                          '<a href="#" class="product-gallery-btn product-degree-viewer" title="Product 360 Degree Gallery"><i class="w-icon-rotate-3d"></i></a>'
                        )),
                    (function (e) {
                      (e.$thumbs = e.$wrapper.find(".product-thumbs")),
                        (e.$thumbsWrap = e.$thumbs.closest(
                          ".product-thumbs-wrap"
                        )),
                        (e.$thumbUp = e.$thumbsWrap.find(".thumb-up")),
                        (e.$thumbDown = e.$thumbsWrap.find(".thumb-down")),
                        (e.$thumbsDots = e.$thumbs.children()),
                        (e.thumbsCount = e.$thumbsDots.length),
                        (e.$productThumb = e.$thumbsDots.eq(0)),
                        (e._isPgvertical = e.$thumbsWrap
                          .parent()
                          .hasClass("pg-vertical")),
                        (e.thumbsIsVertical =
                          e._isPgvertical &&
                          window.innerWidth >= Riode.minDesktopWidth),
                        e.$thumbDown.on("click", function (i) {
                          e.thumbsIsVertical && t(e);
                        }),
                        e.$thumbUp.on("click", function (t) {
                          e.thumbsIsVertical && i(e);
                        }),
                        e.$thumbsDots.on("click", function () {
                          var t = $(this),
                            i = (
                              t.parent().filter(e.$thumbs).length
                                ? t
                                : t.parent()
                            ).index();
                          e.$wrapper
                            .find(".product-single-carousel")
                            .trigger("to.owl.carousel", i);
                        }),
                        n(e),
                        Riode.$window.on("resize", function () {
                          n(e);
                        });
                    })(a);
                })
                .on("translate.owl.carousel", function (e) {
                  var t =
                    (e.item.index -
                      $(e.currentTarget).find(".cloned").length / 2 +
                      e.item.count) %
                    e.item.count;
                  a.thumbsSetActive(t);
                }),
              "complete" === Riode.status &&
                (Riode.slider(s), Riode.quantityInput(e.find(".quantity"))),
              (function (e) {
                (e.$selects = e.$wrapper.find(".product-variations select")),
                  (e.$items = e.$wrapper.find(".product-variations")),
                  (e.$priceWrap = e.$wrapper.find(".product-variation-price")),
                  (e.$clean = e.$wrapper.find(".product-variation-clean")),
                  (e.$btnCart = e.$wrapper.find(".btn-cart")),
                  e.variationCheck(),
                  e.$selects.on("change", function (t) {
                    e.variationCheck();
                  }),
                  e.$items.children("a").on("click", function (t) {
                    $(this)
                      .toggleClass("active")
                      .siblings()
                      .removeClass("active"),
                      t.preventDefault(),
                      e.variationCheck();
                  }),
                  e.$clean.on("click", function (t) {
                    t.preventDefault(), e.variationClean(!0);
                  });
              })(this),
              (function (e) {
                e.$wrapper.on("click", ".btn-cart", function (t) {
                  t.preventDefault();
                  var i = e.$wrapper,
                    n = i.find(".product-name").text();
                  (i.closest(".product-popup").length ||
                    document.body.classList.contains("home")) &&
                    Riode.Minipopup.open({
                      message: "Successfully Added",
                      productClass: "product-cart",
                      name: n,
                      nameLink: i.find(".product-name > a").attr("href"),
                      imageSrc: i.find(".product-image img").eq(0).attr("src"),
                      imageLink: i.find(".product-name > a").attr("href"),
                      price:
                        i.find(".product-variation-price").length > 0
                          ? i
                              .find(".product-variation-price")
                              .children("span")
                              .html()
                          : i.find(".product-price .price").html(),
                      count: i.find(".quantity").val(),
                      actionTemplate:
                        '<div class="action-group d-flex mt-3"><a href="cart.html" class="btn btn-sm btn-outline btn-primary btn-rounded mr-2">View Cart</a><a href="checkout.html" class="btn btn-sm btn-primary btn-rounded">Check Out</a></div>',
                    });
                });
              })(this),
              (function (e) {
                e.$wrapper.on("click", ".btn-compare", function (t) {
                  t.preventDefault();
                  var i = e.$wrapper,
                    n = i.find(".product-name").text();
                  (i.closest(".product-popup").length ||
                    document.body.classList.contains("home")) &
                    ("disabled" !=
                      i.find(".btn-product.btn-cart").attr("disabled")) &&
                    Riode.Minipopup.open({
                      message: "Successfully Added",
                      productClass: "product-compare",
                      name: n,
                      nameLink: i.find(".product-name > a").attr("href"),
                      imageSrc: i.find(".product-image img").eq(0).attr("src"),
                      imageLink: i.find(".product-name > a").attr("href"),
                      price:
                        i.find(".product-variation-price").length > 0
                          ? i
                              .find(".product-variation-price")
                              .children("span")
                              .html()
                          : i.find(".product-price .price").html(),
                      count: i.find(".quantity").val(),
                      actionTemplate:
                        '<div class="action-group d-flex mt-3"><a href="compare.html" class="btn btn-sm btn-outline btn-primary btn-rounded mr-2">Compare</a><a href="checkout.html" class="btn btn-sm btn-primary btn-rounded">Check Out</a></div>',
                    });
                });
              })(this);
          }),
          (e.prototype.thumbsSetActive = function (e) {
            var t = this,
              i = t.$thumbsDots.eq(e);
            if (
              (t.$thumbsDots.filter(".active").removeClass("active"),
              i.addClass("active"),
              t.thumbsIsVertical)
            ) {
              var n = parseInt(t.$thumbs.css("top")) + e * t.thumbsHeight;
              n < 0
                ? t.$thumbs.css("top", parseInt(t.$thumbs.css("top")) - n)
                : (n =
                    t.$thumbs.offset().top +
                    t.$thumbs[0].offsetHeight -
                    i.offset().top -
                    i[0].offsetHeight) < 0 &&
                  t.$thumbs.css("top", parseInt(t.$thumbs.css("top")) + n);
            } else t.$thumbs.trigger("to.owl.carousel", e, 100);
          }),
          (e.prototype.variationCheck = function () {
            var e = this,
              t = !0;
            e.$selects.each(function () {
              return this.value || (t = !1);
            }),
              e.$items.each(function () {
                var e = $(this);
                if (e.children("a:not(.size-guide)").length)
                  return e.children(".active").length || (t = !1);
              }),
              t ? e.variationMatch() : e.variationClean();
          }),
          (e.prototype.variationMatch = function () {
            var e = this;
            e.$priceWrap
              .find("span")
              .text("$" + (Math.round(50 * Math.random()) + 200) + ".00"),
              e.$priceWrap.slideDown(),
              e.$clean.slideDown(),
              e.$btnCart.removeAttr("disabled");
          }),
          (e.prototype.variationClean = function (e) {
            e && this.$selects.val(""),
              e && this.$items.children(".active").removeClass("active"),
              this.$priceWrap.slideUp(),
              this.$clean.css("display", "none"),
              this.$btnCart.attr("disabled", "disabled");
          }),
          function (t, i) {
            return t ? new e(t.eq(0), i) : null;
          }
        );
      })()),
      (Riode.initProductSinglePage = (function () {
        function e(e) {
          var t = $(e.currentTarget).closest(".product-single");
          $(".cart-added-alert").remove(),
            $(
              Riode.parseTemplate(Riode.defaults.templateCartAddedAlert, {
                name: t.find("h1.product-name").text(),
              })
            )
              .insertBefore(t)
              .fadeIn(),
            $(".sticky-sidebar").trigger("recalc.pin");
        }
        function t(e) {
          var t = $(e.currentTarget).closest(".product-single");
          "disabled" != t.find(".btn-product.btn-cart").attr("disabled") &&
            Riode.Minipopup.open({
              message: "Successfully Added",
              productClass: "product-compare",
              name: t.find("h1.product-name").text(),
              nameLink: t.find(".product-name > a").attr("href"),
              imageSrc: t.find(".product-image img").eq(0).attr("src"),
              imageLink: t.find(".product-name > a").attr("href"),
              price:
                t.find(".product-variation-price").length > 0
                  ? t.find(".product-variation-price").children("span").html()
                  : t.find(".product-price").html(),
              count: t.find(".quantity").val(),
              actionTemplate:
                '<div class="action-group d-flex mt-3"><a href="compare.html" class="btn btn-sm btn-outline btn-primary btn-rounded mr-2">Compare</a><a href="checkout.html" class="btn btn-sm btn-primary btn-rounded">Check Out</a></div>',
            });
        }
        function i(e) {
          e.preventDefault();
          var t,
            i = $(e.currentTarget).closest(".product-single");
          if (
            (t = i.find(".product-single-carousel").length
              ? i.find(".product-single-carousel .owl-item:not(.cloned) img")
              : i.find(".product-gallery-carousel").length
              ? i.find(".product-gallery-carousel .owl-item:not(.cloned) img")
              : i.find(".product-gallery img")).length
          ) {
            var n = t
                .map(function () {
                  var e = $(this);
                  return {
                    src: e.attr("data-zoom-image"),
                    w: 800,
                    h: 899,
                    title: e.attr("alt"),
                  };
                })
                .get(),
              o = i
                .find(".product-single-carousel, .product-gallery-carousel")
                .data("owl.carousel"),
              a = o
                ? (o.current() - o.clones().length / 2 + n.length) % n.length
                : i.find(".product-gallery > *").index();
            if ("undefined" != typeof PhotoSwipe) {
              var s = $(".pswp")[0],
                d = new PhotoSwipe(s, PhotoSwipeUI_Default, n, {
                  index: a,
                  closeOnScroll: !1,
                });
              d.init(), (Riode.photoswipe = d);
            }
          }
        }
        function n(e) {
          e.preventDefault(),
            Riode.popup({
              type: "inline",
              mainClass: "product-popupbox wm-fade product-360-popup",
              preloader: !1,
              items: {
                src: '<div class="product-gallery-degree">                        <div class="w-loading"><i></i></div>                        <ul class="product-degree-images"></ul>                    </div>',
              },
              callbacks: {
                open: function () {
                  this.container.find(".product-gallery-degree").ThreeSixty({
                    imagePath: "images/product/shoes/",
                    filePrefix: "filename_",
                    ext: ".jpg",
                    totalFrames: 36,
                    endFrame: 36,
                    currentFrame: 1,
                    imgList: this.container.find(".product-degree-images"),
                    progress: ".w-loading",
                    height: 500,
                    width: 830,
                    navigation: !0,
                  });
                },
                beforeClose: function () {
                  this.container.empty();
                },
              },
            });
        }
        function o(e) {
          var t = $(e.currentTarget);
          t.hasClass("added") ||
            (e.preventDefault(),
            t.addClass("load-more-overlay loading"),
            setTimeout(function () {
              t.removeClass("load-more-overlay loading")
                .html('<i class="d-icon-heart-full"></i> Browse wishlist')
                .addClass("added")
                .attr("title", "Browse wishlist")
                .attr("href", "wishlist.html");
            }, 500));
        }
        function a(e) {
          e.preventDefault();
          var t = $(e.currentTarget),
            i = t
              .parent()
              .children("img")
              .map(function () {
                return {
                  src: this.getAttribute("src"),
                  w: this.getAttribute("width"),
                  h: this.getAttribute("height"),
                  title: this.getAttribute("alt") || "",
                };
              })
              .get();
          if ("undefined" != typeof PhotoSwipe) {
            var n = $(".pswp")[0],
              o = new PhotoSwipe(n, PhotoSwipeUI_Default, i, {
                index: t.index(),
                closeOnScroll: !1,
              });
            o.listen("afterInit", function () {
              o.shout("initialZoomInEnd");
            }),
              o.init();
          }
        }
        return function () {
          var s = $(".product-single");
          return (
            Riode.$body.on("click", ".product-single .btn-wishlist", o),
            s.length
              ? document.body.classList.contains("home")
                ? (s.each(function () {
                    Riode.initProductSingle($(this));
                  }),
                  Riode.zoomImage(".product-gallery.row"),
                  null)
                : null === Riode.initProductSingle(s)
                ? null
                : (Riode.$body.on(
                    "click",
                    ".product-single .product-image-full",
                    i
                  ),
                  Riode.$body.on(
                    "click",
                    ".single-product .btn-cart:not(.disabled)",
                    e
                  ),
                  Riode.$body.on("click", ".single-product .btn-compare", t),
                  Riode.zoomImage(".product-gallery.row"),
                  Riode.$body.on("click", ".product-degree-viewer", n),
                  Riode.$body.on("click", ".btn-img", a),
                  Riode.$body.on(
                    "click",
                    ".rating-form .rating-stars > a",
                    function (e) {
                      var t = $(this);
                      t.addClass("active").siblings().removeClass("active"),
                        t.parent().addClass("selected"),
                        t.closest(".rating-form").find("select").val(t.text()),
                        e.preventDefault();
                    }
                  ),
                  Riode.$body.on(
                    "click",
                    ".submit-review-toggle",
                    function (e) {
                      $(".review-form-section").toggleClass("opened"),
                        e.stopPropagation(),
                        e.preventDefault();
                    }
                  ),
                  Riode.$body.on("click", ".review-overlay", function (e) {
                    $(".review-form-section").removeClass("opened"),
                      e.stopPropagation();
                  }),
                  Riode.$body.on("click", ".btn.like", function (e) {
                    var t = $(this),
                      i = t.find(".count").text();
                    t.toggleClass("active"),
                      t.find(".count").text(1 - i),
                      t
                        .closest(".feeling")
                        .find(".btn.unlike")
                        .removeClass("active"),
                      t
                        .closest(".feeling")
                        .find(".btn.unlike .count")
                        .text("0");
                  }),
                  void Riode.$body.on("click", ".btn.unlike", function (e) {
                    var t = $(this),
                      i = t.find(".count").text();
                    t.toggleClass("active"),
                      t.find(".count").text(1 - i),
                      t
                        .closest(".feeling")
                        .find(".btn.like")
                        .removeClass("active"),
                      t.closest(".feeling").find(".btn.like .count").text("0");
                  }))
              : null
          );
        };
      })()),
      (Riode.CommentWithMedia = {
        init: function () {
          Riode.$body
            .on("change", '.review-medias input[type="file"]', this.uploadMedia)
            .on("click", ".review-medias .btn-remove", this.removeMedia);
        },
        uploadMedia: function (e) {
          if ($(this)[0].files.length) {
            var t = $(this),
              i = $(this)[0].files[0],
              n = (new FileReader(), t.closest(".file-input")),
              o = (window.URL || window.webkitURL).createObjectURL(i);
            o &&
              (n.hasClass("image-input")
                ? n
                    .find(".file-input-wrapper")
                    .css("background-image", "url(" + o + ")")
                : n.hasClass("video-input") && n.find("video").attr("src", o));
          }
        },
        removeMedia: function (e) {
          var t = $(this).closest(".file-input");
          t.find('input[type="file"]').val(""),
            t.find(".file-input-wrapper").css("background-image", ""),
            t.find("video").attr("src", "");
        },
      }),
      (Riode.slider = (function () {
        function e(e, t) {
          return this.init(e, t);
        }
        var t = function (e) {
            var t,
              i = ["", "-xs", "-sm", "-md", "-lg", "-xl", "-xxl"];
            for (this.classList.remove("row"), a = 0; a < 7; ++a)
              for (t = 1; t <= 12; ++t)
                this.classList.remove("cols" + i[a] + "-" + t);
            if (
              (this.classList.remove("gutter-no"),
              this.classList.remove("gutter-sm"),
              this.classList.remove("gutter-lg"),
              this.classList.contains("animation-slider"))
            )
              for (var n = this.children, o = n.length, a = 0; a < o; ++a)
                n[a].setAttribute("data-index", a + 1);
          },
          i = function (e) {
            var t,
              i = this.firstElementChild.firstElementChild.children,
              n = i.length;
            for (t = 0; t < n; ++t)
              if (!i[t].classList.contains("active")) {
                var o,
                  a = Riode.byClass("appear-animate", i[t]);
                for (o = a.length - 1; o >= 0; --o)
                  a[o].classList.remove("appear-animate");
              }
            var s = $(e.currentTarget);
            s.find("video").on("ended", function () {
              $(this).closest(".owl-item").hasClass("active") &&
                (!0 === s.data("owl.carousel").options.autoplay
                  ? (!1 === s.data("owl.carousel").options.loop &&
                      s.data().children - 1 ===
                        s.find(".owl-item.active").index() &&
                      ((this.loop = !0), this.play()),
                    s.trigger("next.owl.carousel"),
                    s.trigger("play.owl.autoplay"))
                  : ((this.loop = !0), this.play()));
            });
          },
          n = function (e) {
            $(window).trigger("appear.check");
            var t = $(e.currentTarget),
              i = t.find(".owl-item.active video");
            t.find(".owl-item:not(.active) video").each(function () {
              this.paused || t.trigger("play.owl.autoplay"),
                this.pause(),
                (this.currentTime = 0);
            }),
              i.length &&
                (!0 === t.data("owl.carousel").options.autoplay &&
                  t.trigger("stop.owl.autoplay"),
                i.each(function () {
                  this.paused && this.play();
                }));
          },
          o = function (e) {
            var t = this;
            $(e.currentTarget)
              .find(".owl-item.active .slide-animate")
              .each(function () {
                var e = $(this),
                  i = $.extend(
                    !0,
                    {},
                    Riode.defaults.animation,
                    Riode.parseOptions(e.data("animation-options"))
                  ),
                  n = i.duration,
                  o = i.delay,
                  a = i.name;
                e.css("animation-duration", n);
                var s = Riode.requestTimeout(
                  function () {
                    e.addClass(a), e.addClass("show-content");
                  },
                  o ? 1e3 * Number(o.slice(0, -1)) : 0
                );
                t.timers.push(s);
              });
          },
          a = function (e) {
            $(e.currentTarget)
              .find(".owl-item.active .slide-animate")
              .each(function () {
                var e = $(this);
                e.addClass("show-content"), e.attr("style", "");
              });
          },
          s = function (e) {
            var t = this,
              i = $(e.currentTarget);
            (t.translateFlag = 1),
              (t.prev = t.next),
              i.find(".owl-item .slide-animate").each(function () {
                var e = $(this),
                  t = $.extend(
                    !0,
                    {},
                    Riode.defaults.animation,
                    Riode.parseOptions(e.data("animation-options"))
                  );
                e.removeClass(t.name);
              });
          },
          d = function (e) {
            var t = this,
              i = $(e.currentTarget);
            if (1 == t.translateFlag) {
              if (
                ((t.next = i
                  .find(".owl-item")
                  .eq(e.item.index)
                  .children()
                  .attr("data-index")),
                i.find(".show-content").removeClass("show-content"),
                t.prev != t.next)
              ) {
                if (
                  (i.find(".show-content").removeClass("show-content"),
                  i.hasClass("animation-slider"))
                ) {
                  for (var n = 0; n < t.timers.length; n++)
                    Riode.deleteTimeout(t.timers[n]);
                  t.timers = [];
                }
                i.find(".owl-item.active .slide-animate").each(function () {
                  var e = $(this),
                    i = $.extend(
                      !0,
                      {},
                      Riode.defaults.animation,
                      Riode.parseOptions(e.data("animation-options"))
                    ),
                    n = i.duration,
                    o = i.delay,
                    a = i.name;
                  e.css("animation-duration", n),
                    e.css("animation-delay", o),
                    e.css("transition-property", "visibility, opacity"),
                    e.css("transition-delay", o),
                    e.css("transition-duration", n),
                    e.addClass(a),
                    (n = n || "0.75s"),
                    e.addClass("show-content");
                  var s = Riode.requestTimeout(
                    function () {
                      e.css("transition-property", ""),
                        e.css("transition-delay", ""),
                        e.css("transition-duration", ""),
                        t.timers.splice(t.timers.indexOf(s), 1);
                    },
                    o
                      ? 1e3 * Number(o.slice(0, -1)) +
                          500 * Number(n.slice(0, -1))
                      : 500 * Number(n.slice(0, -1))
                  );
                  t.timers.push(s);
                });
              } else
                i.find(".owl-item")
                  .eq(e.item.index)
                  .find(".slide-animate")
                  .addClass("show-content");
              t.translateFlag = 0;
            }
          };
        return (
          (e.zoomImage = function () {
            Riode.zoomImage(this.$element);
          }),
          (e.zoomImageRefresh = function () {
            this.$element.find("img").each(function () {
              var e = $(this);
              if ($.fn.elevateZoom) {
                var t = e.data("elevateZoom");
                void 0 !== t
                  ? t && t.refresh()
                  : ((Riode.defaults.zoomImage.zoomContainer = e.parent()),
                    e.elevateZoom(e.elevateZoom));
              }
            });
          }),
          (Riode.defaults.sliderPresets[
            "product-single-carousel"
          ].onInitialized = Riode.defaults.sliderPresets[
            "product-gallery-carousel"
          ].onInitialized =
            e.zoomImage),
          (Riode.defaults.sliderPresets["product-single-carousel"].onRefreshed =
            Riode.defaults.sliderPresets[
              "product-gallery-carousel"
            ].onRefreshed =
              e.zoomImageRefresh),
          (e.prototype.init = function (e, r) {
            (this.timers = []),
              (this.translateFlag = 0),
              (this.prev = 1),
              (this.next = 1),
              Riode.lazyload(e, !0);
            var l = e.attr("class").split(" "),
              c = $.extend(!0, {}, Riode.defaults.slider);
            l.forEach(function (e) {
              var t = Riode.defaults.sliderPresets[e];
              t && $.extend(!0, c, t);
            }),
              e.find("video").each(function () {
                this.loop = !1;
              }),
              $.extend(
                !0,
                c,
                Riode.parseOptions(e.attr("data-owl-options")),
                r
              ),
              (o = o.bind(this)),
              (s = s.bind(this)),
              (d = d.bind(this)),
              e
                .on("initialize.owl.carousel", t)
                .on("initialized.owl.carousel", i)
                .on("translated.owl.carousel", n),
              e.hasClass("animation-slider") &&
                e
                  .on("initialized.owl.carousel", o)
                  .on("resized.owl.carousel", a)
                  .on("translate.owl.carousel", s)
                  .on("translated.owl.carousel", d),
              e.owlCarousel(c);
          }),
          function (t, i) {
            Riode.$(t).each(function () {
              var t = $(this);
              Riode.call(function () {
                new e(t, i);
              });
            });
          }
        );
      })()),
      (Riode.quantityInput = (function () {
        function e(e) {
          return this.init(e);
        }
        return (
          (e.min = 1),
          (e.max = 1e6),
          (e.value = 1),
          (e.prototype.init = function (t) {
            var i = this;
            (i.$minus = !1),
              (i.$plus = !1),
              (i.$value = !1),
              (i.value = !1),
              (i.startIncrease = i.startIncrease.bind(i)),
              (i.startDecrease = i.startDecrease.bind(i)),
              (i.stop = i.stop.bind(i)),
              (i.min = parseInt(t.attr("min"))),
              (i.max = parseInt(t.attr("max"))),
              i.min || t.attr("min", (i.min = e.min)),
              i.max || t.attr("max", (i.max = e.max)),
              (i.$value = t.val((i.value = e.value))),
              (i.$minus = t
                .prev()
                .on("mousedown", function (e) {
                  e.preventDefault(), i.startDecrease();
                })
                .on("touchstart", function (e) {
                  e.cancelable && e.preventDefault(), i.startDecrease();
                })
                .on("mouseup", i.stop)),
              (i.$plus = t
                .next()
                .on("mousedown", function (e) {
                  e.preventDefault(), i.startIncrease();
                })
                .on("touchstart", function (e) {
                  e.cancelable && e.preventDefault(), i.startIncrease();
                })
                .on("mouseup", i.stop)),
              Riode.$body
                .on("mouseup", i.stop)
                .on("touchend", i.stop)
                .on("touchcancel", i.stop);
          }),
          (e.prototype.startIncrease = function (e) {
            e && e.preventDefault();
            var t = this;
            (t.value = t.$value.val()),
              t.value < t.max && t.$value.val(++t.value),
              (t.increaseTimer = Riode.requestTimeout(function () {
                (t.speed = 1),
                  (t.increaseTimer = Riode.requestInterval(function () {
                    t.$value.val(
                      (t.value = Math.min(
                        t.value + Math.floor((t.speed *= 1.05)),
                        t.max
                      ))
                    );
                  }, 50));
              }, 400));
          }),
          (e.prototype.stop = function (e) {
            Riode.deleteTimeout(this.increaseTimer),
              Riode.deleteTimeout(this.decreaseTimer);
          }),
          (e.prototype.startDecrease = function () {
            var e = this;
            (e.value = e.$value.val()),
              e.value > e.min && e.$value.val(--e.value),
              (e.decreaseTimer = Riode.requestTimeout(function () {
                (e.speed = 1),
                  (e.decreaseTimer = Riode.requestInterval(function () {
                    e.$value.val(
                      (e.value = Math.max(
                        e.value - Math.floor((e.speed *= 1.05)),
                        e.min
                      ))
                    );
                  }, 50));
              }, 400));
          }),
          function (t) {
            Riode.$(t).each(function () {
              var t = $(this);
              t.data("quantityInput") || t.data("quantityInput", new e(t));
            });
          }
        );
      })()),
      (Riode.Menu = {
        init: function () {
          this.initMenu(),
            this.initMobileMenu(),
            this.initFilterMenu(),
            this.initCategoryMenu(),
            this.initCollapsibleWidget();
        },
        initMenu: function () {
          $(".menu li").each(function () {
            this.lastElementChild &&
              ("UL" === this.lastElementChild.tagName ||
                this.lastElementChild.classList.contains("megamenu")) &&
              this.classList.add("submenu");
          }),
            $(".menu > li > a").each(function () {
              var e = $(this);
              "Elements" == e.text() &&
                e.closest("li").addClass("submenu-container");
            }),
            $(".main-nav .megamenu, .main-nav .submenu > ul").each(function () {
              var e = $(this),
                t = e.offset().left,
                i = e.outerWidth(),
                n = t + i - (window.innerWidth - 20);
              if (e.closest("li").hasClass("submenu-container")) {
                var o = $(window).innerWidth();
                o <= 1200 && e.css("width", o - 40),
                  e.css("margin-left", (o - i) / 2 - t);
              } else n >= 0 && t > 20 && e.css("margin-left", "-=" + n);
            }),
            Riode.$window.on("resize", function () {
              $(".main-nav .megamenu, .main-nav .submenu > ul").each(
                function () {
                  var e = $(this),
                    t = e.offset().left,
                    i = e.outerWidth(),
                    n = t + i - (window.innerWidth - 20);
                  if (e.closest("li").hasClass("submenu-container")) {
                    var o = $(window).innerWidth();
                    o <= 1200 && (e.css("width", o - 40), (i = e.innerWidth())),
                      e.css("margin-left", 0),
                      (t = e.offset().left),
                      e.css("margin-left", (o - i) / 2 - t);
                  } else n >= 0 && t > 20 && e.css("margin-left", "-=" + n);
                }
              );
            });
        },
        initMobileMenu: function () {
          function e(e) {
            (e &&
              e.type &&
              "resize" == e.type &&
              !Riode.windowResized(e.timeStamp)) ||
              (e.preventDefault(), Riode.$body.removeClass("mmenu-active"));
          }
          $(".mobile-menu li, .toggle-menu li").each(function () {
            if (
              this.lastElementChild &&
              ("UL" === this.lastElementChild.tagName ||
                this.lastElementChild.classList.contains("megamenu"))
            ) {
              var e = document.createElement("span");
              (e.className = "toggle-btn"),
                this.firstElementChild.appendChild(e);
            }
          }),
            $(".mobile-menu-toggle").on("click", function () {
              Riode.$body.addClass("mmenu-active");
            }),
            $(".mobile-menu-overlay").on("click", e),
            $(".mobile-menu-close").on("click", e),
            Riode.$window.on("resize", e);
        },
        initFilterMenu: function () {
          $(".search-ul li").each(function () {
            if (
              this.lastElementChild &&
              "UL" === this.lastElementChild.tagName
            ) {
              var e = document.createElement("i");
              (e.className = "fas fa-chevron-down"),
                this.classList.add("with-ul"),
                this.firstElementChild.appendChild(e);
            }
          }),
            $(".with-ul > a i, .toggle-btn").on("click", function (e) {
              $(this)
                .parent()
                .next()
                .slideToggle(300)
                .parent()
                .toggleClass("show"),
                setTimeout(function () {
                  $(".sticky-sidebar").trigger("recalc.pin");
                }, 320),
                e.preventDefault();
            });
        },
        initCategoryMenu: function () {
          var e = $(".category-dropdown");
          if (e.length) {
            var t = e.find(".dropdown-box");
            if (t.length) {
              var i = $(".main").offset().top + t[0].offsetHeight;
              (window.pageYOffset > i ||
                window.innerWidth < Riode.minDesktopWidth) &&
                e.removeClass("show"),
                window.addEventListener(
                  "scroll",
                  function () {
                    window.pageYOffset <= i &&
                      window.innerWidth >= Riode.minDesktopWidth &&
                      e.removeClass("show");
                  },
                  { passive: !0 }
                ),
                $(".category-toggle").on("click", function (e) {
                  e.preventDefault();
                }),
                e.on("mouseover", function (t) {
                  window.pageYOffset > i &&
                    window.innerWidth >= Riode.minDesktopWidth &&
                    e.addClass("show");
                }),
                e.on("mouseleave", function (t) {
                  window.pageYOffset > i &&
                    window.innerWidth >= Riode.minDesktopWidth &&
                    e.removeClass("show");
                });
            }
            if (e.hasClass("with-sidebar")) {
              var n = Riode.byClass("sidebar");
              n.length &&
                (e.find(".dropdown-box").css("width", n[0].offsetWidth - 20),
                Riode.$window.on("resize", function () {
                  e.find(".dropdown-box").css("width", n[0].offsetWidth - 20);
                }));
            }
          }
        },
        initCollapsibleWidget: function () {
          $(".widget-collapsible .widget-title").each(function () {
            var e = document.createElement("span");
            (e.className = "toggle-btn"), this.appendChild(e);
          }),
            $(".widget-collapsible .widget-title").on("click", function (e) {
              var t = $(this);
              if (!t.hasClass("sliding")) {
                var i = t.siblings(".widget-body");
                t.hasClass("collapsed") || i.css("display", "block"),
                  t.addClass("sliding"),
                  i.slideToggle(300, function () {
                    t.removeClass("sliding");
                  }),
                  t.toggleClass("collapsed"),
                  setTimeout(function () {
                    $(".sticky-sidebar").trigger("recalc.pin");
                  }, 320);
              }
            });
        },
      }),
      (Riode.StickyLink = {
        init: function () {
          this.initShowDemos();
        },
        initShowDemos: function () {
          function e() {
            $(".demos-list").removeClass("show");
          }
          $(".demo-toggle").on("click", function (e) {
            e.preventDefault(),
              (function () {
                $(".demos-list").addClass("show");
                var e = $(".demos-list .demos"),
                  t = $(".demos-list .demos-content");
                0 == e.children().length &&
                  (Riode.doLoading(t),
                  $.ajax({
                    url: "ajax/demos-list.html",
                    method: "post",
                    data: { action: "riode_demos_list" },
                    success: function (i) {
                      i && (Riode.endLoading(t), e.html(i));
                    },
                  }));
              })();
          }),
            $(".demos-overlay").on("click", function (t) {
              t.preventDefault(), e();
            }),
            $(".demos-close").on("click", function (t) {
              t.preventDefault(), e();
            });
        },
      }),
      (Riode.Minipopup = (function () {
        var e,
          t = 0,
          i = [],
          n = !1,
          o = [],
          a = !1,
          s = function () {
            if (!n)
              for (var e = 0; e < o.length; ++e)
                (o[e] -= 200) <= 0 && this.close(e--);
          };
        return {
          init: function () {
            var t = document.createElement("div");
            (t.className = "minipopup-area"),
              Riode.byClass("page-wrapper")[0].appendChild(t),
              (e = $(t)).on("click", ".btn-close", function (e) {
                self.close($(this).closest(".minipopup-box").index());
              }),
              (this.close = this.close.bind(this)),
              (s = s.bind(this));
          },
          open: function (n, d) {
            var r,
              l = this,
              c = $.extend(!0, {}, Riode.defaults.minipopup, n);
            c.isPurchased
              ? (c.detailTemplate = Riode.parseTemplate(c.purchasedTemplate, c))
              : (c.detailTemplate = Riode.parseTemplate(
                  null != c.count ? c.priceQuantityTemplate : c.priceTemplate,
                  c
                )),
              null != c.rating &&
                (c.detailTemplate += Riode.parseTemplate(c.ratingTemplate, c)),
              (r = $(Riode.parseTemplate(c.template, c))),
              (l.space = c.space),
              (r.appendTo(e).css("top", -t).find("img")[0].onload =
                function () {
                  (t += r[0].offsetHeight + l.space),
                    r.addClass("show"),
                    r.offset().top - window.pageYOffset < 0 &&
                      (l.close(),
                      r.css("top", -t + r[0].offsetHeight + l.space)),
                    r
                      .on("mouseenter", function () {
                        l.pause();
                      })
                      .on("mouseleave", function () {
                        l.resume();
                      })
                      .on("touchstart", function (e) {
                        l.pause(), e.stopPropagation();
                      })
                      .on("mousedown", function () {
                        $(this).addClass("focus");
                      })
                      .on("mouseup", function () {
                        l.close($(this).index());
                      }),
                    Riode.$body.on("touchstart", function () {
                      l.resume();
                    }),
                    i.push(r),
                    o.push(c.delay),
                    o.length > 1 || (a = setInterval(s, 200)),
                    d && d(r);
                });
          },
          close: function (e) {
            var n = void 0 === e ? 0 : e,
              s = i.splice(n, 1)[0];
            o.splice(n, 1)[0],
              (t -= s[0].offsetHeight + this.space),
              s.removeClass("show"),
              setTimeout(function () {
                s.remove();
              }, 300),
              i.forEach(function (e, t) {
                t >= n &&
                  e.hasClass("show") &&
                  e
                    .stop(!0, !0)
                    .animate(
                      { top: parseInt(e.css("top")) + e[0].offsetHeight + 20 },
                      600,
                      "easeOutQuint"
                    );
              }),
              i.length || clearTimeout(a);
          },
          pause: function () {
            n = !0;
          },
          resume: function () {
            n = !1;
          },
        };
      })()),
      (Riode.floatSVG = (function () {
        function e(e, t) {
          (this.$el = $(e)), this.set(t), this.start();
        }
        return (
          (e.prototype.set = function (e) {
            this.options = $.extend(
              { delta: 15, speed: 10, size: 1 },
              "string" == typeof e ? Riode.parseOptions(e) : e
            );
          }),
          (e.prototype.getDeltaY = function (e) {
            return (
              Math.sin(((2 * Math.PI * e) / this.width) * this.options.size) *
              this.options.delta
            );
          }),
          (e.prototype.start = function () {
            (this.update = this.update.bind(this)),
              (this.timeStart = Date.now() - parseInt(100 * Math.random())),
              this.$el.find("path").each(function () {
                $(this).data(
                  "original",
                  this.getAttribute("d").replace(/([\d])\s*\-/g, "$1,-")
                );
              }),
              window.addEventListener("resize", this.update, { passive: !0 }),
              window.addEventListener("scroll", this.update, { passive: !0 }),
              Riode.$window.on("check_float_svg", this.update),
              this.update();
          }),
          (e.prototype.update = function () {
            var e = this;
            this.$el.length &&
              Riode.isOnScreen(this.$el[0]) &&
              Riode.requestTimeout(function () {
                e.draw();
              }, 16);
          }),
          (e.prototype.draw = function () {
            var e = this,
              t = ((Date.now() - this.timeStart) * this.options.speed) / 200;
            (this.width = this.$el.width()),
              this.width &&
                (this.$el.find("path").each(function () {
                  var i = t,
                    n = 0;
                  this.setAttribute(
                    "d",
                    $(this)
                      .data("original")
                      .replace(/M([\d|\.]*),([\d|\.]*)/, function (t, o, a) {
                        return o && a
                          ? "M" +
                              o +
                              "," +
                              (
                                parseFloat(a) +
                                (n = e.getDeltaY((i += parseFloat(o))))
                              ).toFixed(3)
                          : t;
                      })
                      .replace(/([c|C])[^A-Za-z]*/g, function (o, a) {
                        if (a) {
                          var s = o.slice(1).split(",").map(parseFloat);
                          if (6 == s.length)
                            return (
                              "C" == a
                                ? ((s[1] += e.getDeltaY(t + s[0])),
                                  (s[3] += e.getDeltaY(t + s[2])),
                                  (s[5] += e.getDeltaY((i = t + s[4]))))
                                : ((s[1] += e.getDeltaY(i + s[0]) - n),
                                  (s[3] += e.getDeltaY(i + s[2]) - n),
                                  (s[5] += e.getDeltaY((i += s[4])) - n)),
                              (n = e.getDeltaY(i)),
                              a +
                                s
                                  .map(function (e) {
                                    return e.toFixed(3);
                                  })
                                  .join(",")
                            );
                        }
                        return o;
                      })
                  );
                }),
                this.update());
          }),
          function (t) {
            Riode.$(t).each(function () {
              var t,
                i = $(this);
              "svg" == this.tagName &&
                ((t = i.data("float-svg"))
                  ? t.set(i.attr("data-float-options"))
                  : i.data(
                      "float-svg",
                      new e(this, i.attr("data-float-options"))
                    ));
            });
          }
        );
      })()),
      (Riode.Shop = {
        init: function () {
          this.initProductsQuickview(),
            this.initProductsCartAction(),
            this.initProductsCompareAction(),
            this.initProductsWishlistAction(),
            this.initProductsLoginAction(),
            this.initProductsLoad(),
            this.initProductsScrollLoad(".scroll-load"),
            this.initProductType("slideup"),
            this.initVariation(),
            this.initWishlistButton(
              ".product:not(.product-single) .btn-wishlist"
            ),
            Riode.call(Riode.ratingTooltip, 500),
            this.initSelectMenu(".select-menu"),
            Riode.priceSlider(".filter-price-slider"),
            this.topCategoryOpener();
        },
        topCategoryOpener: function () {
          Riode.$body
            .find(".toolbox-horizontal .widget-title")
            .on("click", function (e) {
              $(this).parent().siblings().removeClass("opened"),
                $(this).parent().toggleClass("opened"),
                e.stopPropagation();
            });
        },
        initVariation: function (e) {
          $(".product:not(.product-single) .product-variations > a").on(
            "click",
            function (e) {
              var t = $(this),
                i = t.closest(".product").find(".product-media img");
              i.data("image-src") || i.data("image-src", i.attr("src")),
                t.toggleClass("active").siblings().removeClass("active"),
                t.hasClass("active")
                  ? i.attr("src", t.data("src"))
                  : (i.attr("src", i.data("image-src")), t.blur()),
                e.preventDefault();
            }
          );
        },
        initProductType: function (e) {
          "slideup" === e &&
            ($(".product-slideup-content .product-details").each(function (e) {
              var t = $(this),
                i = t.find(".product-hide-details").outerHeight(!0);
              t.height(t.height() - i);
            }),
            $(Riode.byClass("product-slideup-content"))
              .on("mouseenter touchstart", function (e) {
                var t = $(this),
                  i = t.find(".product-hide-details").outerHeight(!0);
                t
                  .find(".product-details")
                  .css("transform", "translateY(" + -i + "px)"),
                  t
                    .find(".product-hide-details")
                    .css("transform", "translateY(" + -i + "px)");
              })
              .on("mouseleave touchleave", function (e) {
                var t = $(this);
                t.find(".product-hide-details").outerHeight(!0);
                t.find(".product-details").css("transform", "translateY(0)"),
                  t
                    .find(".product-hide-details")
                    .css("transform", "translateY(0)");
              }));
        },
        initSelectMenu: function () {
          Riode.$body
            .on("click", ".select-menu", function (e) {
              var t = $(this);
              if (!t.hasClass("toolbox-sort")) {
                var i = $(e.currentTarget),
                  n = $(e.target),
                  o = i.hasClass("opened");
                i.hasClass("fixed")
                  ? e.stopPropagation()
                  : 0 != t.closest(".sidebar-content").length &&
                    $(".select-menu").removeClass("opened"),
                  i.is(n.parent())
                    ? (o || i.addClass("opened"), e.stopPropagation())
                    : (n.parent().toggleClass("active"),
                      n.parent().hasClass("active")
                        ? ($(".select-items").show(),
                          $(
                            '<a href="#" class="select-item">' +
                              n.text() +
                              '<i class="d-icon-times"></i></a>'
                          )
                            .insertBefore(".select-items .filter-clean")
                            .hide()
                            .fadeIn()
                            .data("link", n.parent()))
                        : $(".select-items > .select-item")
                            .filter(function (e, t) {
                              return t.innerText == n.text();
                            })
                            .fadeOut(function () {
                              $(this).remove(),
                                $(".select-items").children().length < 2 &&
                                  $(".select-items").hide();
                            }));
              }
              e.preventDefault();
            })
            .on("click", function (e) {
              (0 == $(e.target).closest(".filter-items").length ||
                $(e.target).hasClass("select-menu")) &&
                $(".select-menu").removeClass("opened");
            })
            .on("click", ".select-items .filter-clean", function (e) {
              var t = $(this);
              t.siblings().each(function () {
                var e = $(this).data("link");
                e && e.removeClass("active");
              }),
                t.parent().fadeOut(function () {
                  t.siblings().remove();
                }),
                e.preventDefault();
            })
            .on("click", ".select-item i", function (e) {
              $(e.currentTarget)
                .parent()
                .fadeOut(function () {
                  var e = $(this),
                    t = e.data("link");
                  t && t.toggleClass("active"),
                    e.remove(),
                    $(".select-items").children().length < 2 &&
                      $(".select-items").hide();
                }),
                e.preventDefault();
            })
            .on("click", ".filter-clean", function (e) {
              $(".shop-sidebar .filter-items .active").removeClass("active"),
                e.preventDefault();
            })
            .on("click", ".filter-items a", function (e) {
              var t = $(this).closest(".filter-items");
              t.hasClass("search-ul") ||
                t.parent().hasClass("select-menu") ||
                (t.hasClass("filter-price")
                  ? ($(this).parent().siblings().removeClass("active"),
                    $(this).parent().toggleClass("active"),
                    e.preventDefault())
                  : ($(this).parent().toggleClass("active"),
                    e.preventDefault()));
            });
        },
        initProductsQuickview: function () {
          Riode.$body.on("click", ".btn-quickview", function (e) {
            e.preventDefault(),
              $(this).closest(".dark-theme").length > 0
                ? Riode.popup(
                    {
                      items: { src: "ajax/quickview-dark.html" },
                      callbacks: {
                        ajaxContentAdded: function () {
                          this.wrap.imagesLoaded(function () {
                            Riode.initProductSingle(
                              $(".mfp-product .product-single")
                            );
                          });
                        },
                      },
                    },
                    "quickview"
                  )
                : Riode.popup(
                    {
                      items: { src: "ajax/quickview.html" },
                      callbacks: {
                        ajaxContentAdded: function () {
                          this.wrap.imagesLoaded(function () {
                            Riode.initProductSingle(
                              $(".mfp-product .product-single")
                            );
                          });
                        },
                      },
                    },
                    "quickview"
                  );
          });
        },
        initProductsCartAction: function () {
          Riode.$body
            .on("click", ".off-canvas .cart-toggle", function (e) {
              e.preventDefault(), $(".cart-dropdown").addClass("opened");
            })
            .on("click", ".off-canvas .canvas-header .btn-close", function (e) {
              $(".cart-dropdown").removeClass("opened"), e.preventDefault();
            })
            .on("click", ".off-canvas .canvas-overlay", function (e) {
              $(".cart-dropdown").removeClass("opened"), e.preventDefault();
            })
            .on(
              "click",
              ".product:not(.product-variable) .btn-product-icon.btn-cart, .product:not(.product-variable) .btn-product.btn-cart",
              function (e) {
                e.preventDefault();
                var t,
                  i,
                  n = $(this).closest(".product"),
                  o = $(this).closest(".compare-col");
                $(this).closest(".compare-row");
                o.length > 0
                  ? ((t = $(".riode-compare-table > .compare-row")
                      .eq(2)
                      .children()
                      .eq(o.index())
                      .find(".product-price .new-price, .product-price .price")
                      .html()),
                    (i = $(".riode-compare-table > .compare-row")
                      .eq(1)
                      .children()
                      .eq(o.index())),
                    n.hasClass("product-single") ||
                      Riode.Minipopup.open({
                        message: "Successfully Added",
                        productClass: "product-cart",
                        name: i.find("a").text(),
                        nameLink: i.find(" a ").attr("href"),
                        imageSrc: n.find(".product-media img").attr("src"),
                        imageLink: i.find(" a ").attr("href"),
                        price: t,
                        count:
                          n.find(".quantity").length > 0
                            ? n.find(".quantity").val()
                            : 1,
                        actionTemplate:
                          '<div class="action-group d-flex"><a href="cart.html" class="btn btn-sm btn-outline btn-primary btn-rounded">View Cart</a><a href="checkout.html" class="btn btn-sm btn-primary btn-rounded">Check Out</a></div>',
                      }))
                  : n.hasClass("product-single") ||
                    Riode.Minipopup.open({
                      message: "Successfully Added",
                      productClass: "product-cart",
                      name: n.find(".product-name").text(),
                      nameLink: n.find(".product-name > a").attr("href"),
                      imageSrc: n.find(".product-media img").attr("src"),
                      imageLink: n.find(".product-name > a").attr("href"),
                      price: n
                        .find(
                          ".product-price .new-price, .product-price .price"
                        )
                        .html(),
                      count:
                        n.find(".quantity").length > 0
                          ? n.find(".quantity").val()
                          : 1,
                      actionTemplate:
                        '<div class="action-group d-flex"><a href="cart.html" class="btn btn-sm btn-outline btn-primary btn-rounded">View Cart</a><a href="checkout.html" class="btn btn-sm btn-primary btn-rounded">Check Out</a></div>',
                    });
              }
            )
            .on("click", ".hotspot .btn-cart", function (e) {
              e.preventDefault();
              var t = $(this).closest(".tooltip");
              Riode.Minipopup.open({
                message: "Successfully Added To Cart",
                productClass: "product-cart",
                name: t.find(".tooltip-name").text(),
                nameLink: t.find(".tooltip-name > a").attr("href"),
                imageSrc: t.find(".tooltip-media img").attr("src"),
                imageLink: t.find(".tooltip-name > a").attr("href"),
                price: t
                  .find(".tooltip-price .new-price, .tooltip-price .price")
                  .html(),
                count:
                  t.find(".quantity").length > 0
                    ? t.find(".quantity").val()
                    : 1,
                actionTemplate:
                  '<div class="action-group d-flex"><a href="cart.html" class="btn btn-sm btn-outline btn-primary btn-rounded">View Cart</a><a href="checkout.html" class="btn btn-sm btn-primary btn-rounded">Check Out</a></div>',
              });
            });
        },
        initProductsCompareAction: function () {
          Riode.$body
            .on("click", ".off-canvas .compare-toggle", function (e) {
              e.preventDefault(), $(".compare-dropdown").addClass("opened");
            })
            .on("click", ".off-canvas .canvas-header .btn-close", function (e) {
              $(".compare-dropdown").removeClass("opened"), e.preventDefault();
            })
            .on("click", ".off-canvas .canvas-overlay", function (e) {
              $(".compare-dropdown").removeClass("opened"), e.preventDefault();
            })
            .on(
              "click",
              ".product .btn-product-icon.btn-compare",
              function (e) {
                e.preventDefault();
                var t = $(this).closest(".product");
                t.hasClass("product-single") ||
                  Riode.Minipopup.open({
                    message: "Added To Compare List",
                    productClass: " product-compare",
                    name: t.find(".product-name").text(),
                    nameLink: t.find(".product-name > a").attr("href"),
                    imageSrc: t.find(".product-media img").attr("src"),
                    imageLink: t.find(".product-name > a").attr("href"),
                    price: t
                      .find(".product-price .new-price, .product-price .price")
                      .html(),
                    count:
                      t.find(".quantity").length > 0
                        ? t.find(".quantity").val()
                        : 1,
                    actionTemplate:
                      '<div class="action-group d-flex"><a href="compare.html" class="btn btn-sm btn-outline btn-primary btn-rounded">Compare</a><a href="checkout.html" class="btn btn-sm btn-primary btn-rounded">Check Out</a></div>',
                  });
              }
            );
        },
        initProductsWishlistAction: function () {
          Riode.$body
            .on("click", ".off-canvas .wishlist-toggle", function (e) {
              e.preventDefault(), $(".wishlist-dropdown").addClass("opened");
            })
            .on("click", ".off-canvas .canvas-header .btn-close", function (e) {
              $(".wishlist-dropdown").removeClass("opened"), e.preventDefault();
            })
            .on("click", ".off-canvas .canvas-overlay", function (e) {
              $(".wishlist-dropdown").removeClass("opened"), e.preventDefault();
            });
        },
        initProductsLoginAction: function () {
          Riode.$body
            .on("click", ".login-toggle, .register-toggle", function (e) {
              e.preventDefault(), $(".login-dropdown").addClass("opened");
            })
            .on("click", ".off-canvas .canvas-header .btn-close", function (e) {
              $(".login-dropdown").removeClass("opened"), e.preventDefault();
            })
            .on("click", ".off-canvas .canvas-overlay", function (e) {
              $(".login-dropdown").removeClass("opened"), e.preventDefault();
            });
        },
        initProductsLoad: function () {
          $(".btn-load").on("click", function (e) {
            var t = $(this),
              i = $(t.data("load-to")),
              n = t.html();
            t.text("Loading ..."),
              t.addClass("btn-loading"),
              $(".d-loading").css("display", "block"),
              e.preventDefault(),
              $.ajax({
                url: t.attr("href"),
                success: function (e) {
                  var o = $(e);
                  setTimeout(function () {
                    $.fn.isotope ? i.isotope("insert", o) : i.append(o),
                      t.html(n);
                    var e = parseInt(
                      t.data("load-count") ? t.data("load-count") : 0
                    );
                    t.data("load-count", ++e),
                      t.removeClass("btn-loading"),
                      $(".d-loading").css("display", "none"),
                      e >= 2 && t.hide();
                  }, 350);
                },
                failure: function () {
                  t.text("Sorry something went wrong.");
                },
              });
          });
        },
        initProductsScrollLoad: function (e) {
          var t,
            i = Riode.$(e),
            n = $(e).data("url");
          n || (n = "ajax/ajax-products.html");
          var o = function (e) {
            window.pageYOffset >
              t + i.outerHeight() - window.innerHeight - 150 &&
              "loading" != i.data("load-state") &&
              $.ajax({
                url: n,
                success: function (e) {
                  var t = $(e);
                  i.data("load-state", "loading"),
                    i.next().hasClass("load-more-overlay")
                      ? i.next().addClass("loading")
                      : $(
                          '<div class="mt-4 mb-4 load-more-overlay loading"></div>'
                        ).insertAfter(i),
                    setTimeout(function () {
                      i.next().removeClass("loading"),
                        i.append(t),
                        setTimeout(function () {
                          i.find(".product-wrap.fade:not(.in)").addClass("in");
                        }, 200),
                        i.data("load-state", "loaded");
                    }, 500);
                  var n = parseInt(
                    i.data("load-count") ? i.data("load-count") : 0
                  );
                  i.data("load-count", ++n),
                    n > 2 &&
                      window.removeEventListener("scroll", o, { passive: !0 });
                },
                failure: function () {
                  $this.text("Sorry something went wrong.");
                },
              });
          };
          i.length > 0 &&
            ((t = i.offset().top),
            window.addEventListener("scroll", o, { passive: !0 }));
        },
        initWishlistButton: function (e) {
          Riode.$body.on("click", e, function (e) {
            var t = $(this);
            t.toggleClass("added").addClass("load-more-overlay loading"),
              setTimeout(function () {
                t
                  .removeClass("load-more-overlay loading")
                  .find("i")
                  .toggleClass("d-icon-heart")
                  .toggleClass("d-icon-heart-full"),
                  t.hasClass("added")
                    ? t.attr("title", "Remove from wishlist")
                    : t.attr("title", "Add to wishlist");
              }, 500),
              e.preventDefault();
          });
        },
      }),
      (Riode.prepare = function () {
        Riode.$body.hasClass("with-flex-container") &&
          window.innerWidth >= 1200 &&
          Riode.$body.addClass("sidebar-active");
      }),
      (Riode.initLayout = function () {
        Riode.isotopes(".grid:not(.grid-float)"),
          Riode.stickySidebar(".sticky-sidebar");
      }),
      (Riode.init = function () {
        Riode.appearAnimate(".appear-animate"),
          Riode.Minipopup.init(),
          Riode.Shop.init(),
          Riode.initProductSinglePage(),
          Riode.slider(".owl-carousel"),
          Riode.headerToggleSearch(".hs-toggle"),
          Riode.closeTopNotice(".btn-notice-close"),
          Riode.stickyContent(".product-sticky-content, .sticky-header", {
            top: !1,
          }),
          Riode.stickyContent(".sticky-footer", Riode.defaults.stickyFooter),
          Riode.stickyContent(".sticky-toolbox", Riode.defaults.stickyToolbox),
          Riode.sidebar("sidebar"),
          Riode.sidebar("right-sidebar"),
          Riode.sidebar("top-sidebar"),
          Riode.quantityInput(".quantity"),
          Riode.playableVideo(".inner-video"),
          Riode.initAccordion(".card-header > a"),
          Riode.initTab(".nav-tabs"),
          Riode.initAlert(".alert"),
          Riode.parallax(".parallax"),
          Riode.countTo(".count-to"),
          Riode.countdown(".product-countdown, .countdown"),
          Riode.Menu.init(),
          Riode.StickyLink.init(),
          Riode.initZoom(),
          Riode.initNavFilter(".nav-filters .nav-filter"),
          Riode.initPopups(),
          Riode.initPurchasedMinipopup(),
          Riode.initScrollTopButton(),
          Riode.floatSVG(".float-svg"),
          Riode.initShowVendorSearch(".toolbox .form-toggle-btn"),
          Riode.initFloatingElements(".floating"),
          Riode.initAdvancedMotions(".skrollr"),
          Riode.degree360(".product-gallery-degree"),
          Riode.scrollSet(".scroll-menu a"),
          Riode.CommentWithMedia.init(),
          (Riode.status = "complete");
      }),
      Riode.prepare(),
      (window.onload = function () {
        (Riode.status = "loaded"),
          Riode.$body.addClass("loaded"),
          Riode.$window.trigger("riode_load"),
          Riode.call(Riode.initLayout),
          Riode.call(Riode.init),
          Riode.$window.trigger("riode_complete"),
          Riode.refreshSidebar();
      });
  })();
