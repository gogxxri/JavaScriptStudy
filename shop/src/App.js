import './App.css';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { createContext, useState } from "react";
import data from './data';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import ShoesCard from './ShoesCard';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

export let Context1 = createContext();

function App() {
  const [shoes, setShoes] = useState(data);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState([10, 11, 12]);

  const more = () => {
    if (count === 0) {
      setLoading(true);
      axios.get('https://codingapple1.github.io/shop/data2.json')
        .then(data => {
          let copy = [...shoes, ...data.data]
          setShoes(copy)
          setCount(1);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error('요청 실패:', error);
        });
    } else if (count === 1) {
      setLoading(true);
      axios.get('https://codingapple1.github.io/shop/data3.json')
        .then(data => {
          let copy = [...shoes, ...data.data]
          setShoes(copy)
          setCount(2);
          setLoading(false);
        })
        .catch(error => {
          console.error('요청 실패:', error);
          setLoading(false);
        });
    } else {
      alert("더 이상 상품이 없습니다.");
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Gyulbum</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail')}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {shoes.map((shoe, i) => (
                  <ShoesCard key={i} shoes={shoe} picIdx={i + 1} />
                ))}
              </div>
            </div>
            {loading && <Spinner animation="border" role="status">
                <span className="visually-hidden">로딩 중...</span>
              </Spinner>}
            {count < 2 && <button onClick={more}>더보기</button>}
          </>
        } />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{stock}}>
            <Detail shoes={shoes} />
            </Context1.Provider> 
          }/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;