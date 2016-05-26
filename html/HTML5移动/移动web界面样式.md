# 移动web界面样式

## 选择器
属性选择器和伪类选择器

### 属性选择器
- 1.完全匹配属性选择器
就是完全匹配字符串

- 2.包含匹配选择器
只要元素中的属性包含有指定的字符串，元素就使用该样式
语法是：[attribute*=value]，attribute属性名，value属性值

```html
<div id="article"></div>
<div id="subarticle"></div>
<style>
	[id*=article]{
		color:red;
	}
</style>
```

- 3.首字符匹配选择器
就是匹配属性值开头字符，只要开头字符符合匹配，则元素使用该样式
语法是：[attribute^=value]

```html
<div id="article"></div>
<div id="article1"></div>
<style>
	[id^=article]{
		color:red;
	}
</style>
```

- 尾字符匹配选择器
匹配属性值结尾字符，只要符合匹配，该元素就使用该样式
语法是：[arrtribute$=value]

```html
<div id="article"></div>
<div id="subarticle"></div>
<style>
	[id^=article]{
		color:red;
	}
</style>
//只有subarticle才会使用样式

```

###伪类选择器

下面这些选择器能运用到andriod和ios平台下web浏览器支持
- first-line伪元素选择器
- first-letter伪元素选择器
- root选择器
- not选择器
- empty选择器
- target选择器


1.before
在某个元素之前插入内容，一般用于清除浮动，支持性IE8+
```style
	元素标签:before{
		content:"插入的内容"
	}
```

2.after
在某个元素之后插入内容，支持性IE8+

3.first-child
指定元素列表中第一个元素的样式

```style
	li:first-child{
		color:red;
	}

```

4.last-child
定元素列表中最后一个元素的样式


5.nth-child,nth-last-child
可以指定元素样式或从后数起某个元素的样式

```style
//指定第2个li元素
li:nth-child(2){}
//指定倒数第2个元素
li:nth-last-child{}
//指定偶数个数的元素
li:nth-child(even){}
//指定奇数个数的元素
li.nth-child(odd){}
```

## 背景

### background-clip
用于确定背景的裁剪区域，IE不支持
background-clip:border-box | padding-box | content-box | no-clip
border-box:从border区域向外裁剪背景
padding-box:从padding区域向外裁剪
content-box:从内容区域向外
no-clip:从border向外裁剪


### background-origin
border值指定从边框的左上角坐标开始，content指定从内容区域的左上角开始，padding值指定从padding区域开始。

```style

```

### gradient

1.线性渐变在Mozilla下的应用
-moz-linear-gradient(top, #cccccc, #000000)

linear-gradient：类型
top or left：水平还是竖直
颜色：从起点到终点颜色

2.线性渐变在webkit下的应用
新式写法：-webkit-linear-gradient(top, #ccc, #000)
老式写法：-wenkit-gradient(linear, conter top,center bottom, from(#ccc), to(#000));

3.线性渐变在opera下的应用
-o-linear-gradient(top,#ccc,#000)；

4.线性渐变在IE下的应用
IE依靠滤镜实现渐变
filter:progid:DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = #ccc, endColorstr = #000);/*IE<9>*/
-ms-filter:"progid:DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = #ccc, endColorstr = #000)";/*IE<8>*/

## media Queries移动设备样式

### viewport

1.定义：虚拟窗口，主要作用是允许开发者定义一个虚拟窗口，并自定义窗口的大小和缩放功能。如果开发者没有定义虚拟窗口，则会有默认的虚拟窗口。

- safari默认值是980px
- andriod 浏览器的默认值是800px
- IE的默认值是974px
- opera的默认值是850px

2.使用：

```html
<meta name="viewport" content = "width = device-width, initscale = 1,user-scalable = 0">
```
初始缩放比例（initscale）为1倍，不允许用户手动缩放（user-scalable）

device-width的表达方式来表示phone屏幕的实际分辨率大小

- maximum-scale：允许用户缩放的最大比例
- minimum-scale：允许用户缩放的最小比例

3.media queries如何工作
当屏幕区域在600-900之间，应该使用样式文件

```html
<link rel="stylesheet"
media = "screen and(min-width:600px) and(max-width:900px)" href = "small.css"/>
```

small.css的文件中对应写法如下
```style
@media screen and(min-width:600px) and(max-width:900px){
	.demo{
		
	}
}

```


也可以判断当前移动设备的方向发生变化时应用该样式

```html
<link rel = "stylesheet" media = "all and(orientation:portrait)" href="portrait.css">
<link rel = "stylesheet" media = "all and(orientation:landscape)" herf = "landscape.css" />

```

4.Media Queries语法总结

- 使用Media Quieries样式模块时，必须用“@media”方式开头
- media_query表示查询关键字，在这里可以使用not和only
- not表示对not后面表达式进行取反
@media not screen and (max-device-width:480px)
- only表示对符合结果的忽略
@media only screen and (max-device-width:480px)
- 对于不支持Media Queries的，但是能够读取Meida type类型的web浏览器，遇到only关键字会忽略这个样式文件

![](/Users/DaisyCream/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/479703843/QQ/Temp.db/108A9D3E-A7C8-4844-ACE5-70FB6739F24F.png)

![](/Users/DaisyCream/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/479703843/QQ/Temp.db/9D683E43-536A-4128-B318-2E3B5E029B0C.png)

- IE9+


5.如果将官方网站移成移动web网站