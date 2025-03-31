import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from "./component/LoginComponent";
import RegisterComponent from "./component/RegisterComponent";
import DashboardComponent from "./component/DashboardComponent";
import AdmissionForm from "./component/AdmissionForm";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
    <div className="container">
        <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/dashboard" element={<DashboardComponent />} />
            <Route path="/admit" element={<AdmissionForm />} />

        </Routes>
    </div>
</Router>
  );
}

export default App;
