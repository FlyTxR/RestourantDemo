import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryDTO, MenuItemDTO } from '../../models/menu-models';
import { ShowcaseService } from '../../services/showcase.service';

interface CategoryWithItems {
  category: CategoryDTO;
  items: MenuItemDTO[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  private router = inject(Router);
  private menuService = inject(ShowcaseService);

  // Signals per state management
  categories = signal<CategoryDTO[]>([]);
  menuItems = signal<MenuItemDTO[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  lastScroll = 0;
  selectedCategory = signal<number | null>(null);

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadMenuData();
  }

  loadMenuData(): void {
    this.loading.set(true);
    this.error.set(null);

    // Carica categorie
    this.menuService.getCategories().subscribe({
      next: (categories) => {
        // Ordina per displayOrder
        const sortedCategories = categories.sort((a, b) => a.displayOrder - b.displayOrder);
        this.categories.set(sortedCategories);

        // Imposta prima categoria come selezionata
        if (sortedCategories.length > 0) {
          this.selectedCategory.set(sortedCategories[0].id);
        }

        // Carica menu items
        this.loadAllMenuItems();
      },
      error: (err) => {
        this.error.set('Errore nel caricamento delle categorie');
        this.loading.set(false);
        console.error('Error loading categories:', err);
      }
    });
  }

  loadAllMenuItems(): void {
    this.menuService.getAllMenuItems().subscribe({
      next: (items) => {
        // Filtra solo items disponibili
        const availableItems = items.filter(item => item.isAvailable);
        this.menuItems.set(availableItems);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Errore nel caricamento del menu');
        this.loading.set(false);
        console.error('Error loading menu items:', err);
      }
    });
  }

  // Ritorna items per categoria specifica
  getItemsByCategory(categoryId: number): MenuItemDTO[] {
    return this.menuItems().filter(item => item.categoryId === categoryId);
  }

  // Raggruppa per categorie (per template alternativo)
  getCategoriesWithItems(): CategoryWithItems[] {
    return this.categories().map(category => ({
      category,
      items: this.getItemsByCategory(category.id)
    }));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const header = document.querySelector('header') as HTMLElement;
    const currentScroll = window.pageYOffset;

    if (header) {
      if (currentScroll > 100) {
        header.style.padding = '15px 0';
      } else {
        header.style.padding = '20px 0';
      }
    }

    this.lastScroll = currentScroll;
  }

  selectCategory(categoryId: number): void {
    this.selectedCategory.set(categoryId);
    const categorySlug = this.getCategorySlug(categoryId);
    const element = document.getElementById(categorySlug);
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }

  // Helper per creare slug da nome categoria
  getCategorySlug(categoryId: number): string {
    const category = this.categories().find(c => c.id === categoryId);
    return category ? category.name.toLowerCase().replace(/\s+/g, '-') : '';
  }

  hasImage(item: MenuItemDTO): boolean {
    return !!item.imageUrl && item.imageUrl.trim() !== '';
  }

  onImageError(event: any): void {
    // Placeholder se Base64 è corrotto o mancante
    // event.target.src = 'assets/images/placeholder-dish.jpg';
  }

  // Helper per formattare prezzo
  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToBooking(): void {
    this.router.navigate(['/prenotazioni']);
  }

  scrollToSection(sectionId: string): void {
    if (sectionId === 'home') {
      this.navigateToHome();
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
