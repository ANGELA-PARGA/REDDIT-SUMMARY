import { Outlet } from 'react-router-dom';
import { SearchBar } from '../../features/search/SearchBar'

export function Root() {
    return (
        <div>
            <SearchBar/>
            <Outlet/>
        </div>    
    )
}