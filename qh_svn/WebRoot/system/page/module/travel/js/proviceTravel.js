/* 文件：proviceTravel.js
 * 作者：Lyndon
 * 功能描述：proviceTravel.jsp的各个模块加载函数
 */
loadEcharts({
	chinaMap: true,
	qhMap: true,
	mapExtend: true,
	pageFunc: function(){
		loadTravelWayInfo();
		loadRoamMapInfo();
		loadScenicRoamInfo();
		loadNativeRoamInfo();
		loadLocalMapInfo();
	}
});
function loadTravelWayInfo(){
	var travelWayInfo=echarts.init(document.getElementById('travelWayInfo'));
	travelWayInfo.showLoading("数据加载中...");
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		{name:'直接访问',value:234},
        		{name:'邮件营销',value:1234},
        		{name:'联盟广告',value:450},
        		{name:'视频广告',value:720},
        		{name:'搜索引擎',value:310}
        	];
           	if(data!=null&&data!=''&&data.length>0){
           		var legendData=[],seriesData=[];
           		for(var i in data){
           			legendData.push(data[i].name);
           			seriesData.push({name: data[i].name,value: data[i].value});
           		}
           		var travelWayInfoOption={
					color: ['rgb(143,195,32)','rgb(216,83,84)','rgb(61,162,204)','rgb(242,145,74)','rgb(248,107,80)','rgb(243,233,37)','rgb(199,140,168)','rgb(106,226,180)'],
					title: {
						show: false,
						text: '出行方式',
						x: 'center',
						y: '10%',
						textStyle: {
							fontSize:16,
							fontWeight:'normal',
							color:'#fff'
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						//orient: 'vertical',
						//left: 'left',
						bottom: 'bottom',
						itemWidth: 10,			
						itemHeight: 8,
						data: legendData,
						textStyle:{
							color:'#fff3cf'
						}
					},
					series: [
						{
							name: '中心圆',
							type: 'pie',
							radius: '31%',
							center: ['50%', '45%'],
							data: [{name: '1',value: 100}],
							hoverAnimation: false,
							tooltip: {show: false},
							label:{
								normal: {show: false}
							},
							itemStyle: {
							    normal: {
							        color: 'rgb(174, 86, 128)'
							    }
							}
						},{
							name: '边线1',
							type: 'pie',
							radius: ['75%','75.5%'],
							center: ['50%', '45%'],
							startAngle: 108,
							data: [
							    {name: '1',value: 25,itemStyle: {normal: {color: "rgba(0,0,0,0)"}}},
							    {name: '2',value: 100,itemStyle: {normal: {color: "rgb(74,132,182)"}}},
							    {name: '3',value: 25,itemStyle: {normal: {color: "rgba(0,0,0,0)"}}},
							    {name: '4',value: 100,itemStyle: {normal: {color: "rgb(143,195,32)"}}}
							],
							hoverAnimation: false,
							tooltip: {show: false},
							label:{normal: {show: false}}
						},{
							name: '边线2',
							type: 'pie',
							radius: ['85%','85.5%'],
							center: ['50%', '45%'],
							startAngle:164,
							data:[
							    {name: '1',value: 100,itemStyle: {normal: {color: "rgb(61,162,204)"}}},
							    {name: '2',value: 25,itemStyle: {normal: {color: "rgba(0,0,0,0)"}}},
							    {name: '3',value: 100,itemStyle: {normal: {color: "rgb(242,145,74)"}}},
							    {name: '4',value: 25,itemStyle: {normal: {color: "rgba(0,0,0,0)"}}}
							    ],
							hoverAnimation: false,
							tooltip: {show: false},
							label: {normal: {show: false}}
						},{
							name: '边线3',
							type: 'pie',
							radius: ['95%','95.5%'],
							center: ['50%', '45%'],
							data: [{name: '1',value: 100}],
							hoverAnimation: false,
							tooltip: {show: false},
							label: {normal: {show: false}},
							itemStyle: {
							    normal: {
							        color: 'rgb(174, 86, 128)'
							    }
							}
						},{
							name: '访问来源',
							type: 'pie',
							radius: ['30%','65%'],
							center: ['50%', '45%'],
							data:seriesData,
							label: {
							    normal: {
							        position: 'inside',
							        formatter: '{d}%'
							    }
							},
							labelLine: {
							    normal: {
							        show: false
							    }
							},
							itemStyle: {
							    emphasis: {
							        shadowBlur: 16,
							        shadowOffsetX: 0,
							        shadowColor: 'rgba(0, 0, 0, 0.5)'
							    }
							}
						}
					]
				};	
				travelWayInfo.setOption(travelWayInfoOption);
				travelWayInfo.hideLoading();
           	}
        },
        error : function(result){
			travelWayInfo.hideLoading();
        }
	});
}
//地图加载
var currentLocal='';
function loadRoamMapInfo(){
	var roamMapInfo=echarts.init(document.getElementById('roamMapInfo'));
	/*
	roamMapInfo.showLoading("数据加载中...");
	$.ajax({
		url : "operation/user.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	
        },
        error : function(result){
			roamMapInfo.hideLoading();
        }
	});*/
	var roamMapInfoOption={
		//backgroundColor: '#404a59',
		title : {
			show: true,
			text: '全国漫游',
			left: 'center',
			top: 0,
			textStyle: {
				fontSize:16,
				fontWeight:'normal',
				color: '#fff3cf'
			}
		},
		tooltip : {
			trigger: 'item'
		},
		legend:{
			show:false,
			top:'top',
			right:'right',
			data: [{
				name: '返回',
				// 强制设置图形为圆。
				icon: 'path://M23.808 32c3.554-6.439 4.153-16.26-9.808-15.932v7.932l-12-12 12-12v7.762c16.718-0.436 18.58 14.757 9.808 24.238z',
				// 设置文本为红色
				textStyle: {
					color: 'red'
				}
			}]
		},
		series: [{
			name: '返回',
			type: 'map',
			map: 'china',
			left:0,
			right:0,
			//bottom:0,top:0,
			label: {
				normal: {
					show: true,
					textStyle: {color:'#fdcc65'}
				},
				emphasis: {
					show: false
				}
			},
			itemStyle:{
				normal:{
					areaColor:'#323c48',
					borderColor:'rgba(0,0,0,1)',
					borderWidth:1
				}
			}
		}]
	};
	roamMapInfo.setOption(roamMapInfoOption);
}
function loadScenicRoamInfo(){
	var scenicRoamInfo=echarts.init(document.getElementById('scenicRoamInfo'));
	scenicRoamInfo.showLoading("数据加载中...");
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		{scenic_name:'青海湖',in_val:600,out_val:500},
        		{scenic_name:'门源油菜花',in_val:510,out_val:450},
        		{scenic_name:'茶卡盐湖',in_val:500,out_val:440},
        		{scenic_name:'坎布拉国家森林公园',in_val:450,out_val:340},
        		{scenic_name:'黑马河风景区',in_val:400,out_val:280},
        		{scenic_name:'孟达天池',in_val:380,out_val:250},
        		{scenic_name:'青海湖金沙湾自然风景区',in_val:300,out_val:240},
        		{scenic_name:'塔尔寺',in_val:250,out_val:200},
        		{scenic_name:'马步芳公馆',in_val:210,out_val:150},
        		{scenic_name:'年保玉则景区',in_val:150,out_val:140}
        	];
           	if(data!=null&&data!=''&&data.length>0){
           		var axisData=[],roamInData=[],roamOutData=[];
           		for(var i in data){
           			axisData.push(data[i].scenic_name);
           			roamInData.push(data[i].in_val);
           			roamOutData.push(data[i].out_val);
           		}
           		var scenicRoamInfoOption={
           			color:['#CDAD3E','#D85354'],
					legend:{
						show:true,
						top:'top',
						left:'center',
						data: ['漫入','漫出'],						
						itemWidth: 10,			
						itemHeight: 8,
						textStyle:{
							color:'#ffffff'
						}
					},
					xAxis: {
						axisLabel: {show:false},
						axisTick: {show: false},
						axisLine: {show: false},
						splitLine:{show:false},
						splitArea:{show:false}
					},
					yAxis: {
						axisLine: {show: false},
						axisTick: {show: false},
						axisLabel: {
							textStyle: {
								color: '#CDAD3E'
							}
						},
						splitLine:{show:false},
						splitArea:{show:false},
						data: axisData
					},
					grid:{left:128,top:32,right:16,bottom:16},
					series: [{
						name: '漫入',
						type: 'bar',
						stack: '总量',
						itemStyle: {
							normal: {
								barBorderRadius: [8,0,0,8],
								label : {show: false,position: 'insideRight'}
							},
							emphasis: {
								label: {show: true}
							}
						},
						data: roamInData
					},{
						name: '漫出',
						type: 'bar',
						stack: '总量',
						itemStyle: {
							normal: {
								barBorderRadius: [0,8,8,0],
								label: {show: false,position: 'insideRight'}
							},
							emphasis: {
								label: {show: true}
							}
						},
						data: roamOutData
					}]
				};
				scenicRoamInfo.setOption(scenicRoamInfoOption);
				scenicRoamInfo.hideLoading();
           	}
        },
        error : function(result){
			scenicRoamInfo.hideLoading();
        }
	});
}
function loadNativeRoamInfo(){
	var nativeRoamInfo=echarts.init(document.getElementById('nativeRoamInfo'));
	nativeRoamInfo.showLoading("数据加载中...");
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		[
			        [2000,200,'1号','甘肃'],
			        [1100,1500,'2号','甘肃'],
			        [1500,500,'3号','甘肃'],
			        [900, 1900, '4号','甘肃'],
			        [1600,600,'5号','甘肃'],
			        [1700,700,'6号','甘肃'],
			        [1400,450,'7号','甘肃']
			    ],[
			        [700, 1700, '1号','四川'],
			        [1500,500,'2号','四川'],
			        [1100,100,'3号','四川'],
			        [1900,1500,'4号','四川'],
			        [1500,500,'5号','四川'],
			        [1430,430,'6号','四川'],
			        [1600,600,'7号','四川']
			    ],[
			        [1400,400,'1号','宁夏'],
			        [1200,200,'2号','宁夏'],
			        [1000,1500,'3号','宁夏'],
			        [500, 1500, '4号','宁夏'],
			        [600, 1600, '5号','宁夏'],
			        [1500,500,'6号','宁夏'],
			        [1000,800,'7号','宁夏']
			    ],[
			        [1750,750,'1号','内蒙古'],
			        [850, 1850, '2号','内蒙古'],
			        [1200,500,'3号','内蒙古'],
			        [1900,950,'4号','内蒙古'],
			        [900, 1900, '5号','内蒙古'],
			        [1110,1500,'6号','内蒙古'],
			        [1750,750,'7号','内蒙古']
			    ],[
			        [1800,800,'1号','新疆'],
			        [900, 950, '2号','新疆'],
			        [500, 1500, '3号','新疆'],
			        [850, 1850, '4号','新疆'],
			        [1200,200,'5号','新疆'],
			        [1550,550,'6号','新疆'],
			        [1100,900,'7号','新疆']
			    ],[
			        [800, 1800, '1号','陕西'],
			        [1400,400,'2号','陕西'],
			        [900, 920, '3号','陕西'],
			        [1300,300,'4号','陕西'],
			        [1100,600,'5号','陕西'],
			        [900, 750, '6号','陕西'],
			        [1350,350,'7号','陕西']
			    ],[
			        [1900,850,'1号','重庆'],
			        [1100,2500,'2号','重庆'],
			        [500, 1500, '3号','重庆'],
			        [1600,1000,'4号','重庆'],
			        [1100,500,'5号','重庆'],
			        [700, 1700, '6号','重庆'],
			        [650, 1650, '7号','重庆']
			    ],[
			        [2100,200,'1号','安徽'],
			        [900, 1900, '2号','安徽'],
			        [800, 550, '3号','安徽'],
			        [1900,900,'4号','安徽'],
			        [1400,400,'5号','安徽'],
			        [1200,290,'6号','安徽'],
			        [740, 440, '7号','安徽']
			    ],[
			        [1100,900,'1号','云南'],
			        [900,560,  '2号','云南'],
			        [1500,560,'3号','云南'],
			        [1900,908,'4号','云南'],
			        [1200,200,'5号','云南'],
			        [1500,510,'6号','云南'],
			        [980,580,  '7号','云南']
			    ],[
			        [1500,506,'1号','海南'],
			        [800, 1800, '2号','海南'],
			        [1200,720,'3号','海南'],
			        [1900,930,'4号','海南'],
			        [900, 1950, '5号','海南'],
			        [700, 890, '6号','海南'],
			        [1100,560,'7号','海南']
			    ]
			];
           	if(data!=null&&data!=''&&data.length>0){
				var seriesData=[],legendData=[];
				for(var i in data){
				    var thisData=data[i];
				    legendData.push(thisData[0][3]);
				    seriesData.push(
				        {
				            name: thisData[0][3],
				            data: thisData,
				            type: 'scatter',
				            symbolSize: function (data) {
				                return data[0]/50;
				            },
				            label: {
				                emphasis: {
				                    show: true,
				                    textStyle:{
				                    	color:'#FFFFFF'
				                    },
				                    formatter: function (param) {
				                        return param.data[3]+'[日期:'+param.data[2]+',漫入:'+param.data[1]+',漫出:'+param.data[0]+']';
				                    },
				                    position: 'top'
				                }
				            },
				            itemStyle: {
				                normal: {
				                    shadowBlur:4,
				                    shadowColor: 'rgba(120, 36, 50, 0.5)',
				                    shadowOffsetY: 2,
				                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
				                        offset: 0,
				                        color: lightColor[i]
				                    }, {
				                        offset: 1,
				                        color: 'rgb(204, 46, 72)'
				                    }])
				                }
				            }
				        }
				    );
				}
				var nativeRoamInfoOption = {					
				    title: {
				    	show:false,
				        text: '全国漫入漫出'
				    },
				    legend: {
				        right: 10,					
						itemWidth: 8,			
						itemHeight: 8,
						textStyle:{
							color:'#ffffff'
						},
				        data:legendData
				    },
					xAxis: {
						axisTick: {
							lineStyle:{
								color: '#fff3cf'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#FFFFFF'
							}
						},
						axisLine: {
							lineStyle:{
								color: '#fff3cf'
							}
						},
						splitLine:{show:false},
						splitArea:{show:false}
					},
					yAxis: {
						axisTick: {
							lineStyle:{
								color: '#fff3cf'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#FFFFFF'
							}
						},
						axisLine: {
							lineStyle:{
								color: '#fff3cf'
							}
						},
						splitLine:{show:false},
						splitArea:{show:false}
					},
					grid:{left:48,top:72,right:8,bottom:32},
				    series: seriesData
				};
				nativeRoamInfo.setOption(nativeRoamInfoOption);
				nativeRoamInfo.hideLoading();
           	}
        },
        error : function(result){
			nativeRoamInfo.hideLoading();
        }
	});
}
function loadLocalMapInfo(){
	var localMapInfo=echarts.init(document.getElementById('localMapInfo'));	
	var localMapInfoOption={
		//backgroundColor: '#404a59',
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
			trigger: 'item'
		},
		legend:{
			show:false,
			top:'top',
			right:'right',
			data: [{
				name: '返回',
				// 强制设置图形为圆。
				icon: 'path://M23.808 32c3.554-6.439 4.153-16.26-9.808-15.932v7.932l-12-12 12-12v7.762c16.718-0.436 18.58 14.757 9.808 24.238z',
				// 设置文本为红色
				textStyle: {
					color: 'red'
				}
			}]
		},
		series: [{
			name: '返回',
			type: 'map',
			map: '青海省',
			selectedMode: 'single',
			top:0,
			bottom:0,
			label: {
				normal: {
					show: true,
					textStyle: {color:'#fdcc65'}
				},
				emphasis: {
					show: false
				}
			},
			itemStyle:{
				normal:{
					areaColor:'#C78CA8',
					//borderColor:'rgba(0,0,0,1)',
					borderWidth:0
				}
			},
			markPoint:{
				symbolSize:16,
               	itemStyle: {
                    normal: {
						color: 'transparent',
                        borderColor: '#FFFF00',
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
	localMapInfo.setOption(localMapInfoOption);
	localMapInfo.on('mapselectchanged', function(params){
		if(currentLocal==''){
			currentLocal=params.name;
			localMapInfoOption.series[0].map=params.name;
			localMapInfoOption.legend.show=true;
			localMapInfo.setOption(localMapInfoOption,true);
		}
	});
	localMapInfo.on('legendselectchanged', function(params){
		if(currentLocal!=''){
			localMapInfoOption.series[0].map=currentLocal;
			localMapInfo.setOption(localMapInfoOption,true);
		}else{
			window.location.reload();
		}
	});
}