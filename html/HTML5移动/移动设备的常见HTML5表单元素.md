# 移动设备的常见HTML5表单元素

## 表单属性

1.form

```javascript
	<form id="testform">
		<input type="text" />
	</form>
	<input form=testform />
```
在HTML4中，form外的input并不会属于form表单，在提交表单时，form外的input也不会一并提交，但是在h5中，我们只需要为外部input增加form属性，并指定form的ID值为testofrm

2.placeholder
用法：当文本框处于未输入转态并且内容为空时给出的文本框提示内容

3.autofocus
指定控件自动获得焦点，需要注意的是，一个HTML页面中只能有一个控件具有该属性

```javascript
	<input type="text", autofocus />
```

4.List,datalist

5.auticomplete
“on”表示开启自动完成输入，“off”则表示禁止使用自动完成输入功能

6.required属性
若出现又required属性的元素中，该元素的值为空，则无法提交该表单

```javasript
	<input type="text", required/>
```

## 移动web表单的input类型

### search类型文本
search类型文本是一种input元素，主要应用于搜索关键字的文本框。

### email类型文本
是一个可以指定电子邮件内容的文本，用在输入email地址的文本框中
其实外形和text没区别，只是它在safari中能够使系统知道输入时所用的键盘是邮箱键盘

### number类型文本
是一种用于输入数字的文本类型，可以配合min，max，step属性
也是提供的默认键盘不同

### range类型文本
是一种输入数值范围的，提供一种滑动输入的方式，需要配合min，max，step属性，但是ios和andriod都不支持

### tel类型文本
输入电话号码的文本框，也是在Safari中默认提供数字输入法


### url类型文本
用于输入url地址的文本类型，也是在Safari中默认提供地址输入法


## 表单属性应用范围

![](/Users/DaisyCream/Library/Containers/com.tencent.qq/Data/Library/Application Support/QQ/Users/479703843/QQ/Temp.db/F748094E-2634-4524-A706-B00D64C65CBD.png)

