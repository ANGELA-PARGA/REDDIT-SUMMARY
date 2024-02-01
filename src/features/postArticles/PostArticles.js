import { useSelector } from 'react-redux';
import { selectPostInfoResults, selectPostInfoStatus, selectPostInfoError} from './postArticlesSlice';
import {PostCard} from "../../components/post_cards/PostCard"
import {CommentsCard} from "../../components/comments_cards/CommentsCard"
import { UilSpinnerAlt } from '@iconscout/react-unicons'
import styles from '../ContainerStyles.module.css'
import { ErrorHandler } from '../../components/error_handler/ErrorHandler';


export function PostArticles() {    

    const postInfoResults = useSelector(selectPostInfoResults);
    const postInfoStatus = useSelector(selectPostInfoStatus);
    const postInfoError = useSelector(selectPostInfoError);
    
    if (postInfoStatus === 'pending') {
        return (
            <div className={styles.loading}>
                <div>
                    <UilSpinnerAlt size={100} color='#D42B2B'/>
                </div> 
                <h3>Loading the post...</h3>
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
            <div className={styles.mainPostsContainer}>
                <div className={styles.postsContainer}>
                    <PostCard data={postInfoResults[0].data.children[0].data} fullText={true}/>
                    <CommentsCard data={postInfoResults[1]} />
                </div>
            </div>        
        );
    }    
}
