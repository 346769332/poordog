package com.system.module.roam.controller;

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
@RequestMapping("/scenicRoam")
public class ScenicRoamController extends BaseController{
	/**
	 * @Description: 景点漫游--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("scenicRoam.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 景点漫游--漫入信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roamIn")
	public List roamIn(HttpServletRequest request) throws Exception{
		return queryList("scenicRoam.getRoamInInfo",getParameter(request));
	}
	/**
	 * @Description: 景点漫游--漫入方式
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roamInType")
	public List roamInType(HttpServletRequest request) throws Exception{
		return queryList("scenicRoam.getRoamInTypeInfo",getParameter(request));
	}
	/**
	 * @Description: 景点漫游--景点排行
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/rank")
	public List rank(HttpServletRequest request) throws Exception{
		return queryList("scenicRoam.getRankInfo",getParameter(request));
	}
}