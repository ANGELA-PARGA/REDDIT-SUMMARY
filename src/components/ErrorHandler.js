import { UilSyncExclamation} from '@iconscout/react-unicons'

export function ErrorHandler({errorData}){
    return (
        <div>
            <UilSyncExclamation size={100} color='#D42B2B'/> 
            <p>There was an error: {errorData.message}</p>
            <p>Status: {errorData.status} - {errorData.errorType}</p>
            <p>We are trying to fix it...Please try again later</p>
        </div>
    )
}