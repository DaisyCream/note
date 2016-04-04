#DOM

##节点层次

###node类型

- 判断是否是元素节点


```javascript
	//因为IE没有公开node的构造函数，因此上面的代码在IE会导致错误
	if(someNode.nodeType == Node.ELEMENT_NODE){	//在IE中无效
		alert("Node is an element");
	}
	
	if(someNode.nodeType == 1){	//适用于所用浏览器
		alert("Node is an element");
	}
```

- nodeName和nodeValue:先检查是否是元素节点值，如果是，nodeName中保存的始终都是元素的标签名，而nodeValue得值始终未null

```javascript
	var l = document.getElementsByTagName('li')[0];
	
	if(l.nodeType == 1){
	    console.log(l.nodeName);//LI
	    console.log(l.nodeValue);//null
	}
```

- 节点关系:每个节点都有一个childNode属性，其中保存着一个NodeList对象。NodeList是一种 类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。请注意,虽然可以通过方括号语法来访问 NodeList 的值,而且这个对象也有 length 属性,但它并不是 Array 的实例。

```javascript
	//在IE8及之前版本中无效
	var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
```

由于IE8及更早版本将NodeLists实现为一个COM对象，而我们不能像使用JS对象那样使用这种对象，因此上面的代码会导致错误，想要在IE中将NodeList转化为数组，必须动手枚举所有成员

```javascript
	function convertToArray(nodes){
		var array = null;
		try{
			array = Arrayprototype.slice.call(nodes, 0);
		}catch(ex){
			for(var i=0, len = nodes.length;i<len;i++){
				array.push(nodes[i]);
			}
		}
		return array;
	}

```

- 所有的节点都有最后一个属性是ownerDocument，该属性指向表示整个文档的文档节点

```javascript
	console.log(u.ownerDocument);//document
```

- 在使用replaceChild()插入一个节点时，该节点的所有关系指针都会从被它替换的节点复制过来，尽管从技术上讲，该替换的节点仍然还在文档中，但它的文档中已经没有了自己的位置了。removeChild()也是，移除的节点仍然为文档所有，只不过在文档中已经没有位置了

- clone：包含深克隆(包含克隆节点和它的所有子节点)和浅克隆(只包含克隆节点)

```javascript
var deepList = u.cloneNode(true);
console.log(deepList.childNodes.length);//13

var shallowList = u.cloneNode(false);
console.log(shallowList.childNodes.length);//0
```

### document类型

- nodeType = 9
- nodeName = "#document"
- nodeValue = null
- parentNode = null
- ownerDocument = null
- 其子节点可能是一个DocumentType，Element，ProcessingInstuction,comment


**1.文档的子节点**

- documentElement属性，该属性始终指向HTML页面中的<html>元素，另一个就是通过childNodes列表访问文档元素，但通过documentElement属性则能更快捷，更直接的访问该元素。

```javascript
//如果存在文档类型声明,会将其错误地解释为一个注释并把它当作 Comment 节点;而 document.doctype 的值始终为 null。
var html = document.documentElement;
var body = document.body;
var doctype = document.doctype;
```

**2.文档信息**

```javascript
	var url = document.URL;
	var domain = document.domain;
	var referrer = document.referrer;
```
- url和domain属性是相互关联的，domain是可以设置的，但由于安全方面的限制，也不能给domain设置任何值。如果URL中包含子域名，p2p.wrox.com，那么就只能将domain设置为wrox.com。不能将这个属性设置为url中不包含的域。

- 当页面中包含来自其他子域的框架和内嵌框架是，能够设置document.domain就非常方便了，由于跨域的安全问题，来自不同子域的页面无法通过js通信，而通过将页面的domain设置为相同的值，就可以互相访问对方包含的js对象了。

**3.查找元素**

- 单选框(radio)：选择相同的name值，使它们位于一个相同的组内，同一组内只能选中一个按钮

