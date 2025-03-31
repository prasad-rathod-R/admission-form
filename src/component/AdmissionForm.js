import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";

export default function AdmissionForm() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [showReceipt, setShowReceipt] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    contactNumber: "",
    email: "",
    admissionAmount: 1000,
    address: "",
    admissionDate: new Date().toISOString().split("T")[0], // Default to today
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      toast.error("❌ Invalid mobile number. Must be 10 digits.", { position: "top-center" });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("❌ Invalid email format.", { position: "top-center" });
      return false;
    }
    if (formData.admissionAmount < 1000) {
      toast.warning("⚠️ Admission amount should be above ₹1000.", { position: "top-center" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("https://your-backend-url.com/api/admission/pay", formData);
      const paymentUrl = response.data.instrumentResponse.redirectInfo.url;
      window.location.href = paymentUrl; // Redirect to PhonePe payment
    } catch (error) {
      toast.error("❌ Payment failed. Please try again.", { position: "top-center" });
    }
  };

  const generateReceiptPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Admission Receipt", 80, 20);
    doc.setFontSize(12);
    doc.text(`Student: ${formData.firstName} ${formData.lastName}`, 20, 40);
    doc.text(`Father's Name: ${formData.fatherName}`, 20, 50);
    doc.text(`Contact: ${formData.contactNumber}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 70);
    doc.text(`Address: ${formData.address}`, 20, 80);
    doc.text(`Admission Date: ${formData.admissionDate}`, 20, 90);
    doc.text(`Amount Paid: ₹${formData.admissionAmount}`, 20, 100);
    doc.save("Admission_Receipt.pdf");
  };

  return (
    <div className={`container ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} p-4 rounded-3`}>
      {/* Right Menu */}
      <div className="position-absolute top-0 end-0 p-3">
        <button onClick={toggleTheme} className="btn btn-secondary m-2">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <a href="https://your-backend-url.com/api/admission/test" className="btn btn-primary m-2">🔗</a>
        <button onClick={() => setShowReceipt(true)} className="btn btn-success m-2">📄</button>
      </div>

      {/* Title */}
      <h1 className="text-center text-primary mb-4">Kautilya Coaching Classes, Badami</h1>
      <h2 className="text-center mb-4">Admission Form</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-3">
            <label className="form-label" htmlFor={key}>
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </label>
            <input
              type={key === "admissionDate" ? "date" : key === "email" ? "email" : key === "contactNumber" || key === "admissionAmount" ? "number" : "text"}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              className={`form-control ${darkMode ? 'bg-dark text-white' : ''}`}
              required
              min={key === "admissionAmount" ? "1000" : undefined}
              disabled={key === "admissionDate"}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100">Pay and Register</button>
      </form>

      {/* Receipt Preview Modal */}
      {showReceipt && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
          <div className="bg-white text-dark p-4 rounded shadow-sm w-50">
            <h2 className="text-center mb-4">Receipt Preview</h2>
            <p><strong>Student:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Father's Name:</strong> {formData.fatherName}</p>
            <p><strong>Contact:</strong> {formData.contactNumber}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Admission Date:</strong> {formData.admissionDate}</p>
            <p><strong>Amount Paid:</strong> ₹{formData.admissionAmount}</p>
            <div className="d-flex justify-content-between mt-4">
              <button onClick={generateReceiptPDF} className="btn btn-success">Download PDF</button>
              <button onClick={() => setShowReceipt(false)} className="btn btn-danger">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-5 text-muted">
        Designed by{" "}
        <span className="text-gradient font-weight-bold">
          Prasad R
        </span>
      </footer>
    </div>
  );
}
