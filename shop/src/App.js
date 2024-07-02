import './App.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {useState} from "react";
import data from './data';
import ShoesCard from './ShoesCard';

function App() {

  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Gyulbum</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
            <Nav.Link href="#pricing">My Page</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>

      <div className="container">
        <div className="row">
          {shoes.map((shoes, i) => (
              <ShoesCard key={i} shoes={shoes} picIdx={i+1}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
