import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Card from '../components/card';
import Container from 'react-bootstrap/Container';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";



function Deposit(){
    const [show, setShow] = useState(true);
    const [balance, setBalance] = useState(0);
    const [validTransaction, setValidTransaction] = useState(false);
    const [deposit, setDeposit] = useState(0);
    //const [email] =useState()
    const [ cookies, removeCookie ] = useCookies([]);
    const navigate = useNavigate()    
  
  
    let status = `Account Balance: ${balance}`;
    
    useEffect(() => {
      const verifyCookie = async () => {
        if (!cookies.token) {
          navigate('/login')
        }
              const { data } = await axios.post(
                'http://localhost:4000/',
                
                { params: {balance}},
                { withCredentials: true }
              );
              const { status, user } = data;
              return status
                ? toast(`${user} : $${balance}`, {
                    position: "top-right",
                  })
                : (removeCookie("token"), navigate('/login'));
            }
            verifyCookie();
          }, [cookies, balance, navigate, removeCookie]);
    
    const handleChange = (e) => {
      console.log(`handle change ${e.target.value}`);
      if (Number(e.target.value) < 0) {
        setValidTransaction(false);
        alert("Bro, deposits cannot be below zero")
      }
      if (!Number(e.target.value)) {
        setValidTransaction(false);
        alert("Sorry, we only take money")
      } else {
        setValidTransaction(true);
      }
      setDeposit(Number(e.target.value));
    };
  
    const handleSubmit = (e) => {
      parseInt(balance)
      let newTotal = balance + deposit;
      setBalance(newTotal);
      setValidTransaction(false);
      e.preventDefault();
      setShow(false);
      const url = `/user/:email/${balance}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })();
     
    }
    
  
    function clearForm (){
      setBalance(balance);
      setShow(true);
  
    }
  
  
    return (
      <Container>
        <Card
        bgcolor="white"
        txtcolor="black"
        header="Deposit"
        header-color="gray"
        body={show ? (  
                <>
                {status}
                <br/>
                <input type="input" className="form-control" id="deposit" placeholder="" onChange={handleChange} /><br/>
                <button type="submit" className="btn btn-dark" disabled={!validTransaction} onClick={handleSubmit}>Submit Deposit</button>
                </>
              ):(
                <>
                <h5>Stacking them chips!</h5>
                <h5>New balance is ${balance}</h5>
                <button type="submit" className="btn btn-dark" onClick={clearForm}>Add More Funds</button>
                </>
              )}
      />
      <ToastContainer />
      </Container>
    )
  }

  export default Deposit