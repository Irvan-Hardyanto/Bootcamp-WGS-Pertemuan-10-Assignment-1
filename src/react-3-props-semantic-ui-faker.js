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
          <img alt="avatar" src={props.avatar} />
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

//Data dummy untuk komentar
const dummyComments = [
  { name: "Irvan", time: "9:37 AM", comment: "Nice Info!", avatar: faker.image.avatar()},
  { name: "Dida", time: "5:00 PM", comment: "What a Story!", avatar: faker.image.avatar() },
  { name: "Budi Setiawan", time: "8:00 PM", comment: "W O W !", avatar: faker.image.avatar() }
];

/*Menampilkan Komentar berdasarkan jumlah data yang disediakan*/
const generateDummyComments=()=>{
  let comments=[];
  for(let c of dummyComments){
    comments.push(<Comment name={c.name} time={c.time} comment={c.comment} avatar={c.avatar}></Comment>);
  }
  return comments;
}

root.render(
  <div>
    {/*Menampilkan Komentar berdasarkan jumlah data yang disediakan*/}
    {generateDummyComments()}
  </div>
)