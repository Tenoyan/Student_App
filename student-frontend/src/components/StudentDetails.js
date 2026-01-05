import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./StudentDetails.css";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  // Fetch student details
  const loadStudent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudent(res.data);
    } catch (err) {
      console.log(err);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);

  // Delete student
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  if (!student) return <h2>Loading...</h2>;

  return (
    <div className="student-details-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        &larr; Back
      </button>

      <div className="profile-section">
        <img
          
            src={student.photo_url + "?t=" + new Date().getTime()}
            alt="Profile"
            className="profile-photo"
        />

        <h2>{student.name}</h2>
      </div>

      <div className="details-box">
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>Phone:</strong> {student.tel}</p>
        <p><strong>Grade:</strong> {student.grade}</p>
        {/* Optional guardian details if available */}
        {/* {student.guardian_name && <p><strong>Guardian Name:</strong> {student.guardian_name}</p>} */}
        {/* {student.guardian_tel && <p><strong>Guardian Phone:</strong> {student.guardian_tel}</p>} */}
      </div>

      <div className="button-row">
        <button className="edit-btn" onClick={() => navigate(`/student-edit/${id}`)}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
