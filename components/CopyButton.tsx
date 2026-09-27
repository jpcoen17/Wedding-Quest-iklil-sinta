"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label: string;
  successLabel: string;
  className?: string;
};

export default function CopyButton({
  value,
  label,
  successLabel,
  className,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const markCopied = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        markCopied();
        return;
      }
      throw new Error("Clipboard API unavailable");
    } catch {
      // Fallback for browsers/contexts without the Clipboard API
      // (e.g. non-HTTPS, older mobile browsers).
      try {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        markCopied();
      } catch {
        // Give up silently — the account number is still visible on screen
        // for the guest to copy manually.
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <button
        onClick={handleCopy}
        aria-label={label}
        className="w-11 h-11 shrink-0 border-2 border-ink bg-cream flex items-center justify-center active:translate-y-0.5"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      {copied && (
        <span className="font-pixel text-[7px] text-blossom-dark whitespace-nowrap">
          {successLabel}
        </span>
      )}
    </div>
  );
}
