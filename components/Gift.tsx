"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { wedding } from "@/lib/wedding";
import SectionHeading from "./SectionHeading";

export default function Gift() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, account: string) => {
    try {
      await navigator.clipboard.writeText(account);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // clipboard API can fail without HTTPS/permissions; fail silently
    }
  };

  return (
    <section className="relative bg-sky-light py-24 px-6">
      <div className="max-w-md mx-auto">
        <SectionHeading level="ITEM SHOP" title="Wedding Gift" />

        <div className="space-y-4">
          {wedding.gift.map((item) => (
            <div key={item.id} className="pixel-panel px-5 py-4 flex items-center gap-4">
              <span className="text-2xl shrink-0">💰</span>
              <div className="flex-1 min-w-0">
                <p className="font-pixel text-[8px] text-ink/50">{item.label}</p>
                <p className="font-body text-sm sm:text-base">{item.bank}</p>
                <p className="font-body text-sm sm:text-base tracking-wide">
                  {item.account}
                </p>
                <p className="font-body text-xs text-ink/60">a.n. {item.name}</p>
              </div>
              <button
                onClick={() => handleCopy(item.id, item.account)}
                aria-label="Copy account number"
                className="w-10 h-10 shrink-0 border-2 border-ink bg-cream flex items-center justify-center active:translate-y-0.5"
              >
                {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          ))}
        </div>

        {copiedId && (
          <p className="text-center font-pixel text-[9px] text-blossom-dark mt-4">
            ITEM COPIED!
          </p>
        )}
      </div>
    </section>
  );
}
