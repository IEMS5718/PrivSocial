$( document ).ready(function() {
    
    $("#arr_info_1").hide();
    $("#arr_info_2").hide();
    $("#arr_info_3").hide();
    $("#arr_info_4").hide();
    $("#arr_info_5").hide();
    $("#arr_info_6").hide();
    $("#postform").hide();
	 $('#nothing_hint').hide();
    
    // $('#user_info_name').load("");                          //""¿Ô ‰»Î∑˛ŒÒ∆˜µÿ÷∑,œ¬Õ¨
    // $('#user_info').load("");
    // $('#current').load("");
    
    // $('#mine_name').load("");
    // $('#mine_current_arrange').load("");
    
    // $('arr_invitor').load("");
    // $('arr_time').load("");
    // $('arr_content').load("");
    
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
    document.getElementById("user_info_head_img").src="/getimage";
    
    
    //you need to declare currentevents as Global Variable so that you can change it in the function
    var currentevents;
    //get the data structure from server
    

    $.post('/userapi',{},
           function(data){
           	
               var obj = jQuery.parseJSON(data);
               currentevents = obj.UnReadInvitCount;
               $("#current").html('Current invites: ' + currentevents);
               var currentarr = obj.RejectInvitCount + obj.AcceptInvitCount + obj.IgnoreInvitCount;
               $("#mine_current_arrange").html('Current arrange: ' + currentarr);
               $("#user_info_name").html(obj.NickName + ' (' + obj.UserID + ')' );
               $("#mine_name").html(obj.NickName);
			    $("#arr_content").html('Email: ' + obj.Email);
               $("#arr_tel").html('Tel: ' + obj.Tel);
               //*VERY IMPORTANT : alert(obj['activities'][1].ActTime);             
               display(obj);
           },"text");
    
    //  $.post('/getmailinfo',{'mailinfo':1},
    //        function(data){
    //        
    //        },"text");
    
           
function display(object){
		if(currentevents == 0){
			$('#nothing_hint').fadeIn(800);
			}

//-------------------------------------------------------------------------------- 
//循环显示6个invite内容框
var actcnt = 6;
if(object['activities'].length<6) actcnt=object['activities'].length;
	for(var i=0;i<actcnt;i++){ 
		
		
        if (currentevents > 0 && object['activities'][i].ActFlag == 0) {
			var arrinfostr= "#arr_info_" + (i+1);			
			var arrinvitorstr= "#arr_invitor" + (i+1); 
			var arrtimestr= "#arr_time" + (i+1);
			var arrcontentstr= "#arr_content" + (i+1);
			var acceptstr= "#accept" + (i+1);
			var rejectstr= "#reject" + (i+1);
			var ignorestr= "#ignore" + (i+1);
            $(arrinfostr).fadeIn(1000);
            //currentevents--;
			 //document.getElementById("arr_invotor1").textcontent("Invitor ID:" + object['activities'][i].InviterID);
            $(arrinvitorstr).html("Invitor ID: " + object['activities'][i].InviterID);
            $(arrtimestr).html(object['activities'][i].ActTime);			 
            $(arrcontentstr).html(object['activities'][i].ActContent);
            $(acceptstr).data("ActivityID",object['activities'][i].ActivityID);
           
            
			
            $(acceptstr).unbind("click").click(function(){
				currentevents--;
				var $this = $(this);
				
              $.post('/changeact',{'ActivityID':$(acceptstr).data("ActivityID"),'Actflag':1},
                     function(data){                          
                         $this.parents(".arr_info").fadeOut(800); 
                         
					  },"text");
            });
            
            $(rejectstr).unbind("click").click(function(){
				currentevents--;
				var $this = $(this);
                $.post('/changeact',{'ActivityID':$(acceptstr).data("ActivityID"),'Actflag':-1},
                       function(data){
						   $this.parents(".arr_info").fadeOut(800);		   
                       },"text");
            });
            
            $(ignorestr).unbind("click").click(function(){
				currentevents--;
				var $this = $(this);
                $.post('/changeact',{'ActivityID':$(acceptstr).data("ActivityID"),'Actflag':-2},
                       function(data){                           
                          $this.parents(".arr_info").fadeOut(800);
                       },"text");
            });
        } 
	}
 }
    
    //function of postbutton
    $("#postbutton").click(function(){
        $("#postform").fadeIn(1000);
        wp=document.getElementById('Wrapper');
        wp.style.opacity=0.3;	        
    });
    
    $('#post').on('click',function(){
        $.post('/postact',$('#postform').serialize(),
               function(data){
               	
                   $("#postform").fadeOut(600);
                   wp=document.getElementById('Wrapper');
                   wp.style.opacity=1;
				     location.reload(true);	    				
               },"text");
    });

	$('#user_info_name').click(function(){
		window.location.href="/";
	});
    
    $("#close").click(function(){
        $("#postform").hide();
        wp=document.getElementById('Wrapper');
        wp.style.opacity=1;
    });
    
});