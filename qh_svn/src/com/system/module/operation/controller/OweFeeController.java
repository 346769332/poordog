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
@RequestMapping("/oweFee")
public class OweFeeController extends BaseController{
	/**
	 * @Description: 欠费详情--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("oweFee.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 欠费详情--当月欠费金额趋势
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/trend")
	public List trend(HttpServletRequest request) throws Exception{
		return queryList("oweFee.getTrendInfo",getParameter(request));
	}
	/**
	 * @Description: 欠费详情--分析结论
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/result")
	public List result(HttpServletRequest request) throws Exception{
		return queryList("oweFee.getResultInfo",getParameter(request));
	}
	/**
	 * @Description: 欠费详情--欠费组成分布
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/form")
	public List form(HttpServletRequest request) throws Exception{
		return queryList("oweFee.getFormInfo",getParameter(request));
	}
}