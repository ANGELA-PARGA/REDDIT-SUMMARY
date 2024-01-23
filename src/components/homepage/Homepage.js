import React from 'react';
import styles from './Homepage.module.css';
import { SearchResults } from '../search_results/SearchResults'
import { Sidebar } from '../../features/sidebar/Sidebar'


export function Homepage() {
    return (    
        <div className={styles.mainInfo}>
            <SearchResults />
            <Sidebar />
        </div>
    )
}