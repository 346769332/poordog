package com.frame.common;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
/**
 * @name BeanUtil.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System 获取springMVC注册的实体bean工具
 * @email hechuan@tydic.com
 * @date Created On : 2016-9-2
 */
public class BeanUtil implements ApplicationContextAware{
	private static ApplicationContext applicationContext;
	public static <T> T getBean(Class<T> beanClass){
		return applicationContext.getBean(beanClass);
	}
	public static Object getBean(String beanName){
		return applicationContext.getBean(beanName);
	}
	public static <T> T getBean(String beanName, Class<T> clazz){
		return clazz.cast(getBean(beanName));
	}
	@Override
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		// TODO Auto-generated method stub
		BeanUtil.applicationContext = applicationContext;
	} 
}
