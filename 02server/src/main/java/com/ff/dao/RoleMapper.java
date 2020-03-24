package com.ff.dao;

import com.ff.pojo.Role;
import com.ff.pojo.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {
    List<Role> selectAll();

    int deleteByPrimaryKey(int roleId);

    int insertSelective(Role role);

    int updateByPrimaryKeySelective(Role role);

    User selectByPrimaryKey(Integer roleId);
}
