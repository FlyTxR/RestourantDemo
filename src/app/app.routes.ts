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
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
        //canActivate: [authGuard] // ← Protezione (dopo)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
