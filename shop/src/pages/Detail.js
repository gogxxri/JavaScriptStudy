import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {

    let {id} = useParams();
    let findItem = props.shoes.find((a)=> a.id==id);
    let [alert2, setAlert2] = useState(true);
    let [count, setCount] = useState(2);
    let [inputText, setInputText] = useState('');

    useEffect(()=>{
        let a = setTimeout(()=>{setAlert2(false)}, 2000);
        let b = setTimeout(()=>{setCount(count-1)}, 1000);
    });

    useEffect(() => {
        if (isNaN(inputText)) {
            alert('숫자를 입력하세요.');
        }
    }, [inputText]);

    return(
        <div className="container">
            {
                alert2==true?<div className="alert alert-warning">{count}초 이내 구매시 할인</div> : null
            }

            <div className="row">
                <div className="col-md-6">
                <img src={'https://codingapple1.github.io/shop/shoes' + (parseInt(findItem.id)+1) + '.jpg'} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{findItem.title}</h4>
                    <p>{findItem.content}</p>
                    <p>{findItem.price}</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
            <div>
                <input onChange={(e)=>{setInputText(e.target.value)}}></input>
            </div>
        </div> 
    );
}
export default Detail;