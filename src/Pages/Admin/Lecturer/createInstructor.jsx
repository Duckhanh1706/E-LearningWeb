import React, { useState } from "react";
import "./Lecturer.css";
const CreateInstructorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Tạo mới giảng viên: ${JSON.stringify(formData)}`);
  };

  return (
    <div className="create-instructor-container">
      <h2 className="create-instructor-title">Tạo mới giảng viên</h2>
      <form className="create-instructor-form" onSubmit={handleSubmit}>
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
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="submit-button" type="submit">
          Tạo
        </button>
      </form>
    </div>
  );
};

export default CreateInstructorPage;
