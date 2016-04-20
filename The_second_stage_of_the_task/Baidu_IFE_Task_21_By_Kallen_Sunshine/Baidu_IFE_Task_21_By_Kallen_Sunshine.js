/**
 * 用于渲染图表的数据
 */
//var ChartData = {};

/**
 * 给按钮添加事件
 */
function AddEventListener () {
	var Input = document.getElementById("TagInput")
	document.getElementById("TagInput").addEventListener("keyup",ShowTag);
	document.getElementById("HobbyInput").addEventListener("click",ShowHobby);
	document.getElementById("OutputTag").addEventListener("click",function (Event) {
		var _Array = OutputTag.ChartData;
		OutputTag.ChartData.splice(Event.target.title,1);
		var _Str = OutputTag.DealChartData();
		document.getElementById("OutputTag").innerHTML = _Str;
	});
}

/**
 * 初始化图表需要的数据格式  抽象 封装
 */
function InitChartData() {
	this.ChartData=[];
	this.DealChartData = function () {
		var _String = "";
		for (var i = 0; i < this.ChartData.length; i++) {
			_String += "<div title='"+i+"'>"+this.ChartData[i]+"</div>"
		}
		/*this.ChartData.forEach(function (_Data) {
			_String += "<div>"+_Data+"</div>"
		});*/
		return _String;
	}
}
/*
var _text = new InitChartData();
_text.ChartData.push("asdadas");
var _string = _text.renderChart();
console.log(_string);
*/


/**
 * 创建Tag实例，并且利用封装的方法输出结果
 */
var OutputTag = new InitChartData();
function ShowTag() {
	var InputTagData = document.getElementById("TagInput");
	if (/[,，;；、\s\n]+/.test(InputTagData.value) || event.keyCode == 13){//标签Tag输入框就不会每次都执行
		var data = InputTagData.value.trim(),
			chackData = data[0];
		if (OutputTag.ChartData.indexOf(chackData) === -1){
			OutputTag.ChartData.push(data);
			if (OutputTag.ChartData.length > 10){
				OutputTag.ChartData.shift();
			}
			var _Str = OutputTag.DealChartData();
			document.getElementById("OutputTag").innerHTML = _Str;
			//console.log(_Str);
			
			InputTagData.value = "";
		}
	}
}

/**
 * 创建Hobby实例，并且利用封装的方法输出结果
 */
var OutputHobby = new InitChartData();
function ShowHobby(){
	var InputHobbyData = document.getElementById("HobbyInputArea").value.trim();
	var DataTurnArray = InputHobbyData.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	for (var i = 0; i < DataTurnArray.length; i++) {
		var str = DataTurnArray[i];
		if (OutputHobby.ChartData.indexOf(str) === -1){
			OutputHobby.ChartData.push(str);
			if (OutputHobby.ChartData.length > 10){
				OutputHobby.ChartData.shift();
			}
		}
	}
	var _Str = OutputHobby.DealChartData();
	document.getElementById("OutputHobby").innerHTML = _Str;
}



/**
 * 初始化函数
 */
window.onload=function(){
    AddEventListener();
}
