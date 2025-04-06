import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token or any other user data
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // optional if you store user info

    // Optionally show a toast or alert
    alert("You have been logged out successfully!");

    // Redirect to login
    navigate("/login");
  }, [navigate]);

  return null; // This component doesn't render anything visually
}
