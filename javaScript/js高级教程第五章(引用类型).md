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

```

var person = [person1, person2]
console.log(person);//Niko,Gri
console.log(person.toString());/Niko,Gri
console.log(person.toLocalString())//nick,gg






































