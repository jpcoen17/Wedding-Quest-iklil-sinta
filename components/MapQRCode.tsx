"use client";

import { QRCodeSVG } from "qrcode.react";
import { wedding } from "@/config/wedding";

// Rendered as flat black/white squares — fits the pixel-art aesthetic
// without needing any external QR-generation API or network call.
export default function MapQRCode() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="pixel-border bg-cream p-3">
        <QRCodeSVG
          value={wedding.event.mapsUrl}
          size={128}
          bgColor="#FBF3DE"
          fgColor="#241D2E"
          level="M"
        />
      </div>
      <p className="font-pixel text-[7px] text-ink/60 text-center">
        SCAN TO OPEN LOCATION
      </p>
    </div>
  );
}