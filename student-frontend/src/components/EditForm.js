import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditForm.css";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    tel: "",
    grade: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  // Load student details
  useEffect(() => {
    const loadStudent = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:8000/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          name: res.data.name,
          address: res.data.address,
          tel: res.data.tel,
          grade: res.data.grade,
          photo: null,
        });

        setPreview(res.data.photo_url);
      } catch (err) {
        console.log(err);
        navigate("/dashboard");
      }
    };

    loadStudent();
  }, [id]);

  // Update text fields + photo
  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setForm({ ...form, photo: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("address", form.address);
      formData.append("tel", form.tel);
      formData.append("grade", form.grade);

      if (form.photo) {
        formData.append("photo", form.photo);
      }

      await axios.post(
        `http://localhost:8000/api/students/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

    //   navigate(`/student-details/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="student-form-container">
      <form onSubmit={handleSubmit} className="student-form">
        <button
          type="button"
          className="back-bttn"
          onClick={() => navigate(`/student/${id}`)}
        //   onClick={() => navigate("/student-details")}
        >
          Back
        </button>

        <h2 className="form-title">Edit Student</h2>

        {preview && (
          <img src={preview} alt="Preview" className="preview-photo" />
        )}

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

        <button className="submit" type="submit">
          Save Student
        </button>
      </form>
    </div>
  );
};

export default EditForm;
