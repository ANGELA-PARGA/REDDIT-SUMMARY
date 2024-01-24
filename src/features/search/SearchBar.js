import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { fetchSearchData, fetchSubredditsbySearch } from './searchSlice';
import ICON from '../../assets/ICON.png'
import styles from './SearchBar.module.css'

export function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch(); 
  const navigate = useNavigate()
  
  function handleSearchChange(e){
    setSearch(e.target.value);
  }

  function handlerOnSubmit(e){
    e.preventDefault();
    dispatch(fetchSearchData(search));
    dispatch(fetchSubredditsbySearch(search));
    console.log(search)
    const searchQueryParams = {
      q: search
    };
    const searchQueryString = createSearchParams(searchQueryParams);
    console.log('Search Query:', searchQueryString);
    navigate({
      pathname: 'search',
      search: `?${searchQueryString}`
    }); 
    setSearch("")                   
  }
  

  return (
    <div className={styles.headerDiv}>
      <div className={styles.logo}>
        <img src={ICON} alt="logo" />
        <h1>ReddTrack</h1>
      </div>
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