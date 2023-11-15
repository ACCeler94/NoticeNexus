import { configureStore } from '@reduxjs/toolkit';
import adsReducer from '../components/features/Ads/adsSlice';
import usersReducer from '../components/features/Users/usersSlice';


export const store = configureStore({
  reducer: {
    ads: adsReducer,
    users: usersReducer
  },
})