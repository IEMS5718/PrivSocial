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

  $("#reset").click(function(){
  alert('#nickname');
  $('#nickname').html('');
  });

});