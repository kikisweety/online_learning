package com.ff.serviceImpl;

import com.ff.dao.RoleMapper;
import com.ff.dao.UserMapper;
import com.ff.dao.UserRoleMapper;
import com.ff.pojo.Msg;
import com.ff.pojo.User;
import com.ff.service.UserService;
import com.ff.util.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserRoleMapper userRoleMapper;

    @Override
    public Msg insert(User user) {
        Msg msg = new Msg();
        if(user.getPassword()==null){
            user.setPassword("123456");
        }
        user.setPassword(MD5Utils.encrypt(user.getLoginName(),user.getPassword()));
        int n =userMapper.insertSelective(user);
        if(n>=1){
            msg.setCode(1);
            msg.setMsg("操作成功!");
        }

        return msg;
    }

    @Override
    public Msg delete(Integer userId) {
        Msg msg = new Msg();
        int n =userMapper.deleteByPrimaryKey(userId);
        int k =userRoleMapper.deleteByUserId(userId);
        if(n>=1&&k>=1){
            msg.setCode(1);
            msg.setMsg("操作成功!");
        }

        return msg;
    }

    @Override
    public Msg update(Integer userId) {
        Msg msg = new Msg();

        int n =userMapper.updateByPrimaryKeySelective(userId);
        if(n>=1){
            msg.setCode(1);
            msg.setMsg("操作成功!");
        }
        return msg;
    }

    @Override
    public Msg userUpdate(Integer userId) {

        return null;
    }

    @Override
    public Msg userAll() {
        Msg msg = new Msg();
        List<User> userList = userMapper.userAll();
        if (userList != null && userList.size() >= 1) {
            msg.setCode(1);
            msg.setMsg("操作成功!");
            msg.setObject(userList);
        }
        return msg;
    }

    @Override
    public Msg selectUserById(Integer userId) {
        Msg msg = new Msg();
        User user = userMapper.selectByPrimaryKey(userId);
        if (user != null) {
            msg.setCode(1);
            msg.setMsg("操作成功!");
            msg.setObject(user);
        }
        return msg;

    }

    @Override
    public Msg queryUserRoles(String loginName) {
        Msg msg = new Msg();
        User user = userMapper.queryUserRoles(loginName);
        if(user!=null){
            msg.setCode(1);
            msg.setMsg("操作成功!");
            msg.setObject(user);
        }

        return msg;
    }


}
