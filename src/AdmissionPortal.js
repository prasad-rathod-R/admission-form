import React, { useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Menu, X } from "lucide-react";
import "./index.css";

export function Button({ children, className, ...props }) {
  return (
    <button className={`px-4 py-2 rounded ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Input({ className, ...props }) {
  return (
    <input className={`border p-2 rounded w-full ${className}`} {...props} />
  );
}

export function Card({ children, className }) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}

export default function AdmissionPortal() {
  const [view, setView] = useState("home");
  const [auth, setAuth] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full p-4 bg-blue-600 text-white text-center text-2xl font-bold flex justify-between items-center px-8">
        <span>Kautilya Classes Badami</span>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {menuOpen && (
          <nav className="absolute top-16 right-8 bg-white p-4 shadow-lg rounded-lg">
            <ul className="flex flex-col space-y-2">
              <li><button onClick={() => setView("home")} className="hover:underline">Home</button></li>
              <li><button onClick={() => setView("about")} className="hover:underline">About Us</button></li>
              <li><button onClick={() => setAuth("login")} className="hover:underline">Login</button></li>
              <li><button onClick={() => setAuth("signup")} className="hover:underline">Sign Up</button></li>
            </ul>
          </nav>
        )}
      </header>

      {view === "home" && (
        <main className="w-full max-w-6xl p-4 flex flex-col items-center">
          <div className="w-full h-[50vh] lg:h-[60vh]">
            <Carousel autoPlay infiniteLoop showThumbs={false} className="rounded-xl shadow-md h-full">
              <div><img src="https://via.placeholder.com/1600x800" alt="Slide 1" className="h-full object-cover w-full" /></div>
              <div><img src="https://via.placeholder.com/1600x800" alt="Slide 2" className="h-full object-cover w-full" /></div>
              <div><img src="https://via.placeholder.com/1600x800" alt="Slide 3" className="h-full object-cover w-full" /></div>
            </Carousel>
          </div>

          <div className="mt-6 flex justify-center w-full max-w-lg">
            <Card className="w-full shadow-lg">
              <CardContent>
                <div className="flex justify-center space-x-4 mb-4">
                  <Button onClick={() => setAuth("login")} className={auth === "login" ? "bg-blue-500 text-white" : "bg-gray-200"}>Login</Button>
                  <Button onClick={() => setAuth("signup")} className={auth === "signup" ? "bg-blue-500 text-white" : "bg-gray-200"}>Sign Up</Button>
                </div>
                {auth === "login" ? (
                  <div>
                    <Input placeholder="Email" className="mb-2" />
                    <Input placeholder="Password" type="password" className="mb-4" />
                    <Button className="w-full bg-blue-500 text-white">Login</Button>
                  </div>
                ) : (
                  <div>
                    <Input placeholder="Full Name" className="mb-2" />
                    <Input placeholder="Email" className="mb-2" />
                    <Input placeholder="Password" type="password" className="mb-4" />
                    <Button className="w-full bg-blue-500 text-white">Sign Up</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      )}

      {view === "about" && (
        <section className="w-full max-w-6xl p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p>Welcome to Kautilya Classes Badami. We strive to provide quality education to students from 1st to 10th grade.</p>
        </section>
      )}

      <footer className="w-full p-4 bg-gray-800 text-white text-center mt-auto">
        Developed by Prasad
      </footer>
    </div>
  );
}
