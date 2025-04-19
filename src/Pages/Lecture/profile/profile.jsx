import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import lecturerData from "../../../db/lecturer.json"; // Dữ liệu giảng viên
import courseData from "../../../db/course.json"; // Dữ liệu khóa học
import "./profile.css";

const LecProfile = () => {
  const [lecturer, setLecturer] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/lecturer/edit-profile");
  };

  const handleCreateCourse = () => {
    navigate("/lecturer/create-course");
  };

  useEffect(() => {
    setLecturer(lecturerData.lecturer);
    setCourses(courseData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="profile-container">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          {/* Section Hiển thị thông tin giảng viên */}
          <div className="w-full md:w-1/3 p-4">
            <div className="profile-card">
              <div className="profile-header">
                <img
                  alt="Profile"
                  className="rounded-full w-24 h-24"
                  src={lecturer.avatarUrl || "https://placehold.co/100x100"}
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{lecturer.name}</h2>
                  <p className="text-gray-600">{lecturer.bio}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  <i className="fas fa-user-friends"></i> {lecturer.followers}{" "}
                  người theo dõi
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-calendar-alt"></i> Tham gia từ{" "}
                  {lecturer.joinedDate}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-envelope"></i> Email:{" "}
                  {lecturer.contact?.email || "Chưa cập nhật"}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-phone"></i> SĐT:{" "}
                  {lecturer.contact?.phone || "Chưa cập nhật"}
                </p>
              </div>
            </div>
          </div>

          {/* Section Hiển thị khóa học giảng dạy */}
          <div className="w-full md:w-2/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">Khóa học đã giảng dạy</h3>
              <div className="mt-4">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <div key={index} className="course-item">
                      <h4 className="text-md font-semibold">{course.title}</h4>
                      <p className="text-gray-600">
                        Trạng thái: {course.status}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">
                    Giảng viên chưa có khóa học nào
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Các nút lựa chọn chỉnh sửa thông tin và tạo khóa học */}
        <div className="mt-4">
          <button className="btn-edit-profile" onClick={handleEditProfile}>
            Chỉnh sửa thông tin
          </button>
          <button className="btn-add-course" onClick={handleCreateCourse}>
            Tạo khóa học mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default LecProfile;
