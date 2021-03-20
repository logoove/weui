package php

import (
	"archive/zip"
	"bufio"
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/md5"
	"crypto/sha1"
	"encoding/base64"
	"encoding/csv"
	"encoding/hex"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/text/encoding/simplifiedchinese"
	"html"
	"io"
	"io/ioutil"
	"math"
	"math/rand"
	"net"
	"net/http"
	"net/smtp"
	"net/url"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"reflect"
	"regexp"
	"runtime"
	"sort"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"
)
/**
 * @Description: 当前时间戳
 * @return int64
 */
func Time() int64 {
	return time.Now().Unix()
}
/**
 * @Description: 格式化时间类型
 * @param format Y-m-d H:i:s
 * @param ts 时间类型 2021-01-02 13:45:34 +0800 CST
 * @return string 时间字符串
 */
func Date(format string, ts ...time.Time) string {
	patterns := []string{
		// 年
		"Y", "2006", // 4 位数字完整表示的年份
		"y", "06", // 2 位数字表示的年份

		// 月
		"m", "01", // 数字表示的月份，有前导零
		"n", "1", // 数字表示的月份，没有前导零
		"M", "Jan", // 三个字母缩写表示的月份
		"F", "January", // 月份，完整的文本格式，例如 January 或者 March

		// 日
		"d", "02", // 月份中的第几天，有前导零的 2 位数字
		"j", "2", // 月份中的第几天，没有前导零

		"D", "Mon", // 星期几，文本表示，3 个字母
		"l", "Monday", // 星期几，完整的文本格式;L的小写字母

		// 时间
		"g", "3", // 小时，12 小时格式，没有前导零
		"G", "15", // 小时，24 小时格式，没有前导零
		"h", "03", // 小时，12 小时格式，有前导零
		"H", "15", // 小时，24 小时格式，有前导零

		"a", "pm", // 小写的上午和下午值
		"A", "PM", // 小写的上午和下午值

		"i", "04", // 有前导零的分钟数
		"s", "05", // 秒数，有前导零
	}
	replacer := strings.NewReplacer(patterns...)
	format = replacer.Replace(format)

	t := time.Now()
	if len(ts) > 0 {
		t = ts[0]
	}
	return t.Format(format)
}
/**
 * @Description: 时间戳转换成时间类型
 * @param t 时间戳
 * @return time.Time 2021-01-02 13:45:34 +0800 CST
 */
func Unix2Time(t int64)time.Time{
	const timeLayout = "2006-01-02 15:04:05"
	str:= time.Unix(t, 0).Format(timeLayout)
	return Timestr2Time(str)
}
/**
 * @Description: 时间字符串转换时间类型
 * @param str 时间字符串
 * @return time.Time 2021-01-02 13:45:34 +0800 CST
 */
func Timestr2Time(str string)time.Time{
	const Layout = "2006-01-02 15:04:05"//时间常量
	loc, _ := time.LoadLocation("Asia/Shanghai")
	times,_ := time.ParseInLocation(Layout,str,loc)
	return times
}
/**
 * @Description: 时间字符串转换时间戳
 * @param s 时间字符类型
 * @return int64 时间戳
 */
func Str2Time(s string)int64{
	const timeLayout = "2006-01-02 15:04:05"
	loc, _ := time.LoadLocation("Local")
	tmp, _ := time.ParseInLocation(timeLayout, s, loc)
	timestamp := tmp.Unix()
	return timestamp
}
/**
 * @Description: 友好时间显示
 * @param t 时间戳
 * @return string
 */
func TimeLine(t int64)string{
	now :=time.Now().Unix()
	var xx string
	if now<=t{
		xx= Date("Y-m-d H:i:s",Unix2Time(t))
	}else{
		t= now-t
		f:=map[int]string{
			31536000 :"年",
			2592000:"个月",
			604800 :"星期",
			86400 :"天",
			3600:"小时",
			60 :"分钟",
			1 :"秒"}
		var keys []int
		for k := range f {
			keys = append(keys, k)
		}
		sort.Sort(sort.Reverse(sort.IntSlice(keys)))
		for _,v:=range keys{
			k1:=int64(v)
			x:= t/k1
			if x!=0 {
				x1 := strconv.FormatInt(x,10)
				xx= x1+f[v]+"前"
				break
			}
		}}
	return xx
}
/**
 * @Description: 格式化字节
 * @param sizes
 * @return string
 */
func FileCount(sizes uint64)(string){
	a:=[...]string{"B", "KB", "MB", "GB", "TB", "PB"}
	pos:=0
	s:=float64(sizes)
	for s>=1024 {
		s =s/1024
		pos++
	}
	c := strconv.FormatFloat(s,'f',2,64)
	return c+" "+a[pos];
}
/**
 * @Description: 生成随机id
 * @param prefix 前缀字符
 * @return string
 */
func Uniqid(prefix string) string {
	now := time.Now()
	return fmt.Sprintf("%s%08x%05x", prefix, now.Unix(), now.UnixNano()%0x100000)
}
/**
 * @Description: 结构体转换字典map
 * @param obj 结构体
 * @return map[string]interface{}
 */
func Struct2Map(obj interface{}) map[string]interface{} {
	t := reflect.TypeOf(obj)
	v := reflect.ValueOf(obj)

	var data = make(map[string]interface{})
	for i := 0; i < t.NumField(); i++ {
		data[t.Field(i).Name] = v.Field(i).Interface()
	}
	return data
}
/**
 * @Description: 类型判断
 * @param a
 * @return reflect.Type
 */
func Typeof(a interface{})reflect.Type{
	return reflect.TypeOf(a)
}
/**
 * @Description: 读取文件
 * @param path 路径
 * @return string
 */
