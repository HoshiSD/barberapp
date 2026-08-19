// ============================================================
// Selector de Servicios - Tarjetas interactivas con precio/duración
// Muestra cada servicio como una tarjeta seleccionable
// ============================================================

"use client";

import { Scissors, Star, Droplet } from "lucide-react";
import { Service } from "@/types";

interface ServiceSelectorProps {
  services: Service[];
  selected: Service | null;
  onSelect: (service: Service) => void;
}

// Mapa de iconos para cada tipo de servicio
const iconMap: Record<string, React.ReactNode> = {
  scissors: <Scissors className="w-6 h-6" />,
  beard: <Scissors className="w-6 h-6" />,
  combo: <Scissors className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  razor: <Scissors className="w-6 h-6" />,
  droplet: <Droplet className="w-6 h-6" />,
};

export default function ServiceSelector({
  services,
  selected,
  onSelect,
}: ServiceSelectorProps) {
  return (
    <section>
      <h2 className="text-lg font-heading font-semibold text-white mb-1">
        Elige tu servicio
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Selecciona el servicio que deseas
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((service) => {
          const isSelected = selected?.id === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className={`barber-card text-left group ${
                isSelected ? "selected" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Icono del servicio */}
                <div
                  className={`p-2.5 rounded-xl transition-colors duration-300 ${
                    isSelected
                      ? "bg-barber-gold text-barber-dark-500"
                      : "bg-white/5 text-barber-gold group-hover:bg-barber-gold/10"
                  }`}
                >
                  {iconMap[service.icon] || (
                    <Scissors className="w-6 h-6" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-barber-gold font-bold text-base">
                      ${service.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <path
                          strokeWidth="2"
                          d="M12 6v6l4 2"
                          strokeLinecap="round"
                        />
                      </svg>
                      {service.duration_minutes} min
                    </span>
                  </div>
                </div>

                {/* Check indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1 ${
                    isSelected
                      ? "border-barber-gold bg-barber-gold"
                      : "border-gray-600"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-barber-dark-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
