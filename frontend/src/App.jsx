import React from "react";
import StudentList from "./components/StudentList";

export default function App() {
  return (
    <>
      {/* ✅ Green Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#198754" }}
      >
        <div className="container">
          <a className="navbar-brand fw-semibold" href="#">
            Student Management System
          </a>
        </div>
      </nav>

      {/* ✅ Page content */}
      <div className="container py-4">
        <StudentList />
      </div>
    </>
  );
}
