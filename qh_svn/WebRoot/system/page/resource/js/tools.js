/* 作者：Lyndon
 * 函数名称：getScopeValue
 * 作用描述：获取在规定范围的值
 */
function getScopeValue(maxValue,oValue,baseValue,scope){
	return baseValue+parseInt(scope*oValue/maxValue);
}
/* 作者：Lyndon
 * 函数名称：typeEffect
 * 功能描述：模拟打字输入效果，一个字一个字的敲入
 * 入参：content-显示的内容,timeOut-显示速度,element-显示内容的标签元素
 */
var iTimer;
var printCount=0;
var pA=[];
var pE=null;
//附属函数
function printWord(){
	if(printCount<pA.length){
		if(pA[printCount]=='/'){
  			pE.innerHTML+='<br>';
			printCount++;
		}else{
  			pE.innerHTML+=pA[printCount++];
		}
	}else{
		clearInterval(iTimer);
		setTimeout(function(){
			pE.style.display="none";
		    printCount=0;
		    pA=[];
		},2000);
	}
}
function typeEffect(pContent,pSpeed,pElement){
	var ievPc=isEffectiveValue(pContent);
	var ievPe=isEffectiveValue(pElement);		
	if(ievPc==null||ievPe==''||(typeof pSpeed)=='undefined'||pSpeed<1){
		return false;
	}
	pA=ievPc.split("");
	pA=pContent.split("");
	pE=pElement;
	pElement.innerHTML="";
  	iTimer = setInterval("printWord()",pSpeed);
}
/* 作者：Lyndon
 * 函数名称：textRollEffect
 * 功能描述：文字垂直滚动
 * 入参：pRollHeight-每次滚动高度，pRollSpeed-每次滚动速度，pRollSpeedSpace-滚动间隔时间，pElement-标签元素
 */
function textRollEffect(pRollHeight,pRollSpeed,pRollSpeedSpace,pElement){
	var p=false,t,o=pElement;	
	o.innerHTML+=o.innerHTML;
	o.style.marginTop=0;
	o.onmouseover=function(){p=true;}
	o.onmouseout=function(){p=false;}
	function start(){
		t=setInterval(scrolling,pRollSpeed);
		if(!p) 
			o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
	}
	function scrolling(){
		if(parseInt(o.style.marginTop)%pRollHeight!=0){
			o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
			if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2)
				o.style.marginTop=0;
		}else{
			clearInterval(t);
			setTimeout(start,pRollSpeedSpace);
		}
	}
	setTimeout(start,pRollSpeedSpace);
}
/* 作者：Lyndon
 * 函数名称：drawMaskObject
 * 功能描述：canvas画标注物体
 * 入参：pMaskOption{
 		   context: canvas.getContext("2d"),--2d容器
 			center：{
 				xAxis: 100,		--中心X轴
 				yAxis: 200		--中心Y轴
 			},
 			radius: 250,					--半径
 	   strokeStyle: '#CCC',					--边框style
 		 fillStyle: '#CCC',					--填充style
 		  fillText：'标注文本',				--标注的文本内容
 	   beginRadian: Math.PI/4,				--开始弧度
 		 endRadian: -Math.PI*(5/4)			--结束弧度
 		}
 */
