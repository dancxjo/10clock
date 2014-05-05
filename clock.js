(function () { "use strict";
var Clock = function() { };
Clock.__name__ = true;
Clock.plot = function(i,len) {
	var a = (i * 360 - 90.) * Math.PI / 180;
	var x = Clock.width / 2 + Math.cos(a) * Math.min(Clock.width / 2,Clock.height / 2) / len;
	var y = Clock.height / 2 + Math.sin(a) * Math.min(Clock.width / 2,Clock.height / 2) / len;
	Clock.context.moveTo(Clock.width / 2,Clock.height / 2);
	Clock.context.lineTo(x,y);
};
Clock.drawLabels = function(min,max,offset,font) {
	if(font == null) font = "12pt serif";
	Clock.context.font = font;
	var _g1 = min;
	var _g = max + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var a = (i / max * 360 - 90.) * Math.PI / 180;
		var x = Clock.width / 2 + Math.cos(a) * Math.min(Clock.width / 2,Clock.height / 2) / (offset + 0.15);
		var y = Clock.height / 2 + Math.sin(a) * Math.min(Clock.width / 2,Clock.height / 2) / (offset + 0.15);
		var x1 = Clock.width / 2 + Math.cos(a) * Math.min(Clock.width / 2,Clock.height / 2) / offset;
		var y1 = Clock.height / 2 + Math.sin(a) * Math.min(Clock.width / 2,Clock.height / 2) / offset;
		Clock.context.fillText("" + i,x1,y1);
	}
};
Clock.drawFace = function() {
	Clock.context.beginPath();
	Clock.context.fillStyle = "#fff";
	Clock.context.arc(Clock.width / 2,Clock.height / 2,Math.min(Clock.width / 2,Clock.height / 2) / 1.05,0,2 * Math.PI,false);
	Clock.context.fill();
	Clock.context.lineWidth = 6;
	Clock.context.arc(Clock.width / 2,Clock.height / 2,Math.min(Clock.width / 2,Clock.height / 2) / 1.05,0,2 * Math.PI,false);
	Clock.context.stroke();
	Clock.context.lineWidth = 1;
	var i;
	Clock.context.fillStyle = "#000";
	Clock.drawLabels(1,24,1.3,"8pt sans-serif");
	Clock.drawLabels(1,100,1.1,"8pt serif");
	Clock.drawLabels(1,10,1.2,"24pt serif");
};
Clock.draw = function() {
	Clock.drawFace();
	var now = new Date();
	var a = now.getTime() / 1000;
	var ms = a - Math.floor(a);
	var t = (now.getHours() + (now.getMinutes() + (now.getSeconds() + ms) / 60) / 60) / 24;
	var u = t * 10 - Math.floor(t * 10);
	var v = u * 10 - Math.floor(u * 10);
	var w = v * 10 - Math.floor(v * 10);
	var x = w * 10 - Math.floor(w * 10);
	var y = x * 10 - Math.floor(x * 10);
	var i = t;
	var f = "" + Math.floor((i - Math.floor(i)) * 1e6);
	while(f.length < 6) f = "0" + f;
	window.document.getElementById("day").innerHTML = HxOverrides.substr("" + t,0,2);
	window.document.getElementById("dd").innerHTML = HxOverrides.substr("" + t,2,1);
	window.document.getElementById("cd").innerHTML = HxOverrides.substr("" + u,2,1);
	window.document.getElementById("md").innerHTML = HxOverrides.substr("" + v,2,1);
	window.document.getElementById("dm").innerHTML = HxOverrides.substr("" + w,2,1);
	window.document.getElementById("cm").innerHTML = HxOverrides.substr("" + x,2,1);
	window.document.getElementById("mm").innerHTML = HxOverrides.substr("" + y,2,1);
	Clock.context.fillText("" + HxOverrides.substr(f,0,3) + "." + HxOverrides.substr(f,3,null),Clock.width / 2,Clock.height / 2 - 100);
	Clock.context.font = "italic 12pt serif";
	Clock.context.fillText("moments",Clock.width / 2,Clock.height / 2 - 75);
	Clock.context.lineWidth = 5;
	Clock.plot(t,2);
	Clock.context.stroke();
	Clock.context.lineWidth = 3;
	Clock.plot(u,1.25);
	Clock.context.stroke();
	Clock.context.beginPath();
	Clock.context.lineWidth = 1;
	Clock.context.strokeStyle = "#f00";
	Clock.plot(v,1.1);
	Clock.context.stroke();
	if((js.Boot.__cast(window.document.getElementById("myria") , HTMLInputElement)).checked) {
		Clock.context.beginPath();
		Clock.context.lineWidth = 1;
		Clock.context.strokeStyle = "#f80";
		Clock.plot(w,1.1);
		Clock.context.stroke();
	}
	if((js.Boot.__cast(window.document.getElementById("decamicro") , HTMLInputElement)).checked) {
		Clock.context.beginPath();
		Clock.context.lineWidth = 1;
		Clock.context.strokeStyle = "#ff0";
		Clock.plot(x,1.1);
		Clock.context.stroke();
	}
	if((js.Boot.__cast(window.document.getElementById("micro") , HTMLInputElement)).checked) {
		Clock.context.beginPath();
		Clock.context.lineWidth = 1;
		Clock.context.strokeStyle = "#0f0";
		Clock.plot(y,1.1);
		Clock.context.stroke();
	}
	Clock.context.strokeStyle = "#000";
	Clock.context.beginPath();
	Clock.context.arc(Clock.width / 2,Clock.height / 2,10,0,2 * Math.PI,false);
	Clock.context.fill();
};
Clock.main = function() {
	Clock.canvas = js.Boot.__cast(window.document.getElementById("canvas") , HTMLCanvasElement);
	Clock.width = Clock.canvas.width;
	Clock.height = Clock.canvas.height;
	Clock.context = Clock.canvas.getContext("2d");
	Clock.context.textAlign = "center";
	Clock.context.textBaseline = "middle";
	Clock.context.font = "32pt serif";
	Clock.draw();
	var timer = new haxe.Timer(1);
	timer.run = function() {
		Clock.draw();
	};
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.prototype = {
	run: function() {
	}
	,__class__: haxe.Timer
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Clock.main();
})();
