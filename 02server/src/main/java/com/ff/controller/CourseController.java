package com.ff.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ff.dao.TeacherMapper;
import com.ff.pojo.Teacher;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ff.pojo.Course;
import com.ff.pojo.Msg;
import com.ff.service.CourseService;

@Controller
@RequestMapping("/noi")
public class CourseController {
	@Autowired
	private CourseService courseService;
	@Autowired
	private TeacherMapper teacherMapper;

	/**
	 * 根据科目的ID查询对应的课程
	 * 
	 * @return
	 */
	@RequestMapping(value = "courses/all")
	@ResponseBody
	public Msg selectAllCourse() {
		return courseService.selectCourseAll();
	}

	/**
	 * 根据科目的ID查询对应的课程
	 * 
	 * @return
	 */
	@RequestMapping(value = "courses/all/leaf")
	@ResponseBody
	public Msg selectCourseAllLeaf() {
		return courseService.selectCourseAllLeaf();
	}

	/**
	 * 根据科目的ID查询对应的课程
	 * 
	 * @return
	 */
	@RequestMapping(value = "courses/and/chapters")
	@ResponseBody
	public Msg selectCourseAndChapters() {
		return courseService.selectCourseAndChapters();
	}

	/**
	 * 添加课程
	 * @param course
	 * @param resp
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "courses/add")
	@ResponseBody
	public Msg addCourses(Course course,@Param("teacherName")String teacherName, HttpServletResponse resp, HttpServletRequest req) {
		if (teacherName!=null){
			Teacher teacher=teacherMapper.selectTeacher(teacherName);
			course.setTeacherId(teacher.getId());
		}
		return courseService.insertCourses(course, req);
	}

	/**
	 * 所有问题
	 * @param resp
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "questions/all")
	@ResponseBody
	public Msg selectAllQuestionsOfCourses(HttpServletResponse resp, HttpServletRequest req) {

		return courseService.selectAllQuestionsOfCourses();
	}
//	删除课程
	@ResponseBody
	@RequestMapping(value = "courses/delete")
	public Msg deleteById(Course course, HttpServletResponse resp, HttpServletRequest req){
		return courseService.deleteById();
	}
	@RequestMapping("courses/type")
	@ResponseBody
	public Msg selectByType(@Param("courseType") int courseType, HttpServletResponse resp, HttpServletRequest req){
		return courseService.selectByType(courseType);
	}
    @RequestMapping("courses/questionByType")
    @ResponseBody
    public Msg selectQuestionByType(@Param("courseType") int courseType, HttpServletResponse resp, HttpServletRequest req){
        return courseService.selectQuestionByType(courseType);
    }

    @RequestMapping("courses/selectTeacher")
	@ResponseBody
	public Msg selectTeacher(Course course, HttpServletResponse resp, HttpServletRequest req){

		return courseService.selectTeacher(course.getTeacherId());
	}
	@RequestMapping("courses/update")
	@ResponseBody
	public Msg update(Course course, HttpServletResponse resp, HttpServletRequest req){

		return courseService.update(course);
	}
	@RequestMapping("courses/courseName")
	@ResponseBody
	public Msg courseName(@Param("name") String name, HttpServletResponse resp, HttpServletRequest req){

		return courseService.courseName(name);
	}

}
