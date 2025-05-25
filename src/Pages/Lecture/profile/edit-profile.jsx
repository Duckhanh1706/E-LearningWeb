import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./editProfile.css";

const EditStudentProfile = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    avatarUrl: null,
    bio: "",
    contact: {
      email: "",
      phone: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setStudent((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          phone: value,
        },
      }));
    } else {
      setStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudent((prev) => ({
        ...prev,
        avatarUrl: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("bio", student.bio);
    formData.append("contact[email]", student.contact.email);
    formData.append("contact[phone]", student.contact.phone);
    if (student.avatarUrl) {
      formData.append("uploaded_file", student.avatarUrl);
    }

    try {
      const response = await fetch("/api/update-student-profile", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        navigate("/student/profile");
      } else {
        console.error("Cập nhật thông tin thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Chỉnh sửa thông tin học viên</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Email (không thể sửa)</label>
          <input
            type="email"
            name="email"
            value={student.contact.email}
            disabled
            readOnly
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Ảnh đại diện</label>
          <input
            type="file"
            name="avatarUrl"
            accept="image/*"
            onChange={handleFileChange}
            className="input-field"
          />
        </div>

        {student.avatarUrl && (
          <div className="preview-image">
            <p>Ảnh đã chọn: {student.avatarUrl.name}</p>
            <img
              src={URL.createObjectURL(student.avatarUrl)}
              alt="Avatar Preview"
              width="100"
              height="100"
            />
          </div>
        )}

        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            name="bio"
            value={student.bio}
            onChange={handleChange}
            className="textarea-field"
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={student.contact.phone}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="ring-btn">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default EditStudentProfile;
