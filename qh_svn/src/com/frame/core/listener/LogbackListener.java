package com.frame.core.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.core.joran.spi.JoranException;

/**
 * @name LogbackListener.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-8-5
 */
public class LogbackListener implements ServletContextListener{
	private static final Logger logger = LoggerFactory.getLogger(LogbackListener.class);
	private static final String CONFIG_FILE = "logbackConfigLocation";
	@Override
	public void contextDestroyed(ServletContextEvent event){
		// TODO Auto-generated method stub
	}
	@Override
	public void contextInitialized(ServletContextEvent event){
        String logbackConfigLocation = event.getServletContext().getInitParameter(CONFIG_FILE);
        String fn = event.getServletContext().getRealPath(logbackConfigLocation);
        try {
            LoggerContext loggerContext = (LoggerContext)LoggerFactory.getILoggerFactory();
            loggerContext.reset();
            JoranConfigurator joranConfigurator = new JoranConfigurator();
            joranConfigurator.setContext(loggerContext);
            joranConfigurator.doConfigure(fn);
            logger.debug("logback configure file from{}", fn);
        }catch (JoranException e) {
            logger.error("can not find configure file from " + fn, e);
        }
	}
}
