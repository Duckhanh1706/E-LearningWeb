import React, { createContext, useContext, useState } from "react";

// Tạo context
const AuthContext = createContext();

// Provider để cung cấp thông tin người dùng
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Lưu thông tin người dùng khi đăng nhập
  };

  const logout = () => {
    setUser(null); // Xóa thông tin người dùng khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook để lấy thông tin người dùng từ context
export const useAuth = () => useContext(AuthContext);
