import { useState, useEffect } from "react";
import axios from "axios";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    contactNumber: "",
    email: "",
    admissionAmount: "",
    address: "",
    admissionDate: ""
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    axios.get("https://kautilyaclassesbadami.onrender.com/api/admission/test")
      .then(response => console.log("Server is live: ", response.data))
      .catch(error => console.error("Error checking server status:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://kautilyaclassesbadami.onrender.com/api/admission/pay", formData);
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
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            transactionId: response.razorpay_payment_id,
            receiptId: order.receipt,
            amount: formData.admissionAmount,
            address: formData.address,
            admissionDate: formData.admissionDate,
            fatherName: formData.fatherName,
            contactNumber: formData.contactNumber
          });
          alert("Payment Successful and Email Sent!");
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
      alert("Payment failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">Kautilya Coaching Classes, Badami</h1>
      <h2 className="text-xl font-semibold text-center mb-6">Admission Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="font-medium text-gray-700 capitalize" htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Pay and Register
        </button>
      </form>
      <div className="text-center mt-4">
        <a href="https://kautilyaclassesbadami.onrender.com/api/admission/test" className="text-blue-600 hover:underline">Test Server</a>
      </div>
      <footer className="text-center mt-6 text-gray-500">Designed by Prasad R</footer>
    </div>
  );
}
