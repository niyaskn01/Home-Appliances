import { createSlice } from "@reduxjs/toolkit";

const initialState={
  result:[],
  loading: false,
}

const searchSlice=createSlice({
  name:'search',
  initialState,
  reducers:{
    // setKeyword:(state,action)=>{
    //   state.keyword = action.payload;
    //   },
    getResult: (state, action) => {
      return { ...state, result: action.payload };
    },
    setLoading:(state)=>{
      return {...state,loading:true}
    }
  }
})

export const {getResult,setLoading}=searchSlice.actions

export default searchSlice.reducer