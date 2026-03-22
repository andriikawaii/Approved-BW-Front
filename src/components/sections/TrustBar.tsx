import { ShieldCheck } from 'lucide-react';

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
    town_hub?: boolean;
  };
};

export default function TrustBar({ data }: Props) {
  const isTownHub = Boolean(data.town_hub);
  const items: TrustItem[] =
    data.items && data.items.length > 0
      ? data.items.map((item) => ({
          ...item,
          label: item.label || item.text || '',
        }))
      : [
          { icon: 'calendar', value: '15+', label: data.experience || 'Years of Experience' },
          { icon: 'check-circle', value: '100+', label: 'Completed Projects' },
          { icon: 'star', value: data.rating || '4.9', label: 'Google Rating' },
          { icon: 'shield', value: '✓', label: data.license || 'Fully Bonded & Insured' },
        ];

  const hasValues = items.some((item) => item.value);

  // Dark premium variant when items have numeric values (e.g., office/location pages)
  if (hasValues) {
    return (
      <section
        className={isTownHub ? 'border-y border-[#d6c3a0] bg-[#fbf7ef]' : 'border-y border-[rgba(188,145,85,0.2)]'}
        style={isTownHub ? undefined : { background: 'linear-gradient(135deg, #1E2B43 0%, #151E30 100%)' }}
      >
        <div className={`mx-auto grid max-w-[1280px] grid-cols-2 text-center md:grid-cols-4 ${isTownHub ? 'px-4 md:px-6' : ''}`}>
          {items.map((item, i) => {
            const isShield = item.icon === 'shield' || /bonded|insured/i.test(item.label || '');
            const showBorder = i < items.length - 1;

            return (
              <div
                key={i}
                className={`group cursor-default px-5 py-8 transition-all duration-300 hover:-translate-y-[2px] ${
                  isTownHub
                    ? `hover:bg-[#f6efdf] ${showBorder ? 'border-r border-[#e4d4b8]' : ''}`
                    : `hover:bg-[rgba(188,145,85,0.08)] ${showBorder ? 'border-r border-[rgba(188,145,85,0.12)]' : ''}`
                }`}
              >
                <div
                  className={`text-[42px] font-bold leading-none transition-all duration-300 ${
                    isTownHub
                      ? 'text-[#b7884f] group-hover:text-[#9f7440]'
                      : 'text-[#BC9155] group-hover:text-[#d4a95a] group-hover:[text-shadow:0_0_20px_rgba(188,145,85,0.3)]'
                  }`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {isShield ? (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mx-auto"
                      aria-hidden="true"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ) : (
                    item.value
                  )}
                </div>
                <div className={`mt-2 text-[12px] font-medium uppercase tracking-[1px] transition-colors duration-300 ${isTownHub ? 'text-[#5f6f82] group-hover:text-[#344965]' : 'text-white/60 group-hover:text-white/85'}`}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Light fallback variant (legacy pages without values)
  return (
    <section className="border-b border-[#E5E5E5] bg-[#F4F4F4] py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-0 lg:grid-cols-4">
          {items.map((item, i) => {
            const showDivider = i < items.length - 1;
            return (
              <div
                key={i}
                className={`flex items-center justify-center gap-3 ${showDivider ? 'lg:border-r lg:border-[#E0E0E0]' : ''}`}
              >
                <ShieldCheck className="h-5 w-5 text-[#C68E4D]" />
                <span className="text-xs font-medium uppercase tracking-wider text-[#1A2B45] md:text-sm" style={{ fontFamily: 'monospace' }}>
                  {item.label || item.value || ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
