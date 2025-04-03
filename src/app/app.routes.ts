import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AdoptionComponent } from './components/adoption/adoption.component';

export const routes: Routes = [
    {
        path: 'search', component: SearchComponent
    },
    {
        path: 'adopt', component: AdoptionComponent
    },
    {
        path: '', redirectTo: 'search', pathMatch: 'full'
    }
];
