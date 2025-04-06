import React from 'react';
import { useState, useEffect } from "react";
import Navbar from './NavBar';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import AdmissionForm from "./AdmissionForm";
import ContactFetch from "./ContactFetch";
import Footer from "./Footer";

const DashboardComponent = () => {

     const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="d-flex">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div style={{ marginTop: "0" }}>
                {/* <Home/> */}
                    <div className="container">
                        <Outlet/>
                    </div>
                
            </div>
        </div>
    );
};

export default DashboardComponent;