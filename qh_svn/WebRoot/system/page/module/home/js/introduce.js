/* 文件：introduce.js
 * 作者：baicd
 * 功能描述：introduce.jsp的各个模块加载函数
 */
//变量定义
//var mapInfo=null,mapInfoOption=null;
//var localMapInfo=null;localMapInfoOption=null;
var broadbandSpeedInfo=null,broadbandSpeedInfoOption=null;
var twellthFiveYearPlanInfo=null,twellthFiveYearPlanInfoOption=null;
var noRelaNameUser=null;
var latnName='',areaName='';
//宽带速率数据加载
function loadBroadbandSpeedInfo(){
	if(broadbandSpeedInfo==null){
		broadbandSpeedInfo=echarts.init(document.getElementById('broadbandSpeedInfo'));
	}
	$("#broadbandSpeedInfo").removeClass("animated slideInDown");
	$.ajax({
		url : "wingPay/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[0];
           	if(data!=null&&data!=''&&data.length>0){
           		var cData=[],gData=[],jData=[],qData=[];
           		var testOther={value: 40,name: 'other',itemStyle: {normal: {borderWidth: 0}}};
           		cData.push({value: 20,name: '2M-10M'});
           		cData.push(testOther);
           		gData.push({value: 50,name: '10M-20M'});
           		gData.push(testOther);
           		jData.push({value: 25,name: '20M-50M'});
           		jData.push(testOther);
           		qData.push({value: 15,name: '50M以上'});
           		qData.push(testOther);
				if(broadbandSpeedInfoOption!=null){					
					broadbandSpeedInfo.setOption({
						series: [{data: cData},{data: gData},{data: jData},{data: qData}]
					});
					return true;
				}
				broadbandSpeedInfoOption = {
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    series: [{
				        name: '2M-10M',
				        type: 'pie',
				        center: ['12%','55%'],
				        radius: ['83%','85%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(252,202,69)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(252,202,69)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='2M-10M'){
				                       return param.name+'\n'+param.value;
				                    }else{
				                        return '';
				                    }
				                }
				            }
				        },
				        labelLine: {
				            normal: {
				                show: false,
				                lineStyle: {
				                    color: '#ffffff'
				                }
				            }
				        },
				        data: cData
				    },{
				        name: '10M-20M',
				        type: 'pie',
				        center: ['37%','55%'],
				        radius: ['83%','85%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(99,183,33)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(99,183,33)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='10M-20M'){
				                       return param.name+'\n'+param.value;
				                    }else{
				                        return '';
				                    }
				                }
				            }
				        },
				        labelLine: {
				            normal: {
				                show: false,
				                lineStyle: {
				                    color: '#ffffff'
				                }
				            }
				        },
				        data: gData
				    },{
				        name: '20M-50M',
				        type: 'pie',
				        center: ['62%','55%'],
				        radius: ['83%','85%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(35,184,182)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(35,184,182)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='20M-50M'){
				                       return param.name+'\n'+param.value;
				                    }else{
				                        return '';
				                    }
				                }
				            }
				        },
				        labelLine: {
				            normal: {
				                show: false,
				                lineStyle: {
				                    color: '#ffffff'
				                }
				            }
				        },
				        data: jData
				    },{
				        name: '50M以上',
				        type: 'pie',
				        center: ['87%','55%'],
				        radius: ['83%','85%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(34,112,184)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(34,112,184)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='50M以上'){
				                       return param.name+'\n'+param.value;
				                    }else{
				                        return '';
				                    }
				                }
				            }
				        },
				        labelLine: {
				            normal: {
				                show: false,
				                lineStyle: {
				                    color: '#ffffff'
				                }
				            }
				        },
				        data: qData
				    }]
				};
				broadbandSpeedInfo.setOption(broadbandSpeedInfoOption);
		    	$("#broadbandSpeedInfo").addClass("animated slideInDown");
           	}else{
           		broadbandSpeedInfo=null,broadbandSpeedInfoOption=null;
				$("#broadbandSpeedInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
		 	}
        },
        error : function(result){broadbandSpeedInfo=null,broadbandSpeedInfoOption=null;console.log("地图附加信息查询错误！");}
	});
}

 
//十二五规划数据加载Twelfth Five-year Plan
function loadTwellthFiveYearPlanInfo(){
	if(twellthFiveYearPlanInfo==null){
		twellthFiveYearPlanInfo=echarts.init(document.getElementById('twellthFiveYearPlanInfo'));
	}
	$("#twellthFiveYearPlanInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        		//营业收入数据
        	 operationIncomeData=[11.79,14.06,17.58,18.76,17.00];
        	 	//收入增长率
        	 incomeGrowthData=[13.69,18.92,24.97,5.93,-1.53];
        		//预算完成率
        	 budgetCompletionData=[103.48,104.15,105.90,100.28,97.07];
           	if(data!=null&&data.length>0){
           		var axisData=[],barData=[],symbolData=[];
           		        		
           		 
           		/*
				if(twellthFiveYearPlanInfoOption!=null){					
					twellthFiveYearPlanInfo.setOption({
						xAxis: [{data: axisData}],
						series: [{type: 'bar',data: barData},{type: 'pictorialBar',data: symbolData}]
					});
					$("#twellthFiveYearPlanInfo").addClass("animated slideInLeft");
					return true;
				}*/
				twellthFiveYearPlanInfoOption = {
				
					animationDelay: function (idx) {
						return idx * 100;
					},
					  
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
					grid: { zlevel: 1,
				            z: 0,
				            x: 40,
				            y: 85,
				            x2:40,
				            y2:73,
				            borderWidth:'0'
				        },
					 color: ['#3398DB'],
					 tooltip: {
				        trigger: 'axis'
				    }, 
				    legend: {
				        data:['经营收入','收入增长率','预算完成率'],
				         textStyle: {
								color: '#FCFCFC'
							}
				    },
				    xAxis: [
				        {  
							splitLine: {show: false},
						   	axisTick: {show: false},
						   	axisLine: {show: true},
				           	type: 'category',
				           	data: ['2011年','2012年','2013年','2014年','2015年'],
				           	axisLabel: {
							textStyle: {
								color: '#FCFCFC'
							}
						}
				        }
				    ],
				    yAxis: [
				        { 
							splitLine: {show: false},
						   	axisTick: {show: false},
						   	axisLine: {show: false},
							axisLabel: {show: false},
				            type: 'value', 
				            name: '经营收入',  
				            axisLabel: {
				            formatter: '{value} 亿',
				            textStyle: {
								color: '#FCFCFC'
							}
				            }
				        },
				        {
							splitLine: {show: false},
						   	axisTick: {show: false},
						   	axisLine: {show: false},
							axisLabel: {show: false},
				            type: 'value',
				            name: '增长/完成率', 
				            axisLabel: {
				                formatter: '{value}%',
				            textStyle: {
								color: '#FCFCFC'
							}
				            }
				        }
				    ],
				    series: [
				        {
				            name:'经营收入',
				            type:'bar',
				            barWidth : 10,
				           itemStyle:{
                    normal:{
                        barBorderRadius:[12, 12, 0, 0],
                        label: {
                    show: false,
                        textStyle : {
                        },
                    position: 'top',
                    formatter: '{c}',
				            textStyle: {
								color: '#FCFCFC'
							}
                          }
                    },
                     emphasis: {
                    color:'transparent',
                    label:{show:false}
                    }
                },
				            data:operationIncomeData
				        },
				        {
				            name:'收入增长率',
				             type:'line',
				            yAxisIndex: 1,
				            data:incomeGrowthData
				        },
				        {
				            name:'预算完成率',
				            type:'line',
				            yAxisIndex: 1,
				            data:budgetCompletionData
				        }
				    ]
				};
				twellthFiveYearPlanInfo.setOption(twellthFiveYearPlanInfoOption);
				$("#twellthFiveYearPlanInfo").addClass("animated slideInLeft");
			}else{
				twellthFiveYearPlanInfo=null,twellthFiveYearPlanInfoOption=null;
				$("#twellthFiveYearPlanInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){twellthFiveYearPlanInfo=null,twellthFiveYearPlanInfoOption=null;console.log("翼支付查询错误！");}
	});
}
 
 
 //未实名停拆机用户
function loadNoRelaNameUserInfo(){
    $("#noRelaNameUser").find("i").css("background-position","0 0");
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[{reach_value: 23424}];
        	
           	if(data!=null&&data.length>0){
           		numberRollAnimation('noRelaNameUser',data[0].reach_value,6,'',32);
			} 
        },
        error : function(result){console.log("未实名制拆机户查询错误！");}
	});
}
function loadOtherModule(){	 
	loadBroadbandSpeedInfo();  
	loadTwellthFiveYearPlanInfo();
	loadNoRelaNameUserInfo();
}
//页面函数加载
loadEcharts({
	chinaMap: false,
	qhMap: false,
	mapExtend: false,
	pageFunc: function(){  
		loadBroadbandSpeedInfo(); 
		loadNoRelaNameUserInfo();
		loadTwellthFiveYearPlanInfo()
	}
});