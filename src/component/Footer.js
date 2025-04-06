import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">

          {/* Logo & Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Kautilya Classes</h5>
            <p>Empowering young minds through quality education and mentorship.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none"><i className="bi bi-house-door me-2"></i>Home</a></li>
              <li><a href="/admit" className="text-light text-decoration-none"><i className="bi bi-journal-text me-2"></i>Admission</a></li>
              <li><a href="/contact" className="text-light text-decoration-none"><i className="bi bi-envelope me-2"></i>Contact</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3 justify-content-md-start justify-content-center">
              <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="text-center pt-3 border-top border-secondary mt-3">
          <small>© {new Date().getFullYear()} Kautilya Classes Badami. All rights reserved.</small><br />
          <small className="text-secondary">Developed by Prasad</small>
        </div>
      </div>
    </footer>
  );
}
