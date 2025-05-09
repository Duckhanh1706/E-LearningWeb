import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./myCourses.css"; // Import CSS

const MyCourses = () => {
  const [courses, setCourses] = useState([]); // Lưu trữ danh sách khóa học
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi nếu có lỗi trong việc gọi API
  const navigate = useNavigate();

  useEffect(() => {
    // Hàm gọi API để lấy danh sách khóa học của học viên
    const fetchMyCourses = async () => {
      try {
        const response = await fetch("");

        if (!response.ok) {
          throw new Error("Không thể lấy danh sách khóa học");
        }

        const data = await response.json();
        setCourses(data); // Cập nhật state với danh sách khóa học
      } catch (error) {
        setError(error.message); // Nếu có lỗi, lưu lại thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc việc tải dữ liệu
      }
    };

    fetchMyCourses();
  }, []); // useEffect chỉ chạy khi component được mount

  if (loading) {
    return <div>Đang tải danh sách khóa học...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <div className="my-courses-container">
      <h2>Danh sách khóa học của tôi</h2>

      {courses.length === 0 ? (
        <p>Bạn chưa tham gia khóa học nào.</p>
      ) : (
        <ul className="courses-list">
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>Giảng viên: {course.instructor}</p>
                <p>Ngày bắt đầu: {course.startDate}</p>
                <p>Ngày kết thúc: {course.endDate}</p>
                <p>Trạng thái: {course.status}</p>
              </div>

              <button
                onClick={() => navigate(`/student/course/${course.id}`)}
                className="view-course-btn"
              >
                Xem chi tiết
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
