import React, { useState } from 'react';
import { useNavigate, createSearchParams, Link } from 'react-router-dom';
import styles from './SearchBar.module.css'

export function SearchBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate()
  
  function handleSearchChange(e){
    setSearch(e.target.value);
  }

  function handlerOnSubmit(e){
    e.preventDefault();
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
  

  return (
    <div className={styles.headerDiv}>
      <Link to='/' className={styles.link}>
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
