"use client";

import { useEffect, useState } from "react";
import { storeConfig } from "@/data/store-config";
import { Pause, Play } from "lucide-react";

export function AnnouncementBar() {
  const messages = storeConfig.announcementMessages;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || messages.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, messages.length]);

  return (
    <div className="relative z-50 border-b border-border-alloy bg-foundry-ink text-clean-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-xs tracking-wide sm:text-sm">
        <p aria-live="polite" className="min-h-5">
          {messages[index]}
        </p>
        {storeConfig.storeMode === "demo" && (
          <span className="hidden rounded-sm border border-brushed-silver/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-brushed-silver sm:inline">
            Demo mode
          </span>
        )}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1.5 hover:bg-white/10 focus-ring"
          aria-label={paused ? "Play announcement rotation" : "Pause announcement rotation"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
