$( document ).ready(function() { 

	$("#signinwindow").hide();
	
	 $("#signup").click(function(){            //注册
	   var un = $('#username').val();
	   var pw = $('#password').val();
	   if(un=="" || pw==""){
	     alert("I can't find the username or password");
	   } 
	   if(un!="" && pw!="") {
	     var obj = {'username':$('#username').val(), 'password':$('#password').val()}; 
	                                           //数据封装格式
         $.ajax("", {                          //""里加入服务器地址
           type:'POST',
           data: {json: JSON.stringify(obj)},  //数据以Jason形式发出
           dataType: 'json'
         }).done(function (data) {
             console.log('data is',data);
			 alert('注册成功。');
           })
           .fail(function (jqXHR, textStatus) {
             alert("数据没有送出到服务器: " + textStatus);
           });
	    }
     }); 
	 
	 $("#login").click(function(){             //登录
	   var un = $('#username').val();
	   var pw = $('#password').val();
	   if(un=="" || pw==""){
	     alert("I can't find the username or password");
	   } 
	   if(un!="" && pw!="") {
	     var obj = {'username':$('#username').val(), 'password':$('#password').val()}; 
	                                           //数据封装格式	   
	     $.ajax("", {                          //""里加入服务器地址
           type:'POST',
           data: {json: JSON.stringify(obj)},  //数据以Jason形式发出
           dataType: 'json'
         }).done(function (data) {
             //console.log('data is',data);
			 document.location.href="index.html"
			                                   //验证成功之后的页面跳转?!
           })
           .fail(function (jqXHR, textStatus) {
				document.location.href="index.html"
             alert("数据没有送出到服务器: " + textStatus);
           });
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