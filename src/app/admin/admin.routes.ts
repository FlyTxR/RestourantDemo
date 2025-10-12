import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },

      // Menu Management
      {
        path: 'menu/list',
        loadComponent: () => import('./pages/menu/menu-list/menu-list.component').then(m => m.MenuListComponent)
      },
      {
        path: 'menu/categories',
        loadComponent: () => import('./pages/menu/menu-categories/menu-categories.component').then(m => m.MenuCategoriesComponent)
      },
      {
        path: 'menu/add',
        loadComponent: () => import('./pages/menu/menu-add/menu-add.component').then(m => m.MenuAddComponent)
      },

      // Bookings
      {
        path: 'bookings/list',
        loadComponent: () => import('./pages/bookings/bookings-list/bookings-list.component').then(m => m.BookingsListComponent)
      },
      {
        path: 'bookings/calendar',
        loadComponent: () => import('./pages/bookings/bookings-calendar/bookings-calendar.component').then(m => m.BookingsCalendarComponent)
      },
      {
        path: 'bookings/settings',
        loadComponent: () => import('./pages/bookings/bookings-settings/bookings-settings.component').then(m => m.BookingsSettingsComponent)
      },

      // Gallery
      {
        path: 'gallery',
        loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent)
      },

      // Content Management
      {
        path: 'content/home',
        loadComponent: () => import('./pages/content/content-home/content-home.component').then(m => m.ContentHomeComponent)
      },
      {
        path: 'content/storia',
        loadComponent: () => import('./pages/content/content-storia/content-storia.component').then(m => m.ContentStoriaComponent)
      },
      {
        path: 'content/slider',
        loadComponent: () => import('./pages/content/content-slider/content-slider.component').then(m => m.ContentSliderComponent)
      },

      // Settings
      {
        path: 'settings/general',
        loadComponent: () => import('./pages/settings/settings-general/settings-general.component').then(m => m.SettingsGeneralComponent)
      },
      {
        path: 'settings/contact',
        loadComponent: () => import('./pages/settings/settings-contact/settings-contact.component').then(m => m.SettingsContactComponent)
      },
      {
        path: 'settings/users',
        loadComponent: () => import('./pages/settings/settings-users/settings-users.component').then(m => m.SettingsUsersComponent)
      },

      // Analytics
      {
        path: 'analytics',
        loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },

      // Default redirect
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
