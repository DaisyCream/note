#JS高级程序第七章(函数表达式)

##函数表达式的特征

- 定义函数的方式有两种：一种是函数声明，一种是函数表达式

- 函数声明提升：在执行代码之前会先读取声明的函数

函数声明：

```javascript
	sayHi();//Hi
	
	function sayHi(){
	    console.log("Hi");
	}
```

函数表达式：这种情况下的函数叫做匿名函数，因为function后面没有标识符

```javascript

var functionName = function(){};

```

- (不要这样做)：在ES中这属于无效的语句，JS引擎会尝试修正错误，将其转换为合理的状态。但不同浏览器的修复状态不同，大多数浏览器会返回第二个声明，忽略condition，这种方法很危险

```javascript

	if(condition){
	    function sayHi(){
	        console.log("Hi");
	    }
	}else{
	    function sayHi(){
	        console.log("Yo");
	    }
	}

```

但是，如果有函数表达式就不会那么危险了

```javascript

	var sayHi;
	
	if(condition){
	    sayHi = function(){
	        console.log("Hi");
	    };
	}else{
	    sayHi = function(){
	        console.log("Yo");
	    }
	}

```

- 把函数当做值来使用的情况下，都可以使用匿名函数

##递归

- 定义：是在函数调用自身的情况下构成的

- 如果不用arguments.callee()属性的话，则函数如果被引用的话，会出很多问题，但是这种方式在严格模式下面行不通

```javascript
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num * arguments.callee(num-1);
    }
}

```

- 创建了一个名为F的命名函数表达式，然后将它赋值给factorial，函数的f仍然有效果，这种函数在严格模式还是非严格模式都可以用

```javascript

var factorial = (function f(num){
    if(num <= 1){
        return 1;
    }else{
        return num * f(num-1);
    }
});

```

##闭包

- 当某个函数`第一次`被调用的时候，会创建一个执行环境(execution context)以及作用域链，并且把作用域链赋值给一个特殊的内部属性

```javascript
function compare(value1, value2){
    if(value1 < value2){
        return -1;
    }else if(value1 > value2){
        return 1;
    }else{
        return 0;
    }
}

var result = compare(5,10);
```

![](/users/DaisyCream/DeskTop/compareChain.png)

当第一次调用compare的时候，会创建this，arguments，value1，value2活动对象

- 后台的每个执行环境都有一个表示变量的对象-变量对象，全局环境的变量对象始终存在，而像compare函数这样的局部环境的变量对象，则只在函数执行的过程中存在。在创建compare函数时，会预先创建一个包含全局变量对象的作用域链，这个作用域链被保存在内部[[scope]]属性中。当调用compare函数时，会为函数创建一个执行环境，然后通过复制函数的[[scope]]属性中的对象构建起执行环境的作用域链。伺候，又有一个活动对象被创建推入执行环境作用域链的前端。作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。

- 无论什么时候访问变量时，就会从作用域链中搜索具有相应名字的变量，一般来说，当函数执行完毕以后，局部活动对象就会被销毁，内存中仅保留全局作用域。

```javascript
	function createCompareFunction(property){
	    return function(obj1, obj2) {
	        if (obj1[property] > obj2[property]) {
	            return 1;
	        } else if (obj1[property] < obj2[property]) {
	            return -1;
	        }else{
	            return 0;
	        }
	    }
	
	}
	
	var compareNames = createCompareFunction("name");
	var result = compareNames({name:"hi"},{name :"wa"});
	
	console.log(result);//-1
	
	//销毁活动作用域链
	
	compareNames = null;

```

![](/users/DaisyCream/DeskTop/compare.png)

就算createCompareFuntion完成以后，其活动对象都不会被销毁，应为compareNames仍然使用着匿名函数的作用域链，知道匿名函数被销毁以后，createCompareFuntion的活动对象才会被销毁

- 由于闭包会携带包含它的作用域链，因此会比其他函数占用更多的内存，谨慎是用闭包

