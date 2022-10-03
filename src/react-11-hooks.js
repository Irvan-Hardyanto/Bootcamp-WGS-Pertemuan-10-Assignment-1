//import module React dan React DOM
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//jam dengan menggunakan hook useEffect();
function Clock() {
  let [date,setDate]=useState(new Date());

  //setelah coba-coba, ternyata penggunaan useEffect() ini harus hati-hati
  //useEffect memiliki dua parameter yaitu:
  //1. callback, dalam bentuk function
  //2. dependency array
  //dependency array adalah array yang berisi variabel-variabel
  //yang jika value salah satu variabel tsb berubah, maka callback akan dieksekusi.

  //Penjelasan lengkap dapat dilihat di: https://devtrium.com/posts/dependency-arrays

  //jadi kode di bawah ini artinya:
  //dependency array nya kosong => hook nya hanya ke "trigger" sekali, saat komponen nya pertama nya kali di render (mirip componentDidMount()).
  //Pada saat komponen nya pertama kali di render => setInterval()
  //di akhir nge-return function => untuk clearInterval()

  //Jadi use effect itu dipakai untuk melakukan aksi tertentu pada saat sebuah state mengalami perubahan
  useEffect(()=>{
    let timerID = setInterval(() => setDate(new Date()), 1000)//hook TIDAK BOLEH mengupdate variabel yang ada di dependency array! => infinite loop -> server ngedown

    //cleanup pada saat komponen di-unmount
    return ()=>{
      clearInterval(timerID);
    }
  },[])//dependency array nya kosong => hook nya hanya ke "trigger" sekali, saat komponen nya pertama nya kali di render (mirip componentDidMount()).

  return (
    <div className="ui middle aligned one column padded centered grid" style={{ backgroundColor: "rgb(37, 150, 190)", height: '100%' }}>
      <div className="centered row">
        <div className='column'>
          <div className='ui container' style={{ width: "50%", backgroundColor: "white", textAlign: "center" }}>
            <h1 className="ui header">Aplikasi Jam Sederhana V2.0 Menggunakan <span style={{textDecoration:'line-through'}}>React Class Component</span> Hooks</h1>
            <h4>Waktu sekarang adalah: </h4>
            <div style={{ backgroundColor: "#016936", color: "white", padding: "1em" }}>
              <h2>{date.toLocaleTimeString()}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

//sebelumnya kita tidak bisa menyimpan variabel dinamis (bisa diubah value nya -> state) di dalam function
function App() {

  //hooks useState() yang diperkenalkan pada react v16.8
  //hooks useState() untuk membuat state yg berbentuk satu variabel
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My favourite color is {color}!</h1>
      <button type='button' onClick={() => setColor("blue")}>Blue</button>
      <button type='button' onClick={() => setColor("red")}>Red</button>
      <button type='button' onClick={() => setColor("pink")}>Pink</button>
      <button type='button' onClick={() => setColor("green")}>Green</button>
    </>
  )
}

//Render komponen ke root div
root.render(
  <Clock></Clock>
)