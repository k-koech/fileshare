import { useState, useContext } from "react";
import { AuthContext} from "../context/AuthContext"
import { Link } from "react-router-dom";
import {FiUserPlus} from "react-icons/fi";


const Register = () =>
{
  const { registerUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  let [is_staffChecked, staff_setChecked] = useState(false);
  let [is_adminChecked, admin_setChecked] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const password2 = e.target.password.value;
    const is_staff = e.target.is_staff.checked;
    const is_admin = e.target.is_admin.checked;
  
    registerUser(email,username,is_staff,is_admin, password,password2);
  };
  
  
  return (
    <>      
    { user.is_admin ? (
        <>
        <section className="container row mx-auto mt-5">
          <div className="col-md-2"></div>
          <div className="col-md-8 border-top border-right border-bottom rounded p-5">
              <h1 className='font-weight-500 text-center mt-2 mb-1'>
                <FiUserPlus/>
              </h1>
              <h1 className="text-center">Register a user</h1>
              <form className="mx-5" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="text" className="form-control" name='email' id="email" placeholder="Email"
                    required />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" name='username' 
                  id="username" placeholder="Username" required />
                </div>
                <div className="form-group form-check">
                  <input className="form-check-input" type="checkbox" checked={is_staffChecked} 
                  onChange={(e) => {staff_setChecked(e.target.checked);admin_setChecked(false); } } name="is_staff" />
                  <label className="form-check-label">
                    Is Staff
                  </label>
                </div>

                <div className="form-group form-check">
                  <input className="form-check-input" type="checkbox" checked={is_adminChecked} 
                  onChange={(e) => {admin_setChecked(e.target.checked);staff_setChecked(false)} } name="is_admin" />
                  <label className="form-check-label">
                    Is Admin
                  </label>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control"
                  placeholder="Enter Password"  name='password' required
                  id="password"/>

                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" required
                  placeholder="Confirm Password" name='password2' 
                  id="password2" />
                  
                </div>
                <button type="submit" className="btn btn-primary" onClick={registerUser}>Register</button>
              </form>
              {/* <div className="mt-3 text-center">
                    <p>Already Registered? <Link to="/login">Login</Link></p>
              </div> */}
          </div>
          <div className="col-md-2"></div>
    
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