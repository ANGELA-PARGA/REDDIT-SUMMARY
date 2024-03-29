import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Root } from './rootLayout/Root'
import { Homepage } from '../components/homepage/Homepage';
import { SearchPage } from '../components/searchPage/SearchPage';
import { PostArticles } from '../features/postArticles/PostArticles';
import { SubredditPosts } from '../features/subredditPosts/SubredditPosts';
import { ErrorHandler } from '../components/error_handler/ErrorHandler';
import { loadPostInfo } from '../features/postArticles/postArticlesSlice';
import { loadBestPosts } from '../features/bestPosts/bestPostsSlice';
import { loadSubreddits } from '../features/subreddits/subredditsSlice';
import { loadSubredditPosts, fetchSubredditInfo} from '../features/subredditPosts/subredditPostsSlice';
import { fetchSearchData } from '../features/searchResults/searchResultsSlice';
import { fetchSubredditsbySearch } from '../features/subreddits/subredditsSlice';

function App() {
  const dispatch = useDispatch()

  const router = createBrowserRouter((createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<Homepage/>} loader={ 
        async({request})=> {
          const url = new URL(request.url);
          const after = url.searchParams.get("after");
          const before = url.searchParams.get("before");
          const count = url.searchParams.get("count");

          dispatch(loadBestPosts({ after, before, count}))    
          dispatch(loadSubreddits())
          return null
        }} 
        errorElement={<ErrorHandler/>}
      />
      <Route path="search" element={<SearchPage/>} loader={
        async({request})=> {
          const url = new URL(request.url);
          const searchTerm = url.searchParams.get("q");
          const after = url.searchParams.get("after");
          const before = url.searchParams.get("before");
          const count = url.searchParams.get("count");  
          dispatch(fetchSearchData({ searchTerm, after, before, count }));
          dispatch(fetchSubredditsbySearch(searchTerm))        
          return null
        }} 
        errorElement={<ErrorHandler/>}
      />
      <Route path="post/r/:subreddit/comments/:id/:title/" element={<PostArticles/>} loader={
        async({params})=> {
          dispatch(loadPostInfo(`/r/${params.subreddit}/comments/${params.id}/${params.title}/`))
          window.scrollTo(0, 0);
          return null
        }} 
        errorElement={<ErrorHandler/>} 
      />
      <Route path="r/:subreddit/" element={<SubredditPosts/>} loader={
        async({params})=> {
          dispatch(fetchSubredditInfo(`/r/${params.subreddit}/`))
          dispatch(loadSubredditPosts(`/r/${params.subreddit}/`))
          window.scrollTo(0, 0);
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
