/* 作者：Lyndon
 * 文件名称：echarts.extends.js
 * 功能描述：定义echarts常用到的变量,加载函数等
 */
//加载函数处理地图加载类型
function loadEcharts(obj){	
	if(obj.chinaMap){
  		$.ajax({type:"get",url:"./echarts3/mapData/china.json",async:false,success:function(data){echarts.registerMap('china',data);}});
  	}
	if(obj.qhMap){
		$.ajax({type:"get",url:"./echarts3/mapData/qinghai.json",async:false,success:function(data){echarts.registerMap('青海省',data);}});
	}
	if(obj.mapExtend){
		$.ajax({type:"get",url:"./echarts3/mapData/xining.json",async:false,success:function(data){echarts.registerMap('西宁市',data);}});
	  	$.ajax({type:"get",url:"./echarts3/mapData/haibei.json",async:false,success:function(data){echarts.registerMap('海北藏族自治州',data);}});
	  	$.ajax({type:"get",url:"./echarts3/mapData/haidong.json",async:false,success:function(data){echarts.registerMap('海东地区',data);}});
	  	$.ajax({type:"get",url:"./echarts3/mapData/huangnan.json",async:false,success:function(data){echarts.registerMap('黄南藏族自治州',data);}});
	  	$.ajax({type:"get",url:"./echarts3/mapData/hainan.json",async:false,success:function(data){echarts.registerMap('海南藏族自治州',data);}});
	  	$.ajax({type:"get",url:"./echarts3/mapData/guoluo.json",async:false,success:function(data){echarts.registerMap('果洛藏族自治州',data);}});
	  	$.ajax({type:"get",url:"./echarts3/mapData/yushu.json",async:false,success:function(data){echarts.registerMap('玉树藏族自治州',data);}});
	  	$.ajax({type:"get",url:"./echarts3/mapData/haixi.json",async:false,success:function(data){echarts.registerMap('海西蒙古族藏族自治州',data);}});
	  	$.ajax({type:"get",url:"./echarts3/mapData/geermu.json",async:false,success:function(data){echarts.registerMap('格尔木市',data);}});	
	}
	obj.pageFunc();
}
var brightColor=[
	'#FFFFCC','#CCFFFF','#FFCCCC','#FFFF99','#CCCCFF','#FF9966','#FF6666','#FFCC99',
	'#CCFF99','#CCCCCC','#CCFFCC','#99CC99','#99CCCC','#99CCFF','#66CCCC','#99CCFF',
	'#66CCFF','#6699CC'
	];
var lightColor=[
	'#66CCCC','#CCFF66','#FF99CC','#FF9999','#FFCC99','#FF6666','#FFFF66','#99CC66',
	'#666699','#99CC33','#FF9900','#FFCC00','#FF0033','#FF9966','#CCFF00','#CC3399',
	'#FF6600','#993366','#CCCC33','#666633','#CC9999','#FFFF99','#FFFF00','#0099CC',
	'#CCCC99','#99CC00','#3399CC','#CC6600','#999999','#FF9933','#FFFFCC','#009933',
	'#CCCCCC','#009966','#CC6633','#CC0066','#009999','#FFCC33'
	];
var deepColor=[
	'#990066','#FFCC00','#CC0033','#FFCC33','#333399','#FF0033','#666699','#FFFF00',
	'#006699','#FFFF33','#009999','#CC3366','#CCCC00','#663399','#FF9933','#336699',
	'#CC3333','#FFCCCC','#99CC00','#003399','#FF6600'
	];
