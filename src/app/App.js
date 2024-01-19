import React, { useEffect } from 'react';
import styles from './App.module.css';
import {SearchBar} from '../features/search/Search'
import {SearchResults} from '../components/SearchResults'
import {Sidebar} from '../features/Sidebar'
import { useDispatch } from 'react-redux';
import { loadBestPosts } from '../features/search/searchSlice'
import { loadSubreddits } from '../features/sidebarSlice';


function App() {
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
