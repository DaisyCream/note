# Geolocation地理定位

##使用

Geolocation API是通过window.navigator.geolocation获得对地理定位的访问的，该对象有如下三个方法

###首次获取当前位置

getCurrentPostion()获取用户的地理位置信息，它可以传递三个参数

void getCurrentPosition(in PositionCallback sucessCallback,
							 in optional PositionErrorCallback errorCallback,
							 in optional PositionOptions options);
							 
第一个是必要的参数，当获取地理位置成功时返回执行的回调函数
第二个参数是获取地理位置信息异常或失败时执行的回调函数，可选
第三个参数是可选参数，它主要是一些可选属性参数设置

```javascript
navigator.geolocation.getCurrentPostion(function(pos){
	console.log(pos.coords.latitude);//当前地理位置的纬度
	console.log(pos.coords.longitude);//当前地理位置的经度
	console.log(pos.coords.accuracy);//当前经纬度的精度
})


```

1.enableHighAccuracy
浏览器或移动设备更精确的读取精度和纬度，默认值为false，但如果为true，设备会花费更多的时间和电量。

2.timeout
告诉geolocation允许与毫秒为单位的最大时间间隔

3.maximunAge
当缓存的位置信息时间小于timeout的设置值，应用程序将接受一个缓存的位置信息。

### 监视移动设备的位置变化

watchPostion方法返回一个唯一标识，clearWatch会根据这个唯一标识清楚watchPostion的监听
							 
第一个是监听成功后返回的函数
第二个参数是监听失败后返回的函数
第三个参数是可选参数

```javascript
	navigator.geolocation.getCurrentPostion(function(pos){})
	
	var watchID = navigator,geoloaction.watchPostion(function(pos){
		//....
		//当前位置变化
		navigator.geolocation.clearWatch(watchID);
	});


```



























