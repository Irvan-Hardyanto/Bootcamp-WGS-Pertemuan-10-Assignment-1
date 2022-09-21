//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom';
//import faker untuk men-generate avatar dummy
import { faker } from '@faker-js/faker';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);
//*Contoh komentar sederhana menggunakan library Semantic UI *
const Comment = (props) => {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className='avatar'>
          <img alt="avatar" src={faker.image.avatar()} />
        </a>
        <div className='content'>
          <a href="/" className='author'>
            {props.name}
          </a>
          <div className="metadata">
            <span className='date'>Today at {props.time}</span>
          </div>
          <div className="text">
            {props.comment}
          </div>
        </div>
      </div>
    </div>
  );
}

const comments = [
  { name: "Irvan", time: "9:37 AM", comment: "Nice Info!" },
  { name: "Dida", time: "5:00 PM", comment: "What a Story!" },
  { name: "Budi Setiawan", time: "8:00 PM", comment: "W O W !" }
];

root.render(
  <div>
    {/*Tampilkan tiga buah komentar dari atas sampai ke bawah*/}
    for(let comment of comments){
      <Comment name={comment.name} time={comment.time} comment={comment.comment}></Comment>
    }
  </div>
)