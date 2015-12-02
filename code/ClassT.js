/**
 * Created by DaisyCream on 15/11/28.
 */

/****************************************************/
var o1 = Object.create({x:1, y:2});
var o2 = Object.create(null);
var o3 = Object.create(Object.prototype);   //o3 = {} || new Object()


//创建子对象的方法,无法代替Object.create()，它不能传入null原型来创建对象
function inherit(p){
    if(p == null) throw TypeError();
    if(Object.create)
        return Object.create(p);

    var t = typeof p;
    if(t !== "object" && t !== "function") throw TypeError();
    function f(){};
    f.prototype = p;
    return new f();

}

/****************************************************/


//range.methods = {
//    includes: function(x){
//        return this.from <= x && x >= this.to;
//    },
//
//    foreach: function(f){
//        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
//    },
//
//    toString: function(){return "("+this.from+"..."+this.to+")";}
//};
//
//function range(from, to){
//    var r = inherit(range.methods);
//    r.from = from;
//    r.to = to;
//
//    return r;
//}
//
//var r = range(1,3);
//r.includes(2);
//r.foreach(console.log);
//console.log(r.toString());


/****************************************************/
var o = {
    x:1
};
function f(){};
f.prototype = o;

var n = new f();

var s = o.constructor;
console.log(n.x);