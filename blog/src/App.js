import './App.css';
import {useState} from 'react';

function App() {

  let [posts, setPosts] = useState([
    {
      title : '남자 코트 추천',
      likes : 0,
      date : '2024-06-15'
    },
    {
      title : '여자 원피스 추천',
      likes : 0,
      date : '2024-06-17'
    },
    {
      title : '데이트 코스 추천',
      likes : 0,
      date : '2024-06-30'
    },
  ])
  let [modal, setModal] = useState(false);
  let [modalTitle, setModalTitle]= useState('');
  let [inputValue, setInputValue] = useState('');

  const handleLike = (idx) => {
    let updatedPosts = [...posts];
    updatedPosts[idx].likes++;
    setPosts(updatedPosts);
  };

  const handleDelete = (idx) => {
    let updatePosts = [...posts];
    updatePosts.splice(idx,1);
    setPosts(updatePosts);
  }

  const handlePublish = () => {
    if(inputValue !== ''){
      let updatePosts = [{
        title : inputValue,
        likes : 0,
        date : new Date().toISOString().slice(0, 10)
      }, ...posts];
      setPosts(updatePosts);
      setInputValue('');
    } else {
      alert("글 제목을 입력하세요");
    }
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>Blog</h4>
      </div>

      <button onClick={()=>{
        let copy = [...posts];
        copy.sort((a, b) => a.title.localeCompare(b.title));
        setPosts(copy);
      }}>가나다순 정렬</button>

      {posts.map((post, i) => (
        <div className="list" key={i}>
          <h4 onClick={() => {
            setModal(true);
            setModalTitle(post.title);
          }}>
            {post.title}
            <span onClick={() => {
              handleLike(i)
            }}> 👍 {post.likes}</span>
          </h4>
          <p>{post.date}</p>
          <button onClick={()=>{
            handleDelete(i)
          }}>삭제</button>
        </div>
      ))} 
      <input value={inputValue} // inputValue 상태를 input 요소의 value로 설정
        onChange={(e)=>{
        setInputValue(e.target.value)
      }}/>
      <button onClick={handlePublish}>글 발행</button>     

      {modal && <Modal title={modalTitle} 
      date={posts.find(p => p.title === modalTitle)?.date}  />}
    </div>
  );
  
}

function Modal(props){
  return (
    <div className="modal">
      <h4>{props.title}</h4>
      <p>{props.date}</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
