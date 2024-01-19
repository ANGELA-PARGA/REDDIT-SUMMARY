import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchData } from './searchSlice';
import { fetchSubredditsbySearch } from '../sidebarSlice'

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
    <div>
      <img src="" alt="logo" />
      <form 
          onSubmit={handlerOnSubmit}                
      >
          <label htmlFor="inputSearch">Search:</label>
          <input 
              id="inputSearch" 
              type="text"
              placeholder='Search' 
              value={search} 
              onChange={handleSearchChange}
          />
          <button type='submit'>Search</button>
      </form>
    </div>
  );
}
