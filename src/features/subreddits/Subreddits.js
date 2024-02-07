import { Link } from 'react-router-dom';
import { SubredditCard } from '../../components/subreddit_cards/SubredditCard';
import styles from '../ContainerStyles.module.css'

export function Subreddits({subreddits}){

    return(
        <div className={styles.gridSidebar}>
            {subreddits.map((subreddit) => (
                <Link 
                    className={styles.link} 
                    key={subreddit.data.id} 
                    to={`/r/${subreddit.data.display_name}/`}
                >
                    <SubredditCard key={subreddit.data.id} data={subreddit.data} />
                </Link>
            ))}
        </div>
    )
}