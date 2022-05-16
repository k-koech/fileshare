import React, {Component, useState} from 'react';
;


function Login() {


  const [inputs, setInputs] = useState({});
  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  // Login
  const login = (event) => 
  {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs)
    };
    console.log(inputs)

    fetch("http://127.0.0.1:8000/auth/", requestOptions)
    .then( data => data.json()
    )  
    .then(
        // data => {
        //   this.props.userLogin(data.token);
        // },
        console.log(data.token)    
    )
    .catch(error=> console.error(`Error:${error}`));
  }

  // Registration function
  const register = (event) => 
  {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs)
    };
    fetch("http://127.0.0.1:8000/api/users/", requestOptions)
    .then( data => data.json())  
    .then(
        data => {
          console.log(data)
        },
        )
    .catch(error=> console.error(`Error:${error}`));
   
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 className='text-center mt-5'>LOGIN</h2>
      </header>
        <div className="container bg-light px-auto">

    <form >
      <div className="form-group">
        <label>Username
        <input type="text" name='username' value={inputs.username||""} 
        onChange={handleChange} className="form-control"  />
        </label>
       
      </div>

      <div className="form-group">
        <label>Password
        <input type="text" name='password' value={inputs.password||""} 
        onChange={handleChange} className="form-control"   />
        </label>
      </div>
        <button type="submit" onClick={login} className="btn btn-primary mr-4">Submit</button>
        <button type="submit" onClick={register} className="btn btn-primary">Register</button>
      
    </form>
   
    </div>
    </div>
    
  )


}

export default Login;
