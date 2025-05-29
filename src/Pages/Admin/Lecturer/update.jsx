import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import instructors from "../../../db/lecturer.json";
import "./Lecturer.css";

const UpdateInstructor = () => {
  const { instructorId } = useParams();
  const navigate = useNavigate();
  // Tìm instructor trước
  const instructor = instructors.find(
    (item) => item.id === parseInt(instructorId, 10)
  );

  // Khởi tạo state formData dù instructor có hay không (phải gọi useState trước return)
  const [formData, setFormData] = useState({
    name: instructor?.name || "",
    email: instructor?.email || "",
    password: "",
  });

  // Nếu không tìm thấy instructor thì render báo lỗi
  if (!instructor) {
    return <div>Không tìm thấy giảng viên!</div>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã cập nhật giảng viên: ${formData.name}`);
    navigate("/admin/instructor");
  };

  return (
    <div className="update-instructor-container">
      <h2 className="update-instructor-title">Cập nhật Giảng viên</h2>
      <form className="update-instructor-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          name="name"
          placeholder="Tên"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="input-field"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Mật khẩu mới"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="submit-button" type="submit">
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateInstructor;
