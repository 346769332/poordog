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
@RequestMapping("/festival_0101")
public class Festival_0101Controller extends BaseController{
	//--------------------------------春节信息---------------------------------------------
	/**
	 * @Description: 春节--用户活跃排行
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/user")
	public List user(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getUserRankInfo",getParameter(request));
	}
	/**
	 * @Description: 春节--话务量信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/call")
	public List call(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getCallBusiInfo",getParameter(request));
	}
	/**
	 * @Description: 春节--短信量信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/message")
	public List message(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getMessageBusiInfo",getParameter(request));
	}
	/**
	 * @Description: 春节--互联互通信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/contact")
	public List contact(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getContactInfo",getParameter(request));
	}
	/**
	 * @Description: 春节--社交信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/social")
	public List social(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getSocialInfo",getParameter(request));
	}
	/**
	 * @Description: 春节--户均信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/average")
	public List average(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getAverageBusiInfo",getParameter(request));
	}
	//--------------------------------春节详情---------------------------------------------
	/**
	 * @Description: 春节详情--互联网流量信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/detail_flow")
	public List detailFlow(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getDetailFlowInfo",getParameter(request));
	}
	/**
	 * @Description: 春节详情--IP流量信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/detail_ipFlow")
	public List detailIpFlow(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getDetailIpFlowInfo",getParameter(request));
	}
	/**
	 * @Description: 春节详情--话务量信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/detail_call")
	public List detailCall(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getDetailCallInfo",getParameter(request));
	}
	/**
	 * @Description: 春节详情--互联互通信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/detail_contact")
	public List detailContact(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getDetailContactInfo",getParameter(request));
	}
	/**
	 * @Description: 春节详情--短信彩信信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/detail_message")
	public List detailMessage(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getDetailMessageInfo",getParameter(request));
	}
	//--------------------------------年货回家---------------------------------------------
	/**
	 * @Description: 年货回家--出行/购物软件排行
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/goods_soft")
	public List goodsSoft(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getGoodsSoftRankInfo",getParameter(request));
	}
	/**
	 * @Description: 年货回家--地图信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/goods_map")
	public List goodsMap(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getGoodsMapInfo",getParameter(request));
	}
	/**
	 * @Description: 年货回家--出行信息
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/goods_travel")
	public List goodsTravel(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getGoodsTravelInfo",getParameter(request));
	}
	/**
	 * @Description: 年货回家--APP应用分类
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/goods_app")
	public List goodsApp(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getGoodsAppInfo",getParameter(request));
	}
	/**
	 * @Description: 年货回家--热词
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/goods_hotWord")
	public List goodsHotWord(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getGoodsHotWordInfo",getParameter(request));
	}
	/**
	 * @Description: 年货回家--用户分布
	 * @param request
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/goods_user")
	public List goodsUser(HttpServletRequest request) throws Exception{
		return queryList("festival_0101.getGoodsUserInfo",getParameter(request));
	}
}