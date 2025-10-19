import { Component, OnInit } from '@angular/core';

interface SummaryCard {
  label: string;
  value: string;
  change: number;
  icon: string;
  iconBg: string;
}

interface Booking {
  id: number;
  customer: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  statusLabel: string;
}

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

interface TimeSlot {
  time: string;
  booked: number;
  capacity: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Summary Cards Data
  summaryCards: SummaryCard[] = [
    {
      label: 'Ordini Totali',
      value: '1,847',
      change: 12.5,
      icon: '📦',
      iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      label: 'Ricavi (Mese)',
      value: '€ 42,350',
      change: 8.3,
      icon: '💰',
      iconBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      label: 'Prenotazioni Oggi',
      value: '23',
      change: -3.2,
      icon: '📅',
      iconBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      label: 'Clienti Attivi',
      value: '584',
      change: 15.7,
      icon: '👥',
      iconBg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  // Calendar Data
  selectedDate = {
    day: '19',
    month: 'OTT'
  };

  todayBookingsCount = 23;

  timeSlots: TimeSlot[] = [
    { time: '12:00', booked: 8, capacity: 10 },
    { time: '12:30', booked: 10, capacity: 10 },
    { time: '13:00', booked: 7, capacity: 10 },
    { time: '19:00', booked: 9, capacity: 10 },
    { time: '19:30', booked: 10, capacity: 10 },
    { time: '20:00', booked: 6, capacity: 10 }
  ];

  // Gallery Images
  galleryImages: GalleryImage[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      alt: 'Piatto gourmet con presentazione elegante'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      alt: 'Pizza napoletana tradizionale'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      alt: 'Hamburger gourmet con patatine'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
      alt: 'Pasta fresca fatta in casa'
    }
  ];

  // Recent Bookings
  recentBookings: Booking[] = [
    {
      id: 1,
      customer: 'Mario Rossi',
      date: '19/10/2025',
      time: '20:00',
      guests: 4,
      status: 'confirmed',
      statusLabel: 'Confermata'
    },
    {
      id: 2,
      customer: 'Laura Bianchi',
      date: '19/10/2025',
      time: '19:30',
      guests: 2,
      status: 'pending',
      statusLabel: 'In Attesa'
    },
    {
      id: 3,
      customer: 'Giovanni Verdi',
      date: '20/10/2025',
      time: '12:30',
      guests: 6,
      status: 'confirmed',
      statusLabel: 'Confermata'
    },
    {
      id: 4,
      customer: 'Anna Neri',
      date: '20/10/2025',
      time: '21:00',
      guests: 3,
      status: 'cancelled',
      statusLabel: 'Annullata'
    },
    {
      id: 5,
      customer: 'Paolo Gialli',
      date: '21/10/2025',
      time: '13:00',
      guests: 5,
      status: 'confirmed',
      statusLabel: 'Confermata'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('Dashboard initialized');
  }

  // Metodo test originale (conservato)
  test(): void {
    console.log('Test button clicked!');
    alert('Funzione test() eseguita con successo! 🎉');
  }

  // Header Actions
  onNewBooking(): void {
    console.log('Nuova prenotazione cliccata');
    alert('Apertura form nuova prenotazione...');
  }

  // Calendar Actions
  previousDay(): void {
    console.log('Giorno precedente');
    // Logica per cambiare giorno (da implementare con Date)
  }

  nextDay(): void {
    console.log('Giorno successivo');
    // Logica per cambiare giorno (da implementare con Date)
  }

  // Quick Actions
  onAddDish(): void {
    console.log('Aggiungi piatto cliccato');
    alert('Apertura form nuovo piatto...');
  }

  onManageCategories(): void {
    console.log('Gestisci categorie cliccato');
    alert('Apertura gestione categorie...');
  }

  onUploadImages(): void {
    console.log('Carica immagini cliccato');
    alert('Apertura upload immagini...');
  }

  // Gallery Actions
  onEditImage(image: GalleryImage): void {
    console.log('Modifica immagine:', image);
    alert(`Modifica immagine: ${image.alt}`);
  }

  onDeleteImage(image: GalleryImage): void {
    console.log('Elimina immagine:', image);
    if (confirm(`Vuoi davvero eliminare "${image.alt}"?`)) {
      this.galleryImages = this.galleryImages.filter(img => img.id !== image.id);
      alert('Immagine eliminata');
    }
  }

  // Booking Actions
  onViewBooking(booking: Booking): void {
    console.log('Visualizza prenotazione:', booking);
    alert(`
      Dettaglio Prenotazione #${booking.id}
      
      Cliente: ${booking.customer}
      Data: ${booking.date}
      Ora: ${booking.time}
      Ospiti: ${booking.guests}
      Stato: ${booking.statusLabel}
    `);
  }

  // Settings Actions
  onSettingsGeneral(event: Event): void {
    event.preventDefault();
    console.log('Impostazioni generali');
    alert('Navigazione a Impostazioni Generali...');
  }

  onSettingsContact(event: Event): void {
    event.preventDefault();
    console.log('Impostazioni contatti');
    alert('Navigazione a Impostazioni Contatti...');
  }

  onSettingsUsers(event: Event): void {
    event.preventDefault();
    console.log('Impostazioni utenti');
    alert('Navigazione a Gestione Utenti...');
  }
}