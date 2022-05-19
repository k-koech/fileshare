import React, { useState, useEffect, useContext } from "react";
import Dropzone from "react-dropzone";
import {AuthContext} from "../context/AuthContext";
import { FilesProvider } from "../context/FilesContext";
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';




const UploadFiles = () => {    
    const { uploadFile, getFiles, deleteFile } = FilesProvider();

    const { user } = useContext(AuthContext);

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [success_message, setSuccessMessage] = useState("");
  const [error_message, setErrorMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  useEffect(() => {
    getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    uploadFile(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setErrorMessage(response.data.message);
        return getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
        setSuccessMessage("Saved successfully");
      })
      .catch(() => {
        setProgress(0);
        setErrorMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  
  return (
    <div className="container">
       <div className="row">
        <div className="col-md-5">
         { user.is_admin?(
            <>
              <h3 className="h1">Admin {user.is_admin}</h3> <br/>
              <h4>Upload Files</h4>
              <div>
                
              </div>
            
              {currentFile && (
                  <div className="progress">
                  <div className="progress-bar progress-bar-info progress-bar-striped"
                      role="progressbar" aria-valuenow={progress} aria-valuemin="0"
                      aria-valuemax="100" style={{ width: progress + "%" }} >
                      {progress}%
                  </div>
                  </div>
              )}

               {/* Error messages  */}
              <div className="alert text-danger" role="alert">
                  {error_message}
              </div>
              <div className="alert text-success" role="alert">
                  {success_message}
              </div>

              <Dropzone onDrop={onDrop} multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                  <section>
                      <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          {selectedFiles && selectedFiles[0].name ? (
                              <div className="selected-file">
                              {selectedFiles && selectedFiles[0].name}
                              </div>
                          ) : (
                              "Drag and drop file here, or click to select file"
                          )}
                      </div>
                      <aside className="selected-file-wrapper text-right">
                          <button className="btn btn-success" disabled={!selectedFiles} onClick={upload} >
                              Upload
                          </button>
                      </aside>
                  </section>
                  )}
              </Dropzone>
            </>):
            (
              <>
              <h3>Staff</h3>
              
              </>
            )  
          }
      </div>

      
      
      <div className="col-md-7 border-left">
        {
            fileInfos.length > 0?
            (
            
            <div className="card">
            <div className="card-header">List of Files</div>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Description</th>
                  { user.is_admin?(
                    <>
                     <th scope="col">Edit</th>
                     <th scope="col">Delete</th>
                    </>
                 
                  ):(
                    <>                   
                    </>
                  )}             
                </tr>
                <tr>
                </tr>
              </thead>
              <tbody>
              {fileInfos.map((file, index) => (
                <tr key={index}>
                  <th scope="row">{file.id}</th>       
                  <td>
                  <a href={file.url}>{file.title}</a>
                  </td>
                  { user.is_admin?(
                    <>
                    <td>
                      <a className="btn text-success"><AiFillEdit/></a>
                    </td>
                    <td className="">
                      <a className="btn text-danger"><MdDeleteOutline onClick={() => deleteFile(file.id)} /></a>
                    </td>
                  </>
                  ):(
                    <></>
                  )
                  }
                   
                </tr>
                ))
                }
              </tbody>
            </table>
            </div>
          
            ):
            (
              <>
                <div className="alert alert-info text-center">No file has been uploaded!</div>
              </>
            )
        
        }
      </div>
      
      </div>
    </div>
  );
};

export default UploadFiles;