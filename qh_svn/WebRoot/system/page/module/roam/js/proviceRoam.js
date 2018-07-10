/* 文件：proviceRoam.js
 * 作者：Lyndon
 * 功能描述：proviceRoam.jsp的各个模块加载函数
 */
//变量定义
var currentLocalNet="";//本地网
var mapInfo=null,mapInfoOption;//地图
var loadFlag=true;
var viewType='user';
var currentType='',mapTarget='';
var userTimer=null,otherTimer=null,mapTimer=null;
function refresh(){
	if(userTimer!=null){
    	clearInterval(userTimer);
	}
	if(otherTimer!=null){
    	clearInterval(otherTimer);
	}
	var pm=getMapParam(currentType,mapTarget);
	pm.queryType=viewType; 
	loadEnterInfo(pm);
	loadLeaveInfo(pm);
	loadMapInfo(pm);
	/*
	userTimer=setInterval(loadUserInfo,5000);
	otherTimer=setInterval(function(){
		loadWingPayInfo();
		loadOweFeeInfo();
		loadIncomeInfo();
		loadSaleInfo();
	},30000);*/
}
//地图加载
function loadMapInfo(param){
    mapInfo = echarts.init(document.getElementById('mapInfo'));
    if(loadFlag){
    	mapInfo.showLoading({text:'数据读取中...'});
    }
   
    $.ajax({
		url : "proviceRoam/map.do",
  		type: 'post',
  		data : param,
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
				var mapData=[];
                var titleText,legendData=['入境', '出境'];
				if (currentType==''){
	                titleText="青海省";
				}else{
					titleText=mapTarget;
					legendData.push({
						name:'返回全省',
						icon : 'image://system/page/resource/images/back.jpg',
						textStyle:{fontWeight:500, color:'#64ff48'}
					});
				}
               // data=[{user_prov_name:'西宁市',user_num:100,	:'in' ,visit_prov_name:'海东地区'}];
                var inPoint=[],inLine=[];
                var outPoint=[],outLine=[];
                for(var i in data){
                	if(data[i].roam_type=='in'){
                		inPoint.push({name:data[i].user_latn_name,value:data[i].user_num});
                		inLine.push([{name:data[i].user_latn_name},{name:data[i].visit_latn_name}]);
                	}
                	if(data[i].roam_type=='out'){
                		outPoint.push({name:data[i].visit_latn_name,value:data[i].user_num});
                		outLine.push([{name:data[i].user_latn_name},{name:data[i].visit_latn_name}]);
                	}
                }                
                mapInfoOption = {
                	color: ['gold','aqua','lime'],
					title: {
                         text : titleText,
                         textStyle : {
                             color : 'orangered',
                             fontFamily : '微软雅黑',
                             fontWeight : 500
                         }
					},
                    tooltip : {
						trigger: 'item',
						formatter: '{b}'
					},
					legend: {
				        textStyle : {
				            color: '#fff'
				        },
						orient: 'vertical', // 'vertical'
                        x: 'center', // 'center' | 'left' | {number},
						data:legendData,
						selected:{
							'出境' : true
						} 
					},
                    series : [
						{
				            name: titleText,
				            type: 'map',
				            roam: false,
				            //hoverable: false,
							selectedMode : 'single',
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
								emphasis:{label:{show:true}}
							},
				            data:[],
				            geoCoord: localNetGis
				        },{
				            name: '入境',
				            type: 'map',
				            mapType: '青海',
				            data:[],
				            markLine : {
				                smooth:true,
				                smoothness: 0.3,
				                effect : {
				                    show: true,
				                    scaleSize: 1,
				                    period: 30,
				                    color: '#fff',
				                    shadowBlur: 2
				                },
				                itemStyle : {
				                    normal: {
				                        borderWidth:1,
				                        lineStyle: {
				                            type: 'solid',
				                            shadowBlur: 2
				                        }
				                    }
				                },
				                data : inLine
				            }
				        },{
				        	name: '出境',
				            type: 'map',
				            mapType: '青海',
				            data:[],
				            markLine : {
				                smooth:true,
				                effect : {
				                    show: true,
				                    scaleSize: 1,
				                    period: 30,
				                    color: '#fff',
				                    shadowBlur: 2
				                },
				                itemStyle : {
				                    normal: {
				                        borderWidth:1,
				                        lineStyle: {
				                            type: 'solid',
				                            shadowBlur: 2
				                        }
				                    }
				                },
				                data : outLine
				            }
				        } 
					]
                };
                mapInfo.on(ecConfig.EVENT.MAP_SELECTED,function(param){
            		var target=param.target;
					if(target!=null&&target!=''){
						 
							mapTarget=(target=="格尔木市"?"格尔木本地网":target);
							currentType='latn';
							/*mapInfoOption.legend.data.push(
									{
										name:'返回全省',
										icon : 'image://system/page/resource/images/back.jpg',
										textStyle:{fontWeight:500, color:'#64ff48'}
									}
							);
							
							mapInfoOption.title.text=target;
							mapInfoOption.title.show=true;
							mapInfoOption.series[0].name=target;
							mapInfo.setOption(mapInfoOption,true)*/;
							refresh();
						}
					
            		
            	});
				mapInfo.on(ecConfig.EVENT.LEGEND_SELECTED,function(param){
					if(param.target=="返回全省"){
						window.location.reload();						
					}
				});
    			mapInfo.hideLoading();
				mapInfo.setOption(mapInfoOption);
				if(mapTimer!=null){
					clearInterval(mapTimer);
				}
				mapTimer=setInterval(function(){
					if(mapInfo.component.legend.isSelected('出境')){
						mapInfo.component.legend.setSelected('出境',false);
						mapInfo.component.legend.setSelected('入境',true);
					}else{
						mapInfo.component.legend.setSelected('出境',true);
						mapInfo.component.legend.setSelected('入境',false);
					}
				},10000);
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
 
//表格生成函数
function funGetHtml(data){
	var tbodyStr="";
	if(data!=null&&data.length>0){
		var k=0;
		for(var i in data){
			tbodyStr+='<tr>';
			k=0;
			for(var j in data[i]){
				tbodyStr+='<td';
				if(k==0&&i==0){
					tbodyStr+=' class="w_10"';
				}
				if(k==1&&i==0){
					tbodyStr+=' class="w_30"';
				}
				if(k==2&&i==0){
					tbodyStr+=' class="w_20"';
				}
				if(k==3&&i==0){
					tbodyStr+=' class="w_30"';
				}
				if(k==4&&i==0){
					tbodyStr+=' class="w_10"';
				}
				k++;
				tbodyStr+='>'+data[i][j]+'</td>';
			}
			tbodyStr+='</tr>';
		}
	}
	return tbodyStr;
}
//入境信息
function loadEnterInfo(param){
	$("#enterOrLeaveInfo").removeClass("animated bounceInUp");
	$.ajax({
		url : "proviceRoam/enter.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
           	if(data!=null&&data!=''&&data.length>0){
           	  var enterData=[];
		        for(var i in data){
		        	enterData.push({rn:'<span class="br_12">'+data[i].rn+'</span>',begin_local:data[i].new_latn_name,icon:'<i class="arrow"></i>',end_local:data[i].loc_latn_name,user_count:data[i].user_number }); 
		        } 
           		var enterInfoStr=funGetHtml(enterData);
           		if(enterInfoStr!=""&&enterInfoStr.length>0){
               		$("#enterOrLeaveInfo table tbody").html(enterInfoStr);
					$("#enterOrLeaveInfo").addClass("animated bounceInUp");
           		}else{
               		$("#enterOrLeaveInfo table tbody").html('<tr><td colspan="5" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#enterOrLeaveInfo table tbody").html('<tr><td colspan="5" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});
}
//出境信息
function loadLeaveInfo(param){
	$("#enterOrLeaveInfo").removeClass("animated bounceInUp");
	$.ajax({
		url : "proviceRoam/leave.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
        	//测试数据
           	if(data!=null&&data!=''&&data.length>0){
           		var leaveData=[];
		        for(var i in data){
		        	leaveData.push({rn:'<span class="br_12">'+data[i].rn+'</span>',begin_local:data[i].loc_latn_name,icon:'<i class="arrow"></i>',end_local:data[i].new_latn_name,user_count:data[i].user_number }); 
		        } 
           		var leaveInfoStr=funGetHtml(leaveData);
           		if(leaveInfoStr!=""&&leaveInfoStr.length>0){
               		$("#enterOrLeaveInfo table tbody").html(leaveInfoStr);
					$("#enterOrLeaveInfo").addClass("animated bounceInUp");
           		}else{
               		$("#enterOrLeaveInfo table tbody").html('<tr><td colspan="5" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#enterOrLeaveInfo table tbody").html('<tr><td colspan="5" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});
}