function drawMaskObject(pMaskOption){
	var context=pMaskOption.context;
    context.save();
    context.beginPath();
    context.arc( pMaskOption.center.xAxis,
    			 pMaskOption.center.yAxis-3*pMaskOption.radius,//3*pMaskOption.radius,
    			 pMaskOption.radius,
    			 pMaskOption.beginRadian,
    			 pMaskOption.endRadian,
    			 true);
    context.lineTo(pMaskOption.center.xAxis,pMaskOption.center.yAxis-1.5*pMaskOption.radius);
    context.lineTo(pMaskOption.center.xAxis,pMaskOption.center.yAxis);
    context.lineTo(pMaskOption.center.xAxis,pMaskOption.center.yAxis-1.5*pMaskOption.radius);//
    context.closePath();
    context.strokeStyle = pMaskOption.strokeStyle;
    context.stroke();
    context.fillStyle = pMaskOption.fillStyle;
    context.fill();
    context.textAlign = "center";
    context.font = "Bold 15px Arial";
    context.fillStyle = "#FFFFFF";
    var textArray=pMaskOption.fillText;
    for(var j=0;j<textArray.length;j++){
    	context.fillText(textArray[j],pMaskOption.center.xAxis-pMaskOption.radius*1/4,pMaskOption.center.yAxis-3*pMaskOption.radius+15*j);
    }
    context.restore();
    if(pMaskOption.image.url!=''){
    	var img=new Image();
    	img.src=pMaskOption.image.url+pMaskOption.image.size+".png";
    	context.save();
    	context.drawImage(img,pMaskOption.center.xAxis-pMaskOption.image.size/2,pMaskOption.center.yAxis-4*pMaskOption.radius-pMaskOption.image.size+5,pMaskOption.image.size,pMaskOption.image.size);
    	if(pMaskOption.rank.url!=''){
    		var rankImg=new Image();
    		rankImg.src=pMaskOption.rank.url;
    		var rankSize=pMaskOption.rank.size;    		
    		context.save();
    		context.drawImage(rankImg,pMaskOption.center.xAxis-rankSize[0]/2,pMaskOption.center.yAxis-2*pMaskOption.radius+rankSize[1]/2,rankSize[0],rankSize[1]);
    	}
    	context.restore();
    }
}
/* 作者：Lyndon
 * 函数名称：drawBezierEllipse
 * 功能描述：canvas画贝塞尔椭圆
 * 入参：pContext-2d容器,
 		pCenter-中心点(pCenter.xAxis：X轴,pCenter.yAxis：Y轴),
 		pShaft-椭圆轴(pShaft.xLength：X轴长度,pShaft.yLength：Y轴长度)
 */
function drawBezierEllipse(pContext,pCenter,pShaft){
   var k = .5522848,
   ox = pShaft.xLength*k, // 水平控制点偏移量
   oy = pShaft.yLength*k; // 垂直控制点偏移量
   pContext.beginPath();
   //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
   pContext.moveTo(pCenter.xAxis-pShaft.xLength, pCenter.yAxis);
   pContext.bezierCurveTo(pCenter.xAxis-pShaft.xLength, pCenter.yAxis-oy, pCenter.xAxis-ox, pCenter.yAxis-pShaft.yLength, pCenter.xAxis, pCenter.yAxis-pShaft.yLength);
   pContext.bezierCurveTo(pCenter.xAxis+ox, pCenter.yAxis-pShaft.yLength, pCenter.xAxis+pShaft.xLength, pCenter.yAxis-oy, pCenter.xAxis+pShaft.xLength, pCenter.yAxis);
   pContext.bezierCurveTo(pCenter.xAxis+pShaft.xLength, pCenter.yAxis+oy, pCenter.xAxis+ox, pCenter.yAxis+pShaft.yLength, pCenter.xAxis, pCenter.yAxis+pShaft.yLength);
   pContext.bezierCurveTo(pCenter.xAxis-ox, pCenter.yAxis+pShaft.yLength, pCenter.xAxis-pShaft.xLength, pCenter.yAxis+oy, pCenter.xAxis-pShaft.xLength, pCenter.yAxis);
   pContext.closePath();
   pContext.stroke();
}
/* 作者：Lyndon
 * 函数名称：drawPlaneRank
 * 作用描述：平面展示排行信息
 * 入参：pPlaneOption{
 		   element: document.getElementById("xxxx")		--标签元素
 	   circleTimes: 10,		--椭圆个数
 	  		offest:	{xAxis:0,yAxis:10},		--椭圆中心偏移
 		      data: [],		--数据
 	 maxMaskRadius:	20,		--标注的最大半径
 		    radius: {xAxis:240,yAxis:120},	--椭圆长短轴
 		     space: 10		--椭圆间距
 		}
 */
