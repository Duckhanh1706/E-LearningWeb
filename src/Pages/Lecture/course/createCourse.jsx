import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createCourse.css";

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    instructor: "",
    status: "In Progress",
    description: "",
    startDate: "",
    endDate: "",
    assignments: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Bạn có muốn tạo khóa học mới không?");

    if (isConfirmed) {
      // Nếu nhấn Yes, tạo khóa học và chuyển đến trang profile
      console.log("Khóa học mới đã được tạo:", course);
      navigate("/lecturer/profile");
    } else {
      // Nếu nhấn Cancel, chỉ đơn giản là quay lại trang profile
      navigate("/lecturer/profile");
    }
  };

  return (
    <div className="create-course-container">
      <h2>Tạo khóa học mới</h2>
      <form onSubmit={handleSubmit} className="create-course-form">
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
          <label htmlFor="instructor">Giảng viên</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={course.instructor}
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
          <label htmlFor="startDate">Ngày bắt đầu</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={course.startDate}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Ngày kết thúc</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={course.endDate}
            onChange={handleChange}
            required
            className="input-field"
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
        <button type="submit" className="ring-btn">
          Tạo khóa học
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
