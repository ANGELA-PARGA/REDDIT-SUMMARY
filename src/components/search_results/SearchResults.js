import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectSearchResults, selectSearchStatus, selectSearchError } from '../../features/search/searchSlice';
import {PostCard} from "../post_cards/PostCard"
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
                <Link 
                    className={styles.link} 
                    key={result.id} 
                    to={`post/r/${result.subreddit}/comments/${result.id}/${result.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')}/`}
                    onClick={() => {
                        console.log(`post/r/${result.subreddit}/comments/${result.id}/${result.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')}/`)
                    }}
                >
                    <PostCard key={result.id} data={result} />
                </Link>          
            ))}
        </div>
        );
    }
}
