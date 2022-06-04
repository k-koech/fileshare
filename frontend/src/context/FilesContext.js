import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import http from "../utils/http-common";
import API from "../utils/API";

export const FilesContext = createContext();

export const FilesProvider = () =>
{
  // const api = useAxios();

  //Upload files
  const uploadFile = (file, onUploadProgress) => {
      
      let formData = new FormData();
    
      formData.append("file", file);
      console.log("xxx", formData.file);
    
      return http.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    };

   
  //  Delete a file
  const deleteFile = (id) => {
    API.delete(`/file/delete/${id}/`)
    .then(
      (res) => { 
        console.log(res)
        getFiles()
        window.location.href="/upload"

      }
      );

      // console.log(id)
  };
 // Get files
  const getFiles = () => {
    return http.get("/files/");
  };
  return {uploadFile,getFiles, deleteFile};

}