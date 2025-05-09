import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./courseDetail.css"; // Import CSS

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi nếu có lỗi trong việc gọi API
  const navigate = useNavigate();
  const location = useLocation(); // Lấy location từ router

  useEffect(() => {
    // Hàm gọi API để lấy dữ liệu khóa học
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `https://your-api-endpoint.com/courses/${id}`
        );

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu khóa học");
        }

        const data = await response.json();
        setCourse(data); // Cập nhật state với dữ liệu khóa học nhận được
      } catch (error) {
        setError(error.message); // Nếu có lỗi, lưu lại thông báo lỗi
      } finally {
        setLoading(false); // Kết thúc việc tải dữ liệu
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  if (!course) {
    return <div>Không tìm thấy khóa học.</div>;
  }

  // Kiểm tra xem trang có được mở từ CurrentCourses không
  const isFromCurrentCourses = location.state?.fromCurrentCourses || false;

  console.log("Is from CurrentCourses: ", isFromCurrentCourses);

  return (
    <div className="course-detail-container">
      <h2 className="course-title">{course.title}</h2>

      <section className="course-section">
        <h3>Giảng viên</h3>
        <p>{course.instructor}</p>
      </section>

      <section className="course-section">
        <h3>Trạng thái</h3>
        <p>{course.status}</p>
      </section>

      <section className="course-section">
        <h3>Mô tả</h3>
        <p>{course.description}</p>
      </section>

      <section className="course-section">
        <h3>Ngày bắt đầu</h3>
        <p>{course.startDate}</p>
      </section>

      <section className="course-section">
        <h3>Ngày kết thúc</h3>
        <p>{course.endDate}</p>
      </section>

      <section className="course-section">
        <h3>Bài tập</h3>
        <p>{course.assignments}</p>

        {/* Hiển thị nút Add Assignment nếu trang được mở từ CurrentCourses */}
        {isFromCurrentCourses && (
          <button
            className="add-assignment-btn"
            onClick={() => navigate(`/lecturer/course/${course.id}/uploadfile`)}
          >
            + Thêm bài tập
          </button>
        )}
      </section>

      <button onClick={() => navigate(-1)} className="back-button">
        ← Quay lại
      </button>
    </div>
  );
};

export default CourseDetail;
