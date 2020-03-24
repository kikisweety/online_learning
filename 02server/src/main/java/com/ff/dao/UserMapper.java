package com.ff.dao;

import com.ff.pojo.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    User queryUserByloginName(String loginName);

    List<User> userAll();

    int deleteByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(Integer userId);

    int insertSelective(User user);

    User selectByPrimaryKey(Integer userId);
}
