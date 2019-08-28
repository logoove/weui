<?php
/**
 * Description: PhpStorm.
 * Author: yoby
 * DateTime: 2018/12/5 19:53
 * Email:logove@qq.com
 * Copyright Yoby版权所有
 */
define("APPID","");
define("APPS","");
if (!function_exists('dump')) {
    function dump($arr){
        echo '<pre>'.print_r($arr,TRUE).'</pre>';
    }

}
/*
 * POST或GET的curl请求
 * $url 请求地址
 * $data 请求数组
 * */
function curl($url,$data = ''){
    $ch = curl_init();
    if (class_exists('\CURLFile'))
    {
        curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true);
    }
    else
    {
        if (defined('CURLOPT_SAFE_UPLOAD'))
        {
            curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
        }
    }
    preg_match('/https:\/\//', $url) ? $ssl = TRUE : $ssl = FALSE;
    if ($ssl) {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    }
    curl_setopt($ch, CURLOPT_URL, $url);
    if (!empty($data))
    {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $d = curl_exec($ch);
    curl_close($ch);
    return $d;
}
/*
 * 通过oauth2获取公众号用户信息
 * $type snsapi_userinfo表示用户信息  snsapi_base表示openid获取
 * */
function getoauth2($type='snsapi_base',$appid=APPID,$apps=APPS,$expired = '600')
{
    $scheme = $_SERVER['HTTPS']=='on' ? 'https://' : 'http://';
    $baseUrl = urlencode($scheme.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING']);

        if(!isset($_GET['code']))
        {
            $url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=$appid&redirect_uri=$baseUrl&response_type=code&scope=$type#wechat_redirect";
            header("location:$url");
            exit();
        }else{
            $url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$apps&code=".$_GET['code']."&grant_type=authorization_code";

            $output=(array)json_decode(curl($url));
       if($type=='snsapi_base'){
           return $output['openid'];
       }else{
           $url='https://api.weixin.qq.com/sns/userinfo?access_token='.$output['access_token'].'&openid='.$output['openid'].'&lang=zh_CN';
           $output=(array)json_decode(curl($url));
           return $output;
       }

        }
}
  /*
   * 设置缓存
   * $name 缓存名称
   * $value 缓存值,可以是数组字符
   * $expire 过期时间
   * */
function setcache($name, $value, $expire = 7000)
{
    $filename = "./$name._cache.php";
    $json = json_encode(array($name=>$value,"expire"=>time()+$expire));
    $result = file_put_contents($filename,$json);
    if ($result) {
        return true;
    }
    return false;
}
/*
 * 获取缓存
 * */
function getcache($name)
{
    $filename = "./$name._cache.php";
    if (!is_file($filename)) {
        return false;
    }
    $content = file_get_contents($filename);

    $arr = json_decode($content,true);
        if($arr['expire'] <= time())
        {
            return false;
        }
        return $content;
}
/*
 * 获取微信全局token,缓存时间7000秒
 * */
function  gettoken($appid=APPID,$apps=APPS){

    $url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$apps";
  $token =   getcache('TOKEN');
  if($token==false){
      $value = curl($url);
      $value = (array)json_decode($value,true);
      setcache('TOKEN', $value, $expire = 7000);
      return $value['access_token'];
  }else{
      $arr = json_decode($token,true);
      $token = $arr['TOKEN'];
      return $token['access_token'];
  }

}
/*
 * 根据openid获取用户信息
 * */
function getuserinfo($openid="oHCa4wOSUBMUnQJY3JZ_8MWWgNs8"){
    $token = gettoken();
    $url="https://api.weixin.qq.com/cgi-bin/user/info?access_token=$token&openid=$openid&lang=zh_CN";
    $output=(array)json_decode(curl($url));
    return $output;
    
}
/*
 * 发送客服消息 48小时内有交互
 * $text 内容
 * $type 类型text文本
 * $openid
 * */
function postkefu($text="文本",$type="text",$openid="oHCa4wOSUBMUnQJY3JZ_8MWWgNs8"){
    $token = gettoken();
    $url="https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=".$token;
    $data = '{
        "touser":"'.$openid.'",
        "msgtype":"text",
        "text":
        {
             "content":"'.$text.'"
        }
    }';
  $d =  curl($url,$data);
  $d = json_decode($d,true);
  if($d['errcode']==0) {
      return true;
  }
  return $d;

}
/*
 * 上传临时图片素材
 * $img 图片绝对路径  $img =  dirname(__FILE__)."/wechat.jpg";
 * $type 类型
 * 0p_xy4is7P_SjckttLzbTiZhyJt7xogfryq7FdJCB44nRLLg-h_6mPaavIEx-hG_
 *
 * */
function postimg($img,$type="image"){
    $token = gettoken();
    $url = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=$token&type=$type";
    if (class_exists('\CURLFile')) //判断是否php>=5.5
    {
        $data = array("media"  => new \CURLFile($img));
    }else{
        $data = array('media'  => '@'.$img);
    }
    $d =  curl($url,$data);
    $d = json_decode($d,true);
    return $d;
}
 /*
  * 下载临时素材,返回路径
  * */
function getimg($media="0p_xy4is7P_SjckttLzbTiZhyJt7xogfryq7FdJCB44nRLLg-h_6mPaavIEx-hG_"){
    $token = gettoken();
    $url = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=$token&media_id=$media";
    $d =  curl($url);
    $file = dirname(__FILE__)."/";
    $files = uniqid().".jpg";
   file_put_contents($file.$files,$d);
    return $files;
}
 /*
  * 生成jsapi的token
  * */
function getjsapi(){
    $token = gettoken();
    $url="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$token&type=jsapi";
    $jsapi =   getcache('JSAPI');
    if($jsapi==false){
        $value = curl($url);
        $value = json_decode($value,true);
        setcache('JSAPI', $value, $expire = 7000);
        return $value['ticket'];
    }else{
        $arr = json_decode($jsapi,true);
        $token = $arr['JSAPI'];
        return $token['ticket'];
    }
}
/*
 * 随机字符串 16位
 * */
function randstr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
        $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
}

if($_GET['q']==1){
    $jsapiTicket = getjsapi();
    $url =$_GET['url'];

    $timestamp = time();
    $nonceStr = randstr();
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

    $signature = sha1($string);

    $signPackage = array(
        "appId"     => APPID,
        "nonceStr"  => $nonceStr,
        "timestamp" => $timestamp,
        "url"       => $url,
        "signature" => $signature,
        "rawString" => $string
    );

    $json = json_encode($signPackage);
    echo $_GET['callback'] . '(' . $json . ')';
}
/*
 * 图片下载素材
 * */
if($_GET['q']==2){
    $mid = $_GET['mid'];
    $token = file_get_contents("https://we7.api.shanliwawa.top/addons/yoby_test/token.php?uniacid=1&type=accesstoken&sign=aaf81876d2dede7004d30cfb04b6184e594c96ba");
    $token = json_decode($token,ture);
    $token = token["accesstoken"];
    $url = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=$token&media_id=$mid";
    $d =  curl($url);
    $file = dirname(__FILE__)."/";
    $files = uniqid().".jpg";
    file_put_contents($file.$files,$d);
    $json = json_encode(["src"=>$files,"mid"=>$mid]);
    echo $_GET['callback'] . '(' . $json . ')';
}