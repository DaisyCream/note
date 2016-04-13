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

- document.anchors,包含文档中所有带 name 特性的a元素。

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

- IE7 及更早的版本会返回 HTML 元素中所有可能的特性,包括没有指定的特性，每个特性节点都有一个名为 specified 的属性,这个属性的值如果为 true,则意味着要么是在 HTML 中指定了相应特性,要么是通过 setAttribute()方法设置了该特性。在 IE 中,所有未设置过的特性的该属性值都为 false。

```javascript
	function outputAttributes(element){
    var pairs = new Array(),
        attrName,
        attrValue,
        i,
        len;

    for(i=0,len=element.length;i<len;i++){
        attrName = element.attribute.nodeName;
        attrValue = element.attribute.nodeValue;
        if(element.attribute.specified){//IE浏览器会把自身加的东西
            pairs.push(attrName + "=\"" + attrValue +"\"");
        }
    }
    return pairs.join(" ");
}

```

- **5.创建元素**

- 下面这种写法有助于避开IE7及更早版本中动态创建元素的某些问题
- 不能通过表单reset()方法重设动态创建的<input>元素
- 动态创建的type特性值为"reset"的<button>元素重设不了表单
- 动态创建的一批name相同的单选按钮彼此毫无关系，动态创建的一批这种单选按钮之间却没有这种关系

```javascript
	//但是,由于这样的用法要求使用浏览器检测,因此我们 建议只在需要避开 IE 及更早版本中上述某个问题的情况下使用
	var div = document.createElement("<fiv id=\"myNewDiv\"> class=\"box\"></div>")
```

- **6.元素的子节点**

- 如果用IE来解释下列代码，那么ul元素会包含3个子节点，分别是3个li.但是其他浏览器，ul元素都会有7个元素，3个li元素，4个文本节点

```javascript
<ul id="myList">        <li>Item 1</li>        <li>Item 2</li>        <li>Item 3</li></ul>
//包含3个<li>，不论任何浏览器
<ul id="myList"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
```


```javascript
	for(var i=0,len=element.childNodes.length;i<len;i++){
		if(element.childNodes[i].nodeType == 1){
			//执行某些操作
		}
	}
```

### text类型

- nodeType的值为3
- nodeName 的值为"#text"
- nodeValue 的值为节点所包含的文本
- parentNode 是一个 Element
- splitText(offset)：从 offset 指定的位置将当前文本节点分成两个文本节点

- 一般情况下,每个元素只有一个文本子节点。不过,在某些情况下也可能包含多个文本子节点,如下面的例子所示,如果两个文本节点是相邻的同胞节点,那么这两个节点中的文本就会连起来显示,中间不会有空格。

```javascript
var element = document.createElement("div");
element,className = "message";
var textNode = document.createTextNode("Hello World!");
element.appendChild(textNode);

var anotherTextNode = document.createTextNode("Yippee!");
elemment.appendChild(anotherTextNode);

document.body.appendChild(element);
```

- **2.规范文本节点**

- 会将element的文本节点合为一个，中间不会有空格

```javascript
element.normalize();
```

- **3.分隔文本节点**

- text类型提供了一个作用于normalize相反的方法，splitText，会将一个文本节点分为两个文本节点

### comment类型

- nodeType的值为8
- nodeName的值为“#comment”
- nodeValue的值是注释的内容
- parentNode可能是Document或Element
- 没有子节点

```javascript
var comment = document.createComment("A comment ");
```

### DocumentType类型

- 仅有Firefox，Safari和Opear支持它，documentType包含着与文档的doctype有关的消息


### DocumentFragment类型

- DOM规定文档片段是一种“轻量级”的文档，但是他在文档中没有对应任何标记，可以包含和控制节点，但不会像完整的文档那样占用额外资源，使用document.createDocumentFragment方法；

- 如果我们逐个在文档树中添加列表项，将会导致浏览器反复渲染呈现新消息。为了避免这个问题，可以像下面这样使用一个文档片段来保存创建的列表项，然后再一次性将它们添加到文档中。

```javascript

var fragment = document.createDocumentFragment();
var ul = document.getElementById('myList');
var li = null;

for(var i=0;i<3;i++){
	li = document.createElement('li');
	li.appendChild(document.createTextNode("Item " + (i+1)));
	fragment.appendChild(li);
}

ul.appendChild(fragment);

```

### Attr类型

```javascript
	var attr = document.createAttribute("align");
	attr.value = "left";
	element.setAttributeNode(attr);
	console.log(element.attributes["align"].value);//left
	console.log(element.getAttributeNode('align').value);//left
	console.log(element.getAttribute('align'));//left

```


## DOM操作技术

### 动态脚本



```javascript
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = 'client.js';
	document.body.appendChild(script);
```


```javascript
function loadScript(url){
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.url = url;
	document.body.appendChild(script);
}
```

- IE中将script视为一个特殊元素，不允许DOM访问其子节点，不过，可以使用script元素的text属性来指定js代码，像下面的例子这样；

```javascript
var script = document.createElement('script');
script.type = "text/javasctipt";
var code = "function sayHi(){alert("Hi!")}";

try{
	script.appendChild(document.createTextNode(code));
}catch(ex){
	script.text = code;
}

```

### 动态样式

- IE中将style和script视为一类特殊元素，不允许DOM访问其子节点，不过，可以使用style元素的cssText属性来指定js代码，像下面的例子这样；


- 如果专门针对 IE 编写代码,务必小心使用 styleSheet.cssText 属性。在重用 5 同一个style元素并再次设置这个属性时,有可能会导致浏览器崩溃。同样,将cssText 属性设置为空字符串也可能导致浏览器崩溃。

```javascript

	var style = document.createElement('style');
	style.type = "text/css";
	try{
		style.appendChild(document.createTextNode("body{background-color:red}"));
	}catch(ex){
		style.styleSheet.cssText = "body{background-color:red}"
	}

```

### 使用nodeList

- nodeList，nodeNameMap和HTMLCollection都是动态的，每当文档结构发生变化是，它们都会得到更新。因此，它们始终都会保存最新，最准确的信息。

```javascript
//这是个无限循环的例子，因为一直添加div元素，所以i和divs的length永远不可能相等
var divs = document.getElementName('div');
	i;
	div;
	
for(i=0;i<divs;length;i++){
	div = document.createElement('div');
	document.body.appendChild(div);
}
```

- 如果想要迭代一个nodeList，最好使用的是length属性初始化第二个变量，然后将迭代器与该变量进行比较

```javascript

//因为每次访问 NodeList,都会运行一次基于文 档的查询

for(i=0,len=divs.length;i<len;i++){
	div = document.createElement('div');
	document.body.appendChild(div);
}

```

### 小结

- 最基本的节点类型是 Node,用于抽象地表示文档中一个独立的部分;所有其他类型都继承自Node。

