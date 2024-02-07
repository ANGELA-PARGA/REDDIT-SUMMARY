import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectLoadingPosts, selectLoadingPostsStatus, selectLoadingPostsError,} from '../../features/bestPosts/bestPostsSlice'
import { selectSubredditsSidebar, selectSubredditsSidebarStatus } from '../../features/subreddits/subredditsSlice'
import { Subreddits } from '../../features/subreddits/Subreddits';
import { BestPosts } from '../../features/bestPosts/BestPosts';
import { ErrorHandler } from '../error_handler/ErrorHandler'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from '../../features/ContainerStyles.module.css'

export function Homepage() {
    const loadingStatus = useSelector(selectLoadingPostsStatus);
    const loadingError = useSelector(selectLoadingPostsError);
    const subredditStatus = useSelector(selectSubredditsSidebarStatus);
    const loadingPosts = useSelector(selectLoadingPosts);
    const loadingSubreddits = useSelector(selectSubredditsSidebar);

    const memoizedPosts = useMemo(() => loadingPosts, [loadingPosts]);
    const memoizedSubreddits = useMemo(() => loadingSubreddits, [loadingSubreddits]);

    // Loading state
    if (loadingStatus === 'pending' || subredditStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <div>
                    <UilSpinnerAlt size={100} color='#D42B2B'/>
                </div> 
                <h3>Loading Posts...</h3>
            </div>
        );
    }
    
    // Error state
    if (loadingStatus === 'rejected' || subredditStatus === 'rejected') {
        return (
            <ErrorHandler errorData={loadingError}/>        
        );
    }
    
    // Render results
    return (
        <div className={styles.mainInfo}>
            <BestPosts bestPosts={memoizedPosts}/>
            <Subreddits subreddits={memoizedSubreddits}/>
        </div>        
    );
}
