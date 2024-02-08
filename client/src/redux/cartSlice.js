import { createSlice } from "@reduxjs/toolkit";

const initialState={
  //cartList=JSON.parse(localStorage.getItem('cartItem'))
  cartList:[],
  //cartCount:0
}

const cartSlice=createSlice({
  name:'cart',
  initialState,
  reducers:{
    addToCart(state, action) {
      const {product,quantity=1} = action.payload;
      const isExistIndex = state.cartList.findIndex((item) => item._id === product._id);
    
      if (isExistIndex !== -1) {
        // Create a new object to avoid modifying the frozen object
        state.cartList[isExistIndex] = {
          ...state.cartList[isExistIndex],
          count: state.cartList[isExistIndex].count + Number(quantity),
        };
      } else {
        // Create a new object to avoid modifying the frozen object
        const newProduct = { ...product, count: Number(quantity) };
        state.cartList.push(newProduct);
      }
    },
    addFromServer:(state,action)=>{
      return state.cartList=action.payload
    }
    
  }
})

export const {addToCart,addFromServer}=cartSlice.actions

export default cartSlice.reducer