import { createSlice } from '@reduxjs/toolkit';


// initial state
const initialState = {
  user: null,
}


// reducer
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
    }
  }
});

export const { logIn } = usersSlice.actions;
export default usersSlice.reducer;
