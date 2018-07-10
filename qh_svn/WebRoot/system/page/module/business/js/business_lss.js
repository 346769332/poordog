/* 文件：business.js
 * 作者：Lyndon
 * 功能描述：business.jsp的各个模块加载函数
 */
//变量定义
var mapInfo=null,mapInfoOption;//地图
var loadFlag=true;
var currentType='',mapTarget='';
function refresh(){
	var pm=getMapParam(currentType,mapTarget);
	loadDetailInfo(pm);
	loadEasyPayInfo(pm);
	loadWingPayInfo(pm);
	loadDevelopInfo(pm);
}
//地图加载
function loadMapInfo(param){
	mapInfo = echarts.init(document.getElementById('mapInfo'));
    if(loadFlag){
    	mapInfo.showLoading({text:'数据读取中...'});
    }
	$.ajax({
		url : "business/map.do",
		data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
	 			var markData=[],positionData={};
	 			var positionStr="",markStr="",arry;
			    for(var i=0;i<data.length;i++){
			    	markData.push({name:data[i].store_name,value:data[i].yzf_amount});		    	
			    	arry=data[i].coordinate_id.split(',');
					positionStr=positionStr+"'"+data[i].store_name+"':["+arry[0]+","+arry[1]+"]";
					if(i<data.length-1){
			    		positionStr=positionStr+",";
			    	}
			    }
				positionStr="{"+positionStr+"}";
				positionData=eval('('+positionStr+')');				
				mapInfoOption = {
					title: {
						text : param.target,
						show : param.title,
						textStyle : {
							color : 'orangered',
							fontFamily : '微软雅黑',
							fontWeight:500
						}
					},
					tooltip : {
						show : false,
						trigger: 'item'
					},
					legend: {
						orient: 'vertical',
						x: 'right',
						show: param.legend,
						data:[{
							name:'返回全省',
							icon : 'image://system/page/resource/images/back.jpg',
							textStyle:{fontWeight:500, color:'#64ff48'}
						}]
					},
					dataRange: {
				        min : 0,
				        max : data[0].yzf_amount,
				        y : 'top',
				        calculable : true,
				        color: ['red','orange','#1ad5df'],
				        textStyle:{color:"#fff"}
				    },
					series : [
						{
							name: param.target,
							type: 'map',
							mapType: param.target,
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
							mapLocation:{width:'99%'},
							data:[],
							geoCoord : positionData,
							markPoint : {
	                        	symbolSize: function(value){
	                        		var tempValue=Math.round(value);
	                        		if(tempValue>0){
	                        			var tempStr=tempValue+"";
	                        			var strInt=1;
	                        			for(var i=1;i<tempStr.length;i++){
	                        				strInt*=1.5;
	                        			}
	                        			return 5+Math.round(strInt);
	                        		}else{
	                        			return 5;
	                        		}
	                        	},
			            		clickable: true,
			                	itemStyle: {
				                    normal: {
										//color: 'transparent',
				                        //borderColor: '#1ad5df',
				                        borderWidth: 0,
				                        label: {
				                            show: false
				                        }
				                    },
									emphasis:{
										//color: '#ff0000',
				                        borderWidth: 0,
										label:{
				                        	textStyle:{fontSize:14,color:"#e1b65c"},
											show:true,
											formatter:function(param){
												return param.name;
											}
										}
									}
				                },
			                	data : markData
	                    	}
						},{
				            name: '商铺点',
				            type: 'map',
				            mapType:  param.target,
							itemStyle:{
								normal:{label:{show:false}},
								emphasis:{label:{show:false}}
							},
				            data:[],
				            markPoint : {
				                symbol:'emptyCircle',
				                symbolSize : function (value){
	                        		var tempValue=Math.round(value);
	                        		if(tempValue>0){
	                        			var tempStr=tempValue+"";
	                        			var strInt=1;
	                        			for(var i=1;i<tempStr.length;i++){
	                        				strInt*=1.5;
	                        			}
	                        			return 3+Math.round(strInt);
	                        		}else{
	                        			return 3;
	                        		}
				                },
				                effect : {
				                    show: true,
				                    shadowBlur : 0
				                },
				                data : markData
				            }
				        }
					]
				};
				//地图选择事件
				mapInfo.on(ecConfig.EVENT.CLICK,function(param){
					var value = param.value;
					var target = param.name;
					if(target!=null&&target!=''){
						if(value!='-'){
							loadDetailInfo({queryType:'store',storeName:target});
						}else{
							if(currentType==''){
								mapTarget=(target=="格尔木市"?"格尔木本地网":target);
								currentType='latn';
								loadMapInfo({'latnName':mapTarget,'target':target,'title':true,'legend':true});
							}else{
								mapTarget=target;
								currentType='area';
								mapInfoOption.title.text=target;
								mapInfoOption.legend.data[0].name="返回本地网";
								mapInfoOption.series[0].name=target;
								mapInfo.setOption(mapInfoOption);
							}
							refresh();
						}
					}
				});	
				mapInfo.on(ecConfig.EVENT.LEGEND_SELECTED,function(param){
					if(currentType=='area'){
						currentType="latn";
						var thisArea=mapTarget;
						var thisLatn=mapInfoOption.series[0].mapType;
						mapTarget=(thisLatn=="格尔木市"?"格尔木本地网":thisLatn);
						mapInfoOption.title.text=thisLatn;
						mapInfoOption.legend.data[0].name="返回全省";
						mapInfoOption.series[0].data=[{name:thisArea,selected:false}];
						mapInfo.setOption(mapInfoOption);
						refresh();
					}else{
						window.location.reload();
					}
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
//详细信息
function loadDetailInfo(param){
	$(".page_details").removeClass("animated flipInY");
	$.ajax({
		url : "business/detail.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		//查询有数据
           	}else{
           		//没有数据
           		data=[{
           			store_name:"-",contact_name:"-",classification:"-",address_name:"-",
           			contact_accs:"-",store_area:"-",jfy_count:"-",jfy_amount:"-",yzf_count:"-",
           			yzf_amount:"-",yd_num:"-",kd_num:"-",rh_num:"-",sum_num:"-",cur_new:"-",
           			yzf_sum:"-",new_yzf:"-",jfy_sum:"-",new_jfy:"-",sl_sum:"-",new_sl:"-"
           		}];
           	}
       		if(param!=null&&param.queryType=='store'){
       			$("#shopName").html(data[0].store_name);
       			$("#shopManager").html(data[0].contact_name);
       			$("#shopType").html(data[0].classification);
       			$("#shopAddress").html(data[0].address_name);
       			$("#channelInfo").html(data[0].contact_accs);
       			$("#shopDivece").html(data[0].store_area);
       			$("#jfyCount").html(data[0].jfy_count);
       			$("#jfyTotal").html(data[0].jfy_amount);
       			$("#yzfCount").html(data[0].yzf_count);
       			$("#yzfTotal").html(data[0].yzf_amount);
       			$("#ydCount").html(data[0].yd_num);
       			$("#kdCount").html(data[0].kd_num);
       			$("#rhCount").html(data[0].rh_num);
       			$("#shop1").show();
       			$("#shop2").show();
       			$("#shop3").show();
       			$("#total").hide();
       		}else{
       			$("#shopSum").html(data[0].sum_num);
       			$("#addSum").html(data[0].cur_new);
       			$("#yzfSum").html(data[0].yzf_sum);
       			$("#yzfAdd").html(data[0].new_yzf);
       			$("#jfySum").html(data[0].jfy_sum);
       			$("#jfyAdd").html(data[0].new_jfy);
       			$("#ywSum").html(data[0].sl_sum);
       			$("#ywAdd").html(data[0].new_sl);
       			$("#shop1").hide();
       			$("#shop2").hide();
       			$("#shop3").hide();
       			$("#total").show();
       		}
			$(".page_details").addClass("animated flipInY");
        },
        error : function(result){}
	});
}
//交费易商铺TOP信息
function loadEasyPayInfo(param){
	$("#easyPayInfo").removeClass("animated bounceInDown");
	$.ajax({
		url : "business/easyPay.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data.length>0){
           		var tableData=[];
           		for(var i in data){
           			tableData.push({rn:data[i].rn,store_name:data[i].store_name,jfy_count:data[i].jfy_count,jfy_amount:data[i].jfy_amount});
           		}
           		var easyPayInfoStr=funcGetTableBody(tableData,true,'all');
           		if(easyPayInfoStr!=""&&easyPayInfoStr.length>0){
               		$("#easyPayInfo table tbody").html(easyPayInfoStr);
               		$("#easyPayInfo").addClass("animated bounceInDown");
           		}else{
               		$("#easyPayInfo table tbody").html('<tr><td colspan="4" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#easyPayInfo table tbody").html('<tr><td colspan="4" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});
}
//翼支付排行信息
function loadWingPayInfo(param){
	$("#wingPayInfo").removeClass("animated slideInRight");
	$.ajax({
		url : "business/wingPay.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		var wingPayInfoStr=funcGetTableBody(data,true,'all');
           		if(wingPayInfoStr!=""&&wingPayInfoStr.length>0){
               		$("#wingPayInfo table tbody").html(wingPayInfoStr);
					$("#wingPayInfo").addClass("animated slideInRight");
           		}else{
               		$("#wingPayInfo table tbody").html('<tr><td colspan="4" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#wingPayInfo table tbody").html('<tr><td colspan="4" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});	
}
//发展量排行信息
function loadDevelopInfo(param){
	$("#developInfo").removeClass("animated bounceInUp");
	$.ajax({
		url : "business/develop.do",
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		var developInfoStr=funcGetTableBody(data,true,'all');
           		if(developInfoStr!=""&&developInfoStr.length>0){
               		$("#developInfo table tbody").html(developInfoStr);
					$("#developInfo").addClass("animated bounceInUp");
           		}else{
               		$("#developInfo table tbody").html('<tr><td colspan="4" style="color:red;">无数据！</td></tr>');
           		}
           	}else{
               	$("#developInfo table tbody").html('<tr><td colspan="4" style="color:red;">暂无符合条件的数据！</td></tr>');
			}
        },
        error : function(result){}
	});	
}