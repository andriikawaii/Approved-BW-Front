import { Shield, Star, Clock, MapPin } from 'lucide-react';
import Container from '@/src/components/ui/Container';

type Props = {
  data: {
    license: string;
    rating: string;
    experience: string;
    areas: string;
  };
};

export default function TrustBar({ data }: Props) {
  return (
    <section className="bg-[#F4F4F4] border-b border-black/10 py-6 md:py-8">
        <Container>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div className="flex items-center justify-center gap-3">
                <Shield className="h-5 w-5 text-[#C68E4D]" />
                <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-800">
                {data.license}
                </span>
            </div>

            <div className="flex items-center justify-center gap-3">
                <Star className="h-5 w-5 text-[#C68E4D]" />
                <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-800">
                {data.rating}
                </span>
            </div>

            <div className="flex items-center justify-center gap-3">
                <Clock className="h-5 w-5 text-[#C68E4D]" />
                <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-800">
                {data.experience}
                </span>
            </div>

            <div className="flex items-center justify-center gap-3">
                <MapPin className="h-5 w-5 text-[#C68E4D]" />
                <span className="text-xs md:text-sm font-medium uppercase tracking-wider text-gray-800">
                {data.areas}
                </span>
            </div>
            </div>
        </Container>
        </section>
  );
}
