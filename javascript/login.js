$( document ).ready(function() { 

	 $("#signup").click(function(){            //注册
	   var un = $('#username').val();
	   var pw = $('#password').val();
	   if(un==""){
	     alert('请输入用户名');
	   } 
	   if(pw==""){
	     alert('请输入密码');
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
	   if(un==""){
	     alert('请输入用户名');
	   } 
	   if(pw==""){
	     alert('请输入密码');
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
			                                   //验证成功之后的页面跳转?!
           })
           .fail(function (jqXHR, textStatus) {
             alert("数据没有送出到服务器: " + textStatus);
           });
	    }
	 });

});