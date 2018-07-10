/* 文件：qhTravel.js
 * 作者：Lyndon
 * 功能描述：qhTravel.js的各个模块加载函数
 */

//echarts图表加载
/*var player = new MediaElementPlayer('#videoInfo',
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
);*/
/*player.load();
player.play();*/

var latnName='',areaName='';
//定时
var userTimer=null;

loadEcharts({
	chinaMap: true,
	qhMap: true,
	mapExtend: false,
	pageFunc: function(){
		loadUserInfo();//客流
		inproTraInfo();//省内客流
		outproTraInfo();//省外客流
		
		loadBrandInfo();
		loadAppInfo();
		loadScenicMapInfo();
		loadScenicInfo();
		loadTrailInfo();//客流轨迹
		//loadRankInfo();//景区排名
		loadScenicRankTable();
	}
});
function inproTraInfo(){
	var inproTraInfo=echarts.init(document.getElementById('inproTra'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){        	
           	if(data!=null&&data!=''&&data.length>0){
           		
           		//$("#sumintra").text("xxxxxxxx");
				var inproTraOption = {
					title: {
		    			show: false,
				        text: '省内客流'
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
				                color: '#9AC0CD'
				            }
				        },
				        data:['西宁','海东','海西','海北','海南','玉树','黄南','果洛','格尔木']
				    },
				    series: [
				        {
				            type: 'bar',
				            barWidth:12,
					        label: {
					            normal: {
					                show: true,
					                textStyle:{
					                    fontSize: 12,
					                    color: '#9AC0CD'
					                    //fontWeight: "bold"
					                },
					                //position: 'insideRight'
					                position: 'right'
					            }
					        },
				            itemStyle: {
				                normal: {
				                	color: 'rgb(64,224,205)',
				                	barBorderRadius:8
				                }
				            },
				            data: [2000,1450,1100,950,800,640,500,400,300],
				            animation: true
				        }
				    ]
				};
				inproTraInfo.setOption(inproTraOption);
           	}else{
				$("#inproTraInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
        	inproTraInfo.dispose();
			$("#inproTraInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}
function outproTraInfo(){
	var outproTraInfo=echarts.init(document.getElementById('outproTra'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		var cdata = [];
           		var alldata =[];
           		var t=0;
           		alldata =[{ value: 35,name: '陕西'},{ value: 70,name: '上海' },{ value: 25,name: '甘肃'},{value: 25,name: '北京'},{ value: 25,name: '河南'}];

           		cdata = ['陕西','上海','甘肃','北京','河南'];
				var outproTraOption = {
					title: {
				        text: 'TOP5分布',
				        textStyle: {
				            color: '#FFFFFF'
				        },
				        x:35,
				        y:'center'
					},
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        orient : 'vertical',
				        data:cdata,
					    textStyle:{
		                    fontSize:12,
		                    fontWeight:'bolder',
		                    color:'#cccccc'
		                },
		                x : 'right',
		                formatter: function (name) {
		                	var sum=0
			                for(var i=0;i<alldata.length;i++){
			                	  sum+=alldata[i].value;
			                  }
		                	var n=alldata[t].name;
		                	var u=((alldata[t].value/sum)*100).toFixed(1);
		                	t++;
		                	return n+"  "+u+"%";
		                  
		                }
				    },
				    series: [ {
				        name: '省外人数',
				        type: 'pie',
				        radius: ['70%', '80%'],
				        center: ['30%', '50%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        label: {
				            normal: {
				                show: false,
				                textStyle:{
				                    fontSize: 12,
				                    color: '#FFFFFF'
				                    //fontWeight: "bold"#5922AA
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
				        data:alldata
				    }]
				};
				outproTraInfo.setOption(outproTraOption);
           	}else{
				$("#outproTra").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){
        	outproTraInfo.dispose();
			$("#outproTra").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
        }
	});
}

function loadBrandInfo(){
	var brandInfo=echarts.init(document.getElementById('brandInfo'));
	$.ajax({
		url : "operation/user.do",
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
				       	//shape:'smooth',
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

function loadAppInfo(){
	var appInfo=echarts.init(document.getElementById('class_appInfo'));
	$.ajax({
		url : "operation/user.do",
        dataType : "json",
  		type: 'post',
        success : function(data){
        	var axisData=[],ayisData=[],bigData=[];allData=[];
       		ayisData=['淘宝','天猫','京东','qq','微信','饿了么','携程','去哪儿'];
       		axisData=['1','2','3','4','5'];
       		allData=[['淘宝',0,7],['淘宝',1,5],['淘宝',2,6],['淘宝',3,8],['淘宝',4,10],['淘宝',5,10],['淘宝',4,0],['淘宝',2,0],
       		      ['天猫',0,1],['天猫',1,1],['天猫',2,0],['天猫',3,0],['天猫',4,0],['天猫',5,0],['天猫',6,0],['天猫',7,0],['天猫',1,0],
       		   ['京东',0,7],['京东',1,3],['京东',2,0],['京东',3,0],['京东',4,0],['京东',5,0],['京东',6,0],['京东',4,0],['京东',2,1]
       		,['qq',0,7],['qq',1,3],['qq',2,0],['qq',3,0],['qq',4,0],['qq',5,0],['qq',6,0],['qq',5,0],['qq',4,1],
       		['微信',0,7],['微信',1,5],['微信',2,6],['微信',3,8],['微信',4,10],['微信',5,10],['微信',4,0],['微信',2,0],
       		['饿了么',0,7],['饿了么',1,5],['饿了么',2,6],['饿了么',3,8],['饿了么',4,10],['饿了么',5,10],['饿了么',4,0],['饿了么',2,0],
       		['携程',0,7],['携程',1,5],['携程',2,6],['携程',3,8],['携程',4,10],['携程',5,10],['携程',4,0],['携程',2,0],
       		['去哪儿',0,7],['去哪儿',1,5],['去哪儿',2,6],['去哪儿',3,8],['去哪儿',4,10],['去哪儿',5,10],['去哪儿',4,0],['去哪儿',2,0]
       		];
       		allData = allData.map(function (item) {
       		      return [item[1], item[0], item[2]];
       		 });
           	if(data!=null&&data!=''&&data.length>0){
           		/*for(var i in data){
           			axisData.push(data[i].x);
           			ayisData.push(data[i].y);
           			bigData.push(data[i].v);
           			allData.push(data[i].y,data[i].x,data[i].v);
           		}*/
				var appInfoOption = {
						 title: {
						        text: ''
						    },
						    /*tooltip: {
						        position: 'top'
						    },*/
						    grid: {
						        left: 2,
						        bottom: 10,
						        right: 10,
						        containLabel: true
						    },
						    xAxis: {
						        type: 'category',
						        data: axisData,
						        axisLine: {
						            show: true
						        },
						        axisLabel: {
					            textStyle: {
					                color: '#9AC0CD'
					            }
					        }
						    },
						    yAxis: {
						        type: 'category',
						        data: ayisData
						        /*,splitLine: {
						            show: true
						            ,lineStyle: {
						                color: '#ddd',
						                type: 'dashed'
						            }}*/
						        ,
							    axisLabel: {
						            textStyle: {
						                color: '#9AC0CD'
						            }
						        }
						    },
						    series: [{
						        name: 'Punch Card',
						        type: 'scatter',
						        symbolSize: function (val) {
						            return val[2] * 2;
						        },
						        itemStyle : {normal : {color:'#573CC4'}},
						        data: allData
						    }]
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
function loadUserInfo(){
    $("#roll_num_travel").find("i").css("background-position","0 0");
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
           	if(data!=null&&data.length>0){
           		$("#user").text("青海湖");
           		
           		numberRollAnimation('roll_num_travel',data[0].reach_value,7,'',32);
			}
        },
        error : function(result){console.log("4G用户到达数查询错误！");}
	});
}
function loadScenicMapInfo(){
	var scenicMapInfo=echarts.init(document.getElementById('scenicMapInfo'));	
	var scenicMapInfoOption={
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
			top:'20%',
			bottom:'20%',
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
function loadTrailInfo(){
	var trailInfo=echarts.init(document.getElementById('mutil_trailInfo'));
	$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		var name =[];var value=[];
           		var data = [
              		         {name: '海门', value: 119},
              		         {name: '鄂尔多斯', value: 212},
              		         {name: '招远', value: 612},
              		         {name: '舟山', value: 512}
              		    ];
           		/*for(var i in data){
           			name.push(data[i].name);
           			value.push(data[i].value);
           			data.push({name: data[i].name, value: data[i].value});
           		}*/
           		
           		    var geoCoordMap = {
           		        '海门':[121.15,31.89],
           		        '鄂尔多斯':[109.781327,39.608266],
           		        '招远':[120.38,37.35],
           		        '舟山':[122.207216,29.985295],
           		        '齐齐哈尔':[123.97,47.33],
           		        '盐城':[120.13,33.38],
           		        '赤峰':[118.87,42.28],
           		        '青岛':[120.33,36.07],
           		        '乳山':[121.52,36.89],
           		        '金昌':[102.188043,38.520089],
           		        '泉州':[118.58,24.93],
           		        '莱西':[120.53,36.86],
           		        '日照':[119.46,35.42],
           		        '胶南':[119.97,35.88],
           		        '南通':[121.05,32.08],
           		        '拉萨':[91.11,29.97],
           		        '云浮':[112.02,22.93],
           		        '梅州':[116.1,24.55],
           		        '文登':[122.05,37.2],
           		        '上海':[121.48,31.22],
           		        '攀枝花':[101.718637,26.582347],
           		        '威海':[122.1,37.5],
           		        '承德':[117.93,40.97],
           		        '厦门':[118.1,24.46],
           		        '汕尾':[115.375279,22.786211],
           		        '潮州':[116.63,23.68],
           		        '丹东':[124.37,40.13],
           		        '太仓':[121.1,31.45],
           		        '曲靖':[103.79,25.51],
           		        '烟台':[121.39,37.52],
           		        '福州':[119.3,26.08],
           		        '瓦房店':[121.979603,39.627114],
           		        '即墨':[120.45,36.38],
           		        '抚顺':[123.97,41.97],
           		        '玉溪':[102.52,24.35],
           		        '张家口':[114.87,40.82],
           		        '阳泉':[113.57,37.85],
           		        '莱州':[119.942327,37.177017],
           		        '湖州':[120.1,30.86],
           		        '汕头':[116.69,23.39],
           		        '昆山':[120.95,31.39],
           		        '宁波':[121.56,29.86],
           		        '湛江':[110.359377,21.270708],
           		        '揭阳':[116.35,23.55],
           		        '荣成':[122.41,37.16],
           		        '连云港':[119.16,34.59],
           		        '葫芦岛':[120.836932,40.711052],
           		        '常熟':[120.74,31.64],
           		        '东莞':[113.75,23.04],
           		        '河源':[114.68,23.73],
           		        '淮安':[119.15,33.5],
           		        '泰州':[119.9,32.49],
           		        '南宁':[108.33,22.84],
           		        '营口':[122.18,40.65],
           		        '惠州':[114.4,23.09],
           		        '江阴':[120.26,31.91],
           		        '蓬莱':[120.75,37.8],
           		        '韶关':[113.62,24.84],
           		        '嘉峪关':[98.289152,39.77313],
           		        '广州':[113.23,23.16],
           		        '延安':[109.47,36.6],
           		        '太原':[112.53,37.87],
           		        '清远':[113.01,23.7],
           		        '中山':[113.38,22.52],
           		        '昆明':[102.73,25.04],
           		        '寿光':[118.73,36.86],
           		        '盘锦':[122.070714,41.119997],
           		        '长治':[113.08,36.18],
           		        '深圳':[114.07,22.62],
           		        '珠海':[113.52,22.3],
           		        '宿迁':[118.3,33.96],
           		        '咸阳':[108.72,34.36],
           		        '铜川':[109.11,35.09],
           		        '平度':[119.97,36.77],
           		        '佛山':[113.11,23.05],
           		        '海口':[110.35,20.02],
           		        '江门':[113.06,22.61],
           		        '章丘':[117.53,36.72],
           		        '肇庆':[112.44,23.05],
           		        '大连':[121.62,38.92],
           		        '临汾':[111.5,36.08],
           		        '吴江':[120.63,31.16],
           		        '石嘴山':[106.39,39.04],
           		        '沈阳':[123.38,41.8],
           		        '苏州':[120.62,31.32],
           		        '茂名':[110.88,21.68],
           		        '嘉兴':[120.76,30.77],
           		        '长春':[125.35,43.88],
           		        '胶州':[120.03336,36.264622],
           		        '银川':[106.27,38.47],
           		        '张家港':[120.555821,31.875428],
           		        '三门峡':[111.19,34.76],
           		        '锦州':[121.15,41.13],
           		        '南昌':[115.89,28.68],
           		        '柳州':[109.4,24.33],
           		        '三亚':[109.511909,18.252847],
           		        '自贡':[104.778442,29.33903],
           		        '吉林':[126.57,43.87],
           		        '阳江':[111.95,21.85],
           		        '泸州':[105.39,28.91],
           		        '西宁':[101.74,36.56],
           		        '宜宾':[104.56,29.77],
           		        '呼和浩特':[111.65,40.82],
           		        '成都':[104.06,30.67],
           		        '大同':[113.3,40.12],
           		        '镇江':[119.44,32.2],
           		        '桂林':[110.28,25.29],
           		        '张家界':[110.479191,29.117096],
           		        '宜兴':[119.82,31.36],
           		        '北海':[109.12,21.49],
           		        '西安':[108.95,34.27],
           		        '金坛':[119.56,31.74],
           		        '东营':[118.49,37.46],
           		        '牡丹江':[129.58,44.6],
           		        '遵义':[106.9,27.7],
           		        '绍兴':[120.58,30.01],
           		        '扬州':[119.42,32.39],
           		        '常州':[119.95,31.79],
           		        '潍坊':[119.1,36.62],
           		        '重庆':[106.54,29.59],
           		        '台州':[121.420757,28.656386],
           		        '南京':[118.78,32.04],
           		        '滨州':[118.03,37.36],
           		        '贵阳':[106.71,26.57],
           		        '无锡':[120.29,31.59],
           		        '本溪':[123.73,41.3],
           		        '克拉玛依':[84.77,45.59],
           		        '渭南':[109.5,34.52],
           		        '马鞍山':[118.48,31.56],
           		        '宝鸡':[107.15,34.38],
           		        '焦作':[113.21,35.24],
           		        '句容':[119.16,31.95],
           		        '北京':[116.46,39.92],
           		        '徐州':[117.2,34.26],
           		        '衡水':[115.72,37.72],
           		        '包头':[110,40.58],
           		        '绵阳':[104.73,31.48],
           		        '乌鲁木齐':[87.68,43.77],
           		        '枣庄':[117.57,34.86],
           		        '杭州':[120.19,30.26],
           		        '淄博':[118.05,36.78],
           		        '鞍山':[122.85,41.12],
           		        '溧阳':[119.48,31.43],
           		        '库尔勒':[86.06,41.68],
           		        '安阳':[114.35,36.1],
           		        '开封':[114.35,34.79],
           		        '济南':[117,36.65],
           		        '德阳':[104.37,31.13],
           		        '温州':[120.65,28.01],
           		        '九江':[115.97,29.71],
           		        '邯郸':[114.47,36.6],
           		        '临安':[119.72,30.23],
           		        '兰州':[103.73,36.03],
           		        '沧州':[116.83,38.33],
           		        '临沂':[118.35,35.05],
           		        '南充':[106.110698,30.837793],
           		        '天津':[117.2,39.13],
           		        '富阳':[119.95,30.07],
           		        '泰安':[117.13,36.18],
           		        '诸暨':[120.23,29.71],
           		        '郑州':[113.65,34.76],
           		        '哈尔滨':[126.63,45.75],
           		        '聊城':[115.97,36.45],
           		        '芜湖':[118.38,31.33],
           		        '唐山':[118.02,39.63],
           		        '平顶山':[113.29,33.75],
           		        '邢台':[114.48,37.05],
           		        '德州':[116.29,37.45],
           		        '济宁':[116.59,35.38],
           		        '荆州':[112.239741,30.335165],
           		        '宜昌':[111.3,30.7],
           		        '义乌':[120.06,29.32],
           		        '丽水':[119.92,28.45],
           		        '洛阳':[112.44,34.7],
           		        '秦皇岛':[119.57,39.95],
           		        '株洲':[113.16,27.83],
           		        '石家庄':[114.48,38.03],
           		        '莱芜':[117.67,36.19],
           		        '常德':[111.69,29.05],
           		        '保定':[115.48,38.85],
           		        '湘潭':[112.91,27.87],
           		        '金华':[119.64,29.12],
           		        '岳阳':[113.09,29.37],
           		        '长沙':[113,28.21],
           		        '衢州':[118.88,28.97],
           		        '廊坊':[116.7,39.53],
           		        '菏泽':[115.480656,35.23375],
           		        '合肥':[117.27,31.86],
           		        '武汉':[114.31,30.52],
           		        '大庆':[125.03,46.58]
           		    };
           		var convertData = function (data) {
           		    var res = [];
           		    for (var i = 0; i < data.length; i++) {
           		        var geoCoord = geoCoordMap[data[i].name];
           		        if (geoCoord) {
           		            res.push({
           		                name: data[i].name,
           		                value: geoCoord.concat(data[i].value)
           		            });
           		        }
           		    }
           		    return res;
           		};
				var trailInfoOption = {
						backgroundColor: '#404a59',
					    title: {
					        
					        left: 'center',
					        textStyle: {
					            color: '#fff'
					        }
					    },
					    tooltip : {
					        trigger: 'item'
					    },
					    legend: {
					        orient: 'vertical',
					        y: 'bottom',
					        x:'right',
					        textStyle: {
					            color: '#fff'
					        }
					    },
					    geo: {
					        map: 'china',
					        label: {
					            emphasis: {
					                show: false
					            }
					        },
					        roam: true,
					        itemStyle: {
					            normal: {
					                areaColor: '#323c48',
					                borderColor: '#111'
					            },
					            emphasis: {
					                areaColor: '#2a333d'
					            }
					        }
					    },
					    series : [
					        {
					        	center: ['50%', '50%'],
					            type: 'scatter',
					            coordinateSystem: 'geo',
					            data: convertData(data),
					            symbolSize: function (val) {
					                return val[2] / 10;
					            },
					            label: {
					                /*normal: {
					                    formatter: '{b}',
					                    //position: 'center',
					                    show: false
					                },*/
					                emphasis: {
					                    show: true
					                }
					            },
					            itemStyle: {
					                normal: {
					                    color: '#ddb926'
					                }
					            }
					        }
					    ]
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
						/*var RankHtml = "";
						for(var i in data){
							RankHtml+='<tr>';
							RankHtml+='<td><span class="br_12">'+data[i].rn+'</span></td>';
							RankHtml+='<td>'+data[i].scenic_name+'</td>';
							RankHtml+='</tr>';
						}*/
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
function loadScenicRankTable(){
	/*$.ajax({
		url : "operation/user.do",
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
				var scenicRankHtml = "";
				for(var i in data){
					scenicRankHtml+='<tr>';
					scenicRankHtml+='<td class="w_5"><span class="br_12">'+data[i].rn+'</span></td>';
					scenicRankHtml+='<td class="w_40">'+data[i].scenic_name+'</td>';
					scenicRankHtml+='<td class="w_20"><div name="star_'+data[i].rn+'_'+data[i].star_value+'"></div></td>';
					scenicRankHtml+='</tr>';
				}
				$("#scenicRankTable table tbody").html(scenicRankHtml);
				$("div[name^='star_']").each(function(){
					var name=$(this).attr('name');
					var index=name.indexOf('_',5);
					var starNum=parseInt(name.substring(index+1));
					//$(this).starRating({initialRating: starNum,starSize: 16,readOnly: true,hoverColor:'#FFFF00'});
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
$("#mutil_scenic").click(function(){
	$("#mutil_scenic").addClass("t_selected_01");
	$("#mutil_trail").removeClass("t_selected_01");
	$("#mutil_scenicInfo").show();
	$("#mutil_trailInfo1").hide();
	$("#mutil_trailInfo").hide();
}
);
$("#mutil_trail").click(function(){
	$("#mutil_trail").addClass("t_selected_01");
	$("#mutil_scenic").removeClass("t_selected_01");
	$("#mutil_scenicInfo").hide();
	$("#mutil_trailInfo1").show();
	$("#mutil_trailInfo").show();
}
);