func ReadFile(path string)string{
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	bufReader := bufio.NewReader(file)
	var i = 0
	s:=""
	for{
		i++
		line,err := bufReader.ReadString(';')
		s+=line
		if err == io.EOF {
			break
		}
	}
	return s
}
/**
 * @Description: 判断元素是否在数组,切片,字典中
 * @param needle 元素
 * @param haystack 数组
 * @return bool
 */
func InArray(needle interface{}, haystack interface{}) bool {
	val := reflect.ValueOf(haystack)
	switch val.Kind() {
	case reflect.Slice, reflect.Array:
		for i := 0; i < val.Len(); i++ {
			if reflect.DeepEqual(needle, val.Index(i).Interface()) {
				return true
			}
		}
	case reflect.Map:
		for _, k := range val.MapKeys() {
			if reflect.DeepEqual(needle, val.MapIndex(k).Interface()) {
				return true
			}
		}
	default:
		panic("haystack: haystack type muset be slice, array or map")
	}

	return false
}
/**
 * @Description: 四舍五入保留小数位数
 * @param value 浮点数
 * @param n 小数位数 0是整数
 * @return float64
 */
func Round(value float64,n int) float64 {
	n10 := math.Pow10(n)
	return math.Trunc((value+0.5/n10)*n10) / n10
}
/**
 * @Description: 将utf-8编码的字符串转换为GBK编码
 * @param str 要转换字符串
 * @return string
 */
func Utf2Gbk(str string) string {
	ret, _ := simplifiedchinese.GBK.NewEncoder().String(str)
	return ret
	b, _ := simplifiedchinese.GBK.NewEncoder().Bytes([]byte(str))
	return string(b)
}
/**
 * @Description: 将GBK编码的字符串转换为utf-8编码
 * @param gbkStr
 * @return string
 */
func Gbk2Utf8(gbkStr string) string {
	ret, _ := simplifiedchinese.GBK.NewDecoder().String(gbkStr)
	return ret
	b, _ := simplifiedchinese.GBK.NewDecoder().Bytes([]byte(gbkStr))
	return string(b)
}
/**
 * @Description: 文件修改时间,返回时间戳
 * @param file
 * @return int64 时间戳
 * @return error
 */
func FileMtime(file string) (int64, error) {
	f, err := os.Stat(file)
	if err != nil {
		return 0, err
	}
	return f.ModTime().Unix(), nil
}
/**
 * @Description: 返回文件大小字节
 * @param file 文件名
 * @return uint64 字节大小
 * @return error
 */
func FileSize(file string) (uint64, error) {
	f, err := os.Stat(file)
	if err != nil {
		return 0, err
	}
	return uint64(f.Size()), nil
}
/**
 * @Description: 写文件
 * @param filename 文件名
 * @param data []byte("我爱你12345")
 * @return error
 */
func WriteFile(filename string, data []byte) error {
	os.MkdirAll(path.Dir(filename), os.ModePerm)
	return ioutil.WriteFile(filename, data, 0655)
}
/**
 * @Description: 判断是否文件,不存在也返回否
 * @param filePath
 * @return bool
 */
func IsFile(filePath string) bool {
	f, e := os.Stat(filePath)
	if e != nil {
		return false
	}
	return !f.IsDir()
}
/**
 * @Description: 判断是否目录
 * @param dir
 * @return bool
 */
func IsDir(dir string) bool {
	f, e := os.Stat(dir)
	if e != nil {
		return false
	}
	return f.IsDir()
}
/**
 * @Description: 判断文件或目录是否存在
 * @param path
 * @return bool
 */
func IsExist(path string) bool {
	_, err := os.Stat(path)
	return err == nil || os.IsExist(err)
}
/**
 * @Description: 创建目录 php.CreateDir("./112/qq","112/vv")
 * @param dirs 多个目录,支持多级别
 * @return err
 */
func CreateDir(dirs ...string) (err error) {
	for _, v := range dirs {
		exist:= IsExist(v)
		if !exist {
			err = os.MkdirAll(v, os.ModePerm)
			CheckErr(err)
		}
	}
	return err
}
/**
 * @Description: 获取go路径,返回切片
 * @return []string
 */
func GetGopath() []string {
	gopath := os.Getenv("GOPATH")
	var paths []string
	if runtime.GOOS == "windows" {
		gopath = strings.Replace(gopath, "\\", "/", -1)
		paths = strings.Split(gopath, ";")
	} else {
		paths = strings.Split(gopath, ":")
	}
	return paths
}
//是否邮箱
func IsEmail(email string) bool {
	return regexp.MustCompile(`(?i)[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}`).MatchString(email)
}
//是否url
func IsUrl(url string) bool {
	return regexp.MustCompile(`(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?`).MatchString(url)
}
/**
 * @Description: 输出csv
 * @param filename 文件名
 * @param data
	data:= [][]string{
		{"1", "test1", "李白"},
		{"2", "test2", "2015-12-26"},
		{"3", "test3", "test3-1"},
	}
 */
func WriteCsv(filename string,data [][]string){
	f, err := os.Create(filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	f.WriteString("\xEF\xBB\xBF")
	w := csv.NewWriter(f)
	w.WriteAll(data)
}
/**
 * @Description: 读取csv返回二维切片
 * @param filename
 * @return [][]string
 */
func ReadCsv(filename string)[][]string{
	f, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	reader := csv.NewReader(f)
	var s [][]string
	for {
		record,err := reader.Read()
		if err == io.EOF {
			break
		}
		s=append(s,record)
	}
	return s
}
/**
 * @Description: 获取exe路径
 * @return string C:\www\go\bin
 */
func GetPath() string {
	file, _ := exec.LookPath(os.Args[0])
	path, _ := filepath.Abs(file)
	index := strings.LastIndex(path, string(os.PathSeparator))
	return path[:index]
}
/**
 * @Description: 数据反顺序输出
 * @param s 切片
 * @return []interface{}
 */
func ArrayReverse(s []interface{}) []interface{} {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]    }
	return s
}
/**
 * @Description: 合并两个数组
 * @param ss 多个数组
 * @return []string
 */
