import Card from '../components/card';
import logo from '../img/bank1.png';
import Container from 'react-bootstrap/Container'

export default function Home(){
  return (
    <Container>
    <Card
      txtcolor="black"
      header="Bad meaning bad. Not bad meaning good."
      title="THIS IS BADBANK!"
      text="Use the navigation bar to get around."
      body={(<img src={logo} className="img-fluid" alt="Responsive bank"/>)}
    />    
    </Container>
  );  
}