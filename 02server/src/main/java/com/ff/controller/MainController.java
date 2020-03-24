package com.ff.controller;

import com.ff.pojo.Msg;
import com.ff.pojo.Permission;
import com.ff.pojo.User;
import com.ff.service.PermisssionService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/noi")
public class MainController {
    @Autowired
    private PermisssionService permisssionService;
    @RequestMapping("main")
    @ResponseBody
    public Msg main(HttpServletRequest request, HttpServletResponse response, HttpSession session,
                    Model model){
        Msg msg=new Msg();
        Subject subject = SecurityUtils.getSubject();
        User user = (User) subject.getPrincipals();
        int userId =user.getUserId();
        List<Permission> menuList =permisssionService.queryMenuByUserId(userId);
        HashMap<Integer, List<Permission>> permissionList = new HashMap<>();
        for (Permission menu : menuList) {
            // 3、菜单下权限列表
            List<Permission> menuDownPermissionList = permisssionService.querypermissionByPId_Son(menu.getPermissionId());
            // 4、 维护父节点和子节点关系
            int pId = menu.getPermissionId();
            permissionList.put(pId, menuDownPermissionList);
//            request.setAttribute("menuList", menuList);
//            request.setAttribute("permissionList", permissionList);
        }
        msg.setMsg("ok");
        return msg;
    }
}
