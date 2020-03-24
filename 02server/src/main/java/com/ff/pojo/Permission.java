package com.ff.pojo;

import java.util.Date;

public class Permission {

    private Integer permissionId;

    private Integer pId;

    private String name;

    private String type;

    private String  permission_desc;

    private String url;

    private Date createTimme;

    private String percode;

    public Integer getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Integer permissionId) {
        this.permissionId = permissionId;
    }

    public Integer getpId() {
        return pId;
    }

    public void setpId(Integer pId) {
        this.pId = pId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPermission_desc() {
        return permission_desc;
    }

    public void setPermission_desc(String permission_desc) {
        this.permission_desc = permission_desc;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getCreateTimme() {
        return createTimme;
    }

    public void setCreateTimme(Date createTimme) {
        this.createTimme = createTimme;
    }

    public String getPercode() {
        return percode;
    }

    public void setPercode(String percode) {
        this.percode = percode;
    }
}
