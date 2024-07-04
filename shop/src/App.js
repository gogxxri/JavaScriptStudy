import './App.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {useState} from "react";
import data from './data';
import Detail from './pages/Detail';
import ShoesCard from './ShoesCard';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Gyulbum</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
      <Route path="/" element={
        <>
        <div className="main-bg"></div>
        <div className="container">
          <div className="row">
            {shoes.map((shoes, i) => (
                <ShoesCard key={i} shoes={shoes} picIdx={i+1}/>
            ))}
          </div>
        </div>
        </>
      }/>
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
        <Route path="/*" element={<div>404</div>}/>
      </Routes>
    </div>
  );
}


export default App;
