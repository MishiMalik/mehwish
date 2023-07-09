// ==========================grid layout
$(document).ready(function () {
  // init Isotope
  var $grid = $(".grid").isotope({
    itemSelector: ".grid-item",
    percentPosition: true,

    masonry: {
      columnWidth: ".grid-sizer",
    },
  });
  // layout Isotope after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
  });
  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
      var number = $(this).find(".number").text();
      return parseInt(number, 10) > 50;
    },
  };

  // bind filter button click
  $("#filters").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  });

  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
            create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
                and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
        except the current select box: */
    var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
});

// ==========================active nav
$(document).ready(function () {
  $(".filter-btns").click(function (e) {
    $(".filter-btns").removeClass("active-category");
    $(this).addClass("active-category");
  });
});
// ==========================active menu
$(document).ready(function () {
  $(".menu-btn").click(function (e) {
    $(".menu-btn").removeClass("active-menu");
    $(this).addClass("active-menu");
  });
});



// =========================================sidebar active
// $(document).ready(function() {
//     // Function to check if a section is in the viewport
//     function isSectionInView(section) {
//       var viewportTop = $(window).scrollTop();
//       var viewportBottom = viewportTop + $(window).height();
//       var sectionTop = section.offset().top;
//       var sectionBottom = sectionTop + section.outerHeight();
//       return sectionTop <= viewportBottom && sectionBottom >= viewportTop;
//     }
//
//     // Function to handle the scrolling event
//     function handleScroll() {
//       var sections = $('section'); // Get all the sections
//       sections.each(function() {
//         var section = $(this);
//         var sectionId = section.attr('id');
//         var menuItem = $('li a[href="#' + sectionId + '"]');
//         if (isSectionInView(section)) {
//           menuItem.addClass('active-menu');
//         //   if(sectionId == 'contact'){
//         //     $("#portfolio").removeClass("active-menu");
//         //   }
//         } else {
//           menuItem.removeClass('active-menu');
//         }
//       });
//     }
//
//     // Attach the scroll event handler
//     $(window).on('scroll', handleScroll);
//   });

$(document).ready(function() {
  function updateActiveLink() {
    var scrollBottom = $(window).scrollTop() + $(window).height();
    var documentHeight = $(document).height();

    $('section').each(function() {
      var sectionTop = $(this).offset().top;
      var sectionHeight = $(this).outerHeight();
      var sectionId = $(this).attr('id');
      var sidebarLink;

      if ($(this).hasClass('hire-me')) {
        sidebarLink = $('.sidebar a[href="#skills"]');
      } else {
        sidebarLink = $('.sidebar a[href="#' + sectionId + '"]');
      }

      if (scrollBottom >= sectionTop && scrollBottom <= sectionTop + sectionHeight) {
        sidebarLink.addClass('active-menu');
      } else {
        if(!$(this).hasClass("hire-me")) {
          sidebarLink.removeClass('active-menu');
        }
      }
    });

    // Check if scroll bottom reaches the end of the page
    if (scrollBottom >= documentHeight) {
      $('.sidebar a[href="#' + 'contact' + '"]').addClass('active-menu');
    }
  }

  updateActiveLink();

  $(window).on("scroll", function () {
    updateActiveLink()
  })
});