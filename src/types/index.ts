// ============================================================
// BarberApp - Definición de tipos TypeScript
// ============================================================

export type UserRole = "client" | "barber" | "admin";
export type AppointmentStatus = "confirmed" | "completed" | "cancelled" | "no_show";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  icon: string;
  is_active: boolean;
}

export interface Barber {
  id: string;
  user_id: string;
  display_name: string;
  photo_url: string;
  bio: string;
  specialties: string[];
  rating: number;
  is_active: boolean;
}

export interface Appointment {
  id: string;
  client_id: string;
  client_name?: string;
  barber_id: string;
  barber_name?: string;
  service_id: string;
  service_name?: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  notes: string | null;
  tip_amount: number;
  total_amount: number;
}

export interface DaySchedule {
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingState {
  selectedService: Service | null;
  selectedBarber: Barber | null;
  selectedDate: Date | null;
  selectedTime: string | null;
}

export interface DashboardStats {
  dailyRevenue: number;
  totalAppointments: number;
  tips: number;
  completedToday: number;
}
