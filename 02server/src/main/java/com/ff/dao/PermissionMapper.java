package com.ff.dao;

import com.ff.pojo.Permission;
import com.ff.pojo.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PermissionMapper {
    List<Permission> querypermissionByUserId(int userId);



    List<Permission> selectAll();

    int deleteByPrimaryKey(int permisssionId);

    int insertSelective(int permisssionId);

    int updateByPrimaryKeySelective(int permisssionId);

    List<Permission> querypermissionByPId_Son(Integer permissionId);

    User selectByPrimaryKey(Integer permissionId);
}
