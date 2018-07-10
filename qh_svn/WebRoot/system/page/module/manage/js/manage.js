/* 文件：manage.js
 * 作者：Lyndon
 * 功能描述：manage.jsp的加载函数
 */
var rowId='',rowType='',rowName='';
function reloadList(type){
	var urlStr="";
	var param={};
	if(type=='user'){
		param.user_name=$.trim($("#user_name").val());
		urlStr="manage/userQuery.do";
	}else if(type=='role'){
		param.role_name=$.trim($("#role_name").val());
		urlStr="manage/roleQuery.do";
	}else{
		return false;
	}
   	$.ajax({
		url : urlStr,
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(result){        	
			if(type=='user'){
				var data=result.data;
				var userData=[];
				for(var i in data){
					userData.push({
						rn:parseInt(i)+1,
						user_id:data[i].user_id,
						login_code:data[i].login_code,
						user_acct:data[i].user_acct,
						user_name:data[i].user_name,
						user_phone:data[i].user_phone,
						role_name:isEffectiveValue(data[i].role_name)
					});
				}
				$('#userList tbody').html(funcOperateTableBody(userData,'user'));
			}
			if(type=='role'){
				var roleData=[];
				for(var j in result){
					roleData.push({
						rn:parseInt(j)+1,
						role_id:result[j].role_id,
						role_name:result[j].role_name,
						menu_list:isEffectiveValue(result[j].menu_list)
					});
				}
				$('#roleList tbody').html(funcOperateTableBody(roleData,'role'));
			}
        },
        error : function(result){
        	$.messager.alert("错误","查询错误！",'error');
        }
	});
}
function closeWindow(){	
	rowId='',rowType='',rowName='';
	document.getElementById('windowFrame').contentWindow.document.write('');
	$("#windowFrame").attr('src',"");
	$(".window_body").removeClass("rotate");
	$(".page_window").hide();
}
function operate(type,id,name){
	var head=type.substring(0,4);
	var param=type.substring(5);
	if(param=='del'){
		$.messager.confirm("操作提示", "您确定要删除【<a style='color:red;font-weight:500;'>"+name+"</a>】吗？",function(data){
			//确定删除			
			if(data){
				var param={};
				var thisUrl="";
				if(head=='user'){
					param.user_id=id;
					thisUrl="manage/userDel.do";
				}
				if(head=='role'){
					param.role_id=id;
					thisUrl="manage/roleDel.do";
				}
		    	$.ajax({
					url : thisUrl,
			        data : param,
			  		type: 'post',
			        dataType : "json",
			        success : function(data){
							reloadList(head);
			        },
			        error : function(result){
			        	$.messager.alert("错误","删除错误！",'error');
			        }
				});
			}
        });
	}else{
		rowId=id,rowType=param,rowName=name;
		$("#windowFrame").attr('src',"system/page/module/manage/"+head+".jsp");
		$(".page_window").show();
		$(".window_body").addClass("rotate");
	}
}
function initPage(){
	reloadList('user');
	reloadList('role');
}