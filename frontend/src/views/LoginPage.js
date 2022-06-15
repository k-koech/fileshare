import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BiUser } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi'
import { Link } from "react-router-dom";
import { AuthMessages } from "../context/ErrorMessages/AuthMessages";

const LoginPage = () => {
  
  const { loginUser } = useContext(AuthContext);
  const [login_error_message, setlogin_ErrorMessage] = useState("");

  
  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    email.length > 0 && loginUser(email, password);
  };
  

  return (
    
    <section className="container row mt-5 mx-auto">
      <div className="col-md-3"></div>
      <div className="col-md-6 border-top border-left rounded mt-5 p-3 pt-5">
        
        <h1 className='font-weight-500 text-center'>
          <FiUser/>
        </h1>
        <h3 className="text-center">Login</h3>
        <form className="mx-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" id="email" placeholder="Enter email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
          <div className="mt-3">
            <p>Not Registered? <Link to="/register">Register</Link></p>
          </div>
      </div>
      <div className="col-md-3"></div>
    </section>
  );
};

export default LoginPage;