package com.ff.service;

import com.ff.pojo.Msg;
import com.ff.pojo.Role;

public interface RoleService {
    Msg selectAll();

    Msg delete(int roleId);

    Msg insert(Role role);

    Msg update(Role role);

    Msg selectById(Integer roleId);
}