- getElementsByName()方法也会返回一个 HTMLCollection。但是,对于这里的单选按钮来说,namedItem()方法则只会取得第一项(因为每一项的 name 特性都相同)。

- HTMLCollection：如果使用的选择元素为elements的话，会自动生成，犹如nodeList一样的东西，还有一个属性叫做nameItem()，这个方法可以通过元素的name特性取得集合中的项，也可以用方括号

**4.特殊集合**

- document.anchors,包含文档中所有带 name 特性的<a>元素;

- document.forms,包含文档中所有的<form>元素,与document.getElementsByTagName("form")得到的结果相同;
 **5.DOM一致性检测**
 
 - document.implementation.hasFeature('dom功能','版本号');


 **6.文档写入**
 
 - open,close,write,writeLn


### Element类型
 
- nodeType的值为1
- nodeName的值为元素的标签名
- nodeValue的值为null
- parentNode可能是Document或者element
- 访问元素的值就直接tagName(tagName == nodeName)

```javascript
	if(element.tagName.toLowerCase() == 'div'){
		这样就好，适用于所有文档（XML,HTML）
	}

```

- **1.HTML元素**

- 直接继承了Element并且添加了一些属性

- 拥有id,title,dir,className(与元素class特性对应，即为元素指定的CSS类，没有将这个属性命名为class，是因为ES中的保留字)

- 并不是对所有属性的修改都会在页面中直观的表现出来，对ID或lang的修改对用户而言是透明不可见的，而对title的修改只有鼠标移动到这个元素之才会显示出来。

- **2.取得特性**

- getAttribute的特性名与实际的特性名相同，因此想要得到class的值，应该传入“class”而不是“className”，后者只有在通过对象属性访问特性时才用。如果给定名称的特性不存在，getAttribute返回null；也可以有自定义属性，自定义属性也要加上_data前缀以便验证，只有在取得自定义特性值的情况下,才会使用 getAttribute()方法。

```javascript
	<div id="myDiv" my_special = "hello!"></div>
	var value = document.getElementById("myDiv").getAttribute("my_special");
```

- 任何元素的所有特性，也都可以通过DOM元素本身的属性来访问，不过，只有公认的特性才会以属性的形式添加到DOM对象中。

- 有两类特殊的特性，他们虽然有对应的属性名，但属性的值通过getAttribute返回的值并不相同。第一类就是style

style
```javascript
	var ele = document.getElementById('element');
	ele.style;//输出的是一个对象，对象中有style的所有值，包括没有定义过的
	ele.getAttribute('style');//输出的是style的css文本
```

- onclick:通过getAttribute访问，则会返回相应代码的字符串，而在访问属性是，则会返回一个js函数。

onclick
```javascript
	<ul style="color:#000;font-size: 13px" onclick="console.log(1)">
	console.log(ul.onclick);//function onclick(event){console.log(1)}
	console.log(ul.getAttribute('onclick'));//console.log(1)

```

- **3.设置特性**

- 通过这个方法设置的 特性名会被统一转换为小写形式,即"ID"最终会变成"id"。
 
- 因为所有特性都是属性,所以直接给属性赋值可以设置特性的值

```javascript
	div.mycolor = 'red';
	console.log(div.getAttribute('mycolor'));//null(IE除外)
	ul.ss = "wahah";
	console.log(ul.ss);//wahha
	console.log(ul.getAttribute('ss'));//null

```

- **4.attribute**

- Element 类型是使用 attributes 属性的唯一一个 DOM 节点类型。attributes 属性中包含一个NamedNodeMap，与nodeList类似

- getNamedItem(name):返回 nodeName 属性等于 name 的节点
- removeNamedItem(name):从列表中移除 nodeName 属性等于 name 的节点
- setNamedItem(node):向列表中添加节点,以节点的 nodeName 属性为索引
- item(pos):返回位于数字 pos 位置处的节点

```javascript
	var id = element.attribute.getNamedItem('id').nodeValue
	var id = element.attribute['id'].nodeValue;
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




```javascript

```




```javascript

```





```javascript

```

