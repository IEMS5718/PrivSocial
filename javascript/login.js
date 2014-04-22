$( document ).ready(function() { 

	$("#signinwindow").hide();
	
	 $("#signup").click(function(){            
	   var un = $('#username').val();
	   var pw = $('#password').val();
	   if(un=="" || pw==""){
	     alert("I can't find the username or password");
	   } 
     }); 
	 
	 $("#login").click(function(){             //登录
	   var un = $('#username').val();
	   var pw = $('#password').val();
	   if(un=="" || pw==""){
	     alert("I can't find the username or password");
	   } 
	 });

//Sign in弹出窗口效果和关闭效果
  $("#signin").click(function(){
  $("#signinwindow").fadeIn(800);
  document.getElementById('center').style.opacity=0.3;
  document.getElementById('logindiv').style.opacity=0.3;

  });
  
  $("#cancel").click(function(){
  $("#signinwindow").fadeOut(800);
  document.getElementById('center').style.opacity=1;
  document.getElementById('logindiv').style.opacity=1;

  });
});