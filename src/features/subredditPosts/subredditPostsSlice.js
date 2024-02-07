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
            const cacheKey = `cache_subredditsPosts_${link}`;
            const cacheTimestampKey = `cache_subredditsPosts_${link}_timestamp`;
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
                console.log('returning subreddits posts data in caché', cachedDataParsed);
                return cachedDataParsed;
            }
            const response = await getSubredditPosts(link);
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

export const fetchSubredditInfo = createAsyncThunk(
    'load/fetchSubredditInfo',
    async (link, { rejectWithValue }) => {
        try {
            const response = await getSubredditInfo(link);
            return response;      
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                sessionStorage.clear();
            }
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
