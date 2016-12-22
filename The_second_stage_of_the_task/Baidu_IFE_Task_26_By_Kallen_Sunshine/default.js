$(document).ready(function() {
	go();
});
function go() {
	var oDiv = document.getElementById('spaceship_1');
		var r = 100; // 半径
		var x = parseInt($("#Screen").css('width'))/2; // 园的中心点 x 坐标
		var y = 160+75; // 园的中心点 y 坐标
		var num = 0; // 起始角度
	setInterval(function(){
		num++
		//Math.sin( num*Math.PI/180 ) = a/r;
		//Math.cos( num*Math.PI/180 ) = b/r;
		// 算出圆周上每一个 A 的 x,y 轴
		var a = Math.sin( num*Math.PI/180 ) * r;
		var b = Math.cos( num*Math.PI/180 ) * r;
		// 算出 圆周上每一个 A 的坐标
		oDiv.style.left = x + b + 'px';
		oDiv.style.top = y + a + 'px';
		// 生成 div 就可以看到运动的痕迹
		var oBox = document.createElement('div');
		oBox.className = 'box';
		document.body.appendChild( oBox );
		oBox.style.left = oDiv.offsetLeft + 10 + 'px';
		oBox.style.top = oDiv.offsetTop + 10 + 'px';
	},30);
}