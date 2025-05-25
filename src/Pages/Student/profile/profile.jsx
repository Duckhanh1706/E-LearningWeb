import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import studentData from "../../../db/student.json"; // Mock data học viên
import courseData from "../../../db/course.json"; // Mock data khóa học
import "./profile.css";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/student/edit-profile");
  };

  const handleEnrollCourse = () => {
    navigate("/student/enroll-course");
  };

  useEffect(() => {
    if (studentData) {
      setStudent(studentData);
    }
    const enrolledIds = studentData?.course || [];

    const filteredCourses = courseData.filter((course) =>
      enrolledIds.includes(course.id)
    );
    setEnrolledCourses(filteredCourses);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="student-profile__loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="profile-container">
      <div className="container">
        {/* Thông tin học viên */}
        <div className="profile-card profile-header">
          <img
            alt="Avatar"
            className="profile-avatar"
            src={student?.avatarUrl || "https://placehold.co/100x100"}
            width={100}
            height={100}
          />
          <div className="profile-details ml-4">
            <h2>{student?.name}</h2>
            <p>{student?.email}</p>
            <p>{student?.phoneNumber}</p>
          </div>
        </div>

        {/* Danh sách khóa học */}
        <div className="courses-section">
          <h3 className="courses-section__title">Khóa học đã đăng ký</h3>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <div key={course.id} className="course-item">
                <h4 className="course-item__title">{course.title}</h4>
                <p className="course-item__status">
                  Trạng thái: {course.status}
                </p>
              </div>
            ))
          ) : (
            <p>Bạn chưa đăng ký khóa học nào</p>
          )}
        </div>

        {/* Nút chức năng */}
        <div className="student-profile__actions">
          <button className="btn-edit-profile" onClick={handleEditProfile}>
            Chỉnh sửa thông tin
          </button>
          <button className="btn-enroll-course" onClick={handleEnrollCourse}>
            Đăng ký khóa học mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
