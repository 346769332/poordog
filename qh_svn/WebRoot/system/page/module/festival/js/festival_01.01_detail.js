/* 文件：festival_01.01_detail.js
 * 作者：Lyndon
 * 功能描述：festival_01.01_detail.jsp的各个模块加载函数
 */
//变量定义
var currentLocalNet="";//本地网
var flowInfo=null,flowInfoOption;//互联网流量信息
var ipFlowInfo=null,ipFlowInfoOption;//IP网流量信息
var tollCallInfo=null,tollCallInfoOption;//长途话务量信息
var cdmaCallInfo=null,cdmaCallInfoOption;//CDMA话务量信息
var contactInfo=null,contactInfoOption;//互联互通
var messageInfo=null,messageInfoOption;//短信彩信信息
var loadFlag=true;
function refresh(){
	
}
//互联网流量信息
function loadFlowInfo(){
    flowInfo = echarts.init(document.getElementById('flowInfo'));
    if(loadFlag){
    	flowInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/detail_flow.do",
        data : {"latn_id":currentLocalNet},
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		flowInfoOption={
				    color:['#fec601','#6eb5e6','#f76c4f'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:48,y:64,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:['2015年春节','2016年春节','平常']
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
								color : '#df80a0'
							}
						},
						data : ['初一','初二','初三','初四','初五','初六','初七']
					}],
				    yAxis : [{
						type : 'value',
						name : '单位：GB',
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
				            name:'2015年春节',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[163,102,203,234,230,165,120]
				        },{
				            name:'2016年春节',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[520,293,154,210,515,250,262]
				        },{
				            name:'平常',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[220,193,104,310,255,150,162]
				        }
				    ]
				};
				flowInfo.hideLoading();
				flowInfo.setOption(flowInfoOption);
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
//IP网流量信息
function loadIpFlowInfo(){
    ipFlowInfo = echarts.init(document.getElementById('ipFlowInfo'));
    if(loadFlag){
    	ipFlowInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/detail_ipFlow.do",
        data : {"latn_id":currentLocalNet},
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
                ipFlowInfoOption={
				    color:['#fec601','#6eb5e6'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:32,y:32,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:['IP入口流量峰值','IP出口流量峰值']
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
								color : '#df80a0'
							}
						},
						data : ['20160816','20160817','20160818','20160819','20160820','20160821','20160822']
					}],
				    yAxis : [{
						type : 'value',
						name : '单位：GB',
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
				            name:'IP入口流量峰值',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[163,102,203,234,230,165,120]
				        },{
				            name:'IP出口流量峰值',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[520,293,154,210,515,250,262]
				        }
				    ]
				};
				ipFlowInfo.hideLoading();
				ipFlowInfo.setOption(ipFlowInfoOption);
        	}else{
				ipFlowInfo.hideLoading();
            	ipFlowInfo = null;
               	$("#ipFlowInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			ipFlowInfo.hideLoading();
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
		url : "festival_0101/detail_call.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		tollCallInfoOption={
				    color:['#db5f55','#e1a717','#6eb5e5','#1ade57'],
				    title : {
						textStyle : {
							color : '#fff3cf',
							fontFamily : '微软雅黑',
							fontSize : 16
						},
				        text: '长途话务业务',
		              	x:'center',
		              	y:'top'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:16,y:64,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#f6c9d9'},				      	
		              	x:'center',
		              	y:32,
				        data:['2015','2016','日常']
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
						data : ['20160816','20160817','20160818','20160819','20160820','20160821','20160822']
					}],
				    yAxis : [{
			            type : 'value',
			            name : '单位：小时',
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
				            name:'2015',
				            type:'bar',
				          	itemStyle : { normal: {barBorderRadius:[8,8,0,0],label : {show: false}}},
				            data:[232,156,767,1356,1622,326,500]
				        },{
				            name:'2016',
				            type:'bar',
				          	itemStyle : { normal: {barBorderRadius:[8,8,0,0],label : {show: false}}},
				            data:[164,287,507,1756,1822,487,188]
				        },{
				            name:'日常',
				            type:'bar',				          	
				            itemStyle : { normal: {barBorderRadius:[8,8,0,0],label : {show: false}}},
				            data:[163,102,203,234,230,165,120]
				        }
				    ]
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
		url : "festival_0101/detail_call.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		cdmaCallInfoOption={
				    color:['#db5f55','#e1a717','#6eb5e5','#1ade57'],
				    title : {
						textStyle : {
							color : '#fff3cf',
							fontFamily : '微软雅黑',
							fontSize : 16
						},
				        text: 'CDMA话务业务',
		              	x:'center',
		              	y:'top'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:16,y:64,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#f6c9d9'},				      	
		              	x:'center',
		              	y:32,
				        data:['2015','2016','日常']
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
						data : ['20160816','20160817','20160818','20160819','20160820','20160821','20160822']
					}],
				    yAxis : [{
			            type : 'value',
			            name : '单位：小时',
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
				            name:'2015',
				            type:'bar',
				          	itemStyle : { normal: {barBorderRadius:[8,8,0,0],label : {show: false}}},
				            data:[232,156,767,1356,1622,326,500]
				        },{
				            name:'2016',
				            type:'bar',
				          	itemStyle : { normal: {barBorderRadius:[8,8,0,0],label : {show: false}}},
				            data:[164,287,507,1756,1822,487,188]
				        },{
				            name:'日常',
				            type:'bar',				          	
				            itemStyle : { normal: {barBorderRadius:[8,8,0,0],label : {show: false}}},
				            data:[163,102,203,234,230,165,120]
				        }
				    ]
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
//互联互通信息
function loadContactInfo(){
	contactInfo = echarts.init(document.getElementById('contactInfo'));
    if(loadFlag){
    	contactInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/detail_contact.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[0,1,2];
           	if(data!=null&&data!=''&&data.length>0){
           		contactInfoOption={
				    color:['#fec601','#6eb5e6'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:48,y:64,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				      	textStyle:{color: '#f6c9d9'},
				        data:['电信至联通','电信至移动','移动至电信','联通至电信']
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
						data : ['20160816','20160817','20160818','20160819','20160820','20160821','20160822']
					}],
				    yAxis : [{
						type : 'value',
						name : '单位：条',
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
				            name:'电信至联通',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[163,102,203,234,230,165,120]
				        },{
				            name:'电信至移动',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[520,293,154,210,515,250,262]
				        },{
				            name:'移动至电信',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[110,312,153,250,730,512,193]
				        },{
				            name:'联通至电信',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:[120,232,530,115,273,552,210]
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
//短信彩信
function loadMessageInfo(){
	messageInfo = echarts.init(document.getElementById('messageInfo'));
    if(loadFlag){
    	messageInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "festival_0101/detail_message.do",
        data : {"latn_id":currentLocalNet},
        dataType : "json",
  		type: 'post',
        success : function(data){
			//测试数据
			data=[0,1,2];
        	if(data!=null&&data!=''&&data.length>0){
        		messageInfoOption={
					color:['#aa4c67','#b67b39','#1ad5de'],
				    title : {
				    	show:false,
		      			textStyle:{color: '#f6c9d9'},
				        text: '短信彩信',
		              	x:'center',
		              	y:'top'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
		              	x:'right',
		              	y:'top',
				        data:[
		                  {name:'2015',textStyle:{color:'auto'}},
		                  {name:'2016',textStyle:{color:'auto'}},
		                  {name:'日常',textStyle:{color:'auto'}}
		                ]
				    },
					grid:{x:48,y:64,x2:32,y2:32,borderWidth:'0'},
					calculable : true,
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
			            boundaryGap : false,
			            data : ['20160816','20160817','20160818','20160819','20160820','20160821','20160822']
			        }],
					yAxis : [{
			            name : '单位：条',
			            type : 'value',
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
				            name:'2015',
				            type:'line',
				          	symbol:'none',
				            smooth:true,
				            itemStyle: {normal: {lineStyle:{color: '#aa4c67'},areaStyle: {color: '#aa4c67'}}},
				            data:[10,12,21,54,260,830,710,210,63,80,110,350]
			        	},{
				            name:'2016',
				            type:'line',
				          	symbol:'none',
				          	smooth:true,
				            itemStyle: {normal: {lineStyle:{color: '#b67b39'},areaStyle: {color:"#b67b39"}}},
				            data:[30,182,434,791,390,30,10,210,10,50,80,550]
				        },{
				            name:'日常',
				          	symbol:'none',
				            type:'line',
				            smooth:true,
				            itemStyle: {normal: {lineStyle:{color: '#1ad5de'},areaStyle: {color:"#1ad5de"}}},
				            data:[1320,1132,601,234,120,90,20,30,300,210,500,20]
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