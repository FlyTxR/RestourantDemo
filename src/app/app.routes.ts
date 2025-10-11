import { Routes } from '@angular/router';
import { HomeComponent } from './vetrina/home/home.component';
import { MenuComponent } from './vetrina/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Roma Antica - Home'
    },
    {
        path: 'menu',
        component: MenuComponent,
        title: 'Roma Antica - Menù'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
