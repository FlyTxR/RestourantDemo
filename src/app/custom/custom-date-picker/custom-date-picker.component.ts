import { Component, signal, output, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isPast: boolean;
}

@Component({
  selector: 'app-custom-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.scss']
})
export class CustomDatePickerComponent implements OnInit {
  minDate = input<string>('');
  maxDate = input<string>('');
  value = input<string>('');
  
  selectedDate = signal<Date | null>(null);
  dateSelected = output<string>();

  isOpen = signal(false);
  currentMonth = signal(new Date().getMonth());
  currentYear = signal(new Date().getFullYear());
  calendarDays = signal<CalendarDay[]>([]);

  ngOnInit(): void {
    // Set initial value if provided
    if (this.value()) {
      this.selectedDate.set(new Date(this.value()));
    }
    this.generateCalendar();
  }

  togglePicker(): void {
    this.isOpen.update(open => !open);
    if (this.isOpen()) {
      this.generateCalendar();
    }
  }

  closePicker(): void {
    this.isOpen.set(false);
  }

  generateCalendar(): void {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = startDay; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      days.push(this.createCalendarDay(date, false));
    }

    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push(this.createCalendarDay(date, true));
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push(this.createCalendarDay(date, false));
    }

    this.calendarDays.set(days);
  }

  createCalendarDay(date: Date, isCurrentMonth: boolean): CalendarDay {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    const selected = this.selectedDate();
    const selectedOnly = selected ? new Date(selected) : null;
    if (selectedOnly) selectedOnly.setHours(0, 0, 0, 0);

    const minDateObj = this.minDate() ? new Date(this.minDate()) : new Date('1900-01-01');
    const maxDateObj = this.maxDate() ? new Date(this.maxDate()) : new Date('2100-12-31');

    return {
      date,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      isCurrentMonth,
      isToday: dateOnly.getTime() === today.getTime(),
      isSelected: selectedOnly ? dateOnly.getTime() === selectedOnly.getTime() : false,
      isPast: dateOnly < today,
      isDisabled: dateOnly < minDateObj || dateOnly > maxDateObj
    };
  }

  selectDate(day: CalendarDay): void {
    if (day.isDisabled) return;
    
    this.selectedDate.set(day.date);
    const dateStr = day.date.toISOString().split('T')[0];
    this.dateSelected.emit(dateStr);
    this.closePicker();
  }

  selectToday(): void {
    const today = new Date();
    this.selectedDate.set(today);
    this.dateSelected.emit(today.toISOString().split('T')[0]);
    this.closePicker();
  }

  selectTomorrow(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.selectedDate.set(tomorrow);
    this.dateSelected.emit(tomorrow.toISOString().split('T')[0]);
    this.closePicker();
  }

  selectWeekend(): void {
    const today = new Date();
    const saturday = new Date(today);
    const daysUntilSaturday = (6 - today.getDay() + 7) % 7 || 7;
    saturday.setDate(today.getDate() + daysUntilSaturday);
    
    this.selectedDate.set(saturday);
    this.dateSelected.emit(saturday.toISOString().split('T')[0]);
    this.closePicker();
  }

  previousMonth(): void {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update(y => y - 1);
    } else {
      this.currentMonth.update(m => m - 1);
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update(y => y + 1);
    } else {
      this.currentMonth.update(m => m + 1);
    }
    this.generateCalendar();
  }

  getMonthName(month: number): string {
    const months = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    return months[month];
  }

  formatDisplayDate(date: Date): string {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
