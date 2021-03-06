package com.ff.controller;

import com.ff.pojo.Commodity;
import com.ff.pojo.Msg;
import com.ff.service.CommodityService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/noi")
public class CommodityController {
    @Autowired
    private CommodityService commodityService;
    @RequestMapping("commodity/All")
    @ResponseBody
    public Msg selectAll(){
        return commodityService.selectAll();
    }

    @RequestMapping("commodity/update")
    @ResponseBody
    public Msg update(Commodity commodity,HttpServletResponse resp, HttpServletRequest request){
        return commodityService.updateByPrimaryKey(commodity,request);
    }

    @RequestMapping("commodity/insert")
    @ResponseBody
    public Msg insert(Commodity commodity,HttpServletResponse resp, HttpServletRequest request){
        return commodityService.insert(commodity,request);
    }

    @RequestMapping("commodity/delete")
    @ResponseBody
    public Msg delete(Commodity commodity,HttpServletResponse resp, HttpServletRequest request){
        return commodityService.delete(commodity.getId());
    }
    @RequestMapping("commodity/byName")
    @ResponseBody
    public Msg selectByName(@Param("commodityName")String commodityName, HttpServletResponse resp, HttpServletRequest request){
        return commodityService.selectByName(commodityName);
    }

}
