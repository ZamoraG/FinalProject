$('#login-button').click(function(){
  $('#login-button').fadeOut("slow",function(){
    $("#container").fadeIn();
  });
    $('#register-button').fadeOut("slow");
    $('#register-negocio').fadeOut("slow");
});

$('#register-button').click(function(){
  $('#register-button').fadeOut("slow",function(){
    $("#container2").fadeIn();
  });
  $('#login-button').fadeOut("slow");
  $('#register-negocio').fadeOut("slow");
});

$('#register-negocio').click(function(){
  $('#register-negocio').fadeOut("slow",function(){
    $("#container3").fadeIn();
  });
  $('#login-button').fadeOut("slow");
  $('#register-button').fadeOut("slow");
});

$(".close-btn").click(function(){
  $("#container, #forgotten-container").fadeOut(800, function(){
    $("#login-button").fadeIn(800);
    $("#register-button").fadeIn(800);
    $("#register-negocio").fadeIn(800);
  });
});

$(".close-btn2").click(function(){
  $("#container2, #forgotten-container").fadeOut(800, function(){
    $("#register-button").fadeIn(800);
    $("#login-button").fadeIn(800);
    $("#register-negocio").fadeIn(800);
  });
});

$(".close-btn3").click(function(){
  $("#container3, #forgotten-container").fadeOut(800, function(){
    $("#register-negocio").fadeIn(800);
    $("#login-button").fadeIn(800);
    $("#register-negocio").fadeIn(800);
  });
});

/* Forgotten Password */
$('#forgotten').click(function(){
  $("#container").fadeOut(function(){
    $("#forgotten-container").fadeIn();
  });
});