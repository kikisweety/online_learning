package com.ff.pojo;

import java.util.Date;

public class Role {
    private Integer roleId;
    private String roleName;
    private  String roleDesc;
    private String Role_state;
    private Date createTime;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDesc() {
        return roleDesc;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    public String getRole_state() {
        return Role_state;
    }

    public void setRole_state(String role_state) {
        Role_state = role_state;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
