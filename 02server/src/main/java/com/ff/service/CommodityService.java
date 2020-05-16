package com.ff.service;

import com.ff.pojo.Commodity;
import com.ff.pojo.Msg;

import javax.servlet.http.HttpServletRequest;

public interface CommodityService {
    Msg selectAll();

    Msg updateByPrimaryKey(Commodity commodity,HttpServletRequest request);

    Msg insert(Commodity commodity, HttpServletRequest request);

    Msg delete(Integer id);
}
