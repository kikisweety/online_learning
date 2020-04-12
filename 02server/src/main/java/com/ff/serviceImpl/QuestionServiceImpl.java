package com.ff.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ff.dao.QuestionMapper;
import com.ff.pojo.Chapter;
import com.ff.pojo.Course;
import com.ff.pojo.Msg;
import com.ff.pojo.Question;
import com.ff.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionMapper questionMapper;

	@Override
	public Msg insert(Question question) {
		Msg msg = new Msg();
		msg.setMsg("添加失败");
		if (questionMapper.insert(question) == 1) {
			msg.setMsg("添加成功");
			msg.setCode(1);
		}
		return msg;
	}

	@Override
	public Msg selectQuestionsAll() {

		CourseServiceImpl courseServiceImpl = new CourseServiceImpl();

		Msg msg = courseServiceImpl.selectAllQuestionsOfCourses();

		courseServiceImpl = null;

		return msg;
	}

	@Override
	public Msg selectQuestionsByChapterid(Chapter chapter) {
		Msg msg = new Msg();
		List<Question> list = questionMapper.selectQuestionsBychapterId(chapter.getId());
		if (list.size() >= 1) {
			msg.setMsg("操作成功");
			msg.setCode(1);
			msg.setObject(list);
		}
		return msg;

	}

	@Override
	public Msg questionResult(List<Question> result) {
		Msg msg = new Msg();
		int achievement=0;
		for (int n=0;n<result.size();n++){
			if(result.get(n).getAnswer().equals(result.get(n).getTextA())||result.get(n).getAnswer().equals(result.get(n).getTextB())||result.get(n).getAnswer().equals(result.get(n).getTextC())||result.get(n).getAnswer().equals(result.get(n).getTextD())){
				achievement+=10;
			}
		}
		msg.setObject(achievement);
		msg.setMsg("ok");
		return msg;
	}

	@Override
	public Msg questionDelete(Question question) {
		Msg msg = new Msg();
		if(questionMapper.questionDelete(question.getId())==1){
			msg.setMsg("ok");
		}
		return null;
	}

	@Override
	public Msg Questionbyid(int chapterId) {
		Msg msg = new Msg();
		List<Question> list = questionMapper.questionsBychapterId(chapterId);
		if (list.size() >= 1) {
			msg.setMsg("操作成功");
			msg.setCode(1);
			msg.setObject(list);
		}
		return msg;
	}

	@Override
	public Msg questionAll() {
		Msg msg = new Msg();
		List<Question> list = questionMapper.questionsAll();
		if (list.size() >= 1) {
			msg.setMsg("操作成功");
			msg.setCode(1);
			msg.setObject(list);
		}
		return msg;
	}

}
