import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChildren('slide') slideElements!: QueryList<ElementRef>;
  @ViewChildren('dot') dotElements!: QueryList<ElementRef>;

  currentSlide = 0;
  slideInterval: any;
  lastScroll = 0;
  
  slides = [
    {
      url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
      alt: 'Ristorante elegante'
    },
    {
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
      alt: 'Ambiente raffinato'
    },
    {
      url: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=1920&q=80',
      alt: 'Piatti gourmet'
    },
    {
      url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80',
      alt: 'Cucina stellata'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
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

  showSlide(n: number): void {
    this.currentSlide = (n + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.showSlide(this.currentSlide + 1);
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  goToSlide(index: number): void {
    this.showSlide(index);
  }

  navigateToBooking(): void {
    this.router.navigate(['/prenotazioni']);
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
