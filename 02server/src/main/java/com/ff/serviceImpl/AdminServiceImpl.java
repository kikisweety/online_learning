package com.ff.serviceImpl;

import com.ff.pojo.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ff.dao.AdminMapper;
import com.ff.pojo.Admin;
import com.ff.pojo.Msg;
import com.ff.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminMapper adminMapper;

	@Override
	public Msg check(Admin admin) {
		// 创建信息对象
		Msg msg = new Msg();

		System.out.println(admin);
		// 查询用户信息
		Admin buffer = adminMapper.check(admin);
		// 验证用户的合法性
		if (null == buffer) {
			msg.setMsg("用户不存在，请联系管理员!");
		} else {
			// 获得查询的用户名
			String bufferPasswd = buffer.getPasswd();
			String passwd = admin.getPasswd();

			if (bufferPasswd.endsWith(passwd)) {
				msg.setCode(1);// 用户合法
				msg.setMsg("用户合法!");
			} else {
				msg.setCode(0);// 用户存在，但是密码不正确
				msg.setMsg("密码错误，请重新输入密码!");
			}

		}
		return msg;
	}

	@Override
	public Msg insert(Admin admin) {
		// 创建信息对象
		Msg msg = new Msg();

		System.out.println(admin);
		Topic buffer = null;
		if (adminMapper.insert(admin) == 1) {
			msg.setCode(1);
			msg.setObject(buffer);
			msg.setMsg("添加(" + admin.getName() + ")用户成功!");
		} else {
			msg.setCode(-1);
			msg.setMsg("添加(" + admin.getName() + ")用户失败!");
		}
		
		return msg;
	}


}