function drawPlaneRank(pPlaneOption){
	var canvas = document.createElement("canvas");
   	var cWidth=pPlaneOption.element.style.width;
   	var cHeight=pPlaneOption.element.style.height;
   	cWidth=parseInt(cWidth.replace("px",""));
   	cHeight=parseInt(cHeight.replace("px",""));
   	//cWidth=cWidth*0.98;
   	//cHeight=cHeight*0.98;
	canvas.style.width = cWidth+"px";
   	canvas.style.height = cHeight+"px";
	canvas.width = cWidth;
   	canvas.height = cHeight;
   	context = canvas.getContext("2d");
   	pPlaneOption.element.innerHTML = "";
   	context.lineWidth = 4.1;
   	context.strokeStyle="#00a4a2";
   	pPlaneOption.element.appendChild(canvas);
   	//canvas.addEventListener('mouseover',function(e){
	//},false);  
   	//构造椭圆底图
   	var rateValue=pPlaneOption.radius.xAxis/pPlaneOption.radius.yAxis;
   	for(var i=0;i<pPlaneOption.circleTimes;i++){
   		var yLength=pPlaneOption.radius.yAxis-pPlaneOption.space*i
   		drawBezierEllipse(context,
   						  {xAxis:cWidth/2+i*pPlaneOption.offest.xAxis,
   						   yAxis:cHeight*3/5+i*pPlaneOption.offest.yAxis
   						   },
   						  {xLength:yLength*rateValue,
   						   yLength:yLength
   						   }
 		);
   	}
	//标注信息
	var thisData=pPlaneOption.data;
	var w=Math.abs(pPlaneOption.offest.xAxis)*pPlaneOption.circleTimes;
	var h=Math.abs(pPlaneOption.offest.yAxis)*pPlaneOption.circleTimes;
	for(var i=0;i<thisData.length;i++){
		drawMaskObject({
	 		   context: context,
	 			center: {
	 				xAxis: (Math.random()>=0.5?-1:1)*pPlaneOption.radius.xAxis*(1-thisData[i].value)+cWidth/2,
	 				//xAxis: Math.random()>=0.5?(cWidth/2+w)*(1-thisData[i].value)+cWidth/2:(cWidth/2+w)*thisData[i].value,
	 				yAxis: (Math.random()>=0.5?-1:1)*pPlaneOption.radius.yAxis*(1-thisData[i].value)+cHeight*3/5
	 			},
	 			radius: pPlaneOption.maxMaskRadius*thisData[i].value,
	 	   strokeStyle: '#CCCCCC',
	 		 fillStyle: thisData[i].fillColor,
	 		  fillText: [thisData[i].text,thisData[i].value*100+"%"],
	 		     image: {url:thisData[i].icon,size:thisData[i].iconSize},
	 		      rank: {url:thisData[i].rank,size:thisData[i].rankSize},
	 	   beginRadian: Math.PI/4,
	 		 endRadian: -Math.PI*(5/4)
		});
	}
}
/* 作者：Lyndon
 * 变量名称：createTimeLine
 * 作用描述：生成时间轴
 */
function createTimeLine(timeData,element){
	var lunar_str="<tr>";
	var solar_str="<tr>";
	var t_lunar_head='<td class="lunar_time_head"></td>';
	var t_solar_head='<td class="solar_time_head"></td>';
	
	lunar_str+=t_lunar_head;
	solar_str+=t_solar_head;
	for(var i=0;i<timeData.length;i++){
		if(i<timeData.length-1){
			lunar_str+='<td name="thisTime'+i+'" class="lunar_time">'+timeData[i].LUNAR_DATE+'</td>'
		 	solar_str+='<td id="thisTime'+i+'" name="thisTime'+i+'" class="solar_time">'+timeData[i].SOLAR_DATE+'</td>'
		}else{
			lunar_str+='<td name="thisTime'+i+'" class="lunar_time_right" style="font-weight:500;background:rgba(21,31,43,0.6);">'+timeData[i].LUNAR_DATE+'</td>'
		 	solar_str+='<td id="thisTime'+i+'" name="thisTime'+i+'" class="solar_time_right" style="font-weight:500;background:rgba(21,31,43,0.6);">'+timeData[i].SOLAR_DATE+'</td>'
		}
	}	
	lunar_str+=t_lunar_head+'</tr>';
	solar_str+=t_solar_head+'</tr>';
	element.html(lunar_str+solar_str);
}

