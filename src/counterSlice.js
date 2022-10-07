import { createSlice } from "@reduxjs/toolkit";

//nilai awal state
const initialState={
    value: 0,
}

//buat reducer untuk state tertentu
export const counterSlice = createSlice({
    name:'count',//nama reducernya
    initialState,//nilai awal state yang di-'manage' oleh reducer ini
    reducers: {//bagaimana nilai dari sebuah state bisa diubah
        increment: (state)=>{//aksi yang bisa dilakukan oleh reducer
            state.value +=1
        },
        decrement: (state)=>{
            state.value -=1
        },
        reset: (state)=>{
            state.value=0
        }
    }
})

//export reducer nya
export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;