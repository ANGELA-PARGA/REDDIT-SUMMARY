import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    selectLoadingPosts, 
    selectLoadingPostsStatus, 
    selectLoadingPostsError,
    selectSubredditsSidebar,
    selectSubredditsSidebarStatus,
    selectSubredditsSidebarError } from './loadingResultsSlice'
import { PostCard } from "../../components/post_cards/PostCard"
import { SubredditCard } from '../../components/subreddit_cards/SubredditCard';
import { ErrorHandler } from '../../components/error_handler/ErrorHandler'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from '../ContainerStyles.module.css'

export function LoadingResults() {
    const loadingPosts = useSelector(selectLoadingPosts);
    const loadingStatus = useSelector(selectLoadingPostsStatus);
    const loadingError = useSelector(selectLoadingPostsError);
    const loadingSubreddits = useSelector(selectSubredditsSidebar);
    const loadingSubredditsStatus = useSelector(selectSubredditsSidebarStatus);
    const loadingSubredditsError = useSelector(selectSubredditsSidebarError);   

    // Loading state
    if (loadingStatus === 'pending' || loadingSubredditsStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <h3>Loading the poooosts...</h3>
            </div>
        );
    }
    
    // Error state
    if (loadingStatus === 'rejected' || loadingSubredditsStatus === 'rejected') {
        return (
            <ErrorHandler errorData={loadingError || loadingSubredditsError}/>        
        );
    }
    
    // Render results
    return (
        <div className={styles.mainInfo}>
            <div className={styles.gridResult}>
                {loadingPosts.map((postResult) => (
                    <Link 
                        className={styles.link} 
                        key={postResult.id} 
                        to={`post/r/${postResult.subreddit}/comments/${postResult.id}/${postResult.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')}/`}
                    >
                        <PostCard key={postResult.id} data={postResult} />
                    </Link>          
                ))}
            </div>
            <div className={styles.gridSidebar}>
                {loadingSubreddits.map((subreddit) => (
                    <Link 
                        className={styles.link} 
                        key={subreddit.id} 
                        to={`r/${subreddit.display_name}/`}
                    >
                        <SubredditCard key={subreddit.id} data={subreddit} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
