package com.ff.serviceImpl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.ff.dao.TeacherMapper;
import com.ff.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ff.dao.CourseMapper;
import com.ff.service.CourseService;
import com.ff.util.CosTool;

@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
	private CourseMapper courseMapper;
	@Autowired
	private TeacherMapper teacherMapper;

	public Msg selectCourseAll() {

		Msg msg = new Msg();

		// 获得课程数据
		List<Course> list = courseMapper.selectCourseAll();
		if (list != null && list.size() >= 1) {
			msg.setCode(1);

			msg.setMsg("操作成功!");

			CosTool cosTool = new CosTool();
			for (int i = 0; i < list.size(); i++) {
				// 到腾讯云服务器换图片地址
				String url = cosTool.getUrl(list.get(i).getUrl());
				list.get(i).setUrl(url);
			}

			msg.setObject(list);
		}

		return msg;
	}

	@Override
	public Msg insertCourses(Course course, HttpServletRequest request) {
		Msg msg = new Msg();

		// 判断数据库是否有该课程
		if (courseMapper.getCourseByName(course.getName()) != null) {
			msg.setCode(2);
			msg.setMsg("已经存在(" + course.getName() + ")课程");
			return msg;
		}

		CosTool cosTool = new CosTool();
		List<String> keyList = cosTool.uploadFile(CosTool.IMAGE_FOLDER, request);

		if (keyList.size() == 0) {
			msg.setMsg("图片添加失败!");
			return msg;
		}

		// 设置图片
		course.setUrl(keyList.get(0));

		if (courseMapper.insert(course) == 1) {
			msg.setCode(1);
			msg.setObject(course);
			msg.setMsg("增加(" + course.getName() + ")课程成功!");
		} else {
			msg.setCode(3);
			msg.setMsg("增加(" + course.getName() + ")课程失败!");
		}

		return msg;
	}

	@Override
	public Msg selectCourseAllLeaf() {
		Msg msg = new Msg();

		// 获得课程数据
		List<Course> list = courseMapper.selectCourseAllLeaf();
		if (list != null && list.size() >= 1) {
			msg.setCode(1);
			msg.setMsg("操作成功!");
			msg.setObject(list);
		}

		return msg;
	}

	@Override
	public Msg selectCourseAndChapters() {

		Msg msg = new Msg();

		// 获得课程数据
		List<Course> list = courseMapper.selectCourseAndChapters();
		if (list != null && list.size() >= 1) {
			msg.setCode(1);
			msg.setMsg("操作成功!");
			msg.setObject(list);
		}

		return msg;
	}

	@Override
	public Msg selectAllQuestionsOfCourses() {

		Msg msg = new Msg();
		msg.setMsg("查询失败！");

		List<Course> list = courseMapper.selectAllQuestionsOfCourses();
		if (list != null && list.size() >= 1) {
			msg.setObject(list);
			msg.setMsg("查询成功！！");
		}
		return msg;
	}

	@Override
	public Msg deleteById() {
		return null ;
	}

	@Override
	public Msg selectByType(int courseType) {
		Msg msg = new Msg();
		msg.setMsg("查询失败！");

		List<Course> list = courseMapper.selectByType(courseType);
		int length = list.size();
		if (list != null && list.size() >= 1) {
			CosTool cosTool = new CosTool();
			for (int i = 0; i < length; i++) {
				String key = list.get(i).getUrl();
				list.get(i).setUrl(cosTool.getUrl(key));
				for(int k=0;k<list.get(i).getChapters().size();k++){
					for(int m=0;m<list.get(i).getChapters().get(k).getVideos().size();m++){
						String video=list.get(i).getChapters().get(k).getVideos().get(i).getUrl();
						list.get(i).getChapters().get(k).getVideos().get(m).setUrl(cosTool.getUrl(video));
					}
				}

			}
			msg.setObject(list);
			msg.setMsg("查询成功！！");
		}
		return msg;
	}

	@Override
	public Msg selectTeacher(int teacherId) {
		Msg msg =new Msg();
		Teacher teacher=teacherMapper.selectTeacherById(teacherId);

		if(teacher!=null){
			CosTool cosTool = new CosTool();
			String key = teacher.getTkey();
			teacher.setTkey(cosTool.getUrl(key));

			msg.setObject(teacher);
			msg.setCode(1);
			msg.setMsg("ok");
		}
		return msg;
	}

	@Override
	public Msg selectQuestionByType(int courseType) {
		Msg msg = new Msg();
		msg.setMsg("查询失败！");

		List<Course> list = courseMapper.selectQuestionByType(courseType);
		int length = list.size();
		if (list != null && list.size() >= 1) {
			CosTool cosTool = new CosTool();
			for (int i = 0; i < length; i++) {
				String key = list.get(i).getUrl();
				list.get(i).setUrl(cosTool.getUrl(key));

			}
			msg.setObject(list);
			msg.setMsg("查询成功！！");
		}
		return msg;
	}

	@Override
	public Msg update(Course course) {
		Msg msg = new Msg();
		if(courseMapper.update(course)==1){
			msg.setMsg("查询成功！！");
			msg.setCode(1);

		}
		return msg;
	}

}
