"use client";

import { useEffect, useState } from "react";

type Props = {
  value: number;
  label: string;
  description: string;
  stage: string;
  delay?: number;
};

const SIZE = 132;
const STROKE = 9;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProgressRing({ value, label, description, stage, delay = 0 }: Props) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedValue(value), 80 + delay * 1000);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  const offset = CIRCUMFERENCE * (1 - animatedValue / 100);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-ink/10" />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="stroke-accent transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</span>
          <span className="mt-1 text-sm font-bold uppercase text-gold">{stage}</span>
        </div>
      </div>
      <p className="mt-3 max-w-[10rem] text-xs text-ink/50">{description}</p>
    </div>
  );
}
