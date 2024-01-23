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
        console.log(`calling fetchPostInfo`)
        try {
        const response = await getPostInfo(link);
        console.log(`post information: ${response}`)
        return response;      
        } catch (error) {
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
            console.log(state.postData)
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
