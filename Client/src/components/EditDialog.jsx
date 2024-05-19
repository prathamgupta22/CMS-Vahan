import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditDialog = ({ rowData, setShowModal }) => {
  const [formData, setFormData] = useState({
    name: rowData.name || "",
    email: rowData.email || "",
    mobile_no: rowData.mobile_no || "",
    dob: rowData.dob || "",
  });
  console.log(rowData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/student/update/${rowData.id}`, formData);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <button className="close-button" onClick={() => setShowModal(false)}>
            <X />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="mobile_no">Mobile Number:</label>
            <input
              type="tel"
              id="mobile_no"
              name="mobile_no"
              value={formData.mobile_no}
              pattern="[0-9]{10}"
              onChange={handleChange}
            />
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;