func ArrayMerge(ss ...[]string) []string {
	n := 0
	for _, v := range ss {
		n += len(v)
	}
	s := make([]string, 0, n)
	for _, v := range ss {
		s = append(s, v...)
	}
	return s
}
/**
 * @Description: 返回value组成新数组
 * @param elements 字典
 * @return []interface{} 新数组
 */
func ArrayValues(elements map[interface{}]interface{}) []interface{} {
	i, vals := 0, make([]interface{}, len(elements))
	for _, val := range elements {
		vals[i] = val
		i++
	}
	return vals
}
/**
 * @Description: 返回key组成新数组
 * @param elements
 * @return []interface{}
 */
func ArrayKeys(elements map[interface{}]interface{}) []interface{} {
	i, keys := 0, make([]interface{}, len(elements))
	for key, _ := range elements {
		keys[i] = key
		i++
	}
	return keys
}
/**
 * @Description: 切片转换字符串	s:=[]interface{}{"我们","爱你"}
	v:=php.Array2String(s,"")
 * @param array 切片
 * @param ss 分隔符
 * @return string
 */
func Array2String(array []interface{},ss string) string {
	return strings.Replace(strings.Trim(fmt.Sprint(array), "[]"), " ", ss, -1)
}
/**
 * @Description: 产生随机数,最小,最大
 * @param min 最小数
 * @param max 最大数
 * @return int64 随机
 */
func MtRand(min, max int) int {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return r.Intn(max-min+1) + min
}
/**
 * @Description: md5加密
 * @param str
 * @return string
 */
func Md5(str string) string {
	h := md5.New()
	io.WriteString(h, str)
	return fmt.Sprintf("%x", h.Sum(nil))
}
/**
 * @Description: 生成sha1
 * @param str
 * @return string
 */
func Sha1(str string) string {
	hash := sha1.New()
	io.WriteString(hash, str)
	return fmt.Sprintf("%x", hash.Sum(nil))
}
/**
 * @Description: 创建密码散列,password 密码
 * @param password 要加密字符串
 * @return string
 * @return error
 */
func PasswordHash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}
/**
 * @Description: 验证密码,密码和密码散列
 * @param password 密码
 * @param hash 上面生成的散列密码
 * @return bool
 */
