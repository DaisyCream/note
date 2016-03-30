# 客户端检测

## 1.能力检测

- 要理解能力检测,首先必须理解两个重要的概念。如前所述,第一个概念就是先检测达成目的的最常 用的特性。

```javascript
	function getElement(id){
		if(document.getElementById){
			return document.getElementById(id);
		}else if(document.all){
			return document.add[id];
		}else{
			throw new Error("No way to retrieve element!");
		}
	}
```


```javascript
	function isHostMethod(object, property){
		var t = typeof object[property];
		return t == 'function' || (!!(t=='object'&&object[property]))||
		t == 'unknown'
	}

```

- *在决定使用哪种客户端检测方法时,一般应优先考虑使用能力检测。怪癖检测是确定应该如何处理 代码的第二选择。而用户代理检测则是客户端检测的最后一种方案,因为这种方法对用户代理字符串具 有很强的依赖性。*