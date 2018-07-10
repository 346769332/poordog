package com.system.commom.service;

import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public interface BaseService {
    /**
     * 通过sql查询
     * @param statement
     * @return List
	 * @throws Exception 
     */
	public List getList(String statement) throws Exception;
    /**
     * 普通查询列表数据
     * @param sqlId,params
     * @return List
	 * @throws Exception 
     */
	List getList(String sqlId,Map<String, Object> params) throws Exception;
	/**
     * 查询一条
     * @param sqlId,params
     * @return List
	 * @throws Exception 
     */
	Object getOne(String sqlId, Map<String, Object> params) throws Exception;
    /**
     * 分页查询页数据
     * @param sqlId,params
     * @return List
	 * @throws Exception 
     */
	List getPageList(String sqlId, Map<String, Object> params) throws Exception;
    /**
     * 修改操作
     * @param sqlId,params
     * @return void
	 * @throws Exception 
     */
	void updateData(String sqlId,Map<String, Object> params) throws Exception;

    /**
     * 新增操作
     * @param sqlId,params
     * @return void
	 * @throws Exception 
     */
	void addData(String sqlId,Map<String, Object> params) throws Exception;
    /**
     * 删除操作
     * @param sqlId,params
     * @return void
	 * @throws Exception 
     */
	void delData(String sqlId,Map<String, Object> params) throws Exception;
}
