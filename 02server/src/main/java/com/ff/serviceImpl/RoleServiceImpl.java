package com.ff.serviceImpl;

import com.ff.dao.RoleMapper;
import com.ff.dao.RolePermissionMapper;
import com.ff.pojo.Msg;
import com.ff.pojo.Role;
import com.ff.pojo.User;
import com.ff.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private RolePermissionMapper rolePermissionMapper;
    @Override
    public Msg selectAll() {
        Msg msg = new Msg();
        List<Role> list = roleMapper.selectAll();
        if(list!=null && list.size()>0){
            msg.setCode(1);
            msg.setMsg("OK");
            msg.setObject(list);
        }
        return msg;
    }

    @Override
    public Msg delete(int roleId) {
        Msg msg = new Msg();
        int n =roleMapper.deleteByPrimaryKey(roleId);
        int k =rolePermissionMapper.deleteByRoleId(roleId);
        if(n>=1&& k>=1){
            msg.setCode(1);
            msg.setMsg("OK");
        }
        return msg;
    }

    @Override
    public Msg insert(Role role) {
        Msg msg = new Msg();
        int n =roleMapper.insertSelective(role);
        if(n>=1){
            msg.setCode(1);
            msg.setMsg("OK");
        }
        return msg;
    }

    @Override
    public Msg update(Role role) {
        Msg msg = new Msg();
        int n =roleMapper.updateByPrimaryKeySelective(role);
        if(n>=1){
            msg.setCode(1);
            msg.setMsg("OK");
        }
        return msg;
    }

    @Override
    public Msg selectById(Integer roleId) {
        Msg msg = new Msg();
        User user = roleMapper.selectByPrimaryKey(roleId);
        if(user!=null ){
            msg.setCode(1);
            msg.setMsg("OK");
            msg.setObject(user);
        }
        return msg;
    }
}
