package com.frame.common;

import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletRequestWrapper;  
/**
 * @name CharacterWrapper.java
 * @author hechuan
 * @version 2.0
 * @description 防范xss漏洞
 * @email hechuan@tydic.com
 * @date Created On : 2016-8-24
 */
public class CharacterWrapper extends HttpServletRequestWrapper {
	HttpServletRequest orgRequest = null;
	public CharacterWrapper(HttpServletRequest request) {
		super(request);
		orgRequest = request;
	}
	/*-------------------------------------请求URL相关的特殊字符过滤-----------------------------------*/
	@Override
	public String getRequestURI() {
		// TODO Auto-generated method stub
		return recode(super.getRequestURI());
	}

	@Override
	public StringBuffer getRequestURL() {
		// TODO Auto-generated method stub
		return new StringBuffer(recode(super.getRequestURL().toString()));
	}

	@Override
	public String getServletPath() {
		// TODO Auto-generated method stub
		return recode(super.getServletPath());
	}
	/*--------------------------------------请求参数特殊字符过滤--------------------------------------*/
	/** 
	 * 覆盖getParameter方法，将参数名和参数值都做过滤
	 */
	@Override
	public String getParameter(String name){
		String value = super.getParameter(recode(name));
		if (value != null){
			value = recode(value);
		}
		return value;
	}
	/** 
	 * 覆盖getHeader方法，将参数名和参数值都做过滤
	 */
	@Override
	public String getHeader(String name) {
		String value = super.getHeader(recode(name));
		if (value != null) {
			value = recode(value);
		}
		return value;
	}
	/**
	 * 半角字符直接替换成全角字符
	 * @param s
	 * @return
	 */
	private static String recode(String s) {  
		if(s==null||s.isEmpty()){
			return s;
		}
		StringBuilder sb = new StringBuilder(s.length() + 16);
		for (int i = 0; i < s.length(); i++){
			char c = s.charAt(i);
			switch (c) {
				/* 改为全角处理
				case '>':sb.append('＞');break;//全角大于
				case '<':sb.append('＜');break;//全角小于
				case '\'':sb.append('‘');break;//全角单引
				case '\"':sb.append('“');break;//全角双引
				case '&':sb.append('＆');break;//全角
				case '\\':sb.append('＼');break;//全角斜线
				case '#':sb.append('＃');break;//全角井号
			 	*/
				//直接去掉特殊字符
				case '>':break;//大于
				case '<':break;//小于
				case '\'':break;//单引
				case '\"':break;//双引
				case '&':break;//地址符号
				case '\\':break;//斜线
				case '#':break;//井号
				case '(':break;//小括号
				case ')':break;//小括号
				default:sb.append(c);
				break;
			}
		}
		return sb.toString();
	}
	/**
	 * 获取原始的request
	 * @return
	 */
	public HttpServletRequest getOrgRequest() {
		return orgRequest;
	}

	/**
	 * 获取原始的request的静态方法
	 * @return
	 */
	public static HttpServletRequest getOrgRequest(HttpServletRequest req) {
		if (req instanceof CharacterWrapper) {
			return ((CharacterWrapper)req).getOrgRequest();
		}
		return req;
	}  
}  