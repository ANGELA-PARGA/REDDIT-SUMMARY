import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSubreddits, getSubredditsbySearch } from '../../reddit_API/reddit_data';

const initialState = {
    subredditsData: [],
    subredditsStatus: '',
    subredditsError: null
};

export const loadSubreddits = createAsyncThunk(
    'load/loadSubreddits',
    async (_, { rejectWithValue }) => {
        console.log('LOADSUBREDDITS: calling loadSubreddits in thunk')
        try {
            const response = await fetchSubreddits();
            console.log('LOADSUBREDDITS: datos del fetching',response)
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
)

export const loadingSubredditsSlice = createSlice({
    name: 'loadingSubreddits',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadSubreddits.pending, (state) => {
            state.subredditsStatus = 'pending';
        })
        .addCase(loadSubreddits.fulfilled, (state, action) => {
            state.subredditsStatus = 'fulfilled';
            state.subredditsData = action.payload;
        })
        .addCase(loadSubreddits.rejected, (state, action) => {
            state.subredditsStatus = 'rejected';
            state.subredditsError = action.payload;
        })
        .addCase(fetchSubredditsbySearch
            .pending, (state) => {
            state.subredditsStatus = 'pending';
        })
        .addCase(fetchSubredditsbySearch.fulfilled, (state, action) => {
            state.subredditsStatus = 'fulfilled';
            state.subredditsData = action.payload;
        })
        .addCase(fetchSubredditsbySearch.rejected, (state, action) => {
            state.subredditsStatus = 'rejected';
            state.subredditsError = action.payload;
        })
    },
});

export const selectSubredditsSidebar = (state) => state.loadingSubreddits.subredditsData;
export const selectSubredditsSidebarStatus = (state) => state.loadingSubreddits.subredditsStatus;
export const selectSubredditsSidebarError = (state) => state.loadingSubreddits.subredditsError;


export default loadingSubredditsSlice.reducer;
