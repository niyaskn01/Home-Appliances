import axios from "axios";
import axiosInstance from '../axios/axiosInstance'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { baseURL } from "../components/axios/axiosInstance";
const user=JSON.parse(localStorage.getItem('userData'))
//get
const getCartItems=createAsyncThunk('fetching/data',async()=>{
  try {
     console.log(baseURL)
    const {data} = await axios.get(`${baseURL}/user/cart/${user._id}`);
    if(data.responce.cart.length !== 0){
      return data.responce.cart ;
    }else{
      return []
    }
  } catch (error) {
    return error
  }
})

const initialState={
  status:'idle',
  cartItems:[],
  error:null
}

const getCartSlice=createSlice({
  name:'getcart',
  initialState,
  extraReducers:builder=>{
    builder.addCase(getCartItems.pending,state=>{
      state.status='loading'
    })
    builder.addCase(getCartItems.fulfilled,(state,action)=>{
      state.status='succeeded'
      state.cartItems=Array.isArray(action.payload) ? action.payload : []
    })
    builder.addCase(getCartItems.rejected,state=>{
      state.status='error'
      state.error='error in getting cart'
    })
  }
})

export {getCartItems}
export default getCartSlice.reducer;
