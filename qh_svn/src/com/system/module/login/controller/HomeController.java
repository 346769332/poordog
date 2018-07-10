package com.system.module.login.controller;

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
import com.frame.common.Constant;
import com.frame.common.ExemptionInfo;
import com.frame.common.LoginInfo;
import com.frame.common.RandomValidateCode;
import com.frame.common.Tools;
import com.system.commom.controller.BaseController;
import com.system.commom.service.BaseService;

@Controller
@SuppressWarnings("all")
@RequestMapping("/home")
public class HomeController extends BaseController{
	/**
	 * @Description: 首页--4G用户信息
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/userVal")
	public List userVal(HttpServletRequest request) throws Exception{
		return queryList("home.getUserValInfo",getParameter(request));
	}
	/**
	 * @Description: 首页--翼支付交易金额
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/wingPayVal")
	public List wingPayVal(HttpServletRequest request) throws Exception{
		return queryList("home.getWingPayValInfo",getParameter(request));
	}
	/**
	 * @Description: 首页--漫入用户数
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roamVal")
	public List roamVal(HttpServletRequest request) throws Exception{
		return queryList("home.getRoamValInfo",getParameter(request));
	}
	/**
	 * @Description: 首页--ITV用户数
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/itvVal")
	public List itvVal(HttpServletRequest request) throws Exception{
		return queryList("home.getItvValInfo",getParameter(request));
	}
	/**
	 * @Description: 首页--翼支付交易
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/wingPay")
	public List wingPay(HttpServletRequest request) throws Exception{
		return queryList("home.getWingPayInfo",getParameter(request));
	}
	/**
	 * @Description: 首页--漫入省份
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/roam")
	public List roam(HttpServletRequest request) throws Exception{
		return queryList("home.getRoamInfo",getParameter(request));
	}
}