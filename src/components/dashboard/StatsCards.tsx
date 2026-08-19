// ============================================================
// Tarjetas de Estadísticas Rápidas - Dashboard
// Muestra: Ingresos del día, Total de citas, Propinas, Completadas
// ============================================================

"use client";

import { DollarSign, Calendar, Coins, CheckCircle } from "lucide-react";
import { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Ingresos del día",
      value: `$${stats.dailyRevenue.toFixed(2)}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Total de citas",
      value: stats.totalAppointments.toString(),
      icon: <Calendar className="w-5 h-5" />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Propinas",
      value: `$${stats.tips.toFixed(2)}`,
      icon: <Coins className="w-5 h-5" />,
      color: "text-barber-gold",
      bg: "bg-barber-gold/10",
    },
    {
      label: "Completadas",
      value: stats.completedToday.toString(),
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div key={card.label} className="barber-card">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
              {card.icon}
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{card.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
