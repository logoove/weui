#weui是在微信官方基础上增强的组件
---
####本程序版本2.3    基于weui官方0.44开发
####简介

- 全部效果压缩后css160KB,js160kb左右,总的来说还是比较大的,不过相对目前4G网络或wifi来说,算不上特别大,选择性加载可以保证css在120kb,js在60kb,js大的原因是包含了省市县数据.
- 个人做的微信项目还是比较多的,基本上都使用这一套组件开发,效果在安卓和ios平台都是非常棒,感谢微信给我们提供了这样一套组件,特别是速度明显提升,以前基于非组件化开发的明显比较卡,效果也不一致.
- 组件中包含了上传图片,单图多图都支持,图片是通过压缩后上传到服务器,可以保证在100kb左右,2MB以上图片也能;还有一种是通过微信提供的jssdk上传组件,由微信服务器压缩,也能保证很好压缩比,不过速度有点慢.
- 组件包括了JSSDK演示效果,但是并不包含php处理,如有需要可以联系yoby,因为这个涉及到签名后才能使用jssdk
- 整理以上所有组件并调试,花费了很多时间,关键是安卓ios效果不一致,目前基本能保证两者效果一致,但是注意ios系统8.0以上 安卓4.0以上版本,手机屏幕4.0以上.由于是个人不可能真机测试,主要是使用微信提供的测试模拟工具.
- 本人主要是微信游戏和应用开发,所以基本上都是使用这套组件来开发界面,个人没有设计师,也只能如此,如有相同爱好可一起交流
- 使用非常简单,每个单独文件基本都有效果,基本包含了目前流行的各种常用效果,有很多效果可以自己组合或通过js简单就能写出来.
- 建议使用只加载一个css和js,这样多个页面就不会存在重复加载,节省不少流量.

---
#### 来自以下开源项目的部分代码
- github演示地址 [http://logoove.github.io/weui2](http://logoove.github.io/weui2)
- 国内演示地址   <http://weixin.yoby123.cn/weui/>
- 感谢以下开源项目,部分来自他们,谢谢了!
- weui <https://github.com/weui/weui>
- Vux<https://github.com/airyland/vux>
- jquery-weui<https://github.com/lihongxun945/jquery-weui>
- 腾讯手机Q frozen<https://github.com/frozenui/frozenui>
- 淘宝SUI<https://github.com/sdc-alibaba/SUI-Mobile>
- swipe <https://github.com/thebird/Swipe>
- 图片压缩localResizeIMG <https://github.com/think2011/localResizeIMG>
- jquery-qrcode <https://github.com/jeromeetienne/jquery-qrcode>
- zepto <https://github.com/madrobby/zepto>
- 还有一些片段代码或js代码来自网络,不一一列出,感谢!
