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
- BFC的区域不会与float box重叠
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
- 计算BFC的高度时，浮动元素也参与计算



- **BFC**


- **BFC**