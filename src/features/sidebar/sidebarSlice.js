import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSubredditsbySearch, fetchSubreddits } from '../../reddit_API/reddit_data'


const initialState = {
    data: [],
    status: '',
    error: null
};

export const fetchSubredditsbySearch = createAsyncThunk(
    'search/fetchSubredditsbySearch',
    async (term, { rejectWithValue }) => {
        console.log(`calling fetchSubreddit`)
        try {
        const response = await getSubredditsbySearch(term);
        console.log(`subreddit results: ${response}`)
        return response;      
        } catch (error) {
        return rejectWithValue(error.message)     
        }
    }
);

export const loadSubreddits = createAsyncThunk(
    'load/loadSubreddits',
    async (_, { rejectWithValue }) => {
        console.log(`calling loadSubreddit`)
        try {
        const response = await fetchSubreddits();
        console.log(`load subreddits: ${response}`)
        return response;      
        } catch (error) {
        return rejectWithValue(error.message)     
        }
    }
);

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSubredditsbySearch.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(fetchSubredditsbySearch.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(fetchSubredditsbySearch.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
        .addCase(loadSubreddits.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(loadSubreddits.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(loadSubreddits.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });
    },
});

export const selectSidebarResults = (state) => state.sidebar.data;
export const selectSidebarStatus = (state) => state.sidebar.status;
export const selectSidebarError = (state) => state.sidebar.error;

export default sidebarSlice.reducer;
