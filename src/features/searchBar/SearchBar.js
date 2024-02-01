import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, createSearchParams, Link } from 'react-router-dom';
import { resetCount } from '../postFeeds/postsFeedsSlice';
import {resetCountInSearch} from '../searchResults/searchResultsSlice'
import { setSearchTerm } from '../searchResults/searchResultsSlice';
import styles from './SearchBar.module.css'

export function SearchBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function handleSearchChange(e){
    setSearch(e.target.value);
  }

  function handlerOnSubmit(e){
    e.preventDefault();
    dispatch(setSearchTerm(search))
    if (search){
      const searchQueryParams = {
        q: search
      };
      const searchQueryString = createSearchParams(searchQueryParams);
      navigate({
        pathname: 'search',
        search: `?${searchQueryString}`
      }); 
      setSearch("")
      
    }                   
  }
  

  return (
    <div className={styles.headerDiv}>
      <Link onClick={() => {
        dispatch(resetCount())
        dispatch(resetCountInSearch())}} to='/' className={styles.link}
      >
        <div className={styles.logo}>
          <h1>ReddTrack</h1>
        </div>
      </Link>
      <form 
          onSubmit={handlerOnSubmit}                
      >
          <label htmlFor="inputSearch"></label>
          <input 
              id="inputSearch" 
              type="text"
              placeholder='Search' 
              value={search} 
              onChange={handleSearchChange}
          />
      </form>
    </div>
  );
}
