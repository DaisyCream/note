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

###操作符

- 一元加减操作符：如果是数字会直接操作，若是其他，就会转化为数字在操作

```javascript
	var s1 = "01";
	var s3 = "z";
	
	s1 = +s1;//1
	s3 = +s3;//NaN
```






