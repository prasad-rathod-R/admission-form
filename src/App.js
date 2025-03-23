import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdmissionForm from "./AdmissionForm";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <AdmissionForm />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
