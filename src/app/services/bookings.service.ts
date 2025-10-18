import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookingDTO, CreateBookingDTO, UpdateBookingStatusDTO } from '../models/booking.models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/bookings`;

  /**
   * Get all bookings
   */
  getAllBookings(): Observable<BookingDTO[]> {
    return this.http.get<BookingDTO[]>(this.apiUrl);
  }

  /**
   * Get booking by ID
   */
  getBookingById(id: number): Observable<BookingDTO> {
    return this.http.get<BookingDTO>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get bookings by date
   */
  getBookingsByDate(date: string): Observable<BookingDTO[]> {
    return this.http.get<BookingDTO[]>(`${this.apiUrl}/date/${date}`);
  }

  /**
   * Get bookings by status
   */
  getBookingsByStatus(status: string): Observable<BookingDTO[]> {
    return this.http.get<BookingDTO[]>(`${this.apiUrl}/status/${status}`);
  }

  /**
   * Get bookings by date range
   */
  getBookingsByDateRange(startDate: string, endDate: string): Observable<BookingDTO[]> {
    return this.http.get<BookingDTO[]>(`${this.apiUrl}/range`, {
      params: { startDate, endDate }
    });
  }

  /**
   * Create a new booking
   */
  createBooking(booking: CreateBookingDTO): Observable<BookingDTO> {
    return this.http.post<BookingDTO>(this.apiUrl, booking);
  }

  /**
   * Update booking status
   */
  updateBookingStatus(id: number, statusUpdate: UpdateBookingStatusDTO): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/status`, statusUpdate);
  }

  /**
   * Update entire booking
   */
  updateBooking(id: number, booking: Partial<BookingDTO>): Observable<BookingDTO> {
    return this.http.put<BookingDTO>(`${this.apiUrl}/${id}`, booking);
  }

  /**
   * Delete booking
   */
  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get available time slots for a specific date
   */
  getAvailableTimeSlots(date: string, numberOfGuests: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/available-slots`, {
      params: { date, numberOfGuests: numberOfGuests.toString() }
    });
  }

  /**
   * Check if a time slot is available
   */
  checkAvailability(date: string, time: string, numberOfGuests: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-availability`, {
      params: { 
        date, 
        time, 
        numberOfGuests: numberOfGuests.toString() 
      }
    });
  }
}
