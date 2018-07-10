package com.system.module.travel.controller;

import java.util.ArrayList;
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
@RequestMapping("/travel")
public class TravelController extends BaseController{
	/**
	 * @Description: 青海旅游--漫入用户省份分布
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/userProvice")
	public List userProvice(HttpServletRequest request) throws Exception{
		return queryList("travel.getUserProviceInfo",getParameter(request));
	}
	/**
	 * @Description: 青海旅游--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("travel.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 青海旅游--本地网热门线路
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/localHotLine")
	public List localHotLine(HttpServletRequest request) throws Exception{
		return queryList("travel.getLocalHotLineInfo",getParameter(request));
	}
	/**
	 * @Description: 青海旅游--旅游热门线路
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/travelHotLine")
	public List travelHotLine(HttpServletRequest request) throws Exception{
		return queryList("travel.getTravelHotLineInfo",getParameter(request));
	}
	/**
	 * @Description: 青海旅游--省最近30天漫入人数
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/lastRoamIn")
	public List lastRoamIn(HttpServletRequest request) throws Exception{
		return queryList("travel.getLastRoamInInfo",getParameter(request));
	}
	/**
	 * @Description: 青海旅游--漫入用户景点排行
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/scenicRank")
	public List scenicRank(HttpServletRequest request) throws Exception{
		return queryList("travel.getScenicRankInfo",getParameter(request));
	}
	/**
	 * @Description: 青海旅游--漫入用户景点排行
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/localUser")
	public List localUser(HttpServletRequest request) throws Exception{
		return queryList("travel.getLocalUserInfo",getParameter(request));
	}
}