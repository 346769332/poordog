/* 文件：role.js
 * 作者：Lyndon
 * 功能描述：role.jsp的加载函数
 */
var type=parent.rowType;
var thisData={};
$("#save").click(function(){
	$('#save').attr("disabled","disabled");
	var check=$("#roleInfo").form('validate');
	if(!check){
		$('#save').removeAttr("disabled");
		return false;
	}
	var param={};
	var urlStr="";
	var roleName=$.trim($("#fm_role_name").val());
	var list=$("#menu_tree").tree('getChecked');
	var menuIds="";
	var tempIds="";
	for(var i=0;i<list.length;i++){
		if(i>0){
			menuIds+=",";
			tempIds+=",";
		}
		menuIds+="'"+list[i].id+"'";
		tempIds+=list[i].id;
	}
	if(type=='edit'){
		if(roleName===parent.rowName&&tempIds===thisData.menu_ids){
	        $.messager.confirm("信息","没有任何的更新！",function(){
	        	parent.closeWindow();
			});
			return false;
		}
		if(roleName!=parent.rowName){
			param.role_name=roleName;
		}
		if(tempIds!=thisData.menu_ids){
			param.menu_ids=menuIds;
		}
		param.role_id=parent.rowId;
		urlStr="manage/roleMod.do";
	}
	if(type=='add'){
		param.role_name=roleName;
		param.menu_ids=menuIds;
		urlStr="manage/roleAdd.do";
	}
   	$.ajax({
		url : urlStr,
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
        	$.messager.confirm("信息","保存成功！",function(){
	        	parent.closeWindow();
	        	parent.reloadList('role');
			});
        },
        error : function(result){
			$('#save').removeAttr("disabled");
        	$.messager.alert("错误","保存失败！",'error');
        }
	});
});
$("#cancel").click(function(){
	parent.closeWindow();
});
function initLoad(){
	var params={};
	var urlStr="";
	var isCheck=true;
	if(type=='edit'||type=='info'){
		urlStr="manage/roleMenu.do";
		params.role_id=parent.rowId;
		params.type=type;
		if(type=='info'){
			isCheck=false;
			$('#save').css("display","none");
			$('#cancel').css("display","none");
		}
	}
	if(type=='add'){
		urlStr="manage/allMenu.do";
	}
   	$.ajax({
		url : urlStr,
        data : params,
  		type: 'post',
        dataType : "json",
        success : function(result){
        	thisData.role_id=parent.rowId;
        	thisData.menu_ids=result.ids;
        	if(type=='edit'||type=='info'){
        		//$('#userInfo').fill({role_name:parent.rowName});
        		$("#fm_role_name").val(parent.rowName);
        		if(type=='info'){
					$('#fm_role_name').css("background","#dedede");
					$('#fm_role_name').attr("disabled","disabled");
        		}
        	}
        	$('#menu_tree').tree({checkbox : isCheck,data : result.list});
        },
        error : function(result){
        	$.messager.alert("错误","查询角色信息错误！",'error');
        }
	});
}
initLoad();