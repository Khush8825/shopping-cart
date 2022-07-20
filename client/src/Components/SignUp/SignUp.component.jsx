import React, { useState } from "react";
import "./SignUp.style.css";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Register = () => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userCredentials, setUserCredentials] = useState(initialFormValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignup, setSignup] = useState(false);
  //const [isError, setError] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = userCredentials;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    setSignup(false)
    event.preventDefault();
    setErrorMessage("");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid Email");
      return;
    }
    if(password.length < 6){
      setErrorMessage("Length should be greater than 6")
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password do not match");
      return;
    }
    const savedUserCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    if (savedUserCredentials && email === savedUserCredentials.email) {
      setErrorMessage("User already registered");
      return;
    }
    localStorage.setItem(
      "userCredentials",
      JSON.stringify({ firstName, lastName, email, password })
    );
    setSignup(true);
  };

  return (
    <>
      <div className="registercontainer">
        <div className="container">
          <div className="registerheading">Signup</div>
          <div className="registerdescription">
            we do not share personal details with anyone
          </div>
        </div>
        <div className="registerform">
          <form onSubmit={handleSubmit}>
            <div className="emailBox">
              <label for="firstName" className="control-label">Firstname</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="emailBox">
              <label>Lastname</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="emailBox">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="emailBox">
              Password
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="emailBox">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {errorMessage && <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{errorMessage}</Alert></Stack> }
             {isSignup ? <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">User Registered Successfully!! Signin Now</Alert></Stack> : null}
            <button type="submit" className="registerbutton">
              Signup
            </button>
          </form>
         
        </div>
      </div>
    </>
  );
};

export default Register;
