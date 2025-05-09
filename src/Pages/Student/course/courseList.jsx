import React, { useState, useEffect } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm để gọi API và lấy dữ liệu
  const fetchCourses = async () => {
    try {
      const response = await fetch(""); // Thay đổi URL API
      if (!response.ok) {
        throw new Error("Dữ liệu không hợp lệ");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Dừng loading khi có dữ liệu hoặc lỗi
    }
  };

  // Gọi fetchCourses khi component được mount
  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Đang tải khóa học...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <div className="course-list">
      <h2>Danh sách khóa học</h2>
      <ul>
        {courses.length === 0 ? (
          <li>Không có khóa học nào</li>
        ) : (
          courses.map((course) => (
            <li key={course.id}>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CourseList;
