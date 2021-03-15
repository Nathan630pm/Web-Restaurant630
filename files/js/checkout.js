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

  var userObj;

  if ('user-obj' in localStorage) {
    var incomingData = localStorage.getItem("user-obj");

    userObj = JSON.parse(incomingData);
    if (userObj != null && userObj.loggedIn == true) {
      $(".loggedin").show();
      $(".loggedout").hide();

      $("#formName").val(userObj.)
    }
  }


  // formatting for $$
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


  // is email
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  // get URL parameters
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };


  var items = getUrlParameter('items');
  var subtotal = getUrlParameter('subtotal');

  console.log(items);

  if (items == false || subtotal == false) {
    alert("Something went wrong, returning you to the cart page. Please try again.")
    window.location.href = "cart.html";
  }

  $("#items").html(items);
  $("#cartTab").html("(" + items + ")");
  $("#subTotal").html(formatter.format(subtotal));
  $("#tax").html(formatter.format(subtotal * 0.13));
  $("#total").html(formatter.format(subtotal * 1.13));


  $('#submit').on("click", function() {
    console.log("submit");

    $('.err').html("");

    if ($('#formName').val() == "") {
      $("#formName_err").html("Please fill this field in.");
    }

    if ($('#formPhone').val() == "") {
      $("#phone_err").html("Please fill this field in.");
    }

    if ($('#formCard').val() == "") {
      $("#card_err").html("Please fill this field in.");
    }

    if ($('#formExpMo').val() == "") {
      $("#expMo_err").html("Please fill this field in.");
    }

    if ($('#formExpYe').val() == "") {
      $("#expYe_err").html("Please fill this field in.");
    }

    if ($('#formCvv').val() == "") {
      $("#cvv_err").html("Please fill this field in.");
    }



    if (isEmail($('#formEmail').val())) {
      console.log("true");
    } else {
      console.log("false");
      $("#email_err").html("Not a valid email");
    }

    if ($('#formPhone').val().length < 10 || $('#formPhone').val().length > 10) {
      console.log("true");
      $("#phone_err").html("Not a valid phone numer");
    } else {
      console.log("false");

    }

    if ($('#formCard').val().length < 16 || $('#formCard').val().length > 16) {
      console.log("true");
      $("#phone_err").html("Not a valid card numer");
    } else {
      console.log("false");

    }

    if ($('#formExpMo').val().length < 2 || $('#formExpMo').val().length > 2) {
      console.log("true");
      $("#expMo_err").html("Not a valid expiry month");
    } else {
      console.log("false");

    }

    if ($('#formExpYe').val().length < 2 || $('#formExpYe').val().length > 2) {
      console.log("true");
      $("#expYe_err").html("Not a valid expiry year");
    } else {
      console.log("false");

    }

    if ($('#formCvv').val().length < 3 || $('#formCvv').val().length > 3) {
      console.log("true");
      $("#cvv_err").html("Not a valid cvv");
    } else {
      console.log("false");

    }


    if ($("#formName_err").html() == "" && $("#email_err").html() == "" && $("#phone_err").html() == "" && $("#card_err").html() == "" && $("#expMo_err").html() == "" && $("#expYe_err").html() == "" && $('#cvv_err').html() == "") {

      localStorage.setItem("user-cart", "[]");
      alert("Success! You have purchased these items.");

      window.location.href = "index.html";
    } else {
      console.log("not good");
    }


  });


})