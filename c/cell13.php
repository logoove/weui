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

<div class="weui_cells_title">到底部自动加载分页</div>        
<div class="weui_cells weui_cells_access" id="rank-list">

</div>
<div class="weui_cells_title hide tcenter" id="more"><div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore-tips">正在加载</span>
        </div></div>
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
function ajaxpage(page){
	    $.ajax({
            type : "GET",
            url : 'page1.php?page='+page,
            dataType : "json",
            beforeSend:function(){
			$("#more").show();
		},
            success : function(rs) {
		    var tplx = document.getElementById('tpl').innerHTML;
			var desc1=tpl(tplx,rs);
			$("#rank-list").append(desc1);
 },
            timeout : 15000
        });
}
var page = 2;
var maxpage =<?php echo $maxpage ?>;//总页数
$(window).scroll(
    function() {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
           if(page<=maxpage) {
           	ajaxpage(page);
           	page++;
           	 if(page==maxpage){
			$("#more").html("没有更多数据了");return false;	
			}
    
    }    
           
           
           
           
           
        }

    });
$(function(){
	
	ajaxpage(1);
})
</script>                
 
</body>
</html>
