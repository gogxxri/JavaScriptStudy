import './App.css';
import {useState} from 'react';

function App() {

  let [title, setTitle] = useState(['남자 코트 추천', '여자 원피스 추천', '데이트 코스 추천']);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState([false, false, false]);

  const editTitle = () => {
    let copy = [...title];
    copy[0] = '여자 코트 추천';
    setTitle(copy);
  }

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
        editTitle();      
      }}> 글 수정 </button>

        {title.map(function(title, i){
          return (<div className="list" key={i}>
            <h4 onClick={() => {
              let changeModal = [...modal];
              changeModal[i] = !changeModal[i];
              setModal(changeModal);
            }}>{title}
              <span onClick={(event)=>{
                event.stopPropagation(); // 클릭 이벤트 전파 중지
                let copy = [...like];
                copy[i] = copy[i]+1; 
                setLike(copy)}}> 👍 </span> {like[i]} 
            </h4>
            <p>2월 16일 발행</p>
            {modal[i] && <Modal title={title} editTitle={editTitle} />}
          </div>)
        })}
    </div>
  );
}

function Modal(props){
  return (
    <div className="modal">
      <h4>{props.title}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.editTitle}>글 수정</button>
    </div>
  );
}

export default App;
