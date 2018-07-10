/* 文件：scenicRoam.js
 * 作者：Lyndon
 * 功能描述：scenicRoam.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption;//地图
var roamInInfo=null,roamInInfoOption;//漫入信息
var roamInTypeInfo=null,roamInTypeInfoOption;//漫入方式
var loadFlag=true;
var currentType='',mapTarget='';
//地图加载
function loadMapInfo(param){
    mapInfo = echarts.init(document.getElementById('mapInfo'));
    if(loadFlag){
    	mapInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "scenicRoam/map.do",
  		type: 'post',
        data : param,
        dataType : "json",
        success : function(data){
 			var markData=[],positionData={};
 			var positionStr="",markStr="",arry;
		    for(var i=0;i<data.length;i++){
		    	markData.push({name:data[i].scenic_name});
				positionStr=positionStr+"'"+data[i].scenic_name+"':["+data[i].longitude+","+data[i].latitude+"]";
				if(i<data.length-1){
		    		positionStr=positionStr+",";
		    	}
		    }
			positionStr="{"+positionStr+"}";
			positionData=eval('('+positionStr+')');
			var mapSelected=[];
			if(param.target!='青海'){
				mapSelected.push({name:param.target,selected:true});
			}
			mapInfoOption = {
				title: {
					text : param.target,
					show : param.title,
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
					orient: 'vertical',
					x: 'right',
					show: param.legend,
					data:[{
						name:'返回全省',
						icon : 'image://system/page/resource/images/back.jpg',
						textStyle:{fontWeight:500,fontSize:14,color:'#64ff48'}
					}]
				},
				series : [
					{
						name: '青海',
						type: 'map',
						mapType: '青海',
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
						selectedMode : 'single',
						mapLocation:{width:'98%'},
						data:mapSelected,
						geoCoord : positionData,
						markPoint : {
                        	symbolSize:5,
		            		clickable: true,
		                	itemStyle: {
			                    normal: {
									color: 'transparent',
			                        borderColor: '#00ff00',
			                        borderWidth: 5,
			                        label: {
			                            show: false
			                        }
			                    },
								emphasis:{
									color: '#ff0000',
									label:{
										show:false,
										formatter:function(param){
											return param.name;
										}
									}
								}
			                },
		                	data : markData
                    	}
					}
				]
			};
			mapInfo.on(ecConfig.EVENT.MAP_SELECTED,function(param){
				var target=param.target;
				if(target!=null&&target!=''){
					mapTarget=(target=="格尔木市"?"格尔木本地网":target);
					currentType='latn';
					loadMapInfo({'latnName':mapTarget,'target':target,'title':true,'legend':true});
					loadRoamInInfo({'latnName':mapTarget});
					loadRoamInTypeInfo({'latnName':mapTarget});
					loadScenicRankInfo({'latnName':mapTarget});
				}
			});
			mapInfo.on(ecConfig.EVENT.LEGEND_SELECTED,function(param){
				window.location.reload();
			});
			mapInfo.hideLoading();
			mapInfo.setOption(mapInfoOption);
        },
        error : function(result){
			mapInfo.hideLoading();
        }
	});
}
//漫入信息
function loadRoamInInfo(param){
	roamInInfo = echarts.init(document.getElementById('roamInInfo'));
    if(loadFlag){
    	roamInInfo.showLoading({text:'数据读取中...'});
    }else{
		$("#roamInInfo").removeClass("animated slideInLeft");
    }
	$.ajax({
		url : "scenicRoam/roamIn.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var roamIn=[],roamOut=[];
           		var axisData=[];
           		var tempStr='';
           		var piontRoamIn=[],piontRoamOut=[];
           		for(var i in data){
           			if(tempStr!=data[i].count_name){
           				tempStr=data[i].count_name;
           				axisData.push(data[i].count_name);
           			}
           			if(data[i].code_name=='漫入用户数'){
           				roamIn.push(data[i].user_count);
           				piontRoamIn.push({xAxis:data[i].count_name,yAxis:data[i].user_count});
           			}
           			if(data[i].code_name=='漫出用户数'){
           				roamOut.push(data[i].user_count);
           				piontRoamOut.push({xAxis:data[i].count_name,yAxis:data[i].user_count});
           			}
           		}
           		roamInInfoOption={
				    color:['#fec601','#6eb5e6'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:64,y:64,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				    	itemGap:64,
				      	textStyle:{color: '#f6c9d9'},
				        data:['漫入','漫出']
				    },
				    xAxis : [{
						type : 'category',
				        boundaryGap : false,
						splitLine:{show:false},
						splitArea:{show:false},
						axisLine:{
							lineStyle : {
								color : '#df80a0',
								width:1
							}						
						},
						axisLabel : {
							textStyle : {
								color : '#f6c9d9'
							}
						},
						data : axisData
					}],
				    yAxis : [{
						type : 'value',
						name : '单位:人',
						splitLine:{show:false},
						splitArea:{show:false},
						axisLine:{
							lineStyle : {
								color : '#df80a0',
								width:1
							}						
						},
						axisLabel : {
							textStyle : {
								color : '#df80a0'
							}
						}
					}],
				    series : [
				        {
				            name:'漫入',
				            type:'line',
							symbol: 'emptyCircle',
							itemStyle: {normal: {lineStyle:{color: '#fec601'},areaStyle: {color: 'rgba(254,198,1,0.2)'}}},
							symbolSize: 3,
							smooth: false,
				            data:roamIn,
                            markPoint : {
                            	//tooltip:{show：false},
				            	symbol:'emptyCircle',
				                symbolSize: function (v){
				                    return 5;
				                },
				                effect : {
				                    show: true,
				                    //color : '#ffffff',
				                    shadowBlur : 0
				                },
				                itemStyle:{
				                    normal:{
				                        label:{show:false}
				                    },
				                    emphasis: {
				                        label:{show:false}
				                    }
				                },
				                data : piontRoamIn
				           }
				        },{
				            name:'漫出',
				            type:'line',
							symbol: 'emptyDiamond',
							itemStyle: {normal: {lineStyle:{color: '#6eb5e6'},areaStyle: {color: 'rgba(110,181,230,0.2)'}}},
							symbolSize: 3,
							smooth: false,
				            data:roamOut,
                            markPoint : {
                            	//tooltip:{show：false},
				            	symbol:'emptyDiamond',
				                symbolSize: function (v){
				                    return 5;
				                },
				                effect : {
				                    show: true,
				                    //color : '#ffffff',
				                    shadowBlur : 0
				                },
				                itemStyle:{
				                    normal:{
				                        label:{show:false}
				                    },
				                    emphasis: {
				                        label:{show:false}
				                    }
				                },
				                data : piontRoamOut
				           }
				        }
				    ]
				};
				roamInInfo.hideLoading();
			    roamInInfo.setOption(roamInInfoOption);
				$("#roamInInfo").addClass("animated slideInLeft");
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
//漫入方式信息
function loadRoamInTypeInfo(param){
    roamInTypeInfo = echarts.init(document.getElementById('roamInTypeInfo'));
    if(loadFlag){
    	roamInTypeInfo.showLoading({text:'数据读取中...'});
    }else{
    	$("#roamInTypeInfo").removeClass("animated slideInLeft");
    }
	$.ajax({
		url : "scenicRoam/roamInType.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var planeData=[],trainAndBusData=[];
           		var axisData=[];
           		var tempStr='';
           		for(var i in data){
           			if(tempStr!=data[i].date_no){
           				tempStr=data[i].date_no;
           				axisData.push(data[i].date_no);
           			}
           			if(data[i].code_name=='飞机'){
           				planeData.push(data[i].user_count);
           			}
           			if(data[i].code_name=='火车/汽车'){
           				trainAndBusData.push(data[i].user_count);
           			}
           		}
           		roamInTypeInfoOption={
				    color:['#e2d354','#e96453'],
				    title : {
				    	show:false,
						textStyle : {
							color : '#fff3cf',
							fontFamily : '微软雅黑',
							fontSize : 16
						},
				        text: '漫入方式',
		              	x:'center',
		              	y:'top'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:16,y:48,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				    	itemGap:64,
				      	textStyle:{color: '#f6c9d9'},				      	
		              	x:'center',
		              	y:'top',
				        data:['飞机','火车/汽车']
				    },
				    xAxis : [{
						type : 'category',
						splitLine:{show:false},
						splitArea:{show:false},
						axisLine:{
							lineStyle : {
								color : '#df80a0',
								width:1
							}						
						},
						axisLabel : {
							textStyle : {
								color : '#f6c9d9'
							}
						},
						data : axisData
					}],
				    yAxis : [{
			            type : 'value',
			            name : '单位:人',
						splitArea:{show:false},
						axisLine:{show:false},
						axisLabel:{show:false},
			        	splitLine:{
							lineStyle : {
								color : '#854175',
								width:1
							}
						}
				    }],
				    series : [
				        {
				            name:'飞机',
				            type:'bar',
				          	itemStyle : {
				          		normal: {
				          			barBorderRadius:[8,8,0,0],
				          			label : {show: false}
				          		},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				          	},
				            data:planeData
				        },{
				            name:'火车/汽车',
				            type:'bar',
				          	itemStyle : {
				          		normal: {
				          			barBorderRadius:[8,8,0,0],
				          			label : {show: false}
				          		},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				          	},
				            data:trainAndBusData
				        }
				    ]
				};
				roamInTypeInfo.hideLoading();
				roamInTypeInfo.setOption(roamInTypeInfoOption);
				$("#roamInTypeInfo").addClass("animated slideInLeft");
			}else{
				roamInTypeInfo.hideLoading();
            	roamInTypeInfo = null;
               	$("#roamInTypeInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			roamInTypeInfo.hideLoading();
        }
	});
}
//景点排行
function loadScenicRankInfo(param){
	$("#scenicRankInfo").removeClass("animated flipInY");
	$.ajax({
		url : "scenicRoam/rank.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var tableData=[];
           		for(var i in data){
           			tableData.push({rn:data[i].rn,scenic_name:data[i].scenic_name,inner_count:data[i].inner_count});
           		}
           		var scenicRankInfoStr=funcGetTableBody(tableData,true,'all');
           		if(scenicRankInfoStr!=""&&scenicRankInfoStr.length>0){
               		$("#scenicRankInfo table tbody").html(scenicRankInfoStr);
					$("#scenicRankInfo").addClass("animated flipInY");
           		}else{
               		$("#scenicRankInfo table tbody").html('<tr><td colspan="4" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#scenicRankInfo table tbody").html('<tr><td colspan="4" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});
}