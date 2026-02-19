import { Clock3, CreditCard, DollarSign, FileText, MapPin, ShieldCheck, Star } from 'lucide-react';
import Container from '@/src/components/ui/Container';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  'shield-check': ShieldCheck,
  star: Star,
  clock: Clock3,
  map: MapPin,
  'id-card': CreditCard,
  document: FileText,
  currency: DollarSign,
};

type TrustItem = {
  icon: string;
  label?: string;
  text?: string;
  value?: string | null;
};

type Props = {
  data: {
    items?: TrustItem[];
    license?: string;
    rating?: string;
    experience?: string;
    areas?: string;
  };
};

export default function TrustBar({ data }: Props) {
  const items: TrustItem[] =
    data.items && data.items.length > 0
      ? data.items.map((item) => ({
          ...item,
          label: item.label || item.text || '',
        }))
      : [
          { icon: 'id-card', label: data.license || 'CT HIC License' },
          { icon: 'star', label: data.rating || '5-Star Rated' },
          { icon: 'clock', label: data.experience || '15+ Years Experience' },
          { icon: 'map', label: data.areas || 'Fairfield & New Haven Counties' },
        ];

  const gridColsClass =
    items.length >= 5
      ? 'md:grid-cols-3 lg:grid-cols-5'
      : items.length === 4
        ? 'md:grid-cols-2 lg:grid-cols-4'
        : 'md:grid-cols-3';

  return (
    <section className="border-y border-[#dfd8cb] bg-[#F5F3EF] py-8">
      <Container>
        <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${gridColsClass} md:gap-4`}>
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div key={i} className="flex items-center justify-center gap-2 rounded-lg border border-[#e3dbcd] bg-white px-4 py-3 text-center shadow-[0_8px_18px_rgba(30,47,74,0.06)]">
                <Icon className="h-4 w-4 shrink-0 text-[#C89B5B]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1E2F4A]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
