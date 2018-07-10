/**
 * @requires jQuery,EasyUI
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */
(function($) {
	$.fn.panel.defaults.onBeforeDestroy = function() {
	    var frame = $('iframe', this);
	    try {
	        if (frame.length > 0) {
	            for ( var i = 0; i < frame.length; i++) {
	                frame[i].contentWindow.document.write('');
	                frame[i].contentWindow.close();
	            }
	            frame.remove();
	            if ($.browser.msie) {
	                CollectGarbage();
	            }
	        }
	    } catch(e){
	    }
	};
	/**
	 * @requires jQuery,EasyUI
	 * 扩展validatebox，添加验证两次密码功能
	 */
	$.extend($.fn.validatebox.defaults.rules,{
	    pwd : {//密码验证(字母开头,必须包含数字、字母、特殊字符,6至18位)
	        validator : function(value){
	            return /^[a-zA-Z](?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$]).{6,18}$/i.test(value);
	        },
	        message : '密码不符合规范！'
	    },
	    eqPwd : {
	        validator : function(value, param) {
	            return value == $(param[0]).val();
	        },
	        message : '密码不一致！'
	    },
	    idcard : {// 验证身份证
	        validator : function(value) {
	            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
	        },
	        message : '身份证号码格式不正确'
	    },
	    minLength: {
	        validator: function(value, param){
	            return value.length >= param[0];
	        },
	        message: '请输入至少（2）个字符.'
	    },
	    length:{
	    	validator:function(value,param){
	        	var len=$.trim(value).length;
	            return len>=param[0]&&len<=param[1];
	        },
	        message:"输入内容长度必须介于{0}和{1}之间."
	    },
	    phone : {// 验证电话号码
	        validator : function(value) {
	            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
	        },
	        message : '格式不正确,请使用下面格式:010-88888888'
	    },
	    mobile : {// 验证手机号码
	        validator : function(value) {
	            return /^1[34578]\d{9}$/i.test(value);
	        },
	        message : '手机号码格式不正确'
	    },
	    intOrFloat : {// 验证整数或小数
	        validator : function(value) {
	            return /^\d+(\.\d+)?$/i.test(value);
	        },
	        message : '请输入数字，并确保格式正确'
	    },
	    currency : {// 验证货币
	        validator : function(value) {
	            return /^\d+(\.\d+)?$/i.test(value);
	        },
	        message : '货币格式不正确'
	    },
	    qq : {// 验证QQ,从10000开始
	        validator : function(value) {
	            return /^[1-9]\d{4,9}$/i.test(value);
	        },
	        message : 'QQ号码格式不正确'
	    },
	    integer : {// 验证整数
	        validator : function(value) {
	            return /^[+]?[1-9]+\d*$/i.test(value);
	        },
	        message : '请输入整数'
	    },
	    age : {// 验证年龄
	        validator : function(value) {
	            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
	        },
	        message : '年龄必须是0到120之间的整数'
	    },
	    chinese : {// 验证中文
	        validator : function(value) {
	            return /^[\Α-\￥]+$/i.test(value);
	        },
	        message : '请输入中文'
	    },
	    english : {// 验证英语
	        validator : function(value) {
	            return /^[A-Za-z]+$/i.test(value);
	        },
	        message : '请输入英文'
	    },
	    unnormal : {// 验证是否包含空格和非法字符
	        validator : function(value) {
	            return /.+/i.test(value);
	        },
	        message : '输入值不能为空和包含其他非法字符'
	    },
	    username : {// 验证用户名
	        validator : function(value) {
	            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
	        },
	        message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
	    },
	    faxno : {// 验证传真
	        validator : function(value) {
	            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
	        },
	        message : '传真号码不正确'
	    },
	    zip : {// 验证邮政编码
	        validator : function(value) {
	            return /^[0-9]\d{5}$/i.test(value);
	        },
	        message : '邮政编码格式不正确'
	    },
	    ip : {// 验证IP地址
	        validator : function(value) {
	            return /d+.d+.d+.d+/i.test(value);
	        },
	        message : 'IP地址格式不正确'
	    },
	    name : {// 验证姓名，可以是中文或英文
	            validator : function(value) {
	                return /^[\Α-\￥]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value);
	            },
	            message : '请输入姓名'
	    },
	    msn:{
	            validator : function(value){
	                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
	            },
	            message : '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
	    }
	}); 
	/**
	 * @requires jQuery,EasyUI
	 * 扩展tree，使其支持平滑数据格式
	 */
	$.fn.tree.defaults.loadFilter = function(data, parent) {
	    var opt = $(this).data().tree.options;
	    var idFiled, textFiled, parentField;
	    if (opt.parentField) {
	        idFiled = opt.idFiled || 'id';
	        textFiled = opt.textFiled || 'text';
	        parentField = opt.parentField;
	        var i, l, treeData = [], tmpMap = [];
	        for (i = 0, l = data.length; i < l; i++) {
	            tmpMap[data[i][idFiled]] = data[i];
	        }
	        for (i = 0, l = data.length; i < l; i++) {
	            if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
	                if (!tmpMap[data[i][parentField]]['children'])
	                    tmpMap[data[i][parentField]]['children'] = [];
	                data[i]['text'] = data[i][textFiled];
	                tmpMap[data[i][parentField]]['children'].push(data[i]);
	            } else {
	                data[i]['text'] = data[i][textFiled];
	                treeData.push(data[i]);
	            }
	        }
	        return treeData;
	    }
	    return data;
	}; 
	/**
	 * @requires jQuery,EasyUI
	 * 扩展combotree，使其支持平滑数据格式
	 */
	$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;
})($);