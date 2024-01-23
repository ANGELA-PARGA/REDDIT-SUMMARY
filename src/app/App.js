import React from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, 
        createBrowserRouter, 
        createRoutesFromElements, 
        Route } 
from 'react-router-dom';
import { Root } from './Root'
import { Homepage } from '../components/homepage/Homepage';
import { PostArticles } from '../features/postArticles/PostArticles'
import { loadPostInfo } from '../features/postArticles/postArticlesSlice';
import { loadBestPosts } from '../features/search/searchSlice'
import { loadSubreddits } from '../features/sidebar/sidebarSlice';

function App() {
  const dispatch = useDispatch()

  const router = createBrowserRouter((createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<Homepage/>} loader={
        async()=> {
          dispatch(loadBestPosts())
          dispatch(loadSubreddits())
          return null
        }
      }/>
      <Route path="search" element={<Homepage/>}/>
      <Route path="post/r/:subreddit/comments/:id/:title/" element={<PostArticles/>} loader={
        async({params})=> {
          dispatch(loadPostInfo(`/r/${params.subreddit}/comments/${params.id}/${params.title}/`))
          return null
        }} 
      />    
    </Route>
  )))

  return (
    <RouterProvider router={router} />  
  )
}

export default App;
