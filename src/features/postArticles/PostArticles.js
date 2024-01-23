import { useSelector } from 'react-redux';
import { selectPostInfoResults, selectPostInfoStatus, selectPostInfoError} from './postArticlesSlice';
import {PostCard} from "../../components/post_cards/PostCard"
import {CommentsCard} from "../../components/comments_cards/CommentsCard"
import { UilSpinnerAlt, UilSyncExclamation} from '@iconscout/react-unicons'
import styles from './PostArticles.module.css'


export function PostArticles() {    

    const postInfoResults = useSelector(selectPostInfoResults);
    console.log(postInfoResults)
    const postInfoStatus = useSelector(selectPostInfoStatus);
    const postInfoError = useSelector(selectPostInfoError);
    
    if (postInfoStatus === 'loading') {
        return (
            <div>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <p>Loading the poooost...</p>
            </div>
            );
    }
        
    if (postInfoStatus === 'error') {
        return (
        <div>
            <UilSyncExclamation size={100} color='#D42B2B'/> 
            <p>There was an error: {postInfoError}</p>
            <p>We are trying to fix it...Please try again later</p>
        </div>
        );
    }
        
    if (postInfoStatus === 'fulfilled') {

        return (
        <div className={styles.gridResult}>
            <PostCard data={postInfoResults[0].data.children[0].data}/>
            <CommentsCard data={postInfoResults[1]} />
        </div>
        );
    }
    
}
