import React, {useEffect,useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import UploadFiles from './Files/upload-files.component';
const Upload_Files = () => {
  const { user } = useContext(AuthContext);
  
   
    return (
    
    <div className="container p-4">
      <UploadFiles/>
      {/* <div className="row">
        <div className="col-md-5">
        { user?(
          <>
            <h3 className="h1">Admin {user.is_admin}</h3> <br/>
            <h4>Upload Files</h4>
            <div>
               
            </div>
          </>):
          (
            <>
            <h3>Staff</h3>
            
            </>
          )
           
          }
        </div>
        <div className="col-md-7 p-3 border-left">
          <h5>Uploaded Files</h5>

       
          
        </div>
      </div> */}
     
    </div>
  );
};

export default Upload_Files;
