import { useContext } from "react";
import { Link } from "react-router-dom";
import UserInfo from "../../components/UserInfo";
import {AuthContext} from "../../context/AuthContext";
import "./homePage.css"
import landing from './landing.png'; 

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="home">
      <div className="row">
        <div className="left-col col-md-6">
          <div className="centered">
              <img src={landing} alt="landing image" />
          </div>
        </div>
        <div className="right-col col-md-6">
         <div className="centered text-center p-5">
              <h1>FilesShare</h1>
              <h4>Share Files with employees with ease</h4>
              <button className="btn btn-success "><Link className="text-white" to="/login">Get Started</Link></button>
          </div>
        </div>
      </div>
     
    </section>
  
  );
};

export default Home;