import { UilSyncExclamation} from '@iconscout/react-unicons'
import styles from './ErrorHandler.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { resetCount } from '../../features/bestPosts/bestPostsSlice';
import {resetCountInSearch} from '../../features/searchResults/searchResultsSlice'

export function ErrorHandler({errorData}){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleOnClick(){
        dispatch(resetCount())
        dispatch(resetCountInSearch())
        navigate('/');        
    }

    return (
        <div className={styles.errorDiv}>
            <div><UilSyncExclamation size={100} color='#D42B2B'/> </div>
            <h3 className={styles.messageText}>There was an error</h3>
            <p className={styles.statusText}><span>{errorData}</span></p>
            <p className={styles.messageText}>We are trying to fix it. Please return to homepage.</p>
            <h1 className={styles.retryh1}onClick={handleOnClick}> RedTrack </h1>
        </div>
    )
}