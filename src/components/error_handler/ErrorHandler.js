import { UilSyncExclamation} from '@iconscout/react-unicons'
import styles from './ErrorHandler.module.css'

export function ErrorHandler({errorData}){
    return (
        <div className={styles.errorDiv}>
            <UilSyncExclamation size={100} color='#D42B2B'/> 
            <h3 className={styles.messageText}>There was an error</h3>
            <p className={styles.statusText}><span>{errorData}</span></p>
            <p className={styles.messageText}>We are trying to fix it...Please try again later</p>
        </div>
    )
}