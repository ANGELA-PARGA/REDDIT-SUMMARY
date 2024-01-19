import { UilImageBlock } from '@iconscout/react-unicons'
import styles from './PostCard.module.css'

export function PostCard({data}){
    return (
        <div className={styles.card}>
            <div className={styles.cardInfo}>
                {!data.icon_img ? <UilImageBlock size={32} color='#D42B2B'/>: <img src={data.icon_img} alt="icon" />}
                <p>r/{data.subreddit_name_prefixed}</p>
                <p>Posted by: u/{data.author}</p>                
            </div>
            <h2>{data.title}</h2>
            <p className={styles.text}>{data.selftext}</p>
            <div className={styles.cardInfo}>
                <p>Comments: {data.num_comments}</p>
                <p>Votes: {data.score}</p>                
            </div>
        </div>
    )
}