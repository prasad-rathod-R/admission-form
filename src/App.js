import { useState, useEffect } from "react";
import axios from "axios";
import { useEffect } from "react";

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
          await axios.post("http://localhost:8080/api/admission/sendEmail", {
            name: formData.name,
            email: formData.email,
            transactionId: response.razorpay_payment_id,
            receiptId: order.receipt,
            amount: formData.fees,
            aadharNumber: formData.aadharNumber,
            parentPhoneNumber: formData.parentPhone
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
      alert("Payment failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-4">Kautilya Coaching Classes, Badami</h1>
      <h2 className="text-2xl font-bold text-center mb-4">School Admission Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
            className="w-full p-2 border rounded-md"
            required
          />
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Pay and Register
        </button>
      </form>
      <footer className="text-center mt-4 text-gray-600">Designed by Prasad Rathod</footer>
    </div>
  );
}
