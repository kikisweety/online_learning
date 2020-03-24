package com.ff.controller;

import com.ff.pojo.AdVideo;
import com.ff.pojo.Msg;
import com.ff.service.AdVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/noi")
public class AdVideoController {
    @Autowired
    private AdVideoService adVideoService;

    @RequestMapping("adVideo/add")
    @ResponseBody
    public Msg insertAdVideo(AdVideo adVideo, HttpServletResponse resp, HttpServletRequest req){
        return adVideoService.insertAdVideo(adVideo);
    }
    @RequestMapping("adVideo/update")
    @ResponseBody
    public  Msg updateVideo(AdVideo adVideo, HttpServletResponse resp, HttpServletRequest req){
        return adVideoService.updateVideo(adVideo);
    }
    @RequestMapping("adVideo/select")
    @ResponseBody
    public Msg SelectByName(AdVideo adVideo, HttpServletResponse resp, HttpServletRequest req){
        return adVideoService.AdVideoTopics();
    }


}
