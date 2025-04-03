import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AdoptionComponent } from './components/adoption/adoption.component';

export const routes: Routes = [
    {
        path: 'search', component: SearchComponent
    },
    {
        path: 'adopt', loadComponent:()=> 
            import('./components/adoption/adoption.component').then(m=>m.AdoptionComponent)
    },
    {
        path: '', redirectTo: 'search', pathMatch: 'full'
    }
];
