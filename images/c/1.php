<?php
function dump($arr){
	echo '<pre>'.print_r($arr,TRUE).'</pre>';
}
/*
$data = $_POST['base64'];
preg_match("/data:image\/(.*);base64,/",$data,$res);
$ext = $res[1];
if(!in_array($ext,array("jpg","jpeg","png","gif"))){
	echo json_encode(array("error"=>1));die;
}
$file=time().'.'.$ext;
$data = preg_replace("/data:image\/(.*);base64,/","",$data);
$path = getcwd();

if (file_put_contents($path."/images2/".$file,base64_decode($data))===false) {
	echo json_encode(array("error"=>1));
}else{
	echo json_encode(array('src'=>'http://'.$_SERVER['HTTP_HOST']."/weui/c/images2/".$file,'size'=>$_POST['size'],"error"=>0));
}
*/
$path = dirname(__FILE__)."/images2/";
$file=time().$_FILES['file']['name'];
if(move_uploaded_file($_FILES["file"]["tmp_name"],$path.$file)){
echo json_encode(array('src'=>'http://'.$_SERVER['HTTP_HOST']."/weui/c/images2/".$file,'size'=>$_FILES["file"]['size'],"error"=>0));
}else{
echo json_encode(array("error"=>1));
}