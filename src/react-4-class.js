//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom';
//import faker untuk men-generate avatar dummy
import { faker } from '@faker-js/faker';
import Comment from './Comment';
//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//contoh komentar-komentar yang ingin ditampilkan
const dummyComments = [
  { name: "Irvan", time: "9:37 AM", comment: "Nice Info!", avatar: faker.image.avatar()},
  { name: "Dida", time: "5:00 PM", comment: "What a Story!", avatar: faker.image.avatar() },
  { name: "Budi Setiawan", time: "8:00 PM", comment: "W O W !", avatar: faker.image.avatar() }
];

/*Function untuk membuat Komentar-komentar berdasarkan jumlah data yang disediakan*/
const generateDummyComments=()=>{
  let comments=[];
  for(let c of dummyComments){
    comments.push(<Comment name={c.name} time={c.time} comment={c.comment} avatar={c.avatar}></Comment>);
  }
  return comments;
}

/*Menampilkan Komentar-komentar yang sudah dibuat*/
root.render(
  <div>
    {generateDummyComments()}
  </div>
)