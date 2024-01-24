import { useSelector } from 'react-redux';
import { selectPostInfoResults, selectPostInfoStatus, selectPostInfoError} from './postArticlesSlice';
import {PostCard} from "../../components/post_cards/PostCard"
import {CommentsCard} from "../../components/comments_cards/CommentsCard"
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from './PostArticles.module.css'
import { ErrorHandler } from '../../components/error_handler/ErrorHandler';


export function PostArticles() {    

    const postInfoResults = useSelector(selectPostInfoResults);
    const postInfoStatus = useSelector(selectPostInfoStatus);
    const postInfoError = useSelector(selectPostInfoError);
    
    if (postInfoStatus === 'pending') {
        return (
            <div>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <p>Loading the poooost...</p>
            </div>
            );
    }
        
    if (postInfoStatus === 'rejected') {
        return (
            <ErrorHandler errorData={postInfoError}/>
        );
    }
        
    if (postInfoStatus === 'fulfilled') {

        return (
        <div className={styles.postInfoCard}>
            <PostCard data={postInfoResults[0].data.children[0].data}/>
            <CommentsCard data={postInfoResults[1]} />
        </div>
        );
    }
    
}
