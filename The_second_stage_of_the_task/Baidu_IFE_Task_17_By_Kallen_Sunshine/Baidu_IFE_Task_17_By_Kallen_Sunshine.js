/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var CharElements = document.getElementsByClassName("aqi-chart-wrap")[0];
  var CreateFieldset = "";
  CreateFieldset = "<fieldset style='min-width:735px;height:520px'><legend>"+pageState.nowSelectCity+"市01-03月每"+chartData.DataCHS+"空气报告:</legend>";
  for (var i = 0 ; i < chartData.StripNumber ; i++) {
    CreateFieldset += "<div  title="+chartData.Titleshow[i]+" onmouseover='title_show(event)' onmouseout='title_back(event)' style='height:"+chartData.Height[i]+"px;width:"+chartData.Width+"px;float:left;margin-left:"+chartData.Interval+"px;background:"+chartData.Color[i]+";position:relative;top:"+(500-chartData.Height[i])+"px;'></div>";
  }
  CreateFieldset += "</fieldset>";
  CharElements.innerHTML=CreateFieldset;
}
function title_show(event) {
  var div = document.getElementById("title_show");
  div.innerHTML = event.target.title;
  div.style.display = '';
  var ChartDataWidth = parseInt(chartData.Width);
  div.style.left = (event.toElement.offsetLeft - 51.25 + ChartDataWidth/2)+"px";
  div.style.top = (event.toElement.offsetTop-55)+"px";
  var exist = event.target.title.substring(8,9)
}
function title_back(event) {
  var div=document.getElementById("title_show");
  div.style.display = "none";
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化
  
  // 设置对应数据
  pageState.nowGraTime = event.target.value;
  // 调用图表渲染函数
  initAqiChartData();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
  // 确定是否选项发生了变化 

  // 设置对应数据
  pageState.nowSelectCity=event.target.value;
  // 调用图表渲染函数
  initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var Radiostatus = document.getElementsByName("gra-time");
  for (var i = 0; i < Radiostatus.length; i++){
    Radiostatus[i].addEventListener("click", function (event) {
       graTimeChange(event);
    });
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var CityDate = document.getElementById("city-select");
  CityDate.remove(CityDate.firstChild);
  pageState.nowSelectCity = "北京";
  for (var CityName in aqiSourceData) {
    var NewCity = document.createElement('option');
    NewCity.text = CityName;
    NewCity.value = CityName;
    CityDate.add(NewCity);
  }
  // 给select设置事件，当选项发生变化时调用函数 citySelectChange
  CityDate.addEventListener("change", function(event){
    citySelectChange(event);
  });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var StripNumber="",Color=[],Height=[],Width="",Interval="",DataCHS="",Titleshow=[];
  var ChartDataHeightTemporary = [];
  var DetailsDate = [];
  for (var AQI in aqiSourceData[pageState.nowSelectCity]) {
    ChartDataHeightTemporary.push(aqiSourceData[pageState.nowSelectCity][AQI]);
    DetailsDate.push(AQI);
  }
  if (pageState.nowGraTime=="day"){
    DataCHS = "天";
    Width = "5";
    Interval = "3";
    StripNumber = ChartDataHeightTemporary.length;
    Height = ChartDataHeightTemporary;
    for (var i = 0; i < StripNumber; i++) {
      Titleshow.push(DetailsDate[i]+"到"+DetailsDate[i]+"的AQI为"+ChartDataHeightTemporary[i]);
      if (ChartDataHeightTemporary[i] >= "400") {
        Color.push("#512da8");
      }else if (ChartDataHeightTemporary[i] < "400" && ChartDataHeightTemporary[i] >= "300") {
        Color.push("#673ab7");
      }else if (ChartDataHeightTemporary[i] < "300" && ChartDataHeightTemporary[i] >= "200") {
        Color.push("#1976d2");
      }else if (ChartDataHeightTemporary[i] < "200" && ChartDataHeightTemporary[i] >= "100") {
        Color.push("#2196f3");
      }else if (ChartDataHeightTemporary[i] < "100" && ChartDataHeightTemporary[i] >= "0") {
        Color.push("#64b5f6");
      }
    }
  }else if (pageState.nowGraTime=="week") {
    DataCHS = "周";
    Width = "30";
    Interval = "24";
    StripNumber = Math.floor(ChartDataHeightTemporary.length/7);
    for (var i = 1; i <= StripNumber; i++) {
      var count = 0;
      for (var j =-7; j < 0; j++) {
        count += ChartDataHeightTemporary[i*7+j];
      }
      count=count/7;
      Titleshow.push(DetailsDate[i*7-7]+"到"+DetailsDate[i*7]+"的AQI为"+Math.floor(count));
      Height.push(Math.floor(count));
      if (count >= "400") {
        Color.push("#512da8");
      }else if (count < "400" && count >= "300") {
        Color.push("#673ab7");
      }else if (count < "300" && count >= "200") {
        Color.push("#1976d2");
      }else if (count < "200" && count >= "100") {
        Color.push("#2196f3");
      }else if (count < "100" && count >= "0") {
        Color.push("#64b5f6");
      }
    }
  }else if (pageState.nowGraTime=="month") {
    DataCHS = "月";
    Width = "105";
    Interval = "105";
    StripNumber = Math.floor(ChartDataHeightTemporary.length/30);
    for (var i = 1; i <= StripNumber; i++) {
      var count = 0;
      for (var j =-30; j < 0; j++) {
        count += ChartDataHeightTemporary[i*30+j];
      }
      count=count/30;
      Titleshow.push(DetailsDate[i*30-30]+"到"+DetailsDate[i*30]+"的AQI为"+Math.floor(count));
      Height.push(Math.floor(count));
      if (count >= "400") {
        Color.push("#512da8");
      }else if (count < "400" && count >= "300") {
        Color.push("#673ab7");
      }else if (count < "300" && count >= "200") {
        Color.push("#1976d2");
      }else if (count < "200" && count >= "100") {
        Color.push("#2196f3");
      }else if (count < "100" && count >= "0") {
        Color.push("#64b5f6");
      }
    }
  }
  // 处理好的数据存到 chartData 中
  chartData.DataCHS = DataCHS;
  chartData.StripNumber=StripNumber;
  chartData.Color=Color;
  chartData.Height=Height;
  chartData.Width=Width;
  chartData.Interval=Interval;
  chartData.Titleshow=Titleshow;
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

window.onload=function(){
 init();
}
