package main

import (
	"encoding/base64"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-xorm/xorm"
	_ "github.com/mattn/go-sqlite3"
	"github.com/mojocn/base64Captcha"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"io"
	"strconv"
	"strings"
	"weui/weui/php"
)

//初始化数据库
var db, _ = xorm.NewEngine("sqlite3", "./db.db")
type Zanzhu struct {
	Id        int64 `json:"id"`
	Zid       string `xorm:"varchar(200)" json:"zid"`
	Money     float64 `json:"money"`
	Say       string    `xorm:"varchar(255)" json:"say"`
	Createtime int64 `xorm:"created" json:"createtime"`
}
type City struct {
	Id        int64 `json:"id"`
	Code int64 `json:"code"`
	Provincecode int64 `json:"provincecode"`
	Citycode int64 `json:"citycode"`
	Areacode int64 `json:"areacode"`
	Name string `json:"name"`
	Isok int64 `json:"isok" xorm:"int(1)"`
	Pinyin string `json:"pinyin" xorm:"varchar(10)"`
}
func main(){
	db.Sync2(new(Zanzhu),new(City))//自动同步数据结构到表
	gin.SetMode(gin.DebugMode)
	//db.ShowSQL(true)
	r := gin.Default()
	r.StaticFS("/weui",gin.Dir("weui",false))
	//r.Static("/weui", "./weui")
	r.GET("/", func(c *gin.Context) {
		c.Redirect(301,"weui/index.html")
	})
	r.POST("/login",login)
	r.POST("/savedata",saveData)
	r.POST("/zanlist",zanList)
	r.POST("/ver",ver)
	r.GET("/code",code)
	r.POST("/getcity",getcity)
	r.POST("/getcitypinyin",getcitypinyin)
	r.POST("/getcityso",getcityso)
	r.POST("md",md)
	r.GET("axiosget",axiosget)
	r.POST("axiospost",axiospost)
	r.POST("axiosgp",axiosgp)
	r.POST("/upimg",upimg)
	r.GET("/getimg",getimg)

	fmt.Println("欢迎使用Golang提供后台服务,Weui6.0,访问地址:127.0.0.1:8885")
	r.Run(":8885")

}

//登陆赞助
func login(c *gin.Context){
	pwd:=c.PostForm("pwd")
	var s string
	if pwd=="123"{
s=`<div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">金额</label></div>
        <div class="weui-cell__bd">
            <input class="weui-input" pattern="[0-9]*" placeholder="金额" type="number" id="money">
        </div>
    </div>
    <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">赞助人</label></div>
        <div class="weui-cell__bd">
            <input class="weui-input"  placeholder="赞助人" type="text" id="zid">
        </div>
    </div>
    <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">留言</label></div>
        <div class="weui-cell__bd">
            <input class="weui-input"  placeholder="留言" type="text" id="say">
        </div>
    </div>
    <div class="weui-btn-area">
    <a class="weui-btn weui-btn_primary" href="javascript:;" onclick="save()">保存</a>
    </div>`
c.JSON(200,gin.H{"code":200,"msg":s})
	}else{
		c.JSON(200,gin.H{"code":400,"msg":"密码不正确"})
	}

}
//保存赞助
func saveData(c *gin.Context) {
	zid := c.PostForm("zid")
	money := c.PostForm("money")
	say := c.PostForm("say")
	if zid==""{
		c.JSON(200,gin.H{"code":400,"msg":"赞助人必填"})
	}else if php.Empty(money){
		c.JSON(200,gin.H{"code":400,"msg":"金额必填"})
	}else{
		z:=new(Zanzhu)
		z.Zid=zid
		z.Money=php.String2Float(money,64).(float64)
		z.Say=say
		db.Insert(z)
		c.JSON(200,gin.H{"code":200,"msg":"保存成功"})
	}


}
//赞助列表
func zanList(c *gin.Context){
	page,_ :=strconv.Atoi(c.DefaultPostForm("page", "1"))
	pagesize,_ := strconv.Atoi(c.PostForm("pagesize"))
	page=(page-1)*pagesize

	z := make([]Zanzhu, 0)
	db.Where("1=1").OrderBy("id desc").Limit(pagesize,page).Find(&z)
	total, _ := db.Where("1=1").Count(new(Zanzhu))
	c.JSON(200, gin.H{"code":200,"msg":"获取成功","total":total,"list":z})
}
//版本
func ver(c *gin.Context){
	str:=php.ReadFile(php.GetPath()+"/weui/php/ver")
	s:=strings.Split(str,"|")
	c.JSON(200,gin.H{"ver":s[0],"date":s[1]})
}
//验证码生成
var store = base64Captcha.DefaultMemStore
func code(c *gin.Context) {
	driver := base64Captcha.DefaultDriverDigit
	rs := base64Captcha.NewCaptcha(driver, store)
	id, b64s, _ := rs.Generate()
	fmt.Println(id)
	i := strings.Index(b64s, ",")
	dec := base64.NewDecoder(base64.StdEncoding, strings.NewReader(b64s[i+1:]))
	c.Header("Content-Type","image/png")
	io.Copy(c.Writer, dec)
}
//获取城市
func getcity(c *gin.Context) {
	code := c.PostForm("code")
	y := new(City)
	db.Where("code=?",code).Get(y)
	c.JSON(200,gin.H{"name":y.Name})
}
func getcitypinyin(c *gin.Context) {
	code := c.PostForm("py")
	y := make([]City, 0)
	db.SQL("select code,name,isok from city where provincecode>0 and citycode>0 and areacode=0 and pinyin=? order by name",code).Find(&y)
	c.JSON(200,gin.H{"list":y})
}
func getcityso(c *gin.Context) {
	kw := c.PostForm("kw")
	y := make([]City, 0)
	db.SQL("select code,name,isok from city where provincecode>0 and citycode>0 and areacode=0 and name like ? order by name","%"+kw+"%").Find(&y)
	c.JSON(200,gin.H{"list":y})
}
func md(c *gin.Context){
	s:=php.ReadFile(php.GetPath()+"/weui/README.md")
	c.String(200,s)
}
type User struct {
	Name string `json:"name" form:"name"`
}
func axiosget(c *gin.Context){
	name:=c.Query("name")
	c.JSON(200,gin.H{"code":200,"data":gin.H{"name":name}})
}
func axiospost(c *gin.Context){
	var u User
	c.BindJSON(&u)

	c.JSON(200,gin.H{"code":200,"data":gin.H{"name":u.Name}})
}
func axiosgp(c *gin.Context){
	var u User
	c.BindJSON(&u)
	c.JSON(200,gin.H{"code":200,"data":gin.H{"name":u.Name}})
}
func upimg(c *gin.Context){
	data:=c.PostForm("imgbase64")
	src:=php.Base642Img("./weui/php/image",data)
	c.JSON(200,gin.H{"src":src})

}
func getimg(c *gin.Context){
	var blue  color.Color = color.RGBA{50,205,50, 255}
	s:=c.Query("c")
	sl:=strings.Split(s,"x")
	w,_:=strconv.Atoi(sl[0])
	h,_:=strconv.Atoi(sl[1])
	m := image.NewRGBA(image.Rect(0, 0, w, h))
	draw.Draw(m, m.Bounds(), &image.Uniform{blue}, image.ZP, draw.Src)
	png.Encode(c.Writer, m)
}