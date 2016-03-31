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

- documentElement属性，该属性始终指向HTML页面中的<html>元素

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