/* 作者：Lyndon
 * 变量名称：mapMainPoints
 * 作用描述：青海省主要坐标
 */
var mapMainPoints={
	"海北藏族自治州":{
		id:'0970',
		cp:[100.3711,37.9138],
		child:[
			{name:"祁连县",cp:[101.772196,36.656721]},
			{name:"刚察县",cp:[101.810428,36.605748]},
			{name:"海晏县",cp:[101.772052,36.634714]},
			{name:"门源回族自治县",cp:[101.774855,36.593478]},
			//景点
			{name:"仙女湾景区",cp:[100.121881,37.206522]},
			{name:"原子城",cp:[100.825594,37.002628]},
			{name:"青海湖国家重点风景名胜区",cp:[100.668648,36.875271]},
			{name:"岗什卡雪峰",cp:[101.778846,37.563558]},
			{name:"青海湖沙岛景区",cp:[100.713549,36.920178]},
			{name:"卓尔山风景区",cp:[100.283282,38.189749]},
			{name:"仙米国家森林公园",cp:[100.294824,38.145706]},
			{name:"金银滩草原",cp:[100.861003,36.992893]},
			{name:"观花台",cp:[101.447439,37.48204]},
			{name:"冰沟风景区",cp:[100.192187,38.13837]},
			{name:"青海湖金沙湾自然风景区",cp:[100.776387,36.766963]},
			{name:"阿柔大寺",cp:[100.459189,38.071282]},
			{name:"照壁山",cp:[101.647927,37.35617]},
			{name:"刚察",cp:[100.14682,37.321618]},
			{name:"情人崖",cp:[100.137973,37.327135]},
			{name:"上星站",cp:[100.903368,36.989787]},
			{name:"祁连山草原",cp:[101.00892,37.914278]},
			{name:"沙漠湿地公园",cp:[100.681125,36.893672]},
			{name:"二郎剑",cp:[99.863921,36.994694]},
			{name:"达板山观景台",cp:[101.42094,37.385014]},
			{name:"上庄清真大寺",cp:[100.258465,38.176985]},
			{name:"圆山观景台",cp:[101.448308,37.484016]},
			{name:"青海省民族藏族自治州博物馆",cp:[100.909353,36.963328]},
			{name:"黑河大峡谷",cp:[99.912889,38.269851]},
			{name:"西海第一神泉",cp:[100.708322,37.239166]},
			{name:"金银滩原子城旅游观景台",cp:[100.895578,36.943429]},
			{name:"北海禅院",cp:[100.896794,36.948375]}
		]
	},
	"西宁市":{
		id:'0971',
		cp:[101.4038,36.8207],
		child:[
			{name:"城北区",cp:[101.772196,36.656721]},
			{name:"城东区",cp:[101.810428,36.605748]},
			{name:"城西区",cp:[101.772052,36.634714]},
			{name:"城中区",cp:[101.774855,36.593478]},
			{name:"大通回族土族自治县",cp:[101.689767,36.942709]},
			{name:"湟源县",cp:[101.256856,36.692628]},
			{name:"湟中县",cp:[101.576509,36.508124]},
			//随机点
			{name:"塔尔寺",cp:[101.576298,36.494459]},
			{name:"大拉浪",cp:[101.576301,36.494916]},
			{name:"青海省博物馆",cp:[101.762473,36.636408]},
			{name:"马步芳公馆",cp:[101.81246,36.623244]},
			{name:"青藏高原野生动物园",cp:[101.739899,36.63336]},
			{name:"菩提塔",cp:[101.541284,36.450716]},
			{name:"丹噶尔古城",cp:[101.271772,36.693785]},
			{name:"老爷山",cp:[101.696805,36.937472]},
			{name:"藏文化馆",cp:[101.594841,36.498071]},
			{name:"中国藏医药文化博物馆",cp:[101.75431,36.695615]},
			{name:"日月山",cp:[101.10225,36.447813]},
			{name:"人民公园",cp:[101.763992,36.645276]},
			{name:"南山公园",cp:[101.781121,36.59628]},
			{name:"莲花山景区",cp:[101.565282,36.501807]},
			{name:"鹞子沟风景区",cp:[101.837407,37.047214]},
			{name:"青海国际会展中心(南京路)",cp:[101.709114,36.550769]},
			{name:"高原明珠多功能观光塔",cp:[101.756182,36.626394]},
			{name:"北海公园",cp:[101.772035,36.716534]},
			{name:"南凉虎台遗址公园",cp:[101.754409,36.639094]},
			{name:"红叶谷",cp:[101.898962,36.5579]},
			{name:"大黑沟森林公园",cp:[101.381835,36.679879]},
			{name:"法幢寺",cp:[101.776358,36.620753]},
			{name:"南禅寺",cp:[101.776127,36.62097]},
			{name:"宁寿塔",cp:[101.790939,36.650633]},
			{name:"青唐城遗址",cp:[101.791351,36.616973]}
		]
	},
	"海东地区":{
		id:'0972',
		cp:[102.3706,36.2988],
		child:[
			{name:"互助土族自治县",cp:[101.964002,36.85174]},
			{name:"乐都县",cp:[102.404429,36.495821]},
			{name:"平安县",cp:[102.11348,36.508124]},
			{name:"民和回族土族自治县",cp:[102.836149,36.332016]},
			{name:"化隆回族自治县",cp:[102.269857,36.103265]},
			{name:"循化撒拉族自治县",cp:[102.496374,35.865886]},
			//景点
			{name:"西宁互助土族故土园",cp:[101.954596,36.84493]},
			{name:"夏琼寺",cp:[101.884401,36.154148]},
			{name:"瞿昙寺",cp:[102.305413,36.359238]},
			{name:"互助北山",cp:[102.538276,36.819128]},
			{name:"孟达天池",cp:[102.698783,35.823008]},
			{name:"佑宁寺",cp:[102.188017,36.764571]},
			{name:"李家峡",cp:[101.818655,36.131458]},
			{name:"七里寺避暑山庄",cp:[102.724075,36.088588]},
			{name:"峡群寺森林公园",cp:[101.918334,36.346333]},
			{name:"骆驼泉",cp:[102.43825,35.860269]},
			{name:"白马寺",cp:[102.109794,36.527194]},
			{name:"十世班禅大师故居",cp:[102.377259,35.777202]},
			{name:"柳湾墓地",cp:[102.562333,36.459867]},
			{name:"西来寺",cp:[102.41474,36.487104]},
			{name:"马步芳公馆",cp:[102.335563,35.893484]},
			{name:"药草台寺",cp:[102.252843,36.299996]},
			{name:"平安石林文化园",cp:[102.126527,36.506608]},
			{name:"波浪滩乐园",cp:[102.505865,35.85463]},
			{name:"民和桃花广场",cp:[102.807697,36.334537]},
			{name:"喇家遗址",cp:[102.818771,35.867157]},
			{name:"清真南大寺",cp:[102.805571,36.331142]},
			{name:"馒头寺",cp:[102.156673,36.859817]},
			{name:"担斗寺",cp:[102.529034,35.912707]},
			{name:"儿童乐园",cp:[101.962706,36.823411]},
			{name:"同乐公园",cp:[102.397311,36.481779]}			
		]
	},
	"黄南藏族自治州":{
		id:'0973',
		cp:[101.5686,35.1178],
		child:[
			{name:"尖扎县",cp:[102.037633,35.949843]},
			{name:"同仁县",cp:[102.023835,35.526093]},
			{name:"泽库县",cp:[101.471916,35.047134]},
			{name:"河南蒙古族自治县",cp:[101.623693,34.743964]},
			//景点
			{name:"坎布拉",cp:[101.825553,36.120999]},
			{name:"郭麻日古堡",cp:[102.051715,35.575995]},
			{name:"吾屯下寺",cp:[102.063747,35.566241]},
			{name:"隆务大寺",cp:[102.017931,35.514512]},
			{name:"泽库",cp:[101.465936,35.036031]},
			{name:"郭麻日寺",cp:[102.049318,35.573111]},
			{name:"年都乎寺",cp:[102.030912,35.539907]},
			{name:"阿琼南宗寺",cp:[102.037507,35.944139]},
			{name:"麦秀森林公园",cp:[101.945408,35.35329]},
			{name:"幸福山公园",cp:[101.468542,35.043065]},
			{name:"禾日寺",cp:[101.011301,35.234481]},
			{name:"天葬",cp:[101.929299,34.510999]},
			{name:"古历寺",cp:[102.032972,35.980028]},
			{name:"观音菩萨殿",cp:[102.016272,35.513242]},
			{name:"东干木遗址",cp:[102.059481,35.677696]},
			{name:"热贡福田画院",cp:[102.062852,35.563539]},
			{name:"拉卡寺",cp:[101.653531,34.748347]},
			{name:"烈士陵园",cp:[101.622121,34.744544]},
			{name:"扎西提梁阁",cp:[101.879233,35.998645]},
			{name:"热贡多功能",cp:[102.02711,35.515335]},
			{name:"杨家清真大寺",cp:[101.946707,36.056104]},
			{name:"马头明王殿",cp:[102.01753,35.514571]},
			{name:"中佑活佛囊谦",cp:[102.01779,35.513653]},
			{name:"官秀寺",cp:[101.992386,35.112115]},
			{name:"麻巴寺院",cp:[102.083592,35.650783]}
		]
	},
	"海南藏族自治州":{
		id:'0974',
		cp:[100.3711,35.9418],
		child:[
			{name:"共和县",cp:[100.62564,36.293159]},
			{name:"贵德县",cp:[100.62564,36.293159]},
			{name:"兴海县",cp:[99.995533,35.597502]},
			{name:"贵南县",cp:[100.754421,35.597502]},
			{name:"同德县",cp:[100.584246,35.266226]},
			//景点
			{name:"青海湖二郎剑景区",cp:[100.50854,36.589246]},
			{name:"青海湖鸟岛景区",cp:[99.864262,36.990075]},
			{name:"青海湖",cp:[100.501661,36.583878]},
			{name:"青海湖渔场",cp:[100.653297,36.557755]},
			{name:"青海倒淌河景区",cp:[100.983948,36.404508]},
			{name:"龙羊峡",cp:[100.958706,36.146068]},
			{name:"清清黄河景区",cp:[101.408788,36.047037]},
			{name:"国家地质公园",cp:[101.589074,36.145114]},
			{name:"乜那寺",cp:[101.429424,36.051115]},
			{name:"中华福运轮",cp:[101.426557,36.055324]},
			{name:"赛宗寺",cp:[99.808528,35.50724]},
			{name:"观海亭",cp:[100.506581,36.580937]},
			{name:"青藏高原动物观赏园",cp:[100.505812,36.585146]},
			{name:"甲乙寺",cp:[100.717142,36.517667]},
			{name:"贵德文庙",cp:[101.436864,36.053194]},
			{name:"文昌庙",cp:[99.980272,35.594598]},
			{name:"黄河奇石苑",cp:[101.396784,36.037917]},
			{name:"西林寺",cp:[100.636244,36.276738]},
			{name:"贵德清真寺",cp:[101.438808,36.048817]},
			{name:"觉古寺",cp:[99.806592,36.524222]},
			{name:"草原风情园",cp:[100.528651,36.575082]},
			{name:"海南恰卜恰清真大寺",cp:[100.622193,36.283851]},
			{name:"金坠民族风景园",cp:[100.73033,36.551827]},
			{name:"德吉宫",cp:[100.631594,36.276032]}
		]
	},
	"果洛藏族自治州":{
		id:'0975',
		cp:[99.3823,34.0466],
		child:[
			{name:"玛多县",cp:[98.215594,34.926002]},
			{name:"玛沁县",cp:[100.243896,34.489191]},
			{name:"甘德县",cp:[99.908146,33.981116]},
			{name:"达日县",cp:[99.655183,33.758583]},
			{name:"久治县",cp:[101.490313,33.439113]},
			{name:"班玛县",cp:[100.745223,32.944103]},
			//景点
			{name:"年保玉则景区",cp:[101.113731,33.402533]},
			{name:"仙女湖景区",cp:[101.090927,33.421918]},
			{name:"拉家寺",cp:[100.662625,34.694883]},
			{name:"白玉达唐寺",cp:[100.660388,33.270677]},
			{name:"鄂木措景区",cp:[100.847356,33.248382]},
			{name:"查郎寺",cp:[99.511764,33.73523]},
			{name:"阿尼玛卿景区",cp:[100.00455,34.499888]},
			{name:"卡昂寺",cp:[100.085252,32.976254]},
			{name:"班前寺",cp:[100.878873,32.722817]},
			{name:"果洛州群众艺术馆",cp:[100.249353,34.479827]},
			{name:"冬给措纳湖",cp:[98.626365,35.283584]},
			{name:"积石山",cp:[99.449473,34.834146]},
			{name:"东吉多卡寺",cp:[99.813215,33.952809]},
			{name:"卧牛石",cp:[101.270337,33.402511]},
			{name:"叶合纳寺院",cp:[100.512142,33.372109]},
			{name:"会议中心",cp:[100.251422,34.477461]},
			{name:"康赛寺院",cp:[101.505616,33.378931]},
			{name:"达唐莲花光佛院",cp:[100.663594,33.276058]},
			{name:"日干措-哈黑景区",cp:[101.301778,33.391449]},
			{name:"吾扎寺",cp:[100.793961,32.875314]}
		]
	},
	"玉树藏族自治州":{
		id:'0976',
		cp:[93.5925,33.9368],
		child:[
			{name:"治多县",cp:[95.615785,33.861532]},
			{name:"曲麻莱县",cp:[95.790559,34.148829]},
			{name:"称多县",cp:[97.115164,33.37667]},
			{name:"杂多县",cp:[95.303031,32.904587]},
			{name:"玉树县",cp:[97.013979,33.00541]},
			{name:"囊谦县",cp:[96.485057,32.215142]},
			//景点
			{name:"文成公主庙",cp:[97.082772,32.901289]},
			{name:"嘎结古寺",cp:[97.021924,33.014249]},
			{name:"勒巴沟岩画",cp:[97.276938,32.916233]},
			{name:"当卡寺",cp:[97.146868,33.014492]},
			{name:"隆宝滩",cp:[97.037655,33.018964]},
			{name:"加那嘛呢",cp:[97.066067,33.023233]},
			{name:"通天河",cp:[97.253941,33.012418]},
			{name:"观景台",cp:[97.02266,32.998762]},
			{name:"玉树州博物馆",cp:[97.017471,33.009398]},
			{name:"嘎拉寺",cp:[97.159191,33.052849]},
			{name:"文化公园",cp:[97.000455,33.010208]},
			{name:"拉秀竹巴寺院",cp:[96.224609,32.969348]},
			{name:"阿永寺",cp:[96.194674,33.223265]},
			{name:"龙西寺",cp:[96.619082,32.676961]},
			{name:"小苏莽寺",cp:[97.255519,32.189575]},
			{name:"唐蕃古道",cp:[97.015175,32.999111]},
			{name:"曲朗多多寺",cp:[96.918309,32.296234]},
			{name:"玉树州游客服务中心",cp:[97.021956,33.005333]}
		]
	},
	"海西蒙古族藏族自治州":{
		id:'0977',
		cp:[96.4579,37.4314],
		child:[
			{name:"海西蒙古藏族自治州直辖",cp:[94.631529,37.092545]},
			{name:"德令哈市",cp:[97.366977,37.37756]},
			{name:"天峻县",cp:[99.028483,37.309623]},
			{name:"乌兰县",cp:[98.485763,36.941324]},
			{name:"都兰县",cp:[98.09942,36.311079]},
			//随机点
			{name:"可鲁克湖旅游景区",cp:[96.908941,37.323943]},
			{name:"茶卡盐湖",cp:[99.155011,36.666621]},
			{name:"哈里哈图森林公园",cp:[98.67135,37.037269]},
			{name:"英得尔花海草原",cp:[98.256751,36.357989]},
			{name:"西海公园",cp:[97.382137,37.387344]},
			{name:"怀头他拉岩画",cp:[96.603528,37.414141]},
			{name:"勤园",cp:[95.37297,37.852554]},
			{name:"西王母石室景区",cp:[98.873429,37.127935]},
			{name:"霍尔王国遗址",cp:[98.841648,37.386147]},
			{name:"金子海景区",cp:[97.887374,36.718725]},
			{name:"鹿场景区",cp:[98.841648,37.386147]},
			{name:"溶洞",cp:[99.088025,36.755167]},
			{name:"扎西曲日刚寺",cp:[98.205739,36.035867]},
			{name:"哈萨坟",cp:[97.743459,38.831725]},
			{name:"花土沟清真寺",cp:[90.875898,38.257378]},
			{name:"舟群寺",cp:[99.373903,37.602979]},
			{name:"西台吉乃尔盐湖",cp:[93.410053,37.734294]},
			{name:"上庄班禅湾",cp:[98.111817,36.259475]}
		]
	},
	"格尔木市":{
		id:'0979',
		cp:[94.8798,36.4104],
		child:[
			{name:"郭勒木德镇",cp:[94.831282,36.435401]},
			{name:"乌图美仁乡",cp:[93.168552,36.915143]},
			{name:"唐古拉山乡",cp:[92.443449,34.220372]},
			{name:"大格勒乡",cp:[95.758657,36.450215]},
			{name:"玛荣乡",cp:[92.5914,32.987414]},
			{name:"察尔汗工行委",cp:[95.311407,36.815762]},
			{name:"东城区工行委",cp:[94.909253,36.408835]},	
			{name:"西城区工行委",cp:[94.882843,36.428903]},
			//随机取点
			{name:"南长洲",cp:[90.338851,34.786044]},
			{name:"北长洲",cp:[90.470929,34.855206]},
			{name:"天池山",cp:[90.297448,34.820719]},
			{name:"昆仑山口",cp:[94.066991,35.663687]},
			{name:"万丈盐桥",cp:[95.045876,36.682006]},
			{name:"胡杨林省级自然保护区",cp:[94.382669,36.438174]},
			{name:"格尔木昆仑山国家地质公园",cp:[94.582884,35.885553]},
			{name:"索南达杰保护站",cp:[94.922781,36.40946]},
			{name:"将军楼公园",cp:[94.890067,36.424795]},
			{name:"昆仑公园",cp:[94.913754,36.415974]},
			{name:"唐古拉山口",cp:[91.925691,32.88648]},
			{name:"各拉丹东冰川",cp:[91.175988,33.500055]},
			{name:"昆仑圣泉",cp:[94.575318,35.879975]},
			{name:"长江源生态环境碑",cp:[92.449736,34.231983]}
		]
	}
};
/* 作者：Lyndon
 * 函数名称：getMarkData
 * 作用描述：echarts获取主要坐标点及标线
 * 入参：pPlaneOption{
 		   element: document.getElementById("xxxx")		--标签元素
 	   circleTimes: 10,		--椭圆个数
 	  		offest:	{xAxis:0,yAxis:10},		--椭圆中心偏移
 		      data: [],		--数据
 	 maxMaskRadius:	20,		--标注的最大半径
 		    radius: {xAxis:240,yAxis:120},	--椭圆长短轴
 		     space: 10		--椭圆间距
 		}
 */
function getMarkLine(params,type){
	var returnData=[];
	var thisPoint=mapMainPoints[params].cp;
	for(var thisData in mapMainPoints){
		if(thisData!=params.name){
			returnData.push([{geoCoord:mapMainPoints[thisData].cp},{geoCoord:thisPoint}]);
		}		
		var childArray=mapMainPoints[thisData].child;
		for(var i=0;i<childArray.length;i++){
			if(type=='diff'){
				var thisArray=childArray[i].cp;
				var flag
				if(thisArray[0]>thisPoint[0]){
					if(thisArray[1]>thisPoint[1]){
						flag='1';
					}else{
						flag='2';
					}
				}else{
					if(thisArray[1]>thisPoint[1]){
						flag='2';
					}else{
						flag='1';
					}
				}
				returnData.push(flag<2?[{geoCoord:childArray[i].cp},{geoCoord:thisPoint}]:[{geoCoord:thisPoint},{geoCoord:childArray[i].cp}]);
			}else{
				returnData.push([{geoCoord:childArray[i].cp},{geoCoord:thisPoint}]);
			}
		}
	}
	return returnData;
}