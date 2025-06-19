import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login(){
 const [form , setForm ] = useState({
    email : "",
    password : ""
 })
 const navigate = useNavigate();

 const handleLogin = async (e) => {
     e.preventDefault();
    const res = await axios.post("http://localhost:8080/api/auth/login" , form);
    console.log("Sending login data:", form);
    localStorage.setItem("token" , res.data.token);
    navigate('/dashboard');
 }
    return <>
    <form onSubmit={handleLogin}>
         <h2>Login</h2> 
         <input placeholder="Email" onChange={(e) => setForm({...form , email: e.target.value})} />
         <br/>
         <br/>
         <input placeholder="Password" onChange={(e) => setForm({...form, password : e.target.value})} />
         <br/>
         <br/>
         <button type="submit">Login</button>
    </form>
    </>
}

export default Login