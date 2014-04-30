$( document ).ready(function() { 

 // $('#user_info_name').load("");                          //""里输入服务器地址,下同
 // $('#user_info').load("");
 // $('#currentevents').load("");
 
  var date = new Date();
  var showdate = date.getDate();
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
  document.getElementById("Headdisplay").src="/getimage";
  document.getElementById("user_info_head_img").src="/getimage";
	$.post('/userapi',{},
           function(data){
               var obj = jQuery.parseJSON(data);
               currentevents = obj.UnReadInvitCount;
               $("#current").html('Current invites: ' + currentevents);
               $("#user_info_name").html(obj.NickName + ' ( mailbox )' );
               //*VERY IMPORTANT : alert(obj['activities'][1].ActTime);
               $("#email").val(obj.Email);
			    $("#nickname2").val(obj.NickName);
				 $("#sig").val(obj.Signature);
				 $("#tel").val(obj.Tel);
           },"text");
		   
		$.post('/getimage', {},
			function(data){
				}, 'text');		   


  $("#reset").click(function(){
    $('#nickname2').value('');
    $('#sig').value('');
    $('#tel').value('');
    $('#email').value('');
  });
  
  $("#update").click(function(){
    var nn = $('#nickname2').val();
	var sn = $('#sig').val();
	var tel = $('#tel').val();
	var em = $('#email').val();
    if(nn=="" && sn=="" && tel=="" && em=="") {
	  alert('Please at least type something');
	}
	else {
	  $("#user_profile_form").submit();     
	  $("#update").attr("value", "Success");      
	  //服务器地址在id=user_profile_form的action=“”里面加
	}  
  });
  
	$('#user_info_name').click(function(){
		window.location.href="/";
		});
//2014-04-23 temp pause








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