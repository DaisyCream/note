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
###原型模式(prototype)

- 如果每次都把共用函数放在global作用域里，那让全局作用域很凌乱，所以，每个函数都有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

- prototype就是通过调用构造函数的那个对象实例的原型对象，使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法

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
	console.log(person1.constructor);
	console.log(Person.prototype.constructor);//Person
```

- 创造了构造函数以后，其原型对象默认只会取得constructor属性，而这个属性也是共享的，至于其他方法，则都是从Object继承而来的

![](/img/Object.png)


- 虽然现实中无法访问到[[prototype]],但可以通过isPrototypeOf()方法来确定是否存在这种关系

```javascript
	console.log(Person.prototype.isPrototypeOf(person1));//true

```

- getPrototypeOf可以知道实例对象的对象原型，Object.getPrototypeOf(obj)

```javascript
	console.log(Object.getPrototypeOf(person1));
	//Person { name: 'Nick', age: 29, job: 'software', sayName: 	[Function] }
```
- 每当代码读取到某个对象属性的时候，都会执行一次搜索，目标是具有给定名字的属性，搜索首先从对象实例本身开始，如果在实例中找到了具有给定名字的属性，则返回该属性的值，如果没有找到，则继续搜索指针指向的原型对象，例如，在我们调用person1.sayName()时，会先后执行两次搜索，首先，解释器会问：“实例person1有sayName属性吗？”，答：“没有”。然后，它会继续搜索，再问：“person1的原型有sayName属性吗？”答：“有”。于是，它就会读取那个保存在原型对象中的函数。



-在实例对象中，不能改变对象原型的prototype属性，如果改变，也只能改变自身的属性，会覆盖对象原型，但是不会改变。不过，使用delete操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性

```javascript
	person1.name = "haha";
	console.log(person1.name);//"haha"
	console.log(person2.name);//"Nick"
```
```javascript
	delete person1.name;
	console.log(person1.name);//"Nick"

```
- 使用hasOwnProperty可以检测一个属性是存在于实例中，还是存在于原型中。这个方法只在给定属性存在于对象实例中时，才会返回true

```javascript
	person1.name = "haha";
	console.log(person1.hasOwnProperty("name"));//true
	console.log(person2.hasOwnProperty("name"));//false
```

![](/img/hasOwnProperty.png)

- in操作符：单独使用时，in操作符会在通过对象能够访问的属性时返回true，无论在该实例中还是原型对象中

- 可以用in操作和hasOwnProperty来确定一个属性到底是属于实例的还是对象原型的

- 所有开发人员定义的属性都是可以枚举的

```javascript
	var o = {
	    toString : function(){
	        return "my Object";
	    }
	};
	
	for (var prop in o){
	    if(prop == "toString"){
	        console.log("Found toString");
	    }
	}
```

- 要知道对象的所有可枚举的类型，用Object.keys(obj)，返回包含所有可枚举属性的字符串数组，只能是自己的属性才会显示；

```javascript
	var keys = Object.keys(Person.prototype);
	console.log(keys);//[ 'name', 'age', 'job', 'sayName' ]
	
	var p1 = new Person();
	p1.name = "sd";
	p1.age = 20;
	
	var p1Keys = Object.keys(p1);
	console.log(p1Keys);//[ 'name', 'age' ]
```

- 如果想要得到所有属性实例，无论是否可枚举，都可以使用Object.getOwnPropertyNames()方法

```javascript
	var keys1 = Object.getOwnPropertyNames(Person.prototype);
	console.log(keys1);
	//[ 'constructor', 'name', 'age', 'job', 'sayName' ]
```

###原型语法

```javascript
	function Person(){
	
	}
	
	Person.prototype = {
	    constructor: Person,
	    name : "wahaha",
	    age : 29,
	    job : "ss",
	    sayName : function(){
	        console.log(this.name);
	    }
	};
	
	
	var p1 = new Person();
	console.log(p1.constructor);//Person
```

###原型的动态性

- 在原型中查找值的过程试一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来-即使是先创建了实例后修改原型也一样

```javascript

	var  friend = new Person();
	
	Person.prototype.sayHi = function(){
	    console.log("Hi");
	};
	
	friend.sayHi();//"Hi"

