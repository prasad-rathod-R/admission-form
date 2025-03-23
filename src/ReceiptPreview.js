import { Dialog } from "@headlessui/react";
import jsPDF from "jspdf";

const ReceiptPreview = ({ isOpen, onClose, formData }) => {
  if (!formData) return null;

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Kautilya Coaching Classes, Badami", 20, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Receipt ID: ${Math.floor(Math.random() * 1000000)}`, 20, 30);
    doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 20, 40);
    doc.text(`Father's Name: ${formData.fatherName}`, 20, 50);
    doc.text(`Contact: ${formData.contactNumber}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 70);
    doc.text(`Address: ${formData.address}`, 20, 80);
    doc.text(`Admission Date: ${formData.admissionDate}`, 20, 90);
    doc.text(`Amount Paid: ₹${formData.admissionAmount}`, 20, 100);
    
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing us!", 20, 120);
    
    doc.save("admission_receipt.pdf");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <Dialog.Title className="text-xl font-bold text-center text-blue-600 dark:text-blue-300">
          Admission Receipt
        </Dialog.Title>
        
        <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-4">
          <p className="font-semibold">Receipt ID: <span className="font-normal">{Math.floor(Math.random() * 1000000)}</span></p>
          <p className="font-semibold">Name: <span className="font-normal">{formData.firstName} {formData.lastName}</span></p>
          <p className="font-semibold">Father's Name: <span className="font-normal">{formData.fatherName}</span></p>
          <p className="font-semibold">Contact: <span className="font-normal">{formData.contactNumber}</span></p>
          <p className="font-semibold">Email: <span className="font-normal">{formData.email}</span></p>
          <p className="font-semibold">Address: <span className="font-normal">{formData.address}</span></p>
          <p className="font-semibold">Admission Date: <span className="font-normal">{formData.admissionDate}</span></p>
          <p className="font-semibold text-green-600 dark:text-green-400">Amount Paid: ₹{formData.admissionAmount}</p>
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={downloadReceipt} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
            Download PDF
          </button>
          <button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-black py-2 px-4 rounded-md">
            Close
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ReceiptPreview;
