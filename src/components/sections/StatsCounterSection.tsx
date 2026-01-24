'use client';

import { useEffect, useRef, useState } from 'react';

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

type Props = {
  data: {
    items: StatItem[];
  };
};

export default function StatsCounterSection({ data }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

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
      className="bg-[#1A2B45] py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, i) => (
            <Counter
              key={i}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              start={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
type CounterProps = {
  value: number;
  suffix?: string;
  label: string;
  start: boolean;
};

function Counter({ value, suffix = '', label, start }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 1200; // ms
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
    <div>
      <div className="font-serif text-5xl text-[#C68E4D] md:text-6xl">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-wider text-white/80">
        {label}
      </div>
    </div>
  );
}
