import { Routes } from '@angular/router';
import { GetBreedsResolver } from './core/resolvers/get-breeds.resolver';

export const routes: Routes = [
    {
        path: 'search',
        loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent),
        resolve: { breeds: GetBreedsResolver },
        data: { reuseComponent: true }
    },
    {
        path: 'adopt',
        loadComponent: () => import('./features/adoption/adoption.component').then(m => m.AdoptionComponent),
        data: { reuseComponent: true }
    },
    {
        path: '', redirectTo: 'search', pathMatch: 'full'
    }
];
