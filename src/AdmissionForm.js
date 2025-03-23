import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function AdmissionForm() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    contactNumber: "",
    email: "",
    admissionAmount: "",
    address: "",
    admissionDate: new Date().toISOString().split("T")[0], // Default to today
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const validateForm = () => {
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      setErrorMessage("Invalid mobile number. It should be 10 digits.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }
    if (formData.admissionAmount < 1000) {
      setErrorMessage("Admission amount should be at least ₹1000.");
      return false;
    }
    setErrorMessage(""); // Clear error if everything is fine
    return true;
  };

  const handleChange = (e) => {
    if (e.target.name === "admissionAmount" && e.target.value < 0) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://kautilyaclassesbadami.onrender.com/api/admission/pay",
        formData
      );
      console.log("Payment Initiated: ", response.data);
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Admission Receipt", 20, 20);
    doc.text(`Student: ${formData.firstName} ${formData.lastName}`, 20, 30);
    doc.text(`Father's Name: ${formData.fatherName}`, 20, 40);
    doc.text(`Amount Paid: ₹${formData.admissionAmount}`, 20, 50);
    doc.text(`Date: ${formData.admissionDate}`, 20, 60);
    doc.save("Admission_Receipt.pdf");
  };

  return (
    <div className={`max-w-lg mx-auto p-6 shadow-md rounded-xl mt-10 relative ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {errorMessage && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-md text-center">
          {errorMessage}
        </div>
      )}

      <div className="absolute top-4 right-4 flex flex-col space-y-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <a
          href="https://kautilyaclassesbadami.onrender.com/api/admission/test"
          className="p-2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm"
        >
          🔗
        </a>
      </div>

      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">
        Kautilya Coaching Classes, Badami
      </h1>
      <h2 className="text-xl font-semibold text-center mb-6">Admission Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium capitalize" htmlFor={key}>
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </label>
            <input
              type={
                key === "admissionDate"
                  ? "date"
                  : key === "email"
                  ? "email"
                  : key === "contactNumber" || key === "admissionAmount"
                  ? "number"
                  : "text"
              }
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
              required
              min={key === "admissionDate" ? formData.admissionDate : undefined}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Pay and Register
        </button>
      </form>

      {/* Receipt Preview & Download */}
      <div className="mt-4 text-center">
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white p-2 rounded-md font-semibold hover:bg-green-700 transition"
        >
          Preview & Download Receipt
        </button>
      </div>

      <footer className="text-center mt-6 text-gray-500">
        Designed by Prasad R
      </footer>
    </div>
  );
}
