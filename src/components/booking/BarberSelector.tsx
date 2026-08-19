// ============================================================
// Selector de Barbero - Carrusel horizontal con foto y nombre
// Permite elegir el barbero preferido
// ============================================================

"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Barber } from "@/types";

interface BarberSelectorProps {
  barbers: Barber[];
  selected: Barber | null;
  onSelect: (barber: Barber) => void;
}

export default function BarberSelector({
  barbers,
  selected,
  onSelect,
}: BarberSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Desplazar carrusel
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -180 : 180;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-heading font-semibold text-white">
            Elige tu barbero
          </h2>
          <p className="text-sm text-gray-400">
            Selecciona al barbero de tu preferencia
          </p>
        </div>

        {/* Botones de navegación del carrusel */}
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Carrusel horizontal */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {barbers.map((barber) => {
          const isSelected = selected?.id === barber.id;
          return (
            <button
              key={barber.id}
              onClick={() => onSelect(barber)}
              className={`flex-shrink-0 snap-start w-[140px] sm:w-[160px] barber-card text-center transition-all duration-300 ${
                isSelected ? "selected" : ""
              }`}
            >
              {/* Foto del barbero */}
              <div className="relative mx-auto mb-3">
                <div
                  className={`w-20 h-20 mx-auto rounded-full overflow-hidden border-2 transition-colors duration-300 ${
                    isSelected ? "border-barber-gold" : "border-white/10"
                  }`}
                >
                  <img
                    src={barber.photo_url}
                    alt={barber.display_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Badge de rating */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-barber-dark-400 border border-white/10 rounded-full px-2 py-0.5 flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-barber-gold fill-barber-gold" />
                  <span className="text-xs font-medium text-white">
                    {barber.rating}
                  </span>
                </div>
              </div>

              {/* Nombre */}
              <h3 className="font-semibold text-sm text-white truncate">
                {barber.display_name}
              </h3>

              {/* Especialidades (primera) */}
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {barber.specialties[0]}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
