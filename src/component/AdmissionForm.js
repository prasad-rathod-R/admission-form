// AdmissionForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./NavBar";

export default function AdmissionForm() {
  const today = new Date().toISOString().split("T")[0];

  const token = localStorage.getItem("token");
  console.log(token, "resoning");

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("admissionForm");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          fatherName: "",
          contactNumber: "",
          email: "",
          admissionAmount: 1000,
          address: "",
          admissionDate: today,
        };
  });

  const [errors, setErrors] = useState({});

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    localStorage.setItem("admissionForm", JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the validation errors.", {
        position: "top-center",
      });
      return;
    }

    try {
      const orderRes = await axios.post(
        "https://kautilyaclassesbadami.onrender.com/api/admission/pay",
        { admissionAmount: formData.admissionAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id, amount, currency, receipt } = orderRes.data;

      const options = {
        key: "rzp_test_Wq1DV2zafj4phH",
        amount,
        currency,
        name: "Kautilya Classes Badami",
        description: "Admission Fee Payment",
        order_id: id,
        handler: async function (response) {
          const finalData = {
            ...formData,
            paymentId: response.razorpay_payment_id,
          };
          console.log(response, "verifyres");
          await axios.post(
            "https://kautilyaclassesbadami.onrender.com/api/admission/verify",
            {
              order_id: id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          toast.success("✅ Payment successful and admission submitted!", {
            position: "top-center",
          });
          localStorage.removeItem("admissionForm");
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.contactNumber,
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("❌ Payment failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="d-flex">
      {/* <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <div>
        <form onSubmit={handleSubmit} className="container mt-3">
          <h2 className="mb-4">Admission Form</h2>
          <div className="row g-3">
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "fatherName", label: "Father's Name" },
              { name: "contactNumber", label: "Contact Number" },
              { name: "email", label: "Email" },
              { name: "address", label: "Address" },
            ].map((field) => (
              <div className="col-md-6" key={field.name}>
                <label className="form-label">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`form-control ${
                    errors[field.name] ? "is-invalid" : ""
                  }`}
                />
                {errors[field.name] && (
                  <div className="invalid-feedback">{errors[field.name]}</div>
                )}
              </div>
            ))}

            <div className="col-md-6">
              <label className="form-label">Admission Amount</label>
              <input
                type="number"
                name="admissionAmount"
                value={formData.admissionAmount}
                readOnly
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Admission Date</label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="form-control"
                min={today}
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Pay & Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
