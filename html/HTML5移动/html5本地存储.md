#html5本地存储

##localStorage

###生命周期
一般情况下是永久保存的，即使关闭当前web浏览器后重新启动，数据仍然存在，知道用户或程序明确指定删除

###安全性
localStorage是域内安全的，任何在该域内的所有页面，都可以访问localStorage数据。但是限制于不同浏览器和不同移动设备

###应用

```javascript

localStorage.setItem("userData", JSON.stringify(userData));

var newUserData = JSON.parse(localStorage.getItem("userData"));

localStorage.removeItem("userData");

console.log(newUserData);

```



```javascript
var userData = {
	name : "Sankyu Name",
	account : "sankyu",
	level : 1,
	disabled : true
}

localStorage.setItem("userData", JSON.stringify(userData));

var userData = JSON.parse(localStorage.getItem("userData"));

userData.name = "new Sankyu Name";

JSON.parse(localStorage.getItem("userData")).name = "new Sankyu Name";

//new Sankyu Name
console.log(userData.name);

//Sankyu Name
console.log(JSON.parse(localStorage.getItem("userData")).name);

```

结论：第二次输出没有像预期中的修改new Sankyu Name的值。因此，虽然代码中通过localStorage存储了JSON格式的数据，但是无法直接通过点语法等方式去修改JSON 的数据，而且将JSON数据赋给一个新变量并修改其中的数据后，也么有localStorage中的item有任何更新的痕迹

## sessionStorage

### 定义：主要作用是将数据保存在当前会话中，其原理和服务器端语言session功能类似。sessionStorage在移动设备上与localStorage一样。

### 生命周期：存储在它的当前窗口或由当前窗口新建的新窗口，知道相关联的标签页面被关闭。

### 和localStorage的区别：是数据保存时长即数据的共享方式


## Storage事件监听

- key:属性表示存储中的键名
- oldValue：表示更新前的键值，newValue表示数据更新后的键值。如果数据为新添加的，则oldvalue属性值为null，如果数据通过removeItem被删除，则newValue属性的值为null，如果storage调用的是clear方法，则事件中的key，oldvalue，newValue属性值都为null
- url：表示storage事件发生时的源地址
- stoargeArea属性指向事件监听对应的Storage对象

window.addEventListener("storage", showStroageEvent, true);

function showStorageEvent(e){
	console.log(e);
}


- 修改了数据，但是url并不是事件触发所在页面的路径，而是localStorage数据发生变化所在源压面的路径

- 当同源页面中某一页面对Storage数据进行添加或更新数据，其余的同源页面只要注册storage事件，就会触发

