import { useSelector } from 'react-redux';
import { selectSidebarResults, selectSidebarStatus, selectSidebarError } from '../features/sidebarSlice';
import { SubredditCard } from '../components/SubredditCard';
import { UilSpinnerAlt, UilSyncExclamation} from '@iconscout/react-unicons'
import styles from './Sidebar.module.css'



export function Sidebar() {
    const sidebarResults = useSelector(selectSidebarResults);
    const sidebarStatus = useSelector(selectSidebarStatus);
    const sidebarError = useSelector(selectSidebarError);

    if (sidebarStatus === 'loading') {
        return (
            <div>
                < UilSpinnerAlt size={100} color='#D42B2B'/>
                <p>Cargando...</p>
            </div>
            );
    }
        
    if (sidebarStatus === 'error') {
        return (
        <div>
            < UilSyncExclamation size={100} color='#D42B2B'/>
            <p>Hubo un error: {sidebarError}</p>
        </div>
        );
    }
        
    if (sidebarStatus === 'fulfilled') {
        return (
        <div className={styles.gridSidebar}>
            {sidebarResults.map((result) => (
            <SubredditCard key={result.id} data={result} />
            ))}
        </div>
        );
    }
}
