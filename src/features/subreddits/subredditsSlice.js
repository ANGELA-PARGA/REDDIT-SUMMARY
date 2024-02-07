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
            const cacheKey = 'cache_subreddits';
            const cacheTimestampKey = 'cache_subreddits_timestamp';
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
                console.log('returning subreddits data in caché', cachedDataParsed);
                return cachedDataParsed;
            }
            const response = await fetchSubreddits();
            sessionStorage.setItem(cacheKey, JSON.stringify(response));
            sessionStorage.setItem(cacheTimestampKey, new Date().getTime().toString());
            console.log('LOADSUBREDDITS: datos del fetching', response)
            return response;      
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                sessionStorage.clear();
            }
            return rejectWithValue(error.message)     
        }
    }
);

export const fetchSubredditsbySearch = createAsyncThunk(
    'search/fetchSubredditsbySearch',
    async (term, { rejectWithValue }) => {
        console.log('FETCH SUBREDDITS: calling fetchSubredditsbySearch in thunk')
        try {
            const cacheKey = `cache_subreddits_${term}`;
            const cacheTimestampKey = `cache_subreddits_${term}_timestamp`;
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
                console.log('returning subreddits by search data in caché', cachedDataParsed);
                return cachedDataParsed;
            }
            const response = await getSubredditsbySearch(term);
            sessionStorage.setItem(cacheKey, JSON.stringify(response));
            sessionStorage.setItem(cacheTimestampKey, new Date().getTime().toString());
            console.log('FETCH SUBREDDITS: datos del fetching:', response)
            return response;      
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                sessionStorage.clear();
            }
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
