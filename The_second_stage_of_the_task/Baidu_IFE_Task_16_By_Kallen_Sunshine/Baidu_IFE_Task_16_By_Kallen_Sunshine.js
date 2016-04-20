/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city_data = document.getElementById("aqi-city-input");
	var aqi_data = document.getElementById("aqi-value-input");
	if(!city_data.value.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
		alert("请输入纯中文城市名称");
		return;
	}
	else {
		var _city = city_data.value;
	}  
	if(!aqi_data.value.match(/^\d+$/)){
		alert("请输入正确的空气指数");
		return;
	}
	else {
		var _aqi = aqi_data.value;
	}
	aqiData[_city] = _aqi;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table_data = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for (var city in aqiData){
		table_data += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button id="+city+">删除</button></td></tr>"
	}
	document.getElementById("aqi-table").innerHTML = table_data;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {
	document.getElementById("add-btn").addEventListener("click",addBtnHandle);
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  	document.getElementById("aqi-table").addEventListener("click",function(event){
  		delBtnHandle.call(null,event.target.id);
  	})
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
