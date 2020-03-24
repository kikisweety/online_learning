package com.ff.dao;

import com.ff.pojo.Permission;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RolePermissionMapper {

    int deleteByRoleId(int roleId);
}
