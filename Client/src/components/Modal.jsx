import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const Modal = ({ setShowModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
    dob: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/student", formData);
      if (response.status === 201) {
        console.log(response.data.message);
        setShowModal(false);
      } else {
        console.error("Error:", response.data.error);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.error);
      } else {
        console.error("Error:", error.message);
      }
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
            <h2>
              <center>Add Entry</center>
            </h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="mobile_no">Mobile Number:</label>
            <input
              type="tel"
              id="mobile_no"
              name="mobile_no"
              value={formData.mobile_no}
              pattern="[0-9]{10}"
              onChange={handleChange}
              required
            />
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
