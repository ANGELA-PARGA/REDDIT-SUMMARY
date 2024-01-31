import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, 
        createBrowserRouter, 
        createRoutesFromElements, 
        Route } 
from 'react-router-dom';
import { Root } from './rootLayout/Root'
import { LoadingResults } from '../features/postFeeds/PostsFeeds';
import { SearchResults } from '../features/search/SearchResults';
import { PostArticles } from '../features/postArticles/PostArticles';
import { ErrorHandler } from '../components/error_handler/ErrorHandler';
import { SubredditPosts } from '../features/subredditPosts/SubredditPosts';
import { loadPostInfo } from '../features/postArticles/postArticlesSlice';
import { loadBestPosts } from '../features/postFeeds/postsFeedsSlice';
import { loadSubreddits } from '../features/subreddits/subredditsSlice';
import { loadSubredditPosts, fetchSubredditInfo} from '../features/subredditPosts/subredditPostsSlice';
import { fetchSearchData, fetchSubredditsbySearch } from '../features/search/searchSlice';

function App() {
  const dispatch = useDispatch()
  const [loadSubredditsCalled, setLoadSubredditsCalled] = useState(false);

  const router = createBrowserRouter((createRoutesFromElements(
    <Route path='/' element={<Root/>} loader={
      async()=>{
        if (!loadSubredditsCalled) {
          console.log('mounting ROOT and calling loadSubreddits')
          dispatch(loadSubreddits());
          setLoadSubredditsCalled(true); 
        }
        return null
      }}
    >
      <Route index element={<LoadingResults/>} loader={ 
        async({request})=> {
          const url = new URL(request.url);
          const after = url.searchParams.get("after");
          const before = url.searchParams.get("before");
          const count = url.searchParams.get("count");
          console.log('mounting LOADINGRESULTS and calling loadBestPosts')
          dispatch(loadBestPosts({ after, before, count}))
          return null
        }} 
        errorElement={<ErrorHandler/>}
      />
      <Route path="search" element={<SearchResults/>} loader={
        async({request})=> {
          const url = new URL(request.url);
          const searchTerm = url.searchParams.get("q");
          dispatch(fetchSearchData(searchTerm));
          dispatch(fetchSubredditsbySearch(searchTerm));          
          return null
        }} 
        errorElement={<ErrorHandler/>}
      />
      <Route path="post/r/:subreddit/comments/:id/:title/" element={<PostArticles/>} loader={
        async({params})=> {
          dispatch(loadPostInfo(`/r/${params.subreddit}/comments/${params.id}/${params.title}/`))
          return null
        }} 
        errorElement={<ErrorHandler/>} 
      />
      <Route path="r/:subreddit/" element={<SubredditPosts/>} loader={
        async({params})=> {
          dispatch(fetchSubredditInfo(`/r/${params.subreddit}/`))
          dispatch(loadSubredditPosts(`/r/${params.subreddit}/`))
          return null
        }} 
        errorElement={<ErrorHandler/>} 
      />      
    </Route>
  )))

  return (
    <RouterProvider router={router} />  
  )
}

export default App;
