import DayCarousel from "@/components/day-carousel";
import scheduleData from "@/data/schedule.json";

export default function Home() {
  return (
    <DayCarousel scheduleData={scheduleData.week} />
  );
}
