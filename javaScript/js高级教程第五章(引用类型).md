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

splice()

- 删除，只需指定2个参数，要删除的项数，例如splice(0,2)

- 插入：其实位置，插入项

```javascript
	

```




```javascript

```








































