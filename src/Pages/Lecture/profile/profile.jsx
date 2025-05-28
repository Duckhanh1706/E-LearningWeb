import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import lecturerData from "../../../db/lecturer.json"; // Mảng giảng viên
import courseData from "../../../db/course.json"; // Mảng khóa học
import "./profile.css";

const LecProfile = () => {
  const [lecturer, setLecturer] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/lecturer/edit-lec-profile");
  };

  const handleCreateCourse = () => {
    navigate("/lecturer/create-course");
  };

  useEffect(() => {
    const selectedLecturer = lecturerData[0];
    setLecturer(selectedLecturer);

    const filteredCourses = courseData.filter(
      (course) => course.instructor.id === selectedLecturer.id
    );

    setCourses(filteredCourses);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (!lecturer) {
    return <div>Không tìm thấy giảng viên</div>;
  }

  return (
    <div className="profile-container">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          {/* Profile Section */}
          <div className=" md:w-1/3 p-4">
            <div className="profile-card">
              <div className="profile-header flex items-center">
                <img
                  alt="Profile"
                  className="rounded-full w-24 h-24"
                  src={lecturer.avatarUrl || "https://placehold.co/100x100"}
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{lecturer.name}</h2>
                  <p className="text-gray-600">{lecturer.description}</p>
                  <p className="text-gray-600 mt-2">Email: {lecturer.email}</p>
                  <p className="text-gray-600 mt-1">
                    Trạng thái: {lecturer.pendingStatus || "Không rõ"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Khóa học đã giảng dạy</h3>
              <div className="course-container">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <div key={index} className="course-item mb-3">
                      <h4 className="text-md font-semibold">{course.title}</h4>
                      <p className="text-gray-600">
                        Trạng thái: {course.courseStatus}
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

        {/* Buttons */}
        <div className="mt-4 flex justify-center gap-4">
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
