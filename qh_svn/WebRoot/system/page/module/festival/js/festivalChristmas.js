/* 文件：festivalChristmas.js
 * 作者：Lyndon
 * 功能描述：festivalChristmas.jsp的各个模块加载函数
 */
//变量定义
var interestInfo=null,interestInfoOption;//兴趣点搜索
var callBusiInfo=null,callBusiInfoOption;//话务量
var msgBusiInfo=null,msgBusiInfoOption;//短信量
var wingPayInfo=null,wingPayInfoOption;//翼支付信息
var appInfo=null,appInfoOption;//用户特征
var loadFlag=true;
//兴趣点信息
function loadInterestInfo(){
	$("#interestInfo").removeClass("animated slideInRight");
    interestInfo = echarts.init(document.getElementById('interestInfo'));
    if(loadFlag){
    	interestInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "christmas/interest.do",
  		type: 'post',
        dataType : "json",
        success : function(data){
        	/*
        	var data=[
        		{name:'鬼吹灯',value:1500},
        		{name:'我的战争',value:100},
        		{name:'电信套餐存费送费',value:600},
        		{name:'天翼4G套餐',value:150},
        		{name:'无线流量卡',value:100},
        		{name:'圣诞预存活动',value:1050},
        		{name:'青云志2',value:1200},
        		{name:'长城',value:2000},
        		{name:'过年卡',value:1100},
        		{name:'宽带预存话费送手机',value:510},
        		{name:'流量加油包',value:1300}
        	];*/
           	if(data!=null&&data.length>0){
           		var selectColor=['#D9D919','#DBDB70','#E47833','#FFFF00','#FF0000','#00FF00','#FFFFFF','#00FFFF','#7FFF00','#6495ED'];
           		var interestData=[];
           		for(var i in data){
           			interestData.push({
           				name:data[i].key_word,
           				value:data[i].search_count,
           				itemStyle:{
           					normal:{color:selectColor[parseInt(Math.random()*10)]}
           				}
           			});
           		}
           		interestInfoOption={
				    tooltip: {
				        textStyle:{fontSize:14},
				        show: true
				    },
				    series: [{
				        name: '兴趣点',
				        type: 'wordCloud',
				        size: ['100%', '100%'],
				        textRotation : [0,30,45,60,90,-30,-45,-60,-90],
				        textPadding: 0,
				        autoSize: {
				            enable: true,
				            minSize: 14
				        },
				        data: interestData
				    }]
				};
				interestInfo.hideLoading();
			    interestInfo.setOption(interestInfoOption);
				$("#interestInfo").addClass("animated slideInRight");
			}else{
				interestInfo.hideLoading();
            	interestInfo = null;
               	$("#interestInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			interestInfo.hideLoading();
        }
	});
}
//话务量信息
function loadCallBusiInfo(){
    $("#callBusiInfo").removeClass("animated slideInRight");
	callBusiInfo = echarts.init(document.getElementById('callBusiInfo'));
    if(loadFlag){
    	callBusiInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "christmas/call.do",
        dataType : "json",
  		type: 'post',
        success : function(data){
           	//测试数据
           	/*
        	var data=[
        		{type:"平时",value:1000},
        		{type:"去年圣诞",value:2500},
        		{type:"今年圣诞",value:3000}
        	];
        	*/
        	console.log(data);
           	if(data!=null&&data.length>0){
           		var xAxisData=['今年圣诞','平时','去年圣诞'];
           		var seriesData=[];
           		seriesData.push(data[0].this_year);
           		seriesData.push(data[0].daily_value);
           		seriesData.push(data[0].last_year);
           		callBusiInfoOption={
				    color:['#6eb5e5','#feff01','#2fce34','#f86b4f'],				    
					title: {
						text : '话务量',
						x: 'center',
						y: 'top',
						textStyle : {
							color : '#fdcc65',
							fontWeight : 500
						}
					},
			        tooltip : {
			            trigger: 'axis'
			        },
			        grid:{x:32,y:64,x2:16,y2:32,borderWidth:'0'},
			        xAxis:[{
						splitLine:{show:false},
						splitArea:{show:false},
						type : 'category',
						axisLabel : {
							rotate : 15,
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
						name:'话务量',
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
						data:seriesData
					}]
			    };
				callBusiInfo.hideLoading();
				callBusiInfo.setOption(callBusiInfoOption);
				$("#callBusiInfo").addClass("animated slideInRight");
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
function loadMsgBusiInfo(){
    $("#msgBusiInfo").removeClass("animated slideInLeft");
	msgBusiInfo = echarts.init(document.getElementById('msgBusiInfo'));
    if(loadFlag){
    	msgBusiInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "christmas/msg.do",
        dataType : "json",
  		type: 'post',
        success : function(data){
           	//测试数据
           	/*
        	var data=[
        		{type:"平时",value:1000},
        		{type:"去年圣诞",value:2500},
        		{type:"今年圣诞",value:3000}
        	];*/
        	console.log(data);
           	if(data!=null&&data.length>0){
           		var xAxisData=['今年圣诞','平时','去年圣诞'];
           		var seriesData=[];
           		seriesData.push(data[0].this_year);
           		seriesData.push(data[0].daily_value);
           		seriesData.push(data[0].last_year);
           		msgBusiInfoOption={
				    color:['#f86b4f','#feff01','#2fce34','#f86b4f'],				    
					title: {
						text : '短信量',
						x: 'center',
						y: 'top',
						textStyle : {
							color : '#fdcc65',
							fontWeight : 500
						}
					},
			        tooltip : {
			            trigger: 'axis'
			        },
			        grid:{x:32,y:64,x2:16,y2:32,borderWidth:'0'},
			        xAxis:[{
						splitLine:{show:false},
						splitArea:{show:false},
						type : 'category',
						axisLabel : {
							rotate : 15,
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
						name:'短信量',
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
						data:seriesData
					}]
			    };
				msgBusiInfo.hideLoading();
				msgBusiInfo.setOption(msgBusiInfoOption);
				$("#callBusiInfo").addClass("animated slideInLeft");
        	}else{
				msgBusiInfo.hideLoading();
            	msgBusiInfo = null;
               	$("#msgBusiInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			msgBusiInfo.hideLoading();
        }
	});
}
//吃、喝、玩购物等信息
function loadMultipleInfo(type,e){
	$(".bubble_body").css({"top":e.py,'left':e.px});
	//$("#bubble_title").attr("class",type);
	$(".bubble_body").removeClass("animated bounceIn");
	$(".page_window").show();
	$.ajax({
		url : "christmas/multiple.do",
  		type: 'post',
        data : {queryType:type},
        dataType : "json",
        success : function(data){
        	//测试数据
        	/*
        	var data=[
	        	{rn:'1',part_name:'万达广场'},
	        	{rn:'2',part_name:'王府井百货'},
	        	{rn:'3',part_name:'大十字'},
	        	{rn:'4',part_name:'力盟商业步行街'},
	        	{rn:'5',part_name:'新千国际广场'},
	        	{rn:'6',part_name:'新宁广场'},
	        	{rn:'7',part_name:'人民公园'}
        	];*/
           	if(data!=null&&data.length>0){
           		var tableData=[];
           		var rnStr="";
           		for(var i in data){
           			if(i<3){
           				rnStr='<span class="br_radius sbr_f">'+data[i].rn+'</span>';
           			}else{
           				rnStr='<span class="br_radius">'+data[i].rn+'</span>';
           			}
           			tableData.push({
           				'rn':rnStr,
           				'part_name':data[i].business_circle,
           				'part_value':data[i].circle_value
           			});
           		}
           		var tableStr=funcGetTableBody(tableData,true,'');
           		if(tableStr!=""&&tableStr.length>0){
               		$(".custom_table_s tbody").html(tableStr);
           		}else{
               		$(".custom_table_s tbody").html('<tr><td colspan="2" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$(".custom_table_s tbody").html('<tr><td colspan="2" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
			$(".bubble_body").addClass("animated bounceIn");
        },
        error : function(result){}
	});
}
//翼支付
function loadWingPayInfo(){
	$("#wingPayInfo").removeClass("animated slideInRight");
	$.ajax({
		url : "christmas/wingPay.do",
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
        	/*
        	var data=[
	        	{rn:'1',shop_name:'受乐赵家寺综合商店受乐赵家寺综合商',trade_count:122,rate:10},
	        	{rn:'2',shop_name:'受乐赵家寺综合商店',trade_count:152,rate:7},
	        	{rn:'3',shop_name:'受乐赵家寺综合商店',trade_count:112,rate:2},
	        	{rn:'4',shop_name:'受乐赵家寺综合商店',trade_count:120,rate:8},
	        	{rn:'5',shop_name:'受乐赵家寺综合商店',trade_count:22,rate:1},
	        	{rn:'6',shop_name:'受乐赵家寺综合商店',trade_count:152,rate:-3},
	        	{rn:'7',shop_name:'受乐赵家寺综合商店',trade_count:125,rate:8},
	        	{rn:'8',shop_name:'受乐赵家寺综合商店',trade_count:102,rate:3},
	        	{rn:'9',shop_name:'受乐赵家寺综合商店',trade_count:72,rate:5},
	        	{rn:'10',shop_name:'受乐赵家寺综合商店',trade_count:160,rate:9}
        	];*/
           	if(data!=null&&data.length>0){
           		var tableData=[];
           		var rnStr="";
           		for(var i in data){
           			if(i<3){
           				rnStr='<span class="sbr_12 sbr_f">'+data[i].rn+'</span>';
           			}else{
           				rnStr='<span class="sbr_12">'+data[i].rn+'</span>';
           			}
           			tableData.push({
           				'rn':rnStr,
           				'shop_name':data[i].partner_name,
           				'trade_count':'<span class="s_font">'+data[i].consume_totol+"笔</span>"
           			});
           		}
           		var tableStr=funcGetTableBody(tableData,true,'');
           		if(tableStr!=""&&tableStr.length>0){
               		$("#wingPayInfo table tbody").html(tableStr);
					$("#wingPayInfo").addClass("animated slideInRight");
           		}else{
               		$("#wingPayInfo table tbody").html('<tr><td colspan="3" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#wingPayInfo table tbody").html('<tr><td colspan="3" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});
}
//app排行
function loadAppInfo(){
    $("#appInfo").removeClass("animated slideInLeft");
	appInfo = echarts.init(document.getElementById('appInfo'));
    if(loadFlag){
    	appInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "christmas/app.do",
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	/*
        	var data=[
	        	{name:'微信',val:38},
	        	{name:'腾讯QQ',val:36},
	        	{name:'AppStore',val:30},
	        	{name:'爱拍',val:24},
	        	{name:'喜马拉雅',val:20},
	        	{name:'酷我音乐',val:18},
	        	{name:'gif助手',val:15},
	        	{name:'美图',val:10}
        	];*/
           	if(data!=null&&data!=''&&data.length>0){
           		var legendData=[];
           		var seriesData=[];
           		for(var i in data){
           			legendData.push(data[i].app_name);
           			seriesData.push({name:data[i].app_name,value:data[i].app_flow});
           		}
           		appInfoOption={
				    color:['#bda29b','#ca8623','#749f83','#6eb5e6','#d38265','#61a0a9','#2f4554','#c33531'],
				    title : {
				      	show:false,
				        text: 'app应用'
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
				            data:seriesData
				        }
				    ]
				};
				appInfo.hideLoading();
			    appInfo.setOption(appInfoOption);
				$("#appInfo").addClass("animated slideInRight");
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