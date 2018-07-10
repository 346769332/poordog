package com.system.commom.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.frame.common.Constant;
import com.frame.common.LoginInfo;
import com.system.commom.service.BaseService;

/**
 * @name BaseController.java
 * @author hechuan
 * @version 2.0
 * @description lss--Large Screen System
 * @email hechuan@tydic.com
 * @date Created On : 2016-8-5
 */
@SuppressWarnings("all")
public class BaseController{
	protected static final Logger logger = LoggerFactory.getLogger(BaseController.class);
	@Resource(name = "baseService")
	private BaseService baseService;
	/**
     * 普通查询数据
     * @param sqlId,paramMap
     * @return List
	 * @throws Exception 
     */
	protected List queryList(String sqlId,Map paramMap) throws Exception{
		return baseService.getList(sqlId,paramMap);
	};
	/**
     * 单条查询
     * @param sqlId,paramMap
     * @return List
	 * @throws Exception 
     */
	protected Object querySingle(String sqlId,Map paramMap) throws Exception{
		return baseService.getOne(sqlId,paramMap);
	};
    /**
     * 分页查询
     * @param sqlId,paramMap
     * @return Map
     * @throws Exception 
     */
	protected Map queryPage(String sqlId,Map paramMap) throws Exception{
		Map resultMap=new HashMap();
		resultMap.put("total",baseService.getList(sqlId,paramMap).size());
		resultMap.put("rows",baseService.getPageList(sqlId,paramMap));
		return resultMap;
	};
    /**
     * 修改操作
     * @param sqlId,paramMap
     * @return void
     * @throws Exception 
     */
	protected void update(String sqlId,Map paramMap) throws Exception{
		baseService.updateData(sqlId,paramMap);
	};

    /**
     * 新增操作
     * @param sqlId,paramMap
     * @return void
     * @throws Exception 
     */
	protected void add(String sqlId,Map paramMap) throws Exception{
		baseService.addData(sqlId,paramMap);
	};
    /**
     * 删除操作
     * @param sqlId,paramMap
     * @return void
     * @throws Exception 
     */
	protected void delete(String sqlId,Map paramMap) throws Exception{
		baseService.delData(sqlId,paramMap);
	};
	
	//参数获取
	protected Map getParameter(HttpServletRequest request){
		Map params=new HashMap();
		Iterator<Map.Entry<String, String[]>> iter = request.getParameterMap().entrySet().iterator();
		while (iter.hasNext()){
			Map.Entry<String, String[]> entry = iter.next();
			String key = entry.getKey();
			String[] val = entry.getValue();
			if(val.length == 1){
				params.put(key, val[0]);
			}else if (val.length > 1){
				if(key.endsWith("[]")){
					key = key.substring(0, key.length() - 2);
				}
				params.put(key, val);
			}else{
				params.put(key, null);
			}
		}
		LoginInfo lf=(LoginInfo)request.getSession().getAttribute(Constant.LOGIN_INFO);
		if(lf!=null){
			params.put("userId",lf.getUserId());
		}
		return params;
	}
	//-----------------------------公共方法-------------------------
	//时间判断
	protected Map getLimitDate(String startDate,String endDate){
		String[] dateStr=new SimpleDateFormat("yyyy,MMdd").format(new Date()).split(",");
		int year=Integer.valueOf(dateStr[0]);
		String day=dateStr[1];
		int result=day.compareTo(startDate);
		String type="";
		if(result<0){
			year-=1;
			type="before";
		}else{
			result=day.compareTo(endDate);
			if(result>0){
				type="after";
			}else{
				type="middle";
			}
		}
		Map resultMap=new HashMap();
		resultMap.put("year",year);
		resultMap.put("startDate",year+startDate);
		resultMap.put("endDate",year+endDate);
		resultMap.put("type",type);
		return resultMap;
	}
	//成功返回--List
	protected Map result(List list){
		Map resultMap =new HashMap();
		resultMap.put("data",list);
		return resultMap;
	}
	//成功返回--Map
	protected Map result(Map map){
		Map resultMap =new HashMap();
		resultMap.put("data",map);
		return resultMap;
	}
}