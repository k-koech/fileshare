import {React,useEffect, useState} from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { MdOutlineGppGood } from 'react-icons/md';
import { fadeOutRight, bounceOutRight } from "react-animations";
import { FaSmileBeam } from 'react-icons/fa';
import Radium, {StyleRoot} from 'radium';

export const AuthMessages = () =>
{
    const [showElement,setShowElement] = useState(true)
    
    const styles = {
        fadeOutRight: { animation: 'xx 7s',
        animationName: Radium.keyframes(bounceOutRight, 'fade') 
                }
      }
      
    useEffect(()=>{
      setTimeout(function() {
        setShowElement(false)
           }, 7000);
         },
     [])
        
    return(
      <div className='user_messages opacity-25'>
         {
       
           showElement?
           <> 
           <StyleRoot>
            <div style={styles.fadeOutRight} className='card bg-danger text-white d-flex flex-row p-3 opacity-25'>
                <h6><BsExclamationCircle /> </h6>
                <h6 className='mx-3'>I'm here and i will be gone</h6>
            </div>
            
     
            <div style={styles.fadeOutRight} className='card bg-success text-white d-flex flex-row p-3 opacity-25 mt-2'>
                <h6><MdOutlineGppGood /> </h6>
                <h6 className='mx-3'>I'm here and i will be gone</h6>
            </div>
            </StyleRoot>
            
          </>:<>
          
          </>
       

         } 
      </div>
    )

}