import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./editProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [lecturer, setLecturer] = useState({
    name: "",
    avatarUrl: "",
    bio: "",
    followers: "",
    joinedDate: "",
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

    // Create FormData to send both text and file data
    const formData = new FormData();
    formData.append("name", lecturer.name);
    formData.append("bio", lecturer.bio);
    formData.append("joinedDate", lecturer.joinedDate);
    formData.append("email", lecturer.contact.email);
    formData.append("phone", lecturer.contact.phone);
    formData.append("avatarUrl", lecturer.avatarUrl);

    try {
      // Gửi yêu cầu PUT đến API để cập nhật thông tin giảng viên
      const response = await fetch("/api/update-instructor-profile", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        // Nếu thành công, chuyển hướng về trang profile
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
        {/* Các trường nhập liệu giữ nguyên */}
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
          <label>Ngày tham gia</label>
          <input
            type="date"
            name="joinedDate"
            value={lecturer.joinedDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={lecturer.contact.email}
            onChange={handleChange}
            className="input-field"
            required
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
