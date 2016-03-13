#JS高级教程第四章(变量，作用域和内存)

###引用类型

- 如函数和对象就是最明显的引用类型，可以动态的添加属性，但是不能给基本类型添加属性（undefined, null, string, number, boolean）;

```javascript
	var name = "hah";
	name.age = 27;
	console.log(name.age); //undefined;
```

- 复制变量值：

复制基本数据类型，两者是独立的；
复制引用类型，同样会将存储在变量对象中的值复制一份到为新变量分配的空间中，不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。复制操作结束后，两个变量实际上将引用同一个对象，`因此，改变其中一个变量，就会影响另一个变量`。

![](/img/引用类型.jpg)

```javascript
	//传递基本数据类型作为函数的局部变量，函数操作不会改变原数据；
	function addTen(num){
		num+=10;
		return num;
	}
	var count = 20;
	var result = addTen(count);
	console.log(count);//20没变化
	console.log(result);

```

```javascript
	//传递引用数据类型作为函数的局部变量，其实是按照值传递的，只是传递了以后都指向在堆中的对象，堆内存中的对象只有一个，obj也会按引用来访问同一个对象
	function setName(obj){
		obj.name = "zhang";
	}
	
	var person = new Object();
	setName(person);
	console.log(person.name);//"zhang";
```

- instanceof:如果使用instanceof操作符检测基本类型的值，则该操作符始终会返回false，因为基本类型不是对象。

console.log(person instanceof Object);//true
console.log(person instanceof Array);

###执行环境

- 每个函数都有自己的执行环境，当执行流进入一个函数时，执行的环境就会被推入一个环境栈中，在执行结束后，栈将其环境弹出，把控制权返回给之前的执行环境。

- 当代吗在一个环境中执行时，会创建变量对象的一个作用域链(scope chain)


### javascript没有块级作用域

###清除

- 标记清除：当变量进入环境的时候，会自动标记为“进入环境”，永远不能释放进入环境的变量所占用的内存，当变量离开环境是，则将其标记为“离开环境”。

- 引用计数：被引用加1，被丢弃减1

###垃圾回收

- 在IE中，调用`window.CollectGarbage()`方法会立即执行垃圾收集，Opera7中调用`window.opera.collect()`.

###管理内存

- 一旦数据不在有用，最好通过将其设置为null来释放其引用，适用于全局变量和全局对象属性。

```javascript
	function createPerson(name){
		var localPerson = new Object();
		localPerson.name = name;
		return localPerson;
	}
	
	var globalPerson = createPerson("Nicholas");
	
	globalPerson = null;
```
























