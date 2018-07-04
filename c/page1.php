<?php
/**
* 分页1,点击加载更多
*/
include "db.php";


$pindex = max(1, intval($_GET['page']));
$psize =10;
$list =$db->fetchall("SELECT *  FROM ".$db->tablename('demo') ." WHERE 1  ORDER BY id asc LIMIT ".($pindex - 1) * $psize.','.$psize);
$arr = ["list"=>$list];
	echo json_encode($arr);	


?>