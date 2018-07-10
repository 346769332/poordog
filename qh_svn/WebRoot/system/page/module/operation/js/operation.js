/* 文件：operation.js
 * 作者：Lyndon
 * 功能描述：operation.jsp的各个模块加载函数
 */
//变量定义
var wingpayInfo=null,wingpayInfoOption=null;
var incomeInfo=null,incomeInfoOption=null;
var itvInfo=null,itvInfoOption=null;
var mapInfo=null,mapInfoOption=null;
var yearSaleInfo=null,yearSaleInfoOption=null;
var monthSaleInfo=null,monthSaleInfoOption=null;
var saleType='user';
var latnName='',areaName='';
//定时器
var rotateTimer=null,userTimer=null;
//弹出窗关闭按钮
$(".page_window .close").click(function(){
	var fun=document.getElementById('windowFrame').contentWindow.clearTimer;
	if(typeof fun=='function'){fun();}
	document.getElementById('windowFrame').contentWindow.document.write('');
	$("#windowFrame").attr('src',"");
	$(".page_window .body").removeClass("animated flipInX");
	$(".page_window").hide();
});
//详情按钮			
$("a[id^='title_']").click(function(){
	var id=$(this).attr('id');
	var winType=id.substring(6);
	if(winType!=''){
       	document.getElementById('windowFrame').contentWindow.document.write('');
		$("#windowFrame").attr('src',"./system/page/module/operation/"+winType+".jsp");
		$(".page_window").show();
		$(".page_window .body").addClass("animated flipInX");
	}
});
//销量用户与套餐选择
$("a[id^='sale']").click(function(){
	$("a[id^='sale']").each(function(){
		$(this).removeClass('active');
	});
	$(this).addClass('active');
	var id=$(this).attr('id');
	if(id=='saleDinner'){
		saleType='dinner';
	}else{
		saleType='user';					
	}
	loadSaleInfo();
});
//翼支付图表加载
function loadWingpayInfo(){
	if(wingpayInfo==null){
		wingpayInfo=echarts.init(document.getElementById('wingpayInfo'));
	}
	$("#wingpayInfo").removeClass("animated slideInLeft");
	$.ajax({
		url : "operation/wingPay.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	/*
        	data=[
				{pay_type:"餐饮娱乐",sum_value:150},
				{pay_type:"购物",sum_value:300},
				{pay_type:"加油",sum_value:400},
				{pay_type:"其他",sum_value:250}
			];*/
           	if(data!=null&&data.length>0){
           		var axisData=[],barData=[],symbolData=[];
           		var symbol={
				    '加油': 'path://M575.726394 244.954945c0 18.869766-15.287171 34.156938-34.156938 34.156938L313.650513 279.111882c-18.869766 0-34.156938-15.287171-34.156938-34.156938l0 0c0-18.892279 15.287171-34.17945 34.156938-34.17945l227.898477 0C560.417733 210.775494 575.726394 226.062666 575.726394 244.954945L575.726394 244.954945 575.726394 244.954945z" p-id="1665"></path><path d="M927.564647 234.056734c-29.483498-26.447349-79.452563-70.498634-94.696756-85.764316-8.604982-8.56098-28.326139-13.606903-41.452087 0.195451-12.515035 13.147438-7.076162 30.401404 2.183735 39.22435 12.033058 11.422144 37.564547 32.956599 54.81749 50.733475-0.174985 0.044002-0.284479 0.197498-0.459464 0.26299 1.310855 1.309832 2.118244 3.100618 2.118244 5.087878 0 1.987261-0.807389 3.778046-2.118244 5.066389 0.153496 0.044002 0.240477 0.197498 0.39295 0.217964-14.152325 15.702634-33.828456 31.777751-46.867424 46.14804-0.130983 0.130983-0.10847 0.283456-0.217964 0.414439-3.603061 3.037173-6.027274 7.426133-6.027274 12.515035 0 9.128915 7.40362 16.554024 16.532535 16.554024 0.459464 0 0.895393-0.239454 1.353834-0.283456l0.153496 0.196475 65.977667 0c4.979408 0 6.202259 4.935406 6.202259 4.935406l0 473.463312c0 26.425859-14.370289 34.747385-29.090549 34.747385-14.741749 0-30.466895-8.407484-30.466895-34.747385l0-387.06557c0-35.118845-3.842515-50.973952-43.460838-53.113685-9.740852-0.481977-48.680722-0.130983-69.822229 0L712.617134 116.078739c0-32.562627-26.360368-58.924018-58.924018-58.924018l-454.921004 0c-32.541137 0-58.922994 26.361391-58.922994 58.924018L139.849118 898.486378l-33.633005 0c-13.453407 0-24.242124 10.854209-24.242124 24.220634l0 18.71627c0 13.387915 10.788717 25.420973 24.242124 25.420973l639.095653 0c13.409404 0 24.220634-12.034081 24.220634-25.420973l0-18.71627c0-13.365402-10.81123-24.220634-24.220634-24.220634l-32.716122 0L712.595644 419.7162c11.923564 0.021489 28.632107 0 40.622186 0 14.45727 0 15.702634 14.370289 15.702634 14.370289L768.920464 806.716278c0 95.112218 78.688153 96.030124 87.424118 96.030124 11.728112 0 85.677335 0 85.677335-94.871741 0-17.711384 0-547.500539 0-547.500539S942.525384 247.51014 927.564647 234.056734L927.564647 234.056734zM644.325771 859.677491c0 21.665439-17.646915 39.289841-39.289841 39.289841L248.022817 898.967332c-21.665439 0-39.22435-17.624403-39.22435-39.289841L208.798467 164.80244c0-21.686928 17.558911-39.289841 39.22435-39.289841l357.034603 0c21.643949 0 39.289841 17.602913 39.289841 39.289841l0 694.875051L644.325771 859.677491 644.325771 859.677491z',
				    '购物': 'path://M953.55816 326.435701c-5.409197-7.676843-14.155395-12.214183-23.499204-12.214183L825.33073 314.221518 638.783033 135.220704c-22.571065-22.541389-59.210543-22.569018-81.808214 0L371.205858 314.221518l-81.131809 0-35.960003-181.186595c-18.225083-63.119573-61.533448-69.922513-79.294974-69.922513l-81.890079 0c-15.875572 0-28.717042 12.870122-28.717042 28.744671 0 15.847943 12.842493 28.690436 28.717042 28.690436l81.890079 0c3.934612 0 15.876596 0 24.046672 28.198226L306.221822 743.128031c3.470031 12.375865 14.781658 20.957311 27.65178 20.957311l507.544525 0c12.130272 0 22.951735-7.624654 27.024493-19.019169l88.638783-392.401088C960.223976 343.840092 958.912098 334.030679 953.55816 326.435701zM597.906044 176.125323l143.899364 138.096195L456.002127 314.221518 597.906044 176.125323zM821.198619 706.623629 355.650581 706.623629l-49.457412-334.967004 583.01438 0L821.198619 706.623629zM778.217712 815.263955c-39.920198 0-72.297606 32.351825-72.297606 72.29863 0 39.923268 32.378431 72.300676 72.297606 72.300676 39.922245 0 72.300676-32.378431 72.300676-72.300676C850.518389 847.615781 818.139957 815.263955 778.217712 815.263955zM386.800022 815.263955c-39.946804 0-72.29863 32.351825-72.29863 72.29863 0 39.923268 32.351825 72.300676 72.29863 72.300676 39.921221 0 72.299653-32.378431 72.299653-72.300676C459.100698 847.615781 426.721243 815.263955 386.800022 815.263955z',
				    '餐饮娱乐': 'path://M187.547592 916.686869 187.547592 916.686869c-18.876768 0-38.141414-5.688889-51.717172-15.385859C123.806178 892.89697 116.177895 877.769697 114.497087 859.151515c-2.068687-22.626263 4.525253-45.381818 16.937374-58.181818 15.515152-15.90303 233.50303-218.117172 283.280808-264.274747l-22.884848-24.565657c-9.179798 1.034343-26.375758 2.456566-44.088889 2.456566-15.515152 0-28.315152-1.163636-38.012121-3.490909-6.464646-1.551515-17.583838-6.723232-46.674747-32.969697-18.359596-16.678788-40.727273-38.917172-62.836364-62.707071C180.695067 394.343434 116.436481 323.490909 107.515269 292.331313c-11.765657-41.244444-5.818182-88.953535-4.783838-96.711111 0.258586-20.428283 9.567677-57.535354 43.183838-57.535354 21.333333 0 47.709091 16.161616 80.420202 49.260606C244.953653 206.092929 453.373855 413.220202 500.82436 460.282828l28.444444-29.349495c-12.412121-11.248485-30.771717-30.513131-34.779798-49.648485-5.430303-25.987879 0.517172-38.012121 12.282828-62.060606 1.163636-2.327273 2.327273-4.654545 3.620202-7.240404C530.561734 270.480808 679.507188 137.050505 705.107188 117.39798c7.628283-5.818182 15.644444-8.791919 23.919192-8.791919 13.834343 0 26.892929 8.791919 33.874747 22.755556 5.818182 11.636364 5.559596 23.919192-0.517172 32.064646-9.050505 11.894949-141.058586 147.652525-158.254545 165.236364-4.266667 5.430303-13.446465 20.686869-8.016162 26.246465 0.517172 0.517172 1.034343 0.905051 2.585859 0.905051 6.981818 0 18.10101-8.016162 22.367677-11.765657 8.145455-8.016162 143.385859-141.834343 155.539394-153.341414 6.852525-6.593939 14.99798-10.084848 23.660606-10.084848 16.161616 0 28.961616 12.153535 34.391919 24.048485 5.430303 11.894949 4.266667 23.919192-2.973737 32.193939-11.377778 13.058586-147.781818 162.650505-153.6 168.985859l-0.387879 0.517172c-1.810101 1.939394-9.955556 10.989899-3.749495 19.006061 0.905051 1.163636 1.551515 1.422222 2.844444 1.422222 5.818182 0 15.385859-6.335354 19.523232-9.826263 6.852525-6.852525 143.644444-141.575758 158.90101-156.832323 5.559596-5.430303 12.929293-8.40404 21.333333-8.40404 17.19596 0 37.107071 12.541414 44.347475 27.927273 4.525253 9.567677 3.490909 19.393939-2.715152 26.892929-0.646465 0.775758-1.551515 1.939394-2.844444 3.490909-38.141414 46.416162-73.567677 86.755556-105.244444 119.983838-85.074747 89.341414-116.622222 99.684848-132.913131 99.684848-2.068687 0-4.137374-0.129293-6.076768-0.517172-27.151515-5.30101-51.070707-21.20404-64.258586-31.418182l-31.547475 36.719192c47.062626 45.89899 265.179798 258.585859 275.135354 268.282828 9.179798 8.921212 17.713131 29.478788 16.549495 51.587879-1.034343 18.747475-8.921212 34.521212-22.884848 45.511111-12.8 10.084848-29.737374 15.644444-47.709091 15.644444-19.781818 0-37.494949-6.723232-46.416162-17.713131-8.791919-10.731313-161.357576-181.785859-248.888889-279.660606L236.161734 898.585859C225.042542 910.351515 207.846582 916.686869 187.547592 916.686869L187.547592 916.686869zM401.915269 484.072727l50.165657 53.915152-9.69697 9.050505c-2.715152 2.585859-275.393939 255.224242-292.072727 272.290909-6.723232 6.981818-10.860606 23.014141-9.567677 37.236364 1.034343 10.731313 4.783838 19.135354 10.343434 23.143434 9.179798 6.464646 23.143434 10.472727 36.460606 10.472727l0 0c12.670707 0 23.40202-3.620202 29.349495-9.826263l284.70303-301.381818 9.567677 10.731313c10.084848 11.248485 247.466667 276.945455 259.361616 291.29697 3.10303 3.878788 13.317172 7.886869 25.858586 7.886869 12.024242 0 23.143434-3.490909 31.288889-9.955556 7.886869-6.206061 12.282828-14.99798 12.8-26.117172 0.775758-14.480808-5.042424-27.79798-8.662626-31.159596-11.119192-10.860606-284.056566-276.945455-284.056566-276.945455l-8.921212-8.662626 65.292929-76.024242 10.084848 9.567677c0.258586 0.258586 29.090909 27.280808 61.672727 33.616162 0.129293 0 0.517172 0.129293 0.905051 0.129293 20.686869 0 89.987879-54.949495 217.729293-210.10101 0.775758-1.034343 1.551515-1.810101 2.068687-2.456566-1.939394-4.39596-12.153535-12.541414-20.29899-12.541414-1.292929 0-2.19798 0.258586-2.585859 0.646465-15.644444 15.644444-157.866667 155.668687-159.288889 157.090909l-0.517172 0.517172c-1.939394 1.680808-19.264646 16.678788-37.365657 16.678788-9.567677 0-17.713131-4.008081-23.660606-11.507071-16.678788-21.333333-3.749495-44.347475 5.559596-53.785859 6.076768-6.593939 140.282828-153.729293 152.824242-168.080808 0.129293-0.905051-0.387879-4.008081-2.973737-7.369697-2.456566-3.232323-5.688889-5.30101-8.274747-5.30101-1.680808 0-3.490909 0.905051-5.30101 2.715152-12.024242 11.377778-153.858586 151.789899-155.280808 153.212121l-0.387879 0.387879c-2.068687 1.939394-21.074747 18.876768-40.339394 18.876768-8.274747 0-15.644444-2.973737-21.333333-8.662626-19.393939-19.393939-5.042424-48.226263 6.593939-62.189899l0.775758-0.775758c55.854545-57.276768 145.713131-150.367677 155.927273-162.521212 0-1.551515-1.034343-5.30101-3.878788-8.662626-1.422222-1.680808-4.266667-4.39596-7.757576-4.39596-2.327273 0-4.913131 1.163636-7.757576 3.361616-12.153535 9.309091-54.949495 47.062626-97.228283 87.40202-71.111111 68.008081-86.49697 91.022222-89.858586 97.874747-1.292929 2.585859-2.456566 5.042424-3.620202 7.369697-11.119192 22.49697-13.705051 27.79798-10.084848 44.993939 2.844444 13.705051 23.789899 33.874747 36.20202 43.442424l11.894949 9.050505L501.082946 497.907071l-9.438384-9.438384c-2.585859-2.585859-263.111111-261.430303-284.056566-282.505051-35.684848-36.072727-53.915152-41.373737-61.672727-41.373737-2.715152 0-9.050505 0-13.446465 13.187879-3.10303 9.179798-3.232323 18.876768-3.232323 19.006061l0 0.905051-0.129293 1.034343c-0.129293 0.517172-7.111111 48.09697 3.878788 86.367677 4.654545 16.032323 39.951515 62.060606 86.109091 111.709091 52.492929 56.630303 88.824242 86.238384 96.840404 88.565657 7.628283 1.810101 18.359596 2.844444 31.806061 2.844444 23.789899 0 47.191919-2.973737 47.450505-3.10303L401.915269 484.072727 401.915269 484.072727zM401.915269 484.072727',
				    '其他': 'path://M460.8 486.4 486.4 486.4 486.4 460.8 486.4 243.2C486.4 108.884349 377.51565 0 243.2 0 108.884349 0 0 108.884349 0 243.2 0 377.51565 108.884349 486.4 243.2 486.4L460.8 486.4ZM51.2 243.2C51.2 137.161328 137.161328 51.2 243.2 51.2 349.238671 51.2 435.2 137.161328 435.2 243.2L435.2 460.8 460.8 435.2 243.2 435.2C137.161328 435.2 51.2 349.238671 51.2 243.2Z" p-id="2380"></path><path d="M460.8 588.8 435.2 563.2 435.2 780.8C435.2 886.838671 349.238671 972.8 243.2 972.8 137.161328 972.8 51.2 886.838671 51.2 780.8 51.2 674.761329 137.161328 588.8 243.2 588.8L460.8 588.8ZM0 780.8C0 915.11565 108.884349 1024 243.2 1024 377.51565 1024 486.4 915.11565 486.4 780.8L486.4 563.2 486.4 537.6 460.8 537.6 243.2 537.6C108.884349 537.6 0 646.48435 0 780.8Z" p-id="2381"></path><path d="M563.2 435.2 588.8 460.8 588.8 243.2C588.8 137.161328 674.761329 51.2 780.8 51.2 886.838671 51.2 972.8 137.161328 972.8 243.2 972.8 349.238671 886.838671 435.2 780.8 435.2L563.2 435.2ZM1024 243.2C1024 108.884349 915.11565 0 780.8 0 646.48435 0 537.6 108.884349 537.6 243.2L537.6 460.8 537.6 486.4 563.2 486.4 780.8 486.4C915.11565 486.4 1024 377.51565 1024 243.2Z" p-id="2382"></path><path d="M1024 780.8C1024 646.48435 915.11565 537.6 780.8 537.6L563.2 537.6 537.6 537.6 537.6 563.2 537.6 780.8C537.6 915.11565 646.48435 1024 780.8 1024 818.513163 1024 855.051123 1015.390662 888.179087 999.065099 900.861235 992.815296 906.075682 977.467919 899.825882 964.785773 893.576079 952.103625 878.228702 946.889178 865.546554 953.138978 839.420429 966.014014 810.620764 972.8 780.8 972.8 674.761329 972.8 588.8 886.838671 588.8 780.8L588.8 563.2 563.2 588.8 780.8 588.8C886.838671 588.8 972.8 674.761329 972.8 780.8 972.8 799.469549 970.142607 817.755731 964.968006 835.279443 960.963957 848.839106 968.71031 863.07731 982.269973 867.081361 995.829636 871.085412 1010.06784 863.339057 1014.071891 849.779394 1020.63305 827.560122 1024 804.391296 1024 780.8Z'
				};           		
           		for(var i in data){
           			axisData.push(data[i].pay_type);
           			barData.push(data[i].sum_value);
           			symbolData.push({value: data[i].sum_value,symbol: symbol[data[i].pay_type]});
           		}
           		/*
				if(wingpayInfoOption!=null){					
					wingpayInfo.setOption({
						xAxis: [{data: axisData}],
						series: [{type: 'bar',data: barData},{type: 'pictorialBar',data: symbolData}]
					});
					$("#wingpayInfo").addClass("animated slideInLeft");
					return true;
				}*/
				wingpayInfoOption = {
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
					title: {
				    	show: false,
				        text: '翼支付',
				        left: 'center',
				        top: 4,
				        textStyle: {
				        	color: '#6dd1f5',
				        	fontSize: 18,
				        	fontWeight: 'normal'
				        }
				    },
				    color: ['#2087B2'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'none'
						},
						formatter: function (params) {
							return params[0].name + ': ' + params[0].value;
						}
				    },
				    xAxis: [{
						data: axisData,
						axisTick: {show: false},
						axisLine: {show: false},
						axisLabel: {
							textStyle: {
								color: '#FCFCFC'
							}
						}
				    }],
				    yAxis: [{
						splitLine: {show: false},
						axisTick: {show: false},
						axisLine: {show: false},
						axisLabel: {show: false}
				    }],
					grid:{left:16,top:64,right:16,bottom:32},
				    series: [{
						name: '翼支付',
						type: 'bar',
						barWidth: 16,
						//barCategoryGap: '-130%',
						// symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
						//symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
						label: {
						    normal: {
						    	show: true,
								position: 'top',
								//offset:[0, '-110%'],
								formatter: '{c}',
								color:"#fcfcfc"
							}
						},
						itemStyle: {
						    normal: {
						    	barBorderRadius: 6,
								opacity: 1
							},
						    emphasis: {
								opacity: 0.5
							}
						},
						data: barData
					}, {
						name: 'symbol',
						type: 'pictorialBar',
						symbolPosition: 'end',
						symbolSize: 20,
						symbolOffset: [0, '-180%'],
						itemStyle: {
							normal: {
								color: '#6dd1f5'
							}
						},
						data: symbolData
				    }]
				};
				wingpayInfo.setOption(wingpayInfoOption);
				$("#wingpayInfo").addClass("animated slideInLeft");
			}else{
				wingpayInfo=null,wingpayInfoOption=null;
				$("#wingpayInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){wingpayInfo=null,wingpayInfoOption=null;console.log("翼支付查询错误！");}
	});
}
//4G用户到达数
function load4gUserInfo(){
    $("#roll_num_4g").find("i").css("background-position","0 0");
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
           	if(data!=null&&data.length>0){
           		numberRollAnimation('roll_num_4g',data[0].reach_value,9,'',128);
			}
        },
        error : function(result){console.log("4G用户到达数查询错误！");}
	});
}
//收入情况
function loadIncomeInfo(){
	if(incomeInfo==null){
		incomeInfo=echarts.init(document.getElementById('incomeInfo'));
	}
	$("#incomeInfo").removeClass("animated slideInRight");
	$.ajax({
		url : "operation/income.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	/*
        	data=[
				{day_id:'20170201',add_charge:1150},
				{day_id:'20170202',add_charge:800},
				{day_id:'20170203',add_charge:900},
				{day_id:'20170204',add_charge:1250},
				{day_id:'20170205',add_charge:750},
				{day_id:'20170206',add_charge:450},
				{day_id:'20170207',add_charge:1050}
			];*/
           	if(data!=null&&data.length>0){
           		var axisData=[],seriesData=[];
           		for(var i in data){
           			axisData.push(data[i].day_id);
           			seriesData.push(data[i].add_charge);
           		}
           		if(incomeInfoOption!=null){
           			incomeInfo.setOption({
           				xAxis: [{data: axisData}],
           				series: [{data: seriesData}]
           			});
           			$("#incomeInfo").addClass("animated slideInRight");
           			return true;
           		}
				incomeInfoOption = {
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
				    title: {
				    	show: false,
				        text: '收入情况',
				        left: 'center',
				        top: 4,
				        textStyle: {
				        	color: '#6dd1f5',
				        	fontSize: 18,
				        	fontWeight: 'normal'
				        }
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
					grid:{left:16,top:64,right:16,bottom:32},
				    xAxis : [
				        {
				            type : 'category',
							splitLine: {show: false},
							axisTick: {show: false},
							axisLine: {
							    show: true,
							    lineStyle: {
							        color: '#5076b4'
							    }
							},
							axisLabel: {
							    show: true,
							    textStyle: {
							        color: '#fcfcfc'
							    }
							},
				            data : axisData
				        }
				    ],
				    yAxis : [
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
							axisLabel: {show: false}
				        }
				    ],
				    series : [
				        {
				            name:'收入',
				            type:'line',
				            symbolSize:8,
				            smooth: true,
				            stack: '收入',
				            label: {
								normal: {
									show: true,
									position: 'top',
									formatter: '{c}',
				    			    textStyle: {
				    			        color: '#2aa5c7'
				    			    }
								}
							},
							itemStyle: {normal: {color: '#5076b4'}},
				            areaStyle: {normal: {color: '#5076b4',opacity: 0.2}},
				            data: seriesData
				        }
				    ]
				};
				incomeInfo.setOption(incomeInfoOption);
				$("#incomeInfo").addClass("animated slideInRight");
			}else{
				incomeInfo=null,incomeInfoOption=null;
				$("#incomeInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){incomeInfo=null,incomeInfoOption=null;console.log("收入情况查询错误！");}
	});
}
//ITV信息
function loadItvInfo(){
	if(itvInfo==null){
		itvInfo=echarts.init(document.getElementById('itvInfo'));
	}
	$("#itvInfo").removeClass("animated slideInDown");
	$.ajax({
		url : "operation/itv.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        dataType : "json",
  		type: 'post',
        success : function(data){
        	//测试数据
        	/*
        	data=[
				{name:'高清',value:1150},
				{name:'4K',value:800},
				{name:'其他',value:900}
			];*/
           	if(data!=null&&data.length>0){
           		var seriesData=[];
           		for(var i in data){
           			seriesData.push({name:data[i].itv_type,value:data[i].sum_val});
           		}
           		if(itvInfoOption!=null){
           			itvInfo.setOption({
           				series: [{data: seriesData}]
           			});
					$("#itvInfo").addClass("animated slideInDown");
           			return true;
           		}
				itvInfoOption = {
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
				    title: {
				    	show: false,
				        text: 'itv',
				        left: 'center',
				        top: 4,
				        textStyle: {
				        	color: '#6dd1f5',
				        	fontSize: 18,
				        	fontWeight: 'normal'
				        }
				    },
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    color: ['#c09626','#98FB98','#42b6e7'],
					graphic: [{
			        	type: 'image',
			        	id: 'rotate_bg',
			        	right: 'center',
			        	top: 'center',
			        	//bounding: 'raw',
			        	//origin: [130, 130],
			        	style: {
			        		image: './images/rotate_bg.png',
			        		width: 260,
			        		height: 260,
			        		opacity: 0.6
			        	}
			        }],
				    series: [ {
				        name: 'itv',
				        type: 'pie',
				        //center: ['50%', '55%'],
				        radius: ['50%', '65%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        label: {
				            normal: {
				                show: true
				                //textStyle:{
				                    //fontSize: 12,
				                    //color: '#FFFFFF'
				                    //fontWeight: "bold"
				                //},
				                //position: 'inner'
				            }
				        },
				        labelLine: {
				            normal: {
				                show: true,
				                length: 16,
				                length2: 8,
				                lineStyle: {
				                    //color: '#ffffff'
				                }
				            }
				        },
				        data: seriesData
				    }]
				};
				itvInfo.setOption(itvInfoOption);
				$("#itvInfo").addClass("animated slideInDown");
				var rotation = 0;
				rotateTimer=setInterval(function (){
				    itvInfo.setOption({
				        graphic: {
				            id: 'rotate_bg',
				            rotation: (rotation+=Math.PI/360)%(Math.PI * 2)
				        }
				    });
				},30);
			}else{
				itvInfo=null;
				$("#itvInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){itvInfo=null;console.log("itv信息查询错误！");}
	});
}
//地图加载
function loadMapInfo(){
    mapInfo = echarts.init(document.getElementById('mapInfo'));    
	$("#mapInfo").removeClass("animated slideInLeft");
	mapInfoOption = {
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
			trigger: 'item',
			show:false
		},
		legend:{
			show:false,
			top:16,
			right:16,
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
		series: [{
			name: '返回',
			type: 'map',
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
			},
			data:[
					{name: '西宁市',itemStyle: {normal:{areaColor:'rgb(70,127,156)'}}},
					{name: '海北藏族自治州',itemStyle: {normal:{areaColor:'rgb(109,209,245)'}}},
					{name: '海东地区',itemStyle: {normal:{areaColor:'rgb(93,176,210)'}}},
					{name: '黄南藏族自治州',itemStyle: {normal:{areaColor:'rgb(109,209,245)'}}},
					{name: '海南藏族自治州',itemStyle: {normal:{areaColor:'rgb(93,176,210)'}}},
					{name: '果洛藏族自治州',itemStyle: {normal:{areaColor:'rgb(70,127,156)'}}},
					{name: '玉树藏族自治州',itemStyle: {normal:{areaColor:'rgb(93,176,210)'}}},
					{name: '海西蒙古族藏族自治州',itemStyle: {normal:{areaColor:'rgb(70,127,156)'}}},
					{name: '格尔木市',itemStyle: {normal:{areaColor:'rgb(109,209,245)'}}}
			],
			markPoint:{
				symbolSize:16,
	       		itemStyle: {
	         		normal: {
						color: 'transparent',
	         			borderColor: 'rgb(12,78,172)',
	          			borderWidth: 3,
			         	label: {
			         		show: false
			          	}
	         		},
					emphasis:{
						color: '#1ad5df',
						label:{
							show:false,
							formatter:function(param){
								return param.name;
							}
						}
					}
				},
				data:[
					{name: '西宁市',coord: [101.4038,36.8207]},
					{name: '海北藏族自治州',coord: [100.3711,37.9138]},
					{name: '海东地区',coord: [102.3706,36.2988]},
					{name: '黄南藏族自治州',coord: [101.5686,35.1178]},
					{name: '海南藏族自治州',coord: [100.3711,35.9418]},
					{name: '果洛藏族自治州',coord: [99.3823,34.0466]},
					{name: '玉树藏族自治州',coord: [93.5925,33.9368]},
					{name: '海西蒙古族藏族自治州',coord: [96.4579,37.4314]},
					{name: '格尔木市',coord: [94.8798,36.4104]}
				]
			}
		}]
	};
	mapInfo.setOption(mapInfoOption);
	$("#mapInfo").addClass("animated slideInLeft");
	mapInfo.on('mapselectchanged', function(params){
		if(latnName!=''){
			areaName=params.name;
			mapInfo.setOption({title:{text:areaName}});
			loadOtherModule();
			//console.log("[latnName:"+latnName+",areaName:"+areaName+"]");
		}else{
			latnName=params.name;
			mapInfoOption.title.text=latnName;
			mapInfoOption.legend.show=true;
			mapInfoOption.series[0].map=latnName;
			mapInfoOption.series[0].data=[];
			mapInfoOption.series[0].markPoint={};
			mapInfo.setOption(mapInfoOption,true);
			loadOtherModule();
		}
	});
	mapInfo.on('legendselectchanged', function(params){
		if(areaName!=''){
			areaName='';
			mapInfoOption.title.text=latnName;
			mapInfo.setOption(mapInfoOption,true);
			loadOtherModule();
		}else{
			window.location.reload();
		}
	});
}
//地图右侧信息加载
function loadMapRightInfo(){
	var m1=echarts.init(document.getElementById('m1'));
	var m2=echarts.init(document.getElementById('m2'));
	var m3=echarts.init(document.getElementById('m3'));
	$.ajax({
		url : "operation/user.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName},
        //data : param,
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){
           		var title="青海省";
           		if(latnName!=''){
           			title=(areaName!=''?areaName:latnName);
           		}
				var mInfoOption = {
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
					//color:['#c09626'],
				    tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				        show:false,
				        orient: 'vertical',
				        x: 'left',
				        data: [title, '其他'],
				        textStyle: {
				            color: '#FCFCFC'
				        }
				    },
				    //backgroundColor: '#0D3585',
				    series: [ {
				        name: '青海',
				        type: 'pie',
				        radius: ['70%', '75%'],
				        avoidLabelOverlap: false,
				        hoverAnimation:false,
				        itemStyle:{
				            normal:{
				                color: "#204174",
				                borderColor: "#c09626",
				                borderWidth: 4
				            }
				        },
				        label: {
				            normal: {
				                show: true,
				                textStyle:{
				                    fontSize: 14,
				                    color: '#FCFCFC'
				                },
				                position: 'center',
				                formatter:function(param){
				                    if(param.name==title){
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
				        data: [{
				            value: 75,
				            name: title
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
				m1.setOption(mInfoOption);
				mInfoOption.series[0].itemStyle.normal.borderColor='#147ba8';
				mInfoOption.series[0].label.normal.textStyle.color='#147ba8';
				m2.setOption(mInfoOption);
				mInfoOption.series[0].itemStyle.normal.borderColor='#42b6e7';
				mInfoOption.series[0].label.normal.textStyle.color='#42b6e7';
				m3.setOption(mInfoOption);
           	}else{
           		m1=null,m2=null,m3=null;
				$("#m1").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
				$("#m2").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
				$("#m3").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){m1=null,m2=null,m3=null;console.log("地图附加信息查询错误！");}
	});
}
function loadSaleInfo(){
	$("#dayCJ").html("0");
	$("#dayFZ").html("0");
	if(yearSaleInfo==null){
		yearSaleInfo=echarts.init(document.getElementById('yearSaleInfo'));
	}
	if(monthSaleInfo==null){
		monthSaleInfo=echarts.init(document.getElementById('monthSaleInfo'));
	}
    $("#yearSaleInfo").removeClass("animated slideInDown");
    $("#monthSaleInfo").removeClass("animated slideInDown");
	$.ajax({
		url : "operation/sale.do",
        data : {"latnName":latnName=='格尔木市'?'格尔木本地网':latnName,"areaName":areaName,"queryType":saleType},
        dataType : "json",
  		type: 'post',
        success : function(data){
           	if(data!=null&&data!=''&&data.length>0){           		
				$('#dayCJ').animateNumber({
					number: data[0].day_fz,
					numberStep: function(now,tween){
						$(tween.elem).html(numberFormat(Math.round(now)+"",",",null));
					}
				});
				$('#dayFZ').animateNumber({
					number: data[0].day_cj,
					numberStep: function(now,tween){
						$(tween.elem).html(numberFormat(Math.round(now)+"",",",null));
					}
				});
           		if(yearSaleInfoOption!=null){
					yearSaleInfo.setOption({series: [{data: [data[0].year_fz,data[0].year_cj]}]});
			    	$("#yearSaleInfo").addClass("animated slideInDown");
           		}
           		if(monthSaleInfoOption!=null){
					monthSaleInfo.setOption({series: [{data: [data[0].month_fz,data[0].month_cj]}]});
			    	$("#monthSaleInfo").addClass("animated slideInDown");
           		}
				yearSaleInfoOption = {
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
				    title: {
				    	show: false,
				        text: '年销量'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    grid: {
				        top: '4%',
				        bottom: '4%',
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
							    show: true,
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
				            data : ['发展\n用户数','拆机\n用户数']
				        }
				    ],
				    series : [
				        {
				            name:'年销量',
				            type:'bar',
				            barWidth:16,
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
									color: '#5076b4',
									barBorderRadius: 6,
									opacity: 1
								},
								emphasis: {
								    opacity: 0.5
								}
							},
				            areaStyle: {normal: {color: '#5076b4',opacity: 0.2}},
				            data:[data[0].year_fz,data[0].year_cj]
				        }
				    ]
				};
				monthSaleInfoOption = {
					animationDelay: function (idx) {
						return idx * 100;
					},
					animationDelayUpdate: function (idx) {
						return idx * 100;
					},
				    title: {
				    	show: false,
				        text: '月销量'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    grid: {
				        top: '4%',
				        bottom: '4%',
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
							    show: true,
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
				            data : ['发展\n用户数','拆机\n用户数']
				        }
				    ],
				    series : [
				        {
				            name:'月销量',
				            type:'bar',
				            barWidth:16,
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
									color: '#5076b4',
									barBorderRadius: 6,
									opacity: 1
								},
								emphasis: {
								    opacity: 0.5
								}
							},
				            areaStyle: {normal: {color: '#5076b4',opacity: 0.2}},
				            data:[data[0].month_fz,data[0].month_cj]
				        }
				    ]
				};
				yearSaleInfo.setOption(yearSaleInfoOption);
				monthSaleInfo.setOption(monthSaleInfoOption);
		    	$("#yearSaleInfo").addClass("animated slideInDown");
		    	$("#monthSaleInfo").addClass("animated slideInDown");
           	}else{
           		yearSaleInfo=null,yearSaleInfoOption=null;
           		monthSaleInfo=null,monthSaleInfoOption=null;
				$("#yearSaleInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
				$("#monthSaleInfo").html('<div style="height:128px;line-height:128px;color:red;text-align:center;">暂无符合条件的数据！</div>');
           	}
        },
        error : function(result){yearSaleInfo=null,yearSaleInfoOption=null;monthSaleInfo=null,monthSaleInfoOption=null;console.log("销售信息查询错误！");}
	});
}
//清除页面所有定时器
function clearTimer(){
	if(userTimer!=null){clearInterval(userTimer);}
	if(rotateTimer!=null){clearInterval(rotateTimer);}
}
function loadOtherModule(){
	loadWingpayInfo();
	load4gUserInfo();
	loadIncomeInfo();
	loadItvInfo();
	loadMapRightInfo();
	loadSaleInfo();
}
//页面函数加载
loadEcharts({
	chinaMap: false,
	qhMap: true,
	mapExtend: true,
	pageFunc: function(){
		loadWingpayInfo();
		load4gUserInfo();
		loadIncomeInfo();
		loadItvInfo();
		loadMapInfo();
		loadMapRightInfo();
		loadSaleInfo();
		userTimer=setInterval(load4gUserInfo,5000);
	}
});