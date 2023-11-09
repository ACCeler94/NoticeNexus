import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adsAPI from '../../../../API/adsAPI';

// initial state
const initialState = {
  ads: [],
  status: 'idle',
  error: null
};

// thunks
const fetchAllAds = createAsyncThunk(
  'ads/fetchAllAds',
  async () => {
    const response = await adsAPI.fetchAll();
    return response.data;
  }
);

const fetchById = createAsyncThunk(
  'ads/fetchById',
  async (id) => {
    const response = await adsAPI.fetchById(id);
    return response.data;
  }
);

const fetchBySearchParams = createAsyncThunk(
  'ads/fetchBySearchParams',
  async (searchPhrase) => {
    const response = await adsAPI.fetchBySearch(searchPhrase);
    return response.data;
  }
);

const addNewAd = createAsyncThunk(
  'ads/addNewAd',
  async (adData) => {
    const response = await adsAPI.addNewAd(adData);
    return response.data;
  }
);

const updateAd = createAsyncThunk(
  'ads/updateAd',
  async ({ id, newAdData }) => {
    const response = await adsAPI.updateAd(id, newAdData);
    return response.data;
  }
);

const deleteById = createAsyncThunk(
  'ads/deleteById',
  async (id) => {
    await adsAPI.deleteById(id);
    return id;
  }
);


// reducer
export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // fetchAllAds
    builder.addCase(fetchAllAds.pending, (state) => {
      state.status = 'pending';
      state.error = null; // Reset error status in case of previous failure
    });
    builder.addCase(fetchAllAds.fulfilled, (state, action) => {
      state.status = 'success';
      state.ads.push(...action.payload);
    });
    builder.addCase(fetchAllAds.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // fetchById
    builder.addCase(fetchById.pending, (state) => {
      state.status = 'pending';
      state.error = null; // Reset error status in case of previous failure
    });
    builder.addCase(fetchById.fulfilled, (state) => {
      state.status = 'success'; // Data is not handled as single ads are not added to the state
    });
    builder.addCase(fetchById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })

    // fetchBySearchParams
    builder.addCase(fetchBySearchParams.pending, (state) => {
      state.status = 'pending';
      state.error = null; // Reset error status in case of previous failure
    });
    builder.addCase(fetchBySearchParams.fulfilled, (state) => {
      state.status = 'success'; // Data is not handled as single ads are not added to the state
    });
    builder.addCase(fetchBySearchParams.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // addNewAd
    builder.addCase(addNewAd.pending, (state) => {
      state.status = 'pending';
      state.error = null; // Reset error status in case of previous failure
    });
    builder.addCase(addNewAd.fulfilled, (state, action) => {
      state.status = 'success';
      state.ads.push(action.payload.newAd)
    });
    builder.addCase(addNewAd.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // updateAd
    builder.addCase(updateAd.pending, (state) => {
      state.status = 'pending';
      state.error = null; // reset error status in case of previous failure
    });
    builder.addCase(updateAd.fulfilled, (state, action) => {
      state.status = 'success';
      // Find the index of the ad in the state
      const index = state.ads.findIndex(ad => ad.id === action.payload.adToUpdate.id);
      if (index !== -1) {
        // Replace the ad at the found index with the updated ad
        state.ads[index] = action.payload.adToUpdate;
      }
    });
    builder.addCase(updateAd.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    //deleteById
    builder.addCase(deleteById.pending, (state) => {
      state.status = 'pending';
      state.error = null; // Reset error status in case of previous failure
    });
    builder.addCase(deleteById.fulfilled, (state, action) => {
      state.status = 'success';
      // Find the index of the ad in the state
      const index = state.ads.findIndex(ad => ad.id === action.payload);
      if (index !== -1) {
        // Replace the ad at the found index with the updated ad
        state.ads.splice(index, 1);
      }
    });
    builder.addCase(deleteById.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
})


export default adsSlice.reducer