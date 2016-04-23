#BFC（box formatting context）

##Box:css布局基本单位

- block-level box:display的属性为block,list-item,table，会参与block fomatting context

- inline-level box:display属性为inline,inline-block,inline-table的元素，会参与inline formatting context

##Formatting context

- 定义：是w3c CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。有BFC,IFC

##BFC ：块级格式化上下文

### 规则

- 内部的BOX会在垂直方向，一个接一个地放置
- box垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会发生重叠
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
- 计算BFC的高度时，浮动元素也参与计算


### BFC自适应布局

[张鑫旭自适应布局](http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)

### 浮动元素和BFC

- 浮动元素：浮动元素会脱离父类的布局，浮动元素却也是拥有流式布局的。所以设置了float的块级元素即拥有块级元素的特性，又拥有流式布局，但是float布局会以元素上方作为指标，就算其中元素高度不同，但是元素上方一定是同一水平线。如果是多行的，也会有这样的样式。