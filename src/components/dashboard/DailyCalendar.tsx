// ============================================================
// Calendario Diario del Dashboard
// Timeline vertical con las citas del día
// ============================================================

"use client";

import { Appointment } from "@/types";
import { Clock, User } from "lucide-react";

interface DailyCalendarProps {
  appointments: Appointment[];
}

export default function DailyCalendar({ appointments }: DailyCalendarProps) {
  // Filtrar solo citas activas (no canceladas)
  const activeAppointments = appointments.filter(
    (apt) => apt.status !== "cancelled"
  );

  // Generar horas de la grilla (9 AM a 7 PM)
  const hours = Array.from({ length: 11 }, (_, i) => {
    const hour = 9 + i;
    return `${String(hour).padStart(2, "0")}:00`;
  });

  // Buscar si hay cita en una hora específica
  const getAppointmentAtHour = (hour: string) => {
    return activeAppointments.find((apt) => apt.start_time === hour);
  };

  // Color del estado
  const statusColors: Record<string, string> = {
    confirmed: "border-l-barber-gold bg-barber-gold/5",
    completed: "border-l-emerald-400 bg-emerald-400/5",
    no_show: "border-l-amber-400 bg-amber-400/5",
  };

  return (
    <div className="barber-card">
      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-barber-gold" />
        Agenda del día
      </h3>

      <div className="space-y-1">
        {hours.map((hour) => {
          const apt = getAppointmentAtHour(hour);
          const isCurrentHour =
            new Date().getHours() === parseInt(hour.split(":")[0]);

          return (
            <div
              key={hour}
              className={`flex gap-3 items-stretch min-h-[52px] ${
                isCurrentHour ? "bg-barber-gold/5 rounded-lg" : ""
              }`}
            >
              {/* Hora */}
              <div className="w-14 flex-shrink-0 py-2 text-right">
                <span
                  className={`text-xs font-mono ${
                    isCurrentHour ? "text-barber-gold font-bold" : "text-gray-500"
                  }`}
                >
                  {hour}
                </span>
              </div>

              {/* Línea vertical */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                    apt ? "bg-barber-gold" : "bg-white/10"
                  }`}
                />
                <div className="w-px flex-1 bg-white/5" />
              </div>

              {/* Contenido de la cita */}
              <div className="flex-1 py-1.5 pb-3">
                {apt ? (
                  <div
                    className={`border-l-2 rounded-lg px-3 py-2 ${statusColors[apt.status] || "border-l-gray-500"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm font-medium text-white">
                          {apt.client_name}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {apt.start_time} - {apt.end_time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {apt.service_name}
                    </p>
                  </div>
                ) : (
                  <div className="h-2" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