//本地网默认着色
var localNetColor=[
	{name:"西宁市",itemStyle:{normal:{areaStyle:{color:"#FF6666"}}}},
	{name:"海北藏族自治州",itemStyle:{normal:{areaStyle:{color:"#CCCCFF"}}}},
	{name:"海东地区",itemStyle:{normal:{areaStyle:{color:"#FFCC99"}}}},
	{name:"黄南藏族自治州",itemStyle:{normal:{areaStyle:{color:"#FFCCCC"}}}},
	{name:"海南藏族自治州",itemStyle:{normal:{areaStyle:{color:"#CCFF99"}}}},
	{name:"果洛藏族自治州",itemStyle:{normal:{areaStyle:{color:"#FF9966"}}}},
	{name:"玉树藏族自治州",itemStyle:{normal:{areaStyle:{color:"#CCFFCC"}}}},
	{name:"海西蒙古族藏族自治州",itemStyle:{normal:{areaStyle:{color:"#CCCC33"}}}},
	{name:"格尔木市",itemStyle:{normal:{areaStyle:{color:"#FFFF99"}}}}
];
//地里信息变量
var localNetCode={
	"海北藏族自治州":"0970",
	"西宁市":"0971",
	"海东地区":"0972",
	"黄南藏族自治州":"0973",
	"海南藏族自治州":"0974",
	"果洛藏族自治州":"0975",
	"玉树藏族自治州":"0976",
	"海西蒙古族藏族自治州":"0977",
	"格尔木市":"0979"
};
//本地网坐标
var localNetGis={
	"海北藏族自治州":[100.3711,37.9138],
	"西宁市":[101.4038,36.8207],
	"海东地区":[102.3706,36.2988],
	"黄南藏族自治州":[101.5686,35.1178],
	"海南藏族自治州":[100.3711,35.9418],
	"果洛藏族自治州":[99.3823,34.0466],
	"玉树藏族自治州":[93.5925,33.9368],
	"海西蒙古族藏族自治州":[96.4579,37.4314],
	"格尔木市":[94.8798,36.4104]
};
//全国主要省会坐标
var chinaGis={
	'新疆':[87.9236,43.5883],
	'宁夏':[106.3586,38.1775],
	'青海':[101.4038,36.8207],
	'甘肃':[103.5901,36.3043],
	'西藏':[91.1865,30.1465],
	'云南':[102.9199,25.4663],
	'陕西':[109.1162,34.2004],
	'贵州':[106.6992,26.7682],
	'海南':[110.3893,19.8516],
	'四川':[103.9526,30.7617],
	'重庆':[107.7539,30.1904],
	'广西':[108.479,23.1152],
	'广东':[113.5107,23.2196],
	'湖南':[113.0823,28.2568],
	'湖北':[114.3896,30.6628],
	'河南':[113.4668,34.6234],
	'山东':[117.1582,36.8701],
	'江西':[116.0046,28.6633],
	'福建':[119.4543,25.9222],
	'浙江':[119.5313,29.8773],
	'江苏':[118.8062,31.9208],
	'上海':[121.4648,31.2891],
	'安徽':[117.29,32.0581],
	'吉林':[125.8154,44.2584],
	'辽宁':[123.1238,42.1216],
	'山西':[112.3352,37.9413],
	'河北':[114.4995,38.1006],
	'天津':[117.4219,39.4189],
	'北京':[116.4551,40.2539],
	'黑龙江':[127.9688,45.368],
	'内蒙古':[111.4124,40.4901]
};
//地图参数获取
function getMapParam(lv,t){
	if(lv=='latn'){
		return {'latnName':t};
	}else if(lv=='area'){
		return {'areaName':t};
	}else{
		return {};
	}
}
//处理lenged过长的问题
function getSuitLegend(str,l){
	if(str!=null&&l>0){
		if(str.length>l){
			var reg = new RegExp("(.{"+l+"})",'g');
			return str.replace(reg,'$1\n');//加逗号
		}else{
			return str;
		}
	}
	return '';
}
//echart饼图的特殊样式--可见域
function getVisibleStyle(vcolor,w){
	var visibleStyle={
		normal:{
			label:{show:false},
			labelLine: {show:false},
			color: vcolor,
      			borderColor: vcolor,
      			borderWidth: w
		}
	};
	return visibleStyle;
}
//--不可见域
function getInvisibleStyle(vcolor,w){
	var invisibleStyle={
	    normal : {
	        color: 'rgba(0,0,0,0)',
	        label: {show:false},
	        labelLine: {show:false},
	        borderColor: vcolor,
	        borderWidth: w
	    },
	    emphasis : {
	        color: 'rgba(0,0,0,0)',
	        borderColor: vcolor,
	        borderWidth: w
	    }
	};
	return invisibleStyle;
}
function getPieSeries(val,obj,w){
	var tempData={
		name:obj.name,
		type:'pie',
        //clockWise:false,
		radius : obj.radius,
		center : ['50%','55%'],
		//selectedMode:'single',
		itemStyle : getVisibleStyle(obj.color,w),
		data:[
			{
				value:val,
				name:obj.name
			},{
				value:100-val,
				name:'invisible',
				itemStyle:getInvisibleStyle(obj.rgba,w)
			}
		]
	};
	return tempData;
}