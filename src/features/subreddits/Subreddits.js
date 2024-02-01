import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    selectSubredditsSidebar,
    selectSubredditsSidebarStatus,
    selectSubredditsSidebarError,
} from './subredditsSlice'
import { SubredditCard } from '../../components/subreddit_cards/SubredditCard';
import { ErrorHandler } from '../../components/error_handler/ErrorHandler'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from '../ContainerStyles.module.css'

export function Subreddits(){
    const loadingSubreddits = useSelector(selectSubredditsSidebar);
    const loadingSubredditsStatus = useSelector(selectSubredditsSidebarStatus);
    const loadingSubredditsError = useSelector(selectSubredditsSidebarError);

    // Loading state
    if (loadingSubredditsStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <div>
                    <UilSpinnerAlt size={100} color='#D42B2B'/>
                </div> 
                <h3>Loading subreddits...</h3>
            </div>
        );
    }
    
    // Error state
    if (loadingSubredditsStatus === 'rejected') {
        return (
            <ErrorHandler errorData={loadingSubredditsError}/>        
        );
    }

    return(
        <div className={styles.gridSidebar}>
            {loadingSubreddits.map((subreddit) => (
                <Link 
                    className={styles.link} 
                    key={subreddit.data.id} 
                    to={`r/${subreddit.data.display_name}/`}
                >
                    <SubredditCard key={subreddit.data.id} data={subreddit.data} />
                </Link>
            ))}
        </div>
    )
}