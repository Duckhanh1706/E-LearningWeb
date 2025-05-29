import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import courseData from "../../../db/course.json";
import studentData from "../../../db/student.json";
import "./myCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ thêm dòng này

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      const enrolledIds = studentData.course || [];

      const filteredCourses = courseData.filter((course) =>
        enrolledIds.includes(course.id)
      );

      setCourses(filteredCourses);
      setLoading(false);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu khóa học");
      setLoading(false);
    }
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/student/course/${courseId}`); // ✅ dùng template literal
  };

  if (loading)
    return (
      <div className="cmp-loading">Đang tải khóa học đã hoàn thành...</div>
    );
  if (error) return <div className="cmp-error">{error}</div>;

  return (
    <div className="cmp-course-list">
      <h2 className="cmp-title">
        Khóa học đã hoàn thành của {studentData.name}
      </h2>
      <ul className="cmp-course-ul">
        {courses.length === 0 ? (
          <li className="cmp-no-course">Không có khóa học nào</li>
        ) : (
          courses.map((course) => (
            <li key={course.id} className="cmp-course-item">
              <h3
                className="cmp-course-title"
                onClick={() => handleCourseClick(course.id)}
                style={{ cursor: "pointer" }} // ✅ di chuyển style ra ngoài
              >
                {course.title}
              </h3>
              <p className="cmp-course-description">{course.description}</p>
              <p className="cmp-course-instructor">
                <strong>Giảng viên:</strong> {course.instructor.name}
              </p>
              <p className="cmp-course-status">
                <strong>Trạng thái:</strong> {course.courseStatus}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MyCourses;