func PasswordVerify(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
/**
 * @Description: 四舍五入,分割字符
 * @param number 浮点数
 * @param decimals 保留位数2
 * @param decPoint .
 * @param thousandsSep , 分隔符
 * @return string
 */
func NumberFormat(number float64, decimals uint, decPoint, thousandsSep string) string {
	neg := false
	if number < 0 {
		number = -number
		neg = true
	}
	dec := int(decimals)
	// Will round off
	str := fmt.Sprintf("%."+strconv.Itoa(dec)+"F", number)
	prefix, suffix := "", ""
	if dec > 0 {
		prefix = str[:len(str)-(dec+1)]
		suffix = str[len(str)-dec:]	} else {
		prefix = str
	}
	sep := []byte(thousandsSep)
	n, l1, l2 := 0, len(prefix), len(sep)
	// thousands sep num
	c := (l1 - 1) / 3
	tmp := make([]byte, l2*c+l1)
	pos := len(tmp) - 1
	for i := l1 - 1; i >= 0; i, n, pos = i-1, n+1, pos-1 {
		if l2 > 0 && n > 0 && n%3 == 0 {
			for j := range sep {
				tmp[pos] = sep[l2-j-1]
				pos--
			}
		}
		tmp[pos] = prefix[i]	}
	s := string(tmp)
	if dec > 0 {
		s += decPoint + suffix
	}
	if neg {
		s = "-" + s
	}

	return s
}
/**
 * @Description: 去除字符中HTML标记
 * @param content 字符串
 * @return string
 */
func StripTags(content string) string {
	re := regexp.MustCompile(`<(.|\n)*?>`)
	return re.ReplaceAllString(content,"")
}
/**
 * @Description: 返回当前 Unix 时间戳和微秒数
 * @return float64
 */
func MicroTime() float64 {
	loc, _ := time.LoadLocation("UTC")
	now := time.Now().In(loc)
	micSeconds := float64(now.Nanosecond()) / 1000000000
	return float64(now.Unix()) + micSeconds
}
/**
 * @Description: 判断是否为空
 * @param val 变量
 * @return bool
 */
func Empty(val interface{}) bool {
	v := reflect.ValueOf(val)
	switch v.Kind() {
	case reflect.String, reflect.Array:
		return v.Len() == 0
	case reflect.Map, reflect.Slice:
		return v.Len() == 0 || v.IsNil()
	case reflect.Bool:
		return !v.Bool()
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return v.Int() == 0
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		return v.Uint() == 0
	case reflect.Float32, reflect.Float64:
		return v.Float() == 0
	case reflect.Interface, reflect.Ptr:
		return v.IsNil()
	}

	return reflect.DeepEqual(val, reflect.Zero(v.Type()).Interface())
}
/**
 * @Description: 显示错误
 * @param err
 */
func CheckErr(err error) {
	if err != nil{
		panic(err)
	}
}
/**
 * @Description: 计算字符个数
 * @param str 字符串
 * @return int
 */
func Len(str string)int{
	return len([]rune(str))
}
/**
 * @Description: cli实现提示输入 qq:=php.Ask("请输入",nil)
 * @param str 提示字符串
 * @param check nil
 * @return string
 */
func Ask(str string,check func(string) error)string{
	if check == nil {
		check = func(in string) error {
			if len(in) > 0 {
				return nil
			} else {
				return fmt.Errorf("Cannot be empty")
			}
		}
	}
	input := bufio.NewReader(os.Stdin)
	for {
		fmt.Printf(str+"")
		line, _, err := input.ReadLine()
		for err == io.EOF {
			<-time.After(time.Millisecond)
			line, _, err = input.ReadLine()
		}
		if err != nil {
			fmt.Printf("<warn>%s \n\n", err)
		} else if err = check(string(line)); err != nil {
			fmt.Printf("<warn>%s \n\n", err)
		} else {
			return string(line)
		}
	}
}
//cli选择
var RenderChooseQuestion = func(question string) string {
	return question + "\n"
}
var RenderChooseOption = func(key, value string, size int) string {
	return fmt.Sprintf("%-"+fmt.Sprintf("%d", size+1)+"s %s\n", key+")", value)
}
var RenderChooseQuery = func() string {
	return "Choose: "
}
/**
 * @Description: cli选择
 * @param question 提示内容
 * @param choices  map[string]string{
						"1":  "苹果",
						"2": "橘子",
						"3":   "西瓜",
					}
 * @return string 返回key
 */
func Choose(question string, choices map[string]string) string {
	options := RenderChooseQuestion(question)
	keys := []string{}
	max := 0
	for k, _ := range choices {
		if l := len(k); l > max {
			max = l
		}
		keys = append(keys, k)
	}
	sort.Strings(keys)
	for _, k := range keys {
		options += RenderChooseOption(k, choices[k], max)
	}
	options += RenderChooseQuery()
	return Ask(options,func(in string) error {
		if _, ok := choices[in]; ok {
			return nil
		} else {
			return fmt.Errorf("Choose one of: %s", strings.Join(keys, ", "))
		}
	})
}
var ConfirmRejection = "<warn>Please respond with \"y\" or \"n\"\n\n"
var ConfirmYesRegex = regexp.MustCompile(`^(?i)y(es)?$`)
var ConfirmNoRegex = regexp.MustCompile(`^(?i)no?$`)
/**
 * @Description: cli选择yes/no
 * @param question 提示内容支持回复 yes y/no n
 * @return bool
 */
func Confirm(question string) bool {
	cb := func(value string) error {return nil}
	for {
		res := Ask(question, cb)
		if ConfirmYesRegex.MatchString(res) {
			return true
		} else if ConfirmNoRegex.MatchString(res) {
			return false
		} else {
			fmt.Printf(ConfirmRejection)
		}
	}
}
/**
 * @Description: 设置字体颜色,仅用于linux,cmder,标准cmd不支持
 * @param str 字符串
 * @param color1
 * @param extraArgs 忽略
 * @return string php.ColorLinux("测试","red")
 */
func ColorLinux(str string, color1 string, extraArgs ...interface{}) string {
	//闪烁效果
	var isBlink int64 = 0
	var color int
	var weight int=1
	m:= map[string]int{"green":32, "red":31,"yellow":33,"black":30,"white":37,"blue":34,"zi":35,"qing":36}
	if v, ok := m[color1]; ok {
		color=v
	}else{
		color=31
	}
	if len(extraArgs) > 0 {
		isBlink = reflect.ValueOf(extraArgs[0]).Int()
	}

	//下划线效果
	var isUnderLine int64 = 0
	if len(extraArgs) > 1 {
		isUnderLine = reflect.ValueOf(extraArgs[1]).Int()
	}
	var mo []string
	if isBlink > 0 {
		mo = append(mo, "05")
	}
	if isUnderLine > 0 {
		mo = append(mo, "04")
	}
	if weight > 0 {
		mo = append(mo, fmt.Sprintf("%d", weight))
	}
	if len(mo) <= 0 {
		mo = append(mo, "0")
	}
	buf := bytes.Buffer{}
	buf.WriteString("\033[")
	buf.WriteString(strings.Join(mo, ";"))
	buf.WriteString(";")
	buf.WriteString(fmt.Sprintf("%d", color))
	buf.WriteString("m")
	buf.WriteString(str)
	buf.WriteString("\033[0m")
	return buf.String()
}
/**
 * @Description: 支持windows设置颜色
 * @param s 字符
 * @param i1 颜色
 */
/*func Color(s interface{}, i1 string){
	c:=	map[string]int{
		"black":0,
		"blue":1,
		"green":2,
		"cyan":3,//青色
		"red":4,
		"purple":5,//紫色
		"yellow":6,//
		"white":15,
		"gray":8,
		"qing":3,
		"zi":5,
	}
	var i int
	if v, ok := c[i1]; ok {
		i=v
	}else{
		i=4
	}
	if runtime.GOOS=="windows"{
	kernel32 := syscall.NewLazyDLL("kernel32.dll")
	proc := kernel32.NewProc("SetConsoleTextAttribute")
	handle, _, _ := proc.Call(uintptr(syscall.Stdout), uintptr(i))
	fmt.Print(s)
	handle, _, _ = proc.Call(uintptr(syscall.Stdout), uintptr(7))
	CloseHandle := kernel32.NewProc("CloseHandle")
	CloseHandle.Call(handle)
	}
}*/
/**
 * @Description: 获取本地IP 返回切片
 * @return ips
 */
func Getip() (string) {
	netInterfaces, err := net.Interfaces()
	if err != nil {
		fmt.Println("net.Interfaces failed, err:", err.Error())
	}

	for i := 0; i < len(netInterfaces); i++ {
		if (netInterfaces[i].Flags & net.FlagUp) != 0 {
			addrs, _ := netInterfaces[i].Addrs()

			for _, address := range addrs {
				if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
					if ipnet.IP.To4() != nil {
						return ipnet.IP.String()
					}
				}
			}
		}

	}
	return ""
}
/**
 * @Description: 自动访问网址 php.Openurl("https://www.baidu.com")
 * @param uri
 */
