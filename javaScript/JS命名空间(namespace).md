# JS命名空间(namespace)

### 属性

- 定义：语言使用一种代码组织的形式通过名称空间来分类，区别不同的代码功能

```javascript
	//配置
	var config = {};
	//后台
	config.front = {};
	//后台数据
	config.front.data = {};
```

可以自己写一个命名空间工厂，然后直接注册就行

```javascript

var namespace = {
    req : function(str){
        var arr = str.split(".");
        var namespace = window;

        for(var i= 0,len = arr.length;i<len;i++){
            if(typeof namespace[arr[i]] == "undefined"){
                namespace[arr[i]] = {};
            }

            namespace = namespace[arr[i]];

        }

    },

    del : function(str){
        var arr = str.split(".");
        var namespace = window;

        for(var i= 0,len = arr.length;i<len;i++){
            if(typeof namespace[arr[i]] == "undefined"){
                return;
            }else if(len == i + 1){
                delete namespace[arr[i]];
            }else{
                namespace = namespace[arr[i]];
            }
        }

    }

};

```

注册事件

```javascript
//先注册命名空间
namespace.reg("config.admin.moudle.color");

//添加功能
config.admin.moudle.color = "red";

//删除命名空间
namespcae.del("config.admin.moudle.color");


```

