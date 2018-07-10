/* 文件：wingPay.js
 * 作者：Lyndon
 * 功能描述：wingPay.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption=null;//地图
var userInfo=null,userInfoOption=null;//最近7天用户数
var wingpayInfo=null,wingpayInfoOption=null;//翼支付最近7天金额
var latnName='',areaName='';
var saleTimer=null;
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
function loadSaleVal(){
    $("#roll_num_sale").find("i").css("background-position","0 0");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":localName=='格尔木市'?'格尔木本地网':localName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var saleSum=0;
           		for(var i in data){
           			saleSum+=data[i].sum_value;
           		}
				numberRollAnimation("roll_num_sale",saleSum,9,'',64);
			}
        },
        error : function(result){console.log("销售总额查询错误！");}
	});
}
function loadUserInfo(){
	if(userInfo==null){
		userInfo=echarts.init(document.getElementById('userInfo'));
	}
	$("#userInfo").removeClass("animated slideInUp");
	$.ajax({
		url : "wingPay/user.do",
        data : {"latnName":localName=='格尔木市'?'格尔木本地网':localName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	/*
        	data=[
        		{day_id:'20170301',pay_type:'餐饮娱乐',sum_value:1100},
        		{day_id:'20170301',pay_type:'购物',sum_value:2300},
        		{day_id:'20170301',pay_type:'加油',sum_value:900},
        		{day_id:'20170301',pay_type:'其他',sum_value:700},
        		{day_id:'20170302',pay_type:'餐饮娱乐',sum_value:1100},
        		{day_id:'20170302',pay_type:'购物',sum_value:2300},
        		{day_id:'20170302',pay_type:'加油',sum_value:900},
        		{day_id:'20170302',pay_type:'其他',sum_value:700},
        		{day_id:'20170303',pay_type:'餐饮娱乐',sum_value:1100},
        		{day_id:'20170303',pay_type:'购物',sum_value:2300},
        		{day_id:'20170303',pay_type:'加油',sum_value:900},
        		{day_id:'20170303',pay_type:'其他',sum_value:700},
        		{day_id:'20170304',pay_type:'餐饮娱乐',sum_value:1100},
        		{day_id:'20170304',pay_type:'购物',sum_value:2300},
        		{day_id:'20170304',pay_type:'加油',sum_value:900},
        		{day_id:'20170304',pay_type:'其他',sum_value:700},
        		{day_id:'20170305',pay_type:'餐饮娱乐',sum_value:1100},
        		{day_id:'20170305',pay_type:'购物',sum_value:2300},
        		{day_id:'20170305',pay_type:'加油',sum_value:900},
        		{day_id:'20170305',pay_type:'其他',sum_value:700},
        		{day_id:'20170306',pay_type:'餐饮娱乐',sum_value:1100},
        		{day_id:'20170306',pay_type:'购物',sum_value:2300},
        		{day_id:'20170306',pay_type:'加油',sum_value:900},
        		{day_id:'20170306',pay_type:'其他',sum_value:700},
        		{day_id:'20170307',pay_type:'餐饮娱乐',sum_value:1100},
        		{day_id:'20170307',pay_type:'购物',sum_value:2300},
        		{day_id:'20170307',pay_type:'加油',sum_value:900},
        		{day_id:'20170307',pay_type:'其他',sum_value:700}
        	];*/
           	if(data!=null&&data!=''&&data.length>0){
           		var cData=[],gData=[],jData=[],qData=[];
           		var tempDate='',axisData=[];
           		for(var i in data){
           			if(tempDate!=data[i].day_id){
           				tempDate=data[i].day_id;
           				axisData.push(data[i].day_id);
           			}
           			if(data[i].pay_type=='餐饮娱乐'){
           				cData.push(data[i].sum_value);
           			}
           			if(data[i].pay_type=='购物'){
           				gData.push(data[i].sum_value);
           			}
           			if(data[i].pay_type=='加油'){
           				jData.push(data[i].sum_value);
           			}
           			if(data[i].pay_type=='其他'){
           				qData.push(data[i].sum_value);
           			}
           		}
				if(userInfoOption!=null){					
					userInfo.setOption({
						xAxis: [{data: axisData}],
						series: [{data: cData},{data: gData},{data: jData},{data: qData}]
					});
					return true;
				}
				userInfoOption = {
					animationDelay: function (idx) {
						// 越往后的数据延迟越大
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						// 越往后的数据延迟越大
						return idx * 100;
					},
				    title: {
				    	show: false,
				        text: '最近七天用户数'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    grid: {
				        top: 24,
				        bottom: 24,
				        left: 32,
				        right: 16,
				        containLabel: true
				    },
				    legend: {
				        show:true,
				        top:'top',
				        left:'center',
				        data: ['餐饮娱乐','购物','加油','其他'],
				        textStyle: {
				            color: '#FCFCFC'
				        }
				    },
					xAxis : [
				        {
				            type : 'category',
							splitLine: {show: false},
							axisTick: {show: false},
							axisLine: {
							    show: true,
							    lineStyle: {
							        color: '#2aa5c7'
							    }
							},
							axisLabel: {
							    show: true,
							    textStyle: {
							        color: '#FCFCFC'
							    }
							},
				            data : axisData
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
							splitLine: {show: false},
							axisTick: {show: false},
							axisLine: {
							    show: true,
							    lineStyle: {
							        color: '#2aa5c7'
							    }
							},
							axisLabel: {
							    show: true,
							    textStyle: {
							        color: '#6ed0f5'
							    }
							}
				        }
				    ],
				    series : [
				        {
				            name:'餐饮娱乐',
				            type:'bar',
				            label: {
								normal: {
									show: false,
									position: 'top',
									formatter: '{c}',
				    			    textStyle: {
				    			        color: '#2aa5c7'
				    			    }
								}
							},
							itemStyle: {
								normal: {
									color: '#3e81d2',
									barBorderRadius: 6,
									opacity: 1
								},
								emphasis: {
								    opacity: 0.5
								}
							},
				            data:cData
				        },{
				            name:'购物',
				            type:'bar',
				            label: {
								normal: {
									show: false,
									position: 'top',
									formatter: '{c}',
				    			    textStyle: {
				    			        color: '#2aa5c7'
				    			    }
								}
							},
							itemStyle: {
								normal: {
									color: '#51b1e3',
									barBorderRadius: 6,
									opacity: 1
								},
								emphasis: {
								    opacity: 0.5
								}
							},
				            data:gData
				        },{
				            name:'加油',
				            type:'bar',
				            label: {
								normal: {
									show: false,
									position: 'top',
									formatter: '{c}',
				    			    textStyle: {
				    			        color: '#2aa5c7'
				    			    }
								}
							},
							itemStyle: {
								normal: {
									color: '#18509a',
									barBorderRadius: 6,
									opacity: 1
								},
								emphasis: {
								    opacity: 0.5
								}
							},
							data:jData
				        },{
				            name:'其他',
				            type:'bar',
				            label: {
								normal: {
									show: false,
									position: 'top',
									formatter: '{c}',
				    			    textStyle: {
				    			        color: '#2aa5c7'
				    			    }
								}
							},
							itemStyle: {
								normal: {
									color: '#167797',
									barBorderRadius: 6,
									opacity: 1
								},
								emphasis: {
								    opacity: 0.5
								}
							},
				            data:qData
				        }
				    ]
				};
				userInfo.setOption(userInfoOption);
				$("#userInfo").addClass("animated slideInUp");
           	}else{
           		userInfo=null,userInfoOption=null;
				$("#userInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
		 	}
        },
        error : function(result){userInfo=null,userInfoOption=null;console.log("用户信息查询错误！");}
	});
}
//翼支付金额信息
function loadWingpayInfo(){
	if(wingpayInfo==null){
		wingpayInfo=echarts.init(document.getElementById('wingpayInfo'));
	}
	$("#wingpayInfo").removeClass("animated slideInDown");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":localName=='格尔木市'?'格尔木本地网':localName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	/*
        	data=[
				{pay_type:"餐饮娱乐",sum_value:150},
				{pay_type:"购物",sum_value:300},
				{pay_type:"加油",sum_value:400},
				{pay_type:"其他",sum_value:250}
			];*/
           	if(data!=null&&data!=''&&data.length>0){
           		var cData=[],gData=[],jData=[],qData=[];
           		var testOther={value: 40,name: 'other',itemStyle: {normal: {borderWidth: 0}}};
           		for(var i in data){
           			testOther.value=Math.floor(data[i].sum_value*0.2);
           			if(data[i].pay_type=='餐饮娱乐'){
           				cData.push({value: data[i].sum_value,name: '餐饮娱乐'});           				
						cData.push(testOther);
           			}
           			if(data[i].pay_type=='购物'){           				
           				gData.push({value: 75,name: '购物'});
						gData.push(testOther);
           			}
           			if(data[i].pay_type=='加油'){           				
           				jData.push({value: 75,name: '加油'});
						jData.push(testOther);
           			}
           			if(data[i].pay_type=='其他'){           				
           				qData.push({value: 75,name: '其他'});
						qData.push(testOther);
           			}
           		}
				if(wingpayInfoOption!=null){					
					wingpayInfo.setOption({
						series: [{data: cData},{data: gData},{data: jData},{data: qData}]
					});
					return true;
				}
				wingpayInfoOption = {
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
				        name: '餐饮娱乐',
				        type: 'pie',
				        center: ['12%','45%'],
				        radius: ['50%','52%'],
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
				                    if(param.name=='餐饮娱乐'){
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
				        name: '购物',
				        type: 'pie',
				        center: ['37%','45%'],
				        radius: ['50%','52%'],
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
				                    if(param.name=='购物'){
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
				        name: '加油',
				        type: 'pie',
				        center: ['62%','45%'],
				        radius: ['50%','52%'],
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
				                    if(param.name=='加油'){
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
				        name: '其他',
				        type: 'pie',
				        center: ['87%','45%'],
				        radius: ['50%','52%'],
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
				                    if(param.name=='其他'){
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
				wingpayInfo.setOption(wingpayInfoOption);
		    	$("#wingpayInfo").addClass("animated slideInDown");
           	}else{
           		wingpayInfo=null,wingpayInfoOption=null;
				$("#wingpayInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
		 	}
        },
        error : function(result){wingpayInfo=null,wingpayInfoOption=null;console.log("地图附加信息查询错误！");}
	});
}
//清除页面所有定时器
function clearTimer(){
	if(saleTimer!=null){clearInterval(saleTimer);}
}
function loadOtherModule(){
	loadSaleVal();
	loadUserInfo();
	loadWingpayInfo();
}
//页面函数加载
loadEcharts({
	chinaMap: false,
	qhMap: true,
	mapExtend: true,
	pageFunc: function(){
		loadMapInfo();
		loadSaleVal();
		loadUserInfo();
		loadWingpayInfo();
		saleTimer=setInterval(loadSaleVal,5000);
	}
});