func Openurl(url string) {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "cmd"
		args = []string{"/c", "start"}
	case "darwin":
		cmd = "open"
	default:
		cmd = "xdg-open"
	}
	args = append(args, url)
	cmds:=exec.Command(cmd, args...)
	if runtime.GOOS=="windows" {
		//cmds.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	}
	cmds.Start()
}
/**
 * @Description: 发送邮件不使用任何扩展
	from :="logwwwove@qq.com"
	to1:="yobybxy@163.com,18291448834@163.com"
	secret := "abc"
	host :="smtp.qq.com"
	port := 25
	subject:="主题"
	body:="内容是测试"
	err:=php.SendEmail(from,to1,subject,body,secret,host,port)
	php.CheckErr(err)
 * @param from 发送人邮箱
 * @param to1 收件人邮箱,多个用,隔开"yoby21bxy@163.com,182914114811834@163.com"
 * @param subject 标题
 * @param body 内容
 * @param secret 密钥,qq邮箱授权码密码
 * @param host 主机地址
 * @param port 端口25
 * @return err
 */
func SendEmail(from string,to1 string,subject string,body string,secret string,host string,port int)(err error){
	to2:=strings.Split(to1,",")
	to:=to2[0]
	auth := smtp.PlainAuth("", from, secret, host)
	msg := []byte("To: "+to+"\r\n" +
		"Subject: "+subject+"\r\n" +
		"\r\n" +
		body+"\r\n")
	err = smtp.SendMail(host+":"+strconv.Itoa(port), auth, from, to2, msg)
	return err
}
/**
 * @Description: int转换字符串
 * @param i int
 * @return s 字符串
 */
func Int2String(i interface{})(s string){
	ty:=reflect.TypeOf(i).String()
	if ty=="int"{
		ii:=i.(int)
		s=strconv.Itoa(ii)
	}else if ty=="int64"{
		ii:=i.(int64)
		s= strconv.FormatInt(ii, 10)
	}else if ty=="uint64"{
		ii:=i.(uint64)
		s= strconv.FormatUint(ii, 10)
	}
	return s
}
func String2Int(i string,ty string)(s interface{}){
	if ty=="int"{
		s, _ = strconv.Atoi(i)
	}else if ty=="int32"{
		ii,_:= strconv.ParseInt(i, 10, 64)
		s=int32(ii)
	}else if ty=="int64"{
		s,_= strconv.ParseInt(i, 10, 64)
	}else if ty=="uint"{
		s,_= strconv.ParseUint(i, 10, 64)
	}
	return s
}
/**
 * @Description: 浮点数转换字符串
 * @param i 浮点数
 * @param ty 类型 64表示64位浮点数 32表示32位浮点数
 * @return s
 */
func Float2String(i float64,ty int)(s string){
	if ty==64{
		s= strconv.FormatFloat(i, 'E', -1, 64)
	}else{
		s= strconv.FormatFloat(i, 'E', -1, 32)
	}
	return s
}
/**
 * @Description: 字符串转换浮点数
 * @param i 浮点字符串
 * @param ty 32或64浮点
 * @return s
 */
func String2Float(i string,ty int)(s1 interface{}){
	s, _:= strconv.ParseFloat(i, ty)
	if ty==32{
		s1=float32(s)
	}else{
		s1=s
	}
	return s1
}
/**
 * @Description: 压缩文件zip Zip([]string{"./1.txt","qq/"},"./1.zip")
 * @param files 可以是文件或目录
 * @param dest zip文件名包括扩展名
 * @return error
 */
func Zip(files []string, dest string)error{
	d, _ := os.Create(dest)
	defer d.Close()
	w := zip.NewWriter(d)
	defer w.Close()
	for _, file := range files {
		f, err:= os.Open(file)
		if err != nil {
			panic(err)
		}
		defer f.Close()
		err = zips(f, "", w)
		if err != nil {
			return err
		}
	}
	return nil
}
func zips(file *os.File, prefix string, zw *zip.Writer) error {
	info, err := file.Stat()
	if err != nil {
		return err
	}
	if info.IsDir() {
		if len(prefix) == 0 {
			prefix = info.Name()
		} else {
			prefix = prefix + "/" + info.Name()
		}
		fileInfos, err := file.Readdir(-1)
		if err != nil {
			return err
		}
		for _, fi := range fileInfos {
			f, err := os.Open(file.Name() + "/" + fi.Name())
			if err != nil {
				return err
			}
			err = zips(f, prefix, zw)
			if err != nil {
				return err
			}
		}
	} else {
		header, err := zip.FileInfoHeader(info)
		if len(prefix) == 0 {
			header.Name = header.Name
		} else {
			header.Name = prefix + "/" + header.Name
		}
		if err != nil {
			return err
		}
		writer, err := zw.CreateHeader(header)
		if err != nil {
			return err
		}
		_, err = io.Copy(writer, file)
		file.Close()
		if err != nil {
			return err
		}
	}
	return nil
}
/**
 * @Description: 解压缩zip Unzip("./1.zip","./ss")
 * @param archive 要解压zip路径
 * @param target 目标文件夹可以生成
 * @return error
 */
