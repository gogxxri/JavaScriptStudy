import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

import {Context1} from './../App';

function Detail(props) {
    let { id } = useParams();
    let findItem = props.shoes.find((a) => a.id == id);
    let [alert2, setAlert2] = useState(true);
    let [count, setCount] = useState(2);
    let [tap, setTap] = useState(0);
    let [fade, setFade] = useState('')
    let [fade2, setFade2] = useState('');


    let {stock} = useContext(Context1);

    useEffect(()=>{
        setFade2('end')
        return ()=>{
          setFade2('')
        }
    },[])

      useEffect(()=>{
        let a = setTimeout(()=>{ setFade('end') }, 100)
        return ()=>{
            clearTimeout(a);
            setFade('')
        }
    }, [tap])

    useEffect(() => {
        let a = setTimeout(() => { setAlert2(false) }, 2000);
        return () => clearTimeout(a);
    }, []);

    useEffect(() => {
        if (count > 0) {
            let b = setTimeout(() => { setCount(count - 1) }, 1000);
            return () => clearTimeout(b);
        }
    }, [count]);

    return (
        <div className={'container start ' + fade2}>
            {alert2 && <div className="alert alert-warning">{count}초 이내 구매시 할인</div>}

            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (parseInt(findItem.id) + 1) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{findItem.title}</h4>
                    <p>{findItem.content}</p>
                    <p>{findItem.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
                <Nav variant="tabs" defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link eventKey="link0" onClick={() => { setTap(0) }}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" onClick={() => { setTap(1) }}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" onClick={() => { setTap(2) }}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tap={tap} />
            </div>
        </div>
    );

    function TabContent({tap}){
      
        return (
          <div className={'start ' + fade}>
            { [<div>{stock[0]}</div>, <div>{stock[1]}</div>, <div>{stock[2]}</div>][tap] }
          </div>
        )
      }
}

export default Detail;