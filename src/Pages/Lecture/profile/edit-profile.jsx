import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu giảng viên:", lecturer);

    // TODO: Gọi API lưu dữ liệu tại đây nếu cần

    // Sau khi lưu, chuyển hướng về trang profile
    navigate("/lecturer/profile");
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
          <label>URL ảnh đại diện</label>
          <input
            type="text"
            name="avatarUrl"
            value={lecturer.avatarUrl}
            onChange={handleChange}
            className="input-field"
          />
        </div>

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
