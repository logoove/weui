package main

import (
	"crypto/sha1"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	cl "github.com/fatih/color"
	"github.com/gogf/gf/v2"
	"github.com/gogf/gf/v2/database/gdb"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/os/gctx"
	"github.com/gogf/gf/v2/os/gfile"
	"github.com/gogf/gf/v2/os/gtime"
	_ "github.com/logoove/go/sqlite"
	"github.com/mojocn/base64Captcha"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"os"
	"regexp"
	"runtime"
	"strconv"
	"strings"
)

func main() {
	cl.Green("欢迎使用WEUI服务器端,\n本地访问地址:http://127.0.0.1:8885 \n安全访问:https://127.0.0.1,使用caddy2转发实现 \n GO版本:%s \n GoFrame版本:%s", runtime.Version(), gf.VERSION)
	s := g.Server()
	db, _ := gdb.New(gdb.ConfigNode{
		Link: "sqlite::@file(weui/db.db)",
	})
	s.AddStaticPath("/weui", gfile.Pwd()+"/weui")
	/*s.BindHandler("/", func(r *ghttp.Request) {
		r.Response.Write("hello 世界")
	})*/
	s.BindHandler("/", func(r *ghttp.Request) {
		r.Response.RedirectTo("weui/index.html", 301)
	})
	v1 := s.Group("/v1", func(group *ghttp.RouterGroup) {
		group.Middleware(func(r *ghttp.Request) {
			r.Response.CORSDefault()
			r.Middleware.Next()
		})
	})
	//  获取更新版本-日期
	v1.POST("/ver", func(r *ghttp.Request) {
		var arr []string
		gfile.ReadLines(gfile.Pwd()+"/weui/ver", func(line string) error {
			arr = append(arr, line)
			return nil
		})
		c := g.Map{"ver": arr[0], "date": arr[1]}
		r.Response.WriteJson(c)
	})
	//赞助列表方式1
	v1.GET("/zlist", func(r *ghttp.Request) {
		page := r.Get("page", 1).Int()
		pagesize := r.Get("pagesize", 20).Int()
		page = (page - 1) * pagesize
		//db.SetDebug(true)
		list, _ := db.Model("zanzhu").Where("1=1").Order("id desc").Limit(page, pagesize).All()
		total, _ := db.Model("zanzhu").Where("1=1").Count()
		r.Response.WriteJson(g.Map{"code": 200, "msg": "请求成功", "total": total, "list": list})
	})
	v1.GET("/zlist1", func(r *ghttp.Request) {
		start := r.Get("start", 0).Int()
		pagesize := r.Get("pagesize", 20).Int()
		list, _ := db.Model("zanzhu").Where("1=1").Order("id desc").Limit(start, pagesize).All()
		r.Response.WriteJson(g.Map{"code": 200, "msg": "请求成功", "list": list})
	})
	v1.GET("/pvuv", func(r *ghttp.Request) {
		types := r.Get("types", "0").String()
		md5 := r.Get("md5").String()
		dates := gtime.Now().Format("Ymd")
		if md5 == "" {
			r.Response.WriteJsonP(g.Map{"code": 400, "msg": "页面不存在"})
			return
		}
		isok, _ := db.Model("stat").Where("md5=? and types=?", md5, types).One()
		if len(isok) == 0 { //没查到
			db.Model("stat").Data(g.Map{"md5": md5, "types": types, "dates": dates, "num": 1}).Insert()
			r.Response.WriteJsonP(g.Map{"code": 200, "data": g.Map{"num": 1}})
		} else {
			db.Model("stat").Data(g.Map{"num": gdb.Raw("num+1")}).Where("id", isok["id"]).Update()
			num := isok["num"].Int()
			r.Response.WriteJsonP(g.Map{"code": 200, "data": g.Map{"num": num + 1}})
		}
	})
	v1.POST("/login", func(r *ghttp.Request) {
		pwd := r.Get("pwd").String()
		if pwd == "123" {
			str := `<div class="weui-cell">         <div class="weui-cell__hd"><label class="weui-label">金额</label></div>         <div class="weui-cell__bd">             <input class="weui-input" pattern="[0-9]*" placeholder="金额" type="number" id="money">         </div>     </div>     <div class="weui-cell">         <div class="weui-cell__hd"><label class="weui-label">赞助人</label></div>         <div class="weui-cell__bd">             <input class="weui-input"  placeholder="赞助人" type="text" id="zid">         </div>     </div>     <div class="weui-cell">         <div class="weui-cell__hd"><label class="weui-label">留言</label></div>         <div class="weui-cell__bd">             <input class="weui-input"  placeholder="留言" type="text" id="say">         </div>     </div>     <div class="weui-btn-area">     <a class="weui-btn weui-btn_primary" href="javascript:;" onclick="save()">保存</a>     </div>`
			r.Response.WriteJson(g.Map{"code": 200, "msg": str})
		} else {
			r.Response.WriteJson(g.Map{"code": 400, "msg": "密码不正确"})
		}

	})
	v1.POST("/savedata", func(r *ghttp.Request) {
		zid := r.Get("zid").String()
		money := r.Get("money").String()
		say := r.Get("say").String()
		if zid == "" {
			r.Response.WriteJson(g.Map{"code": 400, "msg": "赞助人必填"})
		} else if money == "" {
			r.Response.WriteJson(g.Map{"code": 400, "msg": "金额必填"})
		} else {
			rs, _ := db.Model("zanzhu").Data(g.Map{"zid": zid, "money": money, "say": say, "createtime": gtime.Timestamp()}).Insert()
			n, _ := rs.RowsAffected()
			if n > 0 {
				r.Response.WriteJson(g.Map{"code": 200, "msg": "保存成功"})
			} else {
				r.Response.WriteJson(g.Map{"code": 400, "msg": "保存失败"})
			}

		}
	})
	//生成验证码图片
	var store = base64Captcha.DefaultMemStore
	v1.GET("/code", func(r *ghttp.Request) {
		driver := base64Captcha.DefaultDriverDigit
		rs := base64Captcha.NewCaptcha(driver, store)
		id, b64s, _ := rs.Generate()
		fmt.Println(id)
		r.Response.WriteJson(g.Map{"code": 200, "img": b64s})
	})
	//定位城市
	v1.POST("/getcity", func(r *ghttp.Request) {
		code := r.Get("code").String()
		name, _ := db.Model("city").Where("code=?", code).Value("name")
		r.Response.WriteJson(g.Map{"code": 200, "name": name})
	})
	v1.POST("/getpy", func(r *ghttp.Request) {
		code := r.Get("py").String()
		list, _ := db.GetAll(gctx.New(), "select code,name,isok from city where provincecode>0 and citycode>0 and areacode=0 and pinyin=? order by name", code)
		r.Response.WriteJson(g.Map{"code": 200, "list": list})
	})
	v1.POST("/getso", func(r *ghttp.Request) {
		kw := r.Get("kw").String()
		list, _ := db.GetAll(gctx.New(), "select code,name,isok from city where provincecode>0 and citycode>0 and areacode=0 and name like ? order by name", "%"+kw+"%")
		r.Response.WriteJson(g.Map{"code": 200, "list": list})
	})
	v1.POST("/md", func(r *ghttp.Request) {
		s := gfile.GetContents("weui/README.md")
		r.Response.Write(s)
	})
	v1.GET("/axget", func(r *ghttp.Request) {
		name := r.Get("name").String()
		r.Response.WriteJson(g.Map{"code": 200, "data": g.Map{"name": name}})
	})
	v1.POST("/axpost", func(r *ghttp.Request) {
		name := r.Get("name").String()
		r.Response.WriteJson(g.Map{"code": 200, "data": g.Map{"name": name}})
	})
	v1.POST("/ax2", func(r *ghttp.Request) {
		name := r.Get("name").String()
		r.Response.WriteJson(g.Map{"code": 200, "data": g.Map{"name": name}})
	})
	v1.POST("/upimg", func(r *ghttp.Request) {
		data := r.Get("imgbase64").String()
		src := Base642Img("./weui/php/image", data)
		r.Response.WriteJson(g.Map{"code": 200, "src": src})
	})
	v1.GET("/getimg", func(r *ghttp.Request) {
		var blue color.Color = color.RGBA{50, 205, 50, 255}
		s := r.Get("c").String()
		sl := strings.Split(s, "x")
		w, _ := strconv.Atoi(sl[0])
		h, _ := strconv.Atoi(sl[1])
		m := image.NewRGBA(image.Rect(0, 0, w, h))
		draw.Draw(m, m.Bounds(), &image.Uniform{blue}, image.Point{}, draw.Src)
		png.Encode(r.Response.Writer, m)
	})
	s.SetPort(8885)
	s.Run()
}
func Base64Decode(s string, isurl bool) string {
	var s1 []byte
	x := len(s) * 3 % 4
	switch {
	case x == 2:
		s += "=="
	case x == 1:
		s += "="
	}
	if isurl == true {
		s1, _ = base64.URLEncoding.DecodeString(s)
	} else {
		s1, _ = base64.StdEncoding.DecodeString(s)
	}
	return string(s1)
}
func Sha1(str string) string {
	sha1 := sha1.New()
	sha1.Write([]byte(str))
	return hex.EncodeToString(sha1.Sum([]byte("")))
}
func CreateDir(absPath string) error {
	return os.MkdirAll(absPath, os.ModePerm)
}
func Base642Img(path, data string) (ps string) {
	re := regexp.MustCompile(`^(data:\s*image\/(\w+);base64,)`)
	r := re.FindStringSubmatch(data)
	ext := r[2]
	bs := strings.Replace(data, r[1], "", -1)
	CreateDir(path)
	ps = path + "/" + Sha1(data) + "." + ext
	bs = Base64Decode(bs, false)
	os.WriteFile(ps, []byte(bs), 0666)
	return ps
}
