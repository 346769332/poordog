/* 文件：festival_11.11.js
 * 作者：Lyndon
 * 功能描述：festival_11.11.jsp的各个模块加载函数
 */
//变量定义
var currentLocalNet="";//本地网
var softInfo=null,softInfoOption;//出行/购物软件TOP
var mapInfo=null,mapInfoOption;//地图
var travelInfo=null,travelInfoOption;//出行方式信息
var userInfo=null,userInfoOption;//用户分布
var appInfo=null,appInfoOption;//APP应用分类信息
var hotWordInfo=null,hotWordInfoOption;//热词
var loadFlag=true;
function refresh(){
	
}
//出行/购物软件TOP
function loadSoftInfo(){
    softInfo = echarts.init(document.getElementById('softInfo'));
    if(loadFlag){
    	softInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/goods_soft.do",
        data : {"latn_id":currentLocalNet},
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
        	data=[
				{name:'GIF助手',val:1500},
				{name:'唯品会',val:1520},
				{name:'高德地图',val:2000},
				{name:'百度地图',val:5200},
				{name:'电信营业厅',val:4000},
				{name:'美图秀秀',val:3100},
				{name:'京东',val:3500},
				{name:'彩铃多多',val:2500},
				{name:'猫眼电影',val:2000},
				{name:'美团团购',val:4500}
			];
           	if(data!=null&&data!=''&&data.length>0){
           		var yAxisData=[];
           		var softData=[];
           		for(var i in data){
           			yAxisData.push(data[i].name);
           			softData.push(data[i].val);
           		}
           		softInfoOption={
			        tooltip : {
			            trigger: 'axis'
			        },
			        color:['#ffc600'],
			        calculable : false,
			        grid:{x:72,y:0,x2:8,y2:8,borderWidth:'0'},
					xAxis:[{
						type : 'value',
						show : false,
						boundaryGap : [0, 0.01]
					}],
			        yAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category',
						axisLabel : {
			                   textStyle : {
			                   color : '#fdcc65'
			                   }
						},
						axisLine:{
							lineStyle : {
								color : '#df80a0',
								width:1
							}						
						},
						data : yAxisData
					}],
			        series : [{
						name:'应用次数',
						type:'bar',
						barWidth : 16,
						itemStyle:{
							normal:{
								barBorderRadius:[0,8,8,0],
								label: {
									show: true,
									textStyle : {color : '#df80a0'},
									position: 'right'
								}
							}
						},
						data:softData
					}]
			    };
				softInfo.hideLoading();
				softInfo.setOption(softInfoOption);
           	}else{
				softInfo.hideLoading();
            	softInfo = null;
               	$("#softInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			softInfo.hideLoading();
        }
	});
}
//地图加载
function loadMapInfo(){
    mapInfo = echarts.init(document.getElementById('mapInfo'));
    if(loadFlag){
    	mapInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/goods_map.do",
        data : {"latn_id":currentLocalNet},
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
				var mapData=[];
                var titleText,maxValue;/*
                titleText=data[0].module_name;
                maxValue=data[0].count_num;
                for(var i=0; i < data.length; i++){
                    mapData.push({name:(data[i].latn_name=="格尔木本地网"?"格尔木市":data[i].latn_name),selected:false,value:data[i].count_num});
                }*/
                titleText="青海省";
                maxValue=1000;
                mapData=[
					{name:"海北藏族自治州",selected:false,value:550},
					{name:"西宁市",selected:false,value:950},
					{name:"海东地区",selected:false,value:50},
					{name:"黄南藏族自治州",selected:false,value:250},
					{name:"海南藏族自治州",selected:false,value:150},
					{name:"果洛藏族自治州",selected:false,value:450},
					{name:"玉树藏族自治州",selected:false,value:750},
					{name:"海西蒙古族藏族自治州",selected:false,value:290},
					{name:"格尔木市",selected:false,value:750}
                ];
                mapInfoOption = {
					title: {
                         text : titleText,
                         show : false,
                         textStyle : {
							fontSize:14,
                            color : 'orangered',
                            fontFamily : '微软雅黑',
                            fontWeight : 500
                         }
					},
                    tooltip : {
						trigger: 'item',
						formatter: '点击显示{b}数据'
					},
					legend: {
						orient: 'vertical', // 'vertical'
                        x: 'right', // 'center' | 'left' | {number},
                        show: false,
                        data:[
							{
     						    name:'返回全省',
     						    icon : 'image://system/page/resource/images/back.jpg',
     						    textStyle:{fontWeight:500,fontSize:14,color:'#64ff48'}
     						}
                         ]
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
                                emphasis:{label:{show:false}}
                            },
                            selectedMode : 'single',
                            mapLocation:{width:'98%'},
                            data:mapData
                        }
					]
                };
                mapInfo.on(ecConfig.EVENT.MAP_SELECTED,function(param){
					var target=param.target;
                	if(target!=null&&target!=''&&currentLocalNet==""){
                		currentLocalNet=localNetCode[target];
                		mapInfoOption.legend.show=true;
                		//mapInfoOption.dataRange.show=false;
				        mapInfoOption.series[0] = {
							name: '本地网',
				            type: 'map',
				            mapType: target,
							tooltip: {show: false},
				            itemStyle: {
				                normal: { 
				                		label: { show: true},
			                		 	areaStyle:{color:'#FFDEAD'}
				                },
				                emphasis: { label: { show: true} }
				            },
	                        mapLocation:{width:'98%'},
				            roam: false,
				            data :[]
				       	};
		                mapInfo.setOption(mapInfoOption,true);
						refresh();
                	}
                });
				mapInfo.on(ecConfig.EVENT.LEGEND_SELECTED,function(param){
                 	window.location.reload();
                });
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
//出行方式信息
function loadTravelInfo(){
    travelInfo = echarts.init(document.getElementById('travelInfo'));
    if(loadFlag){
    	travelInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/goods_travel.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		travelInfoOption={
					title: {
						text : "出行方式",
						x:'center',
						y:'top',
						textStyle : {
							color : '#fff3cf',
							fontFamily : '微软雅黑',
							fontSize : 16
						}
					},
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				    	textStyle:{color:'#df80a0'},
						x:'left',
						y:'top',
				        data:['飞机','火车']
				    },
					color:['#6eb5e5','#f86b4f'],
			        grid:{x:32,y:64,x2:32,y2:32,borderWidth:'0'},
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
							axisLabel : {
				                   textStyle : {
				                   color : '#df80a0'
				                   }
							},
							splitLine:{show:false},
							splitArea:{show:false},
				            boundaryGap : false,						
				          	axisLine:{
				            	lineStyle:{
				                  color: '#df80a0',
				                  width: 1,
				                  type: 'solid'
				              }
				            },
				            data : ['20160816','20160817','20160818','20160819','20160820','20160821','20160822']
				        }
				    ],
				    yAxis : [
				        {
				        	name : '单位:万',
				            type : 'value',
							axisLabel : {
				                   textStyle : {
				                   color : '#df80a0'
				                   }
							},
							splitLine:{show:false},
							splitArea:{show:false},
				          	axisLine:{
				            	lineStyle:{
				                  color: '#df80a0',
				                  width: 1,
				                  type: 'solid'
				              }
				            }
				        }
				    ],
				    series : [
				        {
				            name:'飞机',   
				          	smooth: false,
				            symbol: 'emptyRectangle',
				            symbolSize: 3,
				            type:'line',
				            data:[24,30,50,25,27,10,15]
				        },{
				            name:'火车',   
				          	smooth: false,
				            symbol: 'emptyRectangle',
				            symbolSize: 3,
				            type:'line',
				            data:[15,13,20,150,120,10,40]
				        }
				    ]
				};
				travelInfo.hideLoading();
				travelInfo.setOption(travelInfoOption);
			}else{
				travelInfo.hideLoading();
            	travelInfo = null;
               	$("#travelInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			travelInfo.hideLoading();
        }
	});
}
//用户分布信息
function loadUserInfo(){
	userInfo = echarts.init(document.getElementById('userInfo'));
    if(loadFlag){
    	userInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/goods_user.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[
				{name:'出门远行',val:2500},
				{name:'走亲访友',val:1520},
				{name:'远道而来',val:520},
				{name:'深居简出',val:1200}
			];
           	if(data!=null&&data!=''&&data.length>0){
           		var yAxisData=[];
           		var userData=[];
           		for(var i in data){
           			yAxisData.push(data[i].name);
           			userData.push(data[i].val);
           		}
           		userInfoOption={
					title: {
						text : "用户分布",
						x:'center',
						y:'top',
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
			        grid:{x:64,y:64,x2:8,y2:32,borderWidth:'0'},
					xAxis:[{
						type : 'value',
						splitArea:{show:false},
						axisLine:{show:false},
						axisLabel : {
			            	textStyle : {
			                   color : '#df80a0'
			            	}
						},
			        	splitLine:{
							lineStyle : {
								color : '#854175',
								width:1
							}
						},
						boundaryGap : [0, 0.01]
					}],
			        yAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category',
						axisLabel : {
			            	textStyle : {
			                   color : '#fdcc65'
							}
						},
						axisLine:{
							lineStyle : {
								color : '#df80a0',
								width:1
							}						
						},
						data : yAxisData
					}],
			        series : [{
						name:'应用次数',
						type:'bar',
						barWidth : 16,
						itemStyle:{
							normal:{
								barBorderRadius:8,
								label: {
									show: true,
									textStyle : {color : '#df80a0'},
									position: 'right'
								}
							}
						},
						data:userData
					}]
			    };
				userInfo.hideLoading();
			    userInfo.setOption(userInfoOption);
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
//APP应用分类
function loadAppInfo(){
	appInfo = echarts.init(document.getElementById('appInfo'));
    if(loadFlag){
    	appInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/goods_app.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		appInfoOption=
				appInfo.hideLoading();
			    appInfo.setOption(appInfoOption);
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
//热词
function loadHotWordInfo(){
	hotWordInfo = echarts.init(document.getElementById('hotWordInfo'));
    if(loadFlag){
    	hotWordInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/goods_hotWord.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
			//测试数据
			data=[0,1,2];
        	if(data!=null&&data!=''&&data.length>0){        		
        		hotWordInfoOption={
					color:['#c4584e','#ffca00','#1ad5de'],
				    title: {
				      	show:false,
				        text:'热词',
				    },
				    tooltip : {
				        show: true,
				        formatter: "类型：{a}<br/>数量：{c}<br/>占比：{d}%"
				    },
				    legend: {
      					textStyle:{color: '#f6c9d9'},
      					orient : 'vertical',
				        x:'left',
				        y:'5%',
				        itemGap:12,
				        data:['服装','食品','其他']
				    },
				    series : [
                    	{
							name:'服装',
							type:'pie',
							radius : ['40%','55%'],
							center : ['50%','50%'],
							itemStyle : {normal:{label:{show:false},labelLine: {show:false}}},
							data:[
								{
									value:20,
									itemStyle:{
										normal:{
											color:"#ffca00"
										}
									},
									name:'服装'
								},{
									value:80,
									name:'invisible',
									tooltip : {show:false},
									itemStyle:{
										normal:{
											color:'rgba(255,202,0,0.1)',
											label:{show:false},
											labelLine:{show:false}
										},
										emphasis:{
											color:'rgba(255,202,0,0.2)'
										}
									}
								}
							]
						},{
							name:'食品',
							type:'pie',
					        //clockWise:false,
							radius : ['60%','75%'],
							center : ['50%','50%'],
							itemStyle : {normal:{label:{show:false},labelLine: {show:false}}},
							data:[
								{
									value:30,
									itemStyle:{
										normal:{
											color:"#1ad5de"
										}
									},
									name:'食品'
								},{
									value:70,
									tooltip : {show:false},
									name:'invisible',
									itemStyle:{
	                                  	normal:{
						        		  	color:'rgba(26,213,222,0.1)',
	                                      	label:{show:false},
	                                      	labelLine:{show:false}
	                                  	},
	                                  	emphasis:{
	                                      	color:'rgba(26,213,222,0.2)'
	                                  	}
                              		}
								}
							]
						},{
							name:'其他',
							type:'pie',
					        //clockWise:false,
							radius : ['80%','95%'],
							center : ['50%','50%'],
							itemStyle : {normal:{label:{show:false},labelLine: {show:false}}},
							data:[
								{
									value:50,
									itemStyle:{
										normal:{
											color:"#c4584e"
										}
									},
									name:'其他'
								},{
									value:50,
									tooltip : {show:false},
									name:'invisible',
									itemStyle:{
	                                  	normal:{
						        		  	color:'rgba(196,88,78,0.1)',
	                                      	label:{show:false},
	                                      	labelLine:{show:false}
	                                  	},
	                                  	emphasis:{
						        		  	color:'rgba(196,88,78,0.2)'
	                                  	}
                              		}
								}
							]
						}
                    ]
				};
           		hotWordInfo.hideLoading();
			    hotWordInfo.setOption(hotWordInfoOption);
			}else{
				hotWordInfo.hideLoading();
            	hotWordInfo = null;
               	$("#hotWordInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			hotWordInfo.hideLoading();
        }
	});
}