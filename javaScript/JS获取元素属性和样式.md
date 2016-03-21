#JS获取元素属性和样式

## 样式

### 定义：获取当前元素的所有最终使用的css属性，返回一个css样式声明对象，*只读*

```javascript
	var style = window.getComputedStyle("元素", "伪类");
	//如果没有伪类则第二个参数为null
```

### 和style区别

- 只读与可写：`getComputedStyle`是只可读，而`element.style`能读能写

- `getComputedStyle`方法获取的是最终应用在元素上的所有css对象，而`element.style`只会显示style属性中的CSS样式，对于一个光秃秃的<p>，style就什么都返回不会来


### IE中的currentStyle

- element.currentStyle :返回元素当前的最终属性Css值。

```javascript
	var s = element.currentStyle?	element.currentStyle:window.getComputedStyle(s,null);

```

## 属性

### getPropertyValue

```javascript
	window.getComputedStyle(element, null).getPropertyValue('float');


```

### 和getAttribute方法的区别

- 在老的IE提供了getAttribute方法，访问css对象的属性，需要驼峰式写法。

- getAttribute是查询元素节点的属性，dom树分别有元素，属性节点和文本节点等，它可以位于这个元素节点查到元素节点的子节点

```javascript
var a = document.getElementById('a');
var b = document.getElementById('b');

function chevckStyle(target, att){

}



var objStyle = a.currentStyle?
    a.currentStyle:
    window.getComputedStyle(a,null);

console.log(objStyle.getPropertyValue('border'));//1px solid rgb(0, 0, 0)

console.log(a.getAttribute('style'));//border: 1px solid #000

```































