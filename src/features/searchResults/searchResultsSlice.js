import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { search } from '../../reddit_API/reddit_data';

const initialState = {
  searchTerm: '',
  searchPosts: [],
  searchPostStatus: '',
  searchPostsError: null,
  nextData: '',
  prevData: '',
  countInSearch: 0,
  id: 1
};

export const fetchSearchData = createAsyncThunk(
  'search/fetchSearchData',
  async ({searchTerm, after, before, count}, { rejectWithValue, getState }) => {
    const id = getState().search.id
    try {
      const cacheKey = `cache_searchPosts_${searchTerm}_${id}`;
      const cacheTimestampKey = `cache_searchPosts_${searchTerm}_${id}_timestamp`;
      const cachedData = sessionStorage.getItem(cacheKey);
      const cachedTimestamp = sessionStorage.getItem(cacheTimestampKey);

      if (cachedTimestamp) {
        const currentTime = new Date().getTime();
        const fiveMinutesInMillis = 5 * 60 * 1000;
        if (currentTime - parseInt(cachedTimestamp, 10) >= fiveMinutesInMillis) {
            sessionStorage.removeItem(cacheKey);
            sessionStorage.removeItem(cacheTimestampKey);
        }
    }

    if (cachedData) {
        const cachedDataParsed = JSON.parse(cachedData);
        return cachedDataParsed;
    }
      const response = await search({searchTerm, after, before, count});
      sessionStorage.setItem(cacheKey, JSON.stringify(response));
      sessionStorage.setItem(cacheTimestampKey, new Date().getTime().toString());
      return response;      
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        sessionStorage.clear();
      }
      return rejectWithValue(error.message)      
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    increment(state){
      state.countInSearch += 25
      state.id += 1 
    },
    decrement(state){
        state.countInSearch = Math.max(0, state.countInSearch - 25)
        state.id -= 1
    },
    resetCountInSearch(state){
        state.countInSearch = 0
        state.id = 1
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchData.pending, (state) => {
        state.searchPostStatus = 'pending';
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.searchPostStatus = 'fulfilled';
        state.searchPosts = action.payload.data.children;
        state.nextData = action.payload.data.after;
        state.prevData = action.payload.data.before;
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.searchPostStatus = 'rejected';
        state.searchPostsError = action.payload;
      })
  },
});

export const selectSearchPostsResults = (state) => state.search.searchPosts;
export const selectSearchPostsStatus = (state) => state.search.searchPostStatus;
export const selectSearchPostsError = (state) => state.search.searchPostsError;
export const selectAfter = (state) => state.search.nextData;
export const selectBefore = (state) => state.search.prevData;
export const selectCountInSearch = (state) => state.search.countInSearch;
export const selectSearchTerm = (state) => state.search.searchTerm;
export const { increment, decrement, resetCountInSearch, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
