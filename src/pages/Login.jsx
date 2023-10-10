import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Card from '../components/card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/auth");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };



  return (
    <Container>
     <Card
      bgcolor="white"
      txt-color="black"
      header= "Log In"
      body={ 
        <form >
      
          Email address<br/>
          <input type="input" className="form-control" id="email" name="email" placeholder="Enter email"  onChange={handleChange} value={email}/><br/>
         
          Password<br/>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={handleChange} value={password}/><br/>
          
          <button type="submit" className="btn btn-dark" id="submitBtn" onClick={handleSubmit}>Log In</button>
        </form>
     
      }
      />
       <br/>
    <div className="d-grid gap-2">
      <Button variant="outline-dark" size="lg" href="/CreateAccount">
        Don't have an account?  Create Account
      </Button></div>
      <ToastContainer />
      </Container>
  )
      }
  
export default Login