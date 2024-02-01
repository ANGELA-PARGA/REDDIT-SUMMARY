import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { search } from '../../reddit_API/reddit_data';

const initialState = {
  searchTerm: '',
  searchPosts: [],
  //searchSubreddits: [],
  searchPostStatus: '',
  //searchSubredditsStatus: '',
  searchPostsError: null,
  //searchSubredditsError: null
  nextData: '',
  prevData: '',
  countInSearch: '0'
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

/*export const fetchSubredditsbySearch = createAsyncThunk(
  'search/fetchSubredditsbySearch',
  async (term, { rejectWithValue }) => {
      try {
      const response = await getSubredditsbySearch(term);
      return response;      
      } catch (error) {
        return rejectWithValue(error.message)      
      }
  }
);*/

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    increment(state){
      state.countInSearch = (parseInt(state.countInSearch, 10) + 25).toString();
      console.log('count increasing in search:', state.countInSearch)
    },
    decrement(state){
        state.countInSearch = Math.max(0, parseInt(state.countInSearch, 10) - 25).toString();
        console.log('count decreasing in search:', state.countInSearch)
    },
    resetCountInSearch(state){
        state.countInSearch = 0
        console.log('count resetting in search:', state.countInSearch)
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
        console.log('datos del estado search', state.searchPosts) 
        state.nextData = action.payload.data.after;
        console.log('datos de after search', state.nextData) 
        state.prevData = action.payload.data.before;
        console.log('datos de before search', state.prevData)
        console.log('datos del count de search', state.countInSearch)
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.searchPostStatus = 'rejected';
        state.searchPostsError = action.payload;
      })
      /*.addCase(fetchSubredditsbySearch.pending, (state) => {
        state.searchSubredditsStatus = 'pending';
      })
      .addCase(fetchSubredditsbySearch.fulfilled, (state, action) => {
          state.searchSubredditsStatus = 'fulfilled';
          state.searchSubreddits = action.payload;
      })
      .addCase(fetchSubredditsbySearch.rejected, (state, action) => {
          state.searchSubredditsStatus = 'rejected';
          state.searchSubredditsError = action.payload;
      });*/
  },
});

export const selectSearchPostsResults = (state) => state.search.searchPosts;
export const selectSearchPostsStatus = (state) => state.search.searchPostStatus;
export const selectSearchPostsError = (state) => state.search.searchPostsError;
export const selectAfter = (state) => state.search.nextData;
export const selectBefore = (state) => state.search.prevData;
export const selectCountInSearch = (state) => state.search.countInSearch;
export const selectSearchTerm = (state) => state.search.searchTerm;
/*export const selectSearchSubredditsResults = (state) => state.search.searchSubreddits;
export const selectSearchSubredditsStatus = (state) => state.search.searchSubredditsStatus;
export const selectSearchSubredditsError = (state) => state.search.searchSubredditsError;*/
export const { increment, decrement, resetCountInSearch, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
