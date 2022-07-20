import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignIn } from "../../Store/Actions/UserAction";
//import { handleSnackbar } from "../../Templates/Alert";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "./SignIn.style.css";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin,setLogin] = useState(false);
  const [isError,setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    setErrorMessage(null);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid Email");
      setError(true);
      return;
    }
    const savedUserCredentials = JSON.parse(
      localStorage.getItem("userCredentials")
    );
    if (
      savedUserCredentials &&
      (savedUserCredentials.email !== email ||
        savedUserCredentials.password !== password)
    ) {
      setErrorMessage("Invalid Credentials or User may not registered, Please SignUp!!");
      setError(true);
      return;
    }
    setLogin(true);
    dispatch(userSignIn());
    navigate("/");
    
  };
  return (
    <>
      <div className="logincontainer">
        <div className="container">
          <div className="loginheading">Login</div>
          <div className="logindescription">
            Get access to your orders, Wishlist and Recommendations
          </div>
        </div>
        <div className="loginform">
          <form onSubmit={handleSubmit}>
            <div className="emailBox">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={userCredentials.email}
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
                value={userCredentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="loginbutton">
              Login
            </button>
            {isLogin ?  <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success">Logged In Successfully!!!</Alert></Stack> : null  }
              {isError ? <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">{errorMessage}</Alert></Stack> : null}
          </form> 
        </div>
      </div>
    </>
  );
};

export default Login;