func Unzip(archive, target string)error{
	reader, err := zip.OpenReader(archive)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(target, 0755); err != nil {
		return err
	}
	for _, file := range reader.File {
		path := filepath.Join(target, file.Name)
		if file.FileInfo().IsDir() {
			os.MkdirAll(path, file.Mode())
			continue
		}
		dir := filepath.Dir(path)
		if len(dir) > 0 {
			if _, err = os.Stat(dir); os.IsNotExist(err) {
				err = os.MkdirAll(dir, 0755)
				if err != nil {
					return err
				}
			}
		}
		fileReader, err := file.Open()
		if err != nil {
			return err
		}
		defer fileReader.Close()

		targetFile, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.Mode())
		if err != nil {
			return err
		}
		defer targetFile.Close()
		if _, err := io.Copy(targetFile, fileReader); err != nil {
			return err
		}
	}
	return nil
}
/**
 * @Description: 随机字符串
 * @param l 指定长度
 * @return string
 */
func  RandomString(l int) string {
	str := "0123456789abcdefghijklmnopqrstuvwxyz"
	bytes := []byte(str)
	result := []byte{}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < l; i++ {
		result = append(result, bytes[r.Intn(len(bytes))])
	}
	return string(result)
}
/**
 * @Description: 随机数字
 * @param width 指定长度
 * @return string
 */
func RandomNumber(width int) string {
	numeric := [10]byte{0,1,2,3,4,5,6,7,8,9}
	r := len(numeric)
	rand.Seed(time.Now().UnixNano())

	var sb strings.Builder
	for i := 0; i < width; i++ {
		fmt.Fprintf(&sb, "%d", numeric[ rand.Intn(r) ])
	}
	return sb.String()
}

/**
 * @Description: 编码成base64
str:="http://www.baidu.com-+_"
str=php.Base64Encode(str,false)
 * @param s 要编码字符串
 * @param isurl 是否url false或true
 * @return s1 字符串
 */
func Base64Encode(s string,isurl bool) (s1 string){
	if isurl==true{
		s1 = base64.URLEncoding.EncodeToString([]byte(s))
	}else{
		s1=base64.StdEncoding.EncodeToString([]byte(s))
	}
	return s1
}
/**
 * @Description: 解码base64 str=php.Base64Decode(str,false)
 * @param s 要解码字符串
 * @param isurl 是否url
 * @return string
 */
func Base64Decode(s string,isurl bool) (string){
	var s1 []byte
	x := len(s) * 3 % 4
	switch {
	case x == 2:
		s += "=="
	case x == 1:
		s += "="
	}
		if isurl==true{
		s1,_= base64.URLEncoding.DecodeString(s)
	}else{
		s1,_=base64.StdEncoding.DecodeString(s)
	}
	return string(s1)
}
/**
 * @Description: 解码emoji网页上显示
 * @param s
 * @return string
 */
func EmojiDecode(s string) string {
	re := regexp.MustCompile("\\[[\\\\u0-9a-zA-Z]+\\]")
	//提取emoji数据表达式
	reg := regexp.MustCompile("\\[\\\\u|]")
	src := re.FindAllString(s, -1)
	for i := 0; i < len(src); i++ {
		e := reg.ReplaceAllString(src[i], "")
		p, err := strconv.ParseInt(e, 16, 32)
		if err == nil {
			s = strings.Replace(s, src[i], string(rune(p)), -1)
		}
	}
	return s
}
/**
 * @Description: 编码emoji成unicode
 * @param s
 * @return string
 */
func EmojiEncode(s string) string {
	ret := ""
	rs := []rune(s)
	for i := 0; i < len(rs); i++ {
		if len(string(rs[i])) == 4 {
			u := `[\u` + strconv.FormatInt(int64(rs[i]), 16) + `]`
			ret += u

		} else {
			ret += string(rs[i])
		}
	}
	return ret
}
/**
 * @Description: 判断是否微信浏览器,必须启动http使用
 * @param r *http.Request
 * @return bool
 */
func IsWeixin(r *http.Request)bool{
	if strings.Index(r.UserAgent(),"icroMessenger")==-1{
		return false
	}else{
		return true
	}
}
/**
 * @Description: 隐藏手机中间四位或电话中间四位
 * @param phone 手机号
 * @return str
 */
func HideTel(phone string) (str string) {
	re := regexp.MustCompile(`0[0-9]{2,3}[-]?[2-9][0-9]{6,7}[-]?[0-9]?`)
	is := re.Match([]byte(phone))
	if is == true {
		re = regexp.MustCompile(`(0[0-9]{2,3}[-]?[2-9])[0-9]{3,4}([0-9]{3}[-]?[0-9]?)`)
		str = re.ReplaceAllString(phone, "$1****$2")
	} else {
		re = regexp.MustCompile(`(1[34578]{1}[0-9])[0-9]{4}([0-9]{4})`)
		str = re.ReplaceAllString(phone, "$1****$2")
	}
	return
}
/**
 * @Description: emoji编码成实体直接输出不需要转码
 * @param s
 * @return ss
 */
func Emoji(s string) (ss string) {
	s1 := strings.Split(s, "")
	for _, v := range s1 {
		if len(v) >= 4 {
			vv := []rune(v)
			k := int(vv[0])
			ss += "&#" + strconv.Itoa(k) + ";"
		} else {
			ss += v
		}
	}
	return
}
/**
 * @Description: 支持中英文字符串截取
 * @param s 原字符串
 * @param begin 开始位置
 * @param leng 长度
 * @return str
 */
