package com.ff.controller;


import com.ff.pojo.Msg;
import com.ff.pojo.User;
import com.ff.service.UserService;
import com.ff.util.MD5Utils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = { "http://localhost:3000", "null" })
@Controller
@RequestMapping("/noi")
public class LoginController {
    @Autowired
    private UserService userService;
    @RequestMapping("/login")
    @ResponseBody
    public Msg Login(String loginName,String password, HttpServletRequest req, HttpServletResponse resp){
        try {
            Subject subject = SecurityUtils.getSubject();
            password = MD5Utils.encrypt(loginName, password);
            UsernamePasswordToken token = new UsernamePasswordToken(loginName, password);
            subject.login(token);

        }catch (Exception e){

            e.printStackTrace();

        }

        return userService.queryUserRoles(loginName);
    }
    @RequestMapping("/index")
    @ResponseBody
    public Msg Index(Model model){
        Msg msg =new Msg();

        User user = (User) SecurityUtils.getSubject().getPrincipals();
        model.addAttribute("user",user);
        msg.setMsg("欢迎"+user.getName());
        msg.setObject(user);

        return msg;
    }
//测试
}
