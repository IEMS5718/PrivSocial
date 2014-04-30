$( document ).ready(function() {

	$("#arr_info").hide();
	$("#sendmsg").hide();
	$('#date1').css('opacity',0);
	$('#date2').css('opacity',0);	
	$('#date3').css('opacity',0);
	$('#date4').css('opacity',0);
	$('#date5').css('opacity',0);
	$('#date6').css('opacity',0);
	$('#date7').css('opacity',0);
	$('#datebutton1').css('opacity',0);
	$('#datebutton2').css('opacity',0);
	$('#datebutton3').css('opacity',0);
	$('#datebutton4').css('opacity',0);
	$('#datebutton5').css('opacity',0);
	$('#datebutton6').css('opacity',0);
	$('#datebutton7').css('opacity',0);	

	
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
	var monthnum=date.getMonth();
    var showmonth = month[monthnum];
    $('#month').html(showmonth);
	var showdate_plus=new Array();
	showdate_plus[0]=showdate;
	showdate_plus[1]=showdate+1;
	showdate_plus[2]=showdate+2;
	showdate_plus[3]=showdate+3;
	showdate_plus[4]=showdate+4;
	showdate_plus[5]=showdate+5;
	showdate_plus[6]=showdate+6;
	//上半年偶数月和下半年奇数月均为30天，注意这里monthnum为数组序号
	for(i=0;i<7;i++){
		if(showdate_plus[i]>30){
			if((monthnum < 7 && monthnum % 2 != 0) || (monthnum>=7 && monthnum % 2 ==0) ){		
				showmonth=month[monthnum+1];
				showdate_plus[i] = showdate_plus[i] % 30;
			}
		//其他为31天的月份
			else{
				showmonth=month[monthnum+1];
				showdate_plus[i] = showdate_plus[i] % 31;
				}
		}
		//显示时间
		var datestring = "#date" + (i+1);
		$(datestring).html(showdate_plus[i]+ ',' + showmonth + ' ' + showyear);
	}
	//设置头像
	document.getElementById("user_info_head_img").src="/getimage";
	
   	$.post('/userapi',{},
          function(data){
          	
             var obj = jQuery.parseJSON(data);
             currentevents = obj.UnReadInvitCount;
             $("#current").html('Current invites: ' + currentevents);
             $("#user_info_name").html(obj.NickName + ' ( mailbox )' );
             //*VERY IMPORTANT : alert(obj['activities'][1].ActTime);
			 //显示对应天数的按钮
				var i=0;
				for(i;i<(obj['activities'].length);i++){
					
					var date = obj['activities'][i].ActTime;
					var spdate = new Array();
					spdate = date.split(" "); //先分割时间和日期
					strdate = spdate[0].split("-")[1];		//得到日期string
					intdate = parseInt(strdate);
					var nowDate = new Date();
					nowDate.setHours(0); 
					nowDate.setMinutes(0); 
					nowDate.setSeconds(0); 
					var nowTimeSecond = nowDate.getTime()/1000;
					
					var actTimeSecond = (new Date(date)).getTime()/1000;
					
					
					
					if(obj['activities'][i].ActFlag == 1){
					if((nowTimeSecond < actTimeSecond) && (nowTimeSecond+3600*24 > actTimeSecond) ){
							$('#date1').css('opacity',1);
							$('#datebutton1').css('opacity',1);
							//$('#datebutton1').attr('id', intdate);
							$('#datebutton1').data("actData",obj['activities'][i]);
						

														
						}
					if((nowTimeSecond+3600*24 < actTimeSecond) && (nowTimeSecond+3600*24*2 > actTimeSecond)){
							$('#date2').css('opacity',1);
							$('#datebutton2').css('opacity',1);
							//$('#datebutton2').attr('id', intdate);
							$('#datebutton2').data("actData",obj['activities'][i]);
							
						}					
					if((nowTimeSecond+3600*24*2 < actTimeSecond) && (nowTimeSecond+3600*24*3 > actTimeSecond)){
							$('#date3').css('opacity',1);
							$('#datebutton3').css('opacity',1);
							//$('#datebutton3').attr('id', intdate);
							$('#datebutton3').data("actData",obj['activities'][i]);

						}
					if((nowTimeSecond+3600*24*3 < actTimeSecond) && (nowTimeSecond+3600*24*4 > actTimeSecond)){
							$('#date4').css('opacity',1);
							$('#datebutton4').css('opacity',1);
							//$('#datebutton4').attr('id', intdate);
							$('#datebutton4').data("actData",obj['activities'][i]);

						}
					if((nowTimeSecond+3600*24*4 < actTimeSecond) && (nowTimeSecond+3600*24*5 > actTimeSecond)){
							$('#date5').css('opacity',1);
							$('#datebutton5').css('opacity',1);
							//$('#datebutton5').attr('id', intdate);	
							$('#datebutton5').data("actData",obj['activities'][i]);					
						}
					if((nowTimeSecond+3600*24*5 < actTimeSecond) && (nowTimeSecond+3600*24*6 > actTimeSecond)){

							$('#date6').css('opacity',1);
							$('#datebutton6').css('opacity',1);
							//$('#datebutton6').attr('id', intdate);	
							$('#datebutton6').data("actData",obj['activities'][i]);						
						}
						
					if((nowTimeSecond+3600*24*6 < actTimeSecond) && (nowTimeSecond+3600*24*7 > actTimeSecond)){
							$('#date7').css('opacity',1);
							$('#datebutton7').css('opacity',1);
							//$('#datebutton7').attr('id', intdate);
							$('#datebutton7').data("actData",obj['activities'][i]);
						}
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
		buttonid = this.id;
		
		var $this = $(this);
		var actData = $this.data("actData");
			var actTime = actData.ActTime;
			var actTimeDate = actTime.split(" ")[0];
			$('#invite_name_time').html("Inviter ID: "+ actData.InviterID +"<br />" +"Invite Time:" + actTimeDate);
			$('#invite_address').html(actData.InviterEmail);	
			$('#invite_info').html(actData.ActContent);	
	/*	$.post('/userapi',{},
          function(data){
          	alert(data);
			  	var obj = jQuery.parseJSON(data);
				for(var i=0;i<(obj['activities'].length);i++){	
					var date = obj['activities'][i].ActTime;
					var spdate = new Array();
					spdate = date.split(" "); //先分割时间和日期
					strdate = spdate[0].split("-")[1];		//得到日期string
					intdate = parseInt(strdate);
					if(buttonid == intdate){
						$('#invite_name_time').html("Inviter ID: "+ obj['activities'][i].InviterID + " " + obj['activities'][i].ActTime);
						$('#invite_address').html(obj['activities'][i].InviterEmail);	
						$('#invite_info').html(obj['activities'][0].Actcontent);					
					}
				}		  
			  
			  
			  }, 'text'); */
		
		
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
	$('#send').on('click',function(){
	     $.post('/negotiate',{'receiver':$('#receiver').val(),'msgcontent':$('#msgcontent').val()},
        function(data){ 
			$("#sendmsg").fadeOut(800);
			$("#arr_info").css("opacity",1);    
	          },"text");   
	      });

	$('#invite_address').click(function(){
		var invitormail = document.getElementById("invite_address").innerHTML;
		$('#receiver').attr('value', invitormail);		
		});
	
	$('#user_info_name').click(function(){
		window.location.href="/";
		});	
		
		
		// --------------------- handle mail ------------------------
		
		function initMailInfo(){
			$("#mailsd_form").css("display","none");
			$("#mailrcv").css("display","none");
			$("#user_info_name").unbind("click").click(function(){
					
			
		    $.post('/getmailinfo',{"mailinfo":"all"},
          function(data){
          	
 
          	$("#mailrcv").css("display","block");
          	var mailList = data.mails;
          	var $rcv_maillist = $("#rcv_maillist");
          	$rcv_maillist.css("width","90px");
          	$rcv_maillist.empty();
          	$("#rcv_sender").val("");
           
           $("#rcv_mailcontent").val("");
          	
          $rcv_maillist.append('<option value="rcv_mail_1">Select one</option>');
          var unReadCnt = 0;
          	for(var i = 0; i< mailList.length; i++){
          		
          		var mail = mailList[i];
          		var newOption = $("<option></option>");
          		newOption.val(mail.MailID);
          		if(mail.MailFlag == 0){ 
          			newOption.text(mail.MailID + "new!");
          			unReadCnt ++;
          			}
          		else{newOption.text(mail.MailID);}
          		newOption.data("mail",mail);
          		$rcv_maillist.append(newOption);
          		
          		$("#user_info_name span").remove();
          		
          		$("#user_info_name").append('<span style="color:#737373"> newmsg: '+unReadCnt+'</span>');
          		
          		
          	}
          	
          	
          	
          	
          	
          },"json");
          
       $("#rcv_maillist").unbind("change").change(function(){
       	
           var mailId = $(this).val();
           var curOption = $("#rcv_maillist option[value="+mailId+"]");
           var mail = curOption.data("mail");
           $("#rcv_sender").val(mail.PosterEmail);
           
           $("#rcv_mailcontent").val(mail.MailContent);
           
       	});
       	
       	$("#rcv_cancel").unbind("click").click(function(){
       		$("#mailrcv").css("display","none");
       		
       		});
       		
       		
       	$("#rcv_reply").unbind("click").click(function(){
       		
       		$("#mailsd_form").css("display","block");
       		$("#sd_receiver").val( $("#rcv_sender").val());
       		
       		
       		
       		});
       		
       		$("#sd_cancel").unbind("click").click(function(){
       			$("#mailsd_form").css("display","none");
       			
       			});
       	
       	$("#sd_submit").unbind("click").click(function(){
       		
       		
       		$.post('/negotiate',{'receiver':$("#sd_receiver").val(),'msgcontent':$('#sd_mailcontent').val()},
        function(data){ 
			$("#mailsd_form").fadeOut(800);
		return false;
       		
       		});
       			
       			return false; 
				
				
				
				
				});
		
		});
		
			
			
			
		}
		
		initMailInfo();
		
	
		
		// --- end of handle mail --------------
});