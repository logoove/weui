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
}elseif($_POST['ajax']==3){
    $areacode = (int)$_POST['code'];
    $name = $db->getcolumn("city",['code'=>$areacode],'name');
    exit(json_encode(["name"=>$name]));
}elseif($_POST['ajax']==4){
    $z = $_POST['py'];
    $list =$db->fetchall("select code,name,isok from ".$db->tablename('city')." where provincecode>0 and citycode>0 and areacode=0 and pinyin='$z' order by name");
    exit(json_encode(["list"=>$list]));
}elseif($_POST['ajax']==5){
    $kw = $_POST['kw'];
    $list = $db->fetchall("select code,name,isok from ".$db->tablename('city')." where provincecode>0 and citycode>0 and areacode=0 and name like '%$kw%' order by name");
    exit(json_encode(["list"=>$list]));
}
