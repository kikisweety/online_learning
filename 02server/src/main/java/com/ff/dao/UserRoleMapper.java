package com.ff.dao;

import com.ff.pojo.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface UserRoleMapper {
    List<Role> findByUserName(String userName);

    int deleteByUserId(Integer userId);
}
