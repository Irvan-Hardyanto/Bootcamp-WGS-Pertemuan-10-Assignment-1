import React from 'react';//menentukan struktur dari webnya
import ReactDOM from 'react-dom/client';//membantu react menampilkan komponen ke DOM

//2)  memanggil reference ke div dengan id root
const el =document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root =  ReactDOM.createRoot(el);

//4) Membuat komponen
//komponen ini menerima dua buah input yaitu 'name' dan 'occupation'
function App(props){
    return <h1>Hello {props.name}, your role is: {props.occupation}</h1>
}


//5) Menampilkan komponen ke layar
root.render(<div><App name="Irvan" occupation="student"/><App name="Aditya Kunto" occupation="technical mentor"/></div>);