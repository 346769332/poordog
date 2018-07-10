package com.frame.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @name LoginInfo.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-8-8
 */
public class LoginInfo{
	/* 员工系统ID */
	private String userId="";
	/* 员工账户 */
	private String userAcct="";
	/* 员工名称 */
	private String userName="";
	/* 登陆帐号 */
	private String loginCode="";
	/* 员工联系电话 */
	private String userPhone="";
	/* 员工归属地 */
	private String regionId="";
	/* 员工归属地名称 */
	private String regionName="";
	/* 员工角色ID */
	private String roleId="";
	/* 员工角色名称 */
	private String roleName="";	
	/* 员工菜单权限 */
	private List<Map<String,Object>> menuList=new ArrayList<Map<String,Object>>();
	/* 员工菜单串 */
	private StringBuffer menuBuffer=new StringBuffer();
	private List<Map<String,Object>> makeMenuList(String level,String menuCode,List<Map<String,Object>> menuData){
		List<Map<String,Object>> makeList=new ArrayList<Map<String,Object>>();
		if(menuData!=null){
			for(int i=0;i<menuData.size();i++){
				String levelStr=Tools.getStrValue(menuData.get(i).get("menu_level"));
				String parentCode=Tools.getStrValue(menuData.get(i).get("parent_menu_code"));
				if(level.equals(levelStr)&&menuCode.equals(parentCode)){
					Map<String,Object> thisMenu=new HashMap<String,Object>();
					String thisMenuCode=Tools.getStrValue(menuData.get(i).get("menu_code"));
					thisMenu.put("menu_code",thisMenuCode);
					thisMenu.put("menu_name",Tools.getStrValue(menuData.get(i).get("menu_title")));
					thisMenu.put("menu_level",level);
					String menuUrl=Tools.getStrValue(menuData.get(i).get("menu_url"));
					menuBuffer.append(menuUrl);
					menuBuffer.append(",");
					thisMenu.put("target_url",menuUrl);
					thisMenu.put("p_menu_code",menuCode);
					thisMenu.put("child_menu_list",makeMenuList(String.valueOf((Integer.parseInt(level)+1)),thisMenuCode,menuData));
					makeList.add(thisMenu);
				}
			}
	   	}
		return makeList;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserAcct() {
		return userAcct;
	}
	public void setUserAcct(String userAcct) {
		this.userAcct = userAcct;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getLoginCode() {
		return loginCode;
	}
	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public String getRegionId() {
		return regionId;
	}
	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getMenuString() {
		return menuBuffer.toString();
	}
	public List<Map<String, Object>> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<Map<String,Object>> menuData) {
		//根节点为1，逐级获取菜单
		this.menuList = makeMenuList("1","",menuData);
	}
}
