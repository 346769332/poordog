package com.frame.common;
/**
 * @name ExemptionInfo.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-8-8
 */
public class ExemptionInfo{
	/* 地址类型 */
	private String type="";//MAC或者IP
	/* 地址信息 */
	private String address="";
	/* 地址所映射的登录工号 */
	private String staff="";
	/* 当前状态 */
	private String state="";//状态
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getStaff() {
		return staff;
	}
	public void setStaff(String staff) {
		this.staff = staff;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
}
