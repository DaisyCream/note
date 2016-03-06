#JS高级教程第六章(面向对象的程序设计)

###理解对象

- 我们可以把对象看成散列表，无非就是一组名值对，之中值可以使数据或函数


```javascript
	var person = {
	    name: "nicholas",
	    age: 29,
	    job: "Software Engineer",
	
	    sayName: function(){
	        console.log(this.name);
	    }	
    
	};
```

- 属性(prototype)类型：属性是内部值，在js中不能直接访问它们，为了表示属性是内部值，该规范把它们放在了两对括号中，例如[[Enumerable]]

- 两种属性：数据属性和访问器属性

- 数据属性：包含一个数据值的位置，在这个位置可以读写数据。拥有四个描述的属性，[[configurable]]，能否通过delete删除属性从而重新定义，能否修改属性的特性，或者能否把属性修改为访问器属性；[[Enumerable]]：能否通过for-in方法返回属性；[[Writable]]能否修改属性的值；[[Value]]：包含属性的数据值；

- Object.defineProperty()，三个参数，分别为，定义的对象，属性，需要修改的属性值(装在一个花括号里)

```javascript
	
	var person = {};
	Object.defineProperty(person, "name", {
	    writable: false,
	    value: "Nicholas"
	});

```

- 访问器属性：他是一对getter和setter函数，[[configurable]]，能否通过delete删除属性从而重新定义，能否修改属性的特性，或者能否把属性修改为访问器属性；[[Enumerable]]：能否通过for-in方法返回属性；[[Get]]：在读取是调用的函数;[[Set]]：在写入属性时调用的函数。设置一个属性的值会导致其他属性发生变化。

```javascript

	var book = {
	    _year: 2004,
	    edition: 1
	};
	
	Object.defineProperty(book, "year", {
	    get : function(){
	        return this._year;
	    },
	    
	    set: function(newValue){
	
	        if(newValue > 2004) {
	            this._year = newValue;
	            this.edition += newValue - 2004;
	        }
	    }
	
	});


	book.year = 2005;
	console.log(book.edition);//2

```

- 定义多个属性：接受2个参数，第一个对象是要添加或修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应，并且如果定义了数据属性的Value值，想再次修改是不行的，除非在属性加入writable：true。

```javascript
	var book = {};

	Object.defineProperties(book,{
	    _year: {
	        value : 2004,
	        writable : true
	    },
	
	    edition: {
	        value: 1,
	        writable : true
	    },
	
	    year: {//访问器属性
	        get: function(){
	            return this._year
	        },
	
	        set: function(newValue){
	            if(newValue > 2004) {
	                this._year = newValue;
	                this.edition += newValue - 2004
	            }
	        }
	    }
	
	});
	
	book.year = 2006;
	console.log(book.year);
	console.log(book.edition);


```

- 读取属性的特征，Object.getOwnPropertyDescription方法，可以取得给定属性描述符，这个方法接受两个参数，属性所在的对象和要读取的属性，返回一个对象

```javascript
	
	var book = {};
	Object.defineProperties(book, {
	    _year: {
	        value: 2004,
	        writable: true
	    },
	
	    edition: {
	        value: 1,
	        writable: true
	    },
	
	    year: {
	        get: function(){
	            return this._year
	        },
	
	        set: function(newValue){
	            if(newValue > 2004){
	                this._year = newValue;
	                this.edition += newValue - 2004;
	            }
	        }
	    }
	
	});
	
	var description = Object.getOwnPropertyDescriptor(book, "_year");
	console.log(description.value);
	console.log(description);
		
```

###创建对象

- 工厂模式：用函数来封装以特定接口创建对象的细节，但是却没有解决对象识别问题（怎样知道一个对象的类型），随着js发展，又一个新模式出现

```javascript
	function createPerson(name, age, job){
	    var o = new Obejct();
	    o.name = name;
	    o.age = age;
	    o.job = job;
	    o.sayName = function(){
	        console.log(this.name);
	    };
	    return o;
	}
	
	var person1 = createPerson("Nick", 29, "ss");
	var person2 = createPerson("zhang", 18, "ww");
```

- 构造函数模式

可将上面的代码重写如下：
存在不同之处
1.没有显示的创建对象
2.直接将属性和方法赋值给了this对象
3.没有return语句

```javascript

	function Person(name, age, job) {
	    this.name = name;
	    this.age = age;
	    this.job = job;
	    this.sayName = function () {
	        console.log(this.name);
	    };
	}
	
	var person1 = new Person("Nick", 29, "ss");
	var person2 = new Person("zhang", 18, "ww");

```

- 对象的constructor属性最初是用来标识对象类型的，但是提到检测对象类型，还是用instanceof操作符更可靠一些，返回对创建此对象的数组函数的引用

```javascript
	//constructor
	console.log(person1.constructor);//[Function: Person]
	console.log(person2.constructor == Person);//true
```

```javascript
	//instanceof
	console.log(person1 instanceof Object);//true
	console.log(person1 instanceof Person);//true
```

- 将构造函数当做函数，构造函数与其他函数的区别就是调用它们的方式不同。不过，构造函数毕竟也是函数，不存在定义构造函数的特许语法，任何函数，只要通过new操作符来调用的，一定是构造函数

- 不同实例上的同名函数是不相等的。

```javascript
		
	var o = {};
	
	var person = new Person("Nick", 29, "yes");
	person.sayName();//Nick
	
	o.person = Person;
	
	o.person("hah",23,"asdf");
	o.sayName();//hah

```

如果把sayName函数提出来，就不用每次都创建一个对象了

```javascript
	function Person(name, age, job){
	    this.name = name;
	    this.age = age;
	    this.job = job;
	    this.sayName = sayName;
	}
	
	function sayName(){
	    console.log(this.name);
	}
	
	var person1 = new Person("zyy",21,"ss");
	var person2 = new Person("sda", 20, "asd");
	
	console.log(person1.sayName === person2.sayName);//true

```
###原型模式

- 如果每次都把共用函数放在global作用域里，那让全局作用域很凌乱，所以，每个函数都有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。最好的好处是可以让所有对象实例共享它所包含的属性和方法

```javascript

	function Person(){
	}
	
	Person.prototype.name = "Nick";
	Person.prototype.age = 29;
	Person.prototype.job = "software";
	Person.prototype.sayName = function(){
	    console.log(this.name);
	};
	
	var person1 = new Person();
	console.log(person1.name);//Nick
	
	var person2 = new Person();
	console.log(person2.name);//Nick

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