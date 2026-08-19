// ============================================================
// Página del Dashboard - Panel de Administración del Barbero
// Vista de calendario, estadísticas y listado de citas
// ============================================================

"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Scissors, ArrowLeft, Calendar } from "lucide-react";
import StatsCards from "@/components/dashboard/StatsCards";
import DailyCalendar from "@/components/dashboard/DailyCalendar";
import AppointmentsTable from "@/components/dashboard/AppointmentsTable";
import { todayAppointments, dashboardStats } from "@/lib/mock-data";

export default function DashboardPage() {
  const today = new Date();

  return (
    <div className="min-h-screen bg-barber-dark-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-barber-dark-500/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/booking"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-400" />
            </a>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-barber-gold/10 rounded-lg">
                <Scissors className="w-5 h-5 text-barber-gold" />
              </div>
              <div>
                <h1 className="text-base font-heading font-bold text-white">
                  Dashboard
                </h1>
                <p className="text-[10px] text-gray-500 -mt-0.5">
                  Panel de administración
                </p>
              </div>
            </div>
          </div>

          {/* Fecha actual */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">
              {format(today, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
            <span className="sm:hidden">
              {format(today, "d MMM", { locale: es })}
            </span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Saludo */}
        <div>
          <h2 className="text-xl font-heading font-bold text-white">
            Buenos días, Carlos 👋
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Tienes {todayAppointments.filter((a) => a.status === "confirmed").length}{" "}
            citas confirmadas para hoy.
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <StatsCards stats={dashboardStats} />

        {/* Grid: Calendario diario + Tabla de citas */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Calendario - toma más espacio */}
          <div className="lg:col-span-3">
            <DailyCalendar appointments={todayAppointments} />
          </div>

          {/* Tabla de citas */}
          <div className="lg:col-span-2">
            <AppointmentsTable appointments={todayAppointments} />
          </div>
        </div>
      </main>
    </div>
  );
}
