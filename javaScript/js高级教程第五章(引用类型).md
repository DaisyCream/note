#js高级教程第五章(引用类型)

- 引用类型是一种数据结构，它将数据和功能联系在了一起，它们是描述一类对象锁具欧的属性和方法。

###Object类型

```javascript
	person["name"];
	person.name
```
- 两种访问对象属性的方法，但是方括号法的有点事可以通过变量来访问属性，例如：

```javascript
	var propertyName = "name";
	console.log(person[propertyName]);
```

- 通常，除非必须使用变量来访问属性，否则我们建议使用点表示法

###Array类型

####创建方法

```javascript
	//可以省略new

	var colors = new Array();
	var color = [];
	var color = Array(3);
	var colors = new Array(20);
	
	var colors = new Array("red", "blue", "green");
	
	var color = ["red", "blue", "green"];
```
- 若将数组的length加大，但却没有赋值，则会自动添上undefined

####监测数组:

- instanceof的问题，它嘉定单一的全局执行环境，如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数，如果你从一个框架向另一个框架传入一个数组，那么传入的数组在第二个框架中原生创建的数组分别具有各自不同的构造函数。为此ES新增了Array.isArray()方法

```javascript
	if(value instanceof Array){
	}

```
```javascript
	if(value.isArray()){
	}
```

####转换方法

- 具有toLocalString(),toString(),valueOf()方法。

- toString()返回由数组中每个值的字符串形式拼接而成的以逗号分隔的字符串。

- valueOf()返回的还是数组。

```javascript
	var colors = ["red", "blue", "green"];
	console.log(colors.toString());//red,blue,green
	console.log(colors.valueOf());//[ 'red', 'blue', 'green' ]
	console.log(colors);//[ 'red', 'blue', 'green' ]
	
```

```javascript
	var person1 = {
		toLocalString : function () {
			return "Niko"
		},
		toString : function () {
			return "nick"
		}
	
	}
	
	var person2 = {
		toLocalString : function () {
			return "Gri"
		},
		toString : function () {
			return "gg"
		}
	
	}
	
	
	var person = [person1, person2]
	console.log(person);//Niko,Gri
	console.log(person.toString());/Niko,Gri
	console.log(person.toLocalString())//nick,gg
```

###join

- 若不传入任何值，则用逗号分隔

```javascript
	var colors = ["red", "blue", "green"];
	console.log(colors.join(#));//red#blue#green
```


###栈方法(pop())

```javascript
	
	var colors = new Array();
	var count = colors.push("red","green");
	console.log(count);//2
	
	count = colors.push("black");
	console.log(count);//3
	
	var item = colors.pop();
	console.log(item);"black"
	console.log(colors.length);//2

```


###队列方法(shift() & unshift())

```javascript 
	var colors = new Array();
	var count = colors.push("red", "green");
	console.log(count);//2
	
	count = colors.push("black");
	console.log(count);//3
	
	var item = colors.shift();
	console.log(item);//"red"
	console.log(colors.length);//2

```

```javascript
	var colors = new Array();
	var count = colors.unshift("red", "green");
	console.log(count);//2
	console.log(colors);//[ 'red', 'green' ]
	
	count = colors.unshift("black");
	console.log(count);//3
	
	var item = colors.pop();
	console.log(item);//"red"
	console.log(colors.length);//2

```

###重排序

reverse:会对反转数据项的顺序

```javascript

	var values = [1,2,3,4,5];
	values.reverse();
	console.log(values);

```

sort:按升序排列数组项，会调用array的toString方法，然后比较得到的`字符串`，即使数组中的每一项都是数值，sort()方法比较的也是字符串

```javascript

	var values = [0,1,5,10,15];
	values.sort();
	console.log(values);//[ 0, 1, 10, 15, 5 ]

```


sort()方法可以被传递一个函数，函数中有两个参数，就是相互比较的两个值

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
	
	var values = [0,1,5,10,15];
	values.sort(compare);
	console.log(values);//[ 0, 1, 5, 10, 15 ]

```


若想倒叙，则将方法的赋值改变，若想快，则用reverse();


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
		
		var values = [0,1,5,10,15];
		values.sort(compare);
		console.log(values);//[ 15, 10, 5, 1, 0 ]

```

还有更简单的compare

```javascript
	function compare(value1, value2){
		return value1 - value2
	}

```

###操作方法

concat():基于当前数组中的所有项创建一个新的数组

```javascript
	var colors1 = ["red", "green", "blue"];
	var colors2 = colors1.concat("yellow", ["black", "brown"]);
	console.log(colors1);//[ 'red', 'green', 'blue' ]
	console.log(colors2);//[ 'red', 'green', 'blue', 'yellow', 'black', 'brown' ]
```

slice()：接受1-2个参数，返回起始和结束位置之间的项，但不包括结束位置的项


```javascript
		
	var colors = ["red","green","blue","yellow","purple"];
	var colors1 = colors.slice(1);
	var colors2 = colors.slice(1,4);
	
	console.log(colors1);//[ 'green', 'blue', 'yellow', 'purple' ]
	
	console.log(colors2);//[ 'green', 'blue', 'yellow' ]

```

splice()，返回的为删除的项，会改变数组

- 删除，只需指定2个参数，要删除的项数，例如splice(0,2)

- 插入：起始位置，删除的项数为0，插入项,例如splice(2,0,"red","green");

- 替换：起始位置，删除的项数为0，替换项，例如splice(2,1,"red","green");





