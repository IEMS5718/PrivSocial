$( document ).ready(function() { 

	$("#signinwindow").hide();
	
	
	 $("#send").click(function(){            
	   var email = $('#email').val();
	   var fp = $('#firstpassword').val();
	   var rp = $('#repassword').val();
	   if(email=="" || fp=="" || fp!=rp ){
	     document.location="/Error.html";
	   }
	   else{
		   $("#user_profile_form").submit();					   
		 } 
     }); 

	 $("#login").click(function(){             //登录
	   var un = $('#username').val();
	   var pw = $('#password').val();
	   if(un=="" || pw==""){
	     document.location="/Error.html";
	   }
	   else{
			$("#loginform").submit();
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