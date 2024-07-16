import React, { useState } from 'react'
//import { json } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const LogIn = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password }), // body data type must match "Content-Type" header
          });
          const json = await response.json();
          console.log(json);

        //   if(json.succsess){
        //     //restored
        //     localStorage.setItem("token",json.authToken);
        //     navigate("/");
        //   }else{
        //     alert("enter valid details");
        //   }

          if (json.success) {
            localStorage.setItem("token", json.authToken)
            navigate("/")
            props.showAlert("Logged In successfully", "success")
            
        } else {
            props.showAlert("Invalid details", "danger")
            //alert("enter valid details");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    return (
        <div className='container mt-3'> 
            <h2>LogIn to continue to iNotebbok</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><b>Email address</b></label>
                    <input type="email" className="form-control" id="email"name='email'value={credentials.email}  aria-describedby="email"onChange={onChange} placeholder='Enter your valid Email Address'/>
                        
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><b>Password</b></label>
                    <input type="password" className="form-control" id="password" name='password'value={credentials.password} onChange={onChange} placeholder='Enter your valid Password'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default LogIn