###位置方法(indexOf(),lastIndexOf())

- indexOf()从开头向后查找，lastIndexOf()是从末尾向前面查找，返回查找的项在数组中的位置，而且用的是全等符号，严格模式

```javascript
	var person = {name : "nick"};
	var people = [{ name : "nick"}];
	var people1 = [person];
	
	console.log(people[0] === person);//false
```

- every：对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true

- some :对数组中的每一项运行给定函数，如果该函数对其中一项都返回true，则返回true


- filter：对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组。

- map：对数组中的每一项运行给定函，返回每次函数调用的结果组成的数组。

- foreach：对数组中的每一项运行给定函，这个方法没有返回值。

```javascript

	var number = [1,2,3,4,5,4,3,2,1];

	var everyResult = number.every(function(item, index, array){
	    return (item > 2);
	});
	
	console.log(everyResult);//false
	
	var someResult = number.some(function(item, index, array){
	    return (item > 2);
	});
	
	console.log(someResult);//true
	
	
	
	var filterResult = number.filter(function(item, index, array){
	    return (item > 2);
	});
	
	console.log(filterResult);
	
	var mapResult = number.map(function(item, index, array){
	    return (item * 2);
	}).join("**");
	
	console.log(mapResult);
	
	var foreachResult = number.forEach(function(item, index,array){
	    //执行某些操作
	});

```

###缩小方法

- reduce && reduceRight：从前向后， 从后向前，每次都会迭代，并把前一项和当前值操作完成的值向下传，如同递归

```javascript

	var value = [1,2,3,4,5];
	var sum = value.reduce(function(prev, cur, index, array){
	        return (prev + cur);
	});
	
	console.log(sum);//15
```


### Function类型

```javascript

	function createComparisonFunction(propertyName){
	    return function(object1, object2){
	        var value1 = object1[propertyName];
	        var value2 = object2[propertyName];
	
	        if(value1 < value2){
	            return -1;
	        }else if(value1 > value2){
	            return 1;
	        }else{
	            return 0;
	        }
	    }
	}
	
	var data = [{name:"lili",age:"10"},{name:"ahha",age:"20"}];
	
	data.sort(createComparisonFunction("name"));
	
	console.log(data);//[ { name: 'ahha', age: '20' }, { name: 	'lili', age: '10' } ]

```
###callee & caller

- callee：指向拥有arguments对象的函数


- arguments.callee();

```javascript
	//这样使用减小了函数之间的耦合性
	function factorial(num){
	    if(num <= 1){
	        return 1;
	    }else{
	        return num * arguments.callee(num-1);
	    }
	}

```

- caller：调用者


```javascript
	function outer(){
	    inner();
	}
	
	function inner(){
	    console.log(inner.caller);
	}
	
	outer();
	

```

###函数属性和方法

- length：表示函数接受参数的个数

function sayName(name){
	console.log(name);
}

function sayName1(name,name1){
	console.log(name,name1);
}

console.log(sayName.length);//1
console.log(sayName1.length));//2


- prototype属性是不可枚举的，因此无法使用for-in

- apply：接收两个参数，一个是在其中运行函数的作用域，另一个是参数数组，其中第二个参数可以使Array的实例，也可以是arguments对象。

```javascript
	
	function sum(num1, num2){
	    return num1 + num2;
	}
	
	function callSum1(num1, num2){
	    return sum.apply(this, arguments);
	}
	
	function callSum2(num1, num2){
	    return sum.apply(this, [num1,num2]);
	}
	
	console.log(callSum1(10,10));
	console.log(callSum2(10,10));
	
```

- call：和apply差不多，只是参数必须明确分开每一个。结果和apply相同

```javascript

	var o = { color: "blue"};

	function sayColor(){
	    console.log(this.color);
	}
	
	sayColor.apply(o);

```

- 使用apply和call最好的好处就是对象不需要与方法有任何耦合关系

- bind：用了bind函数传入对象o，创建了objectSayColor()函数，则sayColor函数的this就是o，即使在全局作用域中调用这个函数，也会看到’blue‘；

```javascript

	var o = {color:"blue"};
	
	function sayColor(){
	    console.log(this.color);
	}
	
	var objectSayColor = sayColor.bind(o);
	
	objectSayColor();

```

###基本包装类型

- string类型虽然不是引用类型，但是它也有自带的方法，如下

- 引用类型和基本包装类型的主要区别就是对象生存期。使用new操作符创建的引用类型的实例在执行流离开作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码执行的瞬间，然后立即被销毁

```javascript

	var s1 = "some text";
	var s2 = s1.substring(2);
	console.log(s2);
	
	//以上可以当做3步
	
	(1)创建string类型的一个实例
	(2)在实例上调用指定的方法
	(3)销毁这个实例
	
	var s1 = new string("some text");
	var s2 = s1.substring(2);
	s1 = null;

```



```javascript

	//Object构造函数也会像工厂方法一样，根据传入值的类型返回相应基本包装类型，
	// 如下，把字符串传给Object构造函数，就会创建Boolean实例。
	var obj = new Object("some text");
	console.log(obj instanceof String);//true

```
- `注意`：使用new调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的


```javascript
	//显示的创建
	var value = "25";
	var number = Number(value);
	console.log(typeof number);//number
	
	var obj = new Number(value);
	console.log(typeof obj);//object
	
	var num = 10;
	var str = String(num);
	console.log(typeof str);//string

```



```javascript

```





```javascript

```









































