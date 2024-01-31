import { Outlet } from 'react-router-dom';
import { SearchBar } from '../../features/search/SearchBar'
import { Subreddits } from '../../features/subreddits/Subreddits';
import styles from '../../features/ContainerStyles.module.css'

export function Root() {
    return (
        <div>
            <SearchBar/>
            <div className={styles.mainInfo}>                
                <Outlet/>
                <Subreddits/>
            </div>            
        </div>    
    )
}