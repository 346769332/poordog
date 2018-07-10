package com.system.module.manage.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frame.common.LoginInfo;
import com.frame.common.RandomValidateCode;
import com.frame.common.Tools;
import com.system.commom.controller.BaseController;
import com.system.commom.service.BaseService;

@Controller
@SuppressWarnings("all")
@RequestMapping("/manage")
public class ManageController extends BaseController{
	/**
	 * @Description: 用户--查询
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/userQuery")
	public Map userQuery(HttpServletRequest request) throws Exception{
		Map params=getParameter(request);
		Object type=params.get("type");
		Map resultMap=new HashMap();
		if(type!=null){
			String sqlId="manage.getUserRegion";
			String queryType=type.toString();
			if("add".equals(queryType)){
				sqlId="manage.getAllRegion";
			}else{
				resultMap.put("data",queryList("manage.userInfoQuery",params));
			}
			resultMap.put("region",makeTreeData(queryList(sqlId,params),"8630000","青海省"));
		}else{
			resultMap.put("data",queryList("manage.userInfoQuery",params));
		}
		return resultMap;
	}
	/**
	 * @Description: 用户--新增
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/userAdd")
	public Map userAdd(HttpServletRequest request) throws Exception{
		Map result=new HashMap();
		Long num=(Long)querySingle("manage.getPhoneNum",getParameter(request));
		if(num>0){
			result.put("result","error");
			result.put("msg","该手机号码已被使用！");
		}else{
			add("manage.userInfoAdd",getParameter(request));
			result.put("result","success");
			result.put("msg","用户新增成功！");
		}
		return result;
	}
	/**
	 * @Description: 用户--删除
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/userDel")
	public Map userDelete(HttpServletRequest request) throws Exception{
		delete("manage.userInfoDelete",getParameter(request));
		Map result=new HashMap();
		result.put("result","success");
		result.put("msg","用户删除成功！");
		return result;
	}
	/**
	 * @Description: 用户--修改
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/userMod")
	public Map userModify(HttpServletRequest request) throws Exception{
		Map result=new HashMap();
		Map param=getParameter(request);
		String phone=Tools.getStrValue(param.get("user_phone"));
		if(phone.length()>0){
			Long num=(Long)querySingle("manage.getPhoneNum",param);
			if(num>0){
				result.put("result","error");
				result.put("msg","该手机号码已被使用！");
				return result;
			}
		}
		update("manage.userInfoModify",getParameter(request));
		result.put("result","success");
		result.put("msg","用户新增成功！");
		return result;
	}
	/**
	 * @Description: 角色--查询
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roleQuery")
	public List roleQuery(HttpServletRequest request) throws Exception{
		return queryList("manage.roleInfoQuery",getParameter(request));
	}
	/**
	 * @Description: 角色--新增
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roleAdd")
	public Map roleAdd(HttpServletRequest request) throws Exception{
		add("manage.roleInfoAdd",getParameter(request));
		Map result=new HashMap();
		result.put("result","success");
		result.put("msg","角色新增成功！");
		return result;
	}
	/**
	 * @Description: 角色--删除
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roleDel")
	public Map roleDelete(HttpServletRequest request) throws Exception{
		delete("manage.roleInfoDelete",getParameter(request));
		Map result=new HashMap();
		result.put("result","success");
		result.put("msg","角色删除成功！");
		return result;
	}
	/**
	 * @Description: 角色--修改
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roleMod")
	public Map roleModify(HttpServletRequest request) throws Exception{
		update("manage.roleInfoModify",getParameter(request));
		Map result=new HashMap();
		result.put("result","success");
		result.put("msg","角色修改成功！");
		return result;
	}
	/**
	 * @Description: 菜单树
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/allMenu")	
	public Map allMenu(HttpServletRequest request) throws Exception{
		return makeTreeData(queryList("manage.getAllMenu",getParameter(request)),"0","菜单");
	}
	/**
	 * @Description: 菜单树
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roleMenu")
	public Map roleMenu(HttpServletRequest request) throws Exception{
		return makeTreeData(queryList("manage.getRoleMenu",getParameter(request)),"0","菜单");
	}
	//构造easyui tree的数据结构
	private Map makeTreeData(List<Map> treeData,String rootId,String rootName) throws Exception{
		Map tMap=new HashMap();
		List tList=new ArrayList();
		Map rootMap=new HashMap();
		List childrenList=new ArrayList();
		rootMap.put("id",rootId);
		rootMap.put("text",rootName);
		
		String tLevel="";
		String tId="";
		String tName="";
		Boolean checked=false;
		StringBuffer ids=new StringBuffer();
		for(int i=0;i<treeData.size();i++){
			tLevel=treeData.get(i).get("t_level").toString();
			if("1".equals(tLevel)){
				Map<String, Object> thisMap=new HashMap<String, Object>();
				List<Map<String, Object>> thisChildrenList=new ArrayList<Map<String, Object>>();
				tId=treeData.get(i).get("t_code").toString();
				tName=treeData.get(i).get("t_name").toString();
				checked=Boolean.valueOf(treeData.get(i).get("checked").toString());
				if(checked){
					ids.append(tId);
					ids.append(",");
				}
				thisMap.put("id", tId);
				thisMap.put("text", tName);
				thisMap.put("state", "open");
				thisMap.put("checked", false);			
				for(int j=0;j<treeData.size();j++){
					if("2".equals(treeData.get(j).get("t_level").toString())){
						String parentCode=treeData.get(j).get("parent_t_code").toString();
						if(parentCode.equals(tId)){
							Map<String, Object> thisChildrenMap=new HashMap<String, Object>();
							Boolean check=Boolean.valueOf(treeData.get(j).get("checked").toString());
							String tCode=treeData.get(j).get("t_code").toString();
							if(check){
								ids.append(tCode);
								ids.append(",");
							}
							thisChildrenMap.put("id",tCode);
							thisChildrenMap.put("text", treeData.get(j).get("t_name").toString());
							thisChildrenMap.put("checked",check);
							thisChildrenList.add(thisChildrenMap);
						}
					}
				}
				thisMap.put("children", thisChildrenList);	
				childrenList.add(thisMap);
			}
		}
		rootMap.put("children", childrenList);
		tList.add(rootMap);
		String idsStr=""+ids.toString();
		tMap.put("list",tList);
		if(idsStr.length()>0){
			tMap.put("ids",idsStr.substring(0,idsStr.length()-1));
		}else{
			tMap.put("ids","");
		}
        return tMap;
	}
}