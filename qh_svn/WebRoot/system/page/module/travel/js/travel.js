/* 文件：travel.js
 * 作者：Lyndon
 * 功能描述：travel.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption;//地图
var lastRoamInInfo=null,lastRoamInInfoOption;//最近30天漫入人数
var loadFlag=true;
var currentType='',mapTarget='';
//省漫入用户分布加载
function loadUserProviceInfo(param){
	$("#userProviceInfo").removeClass("animated bounceInLeft");
	$.ajax({
		url : "travel/userProvice.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		var tableData=[];
           		for(var i in data){
           			tableData.push({
           				rn:data[i].rn,
           				prov_name:data[i].prov_name,
           				user_count:data[i].user_count,
           				avg_stay_times:data[i].avg_stay_times,
           				start_latn:data[i].start_latn,
           				end_latn:data[i].end_latn
           			});
           		}
           		var userProviceInfoStr=funcGetTableBody(tableData,true,'all');
           		if(userProviceInfoStr!=""&&userProviceInfoStr.length>0){
               		$("#userProviceInfo table tbody").html(userProviceInfoStr);
					$("#userProviceInfo").addClass("animated bounceInLeft");
           		}else{
               		$("#userProviceInfo table tbody").html('<tr><td colspan="6" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#userProviceInfo table tbody").html('<tr><td colspan="6" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});
}
//地图加载
function loadMapInfo(){
    mapInfo = echarts.init(document.getElementById('mapInfo'));
    if(loadFlag){
    	mapInfo.showLoading({text:'数据读取中...'});
    }
	mapInfoOption = {
		//backgroundColor:"rgba(0,0,0,0.1)",
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
								color:"#1ad5de"
							}
						},
						borderColor:'#fdcc65',
						borderWidth:0.5,
						areaStyle:{
							color: 'rgba(0,0,0,0)'
						}
					},
					emphasis:{label:{show:false}}
				},
				selectedMode : 'single',
				mapLocation:{width:'99%'},
				data:[]
			}
		]
	};
	mapInfo.on(ecConfig.EVENT.MAP_SELECTED,function(param){
		var target=param.target;
		if(target!=null&&target!=''){
			mapTarget=(target=="格尔木市"?"格尔木本地网":target);
			if(currentType==''){
				currentType='latn';
				mapInfoOption.legend.show=true;
				mapInfoOption.title.text=target;
				mapInfoOption.title.show=true;
				mapInfoOption.series[0].name=target;
				mapInfoOption.series[0].mapType=target;
				mapInfo.setOption(mapInfoOption,true);
				var pm={'latnName':mapTarget};
				loadUserProviceInfo(pm);
				loadLocalHotLine(pm);
				loadLastRoamInInfo(pm);
				loadScenicRankInfo(pm);
				loadLocalUserInfo(pm);
			}
		}
	});
	mapInfo.on(ecConfig.EVENT.LEGEND_SELECTED,function(param){
		window.location.reload();
	});
	mapInfo.hideLoading();
	mapInfo.setOption(mapInfoOption);
}
function funcMakeLine(data){
	var lineStr="";
	if(data!=null&&data.length>0){
		for(var i in data){
			lineStr+='<div class="line_block">';
			lineStr+='<div class="w_5 fl ac ';
			if(i==0){
				lineStr+='first';
			}
			if(i==1){
				lineStr+='second';
			}
			if(i==2){
				lineStr+='third';
			}
			lineStr+='">'+data[i].rn+'</div>';
			lineStr+='<div class="w_60 fl ac">'+data[i].line_name+'</div>';
			lineStr+='<div class="w_20 fl ac"><div class="topText">漫入人数</div><div class="bottomText">'+data[i].roam_in_count+'<span>人</span></div></div>';
			lineStr+='<div class="w_15 fl ac"><div class="topText">占比</div><div class="bottomText">'+data[i].ratio+'<span>%</span></div></div>';
			lineStr+='</div>';			
		}
	}
	return lineStr;
}
function funcTravelLine(data){
	var lineStr="";
	if(data!=null&&data.length>0){
		for(var i in data){
			var fontColor="";
  			if(data[i].rn=='1'){
  				fontColor='first';
  			}
  			if(data[i].rn=='2'){
  				fontColor='second';
  			}
  			if(data[i].rn=='3'){
  				fontColor='third';
  			}
			lineStr+='<div id="hotTravelLineRoll">';
			lineStr+='<table class="line_block" cellpadding="0" cellspacing="0">';
			lineStr+='<tr><td class="w_10 '+fontColor+' fs12">TOP'+data[i].rn+'</td>';
			lineStr+='<td class="w_50">'+data[i].line_name+'</td>';
			lineStr+='<td class="w_30"><span class="fs12">漫入人数</span><br/>';
			lineStr+='<span class="sp fwb">'+data[i].roam_in_count+'</span><span class="fs12">人</span></td>';
			lineStr+='<td class="width: 10%"><span class="fs12">占比</span><br/>';
			lineStr+='<span class="sp fwb">'+data[i].ratio+'</span><span class="fs12">%</span>';
			lineStr+='</td></tr></table></div>';	
		}
	}
	return lineStr;
}
//本地网热门路线
function loadLocalHotLine(param){
	$.ajax({
		url : "travel/localHotLine.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		var localHotLineStr=funcTravelLine(data);
           		if(localHotLineStr!=""&&localHotLineStr.length>0){
               		$("#localHotLine").html(localHotLineStr);
               		if(data.length>1){
               			rollAnimation(64,1,4000,"localHotLine");
               		}
           		}else{
               		$("#localHotLine").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           		}
           	}else{
               	$("#localHotLine").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){}
	});
}
//旅游热门路线
function loadTravelHotLine(){
	$("#travelHotLine").removeClass("animated slideInRight");
	$.ajax({
		url : "travel/travelHotLine.do",
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		var travelHotLineStr=funcTravelLine(data);
           		if(travelHotLineStr!=""&&travelHotLineStr.length>0){
               		$("#travelHotLine").html(travelHotLineStr);
					$("#travelHotLine").addClass("animated slideInRight");
           		}else{
               		$("#travelHotLine").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           		}
           	}else{
               	$("#travelHotLine").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){}
	});
}
//省最近30天漫入人数
function loadLastRoamInInfo(param){
	lastRoamInInfo = echarts.init(document.getElementById('lastRoamInInfo'));
    if(loadFlag){
    	lastRoamInInfo.showLoading({text:'数据读取中...'});
    }else{
		$("#lastRoamInInfo").removeClass("animated bounceInUp");
    }
	$.ajax({
		url : "travel/lastRoamIn.do",
        data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data.length>0){
           		var axisData=[],seriesData=[];
           		var pointData=[];
           		for(var i in data){
           			axisData.push(data[i].date_no);
           			seriesData.push(data[i].sum_num);
           			pointData.push({xAxis:data[i].date_no,yAxis:data[i].sum_num});
           		}
           		lastRoamInInfoOption={
				    color:['#fec601','#6eb5e6'],
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{x:48,y:32,x2:16,y2:32,borderWidth:'0'},
				    calculable : true,
				    legend: {
				    	show:false,
				    	itemGap:64,
				      	textStyle:{color: '#f6c9d9'},
				        data:['漫入']
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
						data : axisData
					}],
				    yAxis : [{
						type : 'value',
						name : '单位:人',
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
				            name:'漫入',
				            type:'line',
							symbol: 'emptyCircle',
							symbolSize: 3,
							smooth: false,
				            data:seriesData,
                            markPoint : {
                            	//tooltip:{show：false},
				            	symbol:'emptyCircle',
				                symbolSize: function (v){
				                    return 5;
				                },
				                effect : {
				                    show: true,
				                    color : '#ffffff',
				                    shadowBlur : 0
				                },
				                itemStyle:{
				                    normal:{
				                        label:{show:false}
				                    },
				                    emphasis: {
				                        label:{show:false}
				                    }
				                },
				                data : pointData
				           }
				        }
				    ]
				};
				lastRoamInInfo.hideLoading();
			    lastRoamInInfo.setOption(lastRoamInInfoOption);
				$("#lastRoamInInfo").addClass("animated bounceInUp");
			}else{
				lastRoamInInfo.hideLoading();
            	lastRoamInInfo = null;
               	$("#lastRoamInInfo").html('<div style="height: 200px;line-height:200px;color:red;text-align:center;">暂无符合条件的数据！</div>');
			}
        },
        error : function(result){
			lastRoamInInfo.hideLoading();
        }
	});
}
//漫入用户景点排行
function loadScenicRankInfo(param){
	$("#scenicRankInfo").removeClass("animated flipInY");
	$.ajax({
		url : "travel/scenicRank.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		var tableData=[];
           		for(var i in data){
           			tableData.push({'rn':data[i].rn,'belong_scenic':data[i].belong_scenic,'user_count':data[i].user_count,'stay_times':data[i].stay_times});
           		}
           		var scenicRankInfoStr=funcGetTableBody(tableData,true,'all');
           		if(scenicRankInfoStr!=""&&scenicRankInfoStr.length>0){
               		$("#scenicRankInfo table tbody").html(scenicRankInfoStr);
					$("#scenicRankInfo").addClass("animated flipInY");
           		}else{
               		$("#scenicRankInfo table tbody").html('<tr><td colspan="4" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#scenicRankInfo table tbody").html('<tr><td colspan="4" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});
}
//本地网漫入用户信息
function loadLocalUserInfo(param){
	$("#localUserInfo").removeClass("animated bounceInRight");
	$.ajax({
		url : "travel/localUser.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		var tableData=[];
           		for(var i in data){
           			tableData.push({'rn':data[i].rn,'latn_name':data[i].latn_name,'user_count':data[i].user_count,'stay_times':data[i].stay_times});
           		}
           		var localUserInfoStr=funcGetTableBody(tableData,true,'all');
           		if(localUserInfoStr!=""&&localUserInfoStr.length>0){
               		$("#localUserInfo table tbody").html(localUserInfoStr);
					$("#localUserInfo").addClass("animated bounceInRight");
           		}else{
               		$("#localUserInfo table tbody").html('<tr><td colspan="4" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#localUserInfo table tbody").html('<tr><td colspan="4" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});
}