<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title></title>
 <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  <link rel="stylesheet" href="../style/weui.css"/>
  <link rel="stylesheet" href="../style/weui2.css"/>
  <link rel="stylesheet" href="../style/weui3.css"/>
      <script src="https://cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
    
      <script>
var tpl=function(a,d){var c=function(l){var j,h=[],g=[];for(j in l){h.push(j);g.push(l[j])}return(new Function(h,c.$)).apply(l,g)};if(!c.$){var f=a.split("<%");c.$="var $=''";for(var b=0;b<f.length;b++){var e=f[b].split("%>");if(b!=0){c.$+="="==e[0].charAt(0)?"+("+e[0].substr(1)+")":";"+e[0].replace(/\r\n/g,"")+"$=$"}c.$+="+'"+e[e.length-1].replace(/\'/g,"\\'").replace(/\r\n/g,"\\n").replace(/\n/g,"\\n").replace(/\r/g,"\\n")+"'"}c.$+=";return $;"}return d?c(d):c};  
      
      </script>
</head>

<body ontouchstart>
<?php
include "db.php";

$total = $db->getcolumn('demo',array(),"count(*)");
$psize =10;
$maxpage = ceil($total/$psize);
?>

<div class="weui_cells_title">到底部点击加载分页</div>        
<div class="weui_cells weui_cells_access" id="rank-list"><a class="weui_cell " href="javascript:;">
                <div class="weui_cell_bd weui_cell_primary">
                    <p class="tcenter">5姓名李白手机18291448888<br>22</p>
                </div>
                
            </a></div>
<div class="weui_cells_title tcenter" id="more"><a href="javascript:;" id="getmore">点击查看更多...</a></div>
<script id="tpl" type="text/html">
<% for(var i in list) {   %>
<a class="weui_cell " href="javascript:;">
                <div class="weui_cell_bd weui_cell_primary">
                    <p class="tcenter"><%=list[i].id%>姓名<%=list[i].title%>手机<%=list[i].phone%><br><%=list[i].fen%></p>
                </div>
                
            </a>
            <% } %>
</script>
<script>
function ajaxpage(page,maxpage){
    $.get('page1.php?page='+page,{},function(rs){
        var tplx = document.getElementById('tpl').innerHTML;
        var desc1=tpl(tplx,rs);
        $("#rank-list").append(desc1);
        if(page==maxpage){
            $("#more").html("没有更多数据了");return false;
        }
    },'json')
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