###闭包与变量

- 闭包副作用：闭包只能取得包含书中任何变量的最后一个值！！！别忘了闭包所保存的是整个变量对象，而不是某个特殊的变量

```javascript
function createFunctions(){
    var result = new Array();

    for(var i=0; i < 10; i++){
        result[i] = function(){
            return i;
        }
    }
    return result;
}
```
从函数的表面上看，每个函数都应该返回自己的索引值，即位置0的函数返回0。但是实际上，每个函数都返回10.每个作用域链中都保存着createFuntions函数的活动对象，所以它们引用的都是同一个变量


```javascript

function createFunctions(){
    var result = new Array();

    for(var i=0; i<10; i++){
        result[i] = function(num){
            return function(){
                return num;
            }
        }(i);
    }
    return result;
}

var result = createFunctions();
console.log(result[1]());

```
由于函数参数是按照值传递的，所以就会将变量i的当前值赋值给参数num，而在这个时候，函数内部，又创建了并返回了一个访问num的闭包，这样一来，result数组中的每个函数都有自己num变量的一个副本。

###this对象

- this对象是在`运行`时基于函数的执行环境绑定的，在全局函数中，this等于window，当函数被对象调用时，this等于调用的那个对象。不过，匿名函数的执行环境具有全局性，因此this常常指向window。

- 只有调用函数的时候，才会创建它的作用域链，它的活动对象会获得两个特殊变量：this和arguments

```javascript
var name = "The Window";

var object = {
    name : "My Object",

    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};

console.log(object.getNameFunc()());//The Window
```


```javascript
var name = "The Window";

var object = {
    name : "My Object",

    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};

console.log(object.getNameFunc()());//My Window
```

```javascript

var name = "The window";

var object = {
    name: "My object",

    getName: function(){
        return this.name
    }
};

console.log(object.getName());//My object

```
此时，getName函数的活动变量对象中this和arguments，this指的就是它所在环境，就是object

```javascript
var name = "The window";

var object = {
    name: "My object",

    getName: function(){
        return this.name
    }
};

var s = {
    name :"lala"
};

console.log(object.getName());//My object
console.log((object.getName)());//My object
console.log((object.getName = object.getName)());//The Window
console.log((s.getName = object.getName)());//The Window
console.log(s.getName());//lala
```

第二行代码在调用了这个方法前给它加上了括号。虽然加上括号，但是就好像只是在引用一个函数，但this得值得到了维护，因为object.getName和（object.getName）的定义是相同的。第三行代码先执行了一条赋值语句，然后调用复制后的结果，因为这个赋值表达式是函数本身，所以this得值不能得到维持,()只是得到值。

###内存泄漏

- 如果闭包作用域链中保存着一个HTML元素，那么就意味着`该元素`将无法被销毁


```javascript
function assiginHandler(){
    var element = document.getElementById("someElement");

    element.onclick = function(){
        console.log(element.id);
    };
    
}
```

匿名函数保存了一个对assignHandler活动对象的引用，因此，导致无法减少element的引用数，只要匿名函数存在，element的引用数至少是1，因此它所占用的内存就永远不会被回收

```javascript
function assiginHandler(){
    var element = document.getElementById("someElement");
    var id = element.id;

    element.onclick = function(){
        console.log(id);
    };

    element = null;
}
```
这样能够解除对DOM对象的引用，顺利的减少引用数，确保能够正确的回收其占用的内存


##模仿块级作用域

- 函数对象转化为函数表达式，匿名函数可以构造一个假的块级作用域

```javascript
	function outputNumber(count){
	    (function(){
	        for(var i=0;i<count;i++){
	            console.log(i);
	        }
	    })();
	    console.log(i);//报错
	}
```
- 匿名函数中定义的任何变量，都会在执行结束时被销毁

- 这种做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用，只要函数执行完毕，就可以立即销毁其作用域链了。

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




