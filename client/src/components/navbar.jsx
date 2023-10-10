
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../img/bank1.png'

export default function NavBar(){


  return(
    <>
    <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            BadBank
          </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/CreateAccount" >Create Account</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/deposit">Deposit</Nav.Link>
                <Nav.Link href="/withdraw">Withdraw</Nav.Link>
                <Nav.Link href="/logout">Log Out</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </>
  );
}