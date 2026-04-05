'use client';

import { useState } from 'react';
import Link from 'next/link';
import FadeUp from '@/src/components/ui/FadeUp';

type Service = {
  title: string;
  href: string;
  img: string;
  desc: string;
  price: string;
  time: string;
};

function ServiceCard({ svc, delay }: { svc: Service; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <article className="gwch-service-card">
        <div className="gwch-service-img">
          <img src={svc.img} alt={svc.title} />
        </div>
        <div className="gwch-service-body">
          <h3 className="gwch-service-title">
            <Link href={svc.href}>{svc.title}</Link>
          </h3>
          <p className="gwch-service-desc">{svc.desc}</p>
          <div className="gwch-service-badges">
            <span className="gwch-badge">
              <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
              {svc.price}
            </span>
            <span className="gwch-badge">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              {svc.time}
            </span>
          </div>
          <Link href={svc.href} className="gwch-learn-more">
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    </FadeUp>
  );
}

export default function WestportServicesToggle({
  primaryServices,
  moreServices,
}: {
  primaryServices: Service[];
  moreServices: Service[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="gwch-services-grid">
        {primaryServices.map((svc, i) => (
          <ServiceCard key={svc.title} svc={svc} delay={i * 40} />
        ))}
      </div>

      <div className={`gwch-services-more${open ? ' show' : ''}`}>
        <div className="gwch-services-grid">
          {moreServices.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} delay={i * 40} />
          ))}
        </div>
      </div>

      <div className="gwch-services-toggle-wrap">
        <button
          type="button"
          className="gwch-services-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show Less' : 'Show 6 More Services'}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </>
  );
}
