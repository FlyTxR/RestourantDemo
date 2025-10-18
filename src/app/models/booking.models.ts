export interface BookingDTO {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string; // ISO format: "2025-10-18"
  time: string; // "19:30"
  numberOfGuests: number;
  status: BookingStatus;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export enum BookingStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  NoShow = 'NoShow'
}

export interface CreateBookingDTO {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  numberOfGuests: number;
  specialRequests?: string;
}

export interface UpdateBookingStatusDTO {
  status: BookingStatus;
}
