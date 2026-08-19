// ============================================================
// Tabla de Citas - Dashboard
// Listado de próximos clientes con hora, servicio y estado
// ============================================================

"use client";

import { Appointment, AppointmentStatus } from "@/types";
import { User, Scissors } from "lucide-react";

interface AppointmentsTableProps {
  appointments: Appointment[];
}

// Configuración de badges por estado
const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  confirmed: {
    label: "Confirmado",
    className: "badge-confirmed",
  },
  completed: {
    label: "Completado",
    className: "badge-completed",
  },
  cancelled: {
    label: "Cancelado",
    className: "badge-cancelled",
  },
  no_show: {
    label: "No asistió",
    className: "badge-no_show",
  },
};

export default function AppointmentsTable({
  appointments,
}: AppointmentsTableProps) {
  return (
    <div className="barber-card overflow-hidden">
      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <Scissors className="w-4 h-4 text-barber-gold" />
        Próximos clientes
      </h3>

      {/* Vista desktop: tabla */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">
                Cliente
              </th>
              <th className="text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">
                Hora
              </th>
              <th className="text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">
                Servicio
              </th>
              <th className="text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">
                Monto
              </th>
              <th className="text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider pb-3">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {appointments.map((apt) => {
              const status = statusConfig[apt.status];
              return (
                <tr
                  key={apt.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {apt.client_name}
                        </p>
                        {apt.notes && (
                          <p className="text-[10px] text-gray-500 truncate max-w-[150px]">
                            {apt.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-300 font-mono">
                      {apt.start_time}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-gray-400">
                      {apt.service_name}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm font-medium text-white">
                      ${apt.total_amount.toFixed(2)}
                    </span>
                    {apt.tip_amount > 0 && (
                      <span className="text-[10px] text-barber-gold ml-1">
                        +${apt.tip_amount.toFixed(2)} propina
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center text-[11px] font-medium rounded-full px-2 py-0.5 ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Vista mobile: tarjetas */}
      <div className="sm:hidden space-y-2">
        {appointments.map((apt) => {
          const status = statusConfig[apt.status];
          return (
            <div
              key={apt.id}
              className="bg-white/[0.02] rounded-xl p-3 border border-white/5"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {apt.client_name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${status.className}`}
                >
                  {status.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 pl-9">
                <span>
                  {apt.start_time} · {apt.service_name}
                </span>
                <span className="font-medium text-white">
                  ${apt.total_amount.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
