//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
//import faker untuk men-generate avatar dummy
import { faker } from '@faker-js/faker';

//Komponen ini menyatakan sebuah komentar
class Comment extends React.Component {

    //konstruktor untuk insialisasi state
    constructor(props) {
        super(props);
        this.state = {//state 'likes' yang menyatakan jumlah like pada sebuah komentar
            likes: 0
        }
        this.like=this.like.bind(this);
    }

    //fungsi untuk menambahkan jumlah like pada sebuah komentar setiap kali tombol like ditekan
    like(){
        this.setState((state,props)=>({
            likes: state.likes + 1
        }))
    }
    render() {
        return (
            <div className="ui container comments">
                <div className="comment">
                    <a href="/" className='avatar'>
                        <img alt="avatar" src={this.props.avatar} />
                    </a>
                    <div className='content'>
                        <a href="/" className='author'>
                            {this.props.name}
                        </a>
                        <div className="metadata">
                            <span className='date'>Today at {this.props.time} | Liked by: {this.state.likes}</span>
                        </div>
                        <div className="text">
                            {this.props.comment}
                        </div>
                        <div className="actions">
                            <div className="mini ui button" onClick={this.like}>
                                <i className="heart icon"></i> Like
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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