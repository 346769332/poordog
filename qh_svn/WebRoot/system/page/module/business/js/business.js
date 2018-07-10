/* 文件：business.js
 * 作者：Lyndon
 * 功能描述：business.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption=null;
var localMapInfo=null;localMapInfoOption=null;
var detailsInfo=null,detailsInfoOption=null;
var latnName='',areaName='';
function createTableJfy(data){
	var htmlStr="";
	if(data!=null&&data.length>0){
		for(var i in data){
			htmlStr+='<div class="w_95 h_48px ys_table_row ys_table_row_bk">'
			htmlStr+='<div class="d_tc w_15"><span class="sort_num h24 br4 '+(data[i].rn>3?'ys_other':'')+'">'+data[i].rn+'</span></div>'
			htmlStr+='<div class="d_tc w_85">'
			htmlStr+='<div class="w_90 h_24px ta_l shop_name">'+data[i].store_name+'</div>'
			htmlStr+='<div class="w_90 h_24px">'
			htmlStr+='<span class="f_l shop_val">交易笔数:'+data[i].jfy_count+'</span>'
			htmlStr+='<span class="f_r shop_val">交易金额:'+data[i].jfy_amount+'</span>'
			htmlStr+='</div></div></div>'
		}
	}
	return htmlStr;
}
function createTableYzf(data){
	var htmlStr="";
	if(data!=null&&data.length>0){
		for(var i in data){
			var lh=40,cs='ys_table_row_br';
			if(i==0){
				lh=64,cs='ys_table_row_bk';
			}else{
				if(i==data.length-1){
					cs='';
				}
			}
			htmlStr+='<div class="w_95 h_'+lh+'px ys_table_row '+cs+'">';
			htmlStr+='<div class="d_tc w_15"><span class="sort_num h24 m_0a">'+data[i].rn+'</span></div>'
			htmlStr+='<div class="d_tc w_85">'
			htmlStr+='<div class="w_90 h_24px ta_l shop_name">'+data[i].store_name+'</div>'
			if(i==0){	
				htmlStr+='<div class="w_90 h_20px">';
				htmlStr+='<span class="f_l shop_val">交易笔数</span>';
				htmlStr+='<span class="f_r shop_val">交易金额</span></div>';
				htmlStr+='<div class="w_90 h_20px">';
				htmlStr+='<span class="f_l shop_val fz_16 fw_b yellow">'+data[i].yzf_count+'笔</span>';
				htmlStr+='<span class="f_r shop_val fz_16 fw_b yellow">'+data[i].yzf_amount+'元</span>';
			}else{
				htmlStr+='<div class="w_90 h_16px">'
				htmlStr+='<span class="f_l shop_val">交易笔数:'+data[i].yzf_count+'笔</span>'
				htmlStr+='<span class="f_r shop_val">交易金额:'+data[i].yzf_amount+'元</span>'
			}
			htmlStr+='</div></div></div>'
		}
	}
	return htmlStr;
}
function createTableFzl(data){
	var htmlStr="";
	if(data!=null&&data.length>0){
		for(var i in data){			
			htmlStr+='<div class="w_95 h_32px ys_table_row m_12">'
			htmlStr+='<div class="d_tc w_15"><span class="sort_num h24 br4 '+(data[i].rn>3?'ys_other':'')+'">'+data[i].rn+'</span></div>'
			htmlStr+='<div class="d_tc w_85">'
			htmlStr+='<div class="w_90 h_16px ta_l">'
			htmlStr+='<span class="shop_val">'+data[i].store_name+'</span>'
			htmlStr+='</div>'
			htmlStr+='<div class="w_90 h_16px ta_l">'
			htmlStr+='<span class="shop_val">[移动：'+data[i].yd_num+'户,宽带：'+data[i].kd_num+'户,融合：'+data[i].rh_num+'户]</span>'
			htmlStr+='</div></div></div>'
		}
	}
	return htmlStr;
}
//联通交易额加载
function loadTradeInfo(){
	$("#roll_num_trade").find("i").css("background-position","0 0");
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
           	if(data!=null&&data.length>0){
           		numberRollAnimation('roll_num_trade',data[0].reach_value,9,',',64);
			}
        },
        error : function(result){console.log("4G用户到达数查询错误！");}
	});
}
function loadJfyShop(){
	$.ajax({
		url : "business/easyPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		$("#jfyInfo").html(createTableJfy(data));
           	}else{
				$("#jfyInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
		 	}
        },
        error : function(result){console.log("交费易信息查询错误！");}
	});
}

function loadYzfShop(){
	$.ajax({
		url : "business/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	/*
        	data=[
        		{rn:1,shop_name:'受乐赵家寺综合商店',count:5533,sum_val:5000},
        		{rn:2,shop_name:'受乐赵家寺综合商店',count:2003,sum_val:5000},
        		{rn:3,shop_name:'受乐赵家寺综合商店',count:2003,sum_val:5000},
        		{rn:4,shop_name:'受乐赵家寺综合商店',count:2003,sum_val:5000}
        	];*/
           	if(data!=null&&data!=''&&data.length>0){
           		$("#yzfInfo").html(createTableYzf(data));
           	}else{
				$("#yzfInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
		 	}
        },
        error : function(result){console.log("翼支付信息查询错误！");}
	});
}
function loadFzlShop(){
	$.ajax({
		url : "business/develop.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	/*
        	data=[
        		{rn:1,prifx_head:'夏琼北路合作营业厅(新)',prifx_end:'[移动:48户,宽带:23户]'},
        		{rn:2,prifx_head:'夏琼北路合作营业厅(新)',prifx_end:'[移动:48户,宽带:23户]'},
        		{rn:3,prifx_head:'夏琼北路合作营业厅(新)',prifx_end:'[移动:48户,宽带:23户]'},
        		{rn:4,prifx_head:'夏琼北路合作营业厅(新)',prifx_end:'[移动:48户,宽带:23户]'},
        		{rn:5,prifx_head:'夏琼北路合作营业厅(新)',prifx_end:'[移动:48户,宽带:23户]'}
        	];*/
           	if(data!=null&&data!=''&&data.length>0){
           		$("#fzlInfo").html(createTableFzl(data));
           	}else{
				$("#fzlInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
		 	}
        },
        error : function(result){console.log("发展量信息查询错误！");}
	});
}
function loadFzlCount(){
	$("#roll_num_fzl").find("i").css("background-position","0 0");
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
           	if(data!=null&&data.length>0){
           		numberRollAnimation('roll_num_fzl',data[0].reach_value,7,'',32);
			}
        },
        error : function(result){console.log("发展量总数查询错误！");}
	});
}
//地图加载
function loadMapInfo(){
	if(areaName==''){
		mapInfo = echarts.init(document.getElementById('mapInfo'));
		$("#mapInfo").removeClass("animated slideInUp");
	}
	$.ajax({
		url : "business/map.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
  		type: 'post',
        dataType : "json",
        success : function(data){
	 		var pointData=[],seriesData=null;
			var titleFlag=false,lengedFlag=false;
			var titleText='',mapType='青海省';
           	if(data!=null&&data.length>0){
			    for(var i=0;i<data.length;i++){
			    	pointData.push({name:data[i].store_name,value: data[i].coordinate_id.split(',').concat([data[i].yzf_amount])});
			    }
			}
			if(latnName!=''){
				titleFlag=true;
				lengedFlag=true;
				mapType=latnName;
				if(areaName!=''){
					titleText=areaName;
					if(mapInfoOption!=null){
						mapInfo.setOption({title: {text: titleText},series: [{data: pointData}]});
						return true;
					}
				}else{
					titleText=latnName;
					seriesData=[{
						name: '返回',
						type: 'effectScatter',
						itemStyle:{
							normal:{
								color:'rgba(255,255,0,0.4)',
							}
						},
						coordinateSystem: 'geo',
				        zlevel: 2,
				        rippleEffect: {
				            brushType: 'stroke'
				        },
				        label: {
				            normal: {
				                show: false,
				                position: 'right',
				                formatter: '{b}'
				            },
							emphasis:{
								show: true,
				                position: 'right',
				                formatter: function (param) {
				                	return param.name+'\n'+param.value[2];
				            		//console.log(param);
				            	}
							}
				        },
				        symbolSize: function (val) {
				            return 8;//val[2] / 8;
				        },
	        			data: pointData
					}];
				}
			}else{				
				seriesData=[{
					name: '本地网',
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
				},{
					name: '返回',
					type: 'effectScatter',
					itemStyle:{
						normal:{
							color:'rgba(255,255,0,0.4)',
						}
					},
					coordinateSystem: 'geo',
			        zlevel: 2,
			        rippleEffect: {
			            brushType: 'stroke'
			        },
			        label: {
			            normal: {
			                show: false,
			                position: 'right',
			                formatter: '{b}'
			            },
						emphasis:{
							show: true,
			                position: 'right',
			                formatter: function (param) {
			                	return param.name+'\n'+param.value[2];
			            		//console.log(param);
			            	}
						}
			        },
			        symbolSize: function (val) {
			            return 8;//val[2] / 8;
			        },
        			data: pointData
				}];
			}
			mapInfoOption = {
				title : {
					show: titleFlag,
					text: titleText,
					left: 'center',
					top: 'top',
					textStyle: {
						color: '#0000ff'
					}
				},
				tooltip : {
					trigger: 'item',
					show:false
				},
				legend:{
					show: legendFlag,
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
				geo: {
					map: mapType,
					selectedMode: 'single',
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
				series: seriesData
			};
			mapInfo.setOption(mapInfoOption);
			$("#mapInfo").addClass("animated slideInDown");
			mapInfo.on('mapselectchanged', function(params){
				if(latnName!=''){
					areaName=params.name;
					loadOtherModule();
				}else{
					latnName=params.name;
					loadOtherModule();
				}
			});
			mapInfo.on('legendselectchanged', function(params){
				if(areaName!=''){
					areaName='';
					loadOtherModule();
				}else{
					window.location.reload();
				}
			});
        },
        error : function(result){console.log("地图商铺查询错误！");}
	});
}
function loadDetailsInfo(){
	if(detailsInfo==null){
		detailsInfo=echarts.init(document.getElementById('detailsInfo'));
	}
	$("#detailsInfo").removeClass("animated slideInDown");
	$.ajax({
		url : "wingPay/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	data=[0];
           	if(data!=null&&data!=''&&data.length>0){
           		var cData=[],gData=[],jData=[],qData=[];
           		var testOther={value: 40,name: 'other',itemStyle: {normal: {borderWidth: 0}}};
           		cData.push({value: 75,name: '累计商户'});
           		cData.push(testOther);
           		gData.push({value: 75,name: '新增商户'});
           		gData.push(testOther);
           		jData.push({value: 75,name: '缴费累计'});
           		jData.push(testOther);
           		qData.push({value: 75,name: '业务受理'});
           		qData.push(testOther);
				if(detailsInfoOption!=null){					
					detailsInfo.setOption({
						series: [{data: cData},{data: gData},{data: jData},{data: qData}]
					});
					return true;
				}
				detailsInfoOption = {
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
				        name: '累计商户',
				        type: 'pie',
				        center: ['12%','55%'],
				        radius: ['83%','85%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(252,202,69)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(252,202,69)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='累计商户'){
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
				        data: cData
				    },{
				        name: '新增商户',
				        type: 'pie',
				        center: ['37%','55%'],
				        radius: ['83%','85%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(99,183,33)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(99,183,33)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='新增商户'){
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
				        data: gData
				    },{
				        name: '缴费累计',
				        type: 'pie',
				        center: ['62%','55%'],
				        radius: ['83%','85%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(35,184,182)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(35,184,182)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='缴费累计'){
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
				        data: jData
				    },{
				        name: '业务受理',
				        type: 'pie',
				        center: ['87%','55%'],
				        radius: ['83%','85%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "rgb(34,112,184)",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: 'rgb(34,112,184)'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name=='业务受理'){
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
				        data: qData
				    }]
				};
				detailsInfo.setOption(detailsInfoOption);
		    	$("#detailsInfo").addClass("animated slideInDown");
           	}else{
           		detailsInfo=null,detailsInfoOption=null;
				$("#detailsInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
		 	}
        },
        error : function(result){detailsInfo=null,detailsInfoOption=null;console.log("地图附加信息查询错误！");}
	});
}
function loadOtherModule(){	
	loadTradeInfo();
	loadJfyShop();
	loadMapInfo();
	loadDetailsInfo();
	loadYzfShop();
	loadFzlShop();
	loadFzlCount();
}
//页面函数加载
loadEcharts({
	chinaMap: false,
	qhMap: true,
	mapExtend: true,
	pageFunc: function(){
		loadTradeInfo();
		loadJfyShop();
		loadMapInfo();
		loadDetailsInfo();
		loadYzfShop();
		loadFzlShop();
		loadFzlCount();
	}
});