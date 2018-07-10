/* 文件：qhTravel.js
 * 作者：Lyndon
 * 功能描述：qhTravel.js的各个模块加载函数
 */
var player = new MediaElementPlayer('#videoInfo',
	{
		enableAutosize: true,
		loop: false,
	    alwaysShowControls: false,
		success: function(player, node){
			$(".mejs-controls").hide();
			//$("#mep_0").css("background","transparent");
			$('#' + node.id + '-mode').html('mode: ' + player.pluginType);
			player.addEventListener('ended',function(e){
				player.load();
				$(".mejs-controls").hide();
        	}, false);  
		}
	}
);
/*
$('#videoInfo').mediaelementplayer({
	success: function(player, node) {
		$('#' + node.id + '-mode').html('mode: ' + player.pluginType);
	}
});*/
player.load();
player.play();
//点击事件
$(document).on("click","a[name*='_']",function(){
	var name=$(this).attr('name');
	var index=name.indexOf('_');
	var name_prifx=name.substring(0,index);
	var type=name.substring(index+1);
	//标题强调样式
    $("a[name^='"+name_prifx+"']").each(function(){
		if(name_prifx=='class'){
			$(this).css({"color":"#fff"});
		}else{
			$(this).css({"background":"transparent"});
		}
	});
	if(name_prifx=='class'){
		$(this).css({"color":"#FFFF00"});
	}else{
		$(this).css({"background":"rgb(174,86,128)"});
	}
	//内容展示
	$("div[id^='"+name_prifx+"_']").each(function(){
		$(this).hide();
	});		
	$("#"+name_prifx+'_'+type+'Info').show();
});
//echarts图表加载
loadEcharts({
	chinaMap: false,
	qhMap: true,
	mapExtend: false,
	pageFunc: function(){
		loadMobileInfo();
		loadBrandInfo();
		loadAgeInfo();
		loadSexInfo();
		loadAppInfo();
		//loadSaleInfo();
		//loadToolInfo();
		loadScenicInfo();
		//loadTrailInfo();
		//loadRankInfo();
		loadScenicRankTable();
		loadScenicMapInfo();
	}
});
//终端型号
function loadMobileInfo(){
	var mobileInfo=echarts.init(document.getElementById('mobileInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){        	
           	if(data!=null&&data!=''&&data.length>0){
				var mobileInfoOption = {
					title: {
		    			show: false,
				        text: '终端型号'
				    },
				    grid:{left:64,top:0,right:8,bottom:8},
				    xAxis: {
				        splitLine: {show: false},
				        axisLabel: {show: false},
				        axisTick: {show: false},
				        axisLine: {show: false}
				    },
				    yAxis: {
				        splitLine: {show: false},
				        axisTick: {show: false},
				        axisLine: {show: false},
				        axisLabel: {
				            textStyle: {
				                color: '#FFFFFF'
				            }
				        },
				        data:['苹果','OPPOO','华为','小米','中兴','vivo','金立']
				    },
				    series: [
				        {
				            type: 'bar',
				            barWidth:16,
					        label: {
					            normal: {
					                show: true,
					                textStyle:{
					                    fontSize: 12,
					                    color: '#FFFFFF'
					                    //fontWeight: "bold"
					                },
					                position: 'insideRight'
					            }
					        },
				            itemStyle: {
				                normal: {
				                	color: 'rgb(216,83,84)',
				                	barBorderRadius:8
				                }
				            },
				            data: [2000,1450,1100,950,800,640,500],
				            animation: true
				        }
				    ]
				};
				mobileInfo.setOption(mobileInfoOption);
           	}else{
				$("#mobileInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			mobileInfo.dispose();
			$("#mobileInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
//终端云字符
function loadBrandInfo(){
	var brandInfo=echarts.init(document.getElementById('brandInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var brandInfoOption = {
					backgroundColor:'rgba(174,86,128,0.2)',
					color:deepColor,
    				tooltip: {},
			    	series: [ {
						type: 'wordCloud',
				      	gridSize: 2,
				       	sizeRange: [12, 20],
				       	rotationRange: [0,90],
				       	shape: 'pentagon',
				       	textPadding:8,
						width: '105%',
						height: '105%',
				      	textStyle: {
				      		normal: {
				        		color: function () {
						          	return lightColor[Math.round(Math.random() * 30)];
						        }
				        	},
				          	emphasis: {
				        		shadowBlur: 10,
				        		shadowColor: '#333'
				        	}
				      	},
				      	data: [
				      		{name: '小米 note4',value: 618},
				      		{name: '华为mate9 pro',value: 438},
				      		{name: '苹果 iphone7',value: 405},
				       		{name: '三星 galaxy s6',value: 246},
				       		{name: '魅族 pro6 plus',value: 224},
				      		{name: '金立 m2017',value: 189},
				      		{name: 'vivo X9 Plus',value: 148},
				      		{name: 'oppo r9s plus',value: 111},
				      		{name: '联想乐檬k3 note',value: 96},
				      		{name: '酷派cool s1',value: 84}
				      	]
					}]
			    };
				brandInfo.setOption(brandInfoOption);
           	}else{
				$("#brandInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			brandInfo.dispose();
			$("#brandInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
function loadAgeInfo(){
	var ageInfo=echarts.init(document.getElementById('ageInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var ageInfoOption = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    color: ['#FFCD00', '#C5564B', '#1AD5DE', '#FF0000'],
				    series: [ {
				        name: '年龄分类',
				        type: 'pie',
				        radius: ['75%', '90%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 12,
				                    color: '#FFFFFF'
				                    //fontWeight: "bold"
				                },
				                position: 'inner'
				            }
				        },
				        labelLine: {
				            normal: {
				                show: false,
				                lineStyle: {
				                    color: '#ffffff',
				                    length: 8,
				                    length2: 0
				                }
				            }
				        },
				        data: [{
				            value: 35,
				            name: '1-18'
				        },{
				            value: 70,
				            name: '19-25'
				        },{
				            value: 25,
				            name: '25以上'
				        }]
				    }]
				};
				ageInfo.setOption(ageInfoOption);
           	}else{
				$("#ageInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			ageInfo.dispose();
			$("#ageInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
function loadSexInfo(){
	var sexInfo=echarts.init(document.getElementById('sexInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var sexInfoOption = {
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        show:false,
				        orient: 'vertical',
				        x: 'left',
				        data: ['女', '其他'],
				        textStyle: {
				            color: '#FFFFFF'
				        }
				    },
				    //backgroundColor: '#0D3585',
				    series: [ {
				        name: '性别分类',
				        type: 'pie',
				        radius: ['80%', '80.5%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#FCFCFC",
				                borderColor: "#5886f0",
				                borderWidth: 8
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 15,
				                    color: '#FFFFFF',
				                    fontWeight: "bold"
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='女'){
				                       return param.name+'：'+param.value;
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
				        z: 2,
				        data: [{
				            value: 75,
				            name: '女'
				        },{
				            value: 40,
				            name: '其他',
				            itemStyle:{
				                normal:{
				                    borderWidth:0
				                }
				            }
				        }]
				    }]
				};
				sexInfo.setOption(sexInfoOption);
           	}else{
				$("#sexInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			sexInfo.dispose();
			$("#sexInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
function loadAppInfo(){
	var appInfo=echarts.init(document.getElementById('class_appInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		var nodeData=[//x: Math.random()*100,y: Math.random()*100,
           			{x: Math.random()*100,y: Math.random()*100,id: '微信',name: '微信',symbolSize: Math.random()*20,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '聚美优品',name: '聚美优品',symbolSize: Math.random()*50,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '淘宝',name:'淘宝',symbolSize: Math.random()*20,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '天猫',name: '天猫',symbolSize: Math.random()*50,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '京东',name: '京东',symbolSize: Math.random()*20,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '翼支付',name: '翼支付',symbolSize: Math.random()*50,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '缴费易',name: '缴费易',symbolSize: Math.random()*20,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '美团',name: '美团',symbolSize: Math.random()*50,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '支付宝',name: '支付宝',symbolSize: Math.random()*20,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}},
           			{x: Math.random()*100,y: Math.random()*100,id: '饿了么',name: '饿了么',symbolSize: Math.random()*50,itemStyle: {normal: {color: deepColor[Math.round(Math.random()*20)]}}}
           		];
           		var relationData=[
           			{source: '缴费易',target: '微信'},
           			{source: '美团',target: '微信'},
           			{source: '京东',target: '微信'},
           			{source: '支付宝',target: '微信'},
           			{source: '饿了么',target: '微信'},           			
           			{source: '淘宝',target: '聚美优品'},
           			{source: '天猫',target: '聚美优品'},
           			{source: '翼支付',target: '聚美优品'},           			
           			{source: '微信',target: '淘宝'},
           			{source: '支付宝',target: '淘宝'},
           			{source: '饿了么',target: '淘宝'},
           			{source: '美团',target: '淘宝'},           			
           			{source: '微信',target: '支付宝'},
           			{source: '聚美优品',target: '支付宝'},
           			{source: '饿了么',target: '支付宝'},
           			{source: '天猫',target: '支付宝'},
           			{source: '淘宝',target: '支付宝'},
           			{source: '翼支付',target: '支付宝'},
           			{source: '缴费易',target: '支付宝'},
           			{source: '美团',target: '支付宝'},
           			{source: '京东',target: '支付宝'}
           		];
				var appInfoOption = {
					title: {
						show: false,
			            text: 'NPM Dependencies'
			        },
			        animationDurationUpdate: 1500,
			        animationEasingUpdate: 'quinticInOut',			        
					xAxis: {
						axisTick: {show:false},
						axisLabel: {show:false},
						axisLine: {
							lineStyle:{
								color: '#b85c7d'
							}
						},
						splitLine:{show:false},
						splitArea:{show:false}
					},
					yAxis: {
						axisTick:{show:false},
						axisLabel: {show:false},
						axisLine: {
							lineStyle:{
								color: '#b85c7d'
							}
						},
						splitLine:{show:false},
						splitArea:{show:false}
					},
					legend: {
				        right: 10,					
						itemWidth: 8,
						itemHeight: 8,
						textStyle: {
							color: '#ffffff'
						},
				        data: ['微信','支付宝','聚美优品','饿了么','天猫','淘宝','翼支付','缴费易','美团','京东']
				    },
					grid:{left:8,top:4,right:4,bottom:16},
			        series : [
			            {
			                type: 'graph',
			                layout: 'none',//none时data必须加X,Y坐标
			                // progressiveThreshold: 700,
			                data: nodeData,
			                //symbol: 'diamond',
			                edges: relationData,
			                label: {
			                    emphasis: {
			                        position: 'center',
			                        show: false
			                    }
			                },
			                roam: true,
			                focusNodeAdjacency: true,
			                lineStyle: {
			                    normal: {
			                        width: 0.5,
			                        curveness: 0.3,
			                        opacity: 0.7
			                    }
			                }
			            }
			        ]
			    }
				appInfo.setOption(appInfoOption);
           	}else{
				$("#appInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			appInfo.dispose();
			$("#appInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
/*
function loadSaleInfo(){
	var saleInfo=echarts.init(document.getElementById('class_saleInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var saleInfoOption = {
				    
				};
				saleInfo.setOption(saleInfoOption);
           	}else{
				$("#saleInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			saleInfo.dispose();
			$("#saleInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
function loadToolInfo(){
	var toolInfo=echarts.init(document.getElementById('class_toolInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var toolInfoOption = {
					
				};
				toolInfo.setOption(toolInfoOption);
           	}else{
				$("#toolInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			toolInfo.dispose();
			$("#toolInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
*/
function loadScenicInfo(){
	var scenicInfo=echarts.init(document.getElementById('mutil_scenicInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var scenicInfoOption = {
				    title: {
				    		show:false,
				        text: '景区排行',
				        x:'right',
				        y:'bottom'
				    },
				    tooltip: {
				        trigger: 'item'
				    },
				    legend: {
				    		show:false,
				        data:['景区排行']
				    },
				    radar: {
				    	name:{textStyle:{color:'#ffff00'}},
						indicator : [
							{ text: '青海湖景区',max:250},
							{ text: '孟达天池',max:250},
							{ text: '门源',max:250},
							{ text: '日月山',max:250},
							{ text: '塔尔寺',max:250},
							{ text: '坎布拉',max:250},
							{ text: '查卡盐湖',max:250},
							{ text: '金银滩景区',max:250},
							{ text: '马步芳公馆',max:250},
							{ text: '撒拉族绿色家园',max:250}
						]
				    },
				    series : [{
						name:'景区排行',
			        	type: 'radar',
						tooltip: {
							trigger: 'item'
						},
						//symbol:'path://M18 3c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3zM18 8h-6c-1.105 0-2 0.895-2 2v10h2v12h2.5v-12h1v12h2.5v-12h2v-10c0-1.105-0.895-2-2-2z',
						symbolSize:8,
						itemStyle: {
							normal: {
								color:'#ffff00',
								areaStyle: {color:'rgba(0,250,0,0.3)'},
								lineStyle: {
									width:1
								}
							},
							emphasis : {
								areaStyle: {color:'rgba(0,250,0,0.3)'}
							}
						},
						data:[{
							value:[200,140,75,115,95,68,105,95,165,215],
							name:'景区排行'
						}]
					}]
				};
				scenicInfo.setOption(scenicInfoOption);
           	}else{
				$("#scenicInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			scenicInfo.dispose();
			$("#scenicInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
/*
function loadTrailInfo(){
	var trailInfo=echarts.init(document.getElementById('mutil_trailInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var trailInfoOption = {
				    
				};
				trailInfo.setOption(trailInfoOption);
           	}else{
				$("#trailInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			trailInfo.dispose();
			$("#trailInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
function loadRankInfo(){
	var rankInfo=echarts.init(document.getElementById('mutil_rankInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var rankInfoOption = {
					
				};
				rankInfo.setOption(rankInfoOption);
           	}else{
				$("#rankInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			rankInfo.dispose();
			$("#rankInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
*/
function loadScenicRankTable(){
	$("div[name^='star_']").each(function(){
		var name=$(this).attr('name');
		var index=name.indexOf('_',5);
		var starNum=parseInt(name.substring(index+1));
		$(this).starRating({initialRating: starNum,starSize: 16,readOnly: true,hoverColor:'#FFFF00'});
	});
	/*
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var scenicRankHtml = "";
				for(var i in data){
					scenicRankHtml+='<tr>';
					scenicRankHtml+='<td><span class="br_12">'+data[i].rn+'</span></td>';
					scenicRankHtml+='<td>'+data[i].scenic_name+'</td>';
					scenicRankHtml+='<td><div name="star_'+data[i].rn+'_'+data[i].star_value+'"></div></td>';
					scenicRankHtml+='<td>天气指数</td>';
					scenicRankHtml+='<td>消费特征指数</td>';
					scenicRankHtml+='</tr>';
				}
				$("#scenicRankTable table tbody").html(scenicRankHtml);
				$("div[name^='star_']").each(function(){
					var name=$(this).attr('name');
					var index=name.indexOf('_',5);
					var starNum=parseInt(name.substring(index+1));
					$(this).starRating({initialRating: starNum,starSize: 16,readOnly: true,hoverColor:'#FFFF00'});
				});
           	}else{
				$("#scenicRankTable table tbody").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
			$("#scenicRankTable").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});*/
}
function loadScenicMapInfo(){
	var scenicMapInfo=echarts.init(document.getElementById('scenicMapInfo'));	
	var scenicMapInfoOption={
		//backgroundColor: '#404a59',
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
			trigger: 'item'
		},
		legend:{
			show:false,
			top:'top',
			right:'right',
			data: [{
				name: '返回',
				// 强制设置图形为圆。
				icon: 'path://M23.808 32c3.554-6.439 4.153-16.26-9.808-15.932v7.932l-12-12 12-12v7.762c16.718-0.436 18.58 14.757 9.808 24.238z',
				// 设置文本为红色
				textStyle: {
					color: 'red'
				}
			}]
		},
		series: [{
			name: '返回',
			type: 'map',
			map: '青海省',
			selectedMode: 'single',
			top:0,
			bottom:0,
			label: {
				normal: {
					show: true,
					textStyle: {color:'#fdcc65'}
				},
				emphasis: {
					show: false
				}
			},			
			itemStyle:{
				normal:{
					areaColor:'#323c48',
					borderColor:'rgba(0,0,0,1)',
					borderWidth:1
				}
			}
		}]
	};
	scenicMapInfo.setOption(scenicMapInfoOption);
}