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

  var db = firebase.firestore();

  var editing = false;
  var userObj;

  if ('user-obj' in localStorage) {
    var incomingData = localStorage.getItem("user-obj");

    userObj = JSON.parse(incomingData);
    if (userObj != null && userObj.loggedIn == true) {
      $(".loggedin").show();
      $(".loggedout").hide();
      $("#profileName").html(userObj.name);
      $("#profileNumber").html(userObj.number);
      $("#profileEmail").html(userObj.email);

      $("#editName").val(userObj.name);
      $("#editNumber").val(userObj.number);
      $("#editEmail").val(userObj.email);


    } else {
      alert("You must be logged in to access your profile.")
      window.location.replace("login.html");
    }
  }

  $("#editProfile").on("click", function() {
    if (editing == false) {
      editing = true;
      $(".editProfile").show();
      $(".info").hide();
      $("#editProfile").html("Save Profile");
    } else if (editing == true) {
      editing = false;
      $(".editProfile").hide();
      $(".info").show();
      $("#editProfile").html("Edit Profile");

      updateProfile();
    }

  })

  function updateObj() {
    userObj.name = $("#editName").val();
    userObj.number = $("#editNumber").val();

    localStorage.setItem("user-obj", JSON.stringify(userObj));
  }

  function getUserPassword() {

    $("#pwCheck").show();

  }

  $("#cpassword").on("click", function() {
    var pw = $("#cpassInput").val();

    updateFirebaseEmail(pw);
  })

  function updateFirebaseEmail(password) {
    $("#pwCheck").hide();
    firebase.auth()
      .signInWithEmailAndPassword(userObj.email, password)
      .then(function(userCredential) {
        userCredential.user.updateEmail($("#editEmail").val())
        userObj.email = $("#editEmail").val();
        localStorage.setItem("user-obj", JSON.stringify(userObj));
        $("#profileEmail").html($("#editEmail").val())
        alert("Updated account email.")
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        alert("Error updating email: ", error);
        $("#editEmail").val($("#profileEmail").html())
      });
  }

  function updateProfile() {

    console.log("updating profile...");
    var profileRef = db.collection("Parking").doc(userObj.docId);
    return profileRef.update({
        name: $("#editName").val(),
        contactNumber: $("#editNumber").val(),
        email: $("#editEmail").val()
      })
      .then(() => {
        if ($("#profileEmail").html() != $("#editEmail").val()) {
          getUserPassword();
        }
        alert("Document successfully updated!");
        $("#profileName").html($("#editName").val());
        $("#profileNumber").html($("#editNumber").val());
        updateObj();


      })
      .catch(function(error) {
        // The document probably doesn't exist.
        alert("Error updating document: ", error);
      });


  }


})