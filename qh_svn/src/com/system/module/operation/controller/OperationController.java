package com.system.module.operation.controller;

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
@RequestMapping("/operation")
public class OperationController extends BaseController{
	/**
	 * @Description: 运营监控--4G用户信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/user")
	public List user(HttpServletRequest request) throws Exception{
		return queryList("operation.getUserInfo",getParameter(request));
	}
	/**
	 * @Description: 运营监控--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("operation.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 运营监控--翼支付信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/wingPay")
	public List wingPay(HttpServletRequest request) throws Exception{		
		return queryList("operation.getWingPayInfo",getParameter(request));
	}
	/**
	 * @Description: 运营监控--销售信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/sale")
	public List sale(HttpServletRequest request) throws Exception{
		return queryList("operation.getSaleInfo",getParameter(request));
	}
	/**
	 * @Description: 运营监控--欠费信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/oweFee")
	public List oweFee(HttpServletRequest request) throws Exception{
		return queryList("operation.getOweFeeInfo",getParameter(request));
	}
	/**
	 * @Description: 运营监控--收入信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/income")
	public List income(HttpServletRequest request) throws Exception{
		return queryList("operation.getIncomeInfo",getParameter(request));
	}
	/**
	 * @Description: 运营监控--itv分类
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/itv")
	public List itv(HttpServletRequest request) throws Exception{
		return queryList("operation.getItvInfo",getParameter(request));
	}
}