import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/student/course/${courseId}`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy chi tiết khóa học");
        }
        const data = await response.json();
        setCourse(data.course);
        setMessage(data.message);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết khóa học:", error);
        setMessage("Không thể tải chi tiết khóa học.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  if (loading) return <div>Đang tải thông tin khóa học...</div>;
  if (!course) return <div>{message || "Không tìm thấy khóa học"}</div>;

  return (
    <div className="course-detail-container">
      <h2>{course.title}</h2>
      <p>
        <strong>Giảng viên:</strong> {course.instructor}
      </p>
      <p>
        <strong>Mô tả:</strong> {course.description}
      </p>
      <p>
        <strong>Ngày bắt đầu:</strong> {course.startDate}
      </p>
      <p>
        <strong>Ngày kết thúc:</strong> {course.endDate}
      </p>
      <p>
        <strong>Trạng thái:</strong> {course.status}
      </p>
      <p>
        <strong>Số lượng video:</strong> {course.totalVideos}
      </p>
      <button onClick={() => navigate(`/student/course/${courseId}/videos`)}>
        Xem tất cả video
      </button>
    </div>
  );
};

export default CourseDetail;
