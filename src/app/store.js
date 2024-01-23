import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/search/searchSlice'
import postArticlesSlice from '../features/postArticles/postArticlesSlice';
import loadingResultsSlice from '../features/loadingData/loadingResultsSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    loading: loadingResultsSlice,
    postInfo: postArticlesSlice
  },
});
