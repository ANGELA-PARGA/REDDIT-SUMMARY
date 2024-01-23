import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { search } from '../../reddit_API/reddit_data';
import { fetchBestPost } from '../../reddit_API/reddit_data';

const initialState = {
  data: [],
  status: '',
  error: null, 
};

export const fetchSearchData = createAsyncThunk(
  'search/fetchSearchData',
  async (searchTerm, { rejectWithValue }) => {
    console.log(`calling fetchSearchData`)
    try {
      const response = await search(searchTerm);
      console.log(`search results: ${response}`)
      return response;      
    } catch (error) {
      return rejectWithValue(error.message)     
    }
  }
);

export const loadBestPosts = createAsyncThunk(
  'load/loadBestPosts',
  async (_, { rejectWithValue }) => {
    console.log(`calling loadbestposts`)
      try {
          const response = await fetchBestPost();
          console.log(`feed posts: ${response}`)
          return response;      
      } catch (error) {
          return rejectWithValue(error.message)     
      }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(loadBestPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadBestPosts.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = action.payload;
      })
      .addCase(loadBestPosts.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.payload;
      });
  },
});

export const selectSearchResults = (state) => state.search.data;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;
