package com.ff.serviceImpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ff.dao.CourseMapper;
import com.ff.pojo.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ff.dao.TeacherMapper;
import com.ff.pojo.Msg;
import com.ff.pojo.Teacher;
import com.ff.pojo.Topic;
import com.ff.service.TeacherService;
import com.ff.util.CosTool;

@Service
public class TeacherServiceImpl implements TeacherService {

	@Autowired
	TeacherMapper teacherMapper;
	@Autowired
	CourseMapper courseMapper;

	@Override
	public Msg selectTeachers() {

		Msg msg = new Msg();
		List<Teacher> list = teacherMapper.selectTeachers();
		int length = list.size();
		CosTool cosTool = new CosTool();
		for (int i = 0; i < length; i++) {
			String key = list.get(i).getTkey();
			list.get(i).setTkey(cosTool.getUrl(key));
		}
		msg.setObject(list);
		msg.setCode(1);

		return msg;
	}

	@Override
	public Msg insertTeacher(Teacher teacher, HttpServletRequest request) {

		Msg msg = new Msg();

		// 查询是否已经存在该老师
		if (teacherMapper.selectTeacher(teacher.getName()) != null) {
			msg.setCode(2);
			msg.setMsg("已经存在(" + teacher.getName() + ")老师");
			return msg;
		}

		CosTool cosTool = new CosTool();
		List<String> keyList = cosTool.uploadFile(CosTool.IMAGE_FOLDER, request);

		if (keyList.size() == 0) {
			msg.setMsg("图片添加失败!");
			return msg;
		}

		teacher.setTkey(keyList.get(0));

		// 增加老师
		Topic buffer = null;
		if (teacherMapper.insert(teacher) == 1) {
			msg.setCode(1);
			msg.setObject(buffer);
			msg.setMsg("添加(" + teacher.getName() + ")老师成功!");
		} else {
			msg.setCode(-1);
			msg.setMsg("添加(" + teacher.getName() + ")老师失败!");
		}
		return msg;
	}

    @Override
    public Msg delTeacher(Integer id) {
	    Msg msg =new Msg();
		CosTool cosTool = new CosTool();

        if (teacherMapper.delTeacher(id) == 1) {
        	//cosTool.delete(CosTool.bucket,teacher.getTkey());

            msg.setCode(1);
            msg.setMsg("删除成功");
        }else {
            msg.setCode(-1);
            msg.setMsg("删除失败");
        }

        return msg;
    }

	@Override
	public Msg techerUpdate(Teacher teacher, HttpServletRequest request) {
		Msg msg=new Msg();
		CosTool cosTool = new CosTool();
		List<String> keyList = cosTool.uploadFile(CosTool.IMAGE_FOLDER, request);

		if (keyList.size() == 0) {
			msg.setMsg("图片添加失败!");
			return msg;
		}

		teacher.setTkey(keyList.get(0));
		if(teacherMapper.update(teacher)==1){
			msg.setCode(1);
			msg.setMsg("成功");
		}
		return msg;
	}

	@Override
	public Msg techerCourses(String teacherName) {
		Msg msg=new Msg();
		Teacher teacher = teacherMapper.selectTeacher(teacherName);
		List<Course> list =courseMapper.techerCourses(teacher.getId());
		if(list!=null){
			CosTool cosTool = new CosTool();
			for (int i = 0; i < list.size(); i++) {
				// 到腾讯云服务器换图片地址
				String url = cosTool.getUrl(list.get(i).getUrl());
				list.get(i).setUrl(url);
			}
			msg.setObject(list);
			msg.setCode(1);
			msg.setMsg("成功");
		}
		return msg;
	}

	@Override
	public Msg selectTeacher(String teacherName) {
		Msg msg=new Msg();
		List<Teacher> teacher = teacherMapper.selecBytTeacher(teacherName);
		int length = teacher.size();
		CosTool cosTool = new CosTool();
		for (int i = 0; i < length; i++) {
			String key = teacher.get(i).getTkey();
			teacher.get(i).setTkey(cosTool.getUrl(key));
		}

		if(teacher!=null){
			msg.setObject(teacher);
			msg.setCode(1);
			msg.setMsg("成功");
		}
		return msg;
	}


}
