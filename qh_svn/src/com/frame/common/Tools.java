package com.frame.common;
/**
 * @name Tools.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-8-23
 */
public class Tools{
	//object中获取字符串
	public static String getStrValue(Object o){
		if(o!=null){
			return o.toString();
		}
		return "";
	}
}
