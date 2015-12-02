//
//function a(){
//    var n = 1;
//    sum = function(){n++};
//    function b(){
//        console.log(n);
//    }
//    return b;
//}
//var ss = a();
//ss();
//sum();
//ss();
//var sss = a();
//sum();
//sum();
//sum();
//sum();
//sum();
//sss();
//ss.nihao = 'haha';
//console.log(sss.nihao);
//
//var ii = sum;
//var bb = sum;
//ii.hua = 'hua';
//console.log(bb.hua);

/*********************************************************/
//var points = [
//    {x:0, y:0},
//    {x:1, y:1}
//];
//
//points.addPoint = function(x1,y1,x2,y2){
//    this[0] = {x:x1,y:y1};
//    this[1] = {x:x2,y:y2};
//};
//
//points.dist = function(){
//    this.addPoint(0,0,3,4);
//    var p1 = this[0];
//    var p2 = this[1];
//    var a = p2.x - p1.x;
//    var b = p2.y - p1.y;
//    return Math.sqrt(a * a + b * b);
//};
//
//console.log(points.dist());

/*********************************************************/
//
//var name = "The Window";
//var object = {
//    name : "My Object",
//    getNameFunc : function(){
//        function s(){
//            return name;
//        }
//        return s;
//    }
//
//};
//console.log(object.getNameFunc()());
//
//var a = [6,3,5,2,4];
//var b = a[0] + '';
//console.log(typeof b);

/*********************************************************/
//function text(o){
//    var i=0;    //i在整个函数text中都是有定义的
//    if(typeof o == 'object'){
//        var j=0;    //j在整个函数中都是有定义的，不仅仅是这个代码内
//        for(var k=0;k<10;k++){  //k在整个函数体内都是有定义的，不仅仅在这个循环内
//            console.log(k); //输出数字0-9
//        }
//        console.log(k); //输出数字10
//    }
//    console.log(j);    //j已经定义，但可能没有初始化
//}

/*********************************************************/
//
//var o = {
//    m:function(){
//        var self = this;
//        console.log(this === o);
//        f();
//
//        function f(){
//            console.log(this === o);
//            console.log(self === o);
//        }
//    }
//};
//
//o.m();
//
//var object = "BigObject";
//var x = {
//    object : "myObject",
//    ff: function () {
//        var that = this;
//        function ss(){
//            console.log(that.object);
//        }
//        return ss;
//    }
//};
//
//x.ff()();
//
//
//var s = {
//    object: "myObject",
//    ss: function(){
//        console.log(this.object);
//    }
//};

//function text01(){
//    console.log(arguments[0] +" "+ arguments[1]);
//}
//
//text01("hahhaa","lala");
//
//function text02(x){
//    console.log(x);
//    x = null;
//    console.log(x);
//}
//
//text02("wo");

//var text03 = function(x){
//    if(x <= 1) return 1;
//    console.log();
//    return x * arguments.callee(x-1);
//};
//
//console.log(text03(3));
//
//var text04 = function(){
//    console.log(text04.callee);
//};
//
//var text05 = function(){
//    text04();
//};
//text05();


//var text05 = function(x){
//    var text06 = function(){
//        if(x<=1) return 1;
//        return x*text05(x-1);
//    };
//    return text06();
//};
//
//console.log(text05(5));
//
//
//var text06 = function(){
//    console.log(this);
//};
//
//

//function s(x){
//    if(x<=1) return 1;
//    return arguments.callee(x-1);
//}
//console.log(s(5));
//

//
//function addPrivateProperty(o, name, predicate){
//    var value;
//    o["get" + name] = function (){ return value };
//    o["set" + name] = function(v){
//        if(!predicate(v)){
//            return Error("set" + name + ": invalid value " + v);
//        }
//        else
//            value = v;
//    };
//}
//
//var o = {};
//addPrivateProperty(o,"Age",
//    function predicate(age){
//        if(age<=0||(typeof age!="number")||age>=100){
//            return false;
//        }
//        else
//            return true;
//    }
//);
//
//console.log(o.setAge(100));
//console.log(o.getAge());


//function addPrivateProperty(object,propertyName,propertyLimit){
//    var value;
//    object['set' + propertyName] = function(v){
//        if(propertyLimit && !propertyLimit(v)){
//            return Error["This number" + propertyName+": "+value+" is error"];
//        }
//        else
//            value = v;
//    };
//
//    object['get' + propertyName] = function(){
//        return value;
//    }
//}
//
//var o = {};
//addPrivateProperty(o,"Color",function(v){
//    if((typeof v) == "string" && v!=null){
//        return true;
//    }
//    else
//        return false;
//});
//
//o.setColor("#000000");
//console.log(o.getColor());
//
//function f1 (){
//    var funcs = [];
//    for(var i=0;i<10;i++)
//        funcs[i] = function(){return i;};
//    return funcs;
//}
//
//var x = f1();
//console.log(x[5]());

//function cheak(args){
//    var actual = args.length;
//    var expected = args.callee.length;
//    if(actual !== expected){
//        console.log("not ==");
//    }
//    else{
//        console.log('==');
//    }
//}
//
//function f(x,y,z){
//    cheak(arguments);
//}
//
//f(1,2,3);
//
//var scope = "global";
//function construct(){
//    var scope = "local";
//    return function(){return scope;};
//}
//
//console.log(construct()());

//
//var database = {
//    users: ["张含韵", "江一燕", "李小璐"],
//    sendEmail: function (user) {
//        if (this.isValidUser(user)) {
//            console.log("你好，" + user);
//        } else {
//            console.log("抱歉，"+ user +"，你不是本家人");
//        }
//    },
//    isValidUser: function (user) {
//        return /^张/.test(user);
//    }
//};
//
//database.users.forEach(function(item, index, array){
//    database.sendEmail()
//});
//
/*************************appply************************************/
//function trace(o,m){
//    var original = o[m];
//    console.log(original());
//    o[m] = function(){
//        console.log(new Date(), "Entering:",m);
//        console.log(arguments);
//        console.log(this);
//        var result = original.apply(this, arguments);
//        console.log(new Date(), "Exiting:",m);
//        return result;
//    }
//}
//var o = {};
//o["fun1"] = function(){console.log(1);};
//
//
//trace(o,"fun1");
//console.log(o["fun1"](1,2,3));

/*************************bind************************************/
///****example1****/
//var f = function(y){
//    return this.x + y;
//};
//var o = {x: 1};
//var s1 = f.bind(o);
//console.log(s1(2));
//
//
///****example2****/
//var bind = function(m,o){
//    if(m.bind) return m.bind(o);
//    else
//        return function(){
//        return m.apply(o, arguments);
//    };
//};
//
//function ss(y,z){
//    return this.x + y + z;
//}
//
//var k = {x:1};
//
//
//console.log(bind(ss,k)(4,5));


/****example3高阶函数****/
//function not(f){
//    return function (){
//        var result = f.apply(this,arguments);
//        return !result;
//    }
//}
//
//function even(a){
//    return even%2 === 0;
//}
//
//var notEvent = not(event);
//[1,2,3,4].every(notEvent);


/****example3高阶函数****/
//function mapper(f){
//    return function(a){return a.map(f)};
//}
//
//function add(value){
//    return value+=1;
//}
//
//var incrrent = mapper(add);
//
//console.log(incrrent([1,2,3,4]));

/****example3高阶函数****/
function compose(f1,f2){
    return function(){
        return f1.call(this, f2.apply(this,arguments));
    }
}

var square = function (x) { return x*x; };
var sum = function(x,y) { return x+y; };

var squareofsum = compose(square,sum);
console.log(squareofsum(2,3));

























