// src/Pages/Student/Profile.jsx
import { useAuth } from "../../../components/context/AuthContext";

export default function StuProfile() {
  const { user } = useAuth(); // Lấy thông tin người dùng đang đăng nhập

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Hồ sơ học viên</h2>
      {user ? (
        <div className="space-y-3">
          <p>
            <strong>Họ tên:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Vai trò:</strong>{" "}
            {user.role === "student" ? "Học viên" : user.role}
          </p>
          {/* Thêm các thông tin khác nếu muốn */}
        </div>
      ) : (
        <p>Không tìm thấy thông tin người dùng.</p>
      )}
    </div>
  );
}
