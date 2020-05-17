package com.ff.service;

import com.ff.pojo.Msg;
import com.ff.pojo.User;

public interface UserService {

     Msg insert(User user);

     Msg delete(Integer userId);

    Msg update(User user);


    Msg userUpdate(Integer userId);

    Msg userAll();


    Msg selectUserById(Integer userId);

    Msg queryUserRoles(String loginName);

    Msg selectUserByName(String name);
}
