/* 文件：income.js
 * 作者：Lyndon
 * 功能描述：income.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption;//地图
var productInfo,productInfoOption;//产品收入分析
var accountInfo,accountInfoOption;//按账目类型分析
var contrastsInfo,contrastsInfoOption;//当月收入趋势与上月对比
var loadFlag=true;
var currentType='',mapTarget='';
function refresh(){	
	var pm=getMapParam(currentType,mapTarget);
	loadProductInfo(pm);
	loadAccountInfo(pm);
	loadContrastsInfo(pm);
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
//产品收入分析
function loadProductInfo(param){
	productInfo = echarts.init(document.getElementById('productInfo'));
    if(loadFlag){
    	productInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "income/product.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
		        var legendData=[],seriesData=[];
		        for(var i in data){
		        	legendData.push(data[i].product_type);
		        	seriesData.push({name:data[i].product_type,value:data[i].add_charge});
		        }
           		productInfoOption={					
				    color:['#db5f55','#ffc600','#27d8e0','#da70d5','#ff69b3','#61a0a9','#ba56d4','#c43531'],
				    title : {
				      	show:false,
				        text: '产品收入分析'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        x : 'left',
				        y : 'center',
				        orient:'vertical',
				      	textStyle:{color: '#000000'},
				        data:legendData
				    },
				    calculable : false,
				    series : [
				        {
				            name:'产品',
				            type:'pie',
				            radius : ['60%','85%'],
				            center : ['55%','50%'],
				            roseType : 'radius',
				            //width: '40%',// for funnel
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
				productInfo.hideLoading();
			    productInfo.setOption(productInfoOption);
			}else{
				productInfo.hideLoading();
            	productInfo = null;
               	$("#productInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			productInfo.hideLoading();
        }
	});
}
//按账目类型分析
function loadAccountInfo(param){
	accountInfo = echarts.init(document.getElementById('accountInfo'));
    if(loadFlag){
    	accountInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "income/account.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){           		
		        var axisData=[],seriesData=[];
		        for(var i in data){
		        	axisData.push(data[i].income_type);
		        	seriesData.push(data[i].add_charge);
		        }
           		accountInfoOption={
				    color:['#fed000','#1ad5de','#6eb5e5','#1ade57'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:16,y:48,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				    	show:false,
				      	textStyle:{color: '#000000'},
				        data:['账目类型']
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
				            name:'账目类型',
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
				            data:seriesData
				        }
				    ]
				};
				accountInfo.hideLoading();
			    accountInfo.setOption(accountInfoOption);
			}else{
				accountInfo.hideLoading();
            	accountInfo = null;
               	$("#accountInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			accountInfo.hideLoading();
        }
	});
}
//当月收入趋势与上月对比
function loadContrastsInfo(param){
	contrastsInfo = echarts.init(document.getElementById('contrastsInfo'));
    if(loadFlag){
    	contrastsInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "income/contrasts.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		var axisData=[],lastData=[],thisData=[];
           		for(var i in data){
           			axisData.push(data[i].day_id);
           			lastData.push(data[i].last_charge);
           			thisData.push(data[i].add_charge);
           		}
           		contrastsInfoOption={
				    color:['#fec601','#6eb5e6','#f76c4f'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:48,y:32,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#000000'},
				        data:['当月','上月']
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
				    yAxis : [{
						type : 'value',
						name : '单位:万元',
						nameTextStyle:{color:'#000000'},
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
						}
					}],
				    series : [
				        {
				            name:'当月',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:thisData
				        },{
				            name:'上月',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:lastData
				        }
				    ]
				};
				contrastsInfo.hideLoading();
				contrastsInfo.setOption(contrastsInfoOption);
           	}else{
				contrastsInfo.hideLoading();
            	contrastsInfo = null;
               	$("#contrastsInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			contrastsInfo.hideLoading();
        }
	});
}		