import { Outlet } from 'react-router-dom';
import { SearchBar } from '../features/search/Search'

export function Root() {
    return (
        <div>
            <SearchBar/>
            <Outlet/>
        </div>    
    )
}