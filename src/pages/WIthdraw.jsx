import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Card from '../components/card';
import Container from 'react-bootstrap/Container';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";



function Withdraw(){
    
    const [show, setShow] = useState(true);
    const [balance, setBalance] = useState(1000);
    const [validTransaction, setValidTransaction] = useState(false);
    const [withdraw, setWithdrawl] = useState(0);
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
          alert("Bro, withdrawls cannot be below zero")
        }
        if (!Number(e.target.value)) {
          setValidTransaction(false);
          alert("Sorry, we only have money")
        } 
        if (Number(e.target.value) > balance) {
          setValidTransaction(false)
          alert('Oh no, Bro!  Not enough cash flow!')
        }   else {
          setValidTransaction(true);
        }
        setWithdrawl(Number(e.target.value));
      };
  
    const handleSubmit = (e) => {
      
      let newTotal = balance - withdraw;
      setBalance(newTotal);
      setValidTransaction(false);
      e.preventDefault();
      setShow(false);
      
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
        header="withdraw"
        header-color="gray"
        body={show ? (  
                <>
                {status}
                <br/>
                <input type="input" className="form-control" id="withdraw" placeholder="" onChange={handleChange} /><br/>
                <button type="submit" className="btn btn-dark" disabled={!validTransaction} onClick={handleSubmit}>Submit withdraw</button>
                </>
              ):(
                <>
                <h5>Count them chips!</h5>
                <h5>New balance is ${balance}</h5>
                <button type="submit" className="btn btn-dark" onClick={clearForm}>Make Another Withdraw</button>
                </>
              )}
      />
      <ToastContainer />
      </Container>
    )
  }

  export default Withdraw