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

- innerWidth,innerHeight：表示该容器中页面试图区的大小(减去边框宽度)

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


