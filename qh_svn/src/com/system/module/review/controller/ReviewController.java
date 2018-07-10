package com.system.module.review.controller;

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
@RequestMapping("/review")
public class ReviewController extends BaseController{
	/**
	 * @Description: 往年回顾--话务量信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/call")
	public List call(HttpServletRequest request) throws Exception{
		return queryList("review.getCallBusiInfo",getParameter(request));
	}
	/**
	 * @Description: 往年回顾--地图信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/map")
	public List map(HttpServletRequest request) throws Exception{
		return queryList("review.getMapInfo",getParameter(request));
	}
	/**
	 * @Description: 往年回顾--短信量信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/message")
	public List message(HttpServletRequest request) throws Exception{
		return queryList("review.getMessageBusiInfo",getParameter(request));
	}
	/**
	 * @Description: 往年回顾--充值信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/recharge")
	public List recharge(HttpServletRequest request) throws Exception{
		return queryList("review.getRechargeInfo",getParameter(request));
	}
	/**
	 * @Description: 往年回顾--手机用户上网信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/mobile")
	public List mobile(HttpServletRequest request) throws Exception{
		return queryList("review.getMobileUserInfo",getParameter(request));
	}
	/**
	 * @Description: 往年回顾--用户行为(APP)
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/app")
	public List app(HttpServletRequest request) throws Exception{
		return queryList("review.getAppInfo",getParameter(request));
	}
	/**
	 * @Description: 往年回顾--用户行为(URL)
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/url")
	public List url(HttpServletRequest request) throws Exception{
		return queryList("review.getUrlInfo",getParameter(request));
	}
	/**
	 * @Description: 往年回顾--用户行为(APP)
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/keyword")
	public List keyword(HttpServletRequest request) throws Exception{
		return queryList("review.getKeywordInfo",getParameter(request));
	}
	/**
	 * @Description: 往年回顾--用户行为(APP)
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/interest")
	public List interest(HttpServletRequest request) throws Exception{
		return queryList("review.getInterestInfo",getParameter(request));
	}
}