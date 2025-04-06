import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-1">
      {/* Welcome Text */}
      <div className="text-center mb-5">
        <h1 className="fw-bold top-0">Welcome to Kautilya Classes</h1>
        <p className="lead">
          Empowering future leaders with quality education. Join us to explore
          a brighter path.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/login" className="btn btn-primary px-4">Login</Link>
          <Link to="/register" className="btn btn-outline-primary px-4">Sign Up</Link>
        </div>
      </div>

      {/* Image Carousel */}
      <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner rounded shadow">

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/800x400/?education,students" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/800x400/?classroom,learning" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/800x400/?books,library" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}
