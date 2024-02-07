import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostInfo } from '../../reddit_API/reddit_data'


const initialState = {
    postData: [],
    status: '',
    error: null
};

export const loadPostInfo = createAsyncThunk(
    'load/loadPostInfo',
    async (link, { rejectWithValue }) => {
        try {
            const cacheKey = `cache_postInfo_${link}`;
            const cacheTimestampKey = `cache_postInfo_${link}_timestamp`;
            const cachedData = sessionStorage.getItem(cacheKey);
            const cachedTimestamp = sessionStorage.getItem(cacheTimestampKey);
            if (cachedTimestamp) {
                const currentTime = new Date().getTime();
                const threeMinutesInMillis = 3 * 60 * 1000;
                if (currentTime - parseInt(cachedTimestamp, 10) >= threeMinutesInMillis) {
                    sessionStorage.removeItem(cacheKey);
                    sessionStorage.removeItem(cacheTimestampKey);
                }
            }
        
            if (cachedData) {
                const cachedDataParsed = JSON.parse(cachedData);
                return cachedDataParsed;
            }
            const response = await getPostInfo(link);
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


export const postArticleSlice = createSlice({
    name: 'postInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadPostInfo.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(loadPostInfo.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.postData = action.payload;
        })
        .addCase(loadPostInfo.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        });
    },
});

export const selectPostInfoResults = (state) => state.postInfo.postData;
export const selectPostInfoStatus = (state) => state.postInfo.status;
export const selectPostInfoError = (state) => state.postInfo.error;

export default postArticleSlice.reducer;
