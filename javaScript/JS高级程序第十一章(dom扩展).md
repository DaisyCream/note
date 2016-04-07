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