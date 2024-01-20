import React, { useEffect } from 'react';
import styles from './App.module.css';
import {SearchBar} from '../features/search/Search'
import {SearchResults} from '../components/SearchResults'
import {Sidebar} from '../features/Sidebar'
import { useDispatch } from 'react-redux';
import { loadBestPosts } from '../features/search/searchSlice'
import { loadSubreddits } from '../features/sidebarSlice';
//import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';


function App() {
  // create router with JSX Route elements
/*const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/>}>
    <Route index element={<HomePage/>}/>
    <Route path=":type" element={ <HomePage/>}/>
    <Route path=":type/:id" element={ <PetDetailsPage/>}/>
    <Route path="search" element={<SearchPage/>}/>
    <Route path="pet-details-not-found" element={<PetDetailsNotFound/>}/>             
  </Route>
))*/

  const dispatch = useDispatch()

  useEffect(()=>{
    console.log('el componente se esta montando')
    dispatch(loadBestPosts())
    dispatch(loadSubreddits())    
  }, [dispatch])

  return (
    <>
    <div>
      <SearchBar/>
    </div>    
    <div className={styles.mainInfo}>
      <SearchResults />
      <Sidebar />
    </div>
    </>
  )
}

export default App;
