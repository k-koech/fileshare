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
    
      return http.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    };

    // Get files
  const getFiles = () => {
    return http.get("/files/");
  };
  //  Delete a file
  const deleteFile = (id) => {
    API.delete(`/files/${id}/`).then((res) => getFiles());

      console.log(id)
  };

  return {uploadFile,getFiles, deleteFile};

}