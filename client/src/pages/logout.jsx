import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Container from 'react-bootstrap/container';
import Button from 'react-bootstrap/Button';
import Card from '../components/card';

const Logout = () => {
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
  const Logout = () => {
    removeCookie("token");
    navigate("/login")
}
 
  return (
    <Container>
      <Card
            bgcolor="white"
            txtcolor="black"
            header-color="gray"
            body= {
                <>
                <header>{username}, are you sure you want to log out?</header>
                
                 
                 <Button variant="outline-danger" size="lg" onClick={Logout} href="../login">Logout</Button>
                 <span>     </span>
                 <Button variant="outline-dark" size="lg"  href="../auth">Make More Transactions</Button>
                 </>
                 
        }
        
        />
    <ToastContainer />
    </Container>
    
  );
};

export default Logout;