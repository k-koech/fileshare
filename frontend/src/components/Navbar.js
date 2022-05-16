import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { FaHome } from 'react-icons/fa';
import { FiLogIn, FiLogOut, FiUserPlus, FiUpload, FiUser } from 'react-icons/fi';
import { ImFilesEmpty} from 'react-icons/im'
import UserInfo from "./UserInfo";

const Navbar = () => {
const { user, logoutUser } = useContext(AuthContext);
  return (
  <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <a className="navbar-brand mx-5 font-weight-500" href="/">K<ImFilesEmpty/></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
        <li className="nav-item active mx-3">
            <Link to="/"><FaHome/> Home</Link>
          </li>
          {user ? (
            <>
              {/* <li className="nav-item active mx-3">
                  <Link to="/protected">Protected Page</Link>
              </li> */}

              <li className="nav-item active mx-3">
                <Link to="/upload"><FiUpload/> Upload</Link>
              </li>
              <li className="nav-item active mx-3">
                <Link to="/profile">
                  <FiUser/> {user.username}
                </Link>
              </li>
                {/* user &&  /> */}
                
              <li className="nav-item active mx-3">
                <Link to="/" onClick={logoutUser}><FiLogOut /> Logout</Link>
              </li>
          </>
          ):(
            <>
              <li className="nav-item active mx-3">
                <Link to="/login"><FiLogIn/> Login</Link>
              </li>
              <li className="nav-item active mx-3">
                <Link to="/register"><FiUserPlus/> Register</Link>
              </li>
            </>
          )}

         
         
        </ul>
      </div>
    </nav> 
     
    <Outlet /> 
    </> 
  );
};

export default Navbar;





// <div classNameNameName="bg-dark">
// {/* {user ? ( */}
//   <>
//     <Link to="/">Home</Link>
//     <Link to="/protected">Protected Page</Link>
//     {/* <button onClick={logoutUser}>Logout</button> */}
//   {/* </>
// ) : (
//   <> */}
//     <Link to="/login">Login</Link>
//     <Link to="/register">Register</Link>
//   </>
// {/* )} */}
// </div>