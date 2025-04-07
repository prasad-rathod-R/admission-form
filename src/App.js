import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import DashboardComponent from "./component/DashboardComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginComponent from "./component/LoginComponent";
import RegisterComponent from "./component/RegisterComponent";
import AdmissionForm from "./component/AdmissionForm";
import ContactFetch from "./component/ContactFetch";
import Navbar from "./component/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />

        <Route path="/" element={<DashboardComponent />}>
          <Route path="/admit" element={<AdmissionForm />} />
          <Route path="/contact" element={<ContactFetch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
