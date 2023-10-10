import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Container from 'react-bootstrap/container';
import Button from 'react-bootstrap/Button';
import Card from '../components/card';

const Auth = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Welcome back, ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  
  }, [cookies, navigate, removeCookie]);
 

 
  return (
    <Container>
      <Card
            bgcolor="white"
            txtcolor="black"
            header="Welcome"
            header-color="gray"
            body= {
                <>
                <header>Welcome back, {username}</header>
                <p>We are so happy that you have chosen to bank with us! <br/>
                Click buttons to make transactions</p>
                 <br/>
                 <Button type="submit" className="btn btn-dark" href="../deposit">Go to Deposit Page</Button>
                 <span>         <span>       
                 <Button type="submit" className="btn btn-dark" href="../withdraw">Go to Withdraw Page</Button>
                 </span></span><br/><br/>
                 {/*<Button variant="outline-dark" size="lg" onClick={Logout} href="../login">Logout</Button>*/}
                 </>
                 
                 
        }
        
        />
    <ToastContainer />
    </Container>
    
  );
};

export default Auth;