import './App.css';
import {useState} from 'react';

function App() {

  let [title, setTitle] = useState(['남자 코트 추천', '여자 원피스 추천', '데이트 코스 추천']);
  let [like, setLike] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>BLOG</h4>
      </div>

      <button onClick={()=> {
        let ganada = [...title];
        ganada.sort();
        setTitle(ganada)
      }}> 가나다 순 정렬 </button>

      <button onClick={() => {
        let copy = [...title];    //사본 arr 생성
        copy[0] = '여자 코트 추천' // 데이터 수정
        setTitle(copy);          // 스테이트 변경
      }}> 글 수정 </button>



      <div className="list">
        <h4>{title[0]} <span onClick={()=>{setLike(like + 1)}}> 👍 </span> {like} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>2월 16일 발행</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>2월 15일 발행</p>
      </div>
      <div className="modal">
          <h4>{title[0]}</h4>
          <p>날짜</p>
          <p>상세내용</p>
        </div>
    </div>
  );
}

/*
function Modal(){
    return (
      <>
        <div className="modal">
          <h4>{title[0]}</h4>
          <p>날짜</p>
          <p>상세내용</p>
        </div>
      </>
    );
}
*/

export default App;