func Cutstr(s string,begin int,leng int)(str string){
	s0 := []rune(s)
	l:=len(s0)
	if begin<0{
		begin=0
	}
	if begin>=l{
		begin=l
	}
	end:=begin+leng
	if end>l{
		end=l
	}
	str=string(s0[begin:end])
	return
}
/**
 * @Description: 对称加密解密函数
 * @param text 要加密或解密字符串
 * @param false解码 true加密
密钥 字符串
s:=php.Authcode("1234==+wo我们",true,"abc")
s=php.Authcode(s,false,"abc")
 * @return string
 */
func Authcode(text string, params ...interface{}) string {
	l := len(params)

	isEncode := false
	key := ""
	expiry := 0
	cKeyLen := 4

	if l > 0 {
		isEncode = params[0].(bool)
	}

	if l > 1 {
		key = params[1].(string)
	}

	if l > 2 {
		expiry = params[2].(int)
		if expiry < 0 {
			expiry = 0
		}
	}

	if l > 3 {
		cKeyLen = params[3].(int)
		if cKeyLen < 0 {
			cKeyLen = 0
		}
	}
	if cKeyLen > 32 {
		cKeyLen = 32
	}

	timestamp := time.Now().Unix()

	// md5加密key
	mKey := Md5(key)

	// 参与加密的
	keyA := Md5(mKey[0:16])
	// 用于验证数据有效性的
	keyB := Md5(mKey[16:])
	// 动态部分
	var keyC string
	if cKeyLen > 0 {
		if isEncode {
			// 加密的时候，动态获取一个秘钥
			keyC = Md5(fmt.Sprint(timestamp))[32-cKeyLen:]
		} else {
			// 解密的时候从头部获取动态秘钥部分
			keyC = text[0:cKeyLen]
		}
	}

	// 加入了动态的秘钥
	cryptKey := keyA + Md5(keyA+keyC)
	// 秘钥长度
	keyLen := len(cryptKey)
	if isEncode {
		// 加密 前10位是过期验证字符串 10-26位字符串验证
		var d int64
		if expiry > 0 {
			d = timestamp + int64(expiry)
		}
		text = fmt.Sprintf("%010d%s%s", d, Md5(text + keyB)[0:16], text)
	} else {
		// 解密
		text = string(Base64Decode(text[cKeyLen:],false))
	}

	// 字符串长度
	textLen := len(text)
	if textLen <= 0 {
		return ""
	}

	// 密匙簿
	box := RangeArray(0, 256)

	// 对称算法
	var rndKey []int
	cryptKeyB := []byte(cryptKey)
	for i := 0; i < 256; i++ {
		pos := i % keyLen
		rndKey = append(rndKey, int(cryptKeyB[pos]))
	}

	j := 0
	for i := 0; i < 256; i++ {
		j = (j + box[i] + rndKey[i]) % 256
		box[i], box[j] = box[j], box[i]
	}

	textB := []byte(text)
	a := 0
	j = 0
	var result []byte
	for i := 0; i < textLen; i++ {
		a = (a + 1) % 256
		j = (j + box[a]) % 256
		box[a], box[j] = box[j], box[a]
		result = append(result, byte(int(textB[i])^(box[(box[a]+box[j])%256])))
	}

	if isEncode {
		return keyC + strings.Replace(Base64Encode(string(result),false), "=", "", -1)
	}

	// 获取前10位，判断过期时间
	d, _ := strconv.ParseInt(string(result[0:10]), 10, 0)
	if (d == 0 || d-timestamp > 0) && string(result[10:26]) == Md5(string(result[26:]) + keyB)[0:16] {
		return string(result[26:])
	}

	return ""
}
/**
 * @Description: 生成序列数组
 * @param m 开始值
 * @param n 结束值
 * @return slice [0 1 2 3 4 5 6 7 8 9]
 */
func RangeArray(m, n int) (b []int) {
	if m >= n || m < 0 {
		return b
	}

	c := make([]int, 0, n-m)
	for i := m; i < n; i++ {
		c = append(c, i)
	}

	return c
}
/**
 * @Description: 生成随机颜色
 * @return string
 */
func RandColor()string{
	str:="abcdef0123456789"
	var s string
	for i:=0;i<6;i++{
		n:=MtRand(0,15)
		time.Sleep(1)
		s+=Cutstr(str,n,1)
	}
	return "#"+s
}
/**
 * @Description: 图片转换成base64
filename:="1.jpg"
s:=php.Img2Base64(filename)
 * @param filename
 * @return s
 */
func Img2Base64(filename string)(s string){
	ext:= filepath.Ext(filename)
	ext=strings.TrimLeft(ext,".")
	srcByte, _ := ioutil.ReadFile(filename)
	s=Base64Encode(string(srcByte),false)
	s="data:image/"+ext+";base64,"+s;
	return
}
/**
 * @Description: base64还原成图片
 * @param path 当前 . qq/ss 最后不要带/
 * @param data 上传的base64
 * @return ps 路径
 */
func Base642Img(path,data string)(ps string){
	re := regexp.MustCompile(`^(data:\s*image\/(\w+);base64,)`)
	r:=re.FindStringSubmatch(data)
	ext:=	r[2]
	bs:=strings.Replace(data,r[1],"",-1)
	CreateDir(path)
	ps=path+"/"+Sha1(data)+"."+ext
	bs = Base64Decode(bs,false)
	ioutil.WriteFile(ps, []byte(bs), 0666)
	return ps
}
/**
 * @Description: 中文字符串长度
 * @param str
 * @return int
 */
