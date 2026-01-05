import React, { useState } from "react";
import axios from "axios";
import "./StudentForm.css"; // Import the CSS
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    tel: "",
    grade: "",
    photo: null
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = e => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("address", form.address);
      formData.append("tel", form.tel);
      formData.append("grade", form.grade);
      if (form.photo) formData.append("photo", form.photo);

      await axios.post("http://localhost:8000/api/students", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("Student saved successfully!");
      setForm({ name: "", address: "", tel: "", grade: "", photo: null });
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="student-form-container">
      
      <form onSubmit={handleSubmit} className="student-form">
        <button
        type="button"
        className="back-bttn"
        onClick={() => navigate("/dashboard")}
      >
        back
      </button>
        <h2 className="form-title">Add Student</h2>

        {message && <p className="form-message">{message}</p>}

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="tel"
          placeholder="Phone"
          value={form.tel}
          onChange={handleChange}
          required
        />
        <input
          name="grade"
          placeholder="Grade"
          value={form.grade}
          onChange={handleChange}
          required
        />
        <input
          name="photo"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        <button className="submit" type="submit">Save Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
