import styles from './CommentsCard.module.css'
import { UilAnalysis, UilUserCircle } from '@iconscout/react-unicons'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

export function CommentReplies({replies}){
    return (
        <div className={styles.repliesDiv} key={replies.id}>
            {replies.map((reply)=> (
                <div className={styles.reply} key={reply.id}>
                    <div className={styles.cardInfo}>
                        <UilUserCircle size={32} color='#D42B2B' />
                        <p>{reply.data.author}</p>
                        <p>{moment.unix(reply.data.created_utc).fromNow()}</p>
                    </div>
                    <div className={styles.text}><ReactMarkdown>{reply.data.body}</ReactMarkdown></div>
                    <div className={styles.cardInfo}>
                        <div className={styles.footerInfo}>
                            <div><UilAnalysis size={20} color='#D42B2B' /></div>
                            <p><span>{reply.data.score}</span> votes</p>
                        </div>
                    </div>
                </div>            
            ))}
        </div>
    )
}