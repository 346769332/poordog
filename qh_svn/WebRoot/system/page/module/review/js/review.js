/* 文件：review.js
 * 作者：Lyndon
 * 功能描述：review.jsp的各个模块加载函数
 */
//变量定义
var thisYear=parseInt(new Date().getFullYear());
var befYear=thisYear-1;
var lastYear=thisYear-2;
var callBusiInfo=null,callBusiInfoOption;//话务量
var mapInfo=null,mapInfoOption;//地图
var messageBusiInfo=null,messageBusiInfoOption;//短信量
var rechargeInfo=null,rechargeInfoOption;//充值信息
var mobileUserInfo=null,mobileUserInfoOption;//手机用户上网信息
var appInfo=null,appInfoOption;//用户行为--APP
var urlInfo=null,urlInfoOption;//用户行为--URL
var keywordInfo=null,keywordInfoOption;//用户行为--关键词
var interestInfo=null,interestInfoOption;//用户行为--兴趣点
var viewType='user';
var currentType='',mapTarget='';
var loadFlag=true;
var userTimer=null,otherTimer=null;
function refresh(){
	if(userTimer!=null){
    	clearInterval(userTimer);
	}
	if(otherTimer!=null){
    	clearInterval(otherTimer);
	}
	var pm=getMapParam(currentType,mapTarget);
	pm.queryType=viewType;
	loadCallBusiInfo(pm);
	loadRechargeInfo(pm);
	loadMobileUserInfo(pm);
	loadAppInfo(pm);
	loadKeywordInfo(pm);
	loadInterestInfo(pm);
	loadUrlInfo(pm);
	loadMessageBusiInfo(pm);
	loadFlag=false;
	/*
	userTimer=setInterval(loadUserInfo,5000);
	otherTimer=setInterval(function(){
		loadWingPayInfo();
		loadOweFeeInfo();
		loadIncomeInfo();
		loadSaleInfo();
	},30000);*/
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
				textStyle:{fontWeight:500,fontSize:14,color:'#64ff48'}
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
						borderColor:"#fdcc65",//'rgba(0,0,0,1)',
						borderWidth:0.5,
						areaStyle:{
							color: 'rgba(0,0,0,0)'//'#323c48'
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
 
//话务量
function loadCallBusiInfo(param){
    callBusiInfo = echarts.init(document.getElementById('callBusiInfo'));
    if(loadFlag){
    	callBusiInfo.showLoading({text:'数据读取中...'});
    }else{
		$("#callBusiInfo").removeClass("animated slideInLeft");
    }
	$.ajax({
		url : "review/call.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
         	if(data!=null&&data.length>0){
         		var indicatorData=[];
           		var shengNeiData=[];
           		var shengJiData=[];
           		var guoJiData=[];
           		for(var i in data){
		        	indicatorData.push({text:data[i].month_no});
		        	shengNeiData.push(data[i].shengnei_num);
		        	shengJiData.push(data[i].shengji_num);
		        	guoJiData.push(data[i].guoji_num);
           		}
           		callBusiInfoOption={
				    color:['#71bdee','#ffc600','#f06b5f','#be28cf','#19de56','#ff0000'],
				  	title:{
				  		show:false,
						textStyle:{color:'#d5a268'},
						x:'left',
						y:'top',
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter:function(param){
				        	var tips=param[0].indicator+"</br>";
				        	tips+=param[0].name+"："+param[0].value+"</br>";
				        	tips+=param[1].name+"："+param[1].value+"</br>";
				        	tips+=param[2].name+"："+param[2].value+"</br>";				        	
				        	return tips;
				        }
				    },				    
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				      	itemGap:16,
				        orient : 'vertical',
				        x : 'left',
				        y : 'center',
				        data:['省内','省际','国际']
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
				            center : ['55%','50%'],
				            radius : '80%',
							indicator : indicatorData
				        }
				    ],
				    calculable : true,
				    series : [
				        {
				            name: '话务量',
				            type: 'radar',
				            data : [
				                {
				                    value : shengNeiData,
				                    name : '省内'
				                },
				                {
				                    value : shengJiData,
				                    name : '省际'
				                },
				                {
				                    value : guoJiData,
				                    name : '国际'
				                }
				            ]
				        }
				    ]
           		};
		        /*    		
		        var axisData=[],shengNeiData=[];shengJiData=[];guoJiData=[];
		        for(var i in data){
		        	axisData.push(data[i].month_no);
		        	shengNeiData.push(data[i].shengnei_num);
		        	shengJiData.push(data[i].shengji_num);
		        	guoJiData.push(data[i].guoji_num);
		        }
           		callBusiInfoOption={
					color:['#aa4c67','#b67b39','#1ad5de'],
				    title : {
		      			textStyle:{color: '#f6c9d9'},
				        subtext:"单位：百万",
		              	x:'left',
		              	y:'top'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
		              	x:'right',
		              	y:48,
				        data:[
		                  {name:'省内',textStyle:{color:'auto'}},
		                  {name:'省际',textStyle:{color:'auto'}},
		                  {name:'国际',textStyle:{color:'auto'}}
		                ]
				    },
					grid:{x:16,y:64,x2:16,y2:32,borderWidth:'0'},
					calculable : true,
			    	xAxis : [{
			            type : 'category',
						splitLine:{show:false},
						splitArea:{show:false},
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
								color : '#f6c9d9'
							}
			            },
			            boundaryGap : false,
			            data : axisData
			        }],
					yAxis : [{
			            type : 'value',
						splitLine:{show:false},
						splitArea:{show:false},
			          	axisLabel:{show:false},
			          	axisLine:{show:false}
			        }],
					series : [
						{
				            name:'省内',
				            type:'line',
				          	symbol:'none',
				            smooth:true,
				            itemStyle: {normal: {lineStyle:{color: '#aa4c67'},areaStyle: {color: 'rgba(170,76,103,0.4)'}}},
				            data:shengNeiData
			        	},{
				            name:'省际',
				            type:'line',
				          	symbol:'none',
				          	smooth:true,
				            itemStyle: {normal: {lineStyle:{color: '#b67b39'},areaStyle: {color:"rgba(182,123,57,0.4)"}}},
				            data:shengJiData
				        },{
				            name:'国际',
				          	symbol:'none',
				            type:'line',
				            smooth:true,
				            itemStyle: {normal: {lineStyle:{color: '#1ad5de'},areaStyle: {color:"#1ad5de"}}},
				            data:guoJiData
				        }
					]
				};*/
				callBusiInfo.hideLoading();
				callBusiInfo.setOption(callBusiInfoOption);
				$("#callBusiInfo").addClass("animated slideInLeft");
           	}else{
				callBusiInfo.hideLoading();
            	callBusiInfo = null;
               	$("#callBusiInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			callBusiInfo.hideLoading();
        }
	});
}


//短信量信息
function loadMessageBusiInfo(param){
    messageBusiInfo = echarts.init(document.getElementById('messageBusiInfo'));
    if(loadFlag){
    	messageBusiInfo.showLoading({text:'数据读取中...'});
    }else{
		$("#messageBusiInfo").removeClass("animated slideInRight");
    }
	$.ajax({
		url : "review/message.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据 
           	if(data!=null&&data!=''&&data.length>0){
           		var dateNoData=[],sumNumData=[],toDxData=[],toYdData=[],toLtData=[];
		        for(var i in data){
		        	dateNoData.push(data[i].month_no);
		        	sumNumData.push(data[i].sum_num);
		        	toDxData.push(data[i].to_dx);
		        	toYdData.push(data[i].to_yd);
		        	toLtData.push(data[i].to_lt)
		        } 
           		for(var i in data)
           		messageBusiInfoOption={					
				  	color:['#d9ffe5','#ffc600','#1ad5de','#e96453'],
				  	title: {
				        subtext: '单位：万条',
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {
				            type : 'shadow'
				        }
				    },
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:['累计发送量','到电信','到联通','到移动']
				    },
				    calculable : true,
					grid:{x:32,y:64,x2:16,y2:16,borderWidth:'0'},
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
						data : dateNoData
					}],
				    series : [
				    	{
							name:'累计发送量',
				            type:'bar',
				            itemStyle : {
				            	normal: {
				            		barBorderRadius:[0,8,8,0],
				            		label : {show: false, position: 'insideRight'}
				            	},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				            },
				            data:sumNumData
						},{
				            name:'到电信',
				            type:'bar',
				            stack: '总量',
				            itemStyle : {
				            	normal: {
				            		label : {show: false, position: 'insideRight'}
				            	},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				            },
				            data:toDxData
				        },{
				            name:'到联通',
				            type:'bar',
				            stack: '总量',
				            itemStyle : {
				            	normal: {
				            		label : {show: false, position: 'insideRight'}
				            	},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				            },
				            data:toLtData
				        },{
				            name:'到移动',
				            type:'bar',
				            stack: '总量',
				            itemStyle : {
				            	normal: {
				            		barBorderRadius:[0,8,8,0],
				            		label : {show: false, position: 'insideRight'}
				            	},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				            },
				            data:toYdData
				        }
				    ]
				};
				messageBusiInfo.hideLoading();
				messageBusiInfo.setOption(messageBusiInfoOption);
				$("#messageBusiInfo").addClass("animated slideInRight");
			}else{
				messageBusiInfo.hideLoading();
            	messageBusiInfo = null;
               	$("#messageBusiInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			messageBusiInfo.hideLoading();
        }
	});
}
//缴费信息
function loadRechargeInfo(param){
	rechargeInfo = echarts.init(document.getElementById('rechargeInfo'));
    if(loadFlag){
    	rechargeInfo.showLoading({text:'数据读取中...'});
    }else{    	
		$("#rechargeInfo").removeClass("animated slideInRight");
    }
	$.ajax({
		url : "review/recharge.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据 
           	if(data!=null&&data!=''&&data.length>0){
           		var legendData=[befYear+'缴费金额（百万）',lastYear+'缴费金额（百万）',befYear+'缴费用户数（万）',lastYear+'缴费用户数（万）'];
           		var axisData=[],lastNumData=[];befNumData=[];lastChargeData=[];
           		befChargeData=[];
		        for(var i in data){
		        	axisData.push(data[i].month_no);
		        	lastNumData.push(data[i].last_num);
		        	befNumData.push(data[i].before_num);
		        	lastChargeData.push(data[i].last_charge);
		        	befChargeData.push(data[i].before_charge);
		        } 
           		rechargeInfoOption={
				    color:['#db5f55','#e1a717','#6eb5e5','#1ade57'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:16,y:64,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:legendData
				    },
				    xAxis : [{
						type : 'category',
						splitLine:{show:false},
						splitArea:{show:false},
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
								color : '#f6c9d9'
							}
						},
						data : axisData
					}],
				    yAxis : [
				        {
				            type : 'value',
				            name : '金额（百万）',
							splitLine:{show:false},
							splitArea:{show:false},
						    axisLabel:{show:false},
						    axisLine:{show:false}
				        },{
				            type : 'value',
				            name : '用户数（万）',
							splitLine:{show:false},
							splitArea:{show:false},
						    axisLabel:{show:false},
						    axisLine:{show:false}
				        }
				    ],
				    series : [
				        {
				            name:legendData[0],
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
				            data: befChargeData 
				        },{
				            name:legendData[1],
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
				            data:lastChargeData
				        },{
				            name:legendData[2],
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            yAxisIndex: 1,
				            data:befNumData 
				        },{
				            name:legendData[3],
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            yAxisIndex: 1,
				            data:lastNumData
				        }
				    ]
				};
				rechargeInfo.hideLoading();
			    rechargeInfo.setOption(rechargeInfoOption);
				$("#rechargeInfo").addClass("animated slideInRight");
			}else{
				rechargeInfo.hideLoading();
            	rechargeInfo = null;
               	$("#rechargeInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			rechargeInfo.hideLoading();
        }
	});
}
//手机用户上网情况
function loadMobileUserInfo(param){
	$("#mobileUserInfo").removeClass("animated flipInY");
	mobileUserInfo = echarts.init(document.getElementById('mobileUserInfo'));
    if(loadFlag){
    	mobileUserInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "review/mobile.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
			//测试数据
		 
        	if(data!=null&&data!=''&&data.length>0){
        		var axisData=[],lastData=[],befData=[];
        		var pointLast=[],pointBef=[];
		        for(var i in data){
		        	axisData.push(data[i].month_no);
		        	lastData.push(data[i].last_ll);
		        	befData.push(data[i].bef_ll);
		        	pointLast.push({xAxis:data[i].month_no,yAxis:data[i].last_ll});
		        	pointBef.push({xAxis:data[i].month_no,yAxis:data[i].bef_ll});
		      } 
        		mobileUserInfoOption={        			
				    color:['#fec601','#6eb5e6'],
				    title: {
				          subtext: '单位：G'
				        },
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:16,y:64,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:[befYear+"",lastYear+""]
				    },
				    xAxis : [{
						type : 'category',
						splitLine:{show:false},
						splitArea:{show:false},
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
								color : '#f6c9d9'
							}
						},
						data : axisData
					}],
				    yAxis : [{
						type : 'value',
						name : 'G',
						splitLine:{show:false},
						splitArea:{show:false},
						axisLabel:{show:false},
						axisLine:{show:false}
					}],
				    series : [
				        {
				            name:befYear+"",
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:befData,				            
                            markPoint : {
                            	//tooltip:{show：false},
				            	symbol:'diamond',
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
				                data : pointBef
				           }
				        },{
				            name:lastYear+"",
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:lastData,				            
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
				                data : pointLast
				           }
				        }
				    ]
				};
				/*
				var thisTicket;
				var thiscounter=1;
				thisTicket = setInterval(function(){
					if(thiscounter<12){
						// 动态数据接口 addData
						mobileUserInfo.addData([
							[
								0,        // 系列索引
								befData[thiscounter], // 新增数据
								false,    // 新增数据是否从队列头部插入
								true    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
								//xAxisFlow[thiscounter++]  // 坐标轴标签
							],[
								1,        // 系列索引
								lastData[thiscounter], // 新增数据
								false,    // 新增数据是否从队列头部插入
								true    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
								//xAxisFlow[thiscounter++]  // 坐标轴标签
							]
						]);
						thiscounter++;
					}else{
						clearInterval(thisTicket);
					}
				},200);*/
           		mobileUserInfo.hideLoading();
			    mobileUserInfo.setOption(mobileUserInfoOption);
				$("#mobileUserInfo").addClass("animated flipInY");
			}else{
				mobileUserInfo.hideLoading();
            	mobileUserInfo = null;
               	$("#mobileUserInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			mobileUserInfo.hideLoading();
        }
	});
}
//用户行为--APP信息
function loadAppInfo(param){
	appInfo = echarts.init(document.getElementById('switch_appInfo'));
    if(loadFlag){
    	appInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "review/app.do",
        data :param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
		var appNameData=[],trafficData=[];befData=[];
        for(var i in data){
        	appNameData.push(data[i].app_name);
        	trafficData.push({value:data[i].traffic,name:data[i].app_name}); 
      } 
           	if(data!=null&&data!=''&&data.length>0){
           		appInfoOption={					
				    color:['#bda29b','#ca8623','#749f83','#6eb5e6','#d38265','#61a0a9','#2f4554','#c33531'],
				    title : {
				      	show:false,
				        text: '用户行为'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        x : 'left',
				        y : 'center',
				        orient:'vertical',
				      	textStyle:{color: '#f6c9d9'},
				        data:appNameData
				    },
				    calculable : false,
				    series : [
				        {
				            name:'app应用',
				            type:'pie',
				            radius : ['30%','90%'],
				            center : ['55%','50%'],
				            roseType : 'radius',
				            width: '40%',       // for funnel
				            max: 40,            // for funnel
				            itemStyle : {
				                normal : {
				                    label : {
				                        show : false
				                    },
				                    labelLine : {
				                        show : false
				                    }
				                },
				                emphasis : {
				                    label : {
				                        show : false
				                    },
				                    labelLine : {
				                        show : false
				                    }
				                }
				            },
				            data:trafficData
				        }
				    ]
				};
				appInfo.hideLoading();
			    appInfo.setOption(appInfoOption);
			}else{
				appInfo.hideLoading();
            	appInfo = null;
               	$("#switch_appInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			appInfo.hideLoading();
        }
	});
}
//用户行为--URL信息
function loadUrlInfo(param){
	urlInfo = echarts.init(document.getElementById('switch_urlInfo'));
    if(loadFlag){
    	urlInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "review/url.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据        	 
           	if(data!=null&&data!=''&&data.length>0){
           		var selectColor=['#D9D919','#DBDB70','#E47833','#FFFF00','#FF0000','#00FF00','#FFFFFF','#00FFFF','#7FFF00','#6495ED'];
           		var urlData=[];
           		for(var i in data){
           			urlData.push({
           				name:data[i].url_name,
           				value:data[i].user_count,
           				itemStyle:{
           					normal:{color:selectColor[parseInt(Math.random()*10)]}
           				}
           			});
           		}
           		urlInfoOption={
				    title: {
				        text: 'URL搜索信息',
				        show:false
				    },
				    tooltip: {
				        textStyle:{fontSize:8},
				        show: true
				    },
				    series: [{
				        name: 'URL',
				        type: 'wordCloud',
				        size: ['110%', '110%'],
				        textRotation : [0,45,60,90,-45,-60,-90],
				        textPadding: 0,
				        autoSize: {
				            enable: true,
				            minSize: 14
				        },
				        data: urlData
				    }]
				};
				urlInfo.hideLoading();
			    urlInfo.setOption(urlInfoOption);
			}else{
				urlInfo.hideLoading();
            	urlInfo = null;
               	$("#switch_urlInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			urlInfo.hideLoading();
        }
	});
}
//用户行为--关键词信息
function loadKeywordInfo(param){
	keywordInfo = echarts.init(document.getElementById('switch_keywordInfo'));
    if(loadFlag){
    	keywordInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "review/keyword.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	 
           	if(data!=null&&data!=''&&data.length>0){
           		var keywordData=[] ;
           		var selectColor=['#D9D919','#DBDB70','#E47833','#FFFF00','#FF0000','#00FF00','#FFFFFF','#00FFFF','#7FFF00','#6495ED'];
                for(var i in data){
                	keywordData.push({name:data[i].keyword,value:data[i].user_count,itemStyle:{
       					normal:{color:selectColor[parseInt(Math.random()*10)]}
       				}}); 
              } 
           		 
           		keywordInfoOption={
				    title: {
				        text: '关键词信息',
				        show:false
				    },
				    tooltip: {
				        textStyle:{fontSize:8},
				        show: true
				    },
				    series: [{
				        name: '关键词',
				        type: 'wordCloud',
				        size: ['110%', '110%'],
				        textRotation : [0,30,45,60,90,-30,-45,-60,-90],
				        textPadding: 0,
				        autoSize: {
				            enable: true,
				            minSize: 14
				        },
				        data: keywordData
				    }]
				};
				keywordInfo.hideLoading();
			    keywordInfo.setOption(keywordInfoOption);
			}else{
				keywordInfo.hideLoading();
            	keywordInfo = null;
               	$("#switch_keywordInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			keywordInfo.hideLoading();
        }
	});
}
//用户行为--兴趣点信息
function loadInterestInfo(param){
	interestInfo = echarts.init(document.getElementById('switch_interestInfo'));
    if(loadFlag){
    	interestInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "review/interest.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	 
           	if(data!=null&&data!=''&&data.length>0){
           		var interestData=[],yAxisData=[];
           		for(var i in data){
           			yAxisData.push(data[i].class_name);
           			interestData.push(data[i].traffic);
           		}
           		interestInfoOption={
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
				    	name: 'G',
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
				    series : [
				    	{
				            name:'兴趣点',
				            type:'bar',
							barWidth :16,
				            itemStyle : {
				            	normal: {
				            		barBorderRadius:[0,8,8,0],
				            		label : {
				            			show: false,
				            			position: 'insideRight'
				            		}
				            	},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				            },
				            data:interestData
				        }
				    ]
				};
				interestInfo.hideLoading();
			    interestInfo.setOption(interestInfoOption);
			}else{
				interestInfo.hideLoading();
            	interestInfo = null;
               	$("#switch_interestInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			interestInfo.hideLoading();
        }
	});
}