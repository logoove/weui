### WeUI+

WeUI+基于Zepto1.2和weui1.13等众多开源项目参考而成的,接近100个组件/插件,最目前全网效果最全的MobileUI.

### 在线演示

[https://weui.shanliwawa.top](https://weui.shanliwawa.top)

### 更新日志

[点击查看](weui/README.md)

### 编译后台

windows `go build -ldflags "-s -w" -o win-weui-amd64.exe`

Linux `go build -ldflags "-s -w" -o linux-weui-amd64`

要想更小可以用upx工具压缩, 编译的时候注意要关闭cgo, 比如wsl2下面编译, 开启cgo可能编译的不能运行.

### 赞助

![微信][wx]


![支付宝][zfb]

[wx]:./wx.jpg
[zfb]:./zfb.jpg