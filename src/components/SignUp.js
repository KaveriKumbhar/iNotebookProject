import React, { useState } from 'react'
//import { json } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const SignUp = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
      e.preventDefault();
      const {name,email,password}=credentials;
      const response = await fetch("http://localhost:3000/api/auth/createuser", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name,email,password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
          localStorage.setItem("token", json.authToken)
          navigate(`/`)
          //showAlert(`Welcome back ${values.username}`, "success")
          props.showAlert("SignUP successfully", "success")
      } else {
          //showAlert(json.message, "error")
          props.showAlert("Invalid details", "danger")
      }
  }

  const onChange = (e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value});
  }
  return (
    <div className='container mt-2'> 
    <h2>Create an Account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label"><b>Name</b></label>
          <input type="text" className="form-control" id="name"name='name' aria-describedby="emailHelp"onChange={onChange} placeholder='Enter you name'/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"><b>Email address</b></label>
          <input type="email" className="form-control" id="email" name='email'aria-describedby="emailHelp"onChange={onChange} placeholder='Enter your Email Address'/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><b>Password</b></label>
          <input type="password" className="form-control" id="password"name='password'onChange={onChange} minLength={5} required placeholder='Enter your Password '/>
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"><b>Confirm Password</b></label>
          <input type="password" className="form-control" id="cpassword"name='cpassword'onChange={onChange} minLength={5}required placeholder='Enter your Confirm Password '/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
