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
          { icon: 'shield', label: data.license || 'CT HIC License' },
          { icon: 'star', label: data.rating || '5-Star Rated' },
          { icon: 'clock', label: data.experience || '15+ Years Experience' },
          { icon: 'map', label: data.areas || 'Fairfield & New Haven Counties' },
        ];

  return (
  <section className="bg-[#F4F4F4] border-b border-[#E5E5E5] py-8">
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0">
        {items.map((item, i) => {
          const Icon = iconMap[item.icon] || ShieldCheck;
          const showDivider = i < items.length - 1;

          return (
            <div
              key={i}
              className={`flex items-center justify-center gap-3 ${
                showDivider ? 'lg:border-r lg:border-[#E0E0E0]' : ''
              }`}
            >
              <Icon className="w-5 h-5 text-[#C68E4D]" />
              <span className="font-mono text-xs md:text-sm font-medium uppercase tracking-wider text-[#1A2B45]">
                {item.label || item.value || ''}
              </span>
            </div>
          );
        })}
      </div>
    </Container>
  </section>
);
}
