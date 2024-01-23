import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectSearchResults, selectSearchStatus, selectSearchError } from '../../features/search/searchSlice';
import {PostCard} from "../post_cards/PostCard"
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from './SearchResults.module.css'
import { ErrorHandler } from '../ErrorHandler'

export function SearchResults() {
    const searchResults = useSelector(selectSearchResults);
    const searchStatus = useSelector(selectSearchStatus);
    const searchError = useSelector(selectSearchError);   

    if (searchStatus === 'pending') {
        return (
            <div>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <p>Loading the poooosts...</p>
            </div>
            );
    }
        
    if (searchStatus === 'rejected') {
        return (
            <ErrorHandler errorData={searchError}/>        
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
                >
                    <PostCard key={result.id} data={result} />
                </Link>          
            ))}
        </div>
        );
    }
}
