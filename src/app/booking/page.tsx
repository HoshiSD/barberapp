// ============================================================
// Página de Reserva - Flujo de Cliente Público
// Combina todos los pasos en una vista scrollable mobile-first
// ============================================================

"use client";

import { useState } from "react";
import { Scissors } from "lucide-react";
import ServiceSelector from "@/components/booking/ServiceSelector";
import BarberSelector from "@/components/booking/BarberSelector";
import DateTimeSelector from "@/components/booking/DateTimeSelector";
import BookingSummary from "@/components/booking/BookingSummary";
import { services, barbers } from "@/lib/mock-data";
import { BookingState } from "@/types";

export default function BookingPage() {
  // Estado global de la reserva
  const [booking, setBooking] = useState<BookingState>({
    selectedService: null,
    selectedBarber: null,
    selectedDate: null,
    selectedTime: null,
  });

  // Modal de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Manejar selección de servicio
  const handleServiceSelect = (service: BookingState["selectedService"]) => {
    setBooking((prev) => ({ ...prev, selectedService: service }));
  };

  // Manejar selección de barbero
  const handleBarberSelect = (barber: BookingState["selectedBarber"]) => {
    setBooking((prev) => ({ ...prev, selectedBarber: barber }));
  };

  // Manejar selección de fecha
  const handleDateSelect = (date: Date) => {
    setBooking((prev) => ({ ...prev, selectedDate: date, selectedTime: null }));
  };

  // Manejar selección de hora
  const handleTimeSelect = (time: string) => {
    setBooking((prev) => ({ ...prev, selectedTime: time }));
  };

  // Confirmar reserva
  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-barber-dark-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-barber-dark-500/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-barber-gold/10 rounded-lg">
              <Scissors className="w-5 h-5 text-barber-gold" />
            </div>
            <div>
              <h1 className="text-base font-heading font-bold text-white">
                BarberApp
              </h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">Reserva tu cita</p>
            </div>
          </div>

          {/* Link al dashboard (para testing) */}
          <a
            href="/dashboard"
            className="text-xs text-gray-500 hover:text-barber-gold transition-colors"
          >
            Admin →
          </a>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-8 pb-32">
        {/* Paso 1: Servicios */}
        <ServiceSelector
          services={services}
          selected={booking.selectedService}
          onSelect={handleServiceSelect}
        />

        {/* Paso 2: Barberos */}
        <BarberSelector
          barbers={barbers}
          selected={booking.selectedBarber}
          onSelect={handleBarberSelect}
        />

        {/* Paso 3: Fecha y Hora */}
        <DateTimeSelector
          selectedDate={booking.selectedDate}
          selectedTime={booking.selectedTime}
          durationMinutes={booking.selectedService?.duration_minutes || 30}
          onDateSelect={handleDateSelect}
          onTimeSelect={handleTimeSelect}
        />
      </main>

      {/* Barra inferior de resumen */}
      <BookingSummary booking={booking} onConfirm={handleConfirm} />

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-barber-dark-300 rounded-2xl p-6 max-w-sm w-full border border-white/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-400/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">
                ¡Reserva Confirmada!
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Tu cita ha sido agendada exitosamente.
              </p>

              <div className="bg-white/5 rounded-xl p-4 text-left space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Servicio</span>
                  <span className="text-white font-medium">
                    {booking.selectedService?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Barbero</span>
                  <span className="text-white font-medium">
                    {booking.selectedBarber?.display_name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fecha</span>
                  <span className="text-white font-medium">
                    {booking.selectedDate?.toLocaleDateString("es-ES")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Hora</span>
                  <span className="text-white font-medium">
                    {booking.selectedTime}
                  </span>
                </div>
                <div className="border-t border-white/5 pt-2 flex justify-between">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-barber-gold font-bold">
                    ${booking.selectedService?.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setBooking({
                    selectedService: null,
                    selectedBarber: null,
                    selectedDate: null,
                    selectedTime: null,
                  });
                }}
                className="btn-gold w-full"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
