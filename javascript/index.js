$( document ).ready(function() {

  $("#arr_info_1").hide();
  $("#arr_info_2").hide();
  $("#arr_info_3").hide();
  $("#arr_info_4").hide();
  $("#arr_info_5").hide();
  $("#arr_info_6").hide();
  $("#postform").hide();
  
 // $('#user_info_name').load("");                          //""里输入服务器地址,下同
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

  var currentevents = 5;  
  $("#current").html('Current invites: ' + currentevents);
  
  if (currentevents > 0) {
    $("#arr_info_1").show();
    currentevents = currentevents - 1; 
    $("#accept1").click(function(){
      $.ajax("",                                 //""里输入服务器地址,下同
        { type:'POST',
          data: {html:1} 
	  }).done(function (data) {
        $("#arr_info_1").hide();
      })
    });
  
    $("#reject1").click(function(){
      $.ajax("",                                 //""里输入服务器地址,下同
        { type:'POST',
          data: {html:-1} 
	  }).done(function (data) {
        $("#arr_info_1").hide();
      })
    });
  
    $("#ignore1").click(function(){
      $.ajax("",                                  //""里输入服务器地址,下同
        { type:'POST',
          data: {html:-2} 
	  }).done(function (data) {
        $("#arr_info_1").hide();
      })
    });
    
	if (currentevents > 0) {
      $("#arr_info_2").show();
      currentevents = currentevents - 1; 
      $("#accept2").click(function(){
        $.ajax("",                                 //""里输入服务器地址,下同
          { type:'POST',
            data: {html:1} 
	    }).done(function (data) {
          $("#arr_info_2").hide();
        })
      });
  
      $("#reject2").click(function(){
        $.ajax("",                                 //""里输入服务器地址,下同
          { type:'POST',
            data: {html:-1} 
	    }).done(function (data) {
          $("#arr_info_2").hide();
        })
      });
  
      $("#ignore2").click(function(){
        $.ajax("",                                  //""里输入服务器地址,下同
          { type:'POST',
            data: {html:-2} 
	    }).done(function (data) {
          $("#arr_info_2").hide();
        })
      });
	  
	  if (currentevents > 0) {
        $("#arr_info_3").show();
        currentevents = currentevents - 1; 
        $("#accept3").click(function(){
          $.ajax("",                                 //""里输入服务器地址,下同
            { type:'POST',
              data: {html:1} 
	      }).done(function (data) {
            $("#arr_info_3").hide();
          })
        });
 
        $("#reject3").click(function(){
          $.ajax("",                                 //""里输入服务器地址,下同
            { type:'POST',
              data: {html:-1} 
	      }).done(function (data) {
            $("#arr_info_3").hide();
          })
        });
  
        $("#ignore3").click(function(){
          $.ajax("",                                  //""里输入服务器地址,下同
            { type:'POST',
              data: {html:-2} 
	      }).done(function (data) {
            $("#arr_info_3").hide();
          })
        });
	  
	    if (currentevents > 0) {
          $("#arr_info_4").show();
          currentevents = currentevents - 1; 
          $("#accept4").click(function(){
            $.ajax("",                                 //""里输入服务器地址,下同
              { type:'POST',
                data: {html:1} 
	        }).done(function (data) {
              $("#arr_info_4").hide();
            })
          });
 
          $("#reject4").click(function(){
            $.ajax("",                                 //""里输入服务器地址,下同
              { type:'POST',
                data: {html:-1} 
	        }).done(function (data) {
              $("#arr_info_4").hide();
            })
          });
  
          $("#ignore4").click(function(){
            $.ajax("",                                  //""里输入服务器地址,下同
              { type:'POST',
                data: {html:-2} 
	        }).done(function (data) {
              $("#arr_info_4").hide();
            })
          });
		  
		  if (currentevents > 0) {
            $("#arr_info_5").show();
            currentevents = currentevents - 1; 
            $("#accept5").click(function(){
              $.ajax("",                                 //""里输入服务器地址,下同
                { type:'POST',
                  data: {html:1} 
	          }).done(function (data) {
                $("#arr_info_5").hide();
              })
            });
 
            $("#reject5").click(function(){
              $.ajax("",                                 //""里输入服务器地址,下同
                { type:'POST',
                  data: {html:-1} 
	          }).done(function (data) {
                $("#arr_info_5").hide();
              })
            });
  
            $("#ignore5").click(function(){
              $.ajax("",                                  //""里输入服务器地址,下同
                { type:'POST',
                  data: {html:-2} 
	          }).done(function (data) {
                $("#arr_info_5").hide();
              })
            });
		  
	      } 
	    }
	  }
	}
  }

//function of postbutton
  $("#postbutton").click(function(){
  	$("#postform").show();
  	wp=document.getElementById('Wrapper');
	wp.style.opacity=0.3;
  });

  $("#close").click(function(){
  	$("#postform").hide();
  	wp=document.getElementById('Wrapper');
	wp.style.opacity=1;
  });
});