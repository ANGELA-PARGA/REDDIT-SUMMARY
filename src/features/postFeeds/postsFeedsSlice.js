import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBestPost } from '../../reddit_API/reddit_data';

const initialState = {
    postsData: [],    
    postsStatus: '',    
    postsError: null,    
    nextData: '',
    prevData: '',
    count: '0'
};

export const loadBestPosts = createAsyncThunk(
    'load/loadBestPosts',
    async ({after, before, count}, { rejectWithValue }) => {
        console.log('LOADBESTPOST: calling loadBestPosts in thunk')
        try {
            const response = await fetchBestPost(after, before, count);
            console.log('LOADBESTPOST: datos del fetching',response)
            return response;      
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)     
        }
    }
);

export const loadingPostsSlice = createSlice({
    name: 'loadingPosts',
    initialState,
    reducers: {
        increment(state){
            state.count = (parseInt(state.count, 10) + 25).toString();
            console.log('count increasing en postfeeds:', state.count)
        },
        decrement(state){
            state.count = Math.max(0, parseInt(state.count, 10) - 25).toString();
            console.log('count decreasing en postfeeds:', state.count)
        },
        resetCount(state){
            state.count = 0
            console.log('count resetting en postfeeds:', state.count)
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
            console.log('datos del estado en postfeeds', state.postsData) 
            state.nextData = action.payload.data.after;
            console.log('datos de after en postfeeds', state.nextData) 
            state.prevData = action.payload.data.before;
            console.log('datos de before en postfeeds', state.prevData)
            console.log('datos del count en postfeeds', state.count) 

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
