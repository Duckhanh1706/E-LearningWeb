import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import students from "../../../db/student.json"; // Đây là 1 object, không phải mảng
import "./Student.css";

const DeleteStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Nếu _id trùng với studentId thì lấy object students, còn không thì null
  const student = students._id === studentId ? students : null;

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa sinh viên "${student?.name}" không?`
    );
    if (!confirmDelete) return;

    alert("Đã xóa sinh viên (giả lập).");
    navigate("/admin/student");
  };

  if (!student) {
    return <div>Không tìm thấy sinh viên!</div>;
  }

  return (
    <div className="delete-student-container">
      <h2>Xóa Sinh viên</h2>
      <p>
        Bạn có chắc muốn xóa sinh viên: <strong>{student.name}</strong> (ID:{" "}
        {student._id})?
      </p>
      <button className="delete-button" onClick={handleDelete}>
        Xác nhận xóa
      </button>
    </div>
  );
};

export default DeleteStudent;
