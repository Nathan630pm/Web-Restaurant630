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


  // formatting for $$
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


  var menu;
  var cartMenu = [];
  var userCart = [];
  var amounts = [];

  if ('user-cart' in localStorage) {
    var incomingData = localStorage.getItem("user-cart");

    userCart = JSON.parse(incomingData);
  } else {
    localStorage.setItem("user-cart", JSON.stringify(userCart));
  }

  var l;
  var totalCartItems = 0;
  for (l = 0; l < userCart.length; l++) {
    totalCartItems = totalCartItems + userCart[l].amount;
  }
  $("#cartTab").html("(" + totalCartItems + ")");

  $.getJSON('https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json', function(data) {
    // JSON result in `data` variable
    menu = data;
    console.log(menu);
    if (menu == null) {
      alert("an error occurred.")
    } else {

      var j;
      console.log(userCart);
      for (j = 0; j < menu.length; j++) {
        var k;
        for (k = 0; k < userCart.length; k++) {
          if (userCart[k].id == menu[j].Id.toString()) {
            console.log("found something at pos: " + j);
            cartMenu.push(menu[j]);
            amounts.push(userCart[k].amount)
          }
        }



      }
      var subtotal = 0;
      var total = 0;
      var discounts = 0;
      var message = "";
      var n;
      for (n = 0; n < cartMenu.length; n++) {
        subtotal = subtotal + amounts[n] * cartMenu[n].Price;
        console.log("runnnnn");
      }

      $('#cartSubtotal').html(formatter.format(subtotal));
      if (subtotal > 100) {
        total = subtotal - (subtotal * 0.30);
        discounts = subtotal * 0.30;
        message = "(Order is over $100: 30% off!)"
      } else if (subtotal >= 80) {
        total = subtotal - (subtotal * 0.20)
        discounts = subtotal * 0.20;
        message = "(Order is over $80: 20% off!)"
      } else if (subtotal < 90) {
        total = subtotal - (subtotal * 0.05)
        discounts = subtotal * 0.05;
        message = "(Order is under $80: 5% off!)"
      }
      $('#cartDiscount').html("" + formatter.format(discounts) + " " + message);
      $('#cartTax').html(formatter.format(total * 0.13));
      $('#cartTotal').html(formatter.format(total));
      $('#cartTotalTax').html(formatter.format(total * 1.13));

      if (cartMenu.length == 0) {
        $('#totals').hide();
        $('#no-items').show();
      }



      pushToScreen();




    }
  });

  function pushToScreen() {
    var i;
    var item = [];
    for (i = 0; i < cartMenu.length; i++) {

      item.push('<div class="item">');
      item.push('<div class="itemMainTitle">')
      item.push('<div class = "itemTitle"> ' + cartMenu[i].Title + ' </div>');
      item.push('</div>')
      item.push('<div class="itemContent">');
      item.push('<div class = "itemImage">' + '<img src = "' + cartMenu[i].Image + '"/>' + '</div>');
      item.push('<div class = "itemPrice">Amount: ' + amounts[i] + ' @ $' + cartMenu[i].Price + ' ($' + amounts[i] * cartMenu[i].Price + ')</div>');
      item.push('<div class = "itemAvail">Availablility: ' + cartMenu[i].Available + '</div>');
      item.push('<div class = "itemCategory">Category: ' + cartMenu[i].Category + '</div>');
      item.push('</div>');
      item.push('<div class="itemButton">')
      item.push('<button type="button" class="orderButton" id="' + cartMenu[i].Id + '" name="button">Add To Cart</button>')
      item.push('</div>')
      item.push('</div>');

    }

    $('#menu').html("");
    $("#menu").append(item.join(''));

  }









});