import React, { useContext, useState } from "react"; 
import axios from "axios"; 
import { useNavigate, Link } from "react-router-dom"; 
import { AuthContext } from "./context/AuthContext";

const Login = () => { 
  const [form, setForm] = useState({ email: "", password: "" }); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 
  const { login } = useContext(AuthContext);
  
  const handleChange = e => 
    setForm({ ...form, [e.target.name]: e.target.value }); 

    const handleSubmit = async e => { 
      e.preventDefault(); 
      try { 
        const res = await axios.post("http://localhost:8000/api/login", form); 
        // localStorage.setItem("token", res.data.token); 
        login(res.data.token); // SAVE TOKEN IN CONTEXT
        navigate("/dashboard"); } 
        catch (err) { 
          setError(err.response?.data?.errors?.email[0] || "Login failed"); 
        } 
      }; 

    return ( 
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto mt-10">
          <h2 className="form-title">Login</h2>
           {error && <p style={{ color: "red" }}>{error}</p>} 
           <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
           <input name="password" type="password" placeholder="Password" onChange={handleChange} required /> 
           <button type="submit">Login</button> 
           <p> Don't have an account? <Link to="/register">Register here</Link> </p> 
        </form>
        ); 
      }; 
      
export default Login;