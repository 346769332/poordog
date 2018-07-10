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
@RequestMapping("/income")
public class IncomeController extends BaseController{
	/**
	 * @Description: 收入详情--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("income.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 收入详情--产品收入分析
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/product")
	public List product(HttpServletRequest request) throws Exception{
		return queryList("income.getProductInfo",getParameter(request));
	}
	/**
	 * @Description: 收入详情--按账目类型分析收入
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/account")
	public List account(HttpServletRequest request) throws Exception{
		return queryList("income.getAccountInfo",getParameter(request));
	}
	/**
	 * @Description: 收入详情--当月收入趋势与上月对比
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/contrasts")
	public List contrasts(HttpServletRequest request) throws Exception{
		return queryList("income.getContrastsInfo",getParameter(request));
	}
}