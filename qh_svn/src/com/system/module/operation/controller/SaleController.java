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
@RequestMapping("/sale")
public class SaleController extends BaseController{
	/**
	 * @Description: 销售详情--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("sale.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 销售详情--今日销售套餐TOP10
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/dinner")
	public List dinner(HttpServletRequest request) throws Exception{
		return queryList("sale.getSaleDinnerInfo",getParameter(request));
	}
	/**
	 * @Description: 销售详情--销量
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/valume")
	public List valume(HttpServletRequest request) throws Exception{
		return queryList("sale.getSaleValumeInfo",getParameter(request));
	}
	/**
	 * @Description: 销售详情--4G用户发展信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/develop")
	public List develop(HttpServletRequest request) throws Exception{
		return queryList("sale.getDevelopUserInfo",getParameter(request));
	}
}