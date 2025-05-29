import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import lecturers from "../../../../db/lecturer.json";

const ApproveInstructor = () => {
  const { instructorId } = useParams(); // lấy param từ URL
  const navigate = useNavigate();

  const instructor = lecturers.find((inst) => inst.id === Number(instructorId));

  if (!instructor) {
    return <div>Giảng viên không tồn tại!</div>;
  }

  const handleApprove = () => {
    setTimeout(() => {
      alert(`✅ Duyệt giảng viên ${instructor.name} thành công!`);
      navigate("/admin/instructor"); // ví dụ sau khi duyệt về trang danh sách
    }, 500);
  };

  return (
    <div>
      <h2>Duyệt giảng viên: {instructor.name}</h2>
      <p>Email: {instructor.email}</p>
      <p>Mô tả: {instructor.description}</p>
      <button onClick={handleApprove}>Xác nhận duyệt</button>
    </div>
  );
};

export default ApproveInstructor;
