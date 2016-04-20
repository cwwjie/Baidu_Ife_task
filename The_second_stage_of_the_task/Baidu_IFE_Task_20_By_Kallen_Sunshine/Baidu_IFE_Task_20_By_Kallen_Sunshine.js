/**
 * 用于渲染图表的数据
 */
var chartData = [];

/**
 * 给按钮添加事件
 */
function AddControlEventListener () {
    var Button = document.getElementsByName("ControlBTN");
    for (var i = 0; i < 4; i++) {
        Button[i].addEventListener("click", function(event) {
        initChartData(event);
    });} 
    document.getElementsByName("Inquire")[1].addEventListener("click", function(event) {
        SearchChartData(event);
    })
}

/**
 * 初始化图表需要的数据格式
 */
function initChartData(event) {
	var InputData = document.getElementById("InputTextContent");
	var ControlDiv = document.getElementById("Control");
	InputData.select();
	var InputDataNumber = InputData.value.trim();
	var DataArrayDeal = InputDataNumber.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	if (event.target == ControlDiv.children[2]) {
		var InsteadArray = DataArrayDeal.reverse();
		for (var i = 0; i < InsteadArray.length; i++) {
			chartData.unshift(InsteadArray[i]);
			renderChart();
		}
	}else if (event.target == ControlDiv.children[3]) {
		for (var i = 0; i < DataArrayDeal.length; i++) {
			chartData.push(DataArrayDeal[i]);
			renderChart();
		}
	}else if (event.target == ControlDiv.children[4]) {
		for (var i = 0; i < DataArrayDeal.length; i++) {
			chartData.shift(DataArrayDeal[i]);
			renderChart();
			InputData.value = "";
		}
	}else if (event.target == ControlDiv.children[5]) {
		for (var i = 0; i < DataArrayDeal.length; i++) {
			chartData.pop(DataArrayDeal[i]);
			renderChart();
			InputData.value = "";
		}
	}
}

/**
 * 初始化图表需要的数据格式
 */
function SearchChartData(event) {
	var TextData = document.getElementsByName("Inquire")[0].value.trim();
	renderChart(TextData);
}


/**
 * 渲染图表
 **/
function renderChart(TextData) {
	if (chartData.length < 60) {
		var OutputElement = document.getElementById("Output");
		var SpandData = chartData;
		var ElementInnerHTML = [];
		for (var i = 0; i < chartData.length; i++) {
			if (TextData != null && TextData.length > 0) {
				SpandData[i] = SpandData[i].replace(new RegExp(TextData, "g"),"<span style='background:#f70504;'>" + TextData + "</span>");
			}
			var TemData = "<div onclick='RemoveThis(event)' title='"+i+"' style='font-family:"+"微软雅黑"+";font-size:30px;background:#4caf50;min-width:30px;padding:0px 10px;height:50px;float:left;margin-left:15px;margin-bottom:15px;color:#FFF;line-height:50px;'>"+SpandData[i]+"</div>";
			ElementInnerHTML.splice(i,1,TemData);
		}
		OutputElement.innerHTML = ElementInnerHTML.join('');
	}else {
		alert("队列元素数量最多为60！");
		chartData.pop();
	}
}

/**
 * 移除自己
 */
function RemoveThis(event) {
	chartData.splice(event.target.title,1);
	renderChart();
}

/**
 * 初始化函数
 */
window.onload=function(){
    AddControlEventListener();
}
