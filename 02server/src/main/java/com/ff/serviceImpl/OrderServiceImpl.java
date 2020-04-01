package com.ff.serviceImpl;

import com.ff.dao.CommodityMapper;
import com.ff.dao.OrderMapper;
import com.ff.pojo.Commodity;
import com.ff.pojo.Msg;
import com.ff.pojo.Order;
import com.ff.pojo.User;
import com.ff.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    CommodityMapper commodityMapper;
    @Override
    public Msg selectByUserName(String name) {
        Msg msg = new Msg();
        List<Order> list = orderMapper.selectByUserName(name);
        if(list!=null&&list.size()>0){
            msg.setMsg("ok");
            msg.setObject(list);
            msg.setCode(1);
        }
        return msg;
    }

    @Override
    public Msg selectAll() {
        Msg msg = new Msg();
        List<Order> list=orderMapper.selectAll();
        if(list!=null&&list.size()>0){
            msg.setMsg("ok");
            msg.setObject(list);
            msg.setCode(1);
        }
        return msg;
    }

    @Override
    public Msg delete(Integer id) {
        Msg msg = new Msg();
        int n= orderMapper.deleteByPrimaryKey(id);
        if(n==1){
            msg.setMsg("ok");

            msg.setCode(1);
        }

        return msg;
    }

    @Override
    public Msg insert(User user, Commodity commodity,int number) throws ParseException {
        Msg msg = new Msg();
        Date day=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date= df.format(day);
        Order order=new Order();
        order.setBuyUser(user.getName());
        order.setCommodityName(commodity.getCommodityName());
        order.setCommodityPrice(commodity.getCommodityPrice());
        order.setAmount(number);
        order.setTotalPrice(number*commodity.getCommodityPrice());
        order.setBuyDate(df.parse(date));
        commodity.setAmount(commodity.getAmount()-number);
        if(orderMapper.insertSelective(order)==1&&commodityMapper.updateByPrimaryKey(commodity)==1){
            msg.setCode(1);
            msg.setMsg("ok");

        }

        return msg;
    }
}
