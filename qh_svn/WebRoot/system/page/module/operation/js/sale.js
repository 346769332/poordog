/* 文件：sale.js
 * 作者：Lyndon
 * 功能描述：sale.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption=null;//地图
var latnName='',areaName='';
//地图加载
function loadMapInfo(){
	$("#mapInfo").removeClass("animated slideInLeft");
    mapInfo = echarts.init(document.getElementById('mapInfo'));	
	mapInfoOption = {
		title : {
			show:false,
			text: '青海地图',
			left: 'center',
			top: 'top',
			textStyle: {
				color: '#0000ff'
			}
		},
		tooltip : {
			trigger: 'item',
			show:false
		},
		legend:{
			show:false,
			top:16,
			right:16,
			data: [{
				name: '返回',
				// 强制设置图形为圆。
				icon: 'path://M23.808 32c3.554-6.439 4.153-16.26-9.808-15.932v7.932l-12-12 12-12v7.762c16.718-0.436 18.58 14.757 9.808 24.238z',
				// 设置文本为红色
				textStyle: {
					color: '#6dd1f5'
				}
			}]
		},
		series: [{
			name: '返回',
			type: 'map',
			map: '青海省',
        	top: 48,
        	bottom: 48,
        	left: 16,
        	right: 16,
			selectedMode: 'single',
			label: {
				normal: {
					show: true,
					textStyle: {
						color:'#000000',
						fontWeight:400
					}
				},
				emphasis: {
					show: false
				}
			},
			itemStyle:{
				normal:{
					areaColor:'rgb(109,209,245)',
					borderColor:'#FFFF00',
					borderWidth:1
				},
				emphasis:{
					areaColor:'rgb(247,63,63)'
				}
			},
			data:[
					{name: '西宁市',itemStyle: {normal:{areaColor:'rgb(70,127,156)'}}},
					{name: '海北藏族自治州',itemStyle: {normal:{areaColor:'rgb(109,209,245)'}}},
					{name: '海东地区',itemStyle: {normal:{areaColor:'rgb(93,176,210)'}}},
					{name: '黄南藏族自治州',itemStyle: {normal:{areaColor:'rgb(109,209,245)'}}},
					{name: '海南藏族自治州',itemStyle: {normal:{areaColor:'rgb(93,176,210)'}}},
					{name: '果洛藏族自治州',itemStyle: {normal:{areaColor:'rgb(70,127,156)'}}},
					{name: '玉树藏族自治州',itemStyle: {normal:{areaColor:'rgb(93,176,210)'}}},
					{name: '海西蒙古族藏族自治州',itemStyle: {normal:{areaColor:'rgb(70,127,156)'}}},
					{name: '格尔木市',itemStyle: {normal:{areaColor:'rgb(109,209,245)'}}}
			],
			markPoint:{
				symbolSize:16,
	       		itemStyle: {
	         		normal: {
						color: 'transparent',
	         			borderColor: 'rgb(12,78,172)',
	          			borderWidth: 3,
			         	label: {
			         		show: false
			          	}
	         		},
					emphasis:{
						color: '#1ad5df',
						label:{
							show:false,
							formatter:function(param){
								return param.name;
							}
						}
					}
				},
				data:[
					{name: '西宁市',coord: [101.4038,36.8207]},
					{name: '海北藏族自治州',coord: [100.3711,37.9138]},
					{name: '海东地区',coord: [102.3706,36.2988]},
					{name: '黄南藏族自治州',coord: [101.5686,35.1178]},
					{name: '海南藏族自治州',coord: [100.3711,35.9418]},
					{name: '果洛藏族自治州',coord: [99.3823,34.0466]},
					{name: '玉树藏族自治州',coord: [93.5925,33.9368]},
					{name: '海西蒙古族藏族自治州',coord: [96.4579,37.4314]},
					{name: '格尔木市',coord: [94.8798,36.4104]}
				]
			}
		}]
	};
	mapInfo.setOption(mapInfoOption);	
	$("#mapInfo").addClass("animated slideInLeft");
	mapInfo.on('mapselectchanged', function(params){
		if(latnName!=''){
			areaName=params.name;
			mapInfo.setOption({title:{text:areaName}});
			loadOtherModule();
			//console.log("[latnName:"+latnName+",areaName:"+areaName+"]");
		}else{
			latnName=params.name;
			mapInfoOption.title.text=latnName;
			mapInfoOption.legend.show=true;
			mapInfoOption.series[0].map=latnName;
			mapInfoOption.series[0].data=[];
			mapInfoOption.series[0].markPoint={};
			mapInfo.setOption(mapInfoOption,true);
			loadOtherModule();
		}
	});
	mapInfo.on('legendselectchanged', function(params){
		if(areaName!=''){
			areaName='';
			mapInfoOption.title.text=latnName;
			mapInfo.setOption(mapInfoOption,true);
			loadOtherModule();
			//console.log("[latnName:"+latnName+",areaName:"+areaName+"]");
		}else{
			window.location.reload();
		}
	});
}
function loadOtherModule(){
	console.log("loadOtherModule");
}
//页面函数加载
loadEcharts({
	chinaMap: false,
	qhMap: true,
	mapExtend: true,
	pageFunc: function(){
		loadMapInfo();
	}
});