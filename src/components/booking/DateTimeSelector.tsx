// ============================================================
// Selector de Fecha y Hora
// Calendario simple + grilla de horarios disponibles
// ============================================================

"use client";

import { useState, useMemo } from "react";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { generateTimeSlots, bookedSlots } from "@/lib/mock-data";

interface DateTimeSelectorProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  durationMinutes: number;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

export default function DateTimeSelector({
  selectedDate,
  selectedTime,
  durationMinutes,
  onDateSelect,
  onTimeSelect,
}: DateTimeSelectorProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  // Generar los 7 días de la semana actual + offset
  const weekDays = useMemo(() => {
    const start = startOfWeek(addWeeks(new Date(), weekOffset), {
      weekStartsOn: 1, // Lunes
    });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [weekOffset]);

  // Generar slots de tiempo disponibles según la duración del servicio
  const timeSlots = useMemo(() => {
    return generateTimeSlots(durationMinutes);
  }, [durationMinutes]);

  // Verificar si un slot está reservado
  const isSlotBooked = (date: Date, time: string): boolean => {
    const dateKey = format(date, "yyyy-MM-dd");
    const booked = bookedSlots[dateKey] || [];
    return booked.includes(time);
  };

  // Slots con disponibilidad
  const slotsWithAvailability = useMemo(() => {
    if (!selectedDate) return [];
    return timeSlots.map((time) => ({
      time,
      available: !isSlotBooked(selectedDate, time),
    }));
  }, [selectedDate, timeSlots]);

  return (
    <section>
      {/* Calendario semanal */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-heading font-semibold text-white">
            Selecciona fecha y hora
          </h2>
          <div className="flex gap-1.5">
            <button
              onClick={() => setWeekOffset((prev) => Math.max(0, prev - 1))}
              disabled={weekOffset === 0}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => setWeekOffset((prev) => prev + 1)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isPast = isBefore(day, startOfDay(new Date()));
            const today = isToday(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && onDateSelect(day)}
                disabled={isPast}
                className={`flex flex-col items-center py-2.5 rounded-xl transition-all duration-300 ${
                  isPast
                    ? "opacity-30 cursor-not-allowed"
                    : isSelected
                    ? "bg-barber-gold text-barber-dark-500"
                    : "bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                <span
                  className={`text-[10px] uppercase font-medium ${
                    isSelected ? "text-barber-dark-500/70" : "text-gray-500"
                  }`}
                >
                  {format(day, "EEE", { locale: es })}
                </span>
                <span
                  className={`text-lg font-bold mt-0.5 ${
                    isSelected ? "text-barber-dark-500" : ""
                  }`}
                >
                  {format(day, "d")}
                </span>
                {today && (
                  <div
                    className={`w-1 h-1 rounded-full mt-1 ${
                      isSelected ? "bg-barber-dark-500" : "bg-barber-gold"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grilla de horas disponibles */}
      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-barber-gold" />
            <h3 className="text-sm font-semibold text-white">
              Horas disponibles
            </h3>
            <span className="text-xs text-gray-500">
              {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {slotsWithAvailability.map(({ time, available }) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => available && onTimeSelect(time)}
                  disabled={!available}
                  className={`py-2.5 px-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                    !available
                      ? "bg-white/3 text-gray-600 cursor-not-allowed line-through"
                      : isSelected
                      ? "bg-barber-gold text-barber-dark-500 shadow-lg shadow-barber-gold/20"
                      : "bg-white/5 text-white hover:bg-white/10 hover:text-barber-gold"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
