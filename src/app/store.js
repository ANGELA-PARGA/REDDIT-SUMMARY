import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/search/searchSlice'
import sidebarSlice from '../features/sidebar/sidebarSlice';
import postArticlesSlice from '../features/postArticles/postArticlesSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    sidebar: sidebarSlice,
    postInfo: postArticlesSlice
  },
});
