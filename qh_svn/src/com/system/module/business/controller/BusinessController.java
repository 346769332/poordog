package com.system.module.business.controller;

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
@RequestMapping("/business")
public class BusinessController extends BaseController{
	/**
	 * @Description: 翼商联盟--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("business.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 翼商联盟--详细信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/detail")
	public List detail(HttpServletRequest request) throws Exception{
		return queryList("business.getDetailInfo",getParameter(request));
	}
	/**
	 * @Description: 翼商联盟--缴费易TOP商铺
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/easyPay")
	public List easyPay(HttpServletRequest request) throws Exception{
		return queryList("business.getEasyPayRankInfo",getParameter(request));
	}
	/**
	 * @Description: 翼商联盟--翼支付TOP商铺
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/wingPay")
	public List wingPay(HttpServletRequest request) throws Exception{
		return queryList("business.getWingPayRankInfo",getParameter(request));
	}
	/**
	 * @Description: 翼商联盟--发展量TOP商铺
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/develop")
	public List develop(HttpServletRequest request) throws Exception{
		return queryList("business.getDevelopRankInfo",getParameter(request));
	}
}