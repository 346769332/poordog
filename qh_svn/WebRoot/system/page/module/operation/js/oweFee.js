/* 文件：oweFee.js
 * 作者：Lyndon
 * 功能描述：oweFee.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption;//地图
var trendInfo=null,trendInfoOption;//欠费趋势
var formInfo=null,formInfoOption;//欠费构成
var loadFlag=true;
var currentType='',mapTarget='';
function refresh(){
	var pm=getMapParam(currentType,mapTarget);
	loadTrendInfo(pm);
	loadFormInfo(pm);
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
						borderColor: 'rgba(0,0,0,1)',
						borderWidth: 0.5,
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
//欠费趋势
function loadTrendInfo(param){
	trendInfo = echarts.init(document.getElementById('trendInfo'));
    if(loadFlag){
    	trendInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "oweFee/trend.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
           	if(data!=null&&data.length>0){
           		var axisData=[],seriesData=[];
           		for(var i in data){
           			axisData.push(data[i].day_id);
           			seriesData.push(data[i].owe_charge);
           		}
           		trendInfoOption={
				    color:['#fec601','#6eb5e6','#f76c4f'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:48,y:64,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				    	show:false,
				      	textStyle:{color: '#000000'},
				        data:['欠费金额']
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
						name : '单位:元',
						nameTextStyle : {color : '#000000'},
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
				            name:'欠费金额',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:seriesData
				        }
				    ]
				};
				trendInfo.hideLoading();
				trendInfo.setOption(trendInfoOption);
           	}else{
				trendInfo.hideLoading();
            	trendInfo = null;
               	$("#trendInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			trendInfo.hideLoading();
        }
	});
}
//欠费构成
function loadFormInfo(param){
	formInfo = echarts.init(document.getElementById('formInfo'));
    if(loadFlag){
    	formInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "oweFee/form.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
           	if(data!=null&&data.length>0){
           		var legendData=[],seriesData=[];
           		for(var i in data){
           			legendData.push(data[i].owe_type);
           			seriesData.push({name:data[i].owe_type,value:data[i].owe_charge});
           		}
           		formInfoOption={					
				    color:['#db5f55','#ffc600','#27d8e0','#da70d5','#ff69b3','#61a0a9','#ba56d4','#c43531'],
				    title : {
				      	show:false,
				        text: '欠费构成'
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
				    calculable : false,
				    series : [
				        {
				            name:'app应用',
				            type:'pie',
				            radius : ['60%','85%'],
				            center : ['55%','50%'],
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
				formInfo.hideLoading();
			    formInfo.setOption(formInfoOption);
			}else{
				formInfo.hideLoading();
            	formInfo = null;
               	$("#formInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			formInfo.hideLoading();
        }
	});
}