#移动web的离线应用

###离线与缓存

- 网页缓存依赖于网络的存在，而离线应用在离线状态下仍然可用。
- 网页缓存主要缓存当前页面相关内容，也仅限于当前页面的读取。离线应用则主要缓存文件，只要设置缓存该文件的页面，都能在离线状态下读取该文件。

##移动设备的支持

- 浏览器的支持情况基本和本地存储的支持情况相同，但是，使用离线应用功能前，建议先通过javascript检查浏览器是否支持离线应用

```javascript
	if(window.applicationCatch){
		
	}

```

##applicationCache和manifest

###1.离线资源缓存
当设备所在的浏览器处于在线状态是，被指定缓存的资源文件就会缓存到本地，此后，若用户在离线状态时再次访问wen应用程序，浏览器便会自动加载本地资源文件，让用户能够正常使用该web应用

- manifest:离线应用将使用manifest类型文件作为需要配置缓存资源文件的配置文件

###2.applicationCache对象缓存状态
applicationCache对象记录着web应用程序的缓存状态，开发者可以通过该缓存转态手动更新资源文件的缓存

###3.在线转态检测
使用online方法检测当前网络是否在线。

###manifest文件

只需要在html标签中增加manifest属性，并制定manifest文件，就可以实现HTML5离线应用

```javascript
<!DOCTYPE html>
<html manifest = "cache.manifest">
<head>
	<meta charset = "utf-8">
	<title>离线应用缓存示例 - manifest</title>
</head>
<body></body>
</html>
```

manifest的MIME类型是text/cache-manifest,因此web服务器需要通过配置mime类型，才能识别manifest文件。如在tomcat服务器下，开发人员需要在tomcat目录下的conf/web.xml文件中配置manifest类型

```javascript
//在web.xml中mime-mapping类型处增加如下代码
<mime-mapping>
	<extension>manifest</extension>
	<mime-type>text/cache-manifest</mime-type>
</mime-mapping>
//在cache.manifest文件，在次文件第一行添加如下代码：
CACHE MANIFEST
```

```javascript
	CACHE MANIFEST
	#缓存的文件
	//通过本地缓存直接读取
	index.html
	text.js
	#不作缓存
	//文件是否被保存，都必须从网络中下载
	NETWORK
	/images/
	FALLBACK
	offline.html index.html

```

###applicationCache对象和事件
定义：applicationCache对象记录着本地缓存的各种状态及事件
缓存的状态可以通过window.applicationCache.status获得。

- UNCACHED = 0;//未缓存
- IDLE = 1;//空闲状态
- CHECKING = 2;
- DOMLOADING = 3;//下载中
- UPDATEREADY = 4;//更新准备中
- OBSOLETE = 5;//过期状态



- Checking：检查中,当user agent检查更新时，或第一次下载manifest清单时，它往往回事第一个被触发的事件。
- Noupdate：当检查到manifest中清单文件不需要更新时，触发该事件
- downloading：*第一次*下载或更新manifest清单文件时，触发该事件
- progress：该事件与downloading类似，但downloading事件只触发一次，progress事件则在清单下载过程中周期性触发
- Cache：当manifest清单文件下载完毕*成功缓存*后，触发该事件
- updateready：此事件表示缓存清单*文件*已经下载完毕，可通过重新加载页面读取缓存文件或通过方法swapCache切换新的缓存文件，常用于本地缓存更新版本后提示。
- Obsolete：加入访问manifest缓存文件返回404，或410时，触发该事件。
- Error：已出发obsolete事件，manifest文件没有改变，但缓存文件中存在文件下载失败，获取manifest文件发生错误，更新版本时，manifest被再次修改

可以根据applicationCache对象的转态处理相关业务

```javascript
applicationCache.addEventListener("updateready", function(){

})

```

###判断浏览器的状态
window.navigator属性online

```javascript
if(window.navigator.online){
}else{
}

```




























