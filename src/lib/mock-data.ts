// ============================================================
// BarberApp - Datos mockeados para desarrollo del MVP
// Simula respuesta de la base de datos
// ============================================================

import { Service, Barber, Appointment, DashboardStats } from "@/types";

export const services: Service[] = [
  {
    id: "svc-1",
    name: "Corte de Cabello",
    description: "Corte clásico o moderno, incluye lavado",
    price: 25.0,
    duration_minutes: 30,
    icon: "scissors",
    is_active: true,
  },
  {
    id: "svc-2",
    name: "Barba y Bigote",
    description: "Recorte y definición de barba con toalla caliente",
    price: 20.0,
    duration_minutes: 25,
    icon: "beard",
    is_active: true,
  },
  {
    id: "svc-3",
    name: "Corte + Barba",
    description: "Combo completo de corte y barba",
    price: 40.0,
    duration_minutes: 50,
    icon: "combo",
    is_active: true,
  },
  {
    id: "svc-4",
    name: "Diseño de Cejas",
    description: "Profileado y diseño de cejas",
    price: 10.0,
    duration_minutes: 15,
    icon: "star",
    is_active: true,
  },
  {
    id: "svc-5",
    name: "Afeitado Clásico",
    description: "Afeitado tradicional con navaja y espuma",
    price: 30.0,
    duration_minutes: 35,
    icon: "razor",
    is_active: true,
  },
  {
    id: "svc-6",
    name: "Tratamiento Capilar",
    description: "Mascara hidratante y masaje capilar",
    price: 35.0,
    duration_minutes: 40,
    icon: "droplet",
    is_active: true,
  },
];

export const barbers: Barber[] = [
  {
    id: "bar-1",
    user_id: "usr-1",
    display_name: "Carlos Martínez",
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Especialista en cortes modernos y degradados. 8 años de experiencia.",
    specialties: ["Corte moderno", "Degradados", "Barba"],
    rating: 4.9,
    is_active: true,
  },
  {
    id: "bar-2",
    user_id: "usr-2",
    display_name: "Miguel Rodríguez",
    photo_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Maestro en afeitado clásico y tratamientos capilares.",
    specialties: ["Afeitado clásico", "Tratamientos", "Cejas"],
    rating: 4.8,
    is_active: true,
  },
  {
    id: "bar-3",
    user_id: "usr-3",
    display_name: "Andrés López",
    photo_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Experto en estilos vintage y clásicos. El barbero favorito del barrio.",
    specialties: ["Estilos vintage", "Corte clásico", "Barba"],
    rating: 4.7,
    is_active: true,
  },
];

// Citas mockeadas para el dashboard de hoy
export const todayAppointments: Appointment[] = [
  {
    id: "apt-1",
    client_id: "cli-1",
    client_name: "Juan Pérez",
    barber_id: "bar-1",
    barber_name: "Carlos Martínez",
    service_id: "svc-3",
    service_name: "Corte + Barba",
    appointment_date: new Date().toISOString().split("T")[0],
    start_time: "09:00",
    end_time: "09:50",
    status: "completed",
    notes: null,
    tip_amount: 5.0,
    total_amount: 40.0,
  },
  {
    id: "apt-2",
    client_id: "cli-2",
    client_name: "Roberto Sánchez",
    barber_id: "bar-1",
    barber_name: "Carlos Martínez",
    service_id: "svc-1",
    service_name: "Corte de Cabello",
    appointment_date: new Date().toISOString().split("T")[0],
    start_time: "10:00",
    end_time: "10:30",
    status: "completed",
    notes: null,
    tip_amount: 3.0,
    total_amount: 25.0,
  },
  {
    id: "apt-3",
    client_name: "Pedro Gómez",
    client_id: "cli-3",
    barber_id: "bar-1",
    barber_name: "Carlos Martínez",
    service_id: "svc-5",
    service_name: "Afeitado Clásico",
    appointment_date: new Date().toISOString().split("T")[0],
    start_time: "11:00",
    end_time: "11:35",
    status: "confirmed",
    notes: "Prefiere espuma caliente",
    tip_amount: 0,
    total_amount: 30.0,
  },
  {
    id: "apt-4",
    client_id: "cli-4",
    client_name: "Luis Martínez",
    barber_id: "bar-1",
    barber_name: "Carlos Martínez",
    service_id: "svc-2",
    service_name: "Barba y Bigote",
    appointment_date: new Date().toISOString().split("T")[0],
    start_time: "12:00",
    end_time: "12:25",
    status: "confirmed",
    notes: null,
    tip_amount: 0,
    total_amount: 20.0,
  },
  {
    id: "apt-5",
    client_id: "cli-5",
    client_name: "Diego Fernández",
    barber_id: "bar-1",
    barber_name: "Carlos Martínez",
    service_id: "svc-3",
    service_name: "Corte + Barba",
    appointment_date: new Date().toISOString().split("T")[0],
    start_time: "14:00",
    end_time: "14:50",
    status: "confirmed",
    notes: "Cumpleaños - sorprender",
    tip_amount: 0,
    total_amount: 40.0,
  },
  {
    id: "apt-6",
    client_id: "cli-6",
    client_name: "Santiago Herrera",
    barber_id: "bar-1",
    barber_name: "Carlos Martínez",
    service_id: "svc-4",
    service_name: "Diseño de Cejas",
    appointment_date: new Date().toISOString().split("T")[0],
    start_time: "15:30",
    end_time: "15:45",
    status: "cancelled",
    notes: null,
    tip_amount: 0,
    total_amount: 10.0,
  },
  {
    id: "apt-7",
    client_id: "cli-7",
    client_name: "Mateo Vargas",
    barber_id: "bar-1",
    barber_name: "Carlos Martínez",
    service_id: "svc-1",
    service_name: "Corte de Cabello",
    appointment_date: new Date().toISOString().split("T")[0],
    start_time: "16:00",
    end_time: "16:30",
    status: "confirmed",
    notes: null,
    tip_amount: 0,
    total_amount: 25.0,
  },
];

// Horas disponibles simuladas para un día específico
export const generateTimeSlots = (durationMinutes: number): string[] => {
  const slots: string[] = [];
  const startHour = 9; // 9:00 AM
  const endHour = 19; // 7:00 PM

  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const endMinutes = hour * 60 + min + durationMinutes;
      if (endMinutes <= endHour * 60) {
        slots.push(`${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
      }
    }
  }
  return slots;
};

// Horas ocupadas simuladas
export const bookedSlots: Record<string, string[]> = {
  "2026-08-18": ["09:00", "10:00", "11:00", "12:00", "14:00", "15:30", "16:00"],
  "2026-08-19": ["09:30", "10:30", "13:00"],
  "2026-08-20": ["11:00", "15:00", "16:30"],
};

export const dashboardStats: DashboardStats = {
  dailyRevenue: 128.0,
  totalAppointments: 7,
  tips: 8.0,
  completedToday: 2,
};
