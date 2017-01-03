$(document).ready(function() {
	// go();
	zhenshi();
	main();
});
function zhenshi() {
	var airship = $("#spaceship_2");
	var r = 100; // 半径
	var x = parseInt($("#Screen").css('width'))/2; // 园的中心点 x 坐标
	var y = 160+75; // 园的中心点 y 坐标
	var num = 0; // 起始角度
	var speed = 0; // 速度
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext('2d');
	

	/* 
	 * 绘制星球
	 * arc方法 -> arc(x, y, radius, startAngle, endAngle, anticlockwise);
	 *  x和y参数是圆心坐标，
	 *  radius是半径，
	 *  startAngle和endAngle则是扇形的起始角度和终止角度（以弧度表示），
	 *  anticlockwise表示做图时应该逆时针画（true）还是顺时针画（false）。
	 */
	ctx.beginPath(); 
	ctx.arc(250,250,50,0,Math.PI*2, true); 
	ctx.fillStyle = "blue"; 
	ctx.fill();

	/*
	 * 绘制飞船(空心矩形)
	 * strokeRect(x, y, width, height)
	 */
	ctx.strokeStyle = 'yellow';
	ctx.strokeRect(10,10,40,20); 

	// 设置字体 与 CSS 类似
	ctx.font = "normal 12px 微软雅黑"; 
	// 设置对齐方式
	ctx.textAlign = "left";
	// 绘制空心字 颜色已经在上方定义
	ctx.strokeText("Hello!", 10, 100); 

	/*
	 * 绘制旋转文字
	 */
	ctx.fillStyle = 'red'; 
	ctx.font = 'bold 16px verdana';
	ctx.fillText("文字1",200,30);
	// 使用 save() 方法保存默认的状态
	ctx.save();
	// rotate() 顺时针旋转的弧度。如果你想通过角度值计算，可以使用公式： degree * Math.PI / 180 。
	// 旋转中心点一直是 canvas 的起始点。 如果想改变中心点，我们可以通过 translate() 方法移动 canvas 。
	ctx.rotate(Math.PI/6);
	ctx.fillText("文字2",200,30);
	// 使用 restore() 进行恢复
	ctx.restore();

	/*
	 * HTML5 JavaScript动画 API 
	 * requestAnimationFrame(fun);
	 * fun 执行的函数
	 * fun 函数接收一个时间码 表示下一秒重绘的时间
	 */
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	function step(timestamp) {
	  if (timestamp < 2000) {
	    requestAnimationFrame(step);
	  }
	}
	requestAnimationFrame(step);

	// 渲染动画的例子
	// var posX = 20,
	//     posY = 100;

	// setInterval(function() {
	// 	ctx.fillStyle = "black";
	//     ctx.fillRect(0,0,canvas.width, canvas.height);

	// 	posX += 1;
	// 	posY += 0.25;

	// 	ctx.beginPath();
	// 	ctx.fillStyle = "white";

	// 	ctx.arc(posX, posY, 10, 0, Math.PI*2, true); 
	// 	ctx.closePath();
	// 	ctx.fill();
	// }, 30);
}




/* 
 * 当一个内部状态发生改变时，会导致其行为发生改变
 * 
 */
function spaceship() {
	/* 飞船的私有属性
	 * 飞船的状态有 -> flying stop
	 * 飞船是否被摧毁 -> 
	 * 飞船的能量 -> 0 ~ 100
	 */
	var Curren_State = {
		number: 1,
		status: "stop",
		destroy:false,
		energy: 100
	},
	// 飞船的状态与方法的映射
	states = {
		flying: function () {
			// 飞行执行的函数
		},
		stop: function () {
			// 停止执行的函数
		},
		destroy: function () {
			// 摧毁执行的函数
		}
	};
	// 动作控制
}
// 飞船改变状态 飞行中 未被摧毁
// spaceship.changeStatus("flying",false);







function main() {
	// 先绘制背景
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// 绘制星球
	ctx.beginPath(); 
	ctx.arc(canvas.width/2,canvas.height/2,50,0,Math.PI*2, true); 
	ctx.fillStyle = "blue"; 
	ctx.fill();
	// 绘制飞船
	ctx.strokeStyle = 'yellow';
	ctx.strokeRect(canvas.width/2-20,canvas.height/2-10,40,20); 
	ctx.fillText("文字1",200,32);
	// 旋转
	ctx.save();
	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.strokeStyle = 'red';
	ctx.rotate(20*Math.PI/180);	
	ctx.fillText("↑",-10+80,-20);
	ctx.strokeRect(-10+80,-20,20,40); 
	ctx.restore();
	ctx.fillText("文字3",200,29);
	ctx.save();
	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.font="12px Arial";
	ctx.fillStyle = "red"; 
	ctx.fillText("飞船一",80,40);
	ctx.restore();
}










































