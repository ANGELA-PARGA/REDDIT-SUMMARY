import { useSelector } from 'react-redux';
import { selectSearchResults, selectSearchStatus, selectSearchError } from '../features/search/searchSlice';
import {PostCard} from "./PostCard"
import { UilSpinnerAlt, UilSyncExclamation} from '@iconscout/react-unicons'
import styles from './SearchResults.module.css'


export function SearchResults() {
    const searchResults = useSelector(selectSearchResults);
    const searchStatus = useSelector(selectSearchStatus);
    const searchError = useSelector(selectSearchError);

    if (searchStatus === 'loading') {
        return (
            <div>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <p>Loading the poooosts...</p>
            </div>
            );
    }
        
    if (searchStatus === 'error') {
        return (
        <div>
            <UilSyncExclamation size={100} color='#D42B2B'/> 
            <p>There was an error: {searchError}</p>
            <p>We are trying to fix it...Please try again later</p>
        </div>
        );
    }
        
    if (searchStatus === 'fulfilled') {
        return (
        <div className={styles.gridResult}>
            {searchResults.map((result) => (
            <PostCard key={result.id} data={result} />
            ))}
        </div>
        );
    }
}
