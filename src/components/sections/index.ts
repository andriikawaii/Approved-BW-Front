import HeroSlider from './HeroSlider';
import TrustBar from './TrustBar';
import { RichText } from './RichText';
import { CallToAction } from './CallToAction';
import ProblemSection from './ProblemSection';
import ServicesSection from './ServicesSection';
import StatsCounterSection from './StatsCounterSection';
import StorySplitSection from './StorySplitSection';
import Warranty from './Warranty';
import FAQSection from './FAQ';
import ServiceAreas from './ServiceAreas';

export const sectionMap = {
  hero_slider: HeroSlider,
  trust_bar: TrustBar,
  rich_text: RichText,
  call_to_action: CallToAction,
  problem: ProblemSection,
  services: ServicesSection,
  stats_counter: StatsCounterSection,
  story_split: StorySplitSection,
  warranty: Warranty,
  faq: FAQSection,
  service_areas: ServiceAreas,
};
