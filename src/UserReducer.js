import {  createSlice } from "@reduxjs/toolkit";
import { userList } from "./Data";

 const userSlice = createSlice({
  name:"users",
  initialState:userList,
  reducers:{
  addUser : (state,action)=>{
    console.log("action",action)
    state.push(action.payload)
  },
  deleteUser:(state,action)=>{
  const {id}= action.payload
  const uu = state.find(f => f.id == id)
  if(uu){
    return state.filter(e => e.id !== id)
  }
  }
  }

})
export const {addUser,deleteUser} = userSlice.actions
export default userSlice.reducer

