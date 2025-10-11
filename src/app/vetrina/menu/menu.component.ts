import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  allergens?: string;
  vegetarian?: boolean;
  recommended?: boolean;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  lastScroll = 0;
  selectedCategory = 'antipasti';

  categories = [
    { id: 'antipasti', label: 'Antipasti' },
    { id: 'primi', label: 'Primi Piatti' },
    { id: 'secondi', label: 'Secondi Piatti' },
    { id: 'contorni', label: 'Contorni' },
    { id: 'dolci', label: 'Dolci' }
  ];

  menuData: { [key: string]: MenuCategory } = {
    antipasti: {
      title: 'Antipasti',
      items: [
        {
          name: 'Supplì al Telefono',
          description: 'Classici supplì romani con cuore filante di mozzarella',
          price: '8',
          recommended: true
        },
        {
          name: 'Fiori di Zucca',
          description: 'Fritti in pastella croccante con alici e mozzarella',
          price: '12',
          allergens: 'Glutine, Pesce, Latticini'
        },
        {
          name: 'Carciofi alla Giudia',
          description: 'Carciofi romaneschi fritti secondo tradizione',
          price: '14',
          vegetarian: true,
          recommended: true
        },
        {
          name: 'Bruschette Miste',
          description: 'Selezione di bruschette con pomodoro, funghi e tartufo',
          price: '10',
          allergens: 'Glutine',
          vegetarian: true
        }
      ]
    },
    primi: {
      title: 'Primi Piatti',
      items: [
        {
          name: 'Carbonara',
          description: 'Guanciale croccante, pecorino romano DOP e tuorlo d\'uovo',
          price: '16',
          allergens: 'Glutine, Uova, Latticini',
          recommended: true
        },
        {
          name: 'Cacio e Pepe',
          description: 'La semplicità perfetta: pecorino romano e pepe nero',
          price: '14',
          allergens: 'Glutine, Latticini',
          recommended: true
        },
        {
          name: 'Amatriciana',
          description: 'Guanciale, pomodoro San Marzano e pecorino romano',
          price: '15',
          allergens: 'Glutine, Latticini'
        },
        {
          name: 'Gricia',
          description: 'La carbonara bianca: guanciale croccante e pecorino',
          price: '15',
          allergens: 'Glutine, Latticini'
        },
        {
          name: 'Rigatoni con la Pajata',
          description: 'Piatto tradizionale romano con interiora di vitello',
          price: '18',
          allergens: 'Glutine, Latticini'
        }
      ]
    },
    secondi: {
      title: 'Secondi Piatti',
      items: [
        {
          name: 'Saltimbocca alla Romana',
          description: 'Scaloppine di vitello con prosciutto crudo e salvia',
          price: '22',
          recommended: true
        },
        {
          name: 'Abbacchio Scottadito',
          description: 'Costolette d\'agnello alla griglia',
          price: '26',
          recommended: true
        },
        {
          name: 'Coda alla Vaccinara',
          description: 'Coda di bue stufata con pomodoro e sedano',
          price: '24'
        },
        {
          name: 'Pollo alla Romana',
          description: 'Pollo con peperoni, pomodoro e vino bianco',
          price: '20'
        },
        {
          name: 'Filetto di Branzino',
          description: 'Branzino al forno con erbe aromatiche',
          price: '24',
          allergens: 'Pesce'
        }
      ]
    },
    contorni: {
      title: 'Contorni',
      items: [
        {
          name: 'Puntarelle alla Romana',
          description: 'Con salsa di alici e aglio',
          price: '7',
          allergens: 'Pesce',
          vegetarian: false
        },
        {
          name: 'Cicoria Ripassata',
          description: 'Cicoria saltata con aglio e peperoncino',
          price: '6',
          vegetarian: true
        },
        {
          name: 'Patate al Forno',
          description: 'Croccanti patate arrosto con rosmarino',
          price: '6',
          vegetarian: true
        },
        {
          name: 'Insalata Mista',
          description: 'Verdure fresche di stagione',
          price: '5',
          vegetarian: true
        }
      ]
    },
    dolci: {
      title: 'Dolci',
      items: [
        {
          name: 'Tiramisù',
          description: 'Classico tiramisù fatto in casa',
          price: '8',
          allergens: 'Glutine, Uova, Latticini',
          recommended: true
        },
        {
          name: 'Panna Cotta',
          description: 'Con coulis di frutti di bosco',
          price: '7',
          allergens: 'Latticini'
        },
        {
          name: 'Maritozzo con la Panna',
          description: 'Soffice brioche romana farcita con panna montata',
          price: '6',
          allergens: 'Glutine, Uova, Latticini'
        },
        {
          name: 'Crostata di Ricotta e Visciole',
          description: 'Dolce tradizionale romano',
          price: '8',
          allergens: 'Glutine, Uova, Latticini',
          recommended: true
        }
      ]
    }
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
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

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
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