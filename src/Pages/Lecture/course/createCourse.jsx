import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createCourse.css";

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    instructorName: "",
    status: "Not Started",
    description: "",
    assignments: "",
    price: "",
    videoLists: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Khi chọn file sẽ tự động cập nhật videoLists luôn
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCourse((prev) => ({
      ...prev,
      videoLists: [...prev.videoLists, ...files],
    }));

    // Reset lại input để có thể chọn lại file nếu muốn
    e.target.value = "";
  };

  const handleRemoveVideo = (index) => {
    setCourse((prev) => ({
      ...prev,
      videoLists: prev.videoLists.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Bạn có muốn tạo khóa học mới không?");

    if (isConfirmed) {
      const newCourse = {
        ...course,
        instructor: {
          id: Date.now(),
          name: course.instructorName,
          email: "",
          avatarUrl: "",
          description: "",
          pendingStatus: "approved",
        },
        courseStatus: course.status,
        student: [],
        pendingStatus: "approved",
      };

      console.log("Khóa học mới đã được tạo:", newCourse);
      // TODO: gửi newCourse lên server hoặc lưu local

      navigate("/lecturer/profile");
    } else {
      navigate("/lecturer/profile");
    }
  };

  return (
    <div className="create-course-container">
      <h2>Tạo khóa học mới</h2>
      <form onSubmit={handleSubmit} className="create-course-form">
        {/* Các input khác tương tự */}
        <div className="form-group">
          <label htmlFor="title">Tiêu đề khóa học</label>
          <input
            type="text"
            id="title"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructorName">Tên giảng viên</label>
          <input
            type="text"
            id="instructorName"
            name="instructorName"
            value={course.instructorName}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
            className="textarea-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignments">Nhiệm vụ</label>
          <textarea
            id="assignments"
            name="assignments"
            value={course.assignments}
            onChange={handleChange}
            required
            className="textarea-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá khóa học (VNĐ)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={course.price}
            onChange={handleChange}
            min="0"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoFileInput">Chọn file video</label>
          <input
            type="file"
            id="videoFileInput"
            accept="video/*"
            multiple
            onChange={handleFileChange}
            className="input-field"
          />
        </div>

        {/* Hiển thị danh sách video đã thêm luôn */}
        {course.videoLists.length > 0 && (
          <div className="form-group">
            <label>Danh sách video đã thêm:</label>
            <ul className="video-list">
              {course.videoLists.map((file, index) => (
                <li key={index} className="video-item">
                  {file.name}{" "}
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                    className="remove-btn"
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="ring-btn">
          Tạo khóa học
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
