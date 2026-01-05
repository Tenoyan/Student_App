import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentForm from "./components/StudentForm";
import Dashboard from "./components/Dashboard";
import StudentDetails from "./components/StudentDetails";
import EditForm from "./components/EditForm";
// import StudentEdit from "./components/StudentEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/dashboard" 
          element={localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/login" />} 
        />

        <Route
          path="/student-form"
          element={localStorage.getItem("token") ? <StudentForm /> : <Navigate to="/login" />}
        />

        <Route
          path="/student/:id"
          element={localStorage.getItem("token") ? <StudentDetails /> : <Navigate to="/login" />}
        />

        <Route path="/student-edit/:id" element={<EditForm />} />


        {/* <Route
          path="/student-edit/:id"
          element={localStorage.getItem("token") ? <StudentEdit /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
