package main

import (
	"database/sql"
	"encoding/base64"
	"fmt"
	"github.com/gogf/gf/database/gdb"
	"github.com/gogf/gf/frame/g"
	"github.com/gogf/gf/net/ghttp"
	"github.com/gogf/gf/os/gfile"
	"github.com/gogf/gf/os/gtime"
	"github.com/logoove/go/php"
	"github.com/mojocn/base64Captcha"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"io"
	_ "modernc.org/sqlite"
	"strconv"
	"strings"
	"time"
)
//跨域中间件
func MiddlewareCORS(r *ghttp.Request) {
	r.Response.CORSDefault()
	r.Middleware.Next()
}
type DriverSqlite3 struct {
	*gdb.DriverSqlite
}
func init(){
	gdb.Register("sqlite", &DriverSqlite3{})
}
func (d *DriverSqlite3) New(core *gdb.Core, node *gdb.ConfigNode) (gdb.DB, error) {
	return &DriverSqlite3{
		&gdb.DriverSqlite{
			Core: core,
		},
	}, nil
}
func (d *DriverSqlite3) Open(config *gdb.ConfigNode) (*sql.DB, error) {
	var source string
	if config.LinkInfo != "" {
		source = config.LinkInfo
	} else {
		source = config.Name
	}
	if absolutePath, _ := gfile.Search(source); absolutePath != "" {
		source = absolutePath
	}
	if db, err := sql.Open("sqlite", source); err == nil {
		return db, nil
	} else {
		return nil, err
	}
}
func main(){
	php.Color("欢迎使用WeUI6新版,采用goframe框架\n本地访问地址:http://localhost:8885\n","green")
	fmt.Println("")
	s:=g.Server()
	//s.SetServerRoot(php.GetPath()+"/weui")
	s.AddStaticPath("/weui", php.GetPath()+"/weui")
	s.Group("/", func(group *ghttp.RouterGroup) {
		group.Middleware(MiddlewareCORS)
		group.GET("/",func(r *ghttp.Request){
			r.Response.RedirectTo("weui/index.html",301)
		})
		group.POST("/ver",ver)
		group.POST("/zanlist",zanlist)
		group.POST("/login",login)
		group.POST("/savedata",savedata)
		group.GET("/code",code)
		group.POST("/getcity",getcity)
		group.POST("/getcitypinyin",getcitypinyin)
		group.POST("/getcityso",getcityso)
		group.POST("/md",md)
		group.GET("/axiosget",axiosget)
		group.POST("/axiospost",axiospost)
		group.POST("/axiosgp",axiosgp)
		group.POST("/upimg",upimg)
		group.GET("/getimg",getimg)
		group.GET("/pvuv",pvuv)

	})
	s.Run()

}
//版本获取
func ver(r *ghttp.Request){
	str:=php.ReadFile(php.GetPath()+"/weui/php/ver")
	s:=strings.Split(str,"|")
	c:=g.Map{"ver":s[0],"date":s[1]}
	r.Response.WriteJson(c)
}
//赞助列表
func zanlist(r *ghttp.Request){
	page:=r.GetInt("page",1)
	pagesize:=r.GetInt("pagesize",20)
	page=(page-1)*pagesize
	list,_:=g.Model("zanzhu").Where("1=1").Order("id desc").Limit(page,pagesize).All()
	total,_:=g.Model("zanzhu").Where("1=1").Count()
	r.Response.WriteJson(g.Map{"code":200,"msg":"请求成功","total":total,"list":list})

}
//登录
func login(r *ghttp.Request){
pwd:=r.GetString("pwd")
	if pwd=="0"{
		s:=`<div class="weui-cell">
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
		r.Response.WriteJson(g.Map{"code":200,"msg":s})
	}else{
		r.Response.WriteJson(g.Map{"code":400,"msg":"密码不正确"})
	}
}
//保存赞助
func savedata(r *ghttp.Request){
zid:=r.GetString("zid")
money:=r.GetString("money")
say:=r.GetString("say")
	if zid==""{
		r.Response.WriteJson(g.Map{"code":400,"msg":"赞助人必填"})
	}else if php.Empty(money){
		r.Response.WriteJson(g.Map{"code":400,"msg":"金额必填"})
	}else{
		rs, _ := g.Model("zanzhu").Data(g.Map{"zid": zid,"money":money,"say":say,"createtime":gtime.Timestamp()}).Insert()
		n,_:=rs.RowsAffected()
		if n>0{
			r.Response.WriteJson(g.Map{"code":200,"msg":"保存成功"})
		}else{
			r.Response.WriteJson(g.Map{"code":400,"msg":"保存失败"})
		}

	}
}
var store = base64Captcha.DefaultMemStore
func code(r *ghttp.Request){
	driver := base64Captcha.DefaultDriverDigit
	rs := base64Captcha.NewCaptcha(driver, store)
	id, b64s, _ := rs.Generate()
	fmt.Println(id)
	i := strings.Index(b64s, ",")
	dec := base64.NewDecoder(base64.StdEncoding, strings.NewReader(b64s[i+1:]))
	r.Header.Set("Content-Type","image/png")
	io.Copy(r.Response.Writer, dec)
}
//获取城市
func getcity(r *ghttp.Request){
code:=r.GetString("code")
name,_:=g.Model("city").Where("code=?",code).Value("name")
	r.Response.WriteJson(g.Map{"code":200,"name":name})
}
func getcitypinyin(r *ghttp.Request){
	code:=r.GetString("py")
	list, _ := g.DB().GetAll("select code,name,isok from city where provincecode>0 and citycode>0 and areacode=0 and pinyin=? order by name",code)
	r.Response.WriteJson(g.Map{"code":200,"list":list})
}
func getcityso(r *ghttp.Request){
	kw:=r.GetString("kw")
	list, _ := g.DB().GetAll("select code,name,isok from city where provincecode>0 and citycode>0 and areacode=0 and name like ? order by name","%"+kw+"%")
	r.Response.WriteJson(g.Map{"code":200,"list":list})
}
func md(r *ghttp.Request){
	s:=php.ReadFile(php.GetPath()+"/weui/README.md")
	r.Response.Write(s)
}
func axiosget(r *ghttp.Request){
	name:=r.GetString("name")
	r.Response.WriteJson(g.Map{"code":200,"data":g.Map{"name":name}})
}
func axiospost(r *ghttp.Request){
	name:=r.GetString("name")
	r.Response.WriteJson(g.Map{"code":200,"data":g.Map{"name":name}})
}
func axiosgp(r *ghttp.Request){
	name:=r.GetString("name")
	r.Response.WriteJson(g.Map{"code":200,"data":g.Map{"name":name}})
}
func upimg(r *ghttp.Request){
	data:=r.GetString("imgbase64")
	src:=php.Base642Img("./weui/php/image",data)
	r.Response.WriteJson(g.Map{"code":200,"src":src})
}
//生成占位符图片
func getimg(r *ghttp.Request){
	var blue  color.Color = color.RGBA{50,205,50, 255}
	s:=r.GetString("c")
	sl:=strings.Split(s,"x")
	w,_:=strconv.Atoi(sl[0])
	h,_:=strconv.Atoi(sl[1])
	m := image.NewRGBA(image.Rect(0, 0, w, h))
	draw.Draw(m, m.Bounds(), &image.Uniform{blue}, image.Point{}, draw.Src)
	png.Encode(r.Response.Writer, m)
}
//统计
func pvuv(r *ghttp.Request){
types:=r.GetString("types","0")
md5:=r.Get("md5")
dates:=php.Date("Ymd",time.Now())
if md5==nil{
	r.Response.WriteJsonP(g.Map{"code":400,"msg":"页面不存在"})
	return
}
isok,_:=g.Model("stat").Where("md5=? and types=?",md5,types).One()
if len(isok)==0{//没查到
	g.Model("stat").Data(g.Map{"md5": md5,"types":types,"dates":dates,"num":1}).Insert()
	r.Response.WriteJsonP(g.Map{"code":200,"data":g.Map{"num":1}})
}else{
	g.Model("stat").Data(g.Map{"num":gdb.Raw("num+1")}).Where("id",isok["id"]).Update()
	num:=isok["num"].Int()
	r.Response.WriteJsonP(g.Map{"code":200,"data":g.Map{"num":num+1}})
}
}