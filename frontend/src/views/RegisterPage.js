import { useState, useContext } from "react";
import { AuthContext} from "../context/AuthContext"
import { Link } from "react-router-dom";
import {FiUserPlus} from "react-icons/fi";


const Register = () =>
{
  const { registerUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const password2 = e.target.password.value;
    // email.length > 0 && 
    console.log(email);
    registerUser(email,username, password,password2);
  };
  
  
  return (
    <>      
    { user ? (
        <>
        <section className="container row mx-auto mt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 border-top border-right border-bottom rounded p-5">
              <h1 className='font-weight-500 text-center mt-2 mb-1'>
                <FiUserPlus/>
              </h1>
              <h1 className="text-center">Register</h1>
              <form className="mx-5" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" name='email' id="email" placeholder="Email"
                    required />
                  {/* {error.email && <span className='text-small text-danger'>{error.email}</span>} */}
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" name='username' 
                  id="username" placeholder="Username" required />
                  {/* {error.username && <span className='text-small text-danger'>{error.username}</span>} */}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control"
                  placeholder="Enter Password"  name='password' required
                  id="password"/>

                  {/* {error.password && <span className='text-small text-danger'>{error.password}</span>} */}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" required
                  placeholder="Confirm Password" name='password2' 
                  id="password2" />
                  
                  {/* {error.password2 && <span className='text-small text-danger'>{error.password2}</span>} */}
                </div>
                <button type="submit" className="btn btn-primary" onClick={registerUser}>Register</button>
              </form>
              <div className="mt-3 text-center">
                    <p>Already Registered? <Link to="/login">Login</Link></p>
              </div>
          </div>
          <div className="col-md-3"></div>
    
        </section>
        </>
    ):
    (
      <>
        <div className='alert alert-info text-center mt-5 w-25 mx-auto'>
          <a href='/login'>Login </a>to access this page!
        </div>
      </>
    )
    }
    </>

     
  );
}

export default Register;