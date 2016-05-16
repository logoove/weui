<?php
function dump($arr){
	echo '<pre>'.print_r($arr,TRUE).'</pre>';
}

$path = dirname(__FILE__)."/images2/";
$file=time().$_FILES['file1']['name'];
if(move_uploaded_file($_FILES["file1"]["tmp_name"],$path.$file)){
echo json_encode(array('src'=>'http://'.$_SERVER['HTTP_HOST']."/weui/c/images2/".$file,'size'=>$_FILES["file1"]['size'],"error"=>0));
}else{
echo json_encode(array("error"=>1));
}
