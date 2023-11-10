import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersAPI from '../../../../API/usersAPI';

// initial state
const initialState = {
  user: null,
  status: 'idle',
  error: null
}

