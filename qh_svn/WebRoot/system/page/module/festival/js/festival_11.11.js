/* 文件：festival_11.11.js
 * 作者：Lyndon
 * 功能描述：festival_11.11.jsp的各个模块加载函数
 */
//变量定义
var appInfo=null,appInfoOption;//app应用排行
var mapInfo=null,mapInfoOption;//地图
var flowInfo=null,flowInfoOption;//流量信息
var userInfo=null,userInfoOption;//用户特征
var hotWordInfo=null,hotWordInfoOption;//热词
var visit114Info=null,visit114InfoOption;//114访问
var wingPayInfo=null,wingPayInfoOption;//翼支付
var appType='user';//app应用选择类型
var userType='sex';//用户特征视图类型
var hotWordType='';//用户行为视图类型
var loadFlag=true;
var currentType='',mapTarget='';
//APP应用排行
function refresh(){
	var pm=getMapParam(currentType,mapTarget);
	pm.queryType=appType;
	loadAppInfo(pm);
	loadWingPayInfo(pm);
	loadVisit114Info(pm);
	pm.queryType=hotWordType;
	loadHotWordInfo(pm);
	pm.queryType=userType;
	loadUserInfo(pm);
	loadFlowInfo(pm);
}
function loadAppInfo(param){
    appInfo = echarts.init(document.getElementById('appInfo'));
    if(loadFlag){
    	appInfo.showLoading({text:'数据读取中...'});
    }else{
		$("#appInfo").removeClass("animated bounceInRight");
    }
	$.ajax({
		url : "festival_1111/app.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		var seriesData=[],axisData=[];
           		var text="";
           		if(param==null){
           			text="用户";
           		}else if(param.queryType=='flow'){
           			text="流量";
           		}else{
           			text="用户";
           		}
           		for(var i in data){
           			seriesData.push(data[i].sum_count);
           			axisData.push(data[i].app_name);
           		}
           		appInfoOption={
				    color:['#e96453','#8ac4ea'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:[text]
				    },
				    grid:{x:64,y:32,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    xAxis : [{
						type : 'value',
						axisLabel : {
							textStyle : {
								color : '#f6c9d9'
							}
						},
						axisTick:{
							lineStyle : {
								color : '#f6c9d9',
								width:1
							}						
						},
						axisLine:{
							lineStyle : {
								color : '#f6c9d9',
								width:1
							}						
						},
						splitLine:{show:false},
						splitArea:{show:false}
					}],
				    yAxis : [{
						type : 'category',
						splitLine:{show:false},
						splitArea:{show:false},
						axisTick:{show:false},
						axisLine:{
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
						data : axisData
					}],
				    series : [
				        {
				            name:text,
				            type:'bar',
				            barWidth : 16,
				            itemStyle: {
				            	normal: {
				              		barBorderRadius:[0,8,8,0],
				                	label : {show: true}
				            	},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				            },
				            data:seriesData
				        }
				    ]
				};
				appInfo.hideLoading();
				appInfo.setOption(appInfoOption);
				$("#appInfo").addClass("animated bounceInRight");
           	}else{
				appInfo.hideLoading();
            	appInfo = null;
               	$("#appInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			appInfo.hideLoading();
        }
	});
}
//地图加载
function loadMapInfo(){
    mapInfo = echarts.init(document.getElementById('mapInfo'));
    if(loadFlag){
    	mapInfo.showLoading({text:'数据读取中...'});
    }
	mapInfoOption = {
		//backgroundColor:"rgba(0,0,0,0.1)",
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
				textStyle:{fontWeight:500, color:'#64ff48'}
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
				mapLocation:{width:'99%'},
				data:[]
			}
		]
	};
	mapInfo.on(ecConfig.EVENT.MAP_SELECTED,function(param){
		var target=param.target;
		if(target!=null&&target!=''){
			mapTarget=(target=="格尔木市"?"格尔木本地网":target);
			mapInfoOption.title.text=target;
			if(currentType==''){
				currentType='latn';
				mapInfoOption.legend.show=true;
				mapInfoOption.title.show=true;
				mapInfoOption.series[0].name=target;
				mapInfoOption.series[0].mapType=target;			
			}else{
				currentType='area';
				mapInfoOption.legend.data[0].name="返回本地网";
			}
			mapInfo.setOption(mapInfoOption,true);
			refresh();
		}
	});
	mapInfo.on(ecConfig.EVENT.LEGEND_SELECTED,function(param){
		if(currentType=='area'){
			currentType="latn";
			var thisArea=mapTarget;
			var thisLatn=mapInfoOption.series[0].mapType;
			mapTarget=(thisLatn=="格尔木市"?"格尔木本地网":thisLatn);
			mapInfoOption.title.text=thisLatn;
			mapInfoOption.legend.data[0].name="返回全省";
			mapInfoOption.series[0].data=[{name:thisArea,selected:false}];
			mapInfo.setOption(mapInfoOption);			
			refresh();
		}else{
			window.location.reload();
		}
	});
	mapInfo.hideLoading();
	mapInfo.setOption(mapInfoOption);
}
//流量信息
function loadFlowInfo(param){
    flowInfo = echarts.init(document.getElementById('flowInfo'));
    if(loadFlag){
    	flowInfo.showLoading({text:'数据读取中...'});
    }else{
    	$("#flowInfo").removeClass("animated bounceInLeft");
    }
	$.ajax({
		url : "festival_1111/flow.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var axisData=[];
           		var ydSumData=[],ydAvgData=[],kdSumData=[],kdAvgData=[];
           		for(var i in data){
           			if(data[i].flow_type=='sum_1'){
           				ydSumData.push(data[i].sum_flow);
           				axisData.push(data[i].date_no);
           			}
           			if(data[i].flow_type=='avg_1'){
           				ydAvgData.push(data[i].sum_flow);
           			}
           			if(data[i].flow_type=='sum_2'){
           				kdSumData.push(data[i].sum_flow);
           			}
           			if(data[i].flow_type=='avg_2'){
           				kdAvgData.push(data[i].sum_flow);
           			}
           		}
           		var sumScope=getArrayScope('scope',[ydSumData,kdSumData]);
           		var avgScope=getArrayScope('scope',[ydAvgData,kdAvgData]);
           		flowInfoOption={
				    color:['#6eb5e5','#feff01','#2fce34','#f86b4f'],
				    tooltip : {
				        trigger: 'axis',
				        formatter: function(params){
				        	var tipStr="日期："+params[0].name+"<br/>";
				        	for(var i in params){				        		
					        	var seriesName=params[i].seriesName;
					        	var unit="(MB)";
								if(seriesName.indexOf('总流量')!=-1){
									unit="(TB)";
								}
								tipStr+=seriesName+"："+params[i].value+unit+"<br/>";								
				        	}
				        	return tipStr;
				        }
				    },
				    grid:{x:32,y:64,x2:32,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:['移动总流量','移动户均流量','宽带总流量','宽带户均流量']
				    },
				    xAxis : [{
						type : 'category',
						splitLine:{show:false},
						splitArea:{show:false},
						axisLabel : {
							textStyle : {
								color : '#f6c9d9'
							}
						},          	
						axisLine : {
							lineStyle : {
								color : '#f6c9d9',
								width: 1
							}
						},
						data : axisData
					}],
				    yAxis : [{
			            type : 'value',
			            name : '单位(MB)',
			            min	: avgScope.min,
			            max : avgScope.max,
						splitLine:{show:false},
						splitArea:{show:false},
			          	axisLabel : {
							textStyle : {
								color : '#f6c9d9'
							}
			            },          	
			          	axisLine : {
							lineStyle : {
								color : '#f6c9d9',
			                  	width: 1
							}
			            }
				    },{
			            type : 'value',
			            name : '单位(TB)',
			            min	: sumScope.min,
			            max : sumScope.max,
						splitLine:{show:false},
						splitArea:{show:false},
			          	axisLabel : {
							textStyle : {
								color : '#f6c9d9'
							}
			            },          	
			          	axisLine : {
							lineStyle : {
								color : '#f6c9d9',
			                  	width: 1
							}
			            }
				    }
				    ],
				    series : [
				        {
				            name:'移动总流量',
				            type:'line',
							symbol: 'emptyCircle',
							yAxisIndex:1,
							symbolSize:2,
							smooth: false,
				            data:ydSumData
				        },{
				            name:'移动户均流量',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize:2,
							smooth: false,
				            data:ydAvgData
				        },{
				            name:'宽带总流量',
				            type:'line',
							symbol: 'emptyCircle',
							yAxisIndex:1,
							symbolSize:2,
							smooth: false,
				            data:kdSumData
				        },{
				            name:'宽带户均流量',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize:2,
							smooth: false,
				            data:kdAvgData
				        }
				    ]
				};
				flowInfo.hideLoading();
				flowInfo.setOption(flowInfoOption);
				$("#flowInfo").addClass("animated bounceInLeft");
			}else{
				flowInfo.hideLoading();
            	flowInfo = null;
               	$("#flowInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			flowInfo.hideLoading();
        }
	});
}
//用户特征信息
function loadUserInfo(param){
	userInfo = echarts.init(document.getElementById('userInfo'));
    if(loadFlag){
    	userInfo.showLoading({text:'数据读取中...'});
    }else{
    	$("#userInfo").removeClass("animated bounceInDown");
    }
	$.ajax({
		url : "festival_1111/user.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		/*
           		var legendData=[],seriesData=[];
           		var sumTotal=0;
           		for(var i in data){
           			sumTotal+=data[i].user_count;
           			legendData.push(data[i].code_name);
           			seriesData.push({name:data[i].code_name,value:data[i].user_count});
           		}*/           		
           		var userTypeName="性别分类";
           		if(userType=='age'){
           			userTypeName="年龄分类"
           		}
           		var indicatorData=[];
           		var dataValue=[];
           		var sumTotal=0;
           		for(var i in data){
           			sumTotal+=data[i].user_count;
           			indicatorData.push({text:data[i].code_name});
           			dataValue.push(data[i].user_count);
           		}
           		userInfoOption={
				    color:['#71bdee','#ffc600','#f06b5f','#be28cf','#19de56','#ff0000'],
				  	title:{
						textStyle:{color:'#d5a268'},
						x:'left',
						y:'top',
						text:'上网总数 '+sumTotal
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
				        data:[userTypeName]
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
				            //center:['50%','55%'],
							indicator : indicatorData
				        }
				    ],
				    calculable : true,
				    series : [
				        {
				            name: userTypeName,
				            itemStyle: {
				                normal: {
				                    areaStyle: {
				                        type: 'default'
				                    }
				                }
				            },
				            type: 'radar',
				            data : [
				                {
				                    value : dataValue,
				                    name : userTypeName
				                }
				            ]
				        }
				    ]
           		};
           		/*
           		userInfoOption={
				    color:['#71bdee','#ffc600','#f06b5f','#be28cf','#19de56','#ff0000'],
				  	title:{
						textStyle:{color:'#d5a268'},
						x:'left',
						y:'top',
						text:'上网总数 '+sumTotal
				    },
				  	tooltip : {
				        trigger: 'item',
				        formatter: "类别：{b}<br/>人数：{c}<br/>占比：{d}%"
				    },
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        orient : 'vertical',
				        x : 'left',
				        y : 'center',
				        data:legendData
				    },
				    calculable : false,
				    series : [
				        {
				            name:'人数',
				            type:'pie',
				            radius : ['60%', '85%'],
				            center : ['60%','55%'],
				            itemStyle : {
				                normal : {
				                    label : {
				                        show : false
				                    },
				                    labelLine : {
				                        show : false,
				                      	lineStyle:{
				                        	type:'dashed'
				                        }
				                    }
				                }
				            },
				            data:seriesData
				        }
				    ]
				};*/
				userInfo.hideLoading();
			    userInfo.setOption(userInfoOption);
				$("#userInfo").addClass("animated bounceInDown");
			}else{
				userInfo.hideLoading();
            	userInfo = null;
               	$("#userInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			userInfo.hideLoading();
        }
	});
}
//热词
function loadHotWordInfo(param){
	stopAllTimer();
	$("#rankSP").css("margin-top","0px");
	$("#rankFS").css("margin-top","0px");
	$("#rankJD").css("margin-top","0px");
	$("#rankQT").css("margin-top","0px");
	hotWordInfo = echarts.init(document.getElementById('hotWordInfo'));
    if(loadFlag){
    	hotWordInfo.showLoading({text:'数据读取中...'});
    }else{
		$("#hotWordInfo").removeClass("animated bounceInUp");
    }
	$.ajax({
		url : "festival_1111/hotWord.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	var infoData=data.info;
        	if(infoData!=null&&infoData.length>0){
        		var color={
           			fz:{name:'服装',color:'#ffca00',rgba:'rgba(255,202,0,0.1)',radius:['17%','18%']},
           			sp:{name:'食品',color:'#c5564c',rgba:'rgba(197,86,76,0.1)',radius:['37%','38%']},
           			jd:{name:'家电',color:'#be28cf',rgba:'rgba(190,40,207,0.1)',radius:['57%','58%']},
           			qt:{name:'其他',color:'#1ad5df',rgba:'rgba(26,213,223,0.1)',radius:['77%','78%']}
           		};
        		var total=0,seriesData=[];
           		for(var j in infoData){
           			total+=infoData[j].user_count;
           		}
           		for(var i in infoData){
           			if(infoData[i].hot_type=='服装'){
           				seriesData.push(getPieSeries((infoData[i].user_count*100/total).toFixed(2),color.fz,18));
           			}else if(infoData[i].hot_type=='食品'){
           				seriesData.push(getPieSeries((infoData[i].user_count*100/total).toFixed(2),color.sp,18));
           			}else if(infoData[i].hot_type=='家电'){
           				seriesData.push(getPieSeries((infoData[i].user_count*100/total).toFixed(2),color.jd,18));
           			}else if(infoData[i].hot_type=='其他'){
           				seriesData.push(getPieSeries((infoData[i].user_count*100/total).toFixed(2),color.qt,18));
           			}
           		}
        		hotWordInfoOption={
					color:['#ffca00','#c5564c','#be28cf','#1ad5df'],
				    title: {
				      	show:false,
				        text:'热词',
				    },
				    tooltip : {
				        show: true,
				        formatter: function(params){
				        	var str="类型："+params.seriesName+"</br>";
				        	if(params.name!='invisible'){
				        		//str+="数量："+params.value+"</br>";
				        		str+="占比："+params.percent+"%";
				        	}else{
				        		str+="占比："+(100-params.percent).toFixed(2)+"%";
				        	}
				        	return str;
				        }
				    },
				    legend: {
      					textStyle:{color: '#f6c9d9'},
				        x:'left',
				        /*
      					orient : 'vertical',
				        y:'5%',
				        itemGap:12,*/
				        data:['服装','食品','家电','其他']
				    },
				    series : seriesData
				};
           		hotWordInfo.hideLoading();
			    hotWordInfo.setOption(hotWordInfoOption);
				$("#hotWordInfo").addClass("animated bounceInUp");
			}else{
				hotWordInfo.hideLoading();
            	hotWordInfo = null;
               	$("#hotWordInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
			var rankData=data.rank;
        	if(rankData!=null&&rankData.length>0){
       			var topSPHtml="";
        		var topFSHtml="";
       			var topJDHtml="";
       			var topQTHtml="";       			
           	  	for(var i in rankData){
           	  		if(rankData[i].hot_type=='sp'){
           	  			topSPHtml+='<div id="topSPRoll"><a href="javascript:void(0)" style="display:block;height: 45px;line-height: 15px;color:#fff3cf;">●Top'+rankData[i].rn+' '+rankData[i].keyword+'</a></div>';
           	  		}else if(rankData[i].hot_type=='fz'){
           	  			topFSHtml+='<div id="topFSRoll"><a href="javascript:void(0)" style="display:block;height: 45px;line-height: 15px;color:#fff3cf;">●Top'+rankData[i].rn+' '+rankData[i].keyword+'</a></div>';
           	  		}else if(rankData[i].hot_type=='jd'){
           	  			topJDHtml+='<div id="topJDRoll"><a href="javascript:void(0)" style="display:block;height: 45px;line-height: 15px;color:#fff3cf;">●Top'+rankData[i].rn+' '+rankData[i].keyword+'</a></div>';
           	  		}else if(rankData[i].hot_type=='qt'){
           	  			topQTHtml+='<div id="topQTRoll"><a href="javascript:void(0)" style="display:block;height: 45px;line-height: 15px;color:#fff3cf;">●Top'+rankData[i].rn+' '+rankData[i].keyword+'</a></div>';
           	  		}
			  	}
			  	if(topSPHtml!=""){
					$("#rankSP").html(topSPHtml);
					rollAnimation(45,1,4000,"rankSP");
			  	}else{
					$("#rankSP").html("暂无数据！");
			  	}
			  	if(topFSHtml!=""){
					$("#rankFS").html(topFSHtml);
					rollAnimation(45,1,6000,"rankFS");
			  	}else{
					$("#rankFS").html("暂无数据！");
			  	}
			  	if(topJDHtml!=""){
					$("#rankJD").html(topJDHtml);
					rollAnimation(45,1,5000,"rankJD");
			  	}else{
					$("#rankJD").html("暂无数据！");
			  	}
			  	if(topQTHtml!=""){
					$("#rankQT").html(topQTHtml);
					rollAnimation(45,1,5500,"rankQT");
			  	}else{
					$("#rankQT").html("暂无数据！");
			  	}
        	}else{
				$("#rankSP").html("暂无数据！");
				$("#rankFS").html("暂无数据！");
				$("#rankJD").html("暂无数据！");
				$("#rankQT").html("暂无数据！");
        	}
        },
        error : function(result){
			hotWordInfo.hideLoading();
        }
	});
}
//访问114人数
function loadVisit114Info(param){
	visit114Info = echarts.init(document.getElementById('visit114Info'));
    if(loadFlag){
    	visit114Info.showLoading({text:'数据读取中...'});
    }else{
		$("#visit114Info").removeClass("animated slideInDown");
    }
	$.ajax({
		url : "festival_1111/visit114.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var axisData=[],seriesData=[];
           		for(var i in data){
           			axisData.push(data[i].date_no);
					seriesData.push(data[i].user_count);
           		}
           		visit114InfoOption={
				    color:['#c4584e','#ffca00','#1ad5de'],
				  	title: {
						text : "年销量(万)",
						x:'center',
						y:'top',
      					show:false,
						textStyle : {
							color : '#fff3cf',
							fontFamily : '微软雅黑',
							fontSize : 16
						}
					},
			        tooltip : {
			            trigger: 'axis'
			        },
			        color:['#f86b4f'],
			        calculable : false,
				    grid:{x:64,y:0,x2:16,y2:32,borderWidth:'0'},
					xAxis:[{
						type : 'value',
			        	splitLine:{
			        		show:true,
			        		lineStyle:{
								color: '#f6c9d9',
								width: 1
			        		}
			        	},
						splitArea:{show:false},
						axisLine : {show:false},
						axisTick:{show:false},
						axisLabel : {
							textStyle : {
								color : '#ffffff'
							}
						},
						boundaryGap : [0, 0.01]
					}],
			        yAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category' ,
						axisLine : {show:false},
						axisTick:{
							lineStyle : {
								color : '#f6c9d9',
								width:1
							}						
						},
						axisLine:{
							lineStyle : {
								color : '#f6c9d9',
								width:1
							}						
						},
						axisLabel : {
							textStyle : {
								color : '#fdcc65'
							}
						},
						data : axisData
					}],
			        series : [{
						name:'人数',
						type:'bar',
						barWidth : 6,
						itemStyle:{
							normal:{
								barBorderRadius:[0,8,8,0],
								label: {
									show: false,
									textStyle : {color : '#f6c9d9'},
									position: 'right'
								}
							},
							emphasis:{
								color: 'transparent',
								label: {show: true}
							}
						},
						data:seriesData
					}]
			    };
				visit114Info.hideLoading();
			    visit114Info.setOption(visit114InfoOption);
				$("#visit114Info").addClass("animated slideInDown");
			}else{
				visit114Info.hideLoading();
            	visit114Info = null;
               	$("#visit114Info").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			visit114Info.hideLoading();
        }
	});
}
//翼支付交付质量
function loadWingPayInfo(param){
	wingPayInfo = echarts.init(document.getElementById('wingPayInfo'));
    if(loadFlag){
    	wingPayInfo.showLoading({text:'数据读取中...'});
    }else{
    	$("#wingPayInfo").removeClass("animated slideInDown");
    }
	$.ajax({
		url : "festival_1111/wingPay.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var axisData=[],seriesData=[];
           		for(var i in data){
           			axisData.push(data[i].day_id);
           			seriesData.push(data[i].total_count);
           		}
           		wingPayInfoOption={
				    color:['#c4584e','#ffca00','#1ad5de'],
				  	title: {
						text : "年销量(万)",
						x:'center',
						y:'top',
      					show:false,
						textStyle : {
							color : '#fff3cf',
							fontFamily : '微软雅黑',
							fontSize : 16
						}
					},
			        tooltip : {
			            trigger: 'axis'
			        },
			        color:['#f86b4f'],
			        calculable : false,
				    grid:{x:64,y:0,x2:16,y2:32,borderWidth:'0'},
					xAxis:[{
						type : 'value',
			        	splitLine:{
			        		show:true,
			        		lineStyle:{
								color: '#f6c9d9',
								width: 1
			        		}
			        	},
						splitArea:{show:false},
						axisLine : {show:false},
						axisTick:{show:false},
						axisLabel : {
							textStyle : {
								color : '#ffffff'
							}
						},
						boundaryGap : [0, 0.01]
					}],
			        yAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category' ,
						axisLine : {show:false},
						axisTick:{
							lineStyle : {
								color : '#f6c9d9',
								width:1
							}						
						},
						axisLine:{
							lineStyle : {
								color : '#f6c9d9',
								width:1
							}						
						},
						axisLabel : {
							textStyle : {
								color : '#fdcc65'
							}
						},
						data : axisData
					}],
			        series : [{
						name:'人数',
						type:'bar',
						barWidth : 6,
						itemStyle:{
							normal:{
								barBorderRadius:[0,8,8,0],
								label: {
									show: false,
									textStyle : {color : '#f6c9d9'},
									position: 'right'
								}
							},
							emphasis:{
								color: 'transparent',
								label: {show: true}
							}
						},
						data:seriesData
					}]
			    };
				wingPayInfo.hideLoading();
			    wingPayInfo.setOption(wingPayInfoOption);
				$("#wingPayInfo").addClass("animated slideInDown");
			}else{
				wingPayInfo.hideLoading();
            	wingPayInfo = null;
               	$("#wingPayInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			wingPayInfo.hideLoading();
        }
	});
}