package com.frame.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

/**
 * @name RequestMapping.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-9-2
 */
public class RequestMapping{
	protected static final Logger logger = LoggerFactory.getLogger(RequestMapping.class);
	private static RequestMapping rm;
	private List<String> mappingList;
	private RequestMapping(){
		mappingList=new ArrayList<String>();//获取应用的所有请求映射列表
		RequestMappingHandlerMapping rmhp=(RequestMappingHandlerMapping)com.frame.common.BeanUtil.getBean("requestMappingHandlerMapping");
        Map<RequestMappingInfo, HandlerMethod> map = rmhp.getHandlerMethods();
        for (Map.Entry<RequestMappingInfo, HandlerMethod> m : map.entrySet()){
        	RequestMappingInfo rmi= m.getKey();
        	String requestUrl =rmi.getPatternsCondition().toString();
        	mappingList.add(requestUrl);
        }
        logger.info(mappingList.toString());
	}
	public static List<String> getMappingList(){
		if(rm==null){
			rm=new RequestMapping();
		}
		return rm.mappingList;
	}
}
