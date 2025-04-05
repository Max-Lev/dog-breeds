import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { GetBreedsResolver } from './core/resolvers/get-breeds.resolver';

export const routes: Routes = [
    {
        path: 'search', component: SearchComponent,
        resolve: {
            breeds: GetBreedsResolver
        },
        data: { reuseComponent: true }
    },
    {
        path: 'adopt', loadComponent: () =>
            import('./components/adoption/adoption.component').then(m => m.AdoptionComponent),
        data: { reuseComponent: true }
    },
    {
        path: '', redirectTo: 'search', pathMatch: 'full'
    }
];
