<?php
/**
 * Created by PhpStorm.
 * User: yoby
 * Date: 2018/10/1
 * Time: 0:12
 */
$do = $_GET['do'];
if($do=='1'){
    $arr = [
        'code'=>200,
        'data'=>[
            'name'=>$_GET['name']
        ]
    ]  ;

}elseif($do=='2'){
    $json = json_decode(file_get_contents("php://input"),1);
    $arr = [
        'code'=>200,
        'data'=>[
            'name'=>$json['name']
        ]
    ]  ;
}  elseif($do=='3'){
    $json = json_decode(file_get_contents("php://input"),1);
    $arr = [
        'code'=>200,
        'data'=>[
            'name'=>$json['name']
        ]
    ]  ;
}

exit(json_encode($arr));