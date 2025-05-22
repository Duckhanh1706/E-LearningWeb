import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./editProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [lecturer, setLecturer] = useState({
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

    if (name === "email" || name === "phone") {
      setLecturer((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: value,
        },
      }));
    } else {
      setLecturer((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLecturer((prev) => ({
        ...prev,
        avatarUrl: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", lecturer.name);
    formData.append("bio", lecturer.bio);
    formData.append("contact[email]", lecturer.contact.email);
    formData.append("contact[phone]", lecturer.contact.phone);
    if (lecturer.avatarUrl) {
      formData.append("uploaded_file", lecturer.avatarUrl);
    }

    try {
      const response = await fetch("/api/update-instructor-profile", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log message from backend
        navigate("/lecturer/profile");
      } else {
        console.error("Cập nhật thông tin thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Chỉnh sửa thông tin giảng viên</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            name="name"
            value={lecturer.name}
            onChange={handleChange}
            className="input-field"
            required
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

        {lecturer.avatarUrl && (
          <div className="preview-image">
            <p>Ảnh đã chọn: {lecturer.avatarUrl.name}</p>
            <img
              src={URL.createObjectURL(lecturer.avatarUrl)}
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
            value={lecturer.bio}
            onChange={handleChange}
            className="textarea-field"
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={lecturer.contact.phone}
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

export default EditProfile;
