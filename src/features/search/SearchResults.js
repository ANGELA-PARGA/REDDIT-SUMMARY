import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectSearchPostsResults, 
        selectSearchPostsStatus, 
        selectSearchPostsError,
        selectSearchSubredditsResults,
        selectSearchSubredditsStatus,
        selectSearchSubredditsError } from './searchSlice';
import { PostCard } from "../../components/post_cards/PostCard"
import { SubredditCard } from '../../components/subreddit_cards/SubredditCard';
import { ErrorHandler } from '../../components/error_handler/ErrorHandler'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from '../ContainerStyles.module.css'


export function SearchResults() {
    const searchPostResults = useSelector(selectSearchPostsResults);
    const searchPostStatus = useSelector(selectSearchPostsStatus);
    const searchPostError = useSelector(selectSearchPostsError);
    const searchSubredditsResults = useSelector(selectSearchSubredditsResults);
    const searchSubredditsStatus = useSelector(selectSearchSubredditsStatus);
    const searchSubredditsError = useSelector(selectSearchSubredditsError);
    
    // Loading state
    if (searchPostStatus === 'pending' || searchSubredditsStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <h3>Loading the poooosts...</h3>
            </div>
        );
    }

    // Error state
    if (searchPostStatus === 'rejected' || searchSubredditsStatus === 'rejected') {
        return (
            <ErrorHandler errorData={searchPostError || searchSubredditsError}/>        
        );
    }

    // Render results        
    return (
        <div className={styles.mainInfo}>
            <div className={styles.gridResult}>
            {searchPostResults.map((searchResult) => (
                <Link 
                    className={styles.link} 
                    key={searchResult.id} 
                    to={`/post/r/${searchResult.subreddit}/comments/${searchResult.id}/${searchResult.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')}/`}
                >
                    <PostCard key={searchResult.id} data={searchResult} />
                </Link>          
            ))}
            </div>
            <div className={styles.gridSidebar}>
                {searchSubredditsResults.map((subredditResult) => (
                    <SubredditCard key={subredditResult.id} data={subredditResult} />
                ))}
            </div>
        </div>
        );
}
