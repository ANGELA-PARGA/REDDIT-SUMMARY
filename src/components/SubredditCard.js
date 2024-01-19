import { UilImageBlock } from '@iconscout/react-unicons'
import styles from './SubredditCard.module.css'

export function SubredditCard({data}){
    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>
                {!data.icon_img ? <UilImageBlock size={32} color='#D42B2B'/>: <img src={data.icon_img} alt="icon" />}
                <p className={styles.subredditName}>{data.display_name_prefixed}</p> 
            </div>
            <div className={styles.text}>
                {!data.public_description ? <p>No description provided </p>:<p>{data.public_description}</p>}
            </div>
        </div>
    )
}