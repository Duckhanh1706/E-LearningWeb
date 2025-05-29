import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import instructors from "../../../db/lecturer.json";
import courseData from "../../../db/course.json";
import "./Lecturer.css";

const InstructorDetail = () => {
  const { instructorId } = useParams();
  const navigate = useNavigate();

  const instructor = instructors.find(
    (item) => item.id === parseInt(instructorId, 10)
  );

  if (!instructor) {
    return <div>Không tìm thấy giảng viên!</div>;
  }

  const coursesByInstructor = courseData.filter(
    (course) => course.instructor.id === parseInt(instructorId, 10)
  );

  const handleEditClick = () => {
    navigate(`/admin/instructor/update-instructor/${instructorId}`);
  };

  return (
    <div className="instructor-detail">
      <div
        className="instructor-detail__header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 className="instructor-detail__title">Chi tiết Giảng viên</h2>
        <button
          className="btn btn-edit"
          onClick={handleEditClick}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Chỉnh sửa thông tin
        </button>
      </div>

      <img
        className="instructor-detail__avatar"
        src={instructor.avatarUrl}
        alt={instructor.name}
        style={{ maxWidth: "200px", borderRadius: "8px" }}
      />
      <p>
        <strong>Họ tên:</strong> {instructor.name}
      </p>
      <p>
        <strong>Email:</strong> {instructor.email}
      </p>
      <p>
        <strong>Mô tả:</strong> {instructor.description}
      </p>
      <p>
        <strong>Trạng thái:</strong> {instructor.pendingStatus}
      </p>

      <h3 className="instructor-detail__subtitle">Danh sách khóa học</h3>
      {coursesByInstructor.length === 0 ? (
        <p>Giảng viên chưa có khóa học nào.</p>
      ) : (
        <ul className="course-list">
          {coursesByInstructor.map((course) => (
            <li key={course.id} className="course-item">
              <strong className="course-item__title">{course.title}</strong>
              <p className="course-item__desc">{course.description}</p>
              <p className="course-item__status">
                Trạng thái: {course.courseStatus}
              </p>
              <p className="course-item__students">
                Số học viên đăng ký: {course.studentsRegistered || 0}
              </p>
              <p className="course-item__price">
                Giá: {course.price.toLocaleString("vi-VN")} VNĐ
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstructorDetail;
