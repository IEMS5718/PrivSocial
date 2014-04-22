$( document ).ready(function() {
	$("#arr_info").hide();
	$("#sendmsg").hide();
	$(".datebutton").hide();
	$("#dates").hide();
	//先隐藏各部件
	
	var date = new Date();
    var showdate = date.getDate();
	var showyear = 1900 + date.getYear();
    $('#day').html(showdate);
    var month=new Array();
    month[0]="January.";
    month[1]="February.";
    month[2]="March.";
    month[3]="April.";
    month[4]="May.";
    month[5]="June.";
    month[6]="July.";
    month[7]="August.";
    month[8]="September.";
    month[9]="October.";
    month[10]="November.";
    month[11]="December.";
    var showmonth = month[date.getMonth()];
    $('#month').html(showmonth);
	$('#date1').html(showdate + ', ' + showmonth + ' ' + showyear);
	$('#date2').html(showdate+1 + ', ' + showmonth + ' ' + showyear);
	$('#date3').html(showdate+2 + ', ' + showmonth + ' ' + showyear);
	$('#date4').html(showdate+3 + ', ' + showmonth + ' ' + showyear);
	$('#date5').html(showdate+4 + ', ' + showmonth + ' ' + showyear);
	$('#date6').html(showdate+5 + ', ' + showmonth + ' ' + showyear);
	$('#date7').html(showdate+6 + ', ' + showmonth + ' ' + showyear);
	
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