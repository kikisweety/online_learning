package com.ff.controller;

import com.ff.pojo.Msg;
import com.ff.pojo.User;
import com.ff.service.UserService;
import com.ff.util.MD5Utils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/noi")
public class UserController {
    @Autowired
    private UserService userService;
    @RequestMapping("user/add")
    @ResponseBody
    public Msg insert(User user, HttpServletResponse resp, HttpServletRequest request) {
        return userService.insert(user);
    }
    @RequestMapping("user/delete")
    @ResponseBody
    public Msg delete(@Param("userId")Integer userId, HttpServletResponse resp, HttpServletRequest request){
        return userService.delete(userId);

    }
    @RequestMapping("user/update")
    @ResponseBody
    public Msg userUpdate(User user,HttpServletResponse resp, HttpServletRequest request){
        user.setPassword(MD5Utils.encrypt(user.getPassword()));
        return userService.update(user.getUserId());

    }
    @RequestMapping("user/all")
    @ResponseBody
    public Msg userAll(User user,HttpServletResponse resp, HttpServletRequest request){
        return userService.userAll();

    }
    @RequestMapping("user/selectById")
    @ResponseBody
    public Msg selectUserById(User user,HttpServletResponse resp, HttpServletRequest request){
        return userService.selectUserById(user.getUserId());
    }


}
