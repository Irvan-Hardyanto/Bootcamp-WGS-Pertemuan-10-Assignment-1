//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer, { decrement, increment, reset } from './counterSlice';
//counterReducer itu menerima 'aksi' tertentu.

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//4 membuat store menggunakan redux toolkit
//Tempat penyimpanan state global nya
const store = configureStore({
    reducer: {

        //buat sebuah state global bernama 'counter' yang memiliki reducer bernama counterReducer
        counter: counterReducer
    },
})

const App = () => {
    //baca nilai state yang disimpan di store menggunakan hook useSelector milik ReactRedux
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()//kirim aksi tertentu ke reducer
    return (
        <div className='ui grid container padded centered'>
            <div className='row'>
                <div className='column'>
                    <h1 class="ui header">React with Redux</h1>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                    <h3 class="ui header">Current state (count) value is:</h3>
                    <h4 class="ui header">{count}</h4>
                </div>
            </div>
            <div className='row'>
                <div className='column'>
                {/* Jika salah satu tombol ditekan, maka :
                1. aksi yang dilakukan oleh objek tersebut akan di-dispatch ke store
                2. reducer akan menerima aksi tsb dan memperbarui state
                 */}
                    <button class="ui green button" onClick={()=>dispatch(increment())}>Increment State</button>
                    <button class="ui red button" onClick={()=>dispatch(decrement())}>Decrement State</button>
                    <button class="ui blue button" onClick={()=>dispatch(reset())}>Reset State</button>
                </div>
            </div>
        </div>
    )
}
//Render komponen ke root div
root.render(
    <Provider store={store}>
        <App></App>
    </Provider>
)