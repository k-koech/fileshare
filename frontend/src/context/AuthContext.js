import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthMessages } from "./ErrorMessages/AuthMessages"
import { Auth } from "./ErrorMessages/Auth"


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => 
{
  const [login_error_message, setlogin_ErrorMessage] = useState("");
  const [login_success_message, setlogin_SuccessMessage] = useState("");
  const [logout_success_message, setlogout_SuccessMessage] = useState("");

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  
  // LOGIN USER
  const loginUser = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) 
    {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      window.location.href="/upload"
      setlogin_SuccessMessage("Logged in successful")
      // console.log(response)
    } 
    
    else if(response.status === 401)
    {
      console.log("Wrong credentials",response);
      setlogin_ErrorMessage("Wrong Credentials");
    }
    else
    {
      console.log(response)
    }
    
  };

  // USER REGISTRATION
  const registerUser = async (email,username,is_staff,is_admin, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        username,
        is_staff,
        is_admin,
        password,
        password2
      })
    });
    if (response.status === 200) {
      // history.push("/login");
      console.log("Success")
    }
    else if(response.status === 201){
      console.log("Success 1 ")
    } 
    else {
      console.log(username)
      console.log("Something went wrong!");
    }
  };

// LOGOUT USER
  const logoutUser = () => 
  {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setlogout_SuccessMessage("Logout Success");
    // history.push("/");
  };

// CONTEXT DATA
  const contextData = 
  {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser
  };

  useEffect(() => 
  {
    if (authTokens) 
    {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <>
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
    {
         login_error_message!= "" || login_success_message!="" || logout_success_message!= ""?
            ( 
              <AuthMessages login_error_message={login_error_message} login_success_message={login_success_message}  logout_success_message={logout_success_message}/> 
            ):(<>
              <AuthMessages login_error_message={""} login_success_message={""}  logout_success_message={""}/> 
            </>)
        
    }
   
    </>
  );

};








































const messages = () => {
  return (
    // <div>
    //   <h5>Kelvin Kip</h5>
    // </div>
    <div className='user_messages opacity-25'>
  
      <> 
       <div  className='card bg-danger text-white d-flex flex-row p-3 opacity-25'>
           <h6 className='mx-3'>I'm here and i will be gone </h6>
       </div>
       

       <div className='card bg-success text-white d-flex flex-row p-3 opacity-25 mt-2'>
           <h6 className='mx-3'>I'm here and i will be gone</h6>
       </div>
      </>
    </div>
  )
  // <AuthMessages data={"Kelvin"}/>
}