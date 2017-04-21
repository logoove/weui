# weui+
---
#### [功能简介](http://weixin.yoby123.cn/weui/)  
weui+是Zepto1.2和weui.js,weui0.44/1.02等众多开源项目中,参考而成的,接近100个新组件,最目前全网效果最全的.喜欢这个的童鞋们别吝啬去打小星星哦.
#### [更新日志](http://weixin.yoby123.cn/weui/c/help1.html)
- 2017-4-21 v4.2 修复微信中摇一摇不能再ios10+播放声音,其他声音播放也可此方法解决,新增仿微信左滑动删除
- 2017-4-10 v4.1 修复zepto文件中jssdk相册bug,修复css中不兼容错误,修改重做jssdk演示
- 2017-1-1 v4.0 新增vue2.1.6类库,包括vue.min.js和vue.js,压缩版用于生产环境,非压缩版用于开发环境,vue和zepto等其他可以同时使用,所有组件并没有写成vue组件,但是vue可以用来做一般开发,开发教程参考vue中文教程;本版本更新主要增加一些演示完整性
- 2016-12-25 v3.9 修改fullpage全屏滑动组件核心js为微信官方组件,本组件完美支持超过一屏内容先滑动后翻页,支持点击按钮翻页,支持前后翻页,支持动画绑定,只有6kb大小
- 2016-12-7 v3.8  修复搜索1px阴影错误,增加打分js,增加验证函数php.js,包含一些功能和php一样同名函数
- 2016-11-26 v3.7 新增角标用于视频网站,倒计时
- 2016-11-24 v3.6 新增slider滑块,修改badge徽标,同步weui1.1效果
- 2016-11-23 v3.5 新增fullpage单页应用
- 2016-10-23 v3.4 新增音效摇一摇和vconsole调试工具
- 2016-10-18 v3.3 新增十六宫格,微信底部菜单,以及修改js模板函数
- 2016-10-16 v3.2 修复弹出框圆角和flex某些机型不能正确排版
- 2016-10-15 V3.1 经过将近10多天,终于完成,分五大类(基础,表单,布局,组件,css/js),采用weui0.44作为基础,兼容最新weui1.01所有效果;
在原来基础进行重构,目前所有功能都采用js函数调用,不需要再写html;
精简zepto.min.js;默认将采用只有不到50KB的压缩包,本zepto包含非常多常用效果,需要时候再加载插件,做到轻量级,每个演示都有说明是否加载js;
本次更新已在ios10.1/android5.1测试,机型为iPhone6/Meizu Note3
- 2016-10-1 V3.0 修复提示和底部导航同时用不能点击bug.九宫格演示显示不正确,新增红色数字徽标,分离常用函数为php.js,本函数不使用任何库,名称采用php同函数名.
- 2016-9-4 V2.9  新增手风琴,支持独立和组合调用 
- 2016-7-26 v2.8  升级weui为0.43,微信weui官方修复了已知bug.
- 2016-6-18 v2.7  新增15个新图标,上传图片新增提示删除,修复已知bug.
- 2016-6-6 v2.6   替换swipe为更小函数,新版的支持是否自动播放,这个更好用,重写此css,是否使用标题,超链接自己根据例子修改 
- 2016-6-5  v2.5  新增认证头像,新增tab切换红色和绿色导航条,loading动画,旋转180度和360度,新增上拉加载更多下拉刷新,新增图片懒加载只需要载入zepto即可使用   
- 2016-6-3  v2.4  新增音视频播放器,新增横向可滚动导航,新增iscroll移动版库,新增9种常见颜色值;修复已知问题.   
- 2016-4-1 V1.0 weui是很棒的微信端UI,但是组件太少了,在微信开发很多组建都没有,所以根据此问题,收集网络上优秀的代码片段,组合开发出了这一套增强版weui-plus,目前还在不断增多组件,修复bug,目标是做最好的微信端移动端UI.

#### [在线演示](http://weixin.yoby123.cn/weui/)

![http://weixin.yoby123.cn/weui/](http://7xr193.com1.z0.glb.clouddn.com/weui.png?time=1463681994)

#### [赞助我](#)
![](http://7xr193.com1.z0.glb.clouddn.com/weixin-v.jpg?time=1463681994)  

![](http://7xr193.com1.z0.glb.clouddn.com/zhi-v.jpg?time=1463681994)

#### [使用方法](http://www.kancloud.cn/logoove/we7/249788)
~~~
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Hello world</title>
 <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
 <link rel="stylesheet" href="weuix.min.css"/>
<script src="zepto.min.js"></script>
</head>
<body ontouchstart  class="page-bg">
<div class="page-bd-15">
Hello World
</div>
</body>
</html>
~~~
####  [已使用公众号或移动网站](#)
![](http://open.weixin.qq.com/qr/code/?username=gh_0c65a0b2e150)

#### [友情感谢](#)
- weui<https://github.com/weui/weui>
- Vux <https://github.com/airyland/vux>
- jquery-weui <https://github.com/lihongxun945/jquery-weui>
- frozen <https://github.com/frozenui/frozenui>
- sui <https://github.com/sdc-alibaba/SUI-Mobile>
- localResizeIMG <https://github.com/think2011/localResizeIMG>
- jquery-qrcode <https://github.com/jeromeetienne/jquery-qrcode>
- zepto <https://github.com/madrobby/zepto>
- zyMedia <https://github.com/ireaderlab/zyMedia>
- vconsole <https://github.com/WechatFE/vConsole>
- PageSlider <https://github.com/weixin/PageSlider>
- vue <https://github.com/vuejs/vue>
- lazyimg <https://github.com/lzxb/lazy-load-img>
- updown <https://github.com/ximan/dropload>
- phpjs <https://github.com/chand3040/phpjs>
- 以上排名不分先后,参考了他们代码或直接使用了,还有一些未找到出处不在此列出,谢谢.