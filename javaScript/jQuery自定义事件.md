# jQuery自定义事件

### 对象之间通过调用直接方法来调用交互

- 对象A直接调用对象B的某个方法，实现交互；直接方法调用本质上也是属于一种特殊的发送与接受消息，它把发送消息和接收消息合并为一个动作完成；

- 对象A生成消息->将消息通知给一个事件消息处理器（Observable）->消息处理器通过同步或异步的方式将消息传递给接收者；
这种方式是通过将消息发送和消息接收拆分为两个过程，通过一个中间者来控制消息是同步还是异步发送；（松耦合处理）


### 了解自定义事件

- 类似于DOM行为

- 命名空间：一些框架需要你为你的事件指定命名空间，通常使用一个点号前缀来把`你的事件`和`原生`事件区分开。

- 自定义额外数据：JavaScript框架允许你在触发自定义事件时，向事件处理器传送额外的数据。jQuery可以向事件处理器传递任意数量的额外参数。

- 通用事件API：操作自定义事件需要特殊的发布/订阅API。这也意味着Dojo中的自定义事件不具有DOM事件的一些行为（比如冒泡）。

- 声明：我们往往需要在预定义的事件中加入一些特殊的变化（例如，需要Alt键按下才能触发的单击事件），MooTools运行你定义此类自定义事件。此类事件需要预先声明，即便你只是声明他们的名字。任何未声明的自定义事件不会被触发。

### 案例

- 方法：jQuery的事件自定义事件还是通过on绑定的，然后再通过trigger来触发这个事件

```javascript
	//给element绑定hello事件
	element.bind("hello", function(){
		console.log("hello world!");
	});
	
	//触发hello事件
	element.triggle("hello");
```
 
 
html : 
```html
<ul id="tabs">
	<li data-tab = "users">Users</li>
	<li data-tab = "groups">Groups</li>
</ul>

<div id="tabsContent">
	<div data-tab = "users">Users</div>
	<div data-tab = "groups">Groups</div>
</div>

```

js: 
```javascript
$.fn.tabs = function(control){
	var element = $(this);
	control = $(control);
	
	element.delegate("li","click",function(){
		var tabName = $(this).attr("data-tab");
		//点击li的时候出发change.tabs自定义事件
		element.triggle("change.tabs", tabName);
	};
	
	//给element绑定一个change.tabs自定义事件
	element.bind("change.tabs", function(e, tabName){
		element.find("li").removeClass("active");
		element.find(">[data-tab='"+ tabName +"']").addClass("active");
	});
	element.bind("change.tabs", function(e, tabName){
		element.find(">[data-tab]").removeClass("active");
		element.find(">[data-tab='"+ tabName +"']").addClass("active");
	});
	
	var firstName = element.find("li:first").attr("data-tab");
	element.trigger("change.tabs",firstName);
	
	return this;
}

```

### jQuery.trigger与document.dispatchEvent区分

```javascript
<body>
    <div id="output">点击按钮对比.<br /></div>
    <button id="fireNative">dispatchEvent触发 (浏览器)</button>
    <button id="fireJQuery">trigger (jQuery)触发</button>
</body>
</html>
<script type="text/javascript">
    var $output = $("#output");

    document.addEventListener('eventDemo', function(){
        $output.html($output.html() + "dispatchEvent Listener");
    });

    $(document).bind('eventDemo', function(){
        $output.html($output.html() + "iQuery listen");
    });

    $("#fireNative").click(function(){
   		 //DOM-events触发使用本机createEvent / dispatchEvent
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent('eventDemo', false, false, null);
        document.dispatchEvent(evt);
    });

    $("#fireJQuery").click(function(){
        //用jquery触发，不会处理通过addEventListener绑定的事件
        console.log("jquery");
        $(document).trigger("eventDemo");
    });
</script>

```

### triggle常见的几种用法

- 1.常用模式
```javascript
$("#btn").triggle("click");
```

- 2.出发自定义事件

```javascript
$("#btn").bind("myClick", function(){
	$("#test").append("<p>我的自定义事件</p>");

});

//触发这个代码
$("#btn").trigger("myClick");
```

- 3.传递数据

trigger(tpye[,datea])方法有两个参数，第一个参数是要触发的事件类型，第二个单数是要传递给事件处理函数的附加数据，以数组形式传递。通常可以通过传递一个参数给回调函数来区别这次事件是代码触发的还是用户触发的。

```javascript
$("#btn").bind("myClick", function(event, message1, message2){
	$("test").append("p" + message1 + message2);
});

$("#btn").triggle("myClick",["自定义事件"，“事件”]);
$("#btn").triggle("myClick",["自定义事件"，“事件”]);

```

- 4.执行默认操作

```javascript
//触发input事件后，也会使input元素本身得到焦点(浏览器默认操作)
$("input").triggler("focus");

//如果只想触发绑定的focus事件，而不像执行浏览器默认操作，可以使用下列方法
$("input").trigglerHandler("focus");

```

### jQuery自定义事件原理

根据API，trigger支持，它会在DOM树上冒泡，在事件处理程序中返回false或调用事件对象中，stopPropagation方法可以停止事件冒泡

###trigger需要处理的问题

1.模拟事件对象，用户模拟处理停止事件冒泡

2.区分事件类型，触发标准的浏览器事件和自定义事件名绑定的处理过程

3.模拟冒泡机制

- 1.命名空间的过滤

```javascript
if(type.indexOf(".") >= 0){
	//则重新组装事件
	namespaces = type.slipt(".");
	//事件+命名空间的组合，type是事件，后面的是命名空间
	type = namespaces.shift();
	namespaces.sort();
}

```

- 2.模拟事件对象

```javascript
	//jQuery.expando:检测事件对象是否由jQuery.Event生成的实例，否则用jQuery.Event改造
	event = event[jQuery.expando] ? event :
	new jQuery.Event(type, typeof event === "object" && event );
```

- 4.返回的事件数据合集

```javascript
//data就是事件回调函数返回的[event,data],如果传递了数据就合并到data中
data = data = null?[event]:jQuery.makeArray(data, [event]);


```

