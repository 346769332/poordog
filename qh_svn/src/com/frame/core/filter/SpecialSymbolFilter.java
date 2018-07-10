package com.frame.core.filter;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.frame.common.CharacterWrapper;

/**
 * @name SpecialSymbolFilter.java
 * @author hechuan
 * @version 2.0
 * @description LSS--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-8-5
 */
public class SpecialSymbolFilter implements Filter{
	protected static final Logger logger = LoggerFactory.getLogger(SpecialSymbolFilter.class);
	public void init(FilterConfig config) throws ServletException {
		
	}
	
	public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) 
	throws IOException, ServletException{
		CharacterWrapper xssRequest = new CharacterWrapper((HttpServletRequest) request);
		chain.doFilter(xssRequest, response);
	}
	
	public void destroy() {
		
	}  
} 