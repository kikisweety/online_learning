package com.ff.controller;

import com.ff.pojo.Msg;
import com.ff.pojo.Role;
import com.ff.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/noi")
public class RoelController {
    @Autowired
    RoleService roleService;
    @RequestMapping("role/all")
    @ResponseBody
    public Msg roleAll(HttpServletResponse resp, HttpServletRequest request){
        return roleService.selectAll();
    }
    @RequestMapping("role/delete")
    @ResponseBody
    public Msg delete(Role role,HttpServletResponse resp, HttpServletRequest request){
        int roleId=role.getRoleId();
        return roleService.delete(roleId);
    }
    @RequestMapping("role/add")
    @ResponseBody
    public Msg insert(Role role,HttpServletResponse resp, HttpServletRequest request){
        return roleService.insert(role);
    }
    @RequestMapping("role/update")
    @ResponseBody
    public Msg update(Role role,HttpServletResponse resp, HttpServletRequest request){
        return roleService.update(role);
    }
    @RequestMapping("role/selectById")
    @ResponseBody
    public Msg selectById(Role role,HttpServletResponse resp, HttpServletRequest request){
        return roleService.selectById(role.getRoleId());
    }
}
