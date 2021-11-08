import { createSlice } from '@reduxjs/toolkit';


  
  const loginSlice = createSlice({
      name: 'login',
      initialState : {
        loginUser: [],
        
      },
      reducers:{
        addUser: (state, { payload }) => {
            state.loginUser.push(payload)
          },
          
      }
    });
    
    export const { addUser} = loginSlice.actions
  
  export default loginSlice.reducer;