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
               $("#user_info_name").html(obj.NickName + ' (' + obj.UserID + ')' );
               //*VERY IMPORTANT : alert(obj['activities'][1].ActTime);
               $("#email").val(obj.Email);
			    $("#nickname2").val(obj.NickName);
				 $("#sig").val(obj.Signature);
				 $("#tel").val(obj.Tel);
           },"text");
		   
		$.post('/getimage', {},
			function(data){
				alert(data);
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
	  alert('success');       
	  //服务器地址在id=user_profile_form的action=“”里面加
	}  
  });

//2014-04-23 temp pause
});