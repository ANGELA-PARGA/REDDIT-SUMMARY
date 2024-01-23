import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBestPost, fetchSubreddits } from '../../reddit_API/reddit_data';

const initialState = {
    postsData: [],
    subredditsData: [],
    postsStatus: '',
    subredditsStatus: '',
    postsError: null,
    subredditsError: null 
};

export const loadBestPosts = createAsyncThunk(
    'load/loadBestPosts',
    async (_, { rejectWithValue }) => {
        console.log(`calling loadbestposts`)
        try {
            const response = await fetchBestPost();
            console.log(`feed posts: ${response}`)
            return response;      
        } catch (error) {
            return rejectWithValue(error)     
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

export const loadingResultsSlice = createSlice({
    name: 'loading',
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
        .addCase(loadBestPosts.pending, (state) => {
            state.postsStatus = 'pending';
        })
        .addCase(loadBestPosts.fulfilled, (state, action) => {
            state.postsStatus = 'fulfilled';
            state.postsData = action.payload;
        })
        .addCase(loadBestPosts.rejected, (state, action) => {
            state.postsStatus = 'rejected';
            state.postsError = action.payload;
        });
    },
});

export const selectLoadingPosts = (state) => state.loading.postsData;
export const selectLoadingPostsStatus = (state) => state.loading.postsStatus;
export const selectLoadingPostsError = (state) => state.loading.postsError;
export const selectSubredditsSidebar = (state) => state.loading.subredditsData;
export const selectSubredditsSidebarStatus = (state) => state.loading.subredditsStatus;
export const selectSubredditsSidebarError = (state) => state.loading.subredditsError;

export default loadingResultsSlice.reducer;
