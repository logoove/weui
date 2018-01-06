<?php
/**
* 分页1,点击加载更多
*/
include "db.php";


$pindex = max(1, intval($_GET['page']));
$psize =10;
$list = pdo_fetchall("SELECT *  FROM ".tablename('yoby_demo') ." WHERE 1  ORDER BY id asc LIMIT ".($pindex - 1) * $psize.','.$psize);
$arr = ["list"=>$list];
	echo json_encode($arr);	


?>