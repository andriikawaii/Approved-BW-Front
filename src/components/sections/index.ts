import dynamic from 'next/dynamic';

// Above-fold: load synchronously (LCP-critical)
import Hero from './Hero';
import HeroSlider from './HeroSlider';
import TrustBar from './TrustBar';
import PageHero from './PageHero';
import HeroServiceLocation from './HeroServiceLocation';
import ServiceHero from './ServiceHero';
import { RichText } from './RichText';
import { CallToAction } from './CallToAction';

// Synchronous — lightweight / SSR-critical
import ProblemSection from './ProblemSection';
import ServicesSection from './ServicesSection';
import ServicesGrid from './ServicesGrid';
import ProcessSteps from './ProcessSteps';
import LeadForm from './LeadForm';
import CtaSplitForm from './CtaSplitForm';
import ServiceIntroSplit from './ServiceIntroSplit';
import ServiceProcess from './ServiceProcess';
import ImageTextSplit from './ImageTextSplit';
import IconCards from './IconCards';
import TwoColumnText from './TwoColumnText';
import OfficeInfo from './OfficeInfo';
import FeatureGrid from './FeatureGrid';
import DarkTextSection from './DarkTextSection';
import FullWidthTextDark from './FullWidthTextDark';
import StorySplitSection from './StorySplitSection';
import RichTextImage from './RichTextImage';
import FeatureListTwoColumn from './FeatureListTwoColumn';
import Warranty from './Warranty';
import FAQSection from './FAQ';
import ServiceAreas from './ServiceAreas';
import TownList from './TownList';
import ProjectHighlights from './ProjectHighlights';
import LogoStrip from './LogoStrip';
import ServiceAreaText from './ServiceAreaText';
import ServiceFaqAccordion from './ServiceFaqAccordion';
import ServiceTwoColumn from './ServiceTwoColumn';
import ServiceAreaHighlight from './ServiceAreaHighlight';
import ConsultationCtaSplit from './ConsultationCtaSplit';
import CaseStudyHighlight from './CaseStudyHighlight';
import StatsBar from './StatsBar';
import CtaDarkBand from './CtaDarkBand';
import CtaLightSection from './CtaLightSection';
import ContactSplitLayout from './ContactSplitLayout';
import OfficeInfoCards from './OfficeInfoCards';
import RequirementsSection from './RequirementsSection';
import BenefitsGrid from './BenefitsGrid';
import CaseStudyHeader from './CaseStudyHeader';
import CaseStudyMeta from './CaseStudyMeta';
import CaseStudyBody from './CaseStudyBody';

// Below-fold: dynamically loaded to reduce initial JS bundle
type LazySection = React.ComponentType<{ data: never }>;
function lazySection<T>(factory: () => Promise<{ default: React.ComponentType<T> }>): LazySection {
  return dynamic(factory, { ssr: false }) as unknown as LazySection;
}
const StatsCounterSection = lazySection(() => import('./StatsCounterSection'));
const Testimonials = lazySection(() => import('./Testimonials'));
const TestimonialSliderSmall = lazySection(() => import('./TestimonialSliderSmall'));
const TeamMembers = lazySection(() => import('./TeamMembers'));
const BeforeAfterGrid = lazySection(() => import('./BeforeAfterGrid'));
const BeforeAfterShowcase = lazySection(() => import('./BeforeAfterShowcase'));
const ProjectCategoryFilter = lazySection(() => import('./ProjectCategoryFilter'));
const ProjectsMasonryGrid = lazySection(() => import('./ProjectsMasonryGrid'));
const MapEmbedSection = lazySection(() => import('./MapEmbedSection'));
const ApplicationFormSection = lazySection(() => import('./ApplicationFormSection'));
const CaseStudyGallery = lazySection(() => import('./CaseStudyGallery'));

export const sectionMap: Record<string, React.ComponentType<{ data: never }>> = {
  hero: Hero,
  hero_slider: HeroSlider,
  trust_bar: TrustBar,
  rich_text: RichText,
  local_context: RichText,
  call_to_action: CallToAction,
  cta_block: CallToAction,
  problem: ProblemSection,
  services: ServicesSection,
  services_grid: ServicesGrid,
  stats_counter: StatsCounterSection,
  story_split: StorySplitSection,
  rich_text_image: RichTextImage,
  feature_list_two_column: FeatureListTwoColumn,
  warranty: Warranty,
  faq: FAQSection,
  faq_list: FAQSection,
  service_areas: ServiceAreas,
  areas_served: ServiceAreas,
  town_list: TownList,
  process_steps: ProcessSteps,
  testimonials: Testimonials,
  project_highlights: ProjectHighlights,
  lead_form: LeadForm,
  page_hero: PageHero,
  image_text_split: ImageTextSplit,
  icon_cards: IconCards,
  team_members: TeamMembers,
  two_column_text: TwoColumnText,
  office_info: OfficeInfo,
  feature_grid: FeatureGrid,
  dark_text_section: DarkTextSection,
  cta_split_form: CtaSplitForm,
  service_hero: ServiceHero,
  service_intro_split: ServiceIntroSplit,
  service_process: ServiceProcess,
  full_width_text_dark: FullWidthTextDark,
  before_after_grid: BeforeAfterGrid,
  testimonial_slider_small: TestimonialSliderSmall,
  logo_strip: LogoStrip,
  service_area_text: ServiceAreaText,
  faq_accordion: ServiceFaqAccordion,
  hero_service_location: HeroServiceLocation,
  service_two_column: ServiceTwoColumn,
  before_after_showcase: BeforeAfterShowcase,
  service_area_highlight: ServiceAreaHighlight,
  consultation_cta_split: ConsultationCtaSplit,
  project_category_filter: ProjectCategoryFilter,
  projects_masonry_grid: ProjectsMasonryGrid,
  case_study_highlight: CaseStudyHighlight,
  stats_bar: StatsBar,
  cta_dark_band: CtaDarkBand,
  cta_light_section: CtaLightSection,
  contact_split_layout: ContactSplitLayout,
  office_info_cards: OfficeInfoCards,
  map_embed: MapEmbedSection,
  requirements_section: RequirementsSection,
  benefits_grid: BenefitsGrid,
  application_form_section: ApplicationFormSection,
  case_study_header: CaseStudyHeader,
  case_study_meta: CaseStudyMeta,
  case_study_body: CaseStudyBody,
  case_study_gallery: CaseStudyGallery,
  service_overview_with_inline_form: LeadForm,
  housing_stock: RichText,
  alt_blocks: ProjectHighlights,
  neighborhoods: TownList,
  permitting: RichText,
  costs: RichText,
  what_to_expect: ProcessSteps,
  nearby_areas: TownList,
  cta: CallToAction,
};
