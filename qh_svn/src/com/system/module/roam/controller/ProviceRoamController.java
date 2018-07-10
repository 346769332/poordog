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
@RequestMapping("/proviceRoam")
public class ProviceRoamController extends BaseController{
	/**
	 * @Description: 省内漫游--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("proviceRoam.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 省内漫游--入境信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/enter")
	public List enter(HttpServletRequest request) throws Exception{
		return queryList("proviceRoam.getEnterInfo",getParameter(request));
	}
	/**
	 * @Description: 省内漫游--出境信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/leave")
	public List leave(HttpServletRequest request) throws Exception{
		return queryList("proviceRoam.getLeaveInfo",getParameter(request));
	}
}