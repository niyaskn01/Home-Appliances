
import { createSlice } from "@reduxjs/toolkit";

const initialState=JSON.parse(localStorage.getItem('userAddress')) ? JSON.parse(localStorage.getItem('userAddress')) : null

const userFullDetSlice=createSlice({
  name:"userfull",
  initialState,
  reducers:{
    setUserFullData(state,action){
      return action.payload;
      },
      resetUserFullData(state) {
        return null
        }
        }
})

export const {setUserFullData,resetUserFullData}=userFullDetSlice.actions
export default userFullDetSlice.reducer
