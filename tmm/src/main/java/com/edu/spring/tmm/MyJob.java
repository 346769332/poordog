package com.edu.spring.tmm;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.matchers.GroupMatcher;

public class MyJob implements Job {

	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		System.out.println("tmm"+new Date());
		Scheduler scheduler = (Scheduler) arg0.getJobDetail().getJobDataMap().get("scheduler");
		System.out.println(scheduler);
	
		try {
			for (String groupName : scheduler.getJobGroupNames()) {
				for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.jobGroupEquals(groupName))) {
					     // System.out.println("Current JOB : "+jobKey);
					if(!jobKey.toString().equals("testGroup.testJob")){
						scheduler.deleteJob(jobKey);
						
					}
				}
			}
			//scheduler.deleteJob(arg0);
			
		} catch (SchedulerException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		//3.创建JobDetail(作业信息)
		String s= UUID.randomUUID().toString();
        JobDetail jb = JobBuilder.newJob(MyJob1.class)
                .withDescription("this is a test job") //job的描述
                .withIdentity("testJob"+s, "testGroup")//job 的name和group
                .build();


        //向任务传递数据
        JobDataMap jobDataMap = jb.getJobDataMap();
        jobDataMap.put("s", s);

        
        //任务运行的时间，SimpleSchedle类型触发器有效
        long time = System.currentTimeMillis() + 3 * 1000L; //3秒后启动任务
        Date statTime = new Date(time);

        //4.创建Trigger
        //使用SimpleScheduleBuilder或者CronScheduleBuilder
        Trigger t = TriggerBuilder.newTrigger()
                .withDescription("")
                .withIdentity("ramTrigger"+s, "ramTriggerGroup")
                .startAt(statTime)  //默认当前时间启动
                //普通计时器
                //.withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInSeconds(3).withRepeatCount(3))//间隔3秒，重复3次
                //表达式计时器
                //.withSchedule(CronScheduleBuilder.cronSchedule("0/3 * * * * ?")) //3秒执行一次
                .withSchedule(SimpleScheduleBuilder.simpleSchedule().repeatSecondlyForever(10)
                        )
                .build();

        //5.注册任务和定时器
        try {
			scheduler.scheduleJob(jb, t);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
