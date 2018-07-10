package com.system.module.festival.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frame.common.LoginInfo;
import com.frame.common.RandomValidateCode;
import com.system.commom.controller.BaseController;
import com.system.commom.service.BaseService;

@Controller
@SuppressWarnings("all")
@RequestMapping("/festival_1001")
public class Festival_1001Controller extends BaseController{
	/**
	 * @Description: 国庆专题--地图
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1001","1007").get("type").toString());
		return queryList("festival_1001.getMapInfo",paramMap);
	}
	/**
	 * @Description: 国庆专题--漫入信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/roamIn")
	public List roamIn(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1001","1007").get("type").toString());
		return queryList("festival_1001.getRoamInInfo",paramMap);
	}
	/**
	 * @Description: 国庆专题--漫出信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/roamOut")
	public List roamOut(HttpServletRequest request) throws Exception{
		Map paramMap=getParameter(request);
		paramMap.put("dateType",getLimitDate("1001","1007").get("type").toString());
		return queryList("festival_1001.getRoamOutInfo",paramMap);
	}
}