#JS高级教程第三章笔记

- 未定义和未声明的变量typeof(操作符)检测都为undefined，应该显示的初始化变量，这样就可用typeof来区分一个变量是否是未声明。


- Null只有一个值为null，null表示一个空对象的指针，所以typeof null==》Object，如果定义变量将来用于保存对象，则可将该变量初始化为null，这样只要检查null就可以看此变量是否已经保存了一个对象的引用。


- 对于判断一个变量用Boolean，在if中不要直接使用if(value)，尽量使用if(boolean(value))


- 不要测试某个特定的浮点数值，会产生舍入误差的问题。

```javascript
	if(a+b == 0.3){//错误
		alert("you got 0.3");
	}
```

###转换数值

- 转换数值函数：Number(),parseInt(),parseFloat()

```javascrpit
	//Number()
	Number("")//0
	Number(false)//0
	Number(true)//1
	Number("1,1")//1.1
	Number("hello")//NaN
	Number("001111")//1111
```

```javascrpit
	//parseInt()
	一般来说指明基数
	parseInt("");//NaN
	parseInt("  b123");//NaN
	parseInt("1234blue");//1234
	parseInt("070");//56(八进制)
	parseInt(22.5);//22
	parseInt("AF", 16);//175(十六进制)
	parseInt("10", 2);//2(二进制)
```


```javascrpit
	//parseFloat
	会忽略前面的0
	parseFload("1234blue");//1234
	parseFload("0xA");//0
	parseFload("22.5");22.5
	parseFload("22.34.5");//22.34
	parseFload("0908.5");//908.5
	parseFload("3.125e7");//31250000
```

- tostring()，除了null和undefined都有这个方法,string()可以将任何类型的值转化为字符串，包括null和undefined。

```javascript
	var num = 10;
	num.toString(2)//"10";
	var value1 = null
	String(value1);//"null"
```

- 查看字符串中某字符的值用str.charCodeAt(index)来查看，若超出了ASCLL码值，返回的结果是Unicode编码

###操作符

- 一元加减操作符：如果是数字会直接操作，若是其他，就会转化为数字在操作

```javascript
	var s1 = "01";
	var s3 = "z";
	
	s1 = +s1;//1
	s3 = +s3;//NaN
```

```javascript
	var num = -18
	console.log(num.toString(2))//-10010
```

- 按位非(NOT)：用波浪线表示（~）

```javascript
	var num1 = 25;   //0011001
	var num2 = ~num1;//1100110这里不用加一，直接反
	console.log(num2);//-26
```

- 按位与(AND)：任何一位为0都为0

```javascript
	var result = 25 & 3;
	console.log(result); //1
	//11001
	//00011

```

- 按位或(OR)：除了00，其余都为1

```javasccript
	var result = 25 | 3;
	console.log(result); //27
	//11001
	//00011

```

- 按位异或(xor)：相同的为0

```javascript
	var result = 25 ^ 3;
	console.log(result); //26
	//11001
	//00011

```


###布尔操作

- 非(!)：先将它的操作数转化为一个布尔值，然后在求反

- 与(&)：若前一个是对象，则会返回第二个操作数；若两个都是对象，则会返回后一个；若果第一个操作数为ture，第二个是对象，则会返回对象。Null，NaN，Unifined都会返回原值。

- 或(|)：若前一个是对象，则会返回对象，


###乘除操作符

- 如果零被零除的话，结果为NaN，如果是非零的有限数被零除，如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity，取决于有操作符的符号；

- 如果一个操作数不是数的话，则在后台调用Number()将其转化为数值，然后运用规则。

- 求模，如果操作数是错误的，则结果都为NaN

```javascript
	var num1 = 5;
	var num2 = 10;
	var message = "The sum of 5 and 10 is " + num1 + num2;
	console.log(message);//The sum of 5 and 10 is 510;
```


```javascript
	//告诉先计算值，再拼接起来
	var num1 = 5;
	var num2 = 10;
	var message = "The sum of 5 and 10 is " + (num1 + num2);
	console.log(message);//The sum of 5 and 10 is 15;
```

- 减法中，如果操作数不是数字，则用Number()来进行装换，如果操作符是对象，则调用对象的valueOf()值，若没有则调用toString();

```javascript
	var result1 = 5 - true;//4
	var result2 = NaN - 1;//NaN
	var result3 = 5 - ""; 
	var result4 = 5 - "2";//3
	var result6 = 5 - null;//5
```

###关系操作符

- 任何数和NaN比较都是false

- 相等操作符：如果两个操作数都是对象，则看两个操作数都指向同一个对象，如果相等则是true；undefined == null

- 全等操作符，不会转换形式，不同类型的值就有不同

```javascript
	result1 = ("55" != 55) //false
	result2 = ("55" !=== 55)//true

```


###for-in
```javascript
	for(var propName in window){
		document.write(propName);
	}
```

每次循环都会将window对象中存在的属性名赋值给变量propName，知道对象中的所有属性都被枚举一遍为止。因为对象属性没有顺序，所以for-in循环输出的顺序是不可预测的。在使用for-in循环之前，先检测确认该对象的值不是null或undefined。

###lable,break,continue

- lable: 可在代码中添加标签，以便将来使用。

```javascript
	start:for(var i=0;i<count;i++){
		alert(i);
	}
```

- break & lable：如下例子，直接跳出2层循环，本来break的作用只是跳出一次循环，但是因为和lable结合了，所以直接跳出2层；

```javascrpit
	var num=0;

	outermost:
	for(var i=0;i<10;j++){
		for(var j=0;j<10;j++){
			if(i == 5 && j == 5){
				break outermost;
			}
			num++;
		}
	}
	console.log(num);//55

```

- countinue & lable：如下例子，continue的作用本是使控制此循环的变量j++，然后再在此循环里继续，但是和lable搭配，则它会直接跳出continue在的这个循环，在外循环的变量i++，然后继续执行循环；

```javascrpit
	var num=0;

	outermost:
	for(var i=0;i<10;j++){
		for(var j=0;j<10;j++){
			if(i == 5 && j == 5){
				continue outermost;
			}
			num++;
		}
	}
	console.log(num);//95

```

- with 语句是将代码的作用域设置到一个特定的对象中（不建议使用）

```javascript
	var qs = location.search.substring(1);
	var hostName = location.hostname;
	var url = loaction.href;
	
	with(location){
		var qs = search.substring(1);
		var hostName = hostname;
		var url = href;
	}

```

- switch：语句在比较时是使用全等符号，因此不会发生类型转换(“10”!==10)


###函数

- arguments：是函数参数的表现形式，但是两者并不是同一个内存空间上的，但是arguments对象中的值会自动反应到对应的命名参数，所以修改了arguments，也会对应修改了参数，影响是单向的，修改命名参数不会改变arguments的值。没有传递至的命名参数被自动赋予undefined值，这就跟定义了变量又没初始化一样。

- 函数没有重载这一说法，如果定义了两个名字一样的函数，则后定义函数会覆盖前面定义的函数。

- 可以通过检查传入的参数类型和数量的不用反应，模仿重载














