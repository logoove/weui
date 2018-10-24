<?php
/**
 * Created by PhpStorm.
 * User: yoby
 * Date: 2018/8/24
 * Time: 23:31
 */
include "db.php";

if(1==$_POST['ajax']) {
    $pindex = max(1, intval($_POST['page']));  //页码
    $psize = $_POST['pagesize']; //每页显示数据
    $list = $db->fetchall("SELECT *  FROM " . $db->tablename('demo') . " WHERE 1=1  ORDER BY id asc LIMIT " . ($pindex - 1) * $psize . ',' . $psize);
    $total = $db->getcolumn('demo', array(), "count(*)");
    $arr = [
        'msg' => '请求成功',
        'code' => 200,
        "list" => $list,
        'total' => $total
    ];
    echo json_encode($arr);
}elseif(2==$_POST['ajax']){
    $pindex = max(1, intval($_POST['page']));
    $psize = $_POST['pagesize'];
    $list =$db->fetchall("SELECT *  FROM ".$db->tablename('demo') ." WHERE 1=1  ORDER BY id asc LIMIT ".($pindex - 1) * $psize.','.$psize);
    $total = $db->getcolumn('demo', array(), "count(*)");
    $arr = [
        'msg' => '请求成功',
        'code' => 200,
        "list" => $list,
        'total' => $total
    ];
    echo json_encode($arr);

    
}