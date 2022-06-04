import React, {useEffect,useContext, useState} from 'react';
import { AuthContext } from "../context/AuthContext";
import UploadFiles from '../components/upload-files/upload-files.component';


const Upload_Files = () => {
  const { user } = useContext(AuthContext);

    return (   
    <>      
        { user ? (
          <>
          <div className="container p-4">
            <UploadFiles/>
          </div>         
          </>  
        ):(
          <>
            <div className='alert alert-info text-center mt-5 w-25 mx-auto'>
              <a href='/login'>Login </a>to access this page!
            </div>
          </>
        ) 
        
        }
        
    </>
    )

};

export default Upload_Files;
