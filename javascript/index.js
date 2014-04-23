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
		$('input').click(function(){
			if(currentevents == 0){
				$('#nothing_hint').fadeIn(800);
				}						
			});
	
        if (currentevents > 0 && object['activities'][0].ActFlag == 0) {
            $("#arr_info_1").fadeIn(1000);
            currentevents--;
            $('#arr_invitor1').html('Invitor ID: ' + object['activities'][0].InviterID);
            $('#arr_time1').html(object['activities'][0].ActTime);
            $('#arr_content1').html(object['activities'][0].ActContent);
            $("#accept1").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][0].ActivityID,'Actflag':1},
                       function(data){                           
                           $("#arr_info_1").fadeOut(800);
						  			if(currentevents == 0){
				$('#nothing_hint').fadeIn(800);
				}	 
                       },"text");
            });
            
            $("#reject1").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][0].ActivityID,'Actflag':-1},
                       function(data){
                           
                           $("#arr_info_1").fadeOut(800);
						   location.reload(true);	

                       },"text");
            });
            
            $("#ignore1").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][0].ActivityID,'Actflag':-2},
                       function(data){
                           
                           $("#arr_info_1").fadeOut(800);
								location.reload(true);	
                       },"text");
            });
        }
        
            if (currentevents > 0 && object['activities'][1].ActFlag == 0 ) {
                $("#arr_info_2").fadeIn(1000);
                currentevents = currentevents - 1;
                $('#arr_invitor2').html('Invitor ID: ' + object['activities'][1].InviterID);
                $('#arr_time2').html(object['activities'][1].ActTime);
				  document.getElementById('arr_content2').innerHTML(object['activities'][1].ActContent);
                
             $("#accept2").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][1].ActivityID,'Actflag':1},
                       function(data){
                           
                           $("#arr_info_2").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#reject2").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][1].ActivityID,'Actflag':-1},
                       function(data){
                           
                           $("#arr_info_2").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#ignore2").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][1].ActivityID,'Actflag':-2},
                       function(data){
                           
                           $("#arr_info_2").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            }
        
                if (currentevents > 0 && object['activities'][2].ActFlag == 0) {
                    $("#arr_info_3").fadeIn(1000);
                    $('#arr_invitor3').html('Invitor ID: ' + object['activities'][2].InviterID);
                    $('#arr_time3').html(object['activities'][2].ActTime);
                    $('#arr_content3').html(object['activities'][2].ActContent);
                    currentevents = currentevents - 1;
            $("#accept3").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][2].ActivityID,'Actflag':1},
                       function(data){
                           
                           $("#arr_info_3").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#reject3").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][2].ActivityID,'Actflag':-1},
                       function(data){
                           
                           $("#arr_info_3").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#ignore3").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][2].ActivityID,'Actflag':-2},
                       function(data){
                           
                           $("#arr_info_3").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
                }
                
                    if (currentevents > 0 && object['activities'][3].ActFlag == 0) {
                        $("#arr_info_4").fadeIn(1000);
                        $('#arr_invitor4').html('Invitor ID: ' + object['activities'][3].InviterID);
                        $('#arr_time4').html(object['activities'][3].ActTime);
                        $('#arr_content4').html(object['activities'][3].ActContent);
                        currentevents = currentevents - 1;
            $("#accept4").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][3].ActivityID,'Actflag':1},
                       function(data){
                           
                           $("#arr_info_4").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#reject4").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][3].ActivityID,'Actflag':-1},
                       function(data){
                           
                           $("#arr_info_4").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#ignore4").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][3].ActivityID,'Actflag':-2},
                       function(data){
                           
                           $("#arr_info_4").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
                    }
        
                        if (currentevents > 0 && object['activities'][4].ActFlag == 0) {
                            $("#arr_info_5").fadeIn(1000);
                            $('#arr_invitor5').html('Invitor ID: ' + object['activities'][4].InviterID);
                            $('#arr_time5').html(object['activities'][4].ActTime);
                            $('#arr_content5').html(object['activities'][4].ActContent);
                            currentevents = currentevents - 1;
            $("#accept5").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][4].ActivityID,'Actflag':1},
                       function(data){
                           
                           $("#arr_info_5").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#reject5").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][4].ActivityID,'Actflag':-1},
                       function(data){
                           
                           $("#arr_info_5").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#ignore5").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][4].ActivityID,'Actflag':-2},
                       function(data){
                           
                           $("#arr_info_5").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
                            
                        }
                        
                        if (currentevents > 0 && object['activities'][5].ActFlag == 0) {
                            $("#arr_info_6").fadeIn(1000);
                            $('#arr_invitor6').html('Invitor ID: ' + object['activities'][5].InviterID);
                            $('#arr_time6').html(object['activities'][5].ActTime);
                            $('#arr_content6').html(object['activities'][5].ActContent);
                            currentevents = currentevents - 1; 
            $("#accept6").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][5].ActivityID,'Actflag':1},
                       function(data){
                           
                           $("#arr_info_6").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#reject6").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][5].ActivityID,'Actflag':-1},
                       function(data){
                           
                           $("#arr_info_6").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
            
            $("#ignore6").click(function(){
                $.post('/changeact',{'ActivityID':object['activities'][5].ActivityID,'Actflag':-2},
                       function(data){
                           
                           $("#arr_info_6").fadeOut(800);
						   			location.reload(true);	
                       },"text");
            });
                            
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