import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import courseData from "../../../db/course.json"; // dữ liệu khóa họchọc
import "./course.css";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentSchedule = courseData.map((course) => ({
      title: course.title,
      startDate: course.startDate,
      endDate: course.endDate,
      status: course.status,
      id: course.id,
    }));

    setSchedule(currentSchedule);
  }, []);

  const handleCourseClick = (courseId) => {
    // chuyển hướng tới trang chi tiết khóa học khi click vào tên khóa họchọc
    navigate(`/lecturer/course/${courseId}`);
  };

  return (
    <div className="schedule-container">
      <ul className="schedule-list">
        {schedule.length > 0 ? (
          schedule.map((course, index) => (
            <li
              key={index}
              className={`schedule-item ${
                course.status === "Completed" ? "completed-course" : ""
              }`}
            >
              <span
                className="title"
                onClick={() => handleCourseClick(course.id)}
              >
                {course.title}
              </span>
              <span className="date">
                {course.startDate} to {course.endDate}
              </span>
            </li>
          ))
        ) : (
          <li className="no-courses">No courses available at the moment.</li>
        )}
      </ul>
    </div>
  );
};

export default Schedule;
