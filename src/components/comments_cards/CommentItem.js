import { useState } from 'react'
import styles from './CommentsCard.module.css'
import { UilAnalysis, UilUserCircle } from '@iconscout/react-unicons'
import moment from 'moment'
import { CommentReplies } from './CommentReplies'
import ReactMarkdown from 'react-markdown'

export function CommentItem({comment}){
    const [displayReplies, setDisplayReplies] = useState(false)

    function handleShowReplies(){
        setDisplayReplies(!displayReplies)
    }

    return (        
        <div className={styles.card} key={comment.data.id}>
            <div className={styles.cardInfo}>
                <UilUserCircle size={32} color='#D42B2B' />
                <p>{comment.data.author}</p>
                <p>{moment.unix(comment.data.created_utc).fromNow()}</p>
            </div>
            <div className={styles.text}><ReactMarkdown>{comment.data.body}</ReactMarkdown></div>
            <div className={styles.cardInfo}>
                <div className={styles.footerInfo}>
                    <div><UilAnalysis size={20} color='#D42B2B' /></div>
                    <p><span>{comment.data.score}</span> votes</p>
                </div>
                {comment.data.replies &&  
                    <p onClick={handleShowReplies} className={styles.showHideReply}>{displayReplies ? 'Hide Replies' : 'Show Replies'}</p>
                }
            </div>
            {displayReplies && comment.data.replies ? <CommentReplies replies={comment.data.replies.data.children}/> : <></>}
        </div>
        
    );
}