package com.ff.controller;

import com.ff.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/noi")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

}
