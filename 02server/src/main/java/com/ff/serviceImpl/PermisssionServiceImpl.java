package com.ff.serviceImpl;

import com.ff.dao.PermissionMapper;
import com.ff.pojo.Msg;
import com.ff.pojo.Permission;
import com.ff.pojo.User;
import com.ff.service.PermisssionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PermisssionServiceImpl implements PermisssionService {
    @Autowired
    private PermissionMapper permissionMapper;

    @Override
    public List<Permission> querypermissionByPId_Son(Integer permissionId) {
        return permissionMapper.querypermissionByPId_Son(permissionId);
    }


    @Override
    public List<Permission> queryMenuByUserId(int userId) {
        return null;
    }

    @Override
    public Msg selectAll() {
        Msg msg = new Msg();
        List<Permission> list = permissionMapper.selectAll();
        if (list != null && list.size() > 0) {
            msg.setCode(1);
            msg.setMsg("ok");
            msg.setObject(list);
        }
        return msg;
    }
        @Override
        public Msg delete ( int permisssionId){
            Msg msg = new Msg();
            int n= permissionMapper.deleteByPrimaryKey(permisssionId);
            if(n>=1){
                msg.setCode(1);
                msg.setMsg("ok");
            }
            return msg;
        }

        @Override
        public Msg insert ( int permisssionId){
            Msg msg = new Msg();
            int n= permissionMapper.insertSelective(permisssionId);
            if(n>=1){
                msg.setCode(1);
                msg.setMsg("ok");
            }
            return msg;
        }

        @Override
        public Msg update ( int permisssionId){
            Msg msg = new Msg();
            int n= permissionMapper.updateByPrimaryKeySelective(permisssionId);
            if(n>=1){
                msg.setCode(1);
                msg.setMsg("ok");
            }
            return msg;
        }

    @Override
    public Msg selectById(Integer permissionId) {
        Msg msg = new Msg();
        User user= permissionMapper.selectByPrimaryKey(permissionId);
        if(user!=null){
            msg.setCode(1);
            msg.setMsg("ok");
        }
        return msg;
    }

}
