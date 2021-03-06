package com.ff.service;

import com.ff.pojo.Commodity;
import com.ff.pojo.Msg;
import com.ff.pojo.Orders;
import com.ff.pojo.User;

import java.text.ParseException;

public interface OrdersService {
    Msg selectByUserName(String name);

    Msg selectAll();

    Msg delete(Integer id);

    Msg insert(User user, Commodity commodity,int number) throws ParseException;

    Msg update(Orders order);
}
