/* 作者：Lyndon
 * 文件名称：functions.js
 * 功能描述：公用工具函数集合
 */
/* 作者：Lyndon
 * 函数名称：isEffectiveValue
 * 功能描述：判断值是否是有效值
 * 入参：paramValue-值
 */
function isEffectiveValue(pValue){
	if(typeof pValue=='undefined'){
		return null;
	}
	if(pValue===null){
		return '';
	}
	if(pValue=='null'){
		return '';
	}
	if(pValue.length===0){
		return '';
	}	
	return pValue;
}
//---函数名称：funcGetTableBody,
//---功能描述：生成表格tbody的html（配合custom.table.css使用）,
//---入参[data：数据,color：前三是否着色,type:是否整行着色]
function funcGetTableBody(data,color,type){
	var tbodyStr='';
	var colorFlag=true;
	if(data!=null&&data.length>0){
		for(var i in data){
			tbodyStr+='<tr>';
			colorFlag=true;
			for(var j in data[i]){
				tbodyStr+='<td';
				if(i==0&&color&&colorFlag){
					if(j.indexOf('scenic')>-1){
						tbodyStr+=' class="first al"';
					}else{
						tbodyStr+=' class="first"';
					}
				}
				if(i==1&&color&&colorFlag){
					if(j.indexOf('scenic')>-1){
						tbodyStr+=' class="second al"';
					}else{
						tbodyStr+=' class="second"';
					}
				}
				if(i==2&&color&&colorFlag){
					if(j.indexOf('scenic')>-1){
						tbodyStr+=' class="third al"';
					}else{
						tbodyStr+=' class="third"';
					}
				}
				//景点名称居中
				if(j.indexOf('scenic')>-1){
					tbodyStr+=' class="al"';
				}
				if(type!='all'){
					colorFlag=false;
				}
				tbodyStr+='>'+data[i][j]+'</td>';
			}
			tbodyStr+='</tr>';
		}
	}
	return tbodyStr;
}
//系统管理表格
function funcOperateTableBody(data,type){
	var tbodyStr="";
	if(data!=null&&data.length>0){
		var idStr=type+'_id';
		var nameStr=type+'_name';
		var k=1;
		for(var i in data){
			tbodyStr+='<tr>';
			k=1;
			for(var j in data[i]){
				if(j!=idStr){
					tbodyStr+='<td>';
					if(k==1){
						tbodyStr+='<span class="br_12">'+data[i][j]+'</span>';
					}else{
						tbodyStr+=data[i][j];
					}
					k=k+1;
					tbodyStr+='</td>';
				}
			}
			tbodyStr+='<td>';
			tbodyStr+='<a href="javascript:void(0)" class="btn" onclick="operate(\''+type+'_info\',\''+data[i][idStr]+'\',\''+data[i][nameStr]+'\');">查看</a>';
			tbodyStr+='<a href="javascript:void(0)" class="btn bk_edit" onclick="operate(\''+type+'_edit\',\''+data[i][idStr]+'\',\''+data[i][nameStr]+'\');">修改</a>';
			tbodyStr+='<a href="javascript:void(0)" class="btn bk_del" onclick="operate(\''+type+'_del\',\''+data[i][idStr]+'\',\''+data[i][nameStr]+'\');">删除</a>';
			tbodyStr+='</td>';			
			tbodyStr+='</tr>';
		}
		tbodyStr='<tr><td colspan="'+k+'" style="height: 20px;"></td></tr>'+tbodyStr;
	}
	return tbodyStr;
}
//找出一个或者多个数组中的最大，最小值
function getArrayScope(t,a){
	var thisArray=[];
	var maxValue=0;
	var minValue=0;
	if(a!=null&&a.length>0){
		for(var i=0;i<a.length;i++){
			 thisArray=thisArray.concat(a[i]);
		}
		maxValue=Math.max.apply(Math,thisArray);//Math.max(thisArray);
		minValue=Math.min.apply(Math,thisArray);//Math.min(thisArray);		
		if(t=='value'){
			return {'min':minValue,'max':maxValue};
		}
		if(t=='scope'){
			var minStr=minValue.toString();
			var maxStr=maxValue.toString();
			var minIndex=minStr.indexOf('.');
			var maxIndex=maxStr.indexOf('.');
			if(minIndex==-1){
				minIndex=minStr.length;
			}
			if(maxIndex==-1){
				maxIndex=maxStr.length;
			}
			var minInter=minStr.substring(0,minIndex);
			var maxInter=maxStr.substring(0,maxIndex);
			
			var minFrist=minInter.substring(0,1);
			var maxFrist=maxInter.substring(0,1);
			var minBorder=0,maxBorder=0;
			
			if(minFrist=='0'){
				minBorder=0;
			}else{
				minBorder=parseInt(minFrist)-1;
			}
			maxBorder=parseInt(maxFrist)+1;
			
			for(var j=1;j<minInter.length;j++){
					minBorder=minBorder*10;
			}
			for(var k=1;k<maxInter.length;k++){
				maxBorder=maxBorder*10;
			}
			return {'min':minBorder,'max':maxBorder};
		}
		return null;
	}else{
		return null;
	}
}
function stopAllTimer(){
	for(var i=1;i<1000;i=i+1) {
		clearInterval(i);
	}
}
/* 作者：Lyndon
 * 函数名称：rollAnimation
 * 作用描述:垂直滚动动画
 */
