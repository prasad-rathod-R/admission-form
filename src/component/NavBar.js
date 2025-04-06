import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const isLoggedIn = localStorage.getItem("token");
  const toggleSidebar = () => {
    if (typeof setSidebarOpen === "function") {
      setSidebarOpen(!sidebarOpen);
    } else {
      console.error("❌ setSidebarOpen is not a function");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Optional: if you stored user info
    window.location.href = "/login"; // Redirect to login
  };


  return (
    <div>
      <button
        className="btn btn-dark position-relative top-0 mt-3 d-flex"
        style={{
          left: "10px",
          zIndex: 1050,
          height: "40px",
          marginLeft: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={toggleSidebar}
      >
        {" "}
        <i className="bi bi-list fs-3"></i>
      </button>

      {sidebarOpen && (
        <div
          className="bg-light p-3 flex-column position-relative top-0 start-0 d-flex"
          style={{ width: "85px", height: "100vh", zIndex: 1040 }}
        >
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
            <Link
  to="/"
  className="nav-link link-dark d-flex align-items-center"
  style={{ gap: "12px" }}
  onClick={toggleSidebar}
>
  <i className="bi bi-house-door" style={{ fontSize: "1.5rem" }}></i>
  <span className="d-none d-md-inline">Home</span>
</Link>
            </li>
            <li>
              <Link
  to="/my-details"
  className="nav-link link-dark d-flex align-items-center"
  onClick={toggleSidebar}
  style={{ gap: "12px" }}
>
  <i
    className="bi bi-person-lines-fill"
    style={{ fontSize: "1.5rem" }}
  ></i>
  <span className="d-none d-md-inline">My Profile</span>
</Link>
            </li>
            <li>
            <Link
  to="/payment-details"
  className="nav-link link-dark d-flex align-items-center"
  style={{ gap: "12px" }}
  onClick={toggleSidebar}
>
  <i
    className="bi bi-credit-card"
    style={{ fontSize: "1.5rem" }}
  ></i>
  <span className="d-none d-md-inline">Payment Details</span>
</Link>
            </li>
            <li>
              <Link
  to="/admit"
  className="nav-link link-dark d-flex align-items-center"
  style={{ gap: "12px" }}
  onClick={toggleSidebar}
>
  <i
    className="bi bi-journal-plus"
    style={{ fontSize: "1.5rem" }}
  ></i>
  <span className="d-none d-md-inline">Admission Form</span>
</Link>
            </li>
            <li className="mt-3">
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger w-100"
              >
                <i className="bi bi-box-arrow-right"></i> <span className="d-none d-md-inline">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
