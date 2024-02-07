import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectSearchPostsResults, 
        selectAfter,
        selectBefore,
        selectCountInSearch,
        selectSearchTerm } from './searchResultsSlice';
import { increment, decrement } from './searchResultsSlice';
import { PostCard } from "../../components/post_cards/PostCard"
import styles from '../ContainerStyles.module.css'

export function SearchResults({results}){
    const dispatch = useDispatch();
    const searchPostResults = useSelector(selectSearchPostsResults);
    const searchTerm = useSelector(selectSearchTerm)
    const after = useSelector(selectAfter)
    const before = useSelector(selectBefore)
    const count = useSelector(selectCountInSearch)

    return(
        <div className={styles.loadInfo}>
            <div className={styles.buttonsContainer}>
                <div > 
                    <Link onClick={() => dispatch(decrement())} 
                        to={`/search?q=${searchTerm}&before=${before}&count=${Math.max(0, (count - 25)).toString()}`} 
                        className={count > 0 ? styles.linkButtons : styles.disable}> Previous
                    </Link>
                </div>
                <div>
                    <Link 
                        onClick={() => dispatch(increment())}
                        to={`/search?q=${searchTerm}&after=${after}&count=${count.toString()}`}
                        className={styles.linkButtons}> Next
                    </Link>
                </div>
            </div>
            <div className={styles.gridResult}>
                {searchPostResults.map((searchResult) => (
                    <Link 
                        className={styles.link} 
                        key={searchResult.data.id} 
                        to={`/post/r/${searchResult.data.subreddit}/comments/${searchResult.data.id}/${searchResult.data.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')}/`}
                    >
                        <PostCard key={searchResult.data.id} data={searchResult.data} />
                    </Link>          
                ))}
            </div>
        </div>
    )
}
