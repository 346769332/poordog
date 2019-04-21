package com.edu.spring.tmm;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

public class MyJob1 implements Job {

	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		String s = (String) arg0.getJobDetail().getJobDataMap().get("s");
		System.out.println("234 "+s+"___"+new Date());

	}

}
