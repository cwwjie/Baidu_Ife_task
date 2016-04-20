
/**
 * 用于渲染图表的数据
 */
var chartData = [];

/**
 * 给按钮添加事件
 */
function AddControlEventListener () {
	var Button = document.getElementsByName("ControlBTN");
	for (var i = 0; i < 5; i++) {
		Button[i].addEventListener("click", function(event) {
		initChartData(event);
	});} 
}

/**
 * 初始化图表需要的数据格式
 */
function initChartData(event) {
	var InputData = document.getElementById("InputTextContent");
	InputData.select();
	InputDataNumber = parseInt(InputData.value);
	if (InputDataNumber < 10 || InputDataNumber > 100){
		alert("请输入10-100的数字");
		return;
	}else if (InputData.value.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
		alert("请输入数字");
		return;
	}
	else {
		var ControlDiv = document.getElementById("Control");
		if (event.target == ControlDiv.children[2]) {
			chartData.unshift(InputDataNumber);
			renderChart();
		}else if (event.target == ControlDiv.children[3]) {
			chartData.push(InputDataNumber);
			renderChart();
		}else if (event.target == ControlDiv.children[4]) {
			chartData.shift();
			renderChart();
		}else if (event.target == ControlDiv.children[5]) {
			chartData.pop();
			renderChart();
		}else if (event.target == ControlDiv.children[6]) {
			SequenceData();
		}
	}
}

/**
 * 给表格重新排序
 */
function SequenceData () {
	var i = chartData.length, j;
	var tempExchangVal;
	while (i > 0) {
		for (j = 0; j < i - 1; j++) {
            if (chartData[j] > chartData[j + 1]) {
                tempExchangVal = chartData[j];
                chartData[j] = chartData[j + 1];
                chartData[j + 1] = tempExchangVal;
            }
	    }
	    i--;
	}
	renderChart();
}

/**
 * 渲染图表
 */
function renderChart() {
	if (chartData.length < 60) {
		var OutputElement = document.getElementById("Output");
		var ElementInnerHTML = "";
		for (var i = 0; i < chartData.length; i++) {
			var height = chartData[i];
			ElementInnerHTML += "<div onclick='RemoveThis(event)' title='"+i+"' style='background:#4caf50;width:12px;height:"+ (chartData[i]*5) +"px;float:left;margin-left:4px;position:relative;top:"+ (500-chartData[i]*5) +"px'></div>";
		}
		OutputElement.innerHTML = ElementInnerHTML;
	}else {
		alert("队列元素数量最多为60！");
		chartData.pop();
	}
}
/**
 * 移除自己
 */
function RemoveThis(event) {
	//document.getElementById("Output").removeChild(event.srcElement);
	chartData.splice(event.target.title,1);
	renderChart();
}

/**
 * 初始化函数
 */
window.onload=function(){
	AddControlEventListener();
}
