# JSON和JSONP

## JSON

### json是文本数据交换的格式

### 优点

- 属于纯文本，跨平台传递极其简单

- java原生支持，后台语言几乎全部支持

- 轻量级数据格式，特别适合互联网传递

- 可读性较强

- 容易编写和解析，当然前提是你要知道数据结构

### 代码

```javascript
{
	people:[
		{"name": "nihao", "age": 10},
		{"name": "yangli", "age": 12}	
	]
}
```

## JSONP

### JSONP是一种跨域数据交互协议

### 为何跨域
 
- Ajax直接请求普通文件存在跨域无权访问的问题，不管是静态页面还是动态网页，只要是跨域请求，一律不准

- web调用js文件是则不受跨域的影响（凡是拥有src这个属性的标签都可以跨域，比如<script>,<img>,<iframe>）;

- 如果想通过纯web端(activeX控件，服务器代理，websocket不算)，跨域访问数据只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件中，供用户调用和进一步的处理。

- 恰好我们有一种叫做JSON的纯字符格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端里可以随心所欲的处理这种格式的数据。

- web端用调用脚本一模一样的方式，来调用跨域服务器上的动态生成的js文件（一般以JSON为后缀），目的就在把客户端需要的数据装入进去。

- 为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务器，然后服务器返回数据时，会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意指定自己的函数来自动返回数据了。

jsonp的客户端具体实现：

### example1

远程服务器remotesever.com根目录下有个remote.js文件代码如下：

```javascript
	alert("我是远程文件");
```
本地服务器localserver.com下有个jsonp.html文件代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="http://remoteserver.com/remote.js"></script>
</head>
<body>
</body>
</html>
```
这样会弹出一个提示窗口，显示跨域成功

### example2

本地服务器localserver.com下有个jsonp.html文件代码如下：

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script>
        var localHandler = function(data){
            alert('我是本地函数，可以被跨域的' +
                    'remote.js文件调用，远程js带来的' +
                    '数据是：' + data.result);
        }
    </script>
    <script src="http://remoteserver.com/remote.js"></script>
</head>
<body>
</body>
</html>

```

remote.js文件代码如下

```javascript
	localHandler({"result":""我是远程js带来的数据});
	
```

### example3

我们看到调用的URL传递了一个code参数，告诉服务器我需要查询的是CA1998航班的信息，而callback参数则告诉服务器，本地函数叫做fightHandler

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script>
        var flightHandler = function(data) {
            alert('你查询的航班结果是：票价 ' +
                    data.price + ' 元，' + '余票 '
                    + data.tickets + ' 张。');
        };

        var url = "http://flightQuert.com/jsonp/flightResult.aspx?"
        + "code= CA1998&callback = flightHandler"

        var script = document.createElement("script");
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    </script>
</head>
<body>

</body>
</html>

```

```javascript
flightHandler({
    "code": "CA1998",
    "price": 1780,
    "tickets": 5
});
```





































