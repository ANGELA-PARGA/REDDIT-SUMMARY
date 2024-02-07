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
import styles from '../ContainerStyles.module.css'


export function SubredditPosts() {
    
    const subredditPostsResults = useSelector(selectSubredditPostsResults);
    const subredditPostsStatus = useSelector(selectSubredditPostsStatus);
    const subredditPostsError = useSelector(selectSubredditPostsError);
    const subredditInfoResults = useSelector(selectSubredditInfoResults);

    
    
    // Loading state
    if (subredditPostsStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <div><UilSpinnerAlt size={100} color='#D42B2B' /></div>
                <h3>Loading the posts...</h3>
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
        <div className={styles.mainPostsContainer}>
            <div className={styles.postsContainer}>
                <div className={styles.subredditInfo}>
                    <SubredditCard data={subredditInfoResults}/>
                </div>
                <div className={styles.gridResult}>
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
        </div>
    );
}
