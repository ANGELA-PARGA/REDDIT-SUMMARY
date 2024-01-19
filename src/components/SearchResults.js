import { useSelector } from 'react-redux';
import { selectSearchResults, selectSearchStatus, selectSearchError } from '../features/search/searchSlice';
import {PostCard} from "./PostCard"


export function SearchResults() {
    const searchResults = useSelector(selectSearchResults);
    const searchStatus = useSelector(selectSearchStatus);
    const searchError = useSelector(selectSearchError);

    if (searchStatus === 'loading') {
        return (
            <div>
                <img src="ruta/a/imagen-de-carga.gif" alt="Cargando..." />
                <p>Cargando...</p>
            </div>
            );
    }
        
    if (searchStatus === 'error') {
        return (
        <div>
            <p>Hubo un error: {searchError}</p>
        </div>
        );
    }
        
    if (searchStatus === 'fulfilled') {
        return (
        <div>
            {searchResults.map((result) => (
            <PostCard key={result.id} data={result} />
            ))}
        </div>
        );
    }
}
