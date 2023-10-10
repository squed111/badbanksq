import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Card from '../components/card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'



export default function CreateAccout () {
  
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    balance: "",
  });
  const { username, email, password } = inputValue;

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
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
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
      username: "",
      email: "",
      password: "",
      balance: "",
    });
  };

  


  return (
    <Container>
    <Card
      bgcolor="white"
      txt-color="black"
      header= "Create Account"
      body={
        <form onSubmit={handleSubmit}>
          Name<br/>
          <input type="input" className="form-control" id="username" name="username" placeholder="Enter name"  onChange={handleChange} value={username} /><br/>
          
          Email address<br/>
          <input type="input" className="form-control" id="email" name="email" placeholder="Enter email"  onChange={handleChange} value={email}/><br/>
         
          Password<br/>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={handleChange} value={password}/><br/>
          
          <button type="submit" className="btn btn-dark" id="submitBtn" >Create Account</button>
        </form>
      }
    />
    <br/>
    <div className="d-grid gap-2">
      <Button variant="dark" size="lg" href="/login">
        Already have an account?  Log In
      </Button></div>
    <ToastContainer />
    </Container>
  )
      
    }

  
