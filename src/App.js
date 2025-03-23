import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdmissionForm() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    contactNumber: "",
    email: "",
    admissionAmount: "",
    address: "",
    admissionDate: today // Default to today
  });

  const [amountWarning, setAmountWarning] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    axios.get("https://kautilyaclassesbadami.onrender.com/api/admission/test")
      .then(() => toast.success("Server is live!"))
      .catch(() => toast.error("Error checking server status"));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "admissionAmount") {
      if (value < 1000) {
        setAmountWarning("Admission amount should be ₹1000 or more.");
      } else {
        setAmountWarning("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post("https://kautilyaclassesbadami.onrender.com/api/admission/pay", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const order = response.data;
      
      const options = {
        key: "your_razorpay_key", 
        amount: order.amount,
        currency: order.currency,
        name: "School Admission Fee",
        description: "Payment for school admission",
        order_id: order.id,
        handler: async function (response) {
          await axios.post("https://kautilyaclassesbadami.onrender.com/api/admission/sendEmail", {
            ...formData,
            transactionId: response.razorpay_payment_id,
            receiptId: order.receipt
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Payment Successful and Email Sent!");
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.contactNumber
        },
        theme: {
          color: "#3399cc"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Payment failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className={`max-w-lg mx-auto p-6 shadow-md rounded-xl mt-10 relative ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="absolute top-4 right-4 flex flex-col space-y-4">
        <button onClick={toggleTheme} className="p-2 bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <a href="https://kautilyaclassesbadami.onrender.com/api/admission/test" className="p-2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm">
          🔗
        </a>
      </div>
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">Kautilya Coaching Classes, Badami</h1>
      <h2 className="text-xl font-semibold text-center mb-6">Admission Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium capitalize" htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input
              type={key === "admissionDate" ? "date" : key === "email" ? "email" : key === "contactNumber" || key === "admissionAmount" ? "number" : "text"}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
              required
              {...(key === "admissionDate" ? { min: today, disabled: true } : {})} // Prevent past dates & disable editing
            />
            {key === "admissionAmount" && amountWarning && (
              <p className="text-red-500 text-sm mt-1">{amountWarning}</p>
            )}
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Pay and Register
        </button>
      </form>
      <footer className="text-center mt-6 text-gray-500">Designed by Prasad R</footer>
    </div>
  );
}
