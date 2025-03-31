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
    <div className={`max-w-lg mx-auto p-6 shadow-md rounded-xl mt-10 relative ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Right Menu */}
      <div className="absolute top-4 right-4 flex flex-col space-y-4">
        <button onClick={toggleTheme} className="p-2 bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <a href="https://your-backend-url.com/api/admission/test" className="p-2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm">
          🔗
        </a>
        <button onClick={() => setShowReceipt(true)} className="p-2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
          📄
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">Kautilya Coaching Classes, Badami</h1>
      <h2 className="text-xl font-semibold text-center mb-6">Admission Form</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium capitalize" htmlFor={key}>
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </label>
            <input
              type={key === "admissionDate" ? "date" : key === "email" ? "email" : key === "contactNumber" || key === "admissionAmount" ? "number" : "text"}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
              required
              min={key === "admissionAmount" ? "1000" : undefined}
              disabled={key === "admissionDate"}
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Pay and Register
        </button>
      </form>

      {/* Receipt Preview Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Receipt Preview</h2>
            <p><strong>Student:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Father's Name:</strong> {formData.fatherName}</p>
            <p><strong>Contact:</strong> {formData.contactNumber}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Admission Date:</strong> {formData.admissionDate}</p>
            <p><strong>Amount Paid:</strong> ₹{formData.admissionAmount}</p>
            <div className="flex justify-between mt-4">
              <button onClick={generateReceiptPDF} className="bg-green-600 text-white px-4 py-2 rounded-md">Download PDF</button>
              <button onClick={() => setShowReceipt(false)} className="bg-red-600 text-white px-4 py-2 rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}
 
 
      {/* Footer */}
      <footer className="text-center mt-6 text-gray-500">
  Designed by{" "}
  <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-pulse font-bold">
    Prasad R
  </span>
</footer>


    </div>
  );
}