import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./myCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/student/my-courses"
        ); // API giả định
        if (!response.ok) {
          throw new Error("Không thể lấy danh sách khóa học");
        }
        const data = await response.json();
        setCourses(data.courses); // Giả sử backend trả về { courses: [...] }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) return <div>Đang tải danh sách khóa học...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="my-courses-container">
      <h2>Danh sách khóa học của tôi</h2>
      {courses.length === 0 ? (
        <p>Bạn chưa tham gia khóa học nào.</p>
      ) : (
        <ul className="courses-list">
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              {/* Khi click vào tên sẽ chuyển đến trang chi tiết */}
              <h3
                className="course-title"
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() => navigate(`/student/course/${course.id}`)}
              >
                {course.title}
              </h3>
              <p>Trạng thái: {course.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
