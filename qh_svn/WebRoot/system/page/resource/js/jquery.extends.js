(function($){
	if(typeof ($) === 'undefined'){
		alert('jQuery对象不存在！');
		return;
	}
	/**
	 * 数组转换为object，用于获取表单数据
	 */
	$.fn.serializeObject = function() {		
		var param={};
		$(this).find("*[id^='fm_']").each(function(){
			var id=$(this).attr('id').substring(3);
			var classStr=$(this).attr('class')+"";
			if(classStr.indexOf('easyui-combobox')>-1){
				param[id]=$(this).combobox("getValue");
			}else{
				param[id]=$(this).val();
			}
		});
		return param;
	};
	/**
	 * 自动加载数据
	 */
	$.fn.fill = function(data) {
		for ( var i in data) {
			var item = data[i];
			var type = $.type(item);
			if (type === 'boolean' || type === 'number' || type === 'string') {
				var ele = $(":input[id='fm_" + i + "']", this);
				if (ele.length > 0) {
					ele.val(item);
				}
				ele = $("#" + i + ":not(:input)", this);
				if (ele.length > 0) {
					ele.html(item);
				}
			}
		}
		try {
			for (var i in $.parser.plugins) {
				if($.parser.plugins[i]==='form'){
					$(this).form('load',data);
					return;
				}
			}			
		} catch (e) {
		}		
	};
	/**
	 * 日期格式化
	 * @param fmt
	 * @returns
	 */
	Date.prototype.pattern=function(fmt) {
	    var o = {
	    "M+" : this.getMonth()+1, //月份
	    "d+" : this.getDate(), //日
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
	    "H+" : this.getHours(), //小时
	    "m+" : this.getMinutes(), //分
	    "s+" : this.getSeconds(), //秒
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度
	    "S" : this.getMilliseconds() //毫秒
	    };
	    var week = {
	    "0" : "\u65e5",
	    "1" : "\u4e00",
	    "2" : "\u4e8c",
	    "3" : "\u4e09",
	    "4" : "\u56db",
	    "5" : "\u4e94",
	    "6" : "\u516d"
	    };     
	    if(/(y+)/.test(fmt)){
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	    }
	    if(/(E+)/.test(fmt)){
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
	    }
	    for(var k in o){
	        if(new RegExp("("+ k +")").test(fmt)){
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));     
	        }
	    }
	    return fmt;
	}
})($);