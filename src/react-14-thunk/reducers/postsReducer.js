//reducer itu menerima masukan (stateLama,aksi) dan menghasilkan keluaran berupa stateBaru
export default (state = [], action) => {
    switch (action.type) {
        case "FETCH_POSTS":
            return action.payload;
        default:
            return state;
    }
};