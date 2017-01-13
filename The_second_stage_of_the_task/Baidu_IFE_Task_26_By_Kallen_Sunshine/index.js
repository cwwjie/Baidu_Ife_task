$(document).ready(function() {
	main();
});
/*
 * 程序主入口
 */
function main() {
	/*
	 * 初始化数据
	 */
	var canvas = document.getElementById("myCanvas"),
		ctx = canvas.getContext('2d');
	// 执行时间，节省性能;
	var timeExecute = 0;
	spaceshipNum.length = 1;
	initSpaceship();
	signalTower.init();
	/*
	 * 动画循环
	 */
	function step(timeStamp) {
	  if (timeStamp > timeExecute) {
		planeRender(canvas,ctx);
	    spaceRender(canvas,ctx);
	  	timeExecute = timeStamp + 1000 ;
	    requestAnimationFrame(step);
	  }else {
	  	requestAnimationFrame(step);
	  }
	}
	requestAnimationFrame(step);
	/**
	 * 行星信号发射器
	 */
}
// 飞船数量
var	spaceshipNum = [];
/*
 * 初始化(飞船数量对象合集)
 */
function initSpaceship() {
	for (var i = 0; i < spaceshipNum.length; i++) {
		if (spaceshipNum[i] == undefined || null) {
			spaceshipNum[i] = new SpaceShip(i+1);
		}
	}
}
/*
 * 渲染飞船的函数
 * 根据(飞船数量对象合集) => 动画
 */
function spaceRender(canvas,ctx) {
	for (var i = 0; i < spaceshipNum.length; i++) {
		// 飞船的能量
		var energy = spaceshipNum[i].energy;
		// 飞船的信号灯
		var signals = spaceshipNum[i].signals;
		// 飞船-星球的距离
		var apart = spaceshipNum[i].apart;
		// 飞船飞行距离
		var distance = spaceshipNum[i].distance;
		// 飞船角度算法 (一圈的距离 Math.PI*2*distance)/(当前的距离distance) = (一圈的角度360)/(当前的角度angle)
		var angle = (360 * distance) / (Math.PI * 2 * apart)

		ctx.save();
		ctx.translate(canvas.width/2,canvas.height/2);
		ctx.rotate(angle * Math.PI / 180);

		ctx.beginPath();
		ctx.fillStyle="#ffffff";
		ctx.font="14px";
		ctx.fillText(energy,(apart+2),-25);
		ctx.fillText(signals,(apart+7.5),25);
		ctx.fill();

		ctx.strokeStyle = 'yellow';
		ctx.strokeRect(apart,-20,20,40);
		ctx.restore();
	}
}
/*
 * 渲染星球
 */
function planeRender(canvas,ctx) {
	ctx.beginPath();
	ctx.fillStyle="#000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.beginPath();
	ctx.arc(250,250,50,0,Math.PI*2, true);
	ctx.fillStyle = "blue";
	ctx.fill();
}
/*
 * 飞船构造函数
 * @param    {num}  number     飞船唯一标识ID
 */
function SpaceShip(num) {
	/**
	 * 私有变量
	 */
	var ID = num,
		exist = true,
		start = true;
		
	/**
	 * 特权变量
	 */
	// 飞船-星球的距离 50 ~ 200 随机数
	var _this = this;
	this.signals = "*";
	this.energy= 100;
	this.apart = parseInt(Math.random()*150+50,10);
	this.distance = 0;
	/*
	 * 私有方法
	 */
	function init() {
		setInterval(function(){
			Solarenergy();
		},5000);
		setInterval(function(){
			energyConsum();
		},1000);
	}
	init();
	// 太阳能源系统 宇宙中通过太阳能充电(每5秒增加2%)
	function Solarenergy() {
		if (exist == false) {
			return
		};
		if (_this.energy < 100) {
			_this.energy += 2;
		};
	}
	// 能源消耗系统 速度每秒(每秒消耗1%)
	function energyConsum() {
		if (exist == false) {
			return
		}
		if (start == false) {
			return
		}
		if (_this.energy > 0) {
			_this.energy = _this.energy - 1;
			_this.distance += 1;
		}
	}
	// 命令接收器
	this.receiver = function(order){
		// 模拟丢包概率
		var loss = Math.random()*100;
		if (loss < 30) {
			return
		}
		_this.signals = "!";
		setTimeout(function(){
			_this.signals = "*";
		},1000);
		if (order.id !== ID) {
			return
		}
		if (order.command == 'stop') {
			start = false;
		}else if (order.command == 'start') {
			start = true;
		}else if (order.command == 'destroy') {
			exist = false;
		}
	}
}
/**
 * 行星信号发射器
 */
var signalTower = function () {
	function init(){
		var _DOM = $("<div class='BTN'></div>");
		var _string = "对<span>"//
			+ 1 +"</span>飞船下达指令: <button onclick='signalTower.send("//
			+ 1 +",event)' data-command='start'>开始飞行</button> <button onclick='signalTower.send("//
			+ 1 +",event)' data-command='stop'>停止飞行</button> <button onclick='signalTower.send("//
			+ 1 +",event)' data-command='destroy'>销毁</button>"
		$(_DOM).html(_string);
		$("#renderBTN").append(_DOM);
		CreateSpaceship();
	}
	var sendSignal = function(id,event) {
		if (event.target.innerHTML == "正在发送") {
			return
		}
		var command = event.target.getAttribute("data-command");
		var name = event.target.innerHTML;
		event.target.innerHTML = "正在发送";
		// 生成命令
		var order = {
			id:id,
			command:command
		}
		// 正常传送的时间需要1秒
		setTimeout(function(){
			for (var i = 0; i < spaceshipNum.length; i++) {
				event.target.innerHTML = name;
				spaceshipNum[i].receiver(order);
			}
		},1000);
	}
	//创建飞船
	function CreateSpaceship() {
		$("#Add").click(function(){
			if (spaceshipNum.length < 4) {
				spaceshipNum.length += 1; 
				initSpaceship();
				var _DOM = $("<div class='BTN'></div>");
				var _string = "对<span>"//
					+ spaceshipNum.length +"</span>飞船下达指令: <button onclick='signalTower.send("//
					+ spaceshipNum.length +",event)' data-command='start'>开始飞行</button> <button onclick='signalTower.send("//
					+ spaceshipNum.length +",event)' data-command='stop'>停止飞行</button> <button onclick='signalTower.send("//
					+ spaceshipNum.length +",event)' data-command='destroy'>销毁</button>"
				$(_DOM).html(_string);
				$("#renderBTN").append(_DOM);
			}
		})
	}
	var obj = {
		send:sendSignal,
		init:init
	}
	return obj;
}();
