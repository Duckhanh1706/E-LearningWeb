import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import students from "../../../db/student.json";
import "./Student.css";

const UpdateStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const student = students;
  const [formData, setFormData] = useState({
    name: student?.name || "",
    email: student?.email || "",
    password: "",
  });

  if (!student) {
    return <div>Không tìm thấy học viên!</div>;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã cập nhật học viên: ${formData.name}`);
    navigate("/admin/student");
  };

  return (
    <div className="update-student-container">
      <h2 className="update-student-title">Cập nhật Học viên</h2>
      <form className="update-student-form" onSubmit={handleSubmit}>
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

export default UpdateStudent;
