import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // để chuyển trang
import courseData from "../../../db/course.json";
import lecturerData from "../../../db/lecturer.json";
import "./course.css";

const Schedule = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Giả sử giảng viên hiện tại là giảng viên đầu tiên trong lecturerData
  // Bạn có thể thay thế bằng lấy từ context, localStorage hoặc props
  const currentLecturerId = lecturerData.length > 0 ? lecturerData[0].id : null;

  useEffect(() => {
    try {
      if (!currentLecturerId) {
        setError("Không tìm thấy thông tin giảng viên hiện tại");
        return;
      }
      // Lọc khóa học đang tiến hành và thuộc giảng viên hiện tại
      const filteredCourses = courseData.filter(
        (course) =>
          course.courseStatus === "Not Started" &&
          course.instructor.id === currentLecturerId
      );
      setCourses(filteredCourses);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu khóa học");
    }
  }, [currentLecturerId]);

  const handleCourseClick = (courseId) => {
    navigate(`/lecturer/course/${courseId}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="course-container">
      <div className="course-list-wrapper">
        {courses.length > 0 ? (
          <ul className="course-list">
            {courses.map((course) => (
              <li
                key={course.id}
                className="course-item"
                onClick={() => handleCourseClick(course.id)}
                style={{ cursor: "pointer" }}
              >
                <span>{course.title}</span>
                <span className="course-status">{course.courseStatus}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses in Schedule</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
