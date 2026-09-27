import { cn } from "@/lib/utils";

export default function SectionHeading({
  level,
  title,
  light,
}: {
  level: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-10">
      <p
        className={cn(
          "font-pixel text-[10px] tracking-widest",
          light ? "text-cream/80" : "text-ink/60"
        )}
      >
        {level}
      </p>
      <h2
        className={cn(
          "font-pixel text-lg sm:text-2xl mt-2",
          light ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "w-16 h-1 mx-auto mt-4",
          light ? "bg-cream" : "bg-ink"
        )}
      />
    </div>
  );
}
