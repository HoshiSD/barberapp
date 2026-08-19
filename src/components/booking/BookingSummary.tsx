// ============================================================
// Resumen de Reserva - Barra fija inferior
// Muestra resumen de selección y botón de confirmación
// ============================================================

"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { BookingState } from "@/types";

interface BookingSummaryProps {
  booking: BookingState;
  onConfirm: () => void;
}

export default function BookingSummary({
  booking,
  onConfirm,
}: BookingSummaryProps) {
  const { selectedService, selectedBarber, selectedDate, selectedTime } =
    booking;

  // Verificar si todos los campos están seleccionados
  const isComplete =
    selectedService && selectedBarber && selectedDate && selectedTime;

  // Formatear la fecha para mostrar
  const formattedDate = selectedDate
    ? format(selectedDate, "EEEE d 'de' MMMM", { locale: es })
    : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-barber-dark-400/95 backdrop-blur-lg border-t border-white/5 z-50">
      <div className="max-w-lg mx-auto px-4 py-3">
        {/* Resumen de selección */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto">
          {selectedService && (
            <span className="flex-shrink-0 text-xs bg-barber-gold/10 text-barber-gold border border-barber-gold/20 rounded-full px-2.5 py-1">
              {selectedService.name}
            </span>
          )}
          {selectedBarber && (
            <span className="flex-shrink-0 text-xs bg-white/5 text-gray-300 border border-white/10 rounded-full px-2.5 py-1">
              {selectedBarber.display_name}
            </span>
          )}
          {selectedDate && (
            <span className="flex-shrink-0 text-xs bg-white/5 text-gray-300 border border-white/10 rounded-full px-2.5 py-1">
              {formattedDate}
            </span>
          )}
          {selectedTime && (
            <span className="flex-shrink-0 text-xs bg-white/5 text-gray-300 border border-white/10 rounded-full px-2.5 py-1">
              {selectedTime}
            </span>
          )}
        </div>

        {/* Precio total y botón */}
        <div className="flex items-center justify-between gap-4">
          {selectedService ? (
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-xl font-bold text-white">
                ${selectedService.price.toFixed(2)}
              </p>
              <p className="text-[10px] text-gray-500">
                {selectedService.duration_minutes} min
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-gray-500">Selecciona un servicio</p>
            </div>
          )}

          <Button
            variant="gold"
            size="lg"
            disabled={!isComplete}
            onClick={onConfirm}
            className="flex items-center gap-2"
          >
            <CalendarCheck className="w-5 h-5" />
            {isComplete ? "Confirmar Reserva" : "Completa tu selección"}
          </Button>
        </div>
      </div>
    </div>
  );
}
