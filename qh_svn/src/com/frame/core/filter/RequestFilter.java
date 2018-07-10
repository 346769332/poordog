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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @name RequestFilter.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-9-1
 */
public class RequestFilter implements Filter{
	protected static final Logger logger = LoggerFactory.getLogger(RequestFilter.class);
	
	@Override
	public void init(FilterConfig config) throws ServletException{
		// TODO Auto-generated method stub		
	}
	@Override
	public void doFilter(ServletRequest req, ServletResponse res,FilterChain chain) throws IOException, ServletException{
		HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse) res;
		//String servletPath = request.getServletPath();	
		//List<String> mappingList=RequestMapping.getMappingList();		
		chain.doFilter(request, response);
	}
	@Override
	public void destroy(){
		// TODO Auto-generated method stub		
	}
}
