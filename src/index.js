//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
//createStore memang sudah 'kudet',
//tapi gpp karena ini cuman demo aja
import { createStore, applyMiddleware } from 'redux';

//untuk men dispatch function / aksi yang bersifat asinkronus
import thunk from "redux-thunk";

import reducers from "./react-14-thunk/reducers/reducers";
import App from "./react-14-thunk/components/App";
import { fetchPostsAndUsers, fetchUser,fetchPosts } from './react-14-thunk/actions';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

const store = createStore(reducers,applyMiddleware(thunk));
store.dispatch(fetchPostsAndUsers());
//Render komponen ke root div
root.render(
    <Provider store={store}>
        <App></App>
    </Provider>
)