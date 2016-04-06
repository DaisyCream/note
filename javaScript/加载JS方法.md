```javascript
var loadJs = function(url, callback){

	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = url;
	head.appendChild(script);
	
	var ua = navigator.userAgent,
	    ua_version;
	    
	//IE6/7/8
	if(/MSIE([^;+)/.test(ua)){
		ua_version = parseFloat(RegExp["$1"],10);
		if(ua.version <= 8){
			script.onreadystatechange = function(){
				if(this.readyState == 'onload'){
					callback();
				}
			}
		}else{
			script.onload = function(){
				callback();
			};
		
		}
	
	}else{
		script.onload = function(){
			callback();
		}
	}
	
	
}


```