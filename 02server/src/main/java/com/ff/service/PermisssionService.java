package com.ff.service;

import com.ff.pojo.Msg;
import com.ff.pojo.Permission;

import java.util.List;

public interface PermisssionService {

//根据父ID查询字菜单
    List<Permission> querypermissionByPId_Son(Integer permissionId);

    /**
     * 根据用户ID查找菜单
     * @param userId
     * @return
     */
    List<Permission> queryMenuByUserId(int userId);

    Msg selectAll();

    Msg delete(int permisssionId);

    Msg insert(int permisssionId);

    Msg update(int permisssionId);

    Msg selectById(Integer permissionId);
}
