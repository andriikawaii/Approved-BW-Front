'use client';

import { useEffect, useRef, useState } from 'react';

type StatItem = {
  value: string | number;
  label: string;
  icon?: string;
};

type Props = {
  data: {
    title?: string | null;
    subtitle?: string | null;
    variant?: string;
    items: StatItem[];
  };
};

function parseStatValue(val: string | number): { num: number; suffix: string } {
  const str = String(val);
  const match = str.match(/^(\d+)(.*)/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  return { num: 0, suffix: str };
}

export default function StatsCounterSection({ data }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const isDark = data.variant !== 'light';

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`py-20 md:py-24 ${isDark ? 'bg-[#1A2B45] text-white' : 'bg-white text-[#1E2F4A]'}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, i) => {
            const { num, suffix } = parseStatValue(item.value);
            return (
              <Counter
                key={i}
                value={num}
                suffix={suffix}
                label={item.label}
                start={visible}
                dark={isDark}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

type CounterProps = {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  dark: boolean;
};

function Counter({ value, suffix, label, start, dark }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let current = 0;
    const duration = 1200;
    const steps = 60;
    const increment = value / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [start, value]);

  return (
  <div className="flex flex-col items-center">
    <div className="font-serif text-5xl md:text-6xl font-bold text-[#C68E4D] mb-3">
      {count}
      {suffix}
    </div>

    <div
      className={`text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.18em] ${
        dark ? 'text-white/80' : 'text-[#1E2F4A]/70'
      }`}
    >
      {label}
    </div>
  </div>
);
}
