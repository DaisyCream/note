##JS变量（作用域，定义，基本类型和引用类型）

- 变量作用域
- 变量定义
- 基本类型和引用类型


###变量分类
- **局部(local)**：局部性的，作用域只在该函数内部，函数的参数就是局部变量

- **全局(global)**：全局性的，在javascript文件中处处可以访问


![](http://t100.qpic.cn/mblogpic/220b807af85c27c8ade2/2000)
		
###<div style="text-align:center">作用域链（scope chain）</div>

当JavaScript代码需要查询变量x的值时（这个过程叫做变量解析（variable name resolution）），它就开始查看该链的第一个对象。如果那个对象有一个名为x的属性，那么就采用那个属性的值。如果第一个对象没有名为x的属性，JavaScript就会继续查询链中的第二个对象。如果第二个对象仍然没有名为x的属性，那么就继续查询下一个对象，以此类推。如果查询到最后（指顶层代码中）不存在这个属性，那么这个变量的值就是未定义的。


###变量声明

####example01

```javaScript
	var i=0;
	function a(){
		console.log(a);
	}
	a();
```
输出：0;

####example02-1
```javaScript
	var i=0;
	function a(){
		var i=2;
		console.log(a);
	}
	a();
```
输出:2

####example02-2
```javaScript
	var i=0;
	function a(){
		console.log(i);
		var i=2;
	}
	a();
```
输出：undefined

**解释**：比较`example02-1`和`example02-2`，仅仅是var i = 2的位置不同了，就产生了不用的结果，本以为`example02-2`输出的结果为：0；但是却不是这样，这就是定义变量的问题，如图（scope chain）图，在变量解析过程中首先查找局部的作用域，然后查找上层作用域。在代码一的函数当中没有定义变量i，于是查找上层作用域（全局作用域），进而进行输出其值。但是在代码二的函数内定义了变量i（无论是在alter之后还是之前定义变量，都认为在此作用域拥有变量i），于是不再向上层的作用域进行查找，直接输出i。但是不幸的是此时的局部变量i并没有赋值，所以输出的是undefined。

####example03-1（加深定义问题的例子）
```javaScript

	console.log(a());
	console.log(typeof a);
	var a = funcion(){
		return 1;
	}
	
	var b = function(){
		return 2;
	}

	console.log(b());
	
```
输出：undefined
function
2
解释：如例子`example02`中的，查找变量a，在输出console.log(a())的时候，只是定义的a，并没有给a赋值，所以输出结果是undefined，但是在console.log(typeof a)中，输出是function，更足以说明是定义了a，不然不会知道它是function类型；

####example03-2
```javaScript
	var a,b
	console.log(a());
	console.log(typeof a);
	a = funcion(){
		return 1;
	}
	
	b = function(){
		return 2;
	}

	console.log(b());

```
可以将`example03-1`看做是这样

###变量声明可分为
- 显式申明：
	
	如var i = 0;
	
	显式声明的变量i是在预编译时就已经编译到调用对象中了

- 隐式申明

	如i = 0;

	隐式声明变量在解释时才被定义为全局变量
	
###基本类型和引用类型
- 基本类型：数值、布尔值、null和undefined属于基本类型,基本类型在内存中具有固定的内存大小
- 引用类型：对象、数组和函数属于引用类型, 他们可以具有任意长度，因此他们的内存大小是不定的，因此变量中存储的实际上是对此数据的**引用**，通常是内存地址或者指针.

###example04
```javaScript
	var i = 0;
	var j = i;
	var j=1;
	console.log(i);
	console.log(j);
```
输出：0,1

###example04
```javaScript
	var a = function(){
    	return 1;
	};
	
	var b = function(){
	    return 2;
	};
	
	var c = a;
	a = b;
	
	console.log(a());
	console.log(b());
	console.log(c());

```
输出：2

2

1
