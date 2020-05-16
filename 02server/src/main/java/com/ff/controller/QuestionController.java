package com.ff.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.pojo.Chapter;
import com.ff.pojo.Msg;
import com.ff.pojo.Question;
import com.ff.service.QuestionService;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/noi")
public class QuestionController {
	@Autowired
	private QuestionService questionService;

	@RequestMapping(value = "question/add")
	@ResponseBody
	public Msg insertQuestion(Question question, HttpServletResponse resp, HttpServletRequest request) {

		return questionService.insert(question);
	}

	@RequestMapping(value = "question/and/chapterid")
	@ResponseBody
	public Msg selectQuestionbyid(Chapter chapter, HttpServletResponse resp, HttpServletRequest request) {

		return questionService.selectQuestionsByChapterid(chapter);
	}
	@RequestMapping(value = "question/result")
	@ResponseBody
	public Msg result( @RequestBody List<Question> questionList, HttpServletResponse resp, HttpServletRequest request) {
		//List<Question> questionList= JSON.parseArray(jsonList,Question.class);

		return questionService.questionResult(questionList);
	}
	@RequestMapping(value = "question/delete")
	@ResponseBody
	public Msg delete(@Param("id")Integer id, HttpServletResponse resp, HttpServletRequest request) {

		return questionService.questionDelete(id);
	}
    @RequestMapping(value = "question/chapterid")
    @ResponseBody
    public Msg questionbyid(@Param("chapterId") int chapterId,HttpServletResponse resp, HttpServletRequest request) {

        return questionService.Questionbyid(chapterId);
    }
    @RequestMapping(value = "question/all")
	@ResponseBody
	public Msg questionAll(HttpServletResponse resp, HttpServletRequest request) {

		return questionService.questionAll();
	}
	@RequestMapping(value = "question/update")
	@ResponseBody
	public Msg questionUpdate(Question question,HttpServletResponse resp, HttpServletRequest request) {

		return questionService.questionUpdate(question);
	}

}
