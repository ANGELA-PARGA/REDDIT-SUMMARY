import React from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, 
        createBrowserRouter, 
        createRoutesFromElements, 
        Route } 
from 'react-router-dom';
import { Root } from './rootLayout/Root'
import { LoadingResults } from '../features/loadingData/LoadingResults';
import { SearchResults } from '../features/search/SearchResults';
import { PostArticles } from '../features/postArticles/PostArticles';
import { ErrorHandler } from '../components/error_handler/ErrorHandler';
import { SubredditPosts } from '../features/subredditPosts/SubredditPosts';
import { loadPostInfo } from '../features/postArticles/postArticlesSlice';
import { loadBestPosts, loadSubreddits } from '../features/loadingData/loadingResultsSlice'
import { loadSubredditPosts, fetchSubredditInfo} from '../features/subredditPosts/subredditPostsSlice';
import { fetchSearchData, fetchSubredditsbySearch } from '../features/search/searchSlice';

function App() {
  const dispatch = useDispatch()

  const router = createBrowserRouter((createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<LoadingResults/>} loader={ 
        async()=> {
          dispatch(loadBestPosts())
          dispatch(loadSubreddits())
          return null
      }} 
      errorElement={<ErrorHandler/>}/>
      <Route path="search" element={<SearchResults/>} loader={
        async({request})=> {
          const url = new URL(request.url);
          const searchTerm = url.searchParams.get("q");
          dispatch(fetchSearchData(searchTerm));
          dispatch(fetchSubredditsbySearch(searchTerm));          
          return null
        }} 
        errorElement={<ErrorHandler/>}/>
      <Route path="post/r/:subreddit/comments/:id/:title/" element={<PostArticles/>} loader={
        async({params})=> {
          dispatch(loadPostInfo(`/r/${params.subreddit}/comments/${params.id}/${params.title}/`))
          return null
        }} 
        errorElement={<ErrorHandler/>} />
      <Route path="r/:subreddit/" element={<SubredditPosts/>} loader={
      async({params})=> {
        dispatch(fetchSubredditInfo(`/r/${params.subreddit}/`))
        dispatch(loadSubredditPosts(`/r/${params.subreddit}/`))
        return null
      }} errorElement={<ErrorHandler/>} />      
    </Route>
  )))

  return (
    <RouterProvider router={router} />  
  )
}

export default App;
