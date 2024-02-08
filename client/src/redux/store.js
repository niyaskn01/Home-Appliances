import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import userInformationReducer from './userFullDet'
import searchReducer from './searchResult'
import cartReducer from './cartSlice'
import getCartSlice from "./getCartSlice";

const store=configureStore({
  reducer:{
    user:userReducer,
    userInformation:userInformationReducer,
    search:searchReducer,
    cart:cartReducer,
    getCart:getCartSlice
  }
})


export default store;
