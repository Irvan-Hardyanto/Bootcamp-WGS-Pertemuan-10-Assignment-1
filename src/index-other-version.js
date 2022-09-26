//1) import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom';

//2)  memanggil reference ke div dengan id root
const el =document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root =  ReactDOM.createRoot(el);

//4) Membuat komponen
function App(){
    return <h1>Hello There!</h1>
}

//5) Menampilkan komponen ke layar
root.render(<App/>);