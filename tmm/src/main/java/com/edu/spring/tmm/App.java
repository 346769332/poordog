package com.edu.spring.tmm;

import java.util.Date;

import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws SchedulerException
    {
        System.out.println( "Hello World!"+new Date() );
        SchedulerFactory sf = new StdSchedulerFactory();

        //2.从工厂中获取调度器实例
        Scheduler scheduler = sf.getScheduler();

        
        //3.创建JobDetail(作业信息)
        JobDetail jb = JobBuilder.newJob(MyJob.class)
                .withDescription("this is a test job") //job的描述
                .withIdentity("testJob", "testGroup")//job 的name和group
                .build();
        for (int i = 0; i < 2; i++) {
        	//向任务传递数据
            JobDataMap jobDataMap = jb.getJobDataMap();
            jobDataMap.put("scheduler", scheduler);
            jobDataMap.put("i", i);
		}
        

        
        //任务运行的时间，SimpleSchedle类型触发器有效
        long time = System.currentTimeMillis() + 3 * 1000L; //3秒后启动任务
        Date statTime = new Date(time);

        //4.创建Trigger
        //使用SimpleScheduleBuilder或者CronScheduleBuilder
        Trigger t = TriggerBuilder.newTrigger()
                .withDescription("")
                .withIdentity("ramTrigger", "ramTriggerGroup")
                .startAt(statTime)  //默认当前时间启动
                .withSchedule(SimpleScheduleBuilder.simpleSchedule().repeatMinutelyForever(1)
                        )
                .build();

        //5.注册任务和定时器
        scheduler.scheduleJob(jb, t);

        //6.启动 调度器
        scheduler.start();
     
        
    }
}
