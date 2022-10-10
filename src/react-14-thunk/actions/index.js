import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// double arrow function a.k.a currying
// yaitu sebuah fungsi yang mengembalikan fungsi lainnya.
// https://digitalfortress.tech/js/whats-a-double-arrow-function-in-javascript/
export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get("posts");
    dispatch({ type: "FETCH_POSTS", payload: response.data });
}

export const fetchUser = (id) => async (dispatch) => {
    const response = await jsonPlaceholder.get(`users/${id}`);
    dispatch({ type: "FETCH_USER", payload: response.data })
}
//ini 'thunk function' nya
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());//request posts ke API, tunggu sampai response nya diterima.

    _.chain(getState().posts)//ambil postnya
        .map("userId")//ambil UserId nya
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
}

