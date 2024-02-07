import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBestPost } from '../../reddit_API/reddit_data';


const initialState = {
    postsData: [],    
    postsStatus: '',    
    postsError: null,    
    nextData: '',
    prevData: '',
    count: 0,
    id: 1
};

export const loadBestPosts = createAsyncThunk(
    'load/loadBestPosts',
    async ({after, before, count}, { rejectWithValue, getState }) => {
        const id = getState().loadingPosts.id
        try {
            const cacheKey = `cache_bestPosts_${id}`;
            const cacheTimestampKey = `cache_bestPosts_timestamp_${id}`
            const cachedData = sessionStorage.getItem(cacheKey);
            const cachedTimestamp = sessionStorage.getItem(cacheTimestampKey);

            if (cachedTimestamp) {
                const currentTime = new Date().getTime();
                const fifteenMinutesInMillis = 15 * 60 * 1000;
                if (currentTime - parseInt(cachedTimestamp, 10) >= fifteenMinutesInMillis) {
                    sessionStorage.removeItem(cacheKey);
                    sessionStorage.removeItem(cacheTimestampKey);
                }
            }
        
            if (cachedData) {
                const cachedDataParsed = JSON.parse(cachedData);
                return cachedDataParsed;
            }

            const response = await fetchBestPost(after, before, count);
            sessionStorage.setItem(cacheKey, JSON.stringify(response));
            sessionStorage.setItem(cacheTimestampKey, new Date().getTime().toString());
            return response;      

        } catch (error) {
            console.log(error)
            if (error.name === 'QuotaExceededError') {
                sessionStorage.clear();
            }
            return rejectWithValue(error.message)     
        }
    }
);

export const loadingPostsSlice = createSlice({
    name: 'loadingPosts',
    initialState,
    reducers: {
        increment(state){
            state.count += 25
            state.id += 1 
        },
        decrement(state){
            state.count = Math.max(0, state.count - 25)
            state.id -= 1
        },
        resetCount(state){
            state.count = 0
            state.id = 1
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadBestPosts.pending, (state) => {
            state.postsStatus = 'pending';
        })
        .addCase(loadBestPosts.fulfilled, (state, action) => {
            state.postsStatus = 'fulfilled';
            state.postsData = action.payload.data.children;
            state.nextData = action.payload.data.after;
            state.prevData = action.payload.data.before;
        })
        .addCase(loadBestPosts.rejected, (state, action) => {
            state.postsStatus = 'rejected';
            state.postsError = action.payload;            
        });
    },
});

export const selectLoadingPosts = (state) => state.loadingPosts.postsData;
export const selectAfter = (state) => state.loadingPosts.nextData;
export const selectBefore = (state) => state.loadingPosts.prevData;
export const selectCount = (state) => state.loadingPosts.count;
export const selectLoadingPostsStatus = (state) => state.loadingPosts.postsStatus;
export const selectLoadingPostsError = (state) => state.loadingPosts.postsError;
export const { increment, decrement, resetCount } = loadingPostsSlice.actions;


export default loadingPostsSlice.reducer;
