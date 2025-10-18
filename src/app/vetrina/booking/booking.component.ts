import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { CreateBookingDTO } from '../../models/booking.models';
import { BookingService } from '../../services/bookings.service';
import { CustomDatePickerComponent } from "../../custom/custom-date-picker/custom-date-picker.component";

interface TimeSlot {
  time: string;
  available: boolean;
  spotsLeft?: number;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDatePickerComponent],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  private bookingService = inject(BookingService);
  router = inject(Router);

  // Form state
  booking = signal<CreateBookingDTO>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    date: '',
    time: '',
    numberOfGuests: 2,
    specialRequests: ''
  });

  // UI state
  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);
  currentStep = signal(1);
  loadingSlots = signal(false);

  // Available time slots with availability
  timeSlots = signal<TimeSlot[]>([]);

  // Fallback static times
  staticTimes = [
    '12:00', '12:30', '13:00', '13:30', '14:00',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  // Guest options
  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Computed available times for display
  availableTimes = computed(() => this.timeSlots().map(slot => slot.time));

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.setMinDate();
  }

  setMinDate(): void {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    this.booking.update(b => ({ ...b, date: minDate }));
    
    // Load slots for today
    this.loadAvailableSlots();
  }

  updateField(field: keyof CreateBookingDTO, value: any): void {
    this.booking.update(b => ({ ...b, [field]: value }));
    this.error.set(null);

    // Reload slots when date or guests change
    if (field === 'date' || field === 'numberOfGuests') {
      this.loadAvailableSlots();
    }
  }

  loadAvailableSlots(): void {
    const date = this.booking().date;
    const guests = this.booking().numberOfGuests;

    if (!date) return;

    this.loadingSlots.set(true);
    this.timeSlots.set([]);

    // Simula chiamata API (sostituisci con vera chiamata)
    setTimeout(() => {
      // DEMO: Genera slot fittizi con disponibilità random
      const slots: TimeSlot[] = this.staticTimes.map(time => {
        const random = Math.random();
        return {
          time,
          available: random > 0.3, // 70% disponibili
          spotsLeft: random > 0.3 ? Math.floor(Math.random() * 10) + 1 : 0
        };
      });

      this.timeSlots.set(slots);
      this.loadingSlots.set(false);
    }, 800);

    /* VERA IMPLEMENTAZIONE CON BACKEND:
    this.bookingService.getAvailableTimeSlots(date, guests).subscribe({
      next: (slots) => {
        this.timeSlots.set(slots);
        this.loadingSlots.set(false);
      },
      error: (err) => {
        console.error('Errore caricamento slot:', err);
        // Fallback a slot statici
        const fallbackSlots = this.staticTimes.map(time => ({
          time,
          available: true,
          spotsLeft: undefined
        }));
        this.timeSlots.set(fallbackSlots);
        this.loadingSlots.set(false);
      }
    });
    */
  }

  getSlotInfo(time: string): TimeSlot | undefined {
    return this.timeSlots().find(slot => slot.time === time);
  }

  isTimeAvailable(time: string): boolean {
    const slot = this.getSlotInfo(time);
    return slot?.available ?? true;
  }

  selectTime(time: string): void {
    const slot = this.getSlotInfo(time);
    
    if (slot && !slot.available) {
      this.error.set(`Spiacenti, l'orario ${time} è già al completo per questa data.`);
      return;
    }

    this.updateField('time', time);
    this.error.set(null);
  }

  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  }

  isStepValid(step: number): boolean {
    const b = this.booking();
    switch (step) {
      case 1:
        return !!b.date && !!b.time;
      case 2:
        return b.numberOfGuests > 0;
      case 3:
        return !!(b.customerName && b.customerEmail && b.customerPhone);
      default:
        return false;
    }
  }

  nextStep(): void {
    if (this.isStepValid(this.currentStep())) {
      this.currentStep.update(s => s + 1);
      this.error.set(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.error.set('Compila tutti i campi richiesti per continuare');
    }
  }

  prevStep(): void {
    this.currentStep.update(s => Math.max(1, s - 1));
    this.error.set(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submitBooking(): void {
    if (!this.isStepValid(3)) {
      this.error.set('Compila tutti i campi obbligatori');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.booking().customerEmail)) {
      this.error.set('Email non valida');
      return;
    }

    const phoneRegex = /\d{10,}/;
    if (!phoneRegex.test(this.booking().customerPhone.replace(/\s/g, ''))) {
      this.error.set('Numero di telefono non valido');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.bookingService.createBooking(this.booking()).subscribe({
      next: (createdBooking) => {
        console.log('✅ Prenotazione creata:', createdBooking);
        this.loading.set(false);
        this.success.set(true);
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
        console.error('❌ Errore prenotazione:', err);
        this.loading.set(false);
        
        if (err.message) {
          this.error.set(err.message);
        } else if (err.status === 0) {
          this.error.set('Impossibile contattare il server. Verifica che l\'API sia avviata.');
        } else {
          this.error.set('Errore durante la prenotazione. Riprova più tardi.');
        }

        setTimeout(() => {
          const errorElement = document.querySelector('.error-message');
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  scrollToSection(sectionId: string): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  getDayOfWeek(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', { weekday: 'long' });
  }

  
  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
