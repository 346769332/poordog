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
@RequestMapping("/login")
public class LoginController extends BaseController{
	/**
	 * @Description: 系统登录验证
	 * @param request
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/login")
	public Map login(HttpServletRequest request) throws Exception{
		Map resultMap = new HashMap();
		resultMap.put("result","failed");
		HttpSession httpSession=request.getSession();
		Map loginMap=getParameter(request);		
		//token校验
		String tokenCode=Tools.getStrValue(httpSession.getAttribute(Constant.TOKEN_CODE));
		String randomCode=Tools.getStrValue(loginMap.get("randomCode"));
		if(!"".equals(tokenCode)&&tokenCode.equals(randomCode)){
			//登录类型
			String loginType=Tools.getStrValue(loginMap.get("type"));			
			if(!"".equals(loginType)&&loginType.equals("acct")){
				//验证码校验
				String checkCode=Tools.getStrValue(httpSession.getAttribute(Constant.RANDOM_VALIDATE_CODE)).toLowerCase();
				String loginCheckCode=Tools.getStrValue(loginMap.get("checkCode")).toLowerCase();
				if("".equals(checkCode)||!checkCode.equals(loginCheckCode)){
					resultMap.put("message","验证码错误！");
					return resultMap;
				}
			}
			//工号、验证码登录
			List<LoginInfo> userList=queryList("login.getLoginInfo",loginMap);
			if(userList!=null&&userList.size()==1){
				//获取登录用户菜单
				LoginInfo loginInfo=userList.get(0);
				Map paramMap=new HashMap();
				paramMap.put("roleId",loginInfo.getRoleId());
				List<Map<String,Object>> menuData=queryList("login.getMenuInfo",paramMap);
				loginInfo.setMenuList(menuData);
				httpSession.setAttribute(Constant.LOGIN_INFO,loginInfo);
				resultMap.put("result","success");
				resultMap.put("message","登录成功！");
			}else{
				if(loginType.equals("phone")){
					resultMap.put("message","手机号或短信验证码错误！");
				}else{
					resultMap.put("message","工号或密码错误！");
				}
			}
		}else{
			resultMap.put("message","无效的token！");
		}
		
		return resultMap;
	}
	@ResponseBody
	@RequestMapping("/checkAddress")
	public boolean checkAddress(HttpServletRequest request) throws Exception{
		ExemptionInfo ei=getExemption(request);
		if(ei!=null){
			Map<String,Object> paramMap=new HashMap<String,Object>();
			paramMap.put("type","automatic");
			paramMap.put("acct",ei.getStaff());
			return loginAutomatic(request,paramMap);
		}
		return false;
	}
	/**
	 * 判断是否是免登陆地址
	 * @param request HttpServletRequest
	 * @return ip String
	 * @throws Exception
	 */
	private ExemptionInfo getExemption(HttpServletRequest request) throws Exception{
		//String ipStr=getIpAddr(request);
		//String macStr=GetMacAddress.getMacAddress(ipStr);//当前网络为代理，不能获取客户端的MAC地址,废弃通过MAC地址判断
		//String compareStr=ipStr+"|"+macStr;
		Map checkParam=getParameter(request);
		Object ip=checkParam.get("address");
		if(ip!=null&&!"".equals(ip.toString().trim())){
			Map param=new HashMap();
			param.put("address",ip.toString().trim());
			List<ExemptionInfo> eiList=queryList("login.getExemptionConfig",param);
			if(eiList.size()>0){
				return eiList.get(0);
			}
		}
		return null;
	}
	/**
	 * @Description: 自动登录
	 * @param request
	 * @throws Exception 
	 */
	private boolean loginAutomatic(HttpServletRequest request,Map params) throws Exception{
		//工号、验证码登录
		List<LoginInfo> userList=queryList("login.getLoginInfo",params);
		if(userList!=null&&userList.size()==1){
			HttpSession httpSession=request.getSession();
			//获取登录用户菜单
			LoginInfo loginInfo=userList.get(0);
			Map paramMap=new HashMap();
			paramMap.put("roleId",loginInfo.getRoleId());
			List<Map<String,Object>> menuData=queryList("login.getMenuInfo",paramMap);
			loginInfo.setMenuList(menuData);
			httpSession.setAttribute(Constant.LOGIN_INFO,loginInfo);
			return true;
		}else{
			return false;
		}
	}
	/**
	 * @Description: 菜单获取
	 * @param request
	 */
	@ResponseBody
	@RequestMapping("/info")
	public LoginInfo info(HttpServletRequest request){
		HttpSession httpSession=request.getSession();
		LoginInfo loginInfo=(LoginInfo)httpSession.getAttribute(Constant.LOGIN_INFO);
		return loginInfo;
	}
	/**
	 * @Description: 退出登录
	 * @param request
	 */
	@ResponseBody
	@RequestMapping("/exit")
	public String exit(HttpServletRequest request){
		HttpSession httpSession=request.getSession();
		httpSession.removeAttribute(Constant.LOGIN_INFO);
		return "exit_success";
	}
	/**
	 * @Description: 验证码
	 * @param request response
	 */
	@ResponseBody
	@RequestMapping("/validateCode")
	public void validateCode(HttpServletRequest request,HttpServletResponse response){
		response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片
        response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expire", 0);
        RandomValidateCode randomValidateCode = new RandomValidateCode();
        try{
            randomValidateCode.getRandcode(request, response);//输出图片方法
        }catch(Exception e) {
            e.printStackTrace();
        }
	}
	/**
	 * @Description: 短信验证码
	 * @param request response
	 */
	@ResponseBody
	@RequestMapping("/msgCode")
	public Map msgCode(HttpServletRequest request)throws Exception{
		Map param=getParameter(request);
		param.put("result","");
		queryList("login.generateMsgCode",param);
		return param;
	}
}