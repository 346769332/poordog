/* 文件：festival_11.11.js
 * 作者：Lyndon
 * 功能描述：festival_11.11.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption=null;
var keywordsInfo=null,keywordsInfoOption=null;
var ageInfo=null,ageInfoOption=null;
var sexInfo=null,sexInfoOption=null;
var chinaMapInfo=null,chinaMapInfoOption=null;
var containsInfo=null,containsInfoOption=null;
var appInfo=null,appInfoOption=null;
var travelWayInfo=null,travelWayInfoOption=null;
var inRankInfo=null,inRankInfoOption=null;
var outRankInfo=null,outRankInfoOption=null;
var festival='wy',latnName='',areaName='';
var rotateTimer=null;
//地图加载
function loadMapInfo(){
	mapInfo = echarts.init(document.getElementById('mapInfo'));
	mapInfoOption = {
		title : {
			show: false,
			text: '青海省',
			left: 'left',
			top: 'top',
			textStyle: {
				fontSize: 14,
				color: 'rgb(109,209,245)'
			}
		},
		tooltip : {
			trigger: 'item',
			show:false
		},
		legend:{
			show: false,
			top: 16,
			right: 16,
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
		graphic: [{
        	type: 'image',
        	id: 'rotate_bg',
        	right: 'center',
        	top: 'center',
			zlevel: -1,
        	//bounding: 'raw',
        	//origin: [130, 130],
        	style: {
        		image: './images/rotate_bg.png',
        		width: 260,
        		height: 260,
        		opacity: 0.4
        	}
        }],
		geo: {
			map: '青海省',
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
			}
      	},
		series: [{
			name: '返回',
			type: 'scatter',
			coordinateSystem: 'geo',
			symbol:'path://M877.714286 401.495771C877.714286 195.876571 713.991314 29.257143 512.029257 29.257143 309.979429 29.257143 146.285714 195.876571 146.285714 401.495771c0 81.832229 26.243657 157.257143 70.2464 218.697143l-0.4096 0L512.029257 1024l289.440914-394.912914-0.526629 0C848.896 566.125714 877.714286 487.306971 877.714286 401.495771zM512.029257 226.567314c94.880914 0 171.797943 78.292114 171.797943 174.869943 0 96.548571-77.0048 174.928457-171.797943 174.928457-94.880914 0-171.797943-78.292114-171.797943-174.869943C340.231314 304.9472 417.148343 226.567314 512.029257 226.567314z',
			symbolSize:[16,20],
			itemStyle:{
				normal:{
					color:'#c09626',
				}
			},
			data:[
				{name: '西宁市',value: [101.4038,36.8207]},
				{name: '海北藏族自治州',value: [100.3711,37.9138]},
				{name: '海东地区',value: [102.3706,36.2988]},
				{name: '黄南藏族自治州',value: [101.5686,35.1178]},
				{name: '海南藏族自治州',value: [100.3711,35.9418]},
				{name: '果洛藏族自治州',value: [99.3823,34.0466]},
				{name: '玉树藏族自治州',value: [93.5925,33.9368]},
				{name: '海西蒙古族藏族自治州',value: [96.4579,37.4314]},
				{name: '格尔木市',value: [94.8798,36.4104]}
			]
		}]
	};
	mapInfo.setOption(mapInfoOption);
	mapInfo.on('geoselectchanged', function(params){
		if(latnName!=''){
			areaName=params.name;
			mapInfo.setOption({
				title: {text: areaName}
			});
		}else{
			latnName=params.name;
			mapInfo.setOption({
				title: {show: true,text: latnName},
				legend: {show: true},
				geo: {map: latnName},
				series:[{data:[]}]
			});
		}
		loadOtherModule();
	});
	mapInfo.on('legendselectchanged', function(params){
		if(areaName!=''){
			//mapInfoOption=mapInfo.getOption();
			//mapInfoOption.title.show=true;
			//mapInfoOption.title.text=latnName;
			//mapInfoOption.regions=[{name: areaName,itemStyle: {normal: {areaColor: 'red'}}}];
			//mapInfoOption.title.legend=true;
			//mapInfoOption.geo.map=latnName;
			areaName='';
			mapInfo.setOption({title: {text:latnName}});
			loadOtherModule();
			//mapInfo.resize();
		}else{
			window.location.reload();
		}
	});
	var rotation = 0;
	rotateTimer=setInterval(function (){
	    mapInfo.setOption({
	        graphic: {
	            id: 'rotate_bg',
	            rotation: (rotation+=Math.PI/360)%(Math.PI * 2)
	        }
	    });
	},50);
}
function loadKeywordsInfo(){
	if(keywordsInfo==null){
		keywordsInfo=echarts.init(document.getElementById('keywordsInfo'));
	}
	$("#keywordsInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	data=[
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
	      	];
           	if(data!=null&&data.length>0){
           		if(keywordsInfoOption!=null){
					keywordsInfo.setOption({series: {data: data}});
					return true;
           		}
           		keywordsInfoOption={
					backgroundColor: 'rgba(23,52,84,0.4)',
					color: deepColor,
    				tooltip: {},
			    	series: [ {
						type: 'wordCloud',
				      	gridSize: 2,
				       	sizeRange: [12, 20],
				       	rotationRange: [0,45,90],
				       	shape: 'pentagon',
				       	textPadding:8,
						width: '100%',
						height: '100%',
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
				      	data: data
					}]
			    };
				keywordsInfo.setOption(keywordsInfoOption);
				$("#keywordsInfo").addClass("animated slideInLeft");
			}else{
				keywordsInfo=null,keywordsInfoOption=null;
				$("#keywordsInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){keywordsInfo=null,keywordsInfoOption=null;console.log("关键词查询错误！");}
	});
}
function loadAgeInfo(){
	if(ageInfo==null){
		ageInfo=echarts.init(document.getElementById('ageInfo'));
	}
	$("#ageInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		{value: 35,name: '1-18'},
        		{value: 70,name: '19-25'},
        		{value: 25,name: '25以上'}
        	];
           	if(data!=null&&data.length>0){
           		var seriesData=[],legendData=[];
           		for(var i in data){
           			legendData.push({name: data[i].name,icon: 'circle'});
           			seriesData.push({name: data[i].name,value: data[i].value});
           		}
           		if(ageInfoOption!=null){
					ageInfo.setOption({legend: {data: legendData},series: {data: seriesData}});
					return true;
           		}
           		ageInfoOption={
					title : {
						show: true,
						text: '年龄分布',
						left: 'center',
						top: 'top',
						textStyle: {
							fontSize: 16,
							fontWeight: 'normal',
							color: '#FCFCFC'						
						}
					},
					legend:{
						show: true,
						left: 'center',
						top: 'middle',
						orient: 'vertical',
						itemWidth: 8,
						itemHeight: 8,
						data: legendData,
						textStyle: {
							fontSize: 12,
							fontWeight: 'normal',
							color: '#FCFCFC'						
						}
					},
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    color: ['#d18c85', '#d6ba4c', '#47aaaf', '#7ea9f7'],
				    series: [ {
				        name: '年龄分类',
				        type: 'pie',
				        radius: ['65%', '80%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        label: {
				            normal: {
				                show: false,
				                textStyle:{
				                    fontSize: 12,
				                    color: '#FFFFFF'
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
				        data: seriesData
				    }]
			    };
				ageInfo.setOption(ageInfoOption);
				$("#ageInfo").addClass("animated slideInLeft");
			}else{
				ageInfo=null,ageInfoOption=null;
				$("#ageInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){ageInfo=null,ageInfoOption=null;console.log("年龄信息查询错误！");}
	});
}
function loadSexInfo(){
	if(sexInfo==null){
		sexInfo=echarts.init(document.getElementById('sexInfo'));
	}
	$("#sexInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){        	
        	data=[
        		{value: 35,name: '男'},
        		{value: 70,name: '女'}
        	];
           	if(data!=null&&data.length>0){
           		var seriesData=[],legendData=[];
           		for(var i in data){
           			legendData.push({name: data[i].name,icon: 'circle'});
           			seriesData.push({name: data[i].name,value: data[i].value});
           		}
           		if(sexInfoOption!=null){
					sexInfo.setOption({legend: {data: legendData},series: {data: seriesData}});
					return true;
           		}
           		sexInfoOption={
					title : {
						show: true,
						text: '性别分布',
						left: 'center',
						top: 'top',
						textStyle: {
							fontSize: 16,
							fontWeight: 'normal',
							color: '#FCFCFC'						
						}
					},
					legend:{
						show: true,
						left: 'center',
						top: 'middle',
						itemWidth: 8,
						itemHeight: 8,
						data: legendData,
						textStyle: {
							fontSize: 12,
							fontWeight: 'normal',
							color: '#FCFCFC'						
						}
					},
           			tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    color: ['#d18c85', '#d6ba4c', '#47aaaf', '#7ea9f7'],
				    series: [ {
				        name: '年龄分类',
				        type: 'pie',
				        radius: ['65%', '80%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        label: {
				            normal: {
				                show: false,
				                textStyle:{
				                    fontSize: 12,
				                    color: '#FFFFFF'
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
				        data: seriesData
				    }]
			    };
				sexInfo.setOption(sexInfoOption);
				$("#sexInfo").addClass("animated slideInLeft");
			}else{
				sexInfo=null,sexInfoOption=null;
				$("#sexInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){sexInfo=null,sexInfoOption=null;console.log("性别分类查询错误！");}
	});
}
function loadChinaMapInfo(){
	if(chinaMapInfo==null){
		chinaMapInfo = echarts.init(document.getElementById('chinaMapInfo'));
	}
	$("#chinaMapInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[3];
           	if(data!=null&&data.length>0){
           		var pointData=[];
           		for(var i in chinaGis){
           			pointData.push({name: i,value: chinaGis[i]});
           		}
           		if(chinaMapInfoOption!=null){
					chinaMapInfo.setOption({series: [{data: pointData}]});
           			return true;
           		}
				chinaMapInfoOption = {
					tooltip : {
						trigger: 'item',
						show:false
					},
					geo: {
						map: 'china',
						selectedMode: 'single',
						left:24,
						right:24,
						label: {
							normal: {
								show: true,
								textStyle: {
									color:'#6f9cdf',
									fontWeight:'bold'
								}
							},
							emphasis: {
								show: true,
								textStyle: {
									color:'#fcfcfc',
									fontWeight:'bold'
								}
							}
						},
						itemStyle:{
							normal:{
								areaColor:'rgba(21,59,121,0.6)',
								borderColor:'#3166f2',
								borderWidth:1
							},
							emphasis:{
								areaColor:'rgba(247,63,63,0.6)'
							}
						}
			      	},
					series: [{
						name: '漫游信息',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						symbolSize:[4,4],
				        itemStyle: {
				            normal: {
								color:"gold"
				            }
				        },
						data: pointData
					}]
				};
				chinaMapInfo.setOption(chinaMapInfoOption);
			}else{
				sexInfo=null,sexInfoOption=null;
				$("#sexInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){sexInfo=null,sexInfoOption=null;console.log("性别分类查询错误！");}
	});
}
//漫入用户数
function loadRoamuserCount(){
	$("#roll_num_roamuser").find("i").css("background-position","0 0");
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
           	if(data!=null&&data.length>0){
           		numberRollAnimation('roll_num_roamuser',32324,7,',',32);
			}
        },
        error : function(result){console.log("漫入用户数查询错误！");}
	});
}
//漫入排行
function loadContainsInfo(){
	if(containsInfo==null){
		containsInfo=echarts.init(document.getElementById('containsInfo'));
	}
	$("#containsInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		{rn: 1,provice_name: '陕西',roam_value: 3002},
        		{rn: 2,provice_name: '甘肃',roam_value: 3500},
        		{rn: 3,provice_name: '宁夏',roam_value: 2102},
        		{rn: 4,provice_name: '内蒙古',roam_value: 1002}
        	];
           	if(data!=null&&data.length>0){
           		var top1Data=[],top2Data=[],top3Data=[],top4Data=[];
           		var testOther={value: 40,name: 'other',itemStyle: {normal: {borderWidth: 0}}};
           		for(var i in data){
           			testOther.value=Math.floor(data[i].roam_value*0.6);
           			if(i==0){
           				top1Data.push({value: data[i].roam_value,name: data[i].provice_name});
						top1Data.push(testOther);
           			}
           			if(i==1){
           				top2Data.push({value: data[i].roam_value,name: data[i].provice_name});
						top2Data.push(testOther);
           			}
           			if(i==2){
           				top3Data.push({value: data[i].roam_value,name: data[i].provice_name});
						top3Data.push(testOther);
           			}
           			if(i==3){
           				top4Data.push({value: data[i].roam_value,name: data[i].provice_name});
						top4Data.push(testOther);
           			}
           		}
				if(containsInfoOption!=null){					
					containsInfo.setOption({
						series: [{data: top1Data},{data: top2Data},{data: top3Data},{data: top4Data}]
					});
					return true;
				}
           		containsInfoOption={
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
				        name: 'Top1',
				        type: 'pie',
				        center: ['25%','25%'],
				        radius: ['35%','37%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(192,150,38)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(192,150,38)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name!='other'){
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
				        data: top1Data
				    },{
				        name: 'Top2',
				        type: 'pie',
				        center: ['75%','25%'],
				        radius: ['35%','37%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(68,127,229)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(68,127,229)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name!='other'){
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
				        data: top2Data
				    },{
				        name: 'Top3',
				        type: 'pie',
				        center: ['25%','75%'],
				        radius: ['35%','37%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(172,122,243)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(172,122,243)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name!='other'){
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
				        data: top3Data
				    },{
				        name: 'Top4',
				        type: 'pie',
				        center: ['75%','75%'],
				        radius: ['35%','37%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(68,185,229)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(68,185,229)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name!='other'){
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
				        data: top4Data
				    }]
				};
				containsInfo.setOption(containsInfoOption);
				$("#containsInfo").addClass("animated slideInLeft");
			}else{
				containsInfo=null,containsInfoOption=null;
				$("#containsInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){containsInfo=null,containsInfoOption=null;console.log("漫入排行信息查询错误！");}
	});
}
function loadUserFlowCount(){
	$("#roll_num_user").find("i").css("background-position","0 0");
	$("#roll_num_flow").find("i").css("background-position","0 0");
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
           	if(data!=null&&data.length>0){
           		numberRollAnimation('roll_num_user',32224,7,'',32);
           		numberRollAnimation('roll_num_flow',13832,7,'',32);
			}
        },
        error : function(result){console.log("用户与流量查询错误！");}
	});
}
function loadAppInfo(){
	if(appInfo==null){
		appInfo = echarts.init(document.getElementById('appInfo'));
	}
	$("#appInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
                {value:10, name:'微信'},
                {value:5, name:'QQ'},
                {value:15, name:'飞秋'},
                {value:25, name:'京东'},
                {value:20, name:'亚马逊'},
                {value:35, name:'淘宝'},
                {value:30, name:'天猫'},
                {value:40, name:'支付宝'}
            ];
           	if(data!=null&&data.length>0){
           		var legendData=[],seriesData=[];
           		for(var i in data){
           			legendData.push({name: data[i].name,icon: 'circle'});
           			seriesData.push({name:data[i].name,value: data[i].value});
           		}           		
				if(appInfoOption!=null){					
					appInfo.setOption({
						legend: {data: legendData},
						series: [{data: seriesData}]
					});
					return true;
				}
				appInfoOption={
					color: deepColor,
				    tooltip : {
				        trigger: 'item',
				        formatter: "{b}:{c}[{d}%]"
				    },
					legend:{
						show: true,
						left: '5%',
						top: 'middle',
						orient: 'vertical',
						itemWidth: 8,
						itemHeight: 8,
						data: legendData,
						textStyle: {
							fontSize: 12,
							fontWeight: 'normal',
							color: '#fff3cf'						
						}
					},
				    calculable : true,
				    series : [
				        {
				            name:'APP分类',
				            type:'pie',
				            radius : ['40%', '90%'],
				            center : ['65%', '50%'],
				            roseType : 'radius',
				            label: {
				                normal: {
				                    show: false
				                },
				                emphasis: {
				                    show: false
				                }
				            },
				            lableLine: {
				                normal: {
				                    show: false
				                },
				                emphasis: {
				                    show: false
				                }
				            },
				            data: seriesData
				        }
				    ]
				};
				appInfo.setOption(appInfoOption);
				$("#appInfo").addClass("animated slideInLeft");
			}else{
				appInfo=null,appInfoOption=null;
				$("#appInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){appInfo=null,appInfoOption=null;console.log("APP分类查询错误！");}
	});
}
function loadTravelWayInfo(){
	if(travelWayInfo==null){
		travelWayInfo = echarts.init(document.getElementById('travelWayInfo'));
	}
	$("#travelWayInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		{name:'飞机',value:234},
        		{name:'火车/汽车',value:1234},
        		{name:'其他',value:450}
        	];
           	if(data!=null&&data!=''&&data.length>0){
           		var legendData=[],seriesData=[];
           		for(var i in data){
           			legendData.push(data[i].name);
           			seriesData.push({name: data[i].name,value: data[i].value});
           		}
           		var travelWayInfoOption={
					color: ['rgb(143,195,32)','rgb(216,83,84)','rgb(61,162,204)','rgb(242,145,74)','rgb(248,107,80)','rgb(243,233,37)','rgb(199,140,168)','rgb(106,226,180)'],
					title: {
						show: false,
						text: '出行方式',
						x: 'center',
						y: '10%',
						textStyle: {
							fontSize:16,
							fontWeight:'normal',
							color:'#fff'
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						//orient: 'vertical',
						//left: 'left',
						bottom: 'bottom',
						itemWidth: 10,			
						itemHeight: 8,
						data: legendData,
						textStyle:{
							color:'#6dd1f5'
						}
					},
					series: [
						{
							name: '中心圆',
							type: 'pie',
							radius: '31%',
							center: ['50%', '45%'],
							data: [{name: '1',value: 100}],
							hoverAnimation: false,
							tooltip: {show: false},
							label:{
								normal: {show: false}
							},
							itemStyle: {
							    normal: {
							        color: 'rgb(41, 85, 132)'
							    }
							}
						},{
							name: '边线1',
							type: 'pie',
							radius: ['65%','65.5%'],
							center: ['50%', '45%'],
							startAngle: 108,
							data: [
							    {name: '1',value: 25,itemStyle: {normal: {color: "rgba(0,0,0,0)"}}},
							    {name: '2',value: 100,itemStyle: {normal: {color: "rgb(74,132,182)"}}},
							    {name: '3',value: 25,itemStyle: {normal: {color: "rgba(0,0,0,0)"}}},
							    {name: '4',value: 100,itemStyle: {normal: {color: "rgb(143,195,32)"}}}
							],
							hoverAnimation: false,
							tooltip: {show: false},
							label:{normal: {show: false}}
						},{
							name: '边线2',
							type: 'pie',
							radius: ['75%','75.5%'],
							center: ['50%', '45%'],
							startAngle:164,
							data:[
							    {name: '1',value: 100,itemStyle: {normal: {color: "rgb(61,162,204)"}}},
							    {name: '2',value: 25,itemStyle: {normal: {color: "rgba(0,0,0,0)"}}},
							    {name: '3',value: 100,itemStyle: {normal: {color: "rgb(242,145,74)"}}},
							    {name: '4',value: 25,itemStyle: {normal: {color: "rgba(0,0,0,0)"}}}
							    ],
							hoverAnimation: false,
							tooltip: {show: false},
							label: {normal: {show: false}}
						},{
							name: '边线3',
							type: 'pie',
							radius: ['85%','85.5%'],
							center: ['50%', '45%'],
							data: [{name: '1',value: 100}],
							hoverAnimation: false,
							tooltip: {show: false},
							label: {normal: {show: false}},
							itemStyle: {
							    normal: {
							        color: 'rgb(174, 86, 128)'
							    }
							}
						},{
							name: '访问来源',
							type: 'pie',
							radius: ['30%','55%'],
							center: ['50%','45%'],
							data:seriesData,
							label: {
							    normal: {
							        position: 'inside',
							        formatter: '{d}%'
							    }
							},
							labelLine: {
							    normal: {
							        show: false
							    },
							    emphasis: {
							        show: false
							    }
							},
							itemStyle: {
							    emphasis: {
							        shadowBlur: 16,
							        shadowOffsetX: 0,
							        shadowColor: 'rgba(0, 0, 0, 0.5)'
							    }
							}
						}
					]
				};	
				travelWayInfo.setOption(travelWayInfoOption);
				$("#travelWayInfo").addClass("animated slideInLeft");
           	}else{
				travelWayInfo=null,travelWayInfoOption=null;
				$("#travelWayInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){travelWayInfo=null,travelWayInfoOption=null;console.log("出行方式查询错误！");}
	});
}
function createRankTable(data){
	var htmlStr="";
	if(data!=null&&data.length>0){
		for(var i in data){
			htmlStr+='<div class="w_95 h_48px ys_table_row ys_table_row_bk">'
			htmlStr+='<div class="d_tc w_15"><span class="sort_num h24 br4 '+(data[i].rn>3?'ys_other':'')+'">'+data[i].rn+'</span></div>'
			htmlStr+='<div class="d_tc w_85">'
			htmlStr+='<div class="w_90 h_24px ta_l shop_name">'+data[i].scenic_name+'</div>'
			htmlStr+='<div class="w_90 h_24px">'
			htmlStr+='<span class="f_l shop_val">漫入用户:'+data[i].in_count+'</span>'
			htmlStr+='<span class="f_r shop_val">漫出用户:'+data[i].out_count+'</span>'
			htmlStr+='</div></div></div>'
		}
	}
	return htmlStr;
}
function loadScenicRank(){
	$("#scenicRank").html("");
	$("#scenicRank").removeClass("animated zoomIn");
	$.ajax({
		url : "business/easyPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		{rn: 1,scenic_name: '青海湖景区',in_count: 2313,out_count:3242},
        		{rn: 2,scenic_name: '坎布拉国家森林',in_count: 2322,out_count:3634},
        		{rn: 3,scenic_name: '孟达天池',in_count: 3243,out_count:3243},
        		{rn: 4,scenic_name: '门源',in_count: 453,out_count:632},
        		{rn: 5,scenic_name: '黑马河',in_count: 843,out_count:324},
        		{rn: 7,scenic_name: '门源',in_count: 453,out_count:632},
        		{rn: 8,scenic_name: '黑马河',in_count: 843,out_count:324},
        		{rn: 9,scenic_name: '门源',in_count: 453,out_count:632},
        		{rn: 10,scenic_name: '黑马河',in_count: 843,out_count:324}
        	];
           	if(data!=null&&data!=''&&data.length>0){
           		$("#scenicRank").html(createRankTable(data));
				$("#scenicRank").addClass("animated zoomIn");
           	}else{
				$("#scenicRank").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
		 	}
        },
        error : function(result){console.log("景点信息查询错误！");}
	});
}
function loadInRankInfo(){
	if(inRankInfo==null){
		inRankInfo = echarts.init(document.getElementById('inRankInfo'));
	}
	$("#inRankInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		{rn: 1,provice_name: '甘肃',in_count: 2313},
        		{rn: 2,provice_name: '宁夏',in_count: 2322},
        		{rn: 3,provice_name: '四川',in_count: 3243},
        		{rn: 4,provice_name: '陕西',in_count: 453},
        		{rn: 5,provice_name: '海南',in_count: 843},
        		{rn: 6,provice_name: '新疆',in_count: 733},
        		{rn: 7,provice_name: '内蒙古',in_count: 234},
        		{rn: 8,provice_name: '黑龙江',in_count: 845},
        		{rn: 9,provice_name: '北京',in_count: 234},
        		{rn: 10,provice_name: '重庆',in_count: 845}
        	];
           	if(data!=null&&data!=''&&data.length>0){
        		var axisData=[],seriesData=[];
        		for(var i in data){
        			axisData.push(data[i].provice_name);
        			seriesData.push(data[i].in_count);
        		}        		
        		inRankInfoOption={        			
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
				    title: {
				    	show: true,
				    	left: 'center',
				    	top: 'top',
				        text: '入省排行(万)',
				        textStyle: {
				        	color: '#fcfcfc',
				        	fontSize: 16,
				        	fontWeight: 'normal'
				        }
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    grid: {
				        top: 48,
				        bottom: 16,
				        right: 8,
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'value',
							splitLine: {
							    show: true,
							    lineStyle: {
							        color: '#2aa5c7'
							    }
							},
							axisTick: {show: false},
							axisLine: {show: false},
							axisLabel: {
							    show: false,
							    textStyle: {
							        color: '#FCFCFC'
							    }
							}
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            boundaryGap : true,
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
							},
				            data : axisData
				        }
				    ],
				    series : [
				        {
				            name: '入省',
				            type: 'bar',
				            //barWidth: 12,
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
									color: 'rgb(25,73,157)',
									barBorderRadius: 6,
									opacity: 1
								},
								emphasis: {
								    opacity: 0.5
								}
							},
				            areaStyle: {normal: {color: '#5076b4',opacity: 0.2}},
				            data: seriesData
				        }
				    ]
				};
				inRankInfo.setOption(inRankInfoOption);
				$("#inRankInfo").addClass("animated slideInLeft");
			}else{
				inRankInfo=null,inRankInfoOption=null;
				$("#inRankInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){inRankInfo=null,inRankInfoOption=null;console.log("入省排行查询错误！");}
	});
}
function loadOutRankInfo(){
	if(outRankInfo==null){
		outRankInfo = echarts.init(document.getElementById('outRankInfo'));
	}
	$("#outRankInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[
        		{rn: 1,provice_name: '甘肃',out_count: 2313},
        		{rn: 2,provice_name: '宁夏',out_count: 2322},
        		{rn: 3,provice_name: '四川',out_count: 3243},
        		{rn: 4,provice_name: '陕西',out_count: 453},
        		{rn: 5,provice_name: '海南',out_count: 843},
        		{rn: 6,provice_name: '新疆',out_count: 733},
        		{rn: 7,provice_name: '内蒙古',out_count: 234},
        		{rn: 8,provice_name: '黑龙江',out_count: 845},
        		{rn: 9,provice_name: '北京',out_count: 234},
        		{rn: 10,provice_name: '重庆',out_count: 845}
        	];
           	if(data!=null&&data!=''&&data.length>0){
        		var axisData=[],seriesData=[];
        		for(var i in data){
        			axisData.push(data[i].provice_name);
        			seriesData.push(data[i].out_count);
        		}        		
        		outRankInfoOption={        			
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
				    title: {
				    	show: true,
				    	left: 'center',
				    	top: 'top',
				        text: '出省排行(万)',
				        textStyle: {
				        	color: '#fcfcfc',
				        	fontSize: 16,
				        	fontWeight: 'normal'
				        }
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    grid: {
				        top: 48,
				        bottom: 16,
				        right: 8,
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'value',
							splitLine: {
							    show: true,
							    lineStyle: {
							        color: '#2aa5c7'
							    }
							},
							axisTick: {show: false},
							axisLine: {show: false},
							axisLabel: {
							    show: false,
							    textStyle: {
							        color: '#FCFCFC'
							    }
							}
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            boundaryGap : true,
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
							},
				            data : axisData
				        }
				    ],
				    series : [
				        {
				            name:'出省',
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
									color: 'rgb(243,139,140)',
									barBorderRadius: 6,
									opacity: 1
								},
								emphasis: {
								    opacity: 0.5
								}
							},
				            areaStyle: {normal: {color: '#5076b4',opacity: 0.2}},
				            data: seriesData
				        }
				    ]
				};
				outRankInfo.setOption(outRankInfoOption);
				$("#outRankInfo").addClass("animated slideInLeft");
			}else{
				outRankInfo=null,outRankInfoOption=null;
				$("#outRankInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){outRankInfo=null,outRankInfoOption=null;console.log("出省排行查询错误！");}
	});
}
function loadOtherModule(){
	loadKeywordsInfo();
	loadAgeInfo();
	loadSexInfo();
	loadChinaMapInfo();
	loadRoamuserCount();
	loadContainsInfo();
	loadUserFlowCount();
	loadAppInfo();
	loadTravelWayInfo();
	loadScenicRank();
	loadInRankInfo();
	loadOutRankInfo();
}
$(function(){
//页面函数加载
	//节日选择			
	$("a[id^='title_']").click(function(){
		var id=$(this).attr('id');
		var festival=id.substring(6);
		$("a[id^='title_']").each(function(){
			$(this).removeClass('checked');
		});
		$(this).addClass('checked');
		loadOtherModule();
	});
	loadEcharts({
		chinaMap: true,
		qhMap: true,
		mapExtend: true,
		pageFunc: function(){
			loadMapInfo();
			loadKeywordsInfo();
			loadAgeInfo();
			loadSexInfo();
			loadChinaMapInfo();
			loadRoamuserCount();
			loadContainsInfo();
			loadUserFlowCount();
			loadAppInfo();
			loadTravelWayInfo();
			loadScenicRank();
			loadInRankInfo();
			loadOutRankInfo();
		}
	});
}) 
