import React from "react";
import { useAuth } from "../../../components/context/AuthContext";

export default function LecturerDashboardHome() {
  const { user } = useAuth();

  return (
    <div className="welcome-section">
      <h2>Welcome, {user?.name || "Lecturer"}!</h2>
      <p>We're glad to have you back.</p>
    </div>
  );
}
