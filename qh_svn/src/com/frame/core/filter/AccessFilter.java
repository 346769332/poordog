package com.frame.core.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.frame.common.Constant;
/**
 * @name AccessFilter.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-8-8
 */
public class AccessFilter implements Filter{
	protected static final Logger logger = LoggerFactory.getLogger(AccessFilter.class);

	@Override
	public void init(FilterConfig config) throws ServletException{
		// TODO Auto-generated method stub		
	}
	@Override
	public void doFilter(ServletRequest req, ServletResponse res,FilterChain chain) throws IOException, ServletException{
		HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse) res;
		HttpSession session = request.getSession();
		String servletPath = request.getServletPath();
		//通过验证HTTP Referer字段的开头来判断是否是CSRF攻击;
		/*
		String referer=request.getHeader("Referer");
		if((referer!=null)&&(referer.trim().startsWith("http://135.192.188.254"))){
			chain.doFilter(request, response);
		}else{
			response.sendRedirect(request.getContextPath()+"/system/error/unauthorized.jsp");
		}
		*/
		/*
		logger.debug("getPathInfo:"+request.getPathInfo());
		logger.debug("getContextPath:"+request.getContextPath());
		logger.debug("getQueryString:"+request.getQueryString());
		logger.debug("getRemoteAddr:"+request.getRemoteAddr());
		logger.debug("getRemoteHost:"+request.getRemoteHost());
		logger.debug("getRequestURI:"+request.getRequestURI());
		logger.debug("getHeaderNames:"+request.getHeaderNames());
		*/
		if(session!=null&&session.getAttribute(Constant.LOGIN_INFO)!=null){
			chain.doFilter(request, response);			
			//用户已经登录则进行菜单的过滤,防止越权访问
			/*
			if(servletPath.contains(".jsp")){
				if(servletPath.contains("header_")||
				   servletPath.contains("login.jsp")||
				   servletPath.contains("main/index.jsp")){
					chain.doFilter(request, response);
				}else{
					LoginInfo loginInfo=(LoginInfo)session.getAttribute(Constant.LOGIN_INFO);
					String menuString=loginInfo.getMenuString();					
					if(menuString.contains(servletPath)){//访问有权限的菜单
						chain.doFilter(request, response);
					}else{//访问无权限的菜单,则跳转到登录页
						response.sendRedirect(request.getContextPath()+"/system/error/unauthorized.jsp");
					}
				}
			}else{
				chain.doFilter(request, response);
			}*/
		}else{
			//当前网络环境为代理,无法获取IP
			/*
			if(servletPath.contains("main/index.jsp")){
				ExemptionInfo ei=null;
				try{
					ei=getExemption(request);
					if(ei!=null){
						//验证特殊地址，免登陆
						LoginController lc=com.frame.common.BeanUtil.getBean(com.system.module.login.controller.LoginController.class);
						Map<String,Object> paramMap=new HashMap<String,Object>();
						paramMap.put("type","automatic");
						paramMap.put("acct",ei.getStaff());
						boolean result=false;
						result=lc.loginAutomatic(request,paramMap);
						if(result){
							chain.doFilter(request, response);
						}else{
							response.sendRedirect(request.getContextPath()+"/system/login/login.jsp");
						}
					}else{
						response.sendRedirect(request.getContextPath()+"/system/login/login.jsp");
					}
				}catch(Exception e){
					e.printStackTrace();
				}				
			}else{*/
				if(servletPath.contains("login.do")||
						servletPath.contains("login.jsp")||
						servletPath.contains("login/index.jsp")||
						servletPath.contains("jquery.min.js")||
						servletPath.contains(".ico")||
						servletPath.contains(".css")||
						servletPath.contains(".png")||
						servletPath.contains("checkAddress.do")||
						servletPath.contains("msgCode.do")||
						servletPath.contains("validateCode.do")){
					chain.doFilter(request, response);
				}else{
					response.sendRedirect(request.getContextPath()+"/system/login/login.jsp");
				}
			//}
		}
	}
	@Override
	public void destroy(){
		// TODO Auto-generated method stub		
	}	
	/**
	 * 通过HttpServletRequest返回IP地址
	 * @param request HttpServletRequest
	 * @return ip String
	 * @throws Exception
	 */
	public String getIpAddr(HttpServletRequest request) throws Exception{
		String ip=request.getHeader("x-forwarded-for");
		if(ip==null||ip.length()==0||"unknown".equalsIgnoreCase(ip)){
			ip=request.getHeader("Proxy-Client-IP");
		}
		if(ip==null||ip.length()==0||"unknown".equalsIgnoreCase(ip)){
			ip=request.getHeader("WL-Proxy-Client-IP");
		}
		if(ip==null||ip.length()==0||"unknown".equalsIgnoreCase(ip)){
			ip=request.getHeader("HTTP_CLIENT_IP");
		}
		if(ip==null||ip.length()==0||"unknown".equalsIgnoreCase(ip)){
			ip=request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if(ip==null||ip.length()==0||"unknown".equalsIgnoreCase(ip)){
			ip=request.getRemoteAddr();
		}
		logger.debug("===================================="+ip+"==================================");
		return ip;
	}
}