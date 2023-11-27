import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adsAPI from '../../../API/adsAPI';

// initial state
const initialState = {
  ads: [],
  status: 'idle',
  error: null,
  currentAd: {},
  adFormStatus: 'idle',
  filteredAds: [],
  searchPhrase: ''
};

// thunks
export const fetchAllAds = createAsyncThunk(
  'ads/fetchAllAds',
  async () => {
    const response = await adsAPI.fetchAll();
    return response.data;
  }
);

export const fetchById = createAsyncThunk(
  'ads/fetchById',
  async (id) => {
    const response = await adsAPI.fetchById(id);
    return response.data;
  }
);

export const fetchBySearchParams = createAsyncThunk(
  'ads/fetchBySearchParams',
  async (searchPhrase) => {
    const response = await adsAPI.fetchBySearch(searchPhrase);
    return response.data;
  }
);

export const addNewAd = createAsyncThunk(
  'ads/addNewAd',
  async (newAdData) => {
    const response = await adsAPI.addNewAd(newAdData);
    return response.data;
  }
);

export const updateAd = createAsyncThunk(
  'ads/updateAd',
  async ({ id, newAdData }) => {
    console.log('id from thunk is: ', id)
    const response = await adsAPI.updateAd(id, newAdData);
    return response.data;
  }
);

export const deleteById = createAsyncThunk(
  'ads/deleteById',
  async (id) => {
    const response = await adsAPI.deleteById(id);
    if (response.status === 401) {
      throw new Error('User not authorized');
    }
    return id;
  }
);




// reducer
export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    resetNewAdStatus: (state) => {
      state.adFormStatus = 'idle';
    },
    setSearchPhrase: (state, action) => {
      state.searchPhrase = action.payload;
    },
    resetCurrentAd: (state) => {
      state.currentAd = {};
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {

    // fetchAllAds
    builder.addCase(fetchAllAds.pending, (state) => {
      state.status = 'pending';
      state.error = null; // Reset error status in case of previous failure

    });
    builder.addCase(fetchAllAds.fulfilled, (state, action) => {
      state.status = 'success';
      state.ads = action.payload;
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
    builder.addCase(fetchById.fulfilled, (state, action) => {
      state.status = 'success';
      state.currentAd = action.payload;
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
    builder.addCase(fetchBySearchParams.fulfilled, (state, action) => {
      state.status = 'success';
      state.filteredAds = action.payload;
    });
    builder.addCase(fetchBySearchParams.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // addNewAd
    builder.addCase(addNewAd.pending, (state) => {
      state.adFormStatus = 'pending';
      state.error = null; // Reset error status in case of previous failure
    });
    builder.addCase(addNewAd.fulfilled, (state, action) => {
      state.adFormStatus = 'success';
      state.ads.push(action.payload.newAd)
    });
    builder.addCase(addNewAd.rejected, (state, action) => {
      state.adFormStatus = 'failed';
      state.error = action.error;
    });

    // updateAd
    builder.addCase(updateAd.pending, (state) => {
      state.adFormStatus = 'pending';
      state.error = null; // reset error status in case of previous failure
    });
    builder.addCase(updateAd.fulfilled, (state, action) => {
      state.adFormStatus = 'success';
      // Find the index of the ad in the state
      const index = state.ads.findIndex(ad => ad.id === action.payload.adToUpdate.id);
      if (index !== -1) {
        // Replace the ad at the found index with the updated ad
        state.ads[index] = action.payload.adToUpdate;
      }
    });
    builder.addCase(updateAd.rejected, (state, action) => {
      state.adFormStatus = 'failed';
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

export const { resetNewAdStatus, setSearchPhrase, resetCurrentAd, setError, resetError } = adsSlice.actions;
export default adsSlice.reducer