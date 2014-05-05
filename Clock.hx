class Clock {
	static var canvas: js.html.CanvasElement;
	static var height: Float;
	static var width: Float;
	static var context: js.html.CanvasRenderingContext2D;	
	
	static function plot(i: Float, len: Float) {
		var a = ((i * 360)-360/4) * Math.PI / 180;
		
		var x = width  / 2 + Math.cos(a) * Math.min(width / 2, height / 2) / len;
		var y = height / 2 + Math.sin(a) * Math.min(width / 2, height / 2) / len;
		
		context.moveTo(width / 2, height / 2);
		context.lineTo(x, y);
	}
	
	static function drawLabels(min, max, offset, font = "12pt serif") {
		context.font = font;
		for (i in min...(max + 1)) {
			var a = ((i / max * 360)-360/4) * Math.PI / 180;
		
			var x = width  / 2 + Math.cos(a) * Math.min(width / 2, height / 2) / (offset + 0.15);
			var y = height / 2 + Math.sin(a) * Math.min(width / 2, height / 2) / (offset + 0.15);
			//context.fillText("•", x, y);
		
			var x = width  / 2 + Math.cos(a) * Math.min(width / 2, height / 2) / offset;
			var y = height / 2 + Math.sin(a) * Math.min(width / 2, height / 2) / offset;
			context.fillText("" + i, x, y);
		}
	}
	
	static function drawFace() {
		context.beginPath();
		context.fillStyle = "#fff";
		context.arc(width / 2, height / 2, Math.min(width / 2, height / 2) / 1.05, 0, 2 * Math.PI, false);				
		context.fill();
		context.lineWidth = 6;
		context.arc(width / 2, height / 2, Math.min(width / 2, height / 2) / 1.05, 0, 2 * Math.PI, false);				
		context.stroke();
		context.lineWidth = 1;		
		
		var i;
		
		context.fillStyle = "#000";
		drawLabels(1, 24, 1.3, "8pt sans-serif");		
		drawLabels(1, 100, 1.1, "8pt serif");		
		drawLabels(1, 10, 1.2, "24pt serif");				
		
	}		
	
	static function draw() {				
		drawFace();
		
		var now = Date.now();
		
		var a = now.getTime() / 1000;
		var ms = a - Math.floor(a);
		
		var t = (now.getHours() + ((now.getMinutes() + ((now.getSeconds() + ms) / 60)) / 60)) / 24;
		var u = (t * 10) - Math.floor(t * 10);
		var v = (u * 10) - Math.floor(u * 10);
		var w = (v * 10) - Math.floor(v * 10);
		var x = (w * 10) - Math.floor(w * 10);
		var y = (x * 10) - Math.floor(x * 10);
									
		var i = t * 1;
		var f = "" + Math.floor((i - Math.floor(i)) * 1e6);
		
		while (f.length < 6) {
			f = "0" + f;
		}
		
		//js.Browser.document.getElementById("debug").innerHTML = i +"<br/>"+js.Browser.document.getElementById("debug").innerHTML;
		
		js.Browser.document.getElementById("day").innerHTML = ("" + t).substr(0, 2);
		js.Browser.document.getElementById("dd").innerHTML = ("" + t).substr(2, 1);
		js.Browser.document.getElementById("cd").innerHTML = ("" + u).substr(2, 1);
		js.Browser.document.getElementById("md").innerHTML = ("" + v).substr(2, 1);
		js.Browser.document.getElementById("dm").innerHTML = ("" + w).substr(2, 1);
		js.Browser.document.getElementById("cm").innerHTML = ("" + x).substr(2, 1);
		js.Browser.document.getElementById("mm").innerHTML = ("" + y).substr(2, 1);
		
		context.fillText("" + f.substr(0, 3) + "." + f.substr(3), width / 2, height / 2 - 100);
		context.font = "italic 12pt serif";
		context.fillText("moments", width / 2, height / 2 - 75);
									
		context.lineWidth = 5;
		plot(t, 2);
		context.stroke();		
		
		context.lineWidth = 3;
		plot(u, 1.25);
		context.stroke();						
		
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = "#f00";
		plot(v, 1.1);		
		context.stroke();				
		
		if (cast(js.Browser.document.getElementById("myria"), js.html.InputElement).checked) {
			context.beginPath();
			context.lineWidth = 1;
			context.strokeStyle = "#f80";
			plot(w, 1.1);		
			context.stroke();		
		}
		
		if (cast(js.Browser.document.getElementById("decamicro"), js.html.InputElement).checked) {
			context.beginPath();
			context.lineWidth = 1;
			context.strokeStyle = "#ff0";
			plot(x, 1.1);		
			context.stroke();		
		}
		
		if (cast(js.Browser.document.getElementById("micro"), js.html.InputElement).checked) {
			context.beginPath();
			context.lineWidth = 1;
			context.strokeStyle = "#0f0";
			plot(y, 1.1);		
			context.stroke();		
		}
			
		context.strokeStyle = "#000";
		context.beginPath();
		context.arc(width / 2, height / 2, 10, 0, 2 * Math.PI, false);				
		context.fill();
	}
	
	static function main() {				
		canvas = cast(js.Browser.document.getElementById("canvas"), js.html.CanvasElement);
		width = canvas.width;
		height = canvas.height;
		context = canvas.getContext("2d");		
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.font = "32pt serif";
		draw();
		
		var timer = new haxe.Timer(1);
		timer.run = function () { draw(); }
		
	}
}
