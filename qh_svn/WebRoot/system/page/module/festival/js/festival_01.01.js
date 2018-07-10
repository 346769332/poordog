/* 文件：festival_01.01.js
 * 作者：Lyndon
 * 功能描述：festival_01.01.jsp的各个模块加载函数
 */
//变量定义
var currentLocalNet="";//本地网
var userActiveInfo=null,userActiveInfoOption;//用户活跃TOP
var tollCallInfo=null,tollCallInfoOption;//长途业务话务量
var cdmaCallInfo=null,cdmaCallInfoOption;//CDMA话务量
var messageInfo=null,messageInfoOption;//短信量
var socialInfo=null,socialInfoOption;//社交信息
var averageInfo=null,averageInfoOption;//户均业务信息
var loadFlag=true;
function refresh(){
	
}
//用户活跃TOP
function loadUserActiveInfo(){
    userActiveInfo = echarts.init(document.getElementById('userActiveInfo'));
    if(loadFlag){
    	userActiveInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/user.do",
        data : {"latn_id":currentLocalNet},
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
        	data=[
        		{name:"京东",val:2000},
        		{name:"天猫",val:1500},
        		{name:"唯品会",val:1900},
        		{name:"聚美优",val:1100},
        		{name:"手机淘宝",val:100},
        		{name:"苏宁易购",val:1600},
        		{name:"国美",val:500},
        		{name:"拍拍",val:1800},
        		{name:"美团",val:200},
        		{name:"猫眼电影",val:400}
        	];
           	if(data!=null&&data!=''&&data.length>0){
           		var userActiveData=[];
           		var yAxisData=[];
           		for(var i in data){
           			yAxisData.push(data[i].name);
           			userActiveData.push(data[i].val);
           		}           		
           		userActiveInfoOption={
				    color:['#e96453','#feff01','#2fce34','#f86b4f'],
			        tooltip : {
			            trigger: 'axis'
			        },
			        calculable : false,
			        grid:{x:64,y:0,x2:30,y2:5,borderWidth:'0'},
					xAxis:[{
						type : 'value',
						show : false,
						boundaryGap : [0, 0.01]
					}],
			        yAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category' ,
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
						name:'活跃数',
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
						data:userActiveData
					}]
			    };
				userActiveInfo.hideLoading();
				userActiveInfo.setOption(userActiveInfoOption);
           	}else{
				userActiveInfo.hideLoading();
            	userActiveInfo = null;
               	$("#userActiveInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			userActiveInfo.hideLoading();
        }
	});
}
//长途话务量信息
function loadTollCallInfo(){
    tollCallInfo = echarts.init(document.getElementById('tollCallInfo'));
    if(loadFlag){
    	tollCallInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/call.do",
        data : {"latn_id":currentLocalNet},
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		var xAxisData=[];
           		var tollData=[];
           		xAxisData=['2015年春节','2016年春节','2015年日常'];
           		tollData=[1000,2500,100];
           		tollCallInfoOption={
				    color:['#6eb5e5','#feff01','#2fce34','#f86b4f'],
			        tooltip : {
			            trigger: 'axis'
			        },
			        calculable : false,
			        grid:{x:16,y:0,x2:16,y2:32,borderWidth:'0'},
			        xAxis:[{
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
						data : xAxisData
					}],
					yAxis:[{
						type : 'value',
						splitArea:{show:false},
			        	splitLine:{
							lineStyle : {
								color : '#854175',
								width:1
							}
						},
						axisLine:{show:false},
						axisLabel:{show:false},
						boundaryGap : [0, 0.01]
					}],
			        series : [{
						name:'长途话务量',
						type:'bar',
						barWidth : 16,
						itemStyle:{
							normal:{
								barBorderRadius:[8,8,0,0],
								label: {
									show: true,
									textStyle : {color : '#df80a0'},
									position: 'top'
								}
							}
						},
						data:tollData
					}]
			    };
				tollCallInfo.hideLoading();
				tollCallInfo.setOption(tollCallInfoOption);
        	}else{
				tollCallInfo.hideLoading();
            	tollCallInfo = null;
               	$("#tollCallInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			tollCallInfo.hideLoading();
        }
	});
}
//CDMA话务量信息
function loadCdmaCallInfo(){
    cdmaCallInfo = echarts.init(document.getElementById('cdmaCallInfo'));
    if(loadFlag){
    	cdmaCallInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/call.do",
        data : {"latn_id":currentLocalNet},
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		var xAxisData=[];
           		var cdmaData=[];
           		xAxisData=['2015年春节','2016年春节','2015年日常'];
           		cdmaData=[3000,4500,200];
           		cdmaCallInfoOption={
				    color:['#f86b4f','#feff01','#2fce34','#f86b4f'],
			        tooltip : {
			            trigger: 'axis'
			        },
			        calculable : false,
			        grid:{x:16,y:0,x2:16,y2:32,borderWidth:'0'},
			        xAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category' ,
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
						data : xAxisData
					}],
					yAxis:[{
						type : 'value',
						splitArea:{show:false},
			        	splitLine:{
							lineStyle : {
								color : '#854175',
								width:1
							}
						},
						axisLine:{show:false},
						axisLabel:{show:false},
						boundaryGap : [0, 0.01]
					}],
			        series : [{
						name:'CDMA话务量',
						type:'bar',
						barWidth : 16,
						itemStyle:{
							normal:{
								barBorderRadius:[8,8,0,0],
								label: {
									show: true,
									textStyle : {color : '#df80a0'},
									position: 'top'
								}
							}
						},
						data:cdmaData
					}]
			    };
				cdmaCallInfo.hideLoading();
				cdmaCallInfo.setOption(cdmaCallInfoOption);
        	}else{
				cdmaCallInfo.hideLoading();
            	cdmaCallInfo = null;
               	$("#cdmaCallInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			cdmaCallInfo.hideLoading();
        }
	});
}
//短信量
function loadMessageInfo(){
    messageInfo = echarts.init(document.getElementById('messageInfo'));
    if(loadFlag){
    	messageInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/message.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		messageInfoOption={
				    color:['#6eb5e5','#6eb5e6'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:32,y:32,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				    	show:false,
				      	textStyle:{color: '#f6c9d9'},
				        data:['短信量']
				    },
				    xAxis : [{
						type : 'category',
						splitArea:{show:false},
			        	splitLine:{
							lineStyle : {
								color : '#854175',
								width:1
							}
						},
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
						data : ['2015年春节','2016年春节','2015年日常']
					}],
				    yAxis : [{
						type : 'value',
						name : '单位:条',
						splitArea:{show:false},
			        	splitLine:{
							lineStyle : {
								color : '#854175',
								width:1
							}
						},
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
				            name:'短信量',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[250, 320, 150]
				        }
				    ]
				};
				messageInfo.hideLoading();
				messageInfo.setOption(messageInfoOption);
			}else{
				messageInfo.hideLoading();
            	messageInfo = null;
               	$("#messageInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			messageInfo.hideLoading();
        }
	});
}
//互联互通
function loadContactInfo(){
	contactInfo = echarts.init(document.getElementById('contactInfo'));
    if(loadFlag){
    	contactInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/contact.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		var legendData=[];
           		var contactData=[];
           		for(var i in data){
           			legendData.push(data[i].name);
           			contactData.push({name:data[i].name,value:data[i].val});
           		}
           		contactInfoOption={
				    color:['#6eb5e5','#feff01','#2fce34','#f86b4f'],
			        tooltip : {
			            trigger: 'axis'
			        },
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:['电信-移动','电信-联通']
				    },
			        calculable : false,
			        grid:{x:16,y:64,x2:16,y2:32,borderWidth:'0'},
			        xAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category' ,
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
						},
						data : ['2015年春节','2016年春节','2015年日常']
					}],
					yAxis:[{
						type : 'value',
						show : false,
						boundaryGap : [0, 0.01]
					}],
			        series : [
			        	{
							name:'电信-移动',
							type:'bar',
							barWidth : 16,
							itemStyle:{
								normal:{
									barBorderRadius:[8,8,0,0],
									label: {
										show: true,
										textStyle : {color : '#f6c9d9'},
										position: 'top'
									}
								}
							},
							data:[2500,2800,1000]
						},{
							name:'电信-联通',
							type:'bar',
							barWidth : 16,
							itemStyle:{
								normal:{
									barBorderRadius:[8,8,0,0],
									label: {
										show: true,
										textStyle : {color : '#f6c9d9'},
										position: 'top'
									}
								}
							},
							data:[2100,2900,1100]
						}
					]
			    };
				contactInfo.hideLoading();
			    contactInfo.setOption(contactInfoOption);
			}else{
				contactInfo.hideLoading();
            	contactInfo = null;
               	$("#contactInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			contactInfo.hideLoading();
        }
	});
}
//社交信息
function loadSocialInfo(){
	socialInfo = echarts.init(document.getElementById('socialInfo'));
    if(loadFlag){
    	socialInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/social.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[
	        	{name:'微信',val:38},
	        	{name:'腾讯QQ',val:36},
	        	{name:'AppStore',val:30},
	        	{name:'爱拍',val:24},
	        	{name:'喜马拉雅',val:20},
	        	{name:'酷我音乐',val:18},
	        	{name:'gif助手',val:15},
	        	{name:'美图',val:10}
        	];
           	if(data!=null&&data!=''&&data.length>0){
           		var legendData=[];
           		var socialData=[];
           		for(var i in data){
           			legendData.push(data[i].name);
           			socialData.push({name:data[i].name,value:data[i].val});
           		}
           		socialInfoOption={
				    color:['#bda29b','#ca8623','#749f83','#6eb5e6','#d38265','#61a0a9','#2f4554','#c33531'],
				    title : {
				      	show:false,
				        text: '南丁格尔玫瑰图',
				        subtext: '纯属虚构'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        x : 'left',
				        y : 'top',
				        orient:'vertical',
				      	textStyle:{color: '#f6c9d9'},
				        data:legendData
				    },
				    calculable : false,
				    series : [
				        {
				            name:'app应用',
				            type:'pie',
				            radius : ['30%','95%'],
				            center : ['55%','50%'],
				            roseType : 'radius',
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
				            data:socialData
				        }
				    ]
				};
				socialInfo.hideLoading();
			    socialInfo.setOption(socialInfoOption);
			}else{
				socialInfo.hideLoading();
            	socialInfo = null;
               	$("#socialInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			socialInfo.hideLoading();
        }
	});
}
//户均业务信息
function loadAverageInfo(){
	averageInfo = echarts.init(document.getElementById('averageInfo'));
    if(loadFlag){
    	averageInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/average.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[
				{name:"海北",val:2000},
				{name:"西宁",val:1500},
				{name:"海东",val:1100},
				{name:"黄南",val:500},
				{name:"海南",val:1900},
				{name:"果洛",val:400},
				{name:"玉树",val:1800},
				{name:"海西",val:300},
				{name:"格尔木",val:700}
        	];
        	if(data!=null&&data!=''&&data.length>0){
        		var yAxisData=[];
        		var averageData=[];
        		for(var i in data){
        			yAxisData.push(data[i].name);
        			averageData.push(data[i].val);
        		}
        		averageInfoOption={
				    color:['#e96453','#feff01','#2fce34','#f86b4f'],
			        tooltip : {
			            trigger: 'axis'
			        },
			        calculable : false,
			        grid:{x:64,y:0,x2:16,y2:32,borderWidth:'0'},
					xAxis:[{
						type : 'value',
						splitArea:{show:false},
						axisLine:{show:false},
			        	splitLine:{
							lineStyle : {
								color : '#854175',
								width:1
							}
						},
						axisLabel : {
							textStyle : {
								color : '#df80a0'
							}
						},
						boundaryGap : [0, 0.01]
					}],
			        yAxis:[{
			        	splitLine:{show:false},
						splitArea:{show:false},
						type : 'category' ,
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
						name:'户均量',
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
							}
						},
						data:averageData
					}]
			    };
           		averageInfo.hideLoading();
			    averageInfo.setOption(averageInfoOption);
			}else{
				averageInfo.hideLoading();
            	averageInfo = null;
               	$("#averageInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			averageInfo.hideLoading();
        }
	});
}