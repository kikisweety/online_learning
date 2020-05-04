package com.ff.service;

import com.ff.pojo.Commodity;
import com.ff.pojo.Msg;
import com.ff.pojo.Order;
import com.ff.pojo.User;

import java.text.ParseException;

public interface OrderService {
    Msg selectByUserName(String name);

    Msg selectAll();

    Msg delete(Integer id);

    Msg insert(User user, Commodity commodity,int number) throws ParseException;

    Msg update(Order order);
}
