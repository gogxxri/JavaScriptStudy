import './App.css';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { createContext, useState, useEffect, lazy, Suspense } from "react";
import data from './data';
//import Detail from './pages/Detail';
//import Cart from './pages/Cart';
import ShoesCard from './ShoesCard';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

export let Context1 = createContext();

//lazy import : 늦게 랜더링 되도록, 컴포넌트 로딩 발생 / lazy, Suspense 임포트)
const Detail = lazy(()=> import('./pages/Detail'));
const Cart = lazy(()=> import('./pages/Cart'));


function App() {
  const [shoes, setShoes] = useState(data);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState([10, 11, 12]);
  const [showWatched, setShowWatched] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  let result = useQuery('username', ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json')
    .then((data)=>{
      console.log('다른 페이지 갔다가 옮기면 자동으로 데이터 가져옴 refetch')
      return data.data
    }),
    {stateTime : 8000}
  })


  const more = () => {
    if (count === 0) {
      setLoading(true);
      axios.get('https://codingapple1.github.io/shop/data2.json')
        .then(data => {
          let copy = [...shoes, ...data.data];
          setShoes(copy);
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
          let copy = [...shoes, ...data.data];
          setShoes(copy);
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

  function WatchedProduct() {
    let watched = JSON.parse(localStorage.getItem('watched')) || [];
    return (
      <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)' }}>
        {watched.map((id, index) => {
          let watcheditem = shoes.find(shoes => shoes.id == id);
          return (
            <div key={index} style={{ margin:'20px'}}>
              <img src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`} width="50px"/>
              <div>{watcheditem.title}</div>
            </div>
          )
         })}
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Gyulbum</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail')}>Detail</Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={{color:'white'}}>
              {result.isLoading && '로딩중'}
              {result.error && '에러발생'}
              {result.data && 'Hello ' + result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="watched-product">
              <button onClick={() => {
                setShowWatched(!showWatched);
              }}>최근 본 상품</button>
              {showWatched && <WatchedProduct />}
            </div>
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
          <Suspense fallback={<div>로드중</div>}>
            <Context1.Provider value={{ stock }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          </Suspense>
        } />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;