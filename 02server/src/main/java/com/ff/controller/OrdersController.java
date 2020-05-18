package com.ff.controller;

import com.ff.pojo.Commodity;
import com.ff.pojo.Msg;
import com.ff.pojo.Orders;
import com.ff.pojo.User;
import com.ff.service.OrdersService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;

@Controller
@RequestMapping("/noi")
public class OrdersController {
    @Autowired
    private OrdersService orderService;
    @RequestMapping("/order/selectByName")
    @ResponseBody
    public Msg selectByUserName(User user){

        return orderService.selectByUserName(user.getName());
    }
    @RequestMapping("/order/all")
    @ResponseBody
    public Msg selectAll(){
        return orderService.selectAll();
    }
    @RequestMapping("/order/delete")
    @ResponseBody
    public Msg delete(@Param("id")Integer id){

        return orderService.delete(id);
    }
    @RequestMapping("/order/insert")
    @ResponseBody
    private Msg insert(User user, Commodity commodity, @Param("number")int number) throws ParseException {

    return orderService.insert(user,commodity,number);
    }
    @RequestMapping("/order/update")
    @ResponseBody
    private Msg update(Orders order) throws ParseException {

        return orderService.update(order);
    }

}
