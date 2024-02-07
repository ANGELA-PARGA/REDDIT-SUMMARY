import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchPostsStatus, 
        selectSearchPostsError, 
        selectSearchPostsResults } from '../../features/searchResults/searchResultsSlice'
import { selectSubredditsSidebar, selectSubredditsSidebarStatus} from '../../features/subreddits/subredditsSlice'
import { SearchResults } from '../../features/searchResults/SearchResults';
import { Subreddits } from '../../features/subreddits/Subreddits';
import { ErrorHandler } from '../../components/error_handler/ErrorHandler'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from '../../features/ContainerStyles.module.css'


export function SearchPage() {
    const searchPostStatus = useSelector(selectSearchPostsStatus);
    const searchPostError = useSelector(selectSearchPostsError);
    const searchPostResults = useSelector(selectSearchPostsResults);
    const searchSubreddits = useSelector(selectSubredditsSidebar);
    const subredditStatus = useSelector(selectSubredditsSidebarStatus);

    const memoizedPostsResults = useMemo(() => searchPostResults, [searchPostResults]);
    const memoizedSubredditsResults = useMemo(() => searchSubreddits, [searchSubreddits]);
    
    // Loading state
    if (searchPostStatus === 'pending' || subredditStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <div>
                    <UilSpinnerAlt size={100} color='#D42B2B'/> 
                </div>
                <h3>Loading the posts...</h3>
            </div>
        );
    }

    // Error state
    if (searchPostStatus === 'rejected' || subredditStatus === 'rejected') {
        return (
            <ErrorHandler errorData={searchPostError}/>        
        );
    }

    // Render results        
    return (
        <div className={styles.mainInfo}>
            <SearchResults results={memoizedPostsResults}/>
            <Subreddits subreddits={memoizedSubredditsResults}/>
        </div>
    );
}
