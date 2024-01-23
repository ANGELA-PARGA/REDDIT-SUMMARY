import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchData } from './searchSlice';
import { fetchSubredditsbySearch } from '../sidebar/sidebarSlice'
import ICON from '../../assets/ICON.png'
import styles from './Search.module.css'

export function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch(); 
  
  function handleSearchChange(e){
    setSearch(e.target.value);
  }

  function handlerOnSubmit(e){
    e.preventDefault();
    dispatch(fetchSearchData(search));
    dispatch(fetchSubredditsbySearch(search));                    
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
