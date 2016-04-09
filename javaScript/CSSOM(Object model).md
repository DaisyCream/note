##window视图属性


- innerWidth和innerHeight
- pageXOffset和pageYOffset
- scrennX和screenY
- outerWidth和outerHeight

- inner...和outer...区别在于inner是指浏览器内的，如果调出调试框，则height自动回减小，页面可见高度。而outer则是表示整个浏览器的大小，包括任务栏等。

- **pageXoffset,pageYOffset**表示整个页面滚动的像素值。


##Screen视图信息

### availWidth,availHeight

- 显示器可用高度，不包括工具栏

###colorDepth和pixelDepth

- colorDepth匹配应用程序的颜色深度，pixelDepth匹配显示器的颜色深度。

###width和height

- 表示显示器的宽高

- height这类比availHeight多了工具栏的高度。


## 文档视图(DocumentView)和元素视图(ElementView)

###1.elementFromPoint（x,y）

- document.elementFromPoint(100,100),意思是在相对于页面左上角的元素文字颜色变红

- 这个方法可以用来检测元素是否发生重叠或是碰撞

###2.getBoundingClientRect

- 得到矩形元素的界限，返回的是一个对象。

### **clip:rect**

- 根据对上面的TOP, right, bottom,left观察，如果left>=right或者bottom <= top,则元素会被完全裁掉不见。

- 一般来说css sprite使用background-position来调整位置的，但是IE6以下不能使用，它没有Alpha透明通道的png图片。那样就可以使用img来配合clip:rect可以轻松实现sprite图片的hover功能

- clip:rect矩形裁剪只能作用于position:absolute的元素上；
































