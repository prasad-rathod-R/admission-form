import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Kautilya Classes</h1>
        <div>
          <button onClick={() => navigate("/login")} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="px-4 py-2 bg-green-500 text-white rounded-md">
            Signup
          </button>
        </div>
      </nav>

      {/* Carousel */}
      <div className="w-3/4 mt-10">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={true}>
          <div>
            <img src="https://source.unsplash.com/800x400/?education" alt="Slide 1" />
          </div>
          <div>
            <img src="https://source.unsplash.com/800x400/?students" alt="Slide 2" />
          </div>
          <div>
            <img src="https://source.unsplash.com/800x400/?books" alt="Slide 3" />
          </div>
        </Carousel>
      </div>

      {/* Footer */}
      <footer className="mt-10 py-4 text-center w-full bg-gray-200">
        <p>© 2025 Kautilya Classes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
