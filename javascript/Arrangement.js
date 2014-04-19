$( document ).ready(function() {
	$("#arr_info").hide();
	$("#sendmsg").hide();
	$(".datebutton").hide();
	$("#dates").hide();
	//先隐藏各部件
	
	//注意，这里只需要显示有活动安排的那一天对应的按钮，显示过程均为fadeIn，这部分需要和服务器通信，所以留给Peel写。
	//现在为了测试方便，全部按钮都显示出来
	$(".datebutton").fadeIn(1000);
	$("#dates").fadeIn(1000);
	
	$(".datebutton").click(function(){
		$("#arr_info").fadeIn(800);
	
	
	});//点一下圆按钮出现框框
	$("#close_arr_info").click(function(){
		$("#arr_info").fadeOut(800);
	
	
	});//点一下框框，框框消失
	
	$("#negotiate").click(function(){		
		$("#sendmsg").fadeIn(800);
		$("#arr_info").css("opacity",0.5);
	
	});//如果点的是negotiate，那么框框保留，并且弹出消息发送框
	
	$("#close").click(function(){		
		$("#sendmsg").fadeOut(800);
		$("#arr_info").css("opacity",1);
	
	});//点击close，发送框关闭
});