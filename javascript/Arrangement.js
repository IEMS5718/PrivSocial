$( document ).ready(function() {
	$("#arr_info").hide();
	$("#sendmsg").hide();
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
	
   	$.post('/userapi',{},
          function(data){
             var obj = jQuery.parseJSON(data);
             currentevents = obj.UnReadInvitCount;
             $("#current").html('Current invites: ' + currentevents);
             $("#user_info_name").html(obj.NickName + ' (' + obj.UserID + ')' );
             //*VERY IMPORTANT : alert(obj['activities'][1].ActTime);
			 //显示对应天数的按钮
				var i=0;
				for(i;i<(obj['activities'].length);i++){
					var date = obj['activities'][i].ActTime;
					var spdate = new Array();
					spdate = date.split(" "); //先分割时间和日期
					strdate = spdate[0].split("-")[1];		//得到日期string
					intdate = parseInt(strdate);
					if(intdate == showdate){
							$('#date1').fadeIn(1000);
							$('#date2').css('opacity',0);
							$('#date3').css('opacity',0);
							$('#date4').css('opacity',0);
							$('#date5').css('opacity',0);
							$('#date6').css('opacity',0);
							$('#date7').css('opacity',0);
							$('#datebutton1').fadeIn(1000);
							$('#datebutton1').attr('id', intdate);
							$('#datebutton2').css('opacity',0);
							$('#datebutton3').css('opacity',0);
							$('#datebutton4').css('opacity',0);
							$('#datebutton5').css('opacity',0);
							$('#datebutton6').css('opacity',0);
							$('#datebutton7').css('opacity',0);
							$('#invite_name_time').html("Inviter ID: "+ obj['activities'][0%obj['activities'].length].InviterID + obj['activities'][0].ActTime);
							$('#invite_address').html(obj['activities'][0%obj['activities'].length].InviterEmail);
							$('#invite_info').html(obj['activities'][0%obj['activities'].length].Actcontent);
														
						}
					if(intdate == showdate+1){
							$('#date1').css('opacity',0);
							$('#date2').fadeIn(1000);
							$('#date3').css('opacity',0);
							$('#date4').css('opacity',0);
							$('#date5').css('opacity',0);
							$('#date6').css('opacity',0);
							$('#date7').css('opacity',0);
							$('#datebutton1').css('opacity',0);
							$('#datebutton2').fadeIn(1000);
							$('#datebutton2').attr('id', intdate);
							$('#datebutton3').css('opacity',0);
							$('#datebutton4').css('opacity',0);
							$('#datebutton5').css('opacity',0);
							$('#datebutton6').css('opacity',0);
							$('#datebutton7').css('opacity',0);
							$('#invite_name_time').html("Inviter ID: "+ obj['activities'][1%obj['activities'].length].InviterID + obj['activities'][0].ActTime);
							$('#invite_address').html(obj['activities'][1%obj['activities'].length].InviterEmail);
							$('#invite_info').html(obj['activities'][1%obj['activities'].length].Actcontent);								
						}					
					if(intdate == showdate+2){
							$('#date1').css('opacity',0);
							$('#date2').css('opacity',0);
							$('#date3').fadeIn(1000);
							$('#date4').css('opacity',0);
							$('#date5').css('opacity',0);
							$('#date6').css('opacity',0);
							$('#date7').css('opacity',0);
							$('#datebutton1').css('opacity',0);
							$('#datebutton2').css('opacity',0);
							$('#datebutton3').fadeIn(1000);
							$('#datebutton3').attr('id', intdate);
							$('#datebutton4').css('opacity',0);
							$('#datebutton5').css('opacity',0);
							$('#datebutton6').css('opacity',0);
							$('#datebutton7').css('opacity',0);
							$('#invite_name_time').html("Inviter ID: "+ obj['activities'][2%obj['activities'].length].InviterID + obj['activities'][0].ActTime);
							$('#invite_address').html(obj['activities'][2%obj['activities'].length].InviterEmail);
							$('#invite_info').html(obj['activities'][2%obj['activities'].length].Actcontent);	
						}
					if(intdate == showdate+3){
							$('#date1').css('opacity',0);
							$('#date2').css('opacity',0);
							$('#date3').css('opacity',0);
							$('#date4').fadeIn(1000);
							$('#date5').css('opacity',0);
							$('#date6').css('opacity',0);
							$('#date7').css('opacity',0);
							$('#datebutton1').css('opacity',0);
							$('#datebutton2').css('opacity',0);
							$('#datebutton3').css('opacity',0);
							$('#datebutton4').fadeIn(1000);
							$('#datebutton4').attr('id', intdate);
							$('#datebutton5').css('opacity',0);
							$('#datebutton6').css('opacity',0);
							$('#datebutton7').css('opacity',0);
							$('#invite_name_time').html("Inviter ID: "+ obj['activities'][3%obj['activities'].length].InviterID + obj['activities'][0].ActTime);
							$('#invite_address').html(obj['activities'][3%obj['activities'].length].InviterEmail);
							$('#invite_info').html(obj['activities'][3%obj['activities'].length].Actcontent);	
						}
					if(intdate == showdate+4){
							$('#date1').css('opacity',0);
							$('#date2').css('opacity',0);
							$('#date3').css('opacity',0);
							$('#date4').css('opacity',0);
							$('#date5').fadeIn(1000);
							$('#date6').css('opacity',0);
							$('#date7').css('opacity',0);
							$('#datebutton1').css('opacity',0);
							$('#datebutton2').css('opacity',0);
							$('#datebutton3').css('opacity',0);
							$('#datebutton4').css('opacity',0);
							$('#datebutton5').fadeIn(1000);
							$('#datebutton5').attr('id', intdate);
							$('#datebutton6').css('opacity',0);
							$('#datebutton7').css('opacity',0);
							$('#invite_name_time').html("Inviter ID: "+ obj['activities'][4%obj['activities'].length].InviterID + obj['activities'][0].ActTime);
							$('#invite_address').html(obj['activities'][4%obj['activities'].length].InviterEmail);
							$('#invite_info').html(obj['activities'][4%obj['activities'].length].Actcontent);								
						}
					if(intdate == showdate+5){
							$('#date1').css('opacity',0);
							$('#date2').css('opacity',0);
							$('#date3').css('opacity',0);
							$('#date4').css('opacity',0);
							$('#date5').css('opacity',0);
							$('#date6').fadeIn(1000);
							$('#date7').css('opacity',0);
							$('#datebutton1').css('opacity',0);
							$('#datebutton2').css('opacity',0);
							$('#datebutton3').css('opacity',0);
							$('#datebutton4').css('opacity',0);
							$('#datebutton5').css('opacity',0);
							$('#datebutton6').fadeIn(1000);
							$('#datebutton6').attr('id', intdate);
							$('#datebutton7').css('opacity',0);
							$('#invite_name_time').html("Inviter ID: "+ obj['activities'][5%obj['activities'].length].InviterID + obj['activities'][0].ActTime);
							$('#invite_address').html(obj['activities'][5%obj['activities'].length].InviterEmail);
							$('#invite_info').html(obj['activities'][5%obj['activities'].length].Actcontent);								
						}
						
					if(intdate == showdate+6){
							$('#date1').css('opacity',0);
							$('#date2').css('opacity',0);
							$('#date3').css('opacity',0);
							$('#date4').css('opacity',0);
							$('#date5').css('opacity',0);
							$('#date6').css('opacity',0);
							$('#date7').fadeIn(1000);
							$('#datebutton1').css('opacity',0);
							$('#datebutton2').css('opacity',0);
							$('#datebutton3').css('opacity',0);
							$('#datebutton4').css('opacity',0);
							$('#datebutton5').css('opacity',0);
							$('#datebutton6').css('opacity',0);
							$('#datebutton7').fadeIn(1000);
							$('#datebutton7').attr('id', intdate);
							$('#invite_name_time').html("Inviter ID: "+ obj['activities'][6%obj['activities'].length].InviterID + obj['activities'][0].ActTime);
							$('#invite_address').html(obj['activities'][6%obj['activities'].length].InviterEmail);
							$('#invite_info').html(obj['activities'][6%obj['activities'].length].Actcontent);	
						}								
					}
          },"text");	
		   	
	//注意，这里只需要显示有活动安排的那一天对应的按钮，显示过程均为fadeIn，这部分需要和服务器通信，所以留给Peel写。
	//现在为了测试方便，全部按钮都显示出来
//	$(".datebutton").fadeIn(1000);
//	$("#dates").fadeIn(1000);
	$("#line").fadeIn(800);
	
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

	$('#invite_address').click(function(){
		var invitormail = document.getElementById("invite_address").innerHTML;
		$('#receiver').attr('value', invitormail);		
		});
	
	
});