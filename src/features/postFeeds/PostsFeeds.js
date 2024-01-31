import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    selectLoadingPosts, 
    selectLoadingPostsStatus, 
    selectLoadingPostsError,
    selectAfter,
    selectCount,
    selectBefore
} from './postsFeedsSlice'
import {increment, decrement} from './postsFeedsSlice'
import { PostCard } from "../../components/post_cards/PostCard"
import { ErrorHandler } from '../../components/error_handler/ErrorHandler'
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from '../ContainerStyles.module.css'

export function LoadingResults() {
    const dispatch = useDispatch()
    const loadingPosts = useSelector(selectLoadingPosts);
    const loadingStatus = useSelector(selectLoadingPostsStatus);
    const loadingError = useSelector(selectLoadingPostsError);
    const after = useSelector(selectAfter)
    const before = useSelector (selectBefore) 
    const count = useSelector(selectCount)

    // Loading state
    if (loadingStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <h3>Loading Posts...</h3>
            </div>
        );
    }
    
    // Error state
    if (loadingStatus === 'rejected') {
        return (
            <ErrorHandler errorData={loadingError}/>        
        );
    }
    
    // Render results
    return (
        <div className={styles.loadInfo}>
            <div className={styles.buttonsContainer}>
                <div>
                    <Link onClick={() => dispatch(decrement())} 
                        to={`?before=${before}&count=${Math.max(0, (count - 25)).toString()}`} 
                        className={styles.linkButtons}> Previous
                    </Link>
                </div>
                <div>
                    <Link onClick={() => dispatch(increment())} 
                        to={`?after=${after}&count=${count.toString()}`} 
                        className={styles.linkButtons}> Next
                    </Link>
                </div>
            </div>
            <div className={styles.gridResult}>
                {loadingPosts.map((postResult) => (
                    <Link 
                        className={styles.link} 
                        key={postResult.data.id} 
                        to={`post/r/${postResult.data.subreddit}/comments/${postResult.data.id}/${postResult.data.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')}/`}
                    >
                        <PostCard key={postResult.data.id} data={postResult.data} />
                    </Link>          
                ))}
            </div>
        </div>        
    );
}
