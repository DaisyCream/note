#DOM扩展

## 选择符API

### querySelector()方法

- querySelector方法接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到，则返回null；

- 通过document类型调用querySelector方法时，会在文档元素的范围内查找匹配的元素。而通过element类型调用querySelector方法时，会在该元素后代元素的范围内查找匹配的元素。

```javascript
var body = document.querySelector('body');
var myDiv = document.querySelector("#myDiv");
var seleted = document.querySelector(".selector");
var img = document.body.querySelector("img.button");
```

### matchsSelector()方法

- 为element类型新增了一个方法matchsSelector，这个方法接受一个参数，即css选择符，如果调用元素与该选择符匹配，返回true，否则，返回false；

```javascript
if(document.body.matchsSelector("body.page1")){
	//true
}
```

- 在取得某个元素引用的情况下,使用这个方法能够方便地检测它是否会被 querySelector()或 querySelectorAll()方法返回

```javascript
function matchsSelector(element, selector){
		if(element.macthsSelector){
			return element.macthSelector(selector);
		}else if (element.msMatchesSelector){            return element.msMatchesSelector(selector);        } else if (element.mozMatchesSelector){            return element.mozMatchesSelector(selector);        } else if (element.webkitMatchesSelector){            return element.webkitMatchesSelector(selector);        } else {            throw new Error("Not supported.");        }
}

if(matchsSelector(document.body, "body.page1"));

```

##元素遍历

- 对于元素间的空格，IE9之前版本不会返回文本节点，而其他浏览器会返回文本节点，这样就导致了ChildNodes和firstChild等属性行为不一致

- childElementCount：返回子元素的个数（不包括文本节点和注释）；
- firstElementChild：指向第一个子元素，firstChild的元素版；
- lastElementCount：返回最后一个子元素，lasyChild的元素版；
- previousElementSibling：指向前一个同辈元素，prebiousSibling的元素版；
- nextElementSibling：指向后一个同辈元素，nextSbiling的元素版；


```javascript
	var i,
		len,
		child = element.firstElementChild;
		while(child != element.lastElementChild){
			processChild(child);
			child = child.nextElementSibling;
		}


```

## HTML5

### 与类相关的扩充

- **getElementByClassName()方法**

- **classList属性**

[地址](http://www.zhangxinxu.com/wordpress/2013/07/domtokenlist-html5-dom-classlist-%E7%B1%BB%E5%90%8D/)

```javascript
<div class="bd user disable"></div>

var className = div.classNames.split(/\s+/);

//删除“user”类。
var pos = -1,
	i,
	len;

for(i=0;len = classNames.lengthl;i < len; i++){
	if(classNames[i] == "user"){
		pos = i;
		break;
	}
}

classNames.splice(i, 1);

div.className = classNames.join(" ");

```

- classList属性
- add(value):将给定的字符串值添加到列表中。如果值已经存在,就不添加了
- contains(value):表示列表中是否存在给定的值,如果存在则返回 true,否则返回 false
- remove(value):从列表中删除给定的字符串
- taggle(value):如果列表中已经存在给定的值,删除它;如果列表中没有给定的值,添加它。

```javascript
div.classList.remove("user");

div.classList.add("current");
div classList.toggle("user");

for(var i=0,len=div.classList.length; i < len; i++){
	doSomething(div.classList[i]);
}
```


```javascript
DOMTokenList.prototype.adds = function(tokens){
	tokens.split(' ').foreach(function(token){
		this.add(token);
	}).bind(this);
	return this;
}

var clicks = document.body.classList;
client.add("child child2 child3").toString();//"a b c child1 child2 child3"
```

###焦点管理

- document.activeElement属性，这个属性始终会引用DOM中当前获得了焦点的元素。元素获得焦点的方式有页面加载，用户输入(通常是按下tab键)和代码中调用focus方法

```javascript
var button = document.getElementById("myButton");
button.focus();
console.log(document.activeElement === button);//true
```

- 默认情况下，文档刚刚加载完时，document.activeElement中保存的是document.body元素的引用，文档加载期间，document.activeElement的值为null；


- document.hasFocus()方法；

```javascript
var button = document.getElementById("myButton");
button.focus();
console.log(document.hasFocus());//true
```

- 通过检测文档是否获得了焦点，可以知道用户 是不是正在与页面交互。

###HTMLDocument的变化

- **1.readyState属性**
- loading：正在加载文档
- complete：已经加载完文档

```javascript
if(document.readyState == "complete"){
	//执行操作
}

```

- **2.兼容模式**
- IE给document添加了一个名为compatMode的属性，在标准模式下，compatMode的值等于“CSS1Compat”，在混杂模式下，document.compatMode的值等于“BackCompat”

```javascript
if(document.compatMode  == "CSS1Compat"){

}else{
	console.log("backCompat");
}

```

- **3.head属性**

```javascript
var head = document.head || document.getElementByTagName('head')[0];

```

- **4.字符集属性**

- html5新增了几个与文档字符集有关的实行，其中，charset属性表示文档中实际使用的字符集，也可以用来指定新的字符，默认情况下，这个属性的值为“UTF-16”，但可以通过<meta>元素，响应头部或这届设置charset属性来修改这个值。

```javascript
console.log(document.charset);//"UTF-16"
document.charset = "UTF-8";
if(document.charset != document.defaultCharset){
	console.log("Custom character set being used");
}

```

- **5.自定义数据属性**

- 添加自定义属性之后，可以通过元素的dataset属性来访问自定义属性的值，dataset实行的值是DOMStringMap的实例，也是名值对。每个data-name形式的属性都会有一个对应的属性，只不过属性名没有data-前缀

```javascript
 <li id="ll" data-myname="wahah">1</li>

var div = document.getElementById('ll');

console.log(div.dataset.myname);wahah
div.dataset.myname = "nishizhu";

console.log(div.dataset.myname);//nishizhu
console.log(div.myname);//undefined

```

### 插入标记

- **1.innerHtml属性**

- 属性返回与调用元素的所有子节点（包括元素，注释和文本节点对应的html标记）；在写模式下，innerHtml会根据指定的值创建新的DOM树，然后这个DOM树会完全替换调用元素原先的所有子节点

- 在写模式下，innerHtml的值会被解析为DOM子树，替换调用元素原来的所有子节点。因为它的值被认为是HTML，所以其中的所有标签都会按照浏览器处理html的方式转化为元素。如果设置的值里面仅是纯文本而没有HTML标签，那么结果就是设置纯文本。

```javascript
div.innerHtml = "Hello World!";//纯文本

div.innerHtml = "Hello & welcome, <b>\"reader\"!</b>"//带有html元素的innerHtml

//以上操作的到的节点为
<div id="content">Hello &amp; welcome, <b>&quot;reader&quot;!</b></div>
```

- 在大多数浏览器中，通过innerHtml插入script元素并不会执行其中的脚本。但必须满足一些条件，一是必须为script元素指定defer属性，二是script元素必须位于“有作用域的元素”之后。

- 如果通过innerHtml插入的字符串开头就是一个无作用域的元素，那么IE会在解析这个字符串先前删除该元素。


```javascript

//以下的代码达不到目的
div.innerHTML = "<script defer>alert('hi');<\/script>"; //无效

div.innerHTML = "_<script defer>alert('hi');<\/script>";div.innerHTML = "<div>&nbsp;</div><script defer>alert('hi');<\/script>";
div.innerHTML = "<input type=\"hidden\"><script defer>alert('hi');<\/script>";

```

-  IE8 及更早版本中,style也是一个“没有作用域的元素”,因此必须像下面这样给它前置 一个“有作用域的元素”

- IE8原生支持toStaticHTML()方法，得到无害处理版本。

- **2.outerHtml属性**

- 在读模式下,outerHTML 返回调用它的元素及所有子节点的 HTML 标签。在写模式下,outerHTML 会根据指定的 HTML 字符串创建新的 DOM 子树,然后用这个 DOM 子树完全替换调用元素。

```javascript
<div id="content">        <p>This is a <strong>paragraph</strong> with a list following it.</p>        <ul>        <li>Item 1</li>        <li>Item 2</li>        <li>Item 3</li></ul> </div>

div.outerHTML = "<p>This is a paragraph</p>"//method1

//method 2
var p = document.createElement('p');
p.appendChild(document.createTextNode('This is a paragraph'));
div.parentNode.replace(p,div);


```

- **3.insertAdjacentHTML属性**

- 它接收两个参数:插入位置和要插入的 HTML 文本。第一个参数必须是下列值之一
- beforebegin:在当前元素之前插入紧邻的一个**同辈**元素
- afterbegin:在当前元素之下插入一个新的子元素或在第一个元素之前插入新的子元素
- beforeend:在当前元素之下插入一个新的子元素或在最后一个元素之后插入新的子元素
- arterend:在当前元素之后插入一个紧邻的**同辈**元素

- **4.内存与性能的问题**

- 假设某个元素有一个事件处理程序(或者引用了一个 JavaScript 对象作为属性),在使用前述某个属性将该元素从文档树中删除后,元素与事件处理程序(或 JavaScript 对象)之间的绑定关系在内存中并没有一并删除。如果这种情况频繁出现,页面占用的内存数量就会明显增加。

- 一般来说,在插入大量新 HTML 标记时,使用 innerHTML 属性与通过多次 DOM 操作先创建节点再指定它们之间的关系相比,效率要高得多。这是因为在设置 innerHTML 或 outerHTML 时,就会创建一个 HTML 解析器。这个解析器是在**浏览器**级别的代码(通常是 C++编写的)基础上运行的,因此比执行 JavaScript 快得多。不可避免地,创建和销毁 HTML 解析器也会带来性能损失,所以最好能够将设置 innerHTML 或 outerHTML 的次数控制在合理的范围内。

```javascript
for(var i=0, len = value.length; i<len;i++){
	ul.innerHtml += "<li>" + values[i] + "</li>";//要避免这种频繁操作!!
}


//每次循环都会访问和设置innerHtml，这样就造成了效率很低，每次都需要创建和销毁html解析器，耗费很多时间

var itemHtml = "";

for(bvar i=0,len = values.length;i<len;i++){
	itemHtml += "<li>" + values[i] + "</li>"
}

ul.innerHtml = itemHtml;

//这个例子的效率要高得多,因为它只对 innerHTML 执行了一次赋值操作。

```

## 专有扩展

### 文档模式

- 文档模式决定你可以用哪些级别的CSS和jsAPI以及如何对待文档类型

```javascript
//知道文档模式的版本号
var mode = document.documentMode

```

### children属性

### contains方法

- 某个节点是不是另一个节点的后代，引入了contains方法。

- 调用contains方法的应该是祖先节点，也就是搜索开始的节点，这个方法接受一个参数，即要检测后代的节点。如果检测的节点是该节点的后代，该方法返回true，否则返回false；

```javascript
//检测body元素是否是html元素的后代
console.log(document.docuemntElement.contains(document.body));//true
```

- **compareDocumentPosition**

- 该方法也能确定节点间的关系，支持这个方法的浏览器有IE9+，ff，safari，opera，chrome。这个方法用于确定两个节点间的关系

- 1：无关（给定的节点不在当前文档中）
- 2：局前（给定的节点在DOM树种位于参考点之前）
- 4：局后（给定的节点在DOM树种位于参考节点之后）
- 8：包含（给定的节点是参考节点的祖先）
- 16：被包含（给定的节点是参考节点的后代）

```javascript
var result = document.docuemntElement.compareDocumentPosition(document.body);
console.log(!!(result & 16));//对掩码16执行按位操作会返回一个非零数值，而两个逻辑非操作符会将该数值转换成为布尔值。

//执行上面的代码后，结果会变成20，因为16和4
```


```javascript
function contains(refNode, otherNode){
	if(typeof refNode.contains == "function" &&
	(!client.engine.webkit || client.engine.webkit >= 522)){
		return refNode.contains(otherNode);
	}else if(typeof refNode.compareDocumentPosition == "function"){
		return !!(rerNode.compareDocumentPosition(otherNode) & 16);
	}else{
		var node = otherNode.parentNode;
		do {
			if(node === refNode){
				return true;
			}else{
				node = node.parentNode;
			}
		}while(node !== null);
		return false;
	}
}

```

### 插入文本

**1.innerText属性**

- 属性中包含所有的文本内容，包括子文档树种的文本。再通过innerText读取值得时候，它会按照由浅到深的顺序，将子文档中的所有文本拼接起来。

```javascript
<div id="content">    <p>This is a <strong>paragraph</strong> with a list following it.</p>    <ul>        <li>Item 1</li>        <li>Item 2</li>        <li>Item 3</li>	</ul>
 </div>

```

用不同浏览器处理空白符的方式不同，因此输出的文本可能不会包含原始html代码中的缩进

innerHtml返回值：
This is a paragraph with a list following it.
Item1
Item2
Item3

- 替换子文本节点，而为了确保只生成一个子文本节点，就要对文本进行HTML编码，利用这一点，可以通过innerText属性过滤掉HTML标签，方法是innerText设置为等于innerText，这样就可以去掉所有HTML标签。

```javascript
div.innerText = div.innerText;
```

- ff不支持innerText，但支持作用类似的textContent属性。下面是兼容性的

- innerText与textContent返回的内容并不完全一样，innerText会忽略行内的样式和脚本，而textContent则会像返回其他文本一样返回行内的样式和脚本代码。避免浏览器兼容问题的最佳途径，就是从不包含行内样式或行内脚本的DOM中读取片段。

```javascript
function getInnerText(element){
	return (typeof element.textContent == "string") ?
	element.textContent : element.innerText;
}

function setInnerText(element, text){
	if(typeof element.textContent == "string"){
		element.content = text;
	}else{
		element.innerText = text;
	}
}

```

**2.outerText属性**

- 在读模式上，除了范围扩大到了包含调用它的节点之外，outerText和innerText基本上没有多大区别。但是在写模式下，outerText就完全不同了，outerText不只是替换调用它的元素的子节点，而是会替换整个元素。

```javascript
div.outerText = "Hello world!"

//上面和下面的
var text = document.createTextNode("Hello world!");
div.parentNode.replaceChild(text, div);

```

- 本质上，新的文本节点会完全取代调用outerText的元素，此后，该元素就从文档中被删除，无法访问。


### 滚动

- srollIntoViewIfNeeded(alignCenter)：只在当前元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做。如果将可选的alignCenter参数设置为true，则表示尽量将元素显示在视口中部。
- scrollByLines：将元素的内容滚动指定的行高。
- scrollByPages：将元素的内容滚动指定的页面高度，具体高度由元素的高度决定。

- scrollIntoView和scrollIntoViewIfNeeded()作用对象是元素的容器，而scrollByLines和scrollByPages影响的则是元素自身

```javascript
//让页面主体滚动5行
document.body.scrollByLines(5);

//在当元素不可见的时候，让它进入浏览器视口。
document.image[0].scrollIntoViewIfNeeded();

//将页面主体往回滚动一页
document.body.scrollByPages(-1);

```

- 由于scrollIntoView是唯一一个所有浏览器都支持的方法，因此还是这个方法最常用。
