import { configureStore } from '@reduxjs/toolkit';
import adsReducer from '../components/features/Ads/adsSlice';

export const store = configureStore({
  reducer: {
    ads: adsReducer
  },
})