import { Outlet } from 'react-router-dom';
import { SearchBar } from '../../features/searchBar/SearchBar'

export function Root() {
    return (
        <div>
            <SearchBar/>
            <Outlet/>            
        </div>    
    )
}