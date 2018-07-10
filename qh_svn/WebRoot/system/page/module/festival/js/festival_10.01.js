/* 文件：festival_10.01.js
 * 作者：Lyndon
 * 功能描述：festival_10.01.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption;//地图
var roamInInfo=null,roamInInfoOption;//漫入信息
var roamOutInfo=null,roamOutInfoOption;//漫出信息
var loadFlag=true;
//地图加载
function loadMapInfo(){
    mapInfo = echarts.init(document.getElementById('mapInfo'));
    if(loadFlag){
    	mapInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_1001/map.do",
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
				var mapData=[];
                var titleText="青海省";
                var inPoint=[],inLine=[];
                var outPoint=[],outLine=[];
                for(var i in data){
                	if(data[i].roam_type=='in'){
                		inPoint.push({name:data[i].user_prov_name,value:data[i].user_num});
                		inLine.push([{name:data[i].user_prov_name},{name:data[i].visit_prov_name}]);
                	}
                	if(data[i].roam_type=='out'){
                		outPoint.push({name:data[i].visit_prov_name,value:data[i].user_num});
                		outLine.push([{name:data[i].user_prov_name},{name:data[i].visit_prov_name}]);
                	}
                }
                mapInfoOption = {
                	color: ['gold','aqua','lime'],
					title: {
                         text : titleText,
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
								emphasis:{label:{show:false}}
							},
				            data:[],
				            geoCoord: chinaGis
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
				                        label:{position:'bottom'}
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
				                        label:{show:true,position:'top'}
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
				                data : [{name:'青海'}]
				           }
                        }
					]
                };
				mapInfo.hideLoading();
				mapInfo.setOption(mapInfoOption);
        	}else{
				mapInfo.hideLoading();
            	mapInfo = null;
               	$("#mapInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			mapInfo.hideLoading();
        }
	});
}
//漫入信息
function loadRoamInInfo(){
    roamInInfo = echarts.init(document.getElementById('roamInInfo'));
    if(loadFlag){
    	roamInInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_1001/roamIn.do",
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var roamInData=[];
           		var yAxisData=[];
           		for(var i in data){
           			yAxisData.push(data[i].user_prov_name);
           			roamInData.push(data[i].user_num);
           		}
           		roamInInfoOption={
				    color:['#ffca00','#feff01','#2fce34','#f86b4f'],
			        tooltip : {
			            trigger: 'axis'
			        },
			        calculable : false,
			        grid:{x:45,y:0,x2:30,y2:5,borderWidth:'0'},
					xAxis:[{
						type : 'value',
						show : false,
						boundaryGap : [0, 0.01]
					}],
			        yAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category' ,
						axisTick:{show:false},
						axisLabel : {
			                   textStyle : {
			                   color : '#fdcc65'
			                   }
						},
						axisLine:{
							lineStyle : {
								color : '#f6c9d9',
								width:1
							}						
						},
						data : yAxisData
					}],
			        series : [{
						name:'漫入',
						type:'bar',
						barWidth : 16,
						itemStyle:{
							normal:{
								barBorderRadius:[0,8,8,0],
								label: {
									show: true,
									textStyle : {color : '#f6c9d9'},
									position: 'right'
								}
							},
							emphasis:{
								color: 'transparent',
								label: {show: true}
							}
						},
						data:roamInData
					}]
			    };
				roamInInfo.hideLoading();
				roamInInfo.setOption(roamInInfoOption);
			}else{
				roamInInfo.hideLoading();
            	roamInInfo = null;
               	$("#roamInInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			roamInInfo.hideLoading();
        }
	});
}
//漫出信息
function loadRoamOutInfo(){
	roamOutInfo = echarts.init(document.getElementById('roamOutInfo'));
    if(loadFlag){
    	roamOutInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_1001/roamOut.do",
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var indicatorData=[];
           		var dataValue=[];
           		for(var i in data){
           			indicatorData.push({text:data[i].visit_prov_name});
           			dataValue.push(data[i].user_num);
           		}
           		roamOutInfoOption={
				    color:['#71bdee','#ffc600','#f06b5f','#be28cf','#19de56','#ff0000'],
				  	title:{
				  		show:false,
						textStyle:{color:'#d5a268'},
						x:'left',
						y:'top',
				    },
				    tooltip : {
				        trigger: 'axis'
				    },				    
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        orient : 'vertical',
				        x : 'left',
				        y : 'center',
				        show:false,
				        data:['漫出']
				    },
				    polar : [
				       {
				       		name:{textStyle:{color:"#f6c9d9",fontSize:14}},
				        	splitLine:{
				        		show:true,
				        		lineStyle:{
									color: '#fec61b',
									width: 1
				        		}
				        	},
							splitArea:{areaStyle:{color:'rgba(0,0,0,0)'}},
							axisLine : {show:false},
				            radius : '85%',
							indicator : indicatorData
				        }
				    ],
				    calculable : true,
				    series : [
				        {
				            name: '漫出',
				            type: 'radar',
				            data : [
				                {
				                    value : dataValue,
				                    name : '漫出'
				                }
				            ]
				        }
				    ]
           		};
           		/*
           		var roamOutData=[];
           		var yAxisData=[];
           		for(var i in data){
           			yAxisData.push(data[i].visit_prov_name);
           			roamOutData.push(data[i].user_num);
           		}
           		roamOutInfoOption={
				    color:['#e96453','#ffc600','#f06b5f','#be28cf','#19de56'],
			        tooltip : {
			            trigger: 'axis'
			        },
			        calculable : false,
			        grid:{x:45,y:0,x2:30,y2:5,borderWidth:'0'},
					xAxis:[{
						type : 'value',
						show : false,
						boundaryGap : [0, 0.01]
					}],
			        yAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category' ,
						axisTick:{show:false},
						axisLabel : {
			            	textStyle : {
			                   color : '#fdcc65'
							}
						},
						axisLine:{
							lineStyle : {
								color : '#f6c9d9',
								width:1
							}						
						},
						data : yAxisData
					}],
			        series : [{
						name:'漫入',
						type:'bar',
						barWidth : 16,
						itemStyle:{
							normal:{
								barBorderRadius:[0,8,8,0],
								label: {
									show: true,
									textStyle : {color : '#f6c9d9'},
									position: 'right'
								}
							},
							emphasis:{
								color: 'transparent',
								label: {show: true}
							}
						},
						data:roamOutData
					}]
			    };*/
				roamOutInfo.hideLoading();
			    roamOutInfo.setOption(roamOutInfoOption);
			}else{
				roamOutInfo.hideLoading();
            	roamOutInfo = null;
               	$("#roamOutInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			roamOutInfo.hideLoading();
        }
	});
}