package com.system.commom.service.impl;

import com.system.commom.service.BaseService;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("baseService")
@SuppressWarnings("unchecked")
public class BaseServiceImpl implements BaseService {
	@Resource(name = "oracleClient")
	private SqlSessionTemplate oracleClient;

	public List getList(String statement) throws Exception{
		return oracleClient.selectList(statement);
	}
	public Object getOne(String sqlId, Map<String, Object> params) throws Exception{
		return oracleClient.selectOne(sqlId, params);
	}
	public List getList(String sqlId, Map<String, Object> params) throws Exception{
		return oracleClient.selectList(sqlId, params);
	}
	public List getPageList(String sqlId, Map<String, Object> params) throws Exception{
		Object page=params.get("page");
		Object rows=params.get("rows");
		int currentPage=1,pageSize=5;
		//分页参数处理--页码
		if(null!=page&&"".equals(page)){
			currentPage=Integer.parseInt(page.toString());
		}else{
			currentPage=1;
		}
		//分页参数处理--每页展示的条数
		if(null!=rows&&"".equals(rows)){
			pageSize=Integer.parseInt(rows.toString());
		}else{
			pageSize=5;
		}
		return oracleClient.selectList(sqlId, params,new RowBounds((currentPage-1)*pageSize,pageSize));
	}
	@Transactional
	public void addData(final String sqlId, final Map<String, Object> params) throws Exception{
		oracleClient.insert(sqlId, params);
	}
	@Transactional
	public void delData(final String sqlId, final Map<String, Object> params) throws Exception{		
		oracleClient.delete(sqlId, params);
	}
	@Transactional
	public void updateData(final String sqlId, final Map<String, Object> params) throws Exception{
		oracleClient.update(sqlId, params);
	}	
	public SqlSessionTemplate getOracleClient() {
		return oracleClient;
	}
	public void setOracleClient(SqlSessionTemplate oracleClient) {
		this.oracleClient = oracleClient;
	}
}
