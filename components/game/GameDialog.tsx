import { ReactNode } from "react";
import PixelButton from "@/components/PixelButton";

export default function GameDialog({
  eyebrow,
  title,
  lines,
  buttonLabel,
  onButtonClick,
  children,
}: {
  eyebrow?: string;
  title: string;
  lines: string[];
  buttonLabel: string;
  onButtonClick: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-30 bg-ink/70 flex items-center justify-center px-6">
      <div className="pixel-panel px-6 py-6 max-w-xs w-full text-center">
        {eyebrow && (
          <p className="font-pixel text-[8px] text-blossom-dark mb-2">
            {eyebrow}
          </p>
        )}
        <h3 className="font-pixel text-sm mb-4">{title}</h3>
        <div className="space-y-2 mb-6">
          {lines.map((line) => (
            <p key={line} className="font-body text-base text-ink/80">
              {line}
            </p>
          ))}
        </div>
        {children}
        <PixelButton onClick={onButtonClick} className="w-full">
          {buttonLabel}
        </PixelButton>
      </div>
    </div>
  );
}
