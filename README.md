### WeUI+
[![GitHub issues](https://img.shields.io/github/issues/logoove/weui?color=1)](https://github.com/logoove/weui/issues)  [![GitHub forks](https://img.shields.io/github/forks/logoove/weui?color=1&style=social)](https://github.com/logoove/weui/network)  [![GitHub stars](https://img.shields.io/github/stars/logoove/weui?color=1&style=social)](https://github.com/logoove/weui/stargazers)  ![GitHub repo size](https://img.shields.io/github/repo-size/logoove/weui?color=1)
![GitHub top language](https://img.shields.io/github/languages/top/logoove/weui?color=1)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/logoove/weui?color=1)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/logoove/weui?color=1)
![GitHub last commit](https://img.shields.io/github/last-commit/logoove/weui)
[![GitHub license](https://img.shields.io/github/license/logoove/weui?color=1)](https://github.com/logoove/weui/blob/master/LICENSE)

WeUI+基于Zepto1.2和weui1.13等众多开源项目参考而成的,接近100个组件/插件,最目前全网效果最全的Mobile UI,可用于开发HTML5,公众号端.

[![](https://img.shields.io/badge/%E5%9C%A8%E7%BA%BF%E6%BC%94%E7%A4%BA-V5%2B%2B-1)](http://weui.shanliwawa.top)

[![](https://img.shields.io/badge/%E5%9C%A8%E7%BA%BF%E6%BC%94%E7%A4%BA-V4.9-1)](http://weui.shanliwawa.top/4.9)

[![](https://img.shields.io/badge/github-https%3A%2F%2Fgithub.com%2Flogoove%2Fweui-1)](https://github.com/logoove/weui)

[![](https://img.shields.io/badge/gitee-https%3A%2F%2Fgitee.com%2Fyoby%2Fweui-1)](https://gitee.com/yoby/weui)
![](https://img.shields.io/badge/%E8%B5%9E%E5%8A%A9%E6%88%91-%E6%84%9F%E8%B0%A2%E6%AF%8F%E4%BD%8D%E8%B5%9E%E5%8A%A9%E5%92%8C%E5%85%B3%E6%B3%A8%E7%94%A8%E6%88%B7-1)

### 简介
[![GitHub license](https://img.shields.io/github/license/logoove/weui?color=1)](https://github.com/logoove/weui/blob/master/LICENSE)
本项目系个人作品,没有时间写文档,所以使用方法参见演示例子,不懂得可以在issues留言提问,都会及时回复,gitee更迅速回复;
### 更新日志
![](https://img.shields.io/badge/Date-%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97-1)
- 2021-6-7 v6.07 修复验证码可能导致在小内存机器上内存崩溃闪退程序.
- 2021-5-30 v6.06 修复分页中计算数组或对象长度使用count,否则可能导致分页错误,length属性可以计算数组不能计算对象.
- 2021-5-24 v6.05 修改分页中一些逻辑,错误,以及优化.
- 2021-5-19 v6.04 数据库依然是sqlite3,本次采用新的sqlite驱动,不再使用cgo,可以交叉编译任何系统的程序,新增图片占位符和统计流量接口.
- 2021-4-22 v6.03 重写fn.js,新增一些函数,全部使用export导出函数,里面函数使用必须import {md5,dump} from 'js/fn.js'这样导入,需要哪个导入哪个;新增js表格排序,支持string,int,float,date四种类型能排序常见数据类型
- 2021-3-26 V6.02 删除js函数setcookie,因为此函数存在设置过期时间不生效,使用ls.setCookie替代,修复md5函数错误,新增统计站点pv,uv,此接口(/pvuv)可以用来统计任何静态页面,包括跨域名,原理是传递每个页面的url生成的md5值,类型1是uv,0是pv.
- 2021-3-21 v6.01 修复底部自动加载在安卓部分手机下不能加载.
- 2021-3-20 v6.0 发布最新6.0版本,所有后台都由原来php改为golang提供,包括静态页面,端口:8885,可以自己修改后编译,默认提供x6|4位编译后win10,linux可执行文件,你本地可以不安装任何环境就能运行动态的页面展示效果,数据库采用sqlite3,不管是哪个系统编译都需要gcc支持.
- 2021-3-18 v5.35 新增商品分类组件,感谢[hanchengluo](https://gitee.com/hanchengluo)提供模板
- 2021-3-8 v5.34 新增组件聊天窗口模拟,感谢[pkkgu](https://gitee.com/pkkgu)提供模板
- 2020-8-11 v5.33 新增navbar非ajax切换,navbar和tabbar同页面存在演示
- 2020-8-6 v5.32 新增navbar切换ajax示例,修改已知错误,php.js中JavaScript自定义方法新增参数说明,在phpstorm或webstorm可显示说明
- 2020-4-8 v5.31 新增瀑布流插件,
- 2020-1-1 v5.30 修改生成二维码插件为无任何依赖的qrcanvas,js方法增加注释,新增搜索下拉提示,新增select原装控件美化类;
- 2019-11-09 v.5.29 新增固定table表头列
- 2019-10-15 v.5.28 jssdk补全了跨域上传图片演示,删除了js微擎函数tomedia,其他修改!
- 2019-8-28 v.5.27 eruda.js移动端调试工具,新增gethost()获取网站域名包含https
- 2019-8-23 v.5.26 替换腾讯移动端调试工具为eruda,此工具几乎和电脑端调试工具一样强大,文件比较大,正式上线后请移除;新增loadjs,loadcss用来加载文件,并且支持回调;
- 2019-8-21 v5.25 新增sl.set,sl.get,sl.remove,sl.clear四个操作localstorage方法,对于不支持的浏览器自动采用cookie,详细参见自定义方法,主要是微信某些安卓手机不支持
- 2019-8-8 v5.24 修复宫格可能在android上点击无效;增加addcss,addjs两个添加代码函数,picker调整离底部0;toast调整事件为1秒
- 2019-8-5 v5.23 新增emoji处理演示和相关处理函数,有两种方法,分别是转换成实体和unicode编码,以及其11kb包含100多个svg图标的演示,其他隐藏银行卡,手机号中间几位,判断是否为价格金额的函数,
- 2019-7-31 v5.22 新增签到日历;
- 2019-7-30 v5.21 新增trim,ltrim,rtrim三个函数,分别去掉两端,左边,右边的空格或者特定的字符,用法同名php函数,新增noshare函数,禁止页面在分享,一般用于个人中心,发布表单填写页面,直接调用不需要使用jssdk;新增开关获取选中和取消演示.新增.bg-white白色背景,新增margin和padding 上右下左四个方向的0,5px,10px,15px,20px .margin0,.margin0-t,等类似
- 2019-7-23 v5.20 修改初始日期1930-2080年,新增年月日选择例子;更新省市线地址选择器数据,最新数据是2019年github上开源的三级数据json,同时压缩数据,体积由350kb变成180多kb,港澳台数据未有变化,因为开源的也没有港澳台含编码的数据.
- 2019-7-22 v5.19 新增h5自动定位到线级城市,线级城市首字母选择或搜索;新增选择当前位置定位;新增25宫格;新增ajax跳到详情页返回后还原到原来位置;
新增count数组或对象个数计算,mktime返回日期时间戳,$_GET获取地址中传递参数值,替换原函数getquery,$_COOKIE获取cookie值,foreach数组对象处理函数,unset删除数组元素,数组合并array_merge,array_serch查找元素,array_keys,array_values返回数组键或值组成的新函数,数组截取array_slice
,字符串替换str_replace,关联数组获取指定列array_column,提示跳转msg,log等
- 2019-7-20 v5.18 修复popup,picker等的遮罩层在ios无效,在ios平台遇到一些点击无效情况一般只需要加上cursor: pointer;即可,安卓一般不会有此问题
- 2019-7-16 v5.17 修复ios微信内某些表单元素不回弹bug,新增模拟手机端触屏,F2图表插件在电脑上使用需要加载fe.pc.js;新增函数sort,sha1,ksort三个函数,用于js签名计算,参见php.js;这些函数是可以导出到vue中使用的,导出库fn.js;
- 2019-7-12 v5.16 新增lottie动画插件和演示,修复地址选择bug
- 2019-7-10 v5.15 修复美化表单的单选多选不能点击文字选中bug,现在可以了,目前组件已经很全了,有需要其他组件的请直接在github或gitee留言,点赞人数多的会考虑加进去
- 2019-5-22 v5.14 升级颜色值为weui2.0,间距等一些2.0排版就不升级了,绿色#07C160 蓝色#10AEFF 红色#FA5151
- 2019-5-20 v5.13 新增导航,4.9有,后来给漏掉了补上
- 2019-5-7 v5.12 修复tap与click的事件穿透
- 2019-3-10 v5.11 加入data插件到zepto核心,加入fn.php文件
- 2018-12-20 v5.1 正式版发布,关于jssdk关闭演示上传,与上传有关的全部关闭,节省服务器资源;php文件夹下面db.php和fn.php是配置数据库与jssdk后端;
- 2018-12-18 新增头像认证,折叠面板,角标
- 2018-12-06 新增jssdk1.4相关演示包含获取openid,oauth2授权,相册,图片上传想下载,地址位置等含php代码;普通图片上传lrz插件和相关演示;新增音频播放;ajax分页样式2种和效果;留言列表;新闻列表仿今日头条;新版公众号文章样式,新增优秀音乐和视频播放器Dplayer/Aplayer,侧边栏,今日头条导航;
- 2018-12-01 v5.02 解决select和picker冲突
- 2018-10-24 v5.01  这是一次全新的重构,新增和去掉一些不常用插件,每天更新一点点正式版v5.0将在12月发布,测试版v5.01将于10月24日发布
- 2018-5-24 v4.9.2 修复bug,新增图片横排1,2,3张图片效果,无任何css改变,所以无需更新css
- 2018-5-7 V4.9.1 修复swipe的css的自动宽度和高度
- 2018-4-8 v4.9 修复表格中复选无法选中,新增表格变色
- 2018-2-2 v4.8 新增默认单选复选文本文本域新样式
- 2018-2-1 v4.7 新增支付场景的输入支付,选择支付,支付记录,订单
- 2018-1-24 v4.6 新增弹出层自定义,按钮组,奖品独立框
- 2018-1-6 v4.5 新增ajax分页两种,含后台PHP处理,新增选择层,修复已知bug,需要说明,使用底部导航设置高就不会产生页面不能点击
- 2017-10-1 v4.3 修复已知bug
- 2017-4-21 v4.2 修复微信中摇一摇不能再ios10+播放声音,其他声音播放也可此方法解决,新增仿微信左滑动删除
- 2017-4-10 v4.1 修复zepto文件中jssdk相册bug,修复css中不兼容错误,修改重做jssdk演示
- 2017-1-1 v4.0 新增vue2.1.6类库,包括vue.min.js和vue.js,压缩版用于生产环境,非压缩版用于开发环境,vue和zepto等其他可以同时使用,所有组件并没有写成vue组件,但是vue可以用来做一般开发,开发教程参考vue中文教程;本版本更新主要增加一些演示完整性
- 2016-12-25 v3.9 修改fullpage全屏滑动组件核心js为微信组件,本组件完美支持超过一屏内容先滑动后翻页,支持点击按钮翻页,支持前后翻页,支持动画绑定,只有6kb大小
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
- 2016-7-26 v2.8  升级weui为0.43,微信weui修复了已知bug.
- 2016-6-18 v2.7  新增15个新图标,上传图片新增提示删除,修复已知bug.
- 2016-6-6 v2.6   替换swipe为更小函数,新版的支持是否自动播放,这个更好用,重写此css,是否使用标题,超链接自己根据例子修改 
- 2016-6-5  v2.5  新增认证头像,新增tab切换红色和绿色导航条,loading动画,旋转180度和360度,新增上拉加载更多下拉刷新,新增图片懒加载只需要载入zepto即可使用   
- 2016-6-3  v2.4  新增音视频播放器,新增横向可滚动导航,新增iscroll移动版库,新增9种常见颜色值;修复已知问题.   
- 2016-4-1 V1.0 weui是很棒的微信端UI,但是组件太少了,在微信开发很多组建都没有,所以根据此问题,收集网络上优秀的代码片段,组合开发出了这一套增强版weui-plus,目前还在不断增多组件,修复bug,目标是做最好的微信端移动端UI