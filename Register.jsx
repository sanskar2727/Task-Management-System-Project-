import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register(){
  const [form , setForm ] = useState({ name: " ", email: " " , password : "  "});
  const navigate = useNavigate();
  const handleChnage = (e) => {
    const {name , value } = e.target
    console.log(name , value);
    const copyRegister = {...form}
    copyRegister[name] = value;
    setForm(copyRegister);
  }

  const handleSubmit = async (e)=>{
      e.preventDefault();
      await axios.post("http://localhost:8080/api/auth/register" , form);
      navigate('/');
  }
    return(<>
     <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input onChange={handleChnage} type="text" name="name" placeholder="Enter name" value={form.name} />
        <br />
        <br />
      <input onChange={handleChnage} type="text" name="email" placeholder="Enter email" value={form.email} />
        <br />
        <br />
      <input onChange={handleChnage} type="text" name="password" placeholder="Enter Password" value={form.password} />
        <br />
        <br />
       <button type="submit">Register</button>
     </form>
    </>
    )
}

export default Register ;