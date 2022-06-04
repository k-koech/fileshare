import React, {useEffect,useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import UploadFiles from '../../components/upload-files/upload-files.component';
import './Profile.css';


const Profile = () => {
  const { user } = useContext(AuthContext);
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   email.length > 0 && loginUser(email, password);
  // };


    return (  
    <>      
      { user ? (
      <>
      <div className="container p-4">
        <div className="main-body">
              <nav aria-label="breadcrumb" className="main-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href="/upload">Files</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Profile</li>
                </ol>
              </nav>

              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card pt-5">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                        <div className="mt-3">
                          <h4>{user.username}</h4>
                          <p className="text-secondary mb-1 font-size-md">Admin</p>
                          <p className="text-muted font-size-sm"></p>     
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <ul className="list-group list-group-flush">
                    </ul>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">UserName</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {user.username}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {user.email}
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Phone</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          072 816-9029
                        </div>
                      </div>
                      <hr/>
                    </div>
                  </div>
                  <div className="gutters-sm bg-dark">
                      <div className="card">
                        <div className="card-body bg-light">
                          <h3 className="text-center">Update Password</h3>
                          <form className="">
                            <div className="form-group">
                              <label>Password</label>
                              <input type="password" className="form-control" id="password" placeholder="Enter Password" />
                            </div>
                            <div className="form-group">
                              <label>Repeat Password</label>
                              <input type="password" className="form-control" id="password" placeholder="Repeat Password" />
                            </div>
                            <button type="submit" className="btn btn-primary px-5 float-right">Save</button>
                          </form>
                        </div>
                      </div>
                  </div>


                </div>
              </div>
        
        </div>

      </div>
      </>):
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
};

export default Profile;






  
  
  
