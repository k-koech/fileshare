import React, {useEffect,useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import UploadFiles from '../components/upload-files.component';


const Upload_Files = () => {
  const { user } = useContext(AuthContext);
  
    return (   
      <div className="container p-4">
        <UploadFiles/>
      </div>

  );
};

export default Upload_Files;
