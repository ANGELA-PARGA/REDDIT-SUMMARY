import styles from './CommentsCard.module.css'
import { UilAnalysis, UilUserCircle } from '@iconscout/react-unicons'
import moment from 'moment'

import ReactMarkdown from 'react-markdown'

export function CommentsCard({data}){

    const comments = data.data.children;

    return (
        <>
        {comments.map((comment) => (
            <div className={styles.card} key={comment.data.id}>
            <div className={styles.cardInfo}>
                <UilUserCircle size={32} color='#D42B2B' />
                <p>{comment.data.author}</p>
                <p>{moment.unix(comment.data.created_utc).fromNow()}</p>
            </div>
            <div className={styles.text}><ReactMarkdown>{comment.data.body}</ReactMarkdown></div>
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