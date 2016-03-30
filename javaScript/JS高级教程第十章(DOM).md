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

