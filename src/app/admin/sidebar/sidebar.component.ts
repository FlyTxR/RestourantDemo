import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = false;
  activeMenu = '';
  expandedMenus: Set<string> = new Set();
  isMobile = false;

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      route: '/admin/dashboard'
    },
    {
      id: 'menu',
      label: 'Gestione Menu',
      icon: '📋',
      route: '/admin/menu',
      children: [
        { id: 'menu-list', label: 'Lista Piatti', icon: '🍝', route: '/admin/menu/list' },
        { id: 'menu-categories', label: 'Categorie', icon: '📑', route: '/admin/menu/categories' },
        { id: 'menu-add', label: 'Aggiungi Piatto', icon: '➕', route: '/admin/menu/add' }
      ]
    },
    {
      id: 'bookings',
      label: 'Prenotazioni',
      icon: '📅',
      route: '/admin/bookings',
      children: [
        { id: 'bookings-list', label: 'Tutte le Prenotazioni', icon: '📋', route: '/admin/bookings/list' },
        { id: 'bookings-calendar', label: 'Calendario', icon: '🗓️', route: '/admin/bookings/calendar' },
        { id: 'bookings-settings', label: 'Impostazioni', icon: '⚙️', route: '/admin/bookings/settings' }
      ]
    },
    {
      id: 'gallery',
      label: 'Galleria',
      icon: '🖼️',
      route: '/admin/gallery'
    },
    {
      id: 'content',
      label: 'Contenuti Sito',
      icon: '📄',
      route: '/admin/content',
      children: [
        { id: 'content-home', label: 'Home Page', icon: '🏠', route: '/admin/content/home' },
        { id: 'content-storia', label: 'La Nostra Storia', icon: '📖', route: '/admin/content/storia' },
        { id: 'content-slider', label: 'Slider Immagini', icon: '🎞️', route: '/admin/content/slider' }
      ]
    },
    {
      id: 'settings',
      label: 'Impostazioni',
      icon: '⚙️',
      route: '/admin/settings',
      children: [
        { id: 'settings-general', label: 'Generali', icon: '🔧', route: '/admin/settings/general' },
        { id: 'settings-contact', label: 'Contatti & Orari', icon: '📞', route: '/admin/settings/contact' },
        { id: 'settings-users', label: 'Utenti', icon: '👥', route: '/admin/settings/users' }
      ]
    },
    {
      id: 'analytics',
      label: 'Statistiche',
      icon: '📈',
      route: '/admin/analytics'
    }
  ];

  constructor(private router: Router) {
    // Imposta il menu attivo in base alla route corrente
    this.activeMenu = this.router.url;
    
    // Verifica se è mobile
    this.checkIfMobile();
    
    // Imposta lo stato iniziale in base alle dimensioni dello schermo
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  ngOnInit() {
    // Ascolta i cambiamenti di dimensione della finestra
    window.addEventListener('resize', () => {
      this.checkIfMobile();
    });
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 1024;
    
    // Se passiamo da desktop a mobile, chiudi la sidebar
    if (this.isMobile && !this.isCollapsed) {
      this.isCollapsed = true;
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    
    // Quando si minimizza la sidebar, chiudi tutti i menu espansi
    if (this.isCollapsed) {
      this.expandedMenus.clear();
    }
  }

  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  toggleMenu(menuId: string, hasChildren: boolean) {
    // Se la sidebar è collassata e il menu ha figli, espandi la sidebar
    if (this.isCollapsed && hasChildren) {
      this.isCollapsed = false;
      // Dopo aver espanso la sidebar, apri il menu
      setTimeout(() => {
        if (this.expandedMenus.has(menuId)) {
          this.expandedMenus.delete(menuId);
        } else {
          this.expandedMenus.add(menuId);
        }
      }, 100);
    } else {
      // Comportamento normale
      if (this.expandedMenus.has(menuId)) {
        this.expandedMenus.delete(menuId);
      } else {
        this.expandedMenus.add(menuId);
      }
    }
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus.has(menuId);
  }

  navigateTo(route: string, menuId: string) {
    this.activeMenu = route;
    this.router.navigate([route]);
    
    // Chiudi la sidebar su mobile dopo la navigazione
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  isActive(route: string): boolean {
    return this.activeMenu === route || this.router.url === route;
  }

  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  logout() {
    // Implementa la logica di logout
    console.log('Logout');
    this.router.navigate(['/']);
  }
}