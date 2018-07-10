/* 文件：nationalRoam.js
 * 作者：Lyndon
 * 功能描述：nationalRoam.jsp的各个模块加载函数
 */
//变量定义
var nationalMapInfo=null,nationalMapInfoOption;//全国地图
var localMapInfo=null,localMapInfoOption;//全国地图
var roamInfo=null,roamInfoOption;//漫入漫出信息
var loadFlag=true;
var roamType='in',selectType='day';
var roamInData=[],roamOutData=[];
var currentType='',mapTarget='';
var mapTimer=null;
//全国地图加载
function loadNationalMapInfo(param){
    nationalMapInfo = echarts.init(document.getElementById('nationalMapInfo'));
    if(loadFlag){
    	nationalMapInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "nationalRoam/roamInfo.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
        	roamInData=[];
        	roamOutData=[];
           	if(data!=null&&data.length>0){
				var mapData=[];
                var inPoint=[],inLine=[];
                var outPoint=[],outLine=[];
                for(var i in data){
                	if(data[i].roam_type=='in'){
                		if(data[i].rn<10){
                			roamInData.push({name:data[i].prov_name,value:data[i].user_count});
                		}
                		inPoint.push({name:data[i].prov_name,value:data[i].user_count});
                		inLine.push([{name:data[i].prov_name},{name:param.target}]);
                	}
                	if(data[i].roam_type=='out'){
                		if(data[i].rn<10){
                			roamOutData.push({name:data[i].prov_name,value:data[i].user_count});
                		}
                		outPoint.push({name:data[i].prov_name,value:data[i].user_count});
                		outLine.push([{name:param.target},{name:data[i].prov_name}]);
                	}
                }
                var allGis=$.extend(chinaGis,localNetGis);
                nationalMapInfoOption = {
                	color: ['gold','aqua','lime'],
					title: {
                         text : param.target,
                         show : false,
                         textStyle : {
                             color : 'orangered',
                             fontFamily : '微软雅黑',
                             fontWeight : 500
                         }
					},
                    tooltip : {
						trigger: 'item',
						formatter: '{b}'
					},
					legend: {
				        textStyle : {
				            color: '#fff'
				        },
						orient: 'vertical', // 'vertical'
                        x: 'center', // 'center' | 'left' | {number},
						data:['漫入', '漫出'],
						selected:{
							'漫出' : false
						}/*,
                        show: false,
                        data:[
							{
     						    name:'返回全省',
     						    icon : 'image://system/page/resource/images/back.jpg',
     						    textStyle:{fontWeight:500,fontSize:14,color:'#64ff48'}
     						}
                         ]*/
					},
                    series : [
						{
				            name: '全国',
				            type: 'map',
				            roam: false,
				            hoverable: false,
				            mapType: 'china',
							itemStyle:{
								normal:{
									label:{
										show:true,
										textStyle:{
											fontSize:14,
											color:"#fdcc65"
										}
									},
									borderColor:'rgba(0,0,0,1)',
									borderWidth:0.5,
									areaStyle:{
										color: '#323c48'
									}
								},
								emphasis:{label:{show:true}}
							},
				            data:[],
				            geoCoord: allGis
				        },{
				            name: '漫入',
				            type: 'map',
				            mapType: 'china',
				            data:[],
				            markLine : {
				                smooth:true,
				                effect : {
				                    show: true,
				                    scaleSize: 1,
				                    period: 30,
				                    color: '#fff',
				                    shadowBlur: 2
				                },
				                itemStyle : {
				                    normal: {
				                        borderWidth:1,
				                        lineStyle: {
				                            type: 'solid',
				                            shadowBlur: 2
				                        }
				                    }
				                },
				                data : inLine
				            },
				            markPoint : {
				                symbol:'emptyCircle',
				                symbolSize : function (v){
				                    return 2 + v/(v/10);
				                },
				                effect : {
				                    show: true,
				                    shadowBlur : 0
				                },
				                itemStyle:{
				                    normal:{
				                        label:{show:false}
				                    },
				                    emphasis: {
				                        label:{position:'top'}
				                    }
				                },
				                data : inPoint
				            }
				        },{
				        	name: '漫出',
				            type: 'map',
				            mapType: 'china',
				            data:[],
				            markLine : {
				                smooth:true,
				                effect : {
				                    show: true,
				                    scaleSize: 1,
				                    period: 30,
				                    color: '#fff',
				                    shadowBlur: 2
				                },
				                itemStyle : {
				                    normal: {
				                        borderWidth:1,
				                        lineStyle: {
				                            type: 'solid',
				                            shadowBlur: 2
				                        }
				                    }
				                },
				                data : outLine
				            },
				            markPoint : {
				                symbol:'emptyCircle',
				                symbolSize : function (v){
				                    return 2 + v/(v/10);
				                },
				                effect : {
				                    show: false,
				                    shadowBlur : 0
				                },
				                itemStyle:{
				                    normal:{
				                        label:{show:false}
				                    },
				                    emphasis: {
				                        label:{position:'top'}
				                    }
				                },
				                data : outPoint
				            }
				        },{
                            name: '青海省',
                            type: 'map',
                            mapType: 'china',
                            data:[],
                            markPoint : {
				            	symbol:'diamond',
				                symbolSize: function (v){
				                    return 20;
				                },
				                effect : {
				                    show: true,
				                    color : '#ff0000',
				                    shadowBlur : 0
				                },
				                itemStyle:{
				                    normal:{
				                        label:{show:false}
				                    }
				                },
				                data : [{name:param.target}]
				           }
                        }
					]
                };
				nationalMapInfo.hideLoading();
				nationalMapInfo.setOption(nationalMapInfoOption);
				if(mapTimer!=null){
					clearInterval(mapTimer);
				}
				mapTimer=setInterval(function(){
					if(nationalMapInfo.component.legend.isSelected('漫出')){
						nationalMapInfo.component.legend.setSelected('漫出',false);
						nationalMapInfo.component.legend.setSelected('漫入',true);
					}else{
						nationalMapInfo.component.legend.setSelected('漫出',true);
						nationalMapInfo.component.legend.setSelected('漫入',false);
					}
				},10000);
        	}else{
				nationalMapInfo.hideLoading();
            	nationalMapInfo = null;
               	$("#nationalMapInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
			loadRoamInfo();
        },
        error : function(result){
			nationalMapInfo.hideLoading();
        }
	});
}
//本地网地图加载
function loadLocalMapInfo(){
	mapInfo = echarts.init(document.getElementById('localMapInfo'));
    if(loadFlag){
    	mapInfo.showLoading({text:'数据读取中...'});
    }
	mapInfoOption = {
		title: {
			text : '青海省',
			show : false,
			textStyle : {
				color : 'orangered',
				fontFamily : '微软雅黑',
				fontWeight : 500
			}
		},
		tooltip : {
			show : false,
			trigger: 'item'
		},
		legend: {
			orient: 'vertical',
			x: 'right',
			show: false,
			data:[{
				name:'返回全省',
				icon : 'image://system/page/resource/images/back.jpg',
				textStyle:{fontWeight: 500, color:'#64ff48'}
			}]
		},
		series : [
			{
				name: '青海省',
				type: 'map',
				mapType: '青海',
				itemStyle:{
					normal:{
						label:{
							show:true,
							textStyle:{
								fontSize:14,
								color:"#1ad5de"
							}
						},
						borderColor:'#fdcc65',
						borderWidth:0.5,
						areaStyle:{
							color: 'rgba(0,0,0,0)'
						}
					},
					emphasis:{label:{show:false}}
				},
				selectedMode : 'single',
				mapLocation:{width:'98%'},
				data:[]
			}
		]
	};
	mapInfo.on(ecConfig.EVENT.MAP_SELECTED,function(param){
		var target=param.target;
		if(target!=null&&target!=''){
			mapTarget=(target=="格尔木市"?"格尔木本地网":target);
			currentType='latn';
			mapInfoOption.legend.show=true;
			mapInfoOption.title.text=target;
			mapInfoOption.title.show=true;
			//mapInfoOption.series[0].name=target;
			//mapInfoOption.series[0].mapType=target;
			mapInfo.setOption(mapInfoOption,true);
			loadNationalMapInfo({'queryType':selectType,'latnName':mapTarget,'target':target});
		}
	});
	mapInfo.on(ecConfig.EVENT.LEGEND_SELECTED,function(param){
		window.location.reload();
	});
	mapInfo.hideLoading();
	mapInfo.setOption(mapInfoOption);
}
//漫入漫出信息
function loadRoamInfo(){
	roamInfo = echarts.init(document.getElementById('roamInfo'));
    if(loadFlag){
    	roamInfo.showLoading({text:'数据读取中...'});
    }else{
    	$("#roamInfo").removeClass("animated slideInLeft");
    }
    var data,roamName="";
    if(roamType=='out'){
    	roamName="漫出";
    	data=roamOutData;
    }else{
    	roamName="漫入";
    	data=roamInData;
    }
   	if(data!=null&&data.length>0){
   		var roamData=[],yAxisData=[];
   		for(var i in data){
   			yAxisData.push(data[i].name);
   			roamData.push(data[i].value);
   		}
   		roamInfoOption={
		  	color:['#e96453','#ffc600','#1ad5de','#d9ffe5'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {
		            type : 'shadow'
		        }
		    },
		    calculable : true,
			grid:{x:32,y:8,x2:16,y2:16,borderWidth:'0'},
		    xAxis : [{
				type : 'value',
				splitLine:{show:false},
				splitArea:{show:false},
				axisLine:{show:false},
				axisLabel:{show:false}
			}],
		    yAxis : [{
				type : 'category',
				axisTick:{
					lineStyle : {
						color : '#f6c9d9',
						width:1
					}						
				},
				axisLabel : {
					textStyle : {
						color : '#f6c9d9'
					}
				},
				axisLine:{
					lineStyle : {
						color : '#f6c9d9',
						width:1
					}						
				},
				splitLine:{show:false},
				splitArea:{show:false},
				data : yAxisData
			}],
		    series : [{
		            name:roamName,
		            type:'bar',
					barWidth :16,
		            itemStyle : {
		            	normal: {
		            		barBorderRadius:[0,8,8,0],
		            		label : {show: true, position: 'insideLeft'}
		            	},
						emphasis:{
							color: 'transparent',
							label: {show: true}
						}
		            },
		            data:roamData
			}]
		};
		roamInfo.hideLoading();
    	roamInfo.setOption(roamInfoOption);
    	$("#roamInfo").addClass("animated slideInLeft");
	}else{
		roamInfo.hideLoading();
        roamInfo = null;
		$("#roamInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
	}
}