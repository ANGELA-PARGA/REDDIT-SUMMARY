import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    selectAfter,
    selectCount,
    selectBefore
} from './bestPostsSlice'
import {increment, decrement} from './bestPostsSlice'
import { PostCard } from "../../components/post_cards/PostCard"
import styles from '../ContainerStyles.module.css'

export function BestPosts({bestPosts}){
    const dispatch = useDispatch()    
    const after = useSelector(selectAfter)
    const before = useSelector (selectBefore) 
    const count = useSelector(selectCount)


    return(
        <div className={styles.loadInfo}>
                <div className={styles.buttonsContainer}>
                    <div>
                        <Link onClick={() => dispatch(decrement())} 
                            to={`?before=${before}&count=${Math.max(0, (count - 25)).toString()}`} 
                            className={count > 0 ? styles.linkButtons : styles.disable}> Previous
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
                    {bestPosts.map((post) => (
                        <Link 
                            className={styles.link} 
                            key={post.data.id} 
                            to={`post/r/${post.data.subreddit}/comments/${post.data.id}/${post.data.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')}/`}
                        >
                            <PostCard key={post.data.id} data={post.data} />
                        </Link>          
                    ))}
                </div>
            </div>      
    )
}