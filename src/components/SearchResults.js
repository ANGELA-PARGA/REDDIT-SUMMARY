import { useSelector } from 'react-redux';
import { selectSearchResults, selectSearchStatus, selectSearchError } from '../features/search/searchSlice';
import {PostCard} from "./PostCard"
import { UilSpinnerAlt, UilSyncExclamation} from '@iconscout/react-unicons'


export function SearchResults() {
    const searchResults = useSelector(selectSearchResults);
    const searchStatus = useSelector(selectSearchStatus);
    const searchError = useSelector(selectSearchError);

    if (searchStatus === 'loading') {
        return (
            <div>
                <UilSpinnerAlt size={100} color='#D42B2B'/> 
                <p>Cargando...</p>
            </div>
            );
    }
        
    if (searchStatus === 'error') {
        return (
        <div>
            <UilSyncExclamation size={100} color='#D42B2B'/> 
            <p>Hubo un error: {searchError}</p>
            <p>Por favor intenté más tarde</p>
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
