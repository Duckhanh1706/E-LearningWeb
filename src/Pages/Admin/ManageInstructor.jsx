import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const ManageInstructor = () => {
  const navigate = useNavigate();

  const handleApprove = () => navigate("/admin/instructor/pending");
  const handleAdd = () => navigate("/admin/instructor/create-instructor");
  const handleViewAll = () => navigate("/admin/instructor/view");

  return (
    <div className="manage-instructors-container">
      <h2 className="manage-instructors-title">Quản lý Giảng viên</h2>
      <div className="button-group">
        <button className="btn btn-approve-mn" onClick={handleApprove}>
          Phê duyệt giảng viên
        </button>
        <button className="btn btn-add" onClick={handleAdd}>
          Thêm giảng viên
        </button>
        <button className="btn btn-view" onClick={handleViewAll}>
          Xem toàn bộ giảng viên
        </button>
      </div>
    </div>
  );
};

export default ManageInstructor;
