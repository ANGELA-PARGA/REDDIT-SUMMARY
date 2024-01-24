import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { search, getSubredditsbySearch } from '../../reddit_API/reddit_data';

const initialState = {
  searchPosts: [],
  searchSubreddits: [],
  searchPostStatus: '',
  searchSubredditsStatus: '',
  searchPostsError: null,
  searchSubredditsError: null  
};

export const fetchSearchData = createAsyncThunk(
  'search/fetchSearchData',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await search(searchTerm);
      return response;      
    } catch (error) {
      return rejectWithValue(error.message)      
    }
  }
);

export const fetchSubredditsbySearch = createAsyncThunk(
  'search/fetchSubredditsbySearch',
  async (term, { rejectWithValue }) => {
      try {
      const response = await getSubredditsbySearch(term);
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
        state.searchPostStatus = 'pending';
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.searchPostStatus = 'fulfilled';
        state.searchPosts = action.payload;
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.searchPostStatus = 'rejected';
        state.searchPostsError = action.payload;
      })
      .addCase(fetchSubredditsbySearch.pending, (state) => {
        state.searchSubredditsStatus = 'pending';
      })
      .addCase(fetchSubredditsbySearch.fulfilled, (state, action) => {
          state.searchSubredditsStatus = 'fulfilled';
          state.searchSubreddits = action.payload;
      })
      .addCase(fetchSubredditsbySearch.rejected, (state, action) => {
          state.searchSubredditsStatus = 'rejected';
          state.searchSubredditsError = action.payload;
      });
  },
});

export const selectSearchPostsResults = (state) => state.search.searchPosts;
export const selectSearchPostsStatus = (state) => state.search.searchPostStatus;
export const selectSearchPostsError = (state) => state.search.searchPostsError;
export const selectSearchSubredditsResults = (state) => state.search.searchSubreddits;
export const selectSearchSubredditsStatus = (state) => state.search.searchSubredditsStatus;
export const selectSearchSubredditsError = (state) => state.search.searchSubredditsError;

export default searchSlice.reducer;
