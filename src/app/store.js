import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/search/searchSlice'
import postArticlesSlice from '../features/postArticles/postArticlesSlice';
import loadingPostsSlice from '../features/postFeeds/postsFeedsSlice';
import loadingSubredditsSlice from '../features/subreddits/subredditsSlice';
import subredditPostsSlice from '../features/subredditPosts/subredditPostsSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    loadingPosts: loadingPostsSlice,
    loadingSubreddits: loadingSubredditsSlice,
    postInfo: postArticlesSlice,
    subredditPosts: subredditPostsSlice
  },
});
