import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const ManageInstructor = () => {
  const navigate = useNavigate();

  const handleViewAll = () => navigate("/admin/student/view");
  const handleAdd = () => navigate("/admin/student/create-student");

  return (
    <div className="manage-stu-container">
      <h2 className="manage-stu-title">Quản lý học viên</h2>
      <div className="button-group">
        <button className="btn btn-add" onClick={handleAdd}>
          Thêm học viện
        </button>
        <button className="btn btn-view" onClick={handleViewAll}>
          Xem toàn bộ học viên
        </button>
      </div>
    </div>
  );
};

export default ManageInstructor;
