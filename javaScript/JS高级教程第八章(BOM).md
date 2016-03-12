#JS高级教程第八章(BOM)

##window对象

###全局作用域

- 隐式声明的全局变量和以window作为执行环境的变量可以用delete删除，而var声明的变量不可以用delete删除，原因是var语句添加的window属性有一个名为[[Configurable]]属性值被设置为false；

```javascript
var a = 1;
b = 2;
global.c = 3;

delete a;
delete b;//再次访问时报错，is not undefined
delete c;//再次访问时报错，is not undefined

```
- 尝试未声明的变量会报错，但是可以通过window对象，可以知道某个可能声明未声明的变量是否存在

```javascript
//报错，oldvalue为定义
var newValue = oldValue;

//不会报错，因为这是一次属性查询
var newValue = window.oldValue
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


