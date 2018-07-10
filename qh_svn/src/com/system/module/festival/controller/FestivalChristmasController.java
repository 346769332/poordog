package com.system.module.festival.controller;

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
@RequestMapping("/christmas")
public class FestivalChristmasController extends BaseController{
	//--------------------------------圣诞节信息---------------------------------------------
	/**
	 * @Description: 圣诞节--兴趣点
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/interest")
	public List interest(HttpServletRequest request) throws Exception{
		return queryList("christmas.getInterestInfo",getLimitDate("1224","1225"));
	}
	/**
	 * @Description: 圣诞节--话务量信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/call")
	public List call(HttpServletRequest request) throws Exception{
		return queryList("christmas.getCallBusiInfo",getLimitDate("1224","1225"));
	}
	/**
	 * @Description: 圣诞节--短信量信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/msg")
	public List msg(HttpServletRequest request) throws Exception{
		return queryList("christmas.getMsgBusiInfo",getLimitDate("1224","1225"));
	}
	/**
	 * @Description: 圣诞节--翼支付信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/wingPay")
	public List wingPay(HttpServletRequest request) throws Exception{
		return queryList("christmas.getWingPayInfo",getLimitDate("1224","1225"));
	}
	/**
	 * @Description: 圣诞节--应用app
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/app")
	public List app(HttpServletRequest request) throws Exception{
		return queryList("christmas.getAppInfo",getLimitDate("1224","1225"));
	}
	/**
	 * @Description: 圣诞节--购物、人流量、吃、喝、玩
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/multiple")
	public List multiple(HttpServletRequest request) throws Exception{
		return queryList("christmas.getMultipleInfo",getLimitDate("1224","1225"));
	}
}