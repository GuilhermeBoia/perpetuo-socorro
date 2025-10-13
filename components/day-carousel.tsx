"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface Event {
  time: string;
  type: string;
  title: string;
  description?: string;
  timeRange?: string;
}

interface DaySchedule {
  day: string;
  dayOfWeek: number;
  backgroundImage: string;
  events: Event[];
}

interface DayCarouselProps {
  scheduleData: DaySchedule[];
}

function getMondayOfCurrentWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
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

export default function DayCarousel({ scheduleData }: DayCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const today = new Date();
  const todayDayOfWeek = today.getDay();
  const monday = getMondayOfCurrentWeek();

  // Encontrar o índice do dia atual
  useEffect(() => {
    // Converter getDay() (0=domingo, 1=segunda...) para o formato do schedule (0=segunda, 6=domingo)
    const scheduleDayOfWeek = todayDayOfWeek === 0 ? 6 : todayDayOfWeek - 1;
    const todayIndex = scheduleData.findIndex(day => day.dayOfWeek === scheduleDayOfWeek);
    if (todayIndex !== -1) {
      setCurrentIndex(todayIndex);
    }
  }, [scheduleData, todayDayOfWeek]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % scheduleData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + scheduleData.length) % scheduleData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handler para detectar swipe/drag
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50; // Pixels necessários para considerar um swipe

    if (info.offset.x > swipeThreshold) {
      // Swipe para a direita - voltar
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe para a esquerda - avançar
      nextSlide();
    }
  };

  const currentDay = scheduleData[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/${currentDay.backgroundImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/90" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-md text-white hover:bg-primary/30 hover:border-white/20 hover:scale-110 transition-all duration-300 shadow-sm"
        aria-label="Dia anterior"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-md text-white hover:bg-primary/30 hover:border-white/20 hover:scale-110 transition-all duration-300 shadow-sm"
        aria-label="Próximo dia"
      >
        <ChevronRight size={20} />
      </button>

      {/* Content - Envolvido em motion.div para suportar drag/swipe */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center items-center px-8 text-center"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {/* Day Name - Fixed Position */}
        <div className="mb-2">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide font-serif">
            {currentDay.day.toUpperCase()}
          </h1>
        </div>

        {/* Date - Fixed Position */}
        <div className="mb-6">
          <p className="text-lg text-white/90 font-sans">
            {getDateForDayOfWeek(monday, currentIndex)}
          </p>
        </div>

        {/* Events - Animated */}
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3">
                {currentDay.events.map((event, index) => (
                  <div
                    key={index}
                    className="bg-primary/70 backdrop-blur-md rounded-xl p-4 border border-primary/60 shadow-lg hover:bg-primary/90 transition-all duration-300"
                  >
                    <div className="flex items-center gap-6">
                      {/* Horário um pouco mais à direita */}
                      <div className="flex-shrink-0 ml-4">
                        <span className="text-xl font-bold text-white tracking-wider">
                          {event.time}
                        </span>
                      </div>

                      {/* Título e descrição à direita */}
                      <div className="flex-1">
                        <p className="text-white/95 text-sm font-medium leading-tight">
                          {event.title}
                        </p>
                        {event.description && (
                          <p className="text-white/80 text-xs leading-tight mt-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Logo */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <Image 
          src="/logo.png" 
          alt="Logo Paróquia Nossa Senhora do Perpétuo Socorro" 
          className="h-12 w-auto opacity-90"
          width={100}
          height={100}
        />
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {scheduleData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir para ${scheduleData[index].day}`}
          />
        ))}
      </div>
    </div>
  );
}