function rollAnimation(lh,speed,delay,rollName){
	var p=false;
	var t;
	var o=document.getElementById(rollName);
	o.innerHTML+=o.innerHTML;
	o.style.marginTop=0;
	o.onmouseover=function(){p=true;}
	o.onmouseout=function(){p=false;}
	function start(){
	t=setInterval(scrolling,speed);
	if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
	}
	function scrolling(){
		if(parseInt(o.style.marginTop)%lh!=0){
			o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
		if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) 
			o.style.marginTop=0;
		}else{
			clearInterval(t);
			setTimeout(start,delay);
		}
	}
	setTimeout(start,delay);
}
/* 作者：Lyndon
 * 函数名称：numberFormat
 * 作用描述:格式化数字显示效果
 */
function numberFormat(num,char,len){
	var numStr=num+"";
	if(len!=null&&len>3){
		var l=numStr.length;
		if(len>l){
			numStr=Array(len-l+1).join('0')+numStr;
		}
	}
	if(char!=null&&char.length>0){		
		if(numStr!=null&&numStr.length>0){
			 var strArray=numStr.split('.');//保留小数点两位并拆分
			 strArray[0]=strArray[0].split('').reverse().join('')//翻转字符
			 .replace(/(\d{3})/g,'$1'+char)//加逗号
			 .split('').reverse().join('')//再反转    
			 .replace(/^,/, '');// 去掉最前面的逗号
			 return strArray.join('.');
		}
	}else{
		return numStr
	}
	return "";
}
/* 作者：Lyndon
 * 函数名称：numberAnimation
 * 作用描述:格式化数字显示效果
 */
function numberAnimation(id,num,l){
	var numStr=numberFormat(num,',',l);
	var it = $("#"+id+" i");
    var len = String(numStr).length;
    for(var i=0;i<len;i++){
        if(it.length<=i){
            $("#"+id).append("<i></i>");
        }
        var index=String(numStr).charAt(i);
        if(index==","){index=10};
        if(index=="."){index=11};
        var y = -parseInt(index)*128;
        var obj = $("#"+id+" i").eq(i);
        $(".num i:first").css({"border-left":"none"});
        obj.animate({
                backgroundPosition :'(0 '+String(y)+'px)'
            }, 'slow','swing',function(){}
        );
    }
}
/* 作者：Lyndon
 * 函数名称：numberRollAnimation
 * 作用描述:格式化数字显示效果
 */
function numberRollAnimation(id,num,len,char,h){
	var numStr=numberFormat(num,char,len);
	var it = $("#"+id+" i");
    var len = String(numStr).length;
    for(var i=0;i<len;i++){
        if(it.length<=i){
            $("#"+id).append("<i></i>");
        }
        var index=String(numStr).charAt(i);
        if(index==","){index=10};
        if(index=="."){index=11};
        var y = -parseInt(index)*h;
        var obj = $("#"+id+" i").eq(i);
        $("#"+id).find("i:first").css({"border-left":"none"});
        obj.animate({
                backgroundPosition :'(0 '+String(y)+'px)'
            }, 'slow','swing',function(){}
        );
    }
}
/* 作者：Lyndon
 * 函数名称：getActualValue
 * 作用描述:获取obj中被更新的属性,obj_fixed为数组,为obj不变的属性；
 */
function getActualValue(obj,obj_new){
	var actualValue={};
	for(var i in obj){
		if(typeof(obj_new[i])!='undefined'&&obj[i]!=obj_new[i]){
			actualValue[i]=obj_new[i];
		}
	}
	return actualValue;
}
/* 作者：Lyndon
 * 函数名称：isObjectValue
 * 作用描述:判断object是否为null,或者没有任何值
 */
function isObjectValue(obj){
	if(obj==null){
		return false;
	}else{
		if(typeof obj!='object'){
			return false;
		}else{
			for( var i in obj)
				return true;
			return false;
		}
	}
}