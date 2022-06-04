import './App.css';
import React from "react";
import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/Home/homePage";
import Upload_Files from "./views/Upload_Files";
import Login from "./views/LoginPage";
import Register from "./views/RegisterPage";
import ProtectedPage from "./views/ProtectedPage";
import NoPage from "./views/NoPage";
import LoginPage from './views/LoginPage';
import Profile from './views/Profile/Profile';
import { AuthMessages } from "./context/ErrorMessages/AuthMessages"
import { AuthContext } from "./context/AuthContext"


function App() 
{

  return (
     <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
        <BrowserRouter>
        <div className='MainContainer'>
            <Navbar /> 
            {/* <AuthMessages/> */}
            <Routes>
                {/* <Route path="/12" element={<PrivateRoute> <ProtectedPage /> </PrivateRoute>} /> */}
                {/* <PrivateRoute path="/protected" exact /> */}
                 {/* <Route element={user? <Register />: <Login/>} path="/register"  /> */}
                <Route element={<Login/>} path="/login" />
                <Route element={<Register/>} path="/register" />
                <Route element={<Home/>} path="/" />
                <Route element={<Profile/>} path="/profile" />
                <Route path="/user" element={<PrivateRoute Component={ProtectedPage} />} />
                <Route element={<Upload_Files/>} path="/upload" />  
                <Route path="*" element={<NoPage />} />
            </Routes>
            
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider> 
        
      </div> 


     
  );

}

export default App;


