/* 文件：user.js
 * 作者：Lyndon
 * 功能描述：user.jsp的加载函数
 */
var type=parent.rowType;
var thisData={};
$("#save").click(function(){
	$('#save').attr("disabled","disabled");
	var check=$("#userInfo").form('validate');
	if(!check){
		$('#save').removeAttr("disabled");
		return false;
	}
	var param=$("#userInfo").serializeObject();
	var urlStr="";
	var list=$("#fm_region_ids").combotree('getValues');
	param.region_ids=list.join(',');
	if(type=='edit'){
		param=getActualValue(thisData,param);
		if(isObjectValue(param)){
			param.user_id=thisData.user_id;
			urlStr="manage/userMod.do";
		}else{
	        $.messager.confirm("信息","没有任何的更新！",function(){
	        	parent.closeWindow();
			});
	        return false;
		}
	}
	if(type=='add'){
		urlStr="manage/userAdd.do";
	}
   	$.ajax({
		url : urlStr,
        data : param,
  		type: 'post',
        dataType : "json",
        success : function(data){
        	if(data.result=='success'){
	        	$.messager.confirm("信息","保存成功！",function(){
		        	parent.closeWindow();
		        	parent.reloadList('user');
				});
			}else{
				$.messager.alert("错误",data.msg,'error');
			}
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
   	$.ajax({
		url : 'manage/userQuery.do',
        data : {'user_id':parent.rowId,'type':type},
  		type: 'post',
        dataType : "json",
        success : function(result){
        	if(type=="edit"||type=="info"){
        		thisData=result.data[0];
        		thisData.region_ids=result.region.ids;
				$('#userInfo').fill(result.data[0]);
        		if(type=='info'){
        			$('#fm_region_ids').combotree({data:result.region.list,multiple:true,checkbox:false});
					$('#save').css("display","none");
					$('#cancel').css("display","none");
					$('#fm_login_code').css("background","#dedede");
					$('#fm_login_code').attr("disabled","disabled");
					
					$('#fm_login_pd').css("background","#dedede");
					$('#fm_login_pd').attr("disabled","disabled");
					
					$('#fm_user_acct').css("background","#dedede");
					$('#fm_user_acct').attr("disabled","disabled");
					
					$('#fm_user_name').css("background","#dedede");
					$('#fm_user_name').attr("disabled","disabled");
					$('#fm_role_id').combobox('disable');
					$('#fm_user_phone').css("background","#dedede");
					$('#fm_user_phone').attr("disabled","disabled");
				}else{
        			$('#fm_region_ids').combotree({data:result.region.list,multiple:true});
				}
        	}else{
        		$('#fm_region_ids').combotree({data:result.region.list,multiple:true});
        	}
        },
        error : function(result){
        	$.messager.alert("错误","查询用户信息错误！",'error');
        }
	});
}
initLoad();