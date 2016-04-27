
/**
 * 画地图
 */
var CanvasMap = document.getElementById("Canvas");
var context = CanvasMap.getContext("2d");//tesk成功
var bgImage;//←要先定义↓这个是构造函数来的
var bgImage = new Image(); //为啥他那里可以这样用?
bgImage.src = "Image/5x6.jpg";//src貌似也是没问题的

var WallImage,			//这个是墙
	WallImage = new Image();
WallImage.src = "Image/Wall.jpg";

var HeroImage,			//这个是英雄
	HeroImage = new Image();
HeroImage.src = "Image/Hero.jpg";

var MonsterImage,			//这个是怪物
	MonsterImage = new Image();
MonsterImage.src = "Image/Monster.jpg";


// context.drawImage(bgImage,0,0);//经过验证是没问题的。我终于知道问题所在了！！意思是这个会提前加载，然后执行过后，
//解析器就不会再解析了、怪不得！虽然说是很弱鸡的一个问题。
bgImage.onload= function(){					//加载地图
	context.drawImage(bgImage,0,0)
}
HeroImage.onload= function(){					//加载英雄
	context.drawImage(HeroImage,200,0)
}
MonsterImage.onload= function(){					//加载坏人
	context.drawImage(MonsterImage,200,500)
}


// /*var Mapimages = document.getElementById('MapImage');这个莫名其妙有时候会刷新不出来，很奇怪
// context.drawImage(Mapimages,0,0);*/


/**
 * 运用PathFindingJS的API创建一个地图
 */
//var grid = new PF.Grid(5, 6);//这个是创建一个画布
//
//  
// var matrix = [				//这个是测试
//     [0,0,1,0,0],
//     [1,0,0,1,0],
//     [0,1,0,0,0],
//     [1,0,0,0,0],
//     [0,0,1,0,0],
//     [1,0,0,0,1],
// ];
// var grid = new PF.Grid(5,6,matrix);//var grid = new PF.Grid( matrix);

/**
 * 生成随机墙的算法
 */
var RDwall=[];
for (var y = 0; y < 6; y++) {		//y轴
	var RDwall2d=[];
	for (var x = 0; x < 5; x++) {		//X轴
		var WallRD=Math.random()*10;									//1/3的都是墙
		if (WallRD>2) {
			RDwall2d.push(0);
		}else {
			RDwall2d.push(1);
		}
	}
	RDwall[y]=RDwall2d;
}
RDwall[0][2]=0;
RDwall[5][2]=0;
var grid = new PF.Grid(5,6,RDwall);


/**
 * 依靠编制出来的API画出一个墙
 */
WallImage.onload= function(){
	for (var i = 0; i < RDwall.length; i++) {
		for (var j = 0; j < RDwall[i].length; j++) {
			if (RDwall[i][j] == 1) {
				var x;
				var y;
				x = j*100;
				y = i*100;
				context.drawImage(WallImage,x,y);
			}
		}
	}
}


/**
 * 点击
 */
CanvasMap.addEventListener("click", function (e) {
	TrFPosition(e);
}, false);

function TrFPosition(event) {
	HeroPosition.preX=HeroPosition.X;
	HeroPosition.preY=HeroPosition.Y;
	HeroPosition.X = Math.floor(event.x/100)*100;
	HeroPosition.Y = Math.floor(event.y/100)*100;
	//console.log("PRE"+HeroPosition.preX+"+"+HeroPosition.preY);
	//console.log(HeroPosition.X+"+"+HeroPosition.Y);
	//render();
	var gridBackup = grid.clone();
	path = finder.findPath(HeroPosition.preX/100,HeroPosition.preY/100,HeroPosition.X/100,HeroPosition.Y/100,gridBackup);
	console.log(path.length);
	if (path.length==0) {
		alert("此处不可行走");
	}else {
		renderpath();
	}
}



/**
 * 渲染动画
 */
function render() {
	context.drawImage(bgImage,0,0)
	for (var i = 0; i < RDwall.length; i++) {
		for (var j = 0; j < RDwall[i].length; j++) {
			if (RDwall[i][j] == 1) {
				var x;
				var y;
				x = j*100;
				y = i*100;
				context.drawImage(WallImage,x,y);
			}
		}
	}
	context.drawImage(MonsterImage,200,500)
	context.drawImage(HeroImage,HeroPosition.X,HeroPosition.Y)
}


/**
 * 主角的位置
 */
var HeroPosition = {};
	HeroPosition.preX=new Number(),
	HeroPosition.preY=new Number(),
	HeroPosition.X=200,
	HeroPosition.Y=0;



/**
 * 计算路径
 */ 
var finder = new PF.AStarFinder({
    allowDiagonal:true,
    dontCrossCorners:true
});
//var path = finder.findPath(2,0,2,5,grid);



/**
 * 生成路径动画
 */
var path;
function renderpath(){
	counter=0;
	for (var i = 0; i < path.length; i++) {
		// var X = 100*path[i][0];
		// var Y = 100*path[i][1];
		// context.drawImage(HeroImage,X,Y);
		var millisec = i*100;
		setTimeout("rendercounter ()",millisec);
	}
}
var counter =new Number();
function rendercounter () {
	context.drawImage(bgImage,0,0)
	for (var i = 0; i < RDwall.length; i++) {
		for (var j = 0; j < RDwall[i].length; j++) {
			if (RDwall[i][j] == 1) {
				var x;
				var y;
				x = j*100;
				y = i*100;
				context.drawImage(WallImage,x,y);
			}
		}
	}
	context.drawImage(MonsterImage,200,500)
	//console.log(counter);
	var X = 100*path[counter][0];
	var Y = 100*path[counter][1];
	context.drawImage(HeroImage,X,Y)
	counter++;
}


