import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBestPost } from '../../reddit_API/reddit_data';


const initialState = {
    postsData: [],    
    postsStatus: '',    
    postsError: null,    
    nextData: '',
    prevData: '',
    count: 0
};

export const loadBestPosts = createAsyncThunk(
    'load/loadBestPosts',
    async ({after, before, count}, { rejectWithValue }) => {
        console.log('LOADBESTPOST: calling loadBestPosts in thunk')
        try {
            const cacheKey = `cache_bestPosts_${after}_${before}`;
            const cacheTimestampKey = `cache_bestPosts_timestamp_${after}_${before}`;
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
                console.log('returning bestposts data in caché', cachedDataParsed);
                return cachedDataParsed;
            }

            const response = await fetchBestPost(after, before, count);
            sessionStorage.setItem(cacheKey, JSON.stringify(response));
            sessionStorage.setItem(cacheTimestampKey, new Date().getTime().toString());
            console.log('LOADBESTPOST: datos del fetching', response)
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
            state.count += 25 //(parseInt(state.count, 10) + 25).toString();
            console.log('count increasing en bestposts:', state.count)
        },
        decrement(state){
            state.count = Math.max(0, state.count - 25)//Math.max(0, parseInt(state.count, 10) - 25).toString();
            console.log('count decreasing en bestposts:', state.count)
        },
        resetCount(state){
            state.count = 0
            console.log('count resetting en bestposts:', state.count)
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
            console.log('datos del estado en bestposts', state.postsData) 
            state.nextData = action.payload.data.after;
            console.log('datos de after en bestposts', state.nextData) 
            state.prevData = action.payload.data.before;
            console.log('datos de before en bestposts', state.prevData)
            console.log('datos del count en bestposts', state.count) 

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
