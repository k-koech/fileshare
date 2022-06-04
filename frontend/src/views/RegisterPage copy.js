import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom";
import {FiUserPlus} from "react-icons/fi";


const Register = () =>
{
  const { registerUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))

    validateInput(event);
  }
  
  // Frontend Errors
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;
 
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (inputs.password2 && value !== inputs.password2) {
            stateObj["password2"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["password2"] = inputs.password2 ? "" : error.password2;
          }
          break;
 
        case "password2":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (inputs.password && value !== inputs.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }
  
  // Registration function
  const registerUser = (event) => 
  {
    event.preventDefault();
    console.log(inputs)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs)
    };
    fetch("http://127.0.0.1:8000/api/register/", requestOptions)
    .then( data => data.json())  
    .then( 
        data => {
          console.log("Data : ",data)
          // Getting Backend errors
            // if (data.usernameerror) 
            // {
            //   console.log("Username Error:",data.username)
            //   console.log("Password Error", data.password)
            //   console.log("Password Error", data.password2) 
            // }
            // else if(data.success)
            // {
            //   console.log("Success", data.success) 
            // }
            // else{
            //   console.log("Nothing")
            // }
        },         
        )

    .catch(
      error=> console.error(`Error:${error}`)
    );

   
  }

  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })


  return (
    <section className="container row mx-auto mt-5">
      <div className="col-md-3"></div>
      <div className="col-md-6 border-top border-right border-bottom rounded p-5">
        <h1 className='font-weight-500 text-center mt-2 mb-1'>
          <FiUserPlus/>
        </h1>
        <h1 className="text-center">Register</h1>
        <form className="mx-5">
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name='email' 
          value={inputs.email||""} 
          onChange={handleChange}
            placeholder="Email"
            required />
          
          {error.email && <span className='text-small text-danger'>{error.email}</span>}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" name='username' 
          value={inputs.username||""} 
          onChange={handleChange}
            placeholder="Username"
            required />
          
          {error.username && <span className='text-small text-danger'>{error.username}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control"
          placeholder="Enter Password"  name='password' required
          value={inputs.password||""}  onChange={handleChange}/>

           {error.password && <span className='text-small text-danger'>{error.password}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" required
          placeholder="Confirm Password" name='password2' 
          value={inputs.password2||""} onChange={handleChange} />
          
          {error.password2 && <span className='text-small text-danger'>{error.password2}</span>}
        </div>
        <button type="submit" className="btn btn-primary" onClick={registerUser}>Register</button>
      </form>
      <div className="mt-3 text-center">
            <p>Already Registered? <Link to="/login">Login</Link></p>
      </div>
    </div>
    <div className="col-md-3"></div>
      
    </section>
  );
}

export default Register;