func StringLen(str string) int {
	return utf8.RuneCountInString(str)
}
/**
 * @Description: html字符串转换实体
 * @param s
 * @return string
 */
func HtmlEncode(s string)string{
	return html.EscapeString(s)
}
/**
 * @Description: html实体字符串还原
 * @param s
 * @return string
 */
func HtmlDecode(s string)string{
	return html.UnescapeString(s)
}
/**
 * @Description: 网址编码
 * @param str
 * @return string
 */
func UrlEncode(str string) string {
	return url.QueryEscape(str)
}

/**
 * @Description: 网址解码
 * @param str
 * @return string
 * @return error
 */
func UrlDecode(str string) (string, error) {
	return url.QueryUnescape(str)
}
//判断是否gbk编码,需要先判断是否utf8才可以
func Isgbk(s string) bool {
	if Isutf8(s){
		return false
	}
	data:=[]byte(s)
	length := len(data)
	var i int = 0
	for i < length {
		//fmt.Printf("for %x\n", data[i])
		if data[i] <= 0xff {
			//编码小于等于127,只有一个字节的编码，兼容ASCII吗
			i++
			continue
		} else {
			//大于127的使用双字节编码
			if  data[i] >= 0x81 &&
				data[i] <= 0xfe &&
				data[i + 1] >= 0x40 &&
				data[i + 1] <= 0xfe &&
				data[i + 1] != 0xf7 {
				i += 2
				continue
			} else {
				return false
			}
		}
	}
	return true
}
//是否utf8
func Isutf8(s string)bool{
	return utf8.ValidString(s)
}
/**
 * @Description: GET请求,支持gzip
 * @param u 网址
 * @return string
 */
func Get(u string)string{
	rs,_:=http.Get(u)
	defer rs.Body.Close()
	body, _ := io.ReadAll(rs.Body)
t:=string(body)
	if Isgbk(t){
		return Gbk2Utf8(t)
	}
	return t
}
//table转换成数组
func TableArr(s string)[][]string{
	re := regexp.MustCompile("<table[^>]*?>")
	s=re.ReplaceAllString(s, "")
	re = regexp.MustCompile("<tbody[^>]*?>")
	s=re.ReplaceAllString(s, "")
	re = regexp.MustCompile("<tr[^>]*?>")
	s=re.ReplaceAllString(s, "")
	re = regexp.MustCompile("<td[^>]*?>")
	s=re.ReplaceAllString(s, "")
	s=strings.Replace(s,"</tr>","{tr}",-1)
	s=strings.Replace(s,"</td>","{td}",-1)
	re = regexp.MustCompile("<[/!]*?[^<>]*?>")
	s=re.ReplaceAllString(s, "")
	re = regexp.MustCompile("([rn])[s]+")
	s=re.ReplaceAllString(s, "")
	re = regexp.MustCompile("&nbsp;")
	s=re.ReplaceAllString(s, "")
	re = regexp.MustCompile("</tbody>")
	s=re.ReplaceAllString(s, "")
	re = regexp.MustCompile("</table>")
	s=re.ReplaceAllString(s, "")
	re = regexp.MustCompile(`\s{2,}`)
	s=re.ReplaceAllString(s, "")
	s=strings.Replace(s," ","",-1)
	s=strings.Replace(s,"	","",-1)
	s=strings.Replace(s,"\r","",-1)
	s=strings.Replace(s,"\t","",-1)
	s=strings.Replace(s,"\n","",-1)
arr:=strings.Split(s,"{tr}")
arr=arr[:len(arr)-1]
var arr1 [][]string
	for _, v := range arr {
		arr2:=strings.Split(v,"{td}")
		arr2=arr2[:len(arr2)-1]
		arr1=append(arr1,arr2)
	}
	return arr1
}

var aes128=[]byte{0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f}
var aes192=[]byte{0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
}
var aes256=[]byte{0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
}
/**
 * @Description: Aes加密
 * @param text
 * @param key ,分别代表AES-128, AES-192和 AES-256
 * @return string
 * @return error
 */
func AesEn(text string, k string) (string, error) {
	var key []byte
	switch k {
	case "aes128":
		key=aes128
	case "aes192":
		key=aes192
	case "aes256":
		key=aes256
	}
	var iv = key[:aes.BlockSize]
	encrypted := make([]byte, len(text))
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	encrypter := cipher.NewCFBEncrypter(block, iv)
	encrypter.XORKeyStream(encrypted, []byte(text))
	return hex.EncodeToString(encrypted), nil
}
//aes解密 支持aes128 aes192 aes256
func AesDe(encrypted string, k string) (string, error) {
	var key []byte
	switch k {
	case "aes128":
		key=aes128
	case "aes192":
		key=aes192
	case "aes256":
		key=aes256
	}
	var err error
	defer func() {
		if e := recover(); e != nil {
			err = e.(error)
		}
	}()
	src, err := hex.DecodeString(encrypted)
	if err != nil {
		return "", err
	}
	var iv = key[:aes.BlockSize]
	decrypted := make([]byte, len(src))
	var block cipher.Block
	block, err = aes.NewCipher([]byte(key))
	if err != nil {
		return "", err
	}
	decrypter := cipher.NewCFBDecrypter(block, iv)
	decrypter.XORKeyStream(decrypted, src)
	return string(decrypted), nil
}
//根据年月日判断星期 2021-03-17
func GetWeekday(ri string)string{
	var weekday = [7]string{"周日", "周一", "周二", "周三", "周四", "周五", "周六"}
	t:=Timestr2Time(ri+" 00:00:00")
	n:=int(t.Weekday())
	return weekday[n]
}