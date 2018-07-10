package com.frame.common;

import java.util.ArrayList;
import java.util.List;

public class Test {
	
	/**
	 * @Title:@param args
	 * @Description:方法
	 * @param:request
	 * @return:MapEntry<String,Object>
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		List<String> testList=new ArrayList<String>();
		testList.add("com/frame/common/BaseMap.jsp");
		testList.add("com/frame/common/error_503.jsp");
		testList.add("system/page/module/festival/festival_01.01_detail.jsp");
		testList.add("system/frame/common/review.jsp");
		testList.add("system/frame/common/index.jsp");
		testList.add("system/frame/common/operation.jsp");
		testList.add("system/frame/common/festival_11.11.jsp");
		testList.add("system/frame/common/festival_01.01_goods.jsp");
		testList.add("system/frame/common/festival_01.01_detail.jsp");
		testList.add("system/frame/common/festival_10.01.jsp");
		testList.add("com/frame/common/business.jsp");
		
		StringBuffer testBuffer=new StringBuffer();
		testBuffer.append("com/frame/common/BaseMap.jsp,");
		testBuffer.append("com/frame/common/error_503.jsp,");
		testBuffer.append("system/page/module/festival/festival_01.01_detail.jsp,");
		testBuffer.append("system/frame/common/review.jsp,");
		testBuffer.append("system/frame/common/index.jsp,");
		testBuffer.append("system/frame/common/operation.jsp,");
		testBuffer.append("system/frame/common/festival_11.11.jsp,");
		testBuffer.append("system/frame/common/festival_01.01_goods.jsp,");
		testBuffer.append("system/frame/common/festival_01.01_detail.jsp,");
		testBuffer.append("system/frame/common/festival_10.01.jsp,");
		testBuffer.append("com/frame/common/business.jsp,");
		String testString=testBuffer.toString();
		long a=System.nanoTime();
		//在最好的一行加上:
		testList.contains("com/frame/common/business.jsp");
		System.out.println("List执行耗时 : "+(System.nanoTime()-a)+"纳秒");
		
		a=System.nanoTime();
		//在最好的一行加上:
		testString.contains("com/frame/common/business.jsp");
		System.out.println("String执行耗时 : "+(System.nanoTime()-a)+"纳秒"); 
	}

}
