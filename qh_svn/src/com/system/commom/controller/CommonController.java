package com.system.commom.controller;

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
import com.frame.common.LoginInfo;
import com.frame.common.RandomValidateCode;
import com.frame.common.Tools;
import com.system.commom.controller.BaseController;
import com.system.commom.service.BaseService;

@Controller
@SuppressWarnings("all")
@RequestMapping("/common")
public class CommonController extends BaseController{
	/**
	 * @Description: 归属地查询
	 * @param request response
	 */
	@ResponseBody
	@RequestMapping("/region")
	public List regionList()throws Exception{
		return queryList("common.regionList",null);
	}
	/**
	 * @Description: 角色查询
	 * @param request response
	 */
	@ResponseBody
	@RequestMapping("/role")
	public List roleList()throws Exception{
		return queryList("common.roleList",null);
	}
}