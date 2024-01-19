import { useSelector } from 'react-redux';
import { selectSidebarResults, selectSidebarStatus, selectSidebarError } from '../features/sidebarSlice';
import { SubredditCard } from '../components/SubredditCard';


export function Sidebar() {
    const sidebarResults = useSelector(selectSidebarResults);
    const sidebarStatus = useSelector(selectSidebarStatus);
    const sidebarError = useSelector(selectSidebarError);

    if (sidebarStatus === 'loading') {
        return (
            <div>
                <img src="ruta/a/imagen-de-carga.gif" alt="Cargando..." />
                <p>Cargando...</p>
            </div>
            );
    }
        
    if (sidebarStatus === 'error') {
        return (
        <div>
            <p>Hubo un error: {sidebarError}</p>
        </div>
        );
    }
        
    if (sidebarStatus === 'fulfilled') {
        return (
        <>
            {sidebarResults.map((result) => (
            <SubredditCard key={result.id} data={result} />
            ))}
        </>
        );
    }
}
