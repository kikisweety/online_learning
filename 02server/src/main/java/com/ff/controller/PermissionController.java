package com.ff.controller;

import com.ff.pojo.Msg;
import com.ff.pojo.Permission;
import com.ff.service.PermisssionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/noi")
public class PermissionController {
    @Autowired
    private PermisssionService permisssionService;
    @RequestMapping("/menu/all")
    @ResponseBody
    public Msg permissionAll(HttpServletRequest request, HttpServletResponse response){
        return permisssionService.selectAll();

    }

    @RequestMapping("menu/delete")
    @ResponseBody
    public Msg delete(Permission permission,HttpServletRequest request, HttpServletResponse response){
        int permisssionId=permission.getPermissionId();
        return permisssionService.delete(permisssionId);

    }
    @RequestMapping("menu/update")
    @ResponseBody
    public Msg update(Permission permission,HttpServletRequest request, HttpServletResponse response){
        int permisssionId=permission.getPermissionId();
        return permisssionService.update(permisssionId);

    }
    @RequestMapping("menu/insert")
    @ResponseBody
    public Msg insert(Permission permission,HttpServletRequest request, HttpServletResponse response){
        int permisssionId=permission.getPermissionId();
        return permisssionService.insert(permisssionId);

    }
    @RequestMapping("menu/selectById")
    @ResponseBody
    public Msg selectById(Permission permission,HttpServletRequest request, HttpServletResponse response){

        return permisssionService.selectById(permission.getPermissionId());

    }
}
