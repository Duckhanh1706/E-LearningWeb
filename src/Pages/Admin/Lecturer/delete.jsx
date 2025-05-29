import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import instructors from "../../../db/lecturer.json";
import "./Lecturer.css";

const DeleteInstructor = () => {
  const { instructorId } = useParams();
  const navigate = useNavigate();
  const instructor = instructors.find(
    (item) => item.id === parseInt(instructorId, 10)
  );

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa giảng viên "${instructor?.name}" không?`
    );
    if (!confirmDelete) return;

    // ⚠️ Không thể xóa thật từ JSON – chỉ giả lập
    alert("Đã xóa giảng viên (giả lập).");
    navigate("/admin/instructor");
  };

  if (!instructor) {
    return <div>Không tìm thấy giảng viên!</div>;
  }

  return (
    <div className="delete-instructor-container">
      <h2>Xóa Giảng viên</h2>
      <p>
        Bạn có chắc muốn xóa giảng viên: <strong>{instructor.name}</strong> (ID:{" "}
        {instructor.id})?
      </p>
      <button className="delete-button" onClick={handleDelete}>
        Xác nhận xóa
      </button>
    </div>
  );
};

export default DeleteInstructor;
