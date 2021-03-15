// --=--=--=--=--=--=
// NAVIGATION FUNCTIONS
// --=--=--=--=--=--=

// Start Nav Responsive Function

function toggleMenu() {
  if ($(window).width() <= 935) {
    var nav = document.getElementById("navBar");
    if (nav.className === "nav") {
      nav.className += " responsive";
      $('body').css('overflow', 'hidden');
      $('#portfolioSecondNav').hide()
      $(".nav").addClass("navScroll");
    } else {
      nav.className = "nav";
      $('body').css('overflow', 'auto');
      $('#portfolioSecondNav').show()
      if ($('#nav').hasClass("navScroll")) {
        $(".nav").removeClass("navScroll");
      }
    }
  }
}

// End Nav Responsive Function


// Start Nav Href Function

$(document).ready(function() {

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };


  var submit = getUrlParameter('submit');

  if (submit == "true") {
    $("#formSuccess").show();
  }

  $(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });

  // End Nav Href Function

  // Start Nav Scroll Function

  (function($) {
    $(window).scroll(function() {
      if ($(window).scrollTop() > 0) $(".nav").addClass("navScroll");
      else {
        var nav = document.getElementById("navBar");
        if ($('#nav').hasClass("navScroll")) {
          $(".nav").removeClass("navScroll");
        }
        nav.className = "nav";
      }
    });
  }(jQuery))


})
// End Nav Scroll Function


// Main Site Functions

$(document).ready(function() {
  var menu;

  $.getJSON('https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json', function(data) {
    // JSON result in `data` variable
    menu = data;
    console.log(menu);
    if (menu == null) {
      alert("an error occurred.")
    } else {



      pushToScreen();



    }
  });



  $('#low-high').on('click', function() {

    if (menu == null) {
      alert("an error occurred.")
    } else {
      menu.sort(function(a, b) {
        return a.Price - b.Price
      })



      pushToScreen();



    }

  });

  $('#high-low').on('click', function() {

    if (menu == null) {
      alert("an error occurred.")
    } else {
      menu.sort(function(a, b) {
        return b.Price - a.Price
      })


      pushToScreen();



    }

  });

  $('#ava-low-high').on('click', function() {

    if (menu == null) {
      alert("an error occurred.")
    } else {
      menu.sort(function(a, b) {
        return a.Available - b.Available
      })



      pushToScreen();


    }

  });


  $('#ava-high-low').on('click', function() {

    if (menu == null) {
      alert("an error occurred.")
    } else {
      menu.sort(function(a, b) {
        return b.Available - a.Available
      })


      pushToScreen();

    }

  });


  $('#A-Z').on('click', function() {

    if (menu == null) {
      alert("an error occurred.")
    } else {
      menu.sort(function(a, b) {
        var nameA = a.Title.toLowerCase()
        var nameB = b.Title.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return -1
        if (nameA > nameB)
          return 1
        return 0 //default return value (no sorting)
      })


      pushToScreen();


    }

  });


  $('#Z-A').on('click', function() {

    if (menu == null) {
      alert("an error occurred.")
    } else {
      menu.sort(function(a, b) {
        var nameA = a.Title.toLowerCase()
        var nameB = b.Title.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return 1
        if (nameA > nameB)
          return -1
        return 0 //default return value (no sorting)
      })

      pushToScreen();

    }

  });


  function pushToScreen() {
    var i;
    var item = [];
    for (i = 0; i < menu.length; i++) {

      item.push('<div class="item">');
      item.push('<div class="itemMainTitle">')
      item.push('<div class = "itemTitle"> ' + menu[i].Title + ' </div>');
      item.push('</div>')
      item.push('<div class="itemContent">');
      item.push('<div class = "itemImage">' + '<img src = "' + menu[i].Image + '"/>' + '</div>');
      item.push('<div class = "itemPrice">$' + menu[i].Price + '</div>');
      item.push('<div class = "itemDesc">' + menu[i].Description + '</div>');
      item.push('<div class = "itemRating">Rating: ' + menu[i].Ratings + '/5</div>');
      item.push('<div class = "itemAvail">Availablility: ' + menu[i].Available + '</div>');
      item.push('<div class = "itemCategory">Category: ' + menu[i].Category + '</div>');
      item.push('</div>');
      item.push('<div class="itemButton">')
      item.push('<button type="button" class="orderButton" id="' + menu[i].Id + '" name="button">Add To Cart</button>')
      item.push('</div>')
      item.push('</div>');

    }

    $('#menu').html("");
    $("#menu").append(item.join(''));
  }


})