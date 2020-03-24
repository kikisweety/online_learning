package com.ff.pojo;

public class RolePermission {
    private Integer rolePermissionId;
    private Integer roleId;
    private Integer PermissionId;

    public Integer getRolePermissionId() {
        return rolePermissionId;
    }

    public void setRolePermissionId(Integer rolePermissionId) {
        this.rolePermissionId = rolePermissionId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getPermissionId() {
        return PermissionId;
    }

    public void setPermissionId(Integer permissionId) {
        PermissionId = permissionId;
    }
}
