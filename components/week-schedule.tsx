"use client";

import DayCard, { Event } from "./day-card";
import scheduleData from "@/data/schedule.json";

interface DaySchedule {
  day: string;
  dayOfWeek: number;
  backgroundImage: string;
  events: Event[];
}

// Função para obter o Monday da semana atual
function getMondayOfCurrentWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Se domingo, volta 6 dias, senão vai para segunda
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  return monday;
}

// Função para formatar data como "dd/MM"
function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

// Função para obter a data de um dia específico da semana
function getDateForDayOfWeek(monday: Date, dayIndex: number) {
  const date = new Date(monday);
  date.setDate(monday.getDate() + dayIndex);
  return formatDate(date);
}

export default function WeekSchedule() {
  // Determinar o dia atual da semana (0 = Segunda, 6 = Domingo)
  const today = new Date();
  const todayDayOfWeek = today.getDay();

  // Obter a segunda-feira da semana atual
  const monday = getMondayOfCurrentWeek();
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return (
    <section className="relative min-h-screen py-16 px-4 overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: "url('/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />

        {/* Logo em marca d'água */}
        <div
          className="absolute inset-0 bg-center opacity-5"
          style={{
            backgroundImage: "url('/logo.png')",
            backgroundSize: "600px",
            backgroundPosition: "center 20%",
            backgroundRepeat: "no-repeat"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-3 tracking-wide">
            PROGRAMAÇÃO SEMANAL
          </h2>
          <div className="flex items-center justify-center gap-2 text-white/90 text-lg">
            <span>{formatDate(monday)}</span>
            <span>—</span>
            <span>{formatDate(sunday)}</span>
          </div>
          <p className="text-base text-white/80 mt-4 max-w-2xl mx-auto font-serif">
            Confira os horários das missas e celebrações da nossa paróquia
          </p>
        </div>

        {/* Grade de dias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scheduleData.week.map((daySchedule: DaySchedule, index) => (
            <DayCard
              key={daySchedule.day}
              day={daySchedule.day}
              events={daySchedule.events}
              isToday={daySchedule.dayOfWeek === todayDayOfWeek}
              date={getDateForDayOfWeek(monday, index)}
              backgroundImage={daySchedule.backgroundImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
