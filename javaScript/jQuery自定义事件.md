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

- 5.jQuery.event.special
用来做模拟事件的，比如聚焦冒泡

- 6.模拟冒泡事件

```javascript
//如果需要冒泡，特殊事件不需要阻止冒泡，且elem不是window对象
//onlyHandlers为true 表示不冒泡
if(!onlyHandlers && !special.noBubble && jQuery.isWindow(elem)){
	//冒泡时是否需要转成别的事件(用于事件模拟)
	bubbleType = special.delegateType || type;
	
	//如果不是变形来的foucusin/out事件
	if(!rFocusMorph.test(bubleType + type)){
		cur = cur.parentNode;
	}
	
	for(; cur; cur = cur.parentNode){
		eventPath.push(cur);//推入要触发事件的所有元素队列
		tmp = cur;//存一下循环中最后一个cur
	}
	
	//如果最后一个cur是document，那么事件需要触发到window对象上，将window推入
	if(tmp === (elem.ownerDocument || document)){
		eventPath.push(tmp.defaultView || tmp.parentWindow || window);
	}

}

```

- 7.处理事件

```javascript
	i=0;
	while((cur = eventPath[i++]) && !event.isPropagationStopped()){
		
		//先确定事件绑定类型是delegateType还是bindType
		event.type = i > 1 ?
		bubbleType:
		spacial.bindType || type;
	
		//检测缓存中该元素对应事件中包含事件处理器，
		//有则取出主处理器(jQuery handle)来控制所有分事件处理器
		handle = (jQuery._data(cur, "events") || {})[event.type] && 		jQuery._data(cur, "handle");
		
		if(handle){
			handle.apply(cur, data);
		}
	
		//取出原生事件处理器elem.ontype,如click事件就是elem.onClick
		handle = ontype && (cur[ontype]);
	
		//如果原生事件处理器存在，检测需不需要阻止事件在浏览器上的默认动作
		if(handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data)===false){
			event.preventDefalut();
		}
	
	}
```

jQuery.event.dispatch.apply(eventHandle.elem, arguments);
这时候事件就是按照dispatch的触发规则，自行处理了，如果是浏览器事件就会按照dispatch处理冒泡了，自定义的就过滤了

- 所以整个trigger的核心，还是围绕着数据缓存在处理的，通过on机制在jQuery.event.add的时候预处理好了

- 最终通过jQuery.event.dispatch派发

- 通过trigger很好的模拟了浏览器事件流程，但是美中不足的是对象的事件混淆其中 这就造成了 触发对象事件的时候 最后会调用对象的相应方法

### 总结

- 1.jQuery为统一原生Event对象而封装的jQuery.Event类，封装了preventDefault，stopPropagation,stopImmediatePropagation原生接口，可以直接捕获到用户的行为
- 2.由核心组件 jQuery.cache 实现注册事件处理程序的存储，实际上绑定在 DOM元素上的事件处理程序只有一个，即 jQuery.cache[elem[expando]].handle 中存储的函数，该函数在内部调用 jQuery.event.dispatch(event) 实现对该DOM元素特定事件的缓存的访问，并依次执行这些事件处理程序
- 3.jQuery.event.add(elem, types, handler, data, selector) 方法用于给特定elem元素添加特定的事件 types([type.namespace, type.namespace, ...])的事件处理程序 handler, 通过第四个参数 data 增强执行当前 handler 事件处理程序时的 $event.data 属性，以提供更灵活的数据通讯，而第五个元素用于指定基于选择器的委托事件
- 4.namespace 命名空间机制，namespace 机制可以对事件进行更为精细的控制，开发人员可以指定特定空间的事件，删除特定命名空间的事件，以及触发特定命名空间的事件。这使得对事件处理机制的功能更加健
- 5.jQuert.event.special 对象用于某些事件类型的特殊行为和属性。比如 load 事件拥有特殊的 noBubble 属性，可以防止该事件的冒泡而引发一些错误。总的来说，有这样一些方法和属性：
- 6.jQuery.event.simulate(type, elem, event, bubble)模拟事件并立刻触发方法，可用于在DOM元素 elem 上模拟自定义事件类型 type，参数 bubble用于指定该事件是否可冒泡，event 参数表示 jQuery 事件对象 $event。 模拟事件通过事件对象的isSimulated属性为 true 表示这是模拟事件。该方法内部调用 trigger() 逻辑 或 dispatch() 逻辑立刻触发该模拟事件。该方法主要用于修正浏览器事件的兼容性问题，比如模拟出可冒泡的 focusin/ focusout 事件，修正IE中 change 事件的不可冒泡问题，修正IE中 submit事件不可冒泡问题
- 7.jQuery.event.dispatch(event) 方法在处理事件委托机制时，依赖委托节点在DOM树的深度安排优先级，委托的DOM节点层次越深，其执行优先级越高。而其对于stopPropagation的处理有些特殊，在事件委托情况下并不一定会调用绑定在该DOM元素上的该类型的所有事件处理程序，而依赖于委托的事件处理程序的执行结果，如果低层委托的事件处理程序声明了停止冒泡，那么高层委托的事件以及自身绑定事件就不会被执行，这拓展了 DOM 委托机制的功能。
- 8.