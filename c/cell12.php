<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title></title>
 <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  <link rel="stylesheet" href="../style/weui.css"/>
  <link rel="stylesheet" href="../style/weui2.css"/>
  <link rel="stylesheet" href="../style/weui3.css"/>
      <script src="../zepto.min.js"></script>
      <script>
  $(function(){

	  
	  });    
      
      </script>
</head>

<body ontouchstart>
<?php
include "db.php";

$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('yoby_demo') ."");
$psize =10;
$maxpage = ceil($total/$psize);
?>

<div class="weui_cells_title">到底部点击加载分页</div>        
<div class="weui_cells weui_cells_access" id="rank-list"></div>
<div class="weui_cells_title tcenter" id="more"><a href="javascript:;" id="getmore">点击查看更多...</a></div>
<script id="tpl" type="text/html">
<% for(var i in list) {   %>
<a class="weui_cell " href="javascript:;">
                <div class="weui_cell_bd weui_cell_primary">
                    <p><%=list[i].id%>姓名<%=list[i].title%>手机<%=list[i].phone%><br><%=list[i].fen%></p>
                </div>
                
            </a>
            <% } %>
</script>
<script>
function ajaxpage(page,maxpage){
	  $.ajax({
            type : "GET",
            url : 'page1.php?page='+page,
            dataType : "json",
            success : function(rs) {
               
                	var tplx = document.getElementById('tpl').innerHTML;
			var desc1=tpl(tplx,rs);
			$("#rank-list").append(desc1);
                  if(page==maxpage){
			$("#more").html("没有更多数据了");return false;	
			}
                   
               
               
            },
            timeout : 15000
        });
}
$(function(){
	
var page = 2;
var maxpage =<?php echo $maxpage ?>;//总页数

$('#getmore').on('click', function() {
    if(page<=maxpage) {
      ajaxpage(page,maxpage);
      page++;
				}
});	
	
ajaxpage(1,maxpage);	
})
</script>                
 
</body>
</html>
