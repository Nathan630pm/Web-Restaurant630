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


// SIGNUP:

// firebase.auth().createUserWithEmailAndPassword($("#formEmail").val(), $("#formPw").val())
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     alert("Error " + errorCode + ":\n" + errorMessage);
//     // ..
//   });

$(document).ready(function() {

  var db = firebase.firestore();

  var userObj;

  if ('user-obj' in localStorage) {
    var incomingData = localStorage.getItem("user-obj");

    userObj = JSON.parse(incomingData);
    if (userObj != null && userObj.loggedIn == true) {
      $(".loggedin").show();
      $(".loggedout").hide();
      window.location.replace("index.html");
    }
  }


  var userObj = {
    id: "",
    name: "",
    email: "",
    number: "",
    docId: "",
    loggedIn: false
  }





  $('#submit').on("click", function() {

    $("#formSuccess").hide();
    $("#formError").hide();


    console.log("logging in");
    firebase.auth().signInWithEmailAndPassword($("#formEmail").val(), $("#formPw").val())
      .then((userCredential) => {



        // Signed in
        var user = userCredential.user;
        userObj.id = user;
        userObj.email = $("#formEmail").val();
        userObj.loggedIn = true;
        continueSignin();


        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        $("#formError").show();
        $("#errorMessage").html("Error " + errorCode + ":\n" + errorMessage);
        // alert("Error " + errorCode + ":\n" + errorMessage);
      });




  })


  function continueSignin() {

    console.log("continuing");
    db.collection("Parking").where("email", "==", $("#formEmail").val().toLowerCase())
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          $("#formSuccess").show();
          $("#successMessage").html("Successfully logged in. Loading profile, please wait...")
          console.log(doc.data());

          userObj.docId = doc.id;
          userObj.name = doc.data().name;
          userObj.number = doc.data().contactNumber;
          console.log(userObj);

          localStorage.setItem("user-obj", JSON.stringify(userObj));
          window.location.href = "profile.html"

        });
      })
      .catch(err => {
        $("#formError").show();
        $("#errorMessage").html('Error getting documents: ', err);
        console.log('Error getting documents: ', err);
      });
  }

})