```
- 重写对象：切断了所有实例与对象原型的联系

![](/users/DaisyCream/Desktop/newPrototype.png);

###原型对象

- 原型中很多东西是被共享的，对于函数来说非常合适，对于基本数据类型倒也还行，但是对于包含引用类型的属性来说，问题就比较突出了。

```javascript
Person.prototype = {
    constructor: Person,
    name : "wahaha",
    age : 29,
    job : "ss",
    friends : ["Shelby", "Court"],
    sayName : function(){
        console.log(this.name);
    }
};


var p1 = new Person();
var p2 = new Person();

//console.log(Object.getOwnPropertyNames(Person.prototype));


p1.friends.push("ss");
console.log(p2.friends);//[ 'Shelby', 'Court', 'ss' ]
```
###组合使用构造函数模式和原型模式

- 构造函数用于定义实例属性，而原型模式用于定义方法和共享属性，每个实例都有自己的一份实例属性副本，但是又享受这对方法的引用，更节约了内存，这种模式还像构造函数传递参数

```javascript
	function Person(name, age, job){
	    this.name = name;
	    this.age = age;
	    this.job = job;
	    this.friends = ["Shelby"];
	}
	
	Person.prototype = {
	    constructor : Person,
	    sayName : function(){
	        console.log(this.name);
	    }
	};
	
	var person1 = new Person("Nick", 29, "hahah");
	var person2 = new Person("greg", 27, "doc");
	
	person1.friends.push("Van");
	console.log(person1.friends);//[ 'Shelby', 'Van' ]
	console.log(person2.friends);//[ 'Shelby' ]
	console.log(person1.friends === person2.friends);//false
	console.log(person1.sayName === person2.sayName);//true
```

###继承

1.原型链：一个原型是另一个类型的构造函数，原型函数中包含指向另一个原型函数的指针，以此类推，一层一层

不是SubType的原型的constructor属性被重写了，而是SubType的原型指向了另一个对象，SuperType的原型，而这个原型的constructor指向的是SubType

```javascript
	function SuperType(){
	    this.property = true;
	}
	
	SuperType.prototype.getSuperValue = function(){
	    return this.property;
	};
	
	function SubType(){
	    this.subproperty = false;
	}
	
	SubType.prototype = new SuperType();
	
	SubType.prototype.getSubValue = function(){
	    return this.subproperty;
	};
	
	var instance = new SubType();
	console.log(instance.getSuperValue());//true
	
	console.log(Object.getPrototypeOf(instance));//SuperType
	
	console.log(instance instanceof SubType);//true

```

![](/img/prototype_chain.png)

2.确定原型和实例的关系

- 由于原型链的关系，我们可以说instance是Object，SuperType，SubType的任何一个类型的实例。
- 第二种方法是使用isPrototypeOf(obj)，只要是原型链中出现过的原型，都可以说事该原型链所派生的实例的原型，因此，也会返回true。


- 重写超类的方法，或者需要添加超类中不存在的某个方法，不管怎样，给原型添加方法的代码一定要放在替换原型的语句之后

```javascript


	function SuperType(){
	    this.property = true;
	}
	
	SuperType.prototype.getSuperValue = function(){
	    return this.property;
	};
	
	function SubType(){
	    this.subproperty = false;
	}
	
	SubType.prototype = new SuperType();//重写方法这句一定要在重写方法之前
	
	SubType.prototype.getSubValue = function(){
	    return this.subproperty;
	};
	
	SubType.prototype.getSuperValue = function(){
	    return false;
	};
	
	var instance = new SubType();
	console.log(instance.getSuperValue());//true
	
	//console.log(Object.getPrototypeOf(instance));//SuperType
	
	console.log(instance instanceof SubType);//true

	var s1 = new SuperType();
	console.log(s1.getSuperValue());//true


```

- 不能用对象字面量来重写子类

- 在创建子类型的时候，不能给父类型传递参数，如果父类型的构造函数中，包含了引用类型的值，则会在子类型的prototype中继承，那么就会引发共享，一个实例改变参数，则任何实例都改变了

```javascript
	function SuperType(){
	    this.color = ["red","blue"];
	}
	
	function SubType(){
	
	}
	
	SubType.prototype = new SuperType();
	
	var s1 = new SubType();
	var s2 = new SubType();
	
	s1.color.push("haha");
	
	console.log(s1.color);//[ 'red', 'blue', 'haha' ]
	console.log(s2.color);//[ 'red', 'blue', 'haha' ]
```

###借用构造函数

- 在子类构造函数的内部使用超类构造函数，这样子类的实例对象就拥有了自己的属性，而不是共享的，它就会有自己的属性副本

```javascript
	
	function SuperType(){
	    this.color = ["red", "blue"];
	}
	
	function SubType(){
	    SuperType.call(this);
	}
	
	var instance1 = new SubType();
	instance1.color.push("black");
	console.log(instance1.color);//[ 'red', 'blue', 'black' ]
	
	var instance2 = new SubType();
	console.log(instance2.color);//[ 'red', 'blue' ]
	
	console.log(SubType instanceof SuperType);//false
```

1.传递函数：可以在子类构造函数中向超类构造函数创建参数，为了确保SuperType不会重写子类的属性，可以在使用超类构造函数后，在添加应该在子类中定义的属性，如果有重叠，这样就可以覆盖

```javascript

	function SuperType(name){
	    this.name = name;
	}
	
	function SubType(name){
	    SuperType.call(this, name);
	    this.age = 29;
	}
	
	SuperType.prototype.sayName = function(){
	    console.log(this.name);
	};
	
	var s1 = new SubType("wahha");
	console.log(s1.name);//wahha
	console.log(s1.age);//29
```
###组合继承

- 定义：是将原型链借用构造函数的技术组合到一起。使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承，这样，即通过在原型上定义方法实现了函数的复用，又能保证每个实例都有自己的属性

- 构造函数中定义的属性和方法要比原型中定义的属性和方法的优先级高，如果定义了同名称的属性和方法，构造函数中的将会覆盖原型中的 


```javascript
	function SuperType(name){
	    this.name = name;
	    this.color = ["red"];
	}
	
	SuperType.prototype.sayName = function(){
	    console.log(this.name);
	};
	
	function SubType(name, age){
	    SuperType.call(this,name);
	    this.age = age;
	}
	
	SubType.prototype = new SuperType();
	
	SubType.prototype.sayAge = function(){
	    console.log(this.age);
	};
	
	var instance1 = new SubType("Nicholas", 29);
	instance1.color.push("black");
	console.log(instance1.color);
	instance1.sayAge();
	instance1.sayName();
	
	
	var instance2 = new SubType("Greg", 27);
	console.log(instance2.color);
	instance2.sayAge();
	instance2.sayName();
	console.log(SubType.prototype);
	
	console.log(instance1);
	
	function s(){
	    this.name = "s";
	}
	
	s.prototype.name = "m";
	
	var o = new s();
	console.log(s.name);//s

```

###原型式继承

- 利用了object创建对象，并且把属性传进去，返回一个新的对象实例

```javascript
	function object(o){
	    function F(){}
	    F.prototype = o;
	    return new F();
	}

```

```javascript

	var person = {
	    name: "hahah"
	};
	
	var anotherPerson = Object.create(person, {
	    name: {
	        value : "Greg"
	    }
	});
	
	console.log(anotherPerson.name);//Greg

```
###寄生式继承

- 定义，用object方法，传入一个对象，这个对象作为新对象的属性，然后对这个新对象添加属性，传出新对象new出来的对象传出去，既可以继承，也可以自己添加

```javascript
//
//s.prototype.name = "m";
//
//var o = new s();
//console.log(s.name);//s


function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}

function createAnother(original){
    var clone = object(original);
    clone.sayHi = function(){
        console.log("Hi");
    };
    return clone;
}


var person = {
    name : "haha"
};

var personA = createAnother();
personA.sayHi();//Hi
```

###寄生组合继承



```javascript
	function object(o){
	    function F(){}
	    F.prototype = o;
	    return new F();
	}
	
	function inheritPrototype(subType, superType){
	    var prototype = object(superType.prototype);
	    prototype.constructor = subType;
	    subType.prototype = prototype;//只传了属性进来
	}
	
	
	function SuperType(name){
	    this.name = name;
	    this.colors = ["red", "blue", "green"];
	}
	
	var s = new SuperType("s");
	
	SuperType.prototype.sayName = function(){
	    console.log(this.name);
	};
	
	function SubType(name, age){
	    SuperType.call(this,name);
	    this.age = age;
	}
	
	inheritPrototype(SubType, SuperType);
	
	SubType.prototype.sayAge = function(){
	    console.log(this.age);
	};
	
	var sub = new SubType("ss",23);
	
	console.log(sub instanceof SuperType);

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


























