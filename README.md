#weui-plus是在微信官方基础上增强的组件
---
#### 最新版本2.5    基于weui官方0.44开发

#### 简介  
1. weui-plus是官方weui的增强版本,新增非常多的组件,css类,js函数,是微信公众号开发,移动应用最好的UI选择.
2. 本版本并未删除任何官方css也未修改.而是新增文件weui2.css,使用的时候只需要加载weuix.min.css,就包含了所有UI,js可以加载zepto.min.js,只包含基础组件,zepto.js包含了省市县选择picker.js,所以看起来比较大.  
3. 需要单独加载的请参考演示示例.
<pre>
lrz.min.js 图片上传前压缩
picker.js  包含picker相关的选择 地址 时间 
qrcode.js  二维码生成
updown.js  下拉与上拉
sound.js     音乐播放
zepto.js     包含example,picker,zepto.min 
zepto.min.js  基础库+扩展
example.js    包含
swipe.js swipe库
swiper,tab,search,select,popup样式
video.js 音视频播放
iscroll.js 滚动,只在横向导航用到
weui.css  微信官方css,未压缩
weui.min.css 压缩
weui2.css   未压缩扩展包
weui2.min.css  压缩
weuix.min.css  压缩的weui和weui2合并
</pre>

####  已使用公众号或移动网站
- 公众号: 勉县小江南
![](http://weixin.yoby123.cn/attachment/headimg_1.jpg?time=1463681994)
- 待增加

#### [更新日志](http://weixin.yoby123.cn/weui/c/r.html) 
- 2016-6-6 v2.6   替换swipe为更小函数,新版的支持是否自动播放,这个更好用,重写此css,是否使用标题,超链接自己根据例子修改 
- 2016-6-5  v2.5  新增认证头像,新增tab切换红色和绿色导航条,loading动画,旋转180度和360度,新增上拉加载更多下拉刷新,新增图片懒加载只需要载入zepto即可使用   
- 2016-6-3  v2.4  新增音视频播放器,新增横向可滚动导航,新增iscroll移动版库,新增9种常见颜色值;修复已知问题.   
- 2016-4-1 V1.0 weui是很棒的微信端UI,但是组件太少了,在微信开发很多组建都没有,所以根据此问题,收集网络上优秀的代码片段,组合开发出了这一套增强版weui-plus,目前还在不断增多组件,修复bug,目标是做最好的微信端移动端UI.

#### 已知bug列表和修复  
1. 部分华为荣耀V4反映不能上传图片,目前没找到原因,可以使用微信jssdk上传来代替.
2. swiper滚动,手动滑动后不能自动滚动,目前已修复. 

#### 演示连接  
- 最新国内演示地址   <http://weixin.yoby123.cn/weui/>
![](http://7xr193.com1.z0.glb.clouddn.com/weui.png?time=1463681994)
- github演示地址 [http://logoove.github.io/weui2](http://logoove.github.io/weui2)

#### 赞助我 支付宝和微信支付
![](http://7xr193.com1.z0.glb.clouddn.com/weixin-v.jpg?time=1463681994)  ![](http://7xr193.com1.z0.glb.clouddn.com/zhi-v.jpg?time=1463681994)

#### 友情感谢(不完全列出,谢谢你们的付出)
- weui <https://github.com/weui/weui>
- Vux<https://github.com/airyland/vux>
- jquery-weui<https://github.com/lihongxun945/jquery-weui>
- 腾讯手机Q frozen<https://github.com/frozenui/frozenui>
- 淘宝SUI<https://github.com/sdc-alibaba/SUI-Mobile>
- swipe <https://github.com/thebird/Swipe>
- 图片压缩localResizeIMG <https://github.com/think2011/localResizeIMG>
- jquery-qrcode <https://github.com/jeromeetienne/jquery-qrcode>
- zepto <https://github.com/madrobby/zepto>
