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
@RequestMapping("/wingPay")
public class WingPayController extends BaseController{
	/**
	 * @Description: 翼支付详情--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("wingPay.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 翼支付详情--最近七天用户数
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/user")
	public List user(HttpServletRequest request) throws Exception{
		return queryList("wingPay.getUserInfo",getParameter(request));
	}
	/**
	 * @Description: 翼支付详情--分析结果
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/result")
	public List result(HttpServletRequest request) throws Exception{
		return queryList("wingPay.getResultInfo",getParameter(request));
	}
	/**
	 * @Description: 翼支付详情--最近七天翼支付金额
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/money")
	public List money(HttpServletRequest request) throws Exception{
		return queryList("wingPay.getMoneyInfo",getParameter(request));
	}
}