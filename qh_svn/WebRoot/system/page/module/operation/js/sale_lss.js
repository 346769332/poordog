/* 文件：saleDetails.js
 * 作者：Lyndon
 * 功能描述：saleDetails.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption;//地图
var dinnerSaleInfo,dinnerSaleInfoOption;//套餐销售
var saleValumeInfo,saleValumeInfoOption;//销量
var developUserInfo,developUserInfoOption;//4G用户发展
var loadFlag=true;
var currentType='',mapTarget='';
function refresh(){
	var pm=getMapParam(currentType,mapTarget);
	loadDinnerSaleInfo(pm);
	loadSaleValumeInfo(pm);
	loadDevelopUserInfo(pm);
}
//地图加载
function loadMapInfo(){
	mapInfo = echarts.init(document.getElementById('mapInfo'));
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
//套餐销售
function loadDinnerSaleInfo(param){
	dinnerSaleInfo = echarts.init(document.getElementById('dinnerSaleInfo'));
    if(loadFlag){
    	dinnerSaleInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "sale/dinner.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		var legendData=[],seriesData=[];
           		for(var i in data){
           			var tempType=getSuitLegend(data[i].sale_type,24);
           			legendData.push(tempType);
					seriesData.push({name:tempType,value:data[i].sale_value});
           		}
           		dinnerSaleInfoOption={					
				    color:['#ff7f50','#87cefa','#fed000','#da70d5','#32cd33','#6395ec','#ff69b3','#ba56d4','#cd5d5c','#42e0d1','#323c48'],
				    title : {
				      	show:false,
				        text: '套餐销售'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        x : 'left',
				        y : 'top',
				        orient:'vertical',
				      	textStyle:{color: '#000000'},
				        data:legendData
				    },
				    series : [
				        {
				            name:'app应用',
				            type:'pie',
				            radius : ['60%','85%'],
				            center : ['70%','55%'],
				            roseType : 'radius',
				            //width: '40%',       // for funnel
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
				            data:seriesData
				        }
				    ]
				};
				dinnerSaleInfo.hideLoading();
			    dinnerSaleInfo.setOption(dinnerSaleInfoOption);
			}else{
				dinnerSaleInfo.hideLoading();
            	dinnerSaleInfo = null;
               	$("#dinnerSaleInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			dinnerSaleInfo.hideLoading();
        }
	});
}
//销量
function loadSaleValumeInfo(param){
	saleValumeInfo = echarts.init(document.getElementById('saleValumeInfo'));
    if(loadFlag){
    	saleValumeInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "sale/valume.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var axisData=[],fzData=[],cjData=[];
           		for(var i in data){
           			axisData.push(data[i].product_type);
           			fzData.push(data[i].day_fz);
           			cjData.push(data[i].day_cj);
           		}
           		saleValumeInfoOption={
				    color:['#fed000','#1ad5de','#6eb5e5','#1ade57'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:16,y:32,x2:16,y2:32,borderWidth:'0'},
				    legend: {
				      	textStyle:{color: '#000000'},
				        data:['日发展量','日拆机量']
				    },
				    xAxis : [{
						type : 'category',
						splitLine:{show:false},
						splitArea:{show:false},
						axisTick:{
							lineStyle : {
								color : '#000000',
								width:1
							}						
						},
						axisLine:{
							lineStyle : {
								color : '#e3e3e3',
								width:1
							}						
						},
						axisLabel : {
							textStyle : {
								color : '#000000'
							}
						},
						data : axisData
					}],
				    yAxis : [
				        {
				            type : 'value',
							splitLine:{show:false},
							splitArea:{show:false},
						    axisLabel:{show:false},
						    axisLine:{show:false}
				        }
				    ],
				    series : [
				        {
				            name:'日发展量',
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
				            data:fzData
				        },{
				            name:'日拆机量',
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
				            data:cjData
				        }
				    ]
				};
				saleValumeInfo.hideLoading();
			    saleValumeInfo.setOption(saleValumeInfoOption);
			}else{
				saleValumeInfo.hideLoading();
            	saleValumeInfo = null;
               	$("#saleValumeInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			saleValumeInfo.hideLoading();
        }
	});
}
//4G用户发展
function loadDevelopUserInfo(param){
    developUserInfo = echarts.init(document.getElementById('developUserInfo'));
    if(loadFlag){
    	developUserInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "sale/develop.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		var axisData=[],dayData=[],lastDayData=[];
           		for(var i in data){
           			axisData.push(data[i].region_name);
           			dayData.push(data[i].day_value);
           			lastDayData.push(data[i].last_day_value);
           		}
           		developUserInfoOption={
				    color:['#fed000','#1ad5de'],
				    tooltip : {
				        trigger: 'axis',
				      	formatter:function (params){
				          	var returnStr="";
				          	returnStr+=params[0].name+"<br/>";
				          	returnStr+=params[0].seriesName+":"+Math.abs(params[0].value)+"<br/>";
				          	returnStr+=params[1].seriesName+":"+Math.abs(params[1].value);
				        	return returnStr;
				        },
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				      	textStyle:{color: '#000000'},
				        data:['今日','昨日']
				    },
				    grid:{x:64,y:32,x2:16,y2:32,borderWidth:'0'},
				    xAxis : [{
						type : 'value',
						axisLabel : {
							formatter:function (value){
								return Math.abs(value);
							},
							textStyle : {
								color : '#000000'
							}
						},
						axisTick:{
							lineStyle : {
								color : '#000000',
								width:1
							}						
						},
						axisLine:{
							lineStyle : {
								color : '#e3e3e3',
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
								color : '#e3e3e3',
								width:1
							}						
						},
						axisLabel : {
							textStyle : {
								color : '#000000'
							}
						},
						data : axisData
					}],
				    series : [
				        {
				            name:'今日',
				            type:'bar',
				            stack: '总量',
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
				            data:dayData
				        },{
				            name:'昨日',
				            type:'bar',
				            stack: '总量',
				            itemStyle: {
				            	normal: {
				              		barBorderRadius:[8,0,0,8],
				                	label : {
										show: true,
										formatter:function(params){
											return Math.abs(params.value);
					                  	},
										position: 'left'
									}
				            	},
								emphasis:{
									color: 'transparent',
									label: {show: true}
								}
				            },
				            data:lastDayData
				        }
				    ]
				};
				developUserInfo.hideLoading();
				developUserInfo.setOption(developUserInfoOption);
           	}else{
				developUserInfo.hideLoading();
            	developUserInfo = null;
               	$("#developUserInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			developUserInfo.hideLoading();
        }
	});
}