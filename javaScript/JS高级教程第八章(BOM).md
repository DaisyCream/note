#JS高级教程第八章(BOM)

##window对象

###全局作用域

- 隐式声明的全局变量和以window作为执行环境的变量可以用delete删除，而var声明的变量不可以用delete删除，原因是var语句添加的window属性有一个名为[[Configurable]]属性值被设置为false；

```javascript
var a = 1;
b = 2;
global.c = 3;

delete a;
delete b;//再次访问时报错，is not undefined
delete c;//再次访问时报错，is not undefined

```
- 尝试未声明的变量会报错，但是可以通过window对象，可以知道某个可能声明未声明的变量是否存在

```javascript
//报错，oldvalue为定义
var newValue = oldValue;

//不会报错，因为这是一次属性查询
var newValue = window.oldValue
```

##窗口

###位置

- screenLeft和screenTop，分别用于表示窗口相对于屏幕左边和上边的位置，FF用screenX和screenY来提供相同的窗口为值信息，safari和chrome也支持这两个属性。在opera中也可以，但是属性不对应，因此不要在opera中使用它们。

```javascript
	window.moveBy(-100,30);
	
	var leftPos = (typeof window.screenLeft == "number")?
	                window.screenLeft : window.screenX;
	var topPos = (typeof window.screenTop == "number")?
	                window.screenTop : window.screenY;
	
	console.log(leftPos);
	console.log(topPos);
```

###大小

- outerWidth,outerHeight：在safari和FF，IE中返回浏览器窗口的本身尺寸，无论是从最外层window还是从某个框架访问

- innerWidth,innerHeight：表示该容器中页面视图区的大小(减去边框宽度)，在chrome中，outerWidth，outHeight与innerWidth，innerHeight返回相同的值，即视口大小而非浏览器窗口大小。

```javascript	
	console.log(window.outerHeight);//不管有没有调试界面，都意识一样的表示浏	览器的高
    console.log(window.innerHeight);//会减去调试界面的高度
    console.log(window.outerWidth);
    console.log(window.innerWidth);
```

- document.docuemntElement.clientWidth,document.documentElement.clientHeight，保存了页面视口的信息，在IE6中，这些属性必须在标准模式下才有效，如果是混杂模式，就必须通过document.body.clientWidth和document.body.clientHeight取得相同信息。可以取得视图窗口的大小


```javascript
	var pageWidth = window.innerWidth;//移动IE不支持
    var pageHeight = window.innerHeight;
    
 	if(typeof pageWidth != "number"){
        if(document.compatMode == "CSS1compat")
        {//兼容模式开启，BackCpmpat兼容模式关闭
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        }
        else{
            pageWidth = document.body.clientWidth;//这个值不会随着窗口的变化而变化
            pageHeight = document.body.clientHeight;
        }
    }
 	
```

- resizeTo()和resizeBy()，前一个接受新窗口的两个参数，后一个接受新窗口和原窗口的宽度和高度只差。在opera和IE7及更高版本就是禁用了


```javascript
	window.resizeTo(100,200);
    console.log(window.outerWidth,window.outerHeight);//100,200
    window.resizeBy(50,100);
    console.log(window.outerWidth,window.outerHeight);//150,300
    window.resizeTo(100,150);
    console.log(window.outerWidth,window.outerHeight);//100,150
```

### location对象

- 它既是window的属性，也是document的属性，所以window.location和document.location引用的是同一个对象，还表现在它将URL解析为独立的片段，让开发人员可以通过不同属性访问这些片段。

href返回当前加载页面完整的URL，而location对象的toString方法也可以返回这个值

- 查询字符串参数

```javascript
var o = {};

    var str = window.location.search?window.location.search.substring(1):"";
    var items = str.split("&");
    for(var i=0;i<items.length;i++){
        var item = items[i].split("=");
        o[item[0]] = item[1];
    }

```

- location.assign(url)

```javascript
	//下列3中调用方法都是一样的，后面2种都会调用location.assign();
	location.assign("http://www.baidu.com");
	location.href = "http://www.baidu.com";
	window.location = "http://www.baidu.com";
```

- 用location通过将hash，search，hostname，pathname和port值应用

```javascript
//假设初始 URL 为 http://www.wrox.com/WileyCDA///将 URL 修改为"http://www.wrox.com/WileyCDA/#section1"location.hash = "#section1";//将 URL 修改为"http://www.wrox.com/WileyCDA/?q=javascript" location.search = "?q=javascript";//将 URL 修改为"http://www.yahoo.com/WileyCDA/" location.hostname = "www.yahoo.com";//将 URL 修改为"http://www.yahoo.com/mydir/" location.pathname = "mydir";//将 URL 修改为"http://www.yahoo.com:8080/WileyCDA/" location.port = 8080;
```
*注意*：每次改变location的值页面都会重新加载

- 通过上面的方式修改URL后，浏览器的历史记录会生成一条新纪录，因此用户通过单机‘后退’按钮都会导航到前一个页面，要禁用这种行为，可以使用replace();

```javascript
<!DOCTYPE html>
<html>
<head>
    <title>You won't be able to get back here</title></head>    <body>    <p>Enjoy this page for a second, because you won't be coming back here.</p>    <script type="text/javascript">￼        setTimeout(function () {            location.replace("http://www.wrox.com/");        }, 1000);    </script></body></html>

```

- window.reload()重新加载当前页面，而且位于reload后面的代码也可能不会执行，这要取决于网络延迟或系统资料原因等因素。


```javascript
location.reload();//重新加载（有可能从缓存中加载）
location.reload(true);//重新加载(从服务器重新加载)
```


```javascript

```


```javascript

```



```javascript

```


```javascript

```


```javascript

```


