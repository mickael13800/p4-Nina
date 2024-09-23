!(function (s) {
  (s.fn.mauGallery = function (e) {
    var e = s.extend(s.fn.mauGallery.defaults, e),
      l = [];
    return this.each(function () {
      s.fn.mauGallery.methods.createRowWrapper(s(this)),
        e.lightBox &&
          s.fn.mauGallery.methods.createLightBox(
            s(this),
            e.lightboxId,
            e.navigation
          ),
        s.fn.mauGallery.listeners(e),
        s(this)
          .children(".gallery-item")
          .each(function (a) {
            s.fn.mauGallery.methods.responsiveImageItem(s(this)),
              s.fn.mauGallery.methods.moveItemInRowWrapper(s(this)),
              s.fn.mauGallery.methods.wrapItemInColumn(s(this), e.columns);
            var t = s(this).data("gallery-tag");
            e.showTags && void 0 !== t && -1 === l.indexOf(t) && l.push(t);
          }),
        e.showTags &&
          s.fn.mauGallery.methods.showItemTags(s(this), e.tagsPosition, l),
        s(this).fadeIn(500);
    });
  }),
    (s.fn.mauGallery.defaults = {
      columns: 3,
      lightBox: !0,
      lightboxId: null,
      showTags: !0,
      tagsPosition: "bottom",
      navigation: !0,
    }),
    (s.fn.mauGallery.listeners = function (a) {
      s(".gallery-item").on("click", function () {
        a.lightBox &&
          "IMG" === s(this).prop("tagName") &&
          s.fn.mauGallery.methods.openLightBox(s(this), a.lightboxId);
      }),
        s(".gallery").on(
          "click",
          ".nav-link",
          s.fn.mauGallery.methods.filterByTag
        ),
        s(".gallery").on("click", ".mg-prev", () =>
          s.fn.mauGallery.methods.prevImage(a.lightboxId)
        ),
        s(".gallery").on("click", ".mg-next", () =>
          s.fn.mauGallery.methods.nextImage(a.lightboxId)
        );
    }),
    (s.fn.mauGallery.methods = {
      createRowWrapper(a) {
        a.children().first().hasClass("row") ||
          a.append('<div class="gallery-items-row row"></div>');
      },
      wrapItemInColumn(a, t) {
        var e;
        t.constructor === Number
          ? a.wrap(
              `<div class='item-column mb-4 col-${Math.ceil(12 / t)}'></div>`
            )
          : t.constructor === Object
          ? ((e = ""),
            t.xs && (e += " col-" + Math.ceil(12 / t.xs)),
            t.sm && (e += " col-sm-" + Math.ceil(12 / t.sm)),
            t.md && (e += " col-md-" + Math.ceil(12 / t.md)),
            t.lg && (e += " col-lg-" + Math.ceil(12 / t.lg)),
            t.xl && (e += " col-xl-" + Math.ceil(12 / t.xl)),
            a.wrap(`<div class='item-column mb-4${e}'></div>`))
          : console.error(
              `Columns should be defined as numbers or objects. ${typeof t} is not supported.`
            );
      },
      moveItemInRowWrapper(a) {
        a.appendTo(".gallery-items-row");
      },
      responsiveImageItem(a) {
        "IMG" === a.prop("tagName") && a.addClass("img-fluid");
      },
      openLightBox(a, t) {
        s("#" + t)
          .find(".lightboxImage")
          .attr("src", a.attr("src")),
          s("#" + t).modal("toggle");
      },
      prevImage() {
        let t = null,
          a =
            (s("img.gallery-item").each(function () {
              s(this).attr("src") === s(".lightboxImage").attr("src") &&
                (t = s(this));
            }),
            s(".tags-bar span.active-tag").data("images-toggle")),
          e = [],
          l =
            ("all" === a
              ? s(".item-column").each(function () {
                  s(this).children("img").length &&
                    e.push(s(this).children("img"));
                })
              : s(".item-column").each(function () {
                  s(this).children("img").data("gallery-tag") === a &&
                    e.push(s(this).children("img"));
                }),
            0),
          i;
        s(e).each(function (a) {
          s(t).attr("src") === s(this).attr("src") && (l = a);
        }),
          (i = e[l] || e[e.length - 1]),
          s(".lightboxImage").attr("src", s(i).attr("src"));
      },
      nextImage() {
        let t = null,
          a =
            (s("img.gallery-item").each(function () {
              s(this).attr("src") === s(".lightboxImage").attr("src") &&
                (t = s(this));
            }),
            s(".tags-bar span.active-tag").data("images-toggle")),
          e = [],
          l =
            ("all" === a
              ? s(".item-column").each(function () {
                  s(this).children("img").length &&
                    e.push(s(this).children("img"));
                })
              : s(".item-column").each(function () {
                  s(this).children("img").data("gallery-tag") === a &&
                    e.push(s(this).children("img"));
                }),
            0),
          i;
        s(e).each(function (a) {
          s(t).attr("src") === s(this).attr("src") && (l = a);
        }),
          (i = e[l] || e[0]),
          s(".lightboxImage").attr("src", s(i).attr("src"));
      },
      createLightBox(a, t, e) {
        a.append(`<div class="modal fade" id="${
          t || "galleryLightbox"
        }" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${
                              e
                                ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                                : '<span style="display:none;" />'
                            }
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                            ${
                              e
                                ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                                : '<span style="display:none;" />'
                            }
                        </div>
                    </div>
                </div>
            </div>`);
      },
      showItemTags(a, t, e) {
        var l =
            '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>',
          e =
            (s.each(e, function (a, t) {
              l += `<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${t}">${t}</span></li>`;
            }),
            `<ul class="my-4 tags-bar nav nav-pills">${l}</ul>`);
        "bottom" === t
          ? a.append(e)
          : "top" === t
          ? a.prepend(e)
          : console.error("Unknown tags position: " + t);
      },
      filterByTag() {
        var a;
        s(this).hasClass("active-tag") ||
          (s(".active-tag").removeClass("active active-tag"),
          s(this).addClass("active-tag"),
          (a = s(this).data("images-toggle")),
          s(".gallery-item").each(function () {
            s(this).parents(".item-column").hide(),
              ("all" !== a && s(this).data("gallery-tag") !== a) ||
                s(this).parents(".item-column").show(300);
          }));
      },
    });
})(jQuery);
