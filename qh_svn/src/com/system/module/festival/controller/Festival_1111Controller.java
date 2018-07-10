package com.system.module.festival.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.system.commom.controller.BaseController;

@Controller
@SuppressWarnings("all")
@RequestMapping("/festival_1111")
public class Festival_1111Controller extends BaseController{
	/**
	 * @Description: 双十一专题--应用TOP10
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/app")
	public List app(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1020","1115").get("type").toString());
		return queryList("festival_1111.getAppInfo",paramMap);
	}
	/**
	 * @Description: 双十一专题--地图信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1020","1115").get("type").toString());
		return queryList("festival_1111.getMapInfo",paramMap);
	}
	/**
	 * @Description: 双十一专题--流量信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/flow")
	public List flow(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1020","1115").get("type").toString());
		return queryList("festival_1111.getFlowInfo",paramMap);
	}
	/**
	 * @Description: 双十一专题--用户特征信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/user")
	public List user(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1020","1115").get("type").toString());
		return queryList("festival_1111.getUserInfo",paramMap);
	}
	/**
	 * @Description: 双十一专题--热词信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/hotWord")
	public Map hotWord(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1020","1115").get("type").toString());
		Map resultMap=new HashMap();
		resultMap.put("info",queryList("festival_1111.getHotWordInfo",paramMap));
		resultMap.put("rank",queryList("festival_1111.getHotWordRank",paramMap));
		return resultMap;
	}
	/**
	 * @Description: 双十一专题--114访问信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/visit114")
	public List visit114(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1020","1115").get("type").toString());
		return queryList("festival_1111.getVisit114Info",paramMap);
	}
	/**
	 * @Description: 双十一专题--翼支付交付质量
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/wingPay")
	public List wingPay(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1020","1115").get("type").toString());
		return queryList("festival_1111.getWingPayInfo",paramMap);
	}
}