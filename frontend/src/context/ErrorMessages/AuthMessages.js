import {React,useEffect, useState} from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { MdOutlineGppGood } from 'react-icons/md';
import { fadeOutRight, bounceOutRight } from "react-animations";
import { FaSmileBeam } from 'react-icons/fa';
import Radium, {StyleRoot} from 'radium';

export const AuthMessages = (props) =>
{
    const [showElement,setShowElement] = useState(false)
    
    const styles = {
        fadeOutRight: { animation: 'xx 7s',
        animationName: Radium.keyframes(bounceOutRight, 'fade') 
                }
      }
      
    useEffect(()=>{
      setTimeout(function() {
        setShowElement(true)
           }, 100);
           setShowElement(false)
         },
         
     [])
        
    return(
      <div className='user_messages opacity-25'>
         {
       
           showElement?
           <> 
           <StyleRoot>
            {
              
              (() => {
                  if (props.login_error_message != "")
                      return  (
                      <div style={styles.fadeOutRight} className='card bg-danger text-white d-flex flex-row p-3 opacity-25'>
                      <h6><BsExclamationCircle /> </h6>
                      <h6 className='mx-3'>{props.login_error_message}</h6>
                      </div>)

                  else if (props.login_success_message != "")
                      return (
                        <div style={styles.fadeOutRight} className='card bg-success text-white d-flex flex-row p-3 opacity-25 mt-2'>
                          <h6><MdOutlineGppGood /> </h6>
                          <h6 className='mx-3'>{props.login_success_message}</h6>
                       </div>
                      )
                  else if (props.logout_success_message != "")
                      return (
                        <div style={styles.fadeOutRight} className='card bg-success text-white d-flex flex-row p-3 opacity-25 mt-2'>
                          <h6><MdOutlineGppGood /> </h6>
                          <h6 className='mx-3'>{props.logout_success_message}</h6>
                       </div>
                      )
                  // else 
                  //     return <h4>Other Files</h4>

              })()
            }

            </StyleRoot>
            
          </>:<>
          
          </>

         } 
      </div>
    )

}


