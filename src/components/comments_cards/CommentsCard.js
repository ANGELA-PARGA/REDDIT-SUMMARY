import { UilImageBlock } from '@iconscout/react-unicons'
import styles from './CommentsCard.module.css'
import { UilAnalysis } from '@iconscout/react-unicons'

export function CommentsCard({data}){

    const comments = data.data.children;

    return (
        <>
        {comments.map((comment) => (
            <div className={styles.card} key={comment.data.id}>
            <div className={styles.cardInfo}>
                <UilImageBlock size={32} color='#D42B2B' />
                <p>{comment.data.author}</p>
                <p>{comment.data.created_utc}</p>
            </div>
            <p className={styles.text}>{comment.data.body}</p>
            <div className={styles.cardInfo}>
                <div>
                <UilAnalysis size={20} color='#D42B2B' />
                <p>
                    <span>{comment.data.score}</span> votes
                </p>
                </div>
            </div>
            </div>
        ))}
        </>
    );
}