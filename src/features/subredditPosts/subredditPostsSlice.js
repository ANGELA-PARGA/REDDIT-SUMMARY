import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSubredditPosts, getSubredditInfo } from '../../reddit_API/reddit_data'


const initialState = {
    subredditData: [],
    subredditInfo: {},
    status: '',
    error: null
};

export const loadSubredditPosts = createAsyncThunk(
    'load/loadSubredditPosts',
    async (link, { rejectWithValue }) => {
        try {
            const response = await getSubredditPosts(link);
            return response;      
        } catch (error) {
            return rejectWithValue(error.message)      
        }
    }
);

export const fetchSubredditInfo = createAsyncThunk(
    'load/fetchSubredditInfo',
    async (link, { rejectWithValue }) => {
        try {
            const response = await getSubredditInfo(link);
            return response;      
        } catch (error) {
            return rejectWithValue(error.message)      
        }
    }
);


export const subredditPostsSlice = createSlice({
    name: 'subredditPosts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadSubredditPosts.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(loadSubredditPosts.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.subredditData = action.payload;
        })
        .addCase(loadSubredditPosts.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
        .addCase(fetchSubredditInfo.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(fetchSubredditInfo.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.subredditInfo = action.payload;
        })
        .addCase(fetchSubredditInfo.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });

    },
});

export const selectSubredditPostsResults = (state) => state.subredditPosts.subredditData;
export const selectSubredditInfoResults = (state) => state.subredditPosts.subredditInfo;
export const selectSubredditPostsStatus = (state) => state.subredditPosts.status;
export const selectSubredditPostsError = (state) => state.subredditPosts.error;

export default subredditPostsSlice.reducer;
