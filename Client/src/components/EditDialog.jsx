import React from "react";

const EditDialog = () => {
  return (
    <>
      <form action="submit">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          pattern="[0-9]{10}"
        />
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" />
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="salary">Salary:</label>
        <input type="number" id="salary" name="salary" />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default EditDialog;
