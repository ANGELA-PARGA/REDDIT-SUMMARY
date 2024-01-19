import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/search/searchSlice'
import sidebarSlice from '../features/sidebarSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    sidebar: sidebarSlice
  },
});
