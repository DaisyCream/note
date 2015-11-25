#This关键字

This是一个关键字，不是变量，不是属性名，不可以赋值

This没有作用域的限制，嵌套的函数不会从调用它的函数中继承this。

- 嵌套函数作为`方法调用`，其this的值指向调用它的对象

	###example
	```javascript	
	var s = {
	    object: "myObject",
	    ss: function(){
	        console.log(this.object);
	    }
	};
	s.ss();
	```
	result: myObject;

- 嵌套函数作为`函数调用`，其this值不是全局对象就是undefined

	###example
	```javascript
	var o = {
    	m:function(){
	      	var self = this;
	      	console.log(this === o);
	      	f();	//函数调用f
	
	      	function f(){
	      	    console.log(this === o);
	      	    console.log(self === o);
	      	}
    	}
	};

	o.m();		//方法调用m，所以m中的this是只带调用它的对象o；
	```
	result: ture
	false	//函数调用f，则this值不是全局对象就是undefined
	true	//