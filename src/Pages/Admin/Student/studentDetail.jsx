import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import students from "../../../db/student.json";
import courseData from "../../../db/course.json";
import "./Student.css";

const StudentDetail = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const student = students;

  if (!student) {
    return <div>Không tìm thấy học viên!</div>;
  }

  const coursesByStudent = courseData.filter((course) =>
    student.course?.includes(course.id)
  );

  const handleEditClick = () => {
    navigate(`/admin/student/update-student/${studentId}`);
  };

  return (
    <div className="student-detail">
      <div
        className="student-detail__header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="student-detail__title">Chi tiết Học viên</h2>
        <button className="btn-edit" onClick={handleEditClick}>
          Chỉnh sửa thông tin
        </button>
      </div>

      <img
        className="student-detail__avatar"
        src={student.avatarUrl}
        alt={student.name}
      />
      <p>
        <strong>Họ tên:</strong> {student.name}
      </p>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>Mô tả:</strong> {student.description}
      </p>
      <p>
        <strong>Trạng thái:</strong> {student.status}
      </p>

      <h3 className="student-detail__subtitle">Danh sách khóa học</h3>
      {coursesByStudent.length === 0 ? (
        <p>Học viên chưa đăng ký khóa học nào.</p>
      ) : (
        <ul className="course-list">
          {coursesByStudent.map((course) => (
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

export default StudentDetail;
