#offset计算元素的坐标

### OffsetParent

- offsetParent属性返回一个对象的引用，这个对象是距离调用offsetParent的元素最近的（在包含层次中最靠近的），并且是已经进行过CSS定位的容器元素。如果这个容器元素未进行CSS定位，则offsetParent属性的取值为根元素的引用。当容器元素的style.display被设置为“none”时，offsetParent返回null；

```javascript
<script>
	function offset_init(){
		var pElement = document.getElementById("sonObj");
		parentObj = pElement.offsetParent;
		console.log(parentObj);
	}
</script>
<head></head>
<body onload = "offset_init()">
	<div id="parent">
		<p id="sonObj">测试OffsetParent属性</p>
	</div>
<body>

```
测试结果：
ff：“body”
IE7：“body”
opera：“body”

结论：当某个元素及其DOM结构层次中元素都未进行CSS定位时（或者某个元素进行CSS定位时而DOM结构层次中元素都未进行CSS定位时），则这个元素的offsetParent属性取值为根元素



```javascript
<style>
	#parent{
		position:absolute;
		left:25px;
		top:18px;
		border:1px soild blasck;
	}
</style>
<script>
	function offset_init(){
		var pElement = document.getElementById("sonObj");
		parentObj = pElemet.offsetParent;
		console.log(parentObj.tagName);
	}
</script>
<body>
	<div id="parent">div测试代码
		<p id="sonObj">测试OffsetParent属性</p>
	</div>
</body>

```
测试结果：
ff：“div”
IE7：“div”
opera：“div”

结论：当某个父元素进行了CSS定位，则这个元素的 offsetParent属性的取值为其父元素。



```javascript
<style>
	#Grandfather{
		position:relative;
		left:25px;
		top:180px;
		border:1px solid black;
	}
</style>

<script>
	function offset_init(){
		var pElemeent = document.getElementById("sonObj");
		parentObj = pElement.offsetParent;
		console.log(parentObj.tagName);
	}
</script>
<body>
	<h1 id="Grandfather">
		<div id="parent">
			<p id="sonObj">测试OffsetParent属性</p>
		</div>
	</h1>
</body>

```
测试结果：
ff：“H1”
IE7：“H1”
opera：“H1”

结论：当元素某个父元素为进行css定位时，则这个元素的offsetParent属性的取值为在DOM结构层次中距离最近，并且已进行了CSS定位



```javascript
<table width="500", border="0">
	<tr>
		<td id="td1">
			<div id="pObj1">
				<span id="obj1"></span>
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div id="pObj2" style="position:relative">
				<span id="obj2"></span>
			</div>
		</td>
	</tr>
</table>

```
测试结果：
obj1.offsetParent返回td1对象
obj2.offsetParent返回pObj2对象

**结论**：offsetParent不但会找到已经定位的父级元素，而且还会查找类型为TD和TABLE的父级元素，只要找到这三种元素的任何一种元素将返回此元素，否则返回body对象。



###offset计算位置

```javascript

	function getDocumentLeft(target){
		var left = target.offsetLeft;
		var current = target.offsetParent;
		while(current!=null){
			left += current.offsetParent;
			curr = current.offsetParent;
		}
		return left;
	}
	
	function getDocumentRight(target){
		var top = target.offsetTop;
		var current = target.offsetParent;
		while(current!=null){
			top += current.offsetTop;
			current = current.offsetParent
		}
		return top;
	}


```





```javascript

```
