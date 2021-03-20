<?php
/*
* 文件名: img.php
* 作者  : Yoby 微信logove email:logove@qq.com
* 日期时间: 2020/4/14  1:40
* 功能  :生成各种大小图片
 *
*/
$arr = explode('x',$_GET['c']);
$file = imagecreate($arr[0],$arr[1]); //先生成图片资源

$color =imagecolorallocate($file,255,255,255);   //白色

$c = imagecolorallocate($file,0,100,255);

imagefill($file,0,0,$c);   //两个数字是颜色填充从哪里开始，0，0代表左上角

header('Content-Type:image/png');         //输出图片格式    //没有这句输出的是字符

imagepng($file);