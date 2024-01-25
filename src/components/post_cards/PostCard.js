import { UilImageBlock } from '@iconscout/react-unicons'
import styles from './PostCard.module.css'
import { UilCommentChartLine } from '@iconscout/react-unicons'
import { UilAnalysis } from '@iconscout/react-unicons'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'


export function PostCard({data, fullText}){
    const [load, setLoad] = useState(true)
    const media = data.secure_media && data.secure_media.reddit_video?.fallback_url;

    function isValidImageURL(url) {
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
        const lowercasedURL = url.toLowerCase();
        return imageExtensions.some(ext => lowercasedURL.endsWith(ext));
    }

    function handleOnError(){
        setLoad(false)
    }

    return (
        <div className={`${styles.card} ${fullText ? styles.fullText : ''}`}>
            <div className={styles.cardInfo}>
                {!data.icon_img ? <UilImageBlock size={32} color='#D42B2B'/>: <img src={data.icon_img} alt="icon" />}
                <p>r/{data.subreddit_name_prefixed}</p>
                <p><span>Posted by:</span> u/{data.author}</p>                
            </div>
            <h2>{data.title}</h2>
            { data.url && isValidImageURL(data.url) ? 
                <div className={styles.thumbnail}>
                    <img src={data.url} alt='embded'></img> 
                </div> : 
                <div className={styles.embdedInfo}>
                    {!data.thumbnail ? <></> : 
                    <img src={data.thumbnail} 
                        alt="thumbnail" 
                        onError={handleOnError}  
                        style={{ display: load ? 'block' : 'none' }}
                    />}
                    {!load && media ?  
                    <video src={media} controls className={styles.videoPlayer}></video> :
                    <></>
                    }
                    <a href={data.url_overridden_by_dest} 
                        target="_blank" 
                        rel="noopener noreferrer">{data.url_overridden_by_dest}
                    </a>
                </div> 
            }
            <div className={styles.text}>
                <ReactMarkdown>{data.selftext}</ReactMarkdown>
            </div>
            <div className={styles.cardInfo}>
                <div>
                    <UilCommentChartLine size={20} color='#D42B2B'/>
                    <p><span>{data.num_comments}</span> comments</p>
                </div>
                <div>
                    <UilAnalysis size={20} color='#D42B2B'/>
                    <p><span>{data.score}</span> votes</p> 
                </div>               
            </div>
        </div>
        
    )
}