package com.ff.serviceImpl;

import com.ff.dao.CommodityMapper;
import com.ff.pojo.Commodity;
import com.ff.pojo.Msg;
import com.ff.pojo.Topic;
import com.ff.service.CommodityService;
import com.ff.util.CosTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class CommodityServiceImpl implements CommodityService {
    @Autowired
    private CommodityMapper commodityMapper;

    @Override
    public Msg selectAll() {
        Msg msg = new Msg();
        List<Commodity> list = commodityMapper.selectAll();
        int length = list.size();
        CosTool cosTool = new CosTool();
        for (int i = 0; i < length; i++) {
            String key = list.get(i).getUrl();
            list.get(i).setUrl(cosTool.getUrl(key));
            String key1 = list.get(i).getCommodityDetails();
            list.get(i).setCommodityDetails(cosTool.getUrl(key1));
        }
        msg.setObject(list);
        msg.setCode(1);
        return msg;
    }

    @Override
    public Msg updateByPrimaryKey(Commodity commodity) {
        Msg msg = new Msg();
        int n = commodityMapper.updateByPrimaryKeySelective(commodity);
        if (n > 0) {
            msg.setCode(1);
            msg.setMsg("ok");
        }


        return msg;
    }

    @Override
    public Msg insert(Commodity commodity, HttpServletRequest request) {
        Msg msg = new Msg();

        CosTool cosTool = new CosTool();
        List<String> keyList = cosTool.uploadFile(CosTool.IMAGE_FOLDER, request);

        if (keyList.size() == 0) {
            msg.setMsg("图片添加失败!");
            return msg;
        }
        commodity.setCommodityDetails(keyList.get(0));
        commodity.setUrl(keyList.get(1));
        Topic buffer = null;
        if (commodityMapper.insert(commodity) == 1) {
            msg.setCode(1);
            msg.setObject(buffer);
            msg.setMsg("添加(" + commodity.getCommodityName() + ")商品成功!");
        } else {
            msg.setCode(-1);
            msg.setMsg("添加(" + commodity.getCommodityName() + ")商品失败!");
        }
        return msg;
    }

    @Override
    public Msg delete(Integer id) {
        Msg msg = new Msg();
        int n = commodityMapper.deleteByPrimaryKey(id);
        if (n > 0) {
            msg.setCode(1);
            msg.setMsg("ok");
        }
        return msg;
    }
}