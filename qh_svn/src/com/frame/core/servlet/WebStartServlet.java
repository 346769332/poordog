package com.frame.core.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.system.commom.service.BaseService;

/**
 * @name WebStartServlet.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System  程序启动检测--数据库连接测试等
 * @email hechuan@tydic.com
 * @date Created On : 2016-9-5
 */
public class WebStartServlet extends HttpServlet{
	private static final long serialVersionUID = -7883274375800770837L;
	protected static final Logger logger = LoggerFactory.getLogger(WebStartServlet.class);

	@SuppressWarnings("unchecked")
	@Override
    public void init() throws ServletException {
        try {
        	//数据库检测
    		logger.debug("---------数据库连接测试---------");    		
    		BaseService bs=(BaseService)com.frame.common.BeanUtil.getBean("baseService");
        	bs.getList("common.checkConnection");
    		logger.debug("---------数据库连接测试成功,数据源可用！---------");
        } catch (Exception e) {
    		logger.debug("---------数据库连接失败！---------");
            e.printStackTrace();
        }
    }
}