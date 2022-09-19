//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom';
import nav from './nav';//import navbar

//fungsi untuk merender elemen tertentu
function renderDOM(content,id){
  ReactDOM.render(content, document.getElementById(id));
}
//contoh elemen tertentu
const element = <div>
  {/*Panggil nav nya*/}
  {nav}
  <h1>Bootcamp WGS Batch 3</h1>
        <h3>My Name is Irvan Hardyanto</h3>
</div>

renderDOM(element,"root");