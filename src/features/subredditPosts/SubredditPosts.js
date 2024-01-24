import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectSubredditPostsResults, 
        selectSubredditPostsStatus, 
        selectSubredditPostsError,
        selectSubredditInfoResults } from './subredditPostsSlice'; 
import { PostCard } from "../../components/post_cards/PostCard"
import { SubredditCard } from '../../components/subreddit_cards/SubredditCard';
import { ErrorHandler } from '../../components/error_handler/ErrorHandler'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from './SubredditPosts.module.css'


export function SubredditPosts() {
    
    const subredditPostsResults = useSelector(selectSubredditPostsResults);
    const subredditPostsStatus = useSelector(selectSubredditPostsStatus);
    const subredditPostsError = useSelector(selectSubredditPostsError);
    const subredditInfoResults = useSelector(selectSubredditInfoResults);
    
    // Loading state
    if (subredditPostsStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <h3>Loading the poooosts...</h3>
            </div>
        );
    }

    // Error state
    if (subredditPostsStatus === 'rejected') {
        return (
            <ErrorHandler errorData={subredditPostsError}/>        
        );
    }

    // Render results        
    return (
        <div className={styles.mainContainer}>
            <SubredditCard data={subredditInfoResults}/>
            <div className={styles.postLists}>
            {subredditPostsResults.map((subredditPost) => (
                <Link 
                    className={styles.link} 
                    key={subredditPost.id} 
                    to={`/post/r/${subredditPost.subreddit}/comments/${subredditPost.id}/${subredditPost.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')}/`}
                >
                    <PostCard key={subredditPost.id} data={subredditPost} />
                </Link>          
            ))}
            </div>
        </div>
    );
}
