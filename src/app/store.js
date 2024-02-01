import { configureStore } from '@reduxjs/toolkit';
import searchResultSlice from '../features/searchResults/searchResultsSlice'
import postArticlesSlice from '../features/postArticles/postArticlesSlice';
import loadingPostsSlice from '../features/postFeeds/postsFeedsSlice';
import loadingSubredditsSlice from '../features/subreddits/subredditsSlice';
import subredditPostsSlice from '../features/subredditPosts/subredditPostsSlice';

export const store = configureStore({
  reducer: {
    search: searchResultSlice,
    loadingPosts: loadingPostsSlice,
    loadingSubreddits: loadingSubredditsSlice,
    postInfo: postArticlesSlice,
    subredditPosts: subredditPostsSlice
  },
});
