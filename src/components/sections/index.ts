import Hero from './Hero';
import HeroSlider from './HeroSlider';
import TrustBar from './TrustBar';
import { RichText } from './RichText';
import { CallToAction } from './CallToAction';
import ProblemSection from './ProblemSection';
import ServicesSection from './ServicesSection';
import ServicesGrid from './ServicesGrid';
import StatsCounterSection from './StatsCounterSection';
import StorySplitSection from './StorySplitSection';
import RichTextImage from './RichTextImage';
import FeatureListTwoColumn from './FeatureListTwoColumn';
import Warranty from './Warranty';
import FAQSection from './FAQ';
import ServiceAreas from './ServiceAreas';
import ProcessSteps from './ProcessSteps';
import Testimonials from './Testimonials';
import ProjectHighlights from './ProjectHighlights';
import LeadForm from './LeadForm';
import PageHero from './PageHero';
import ImageTextSplit from './ImageTextSplit';
import IconCards from './IconCards';
import TeamMembers from './TeamMembers';
import TwoColumnText from './TwoColumnText';
import OfficeInfo from './OfficeInfo';
import FeatureGrid from './FeatureGrid';
import DarkTextSection from './DarkTextSection';
import CtaSplitForm from './CtaSplitForm';
import ServiceHero from './ServiceHero';
import ServiceIntroSplit from './ServiceIntroSplit';
import ServiceProcess from './ServiceProcess';
import FullWidthTextDark from './FullWidthTextDark';
import BeforeAfterGrid from './BeforeAfterGrid';
import TestimonialSliderSmall from './TestimonialSliderSmall';
import LogoStrip from './LogoStrip';
import ServiceAreaText from './ServiceAreaText';
import ServiceFaqAccordion from './ServiceFaqAccordion';
import HeroServiceLocation from './HeroServiceLocation';
import ServiceTwoColumn from './ServiceTwoColumn';
import BeforeAfterShowcase from './BeforeAfterShowcase';
import ServiceAreaHighlight from './ServiceAreaHighlight';
import ConsultationCtaSplit from './ConsultationCtaSplit';
import ProjectCategoryFilter from './ProjectCategoryFilter';
import ProjectsMasonryGrid from './ProjectsMasonryGrid';
import CaseStudyHighlight from './CaseStudyHighlight';
import StatsBar from './StatsBar';
import CtaDarkBand from './CtaDarkBand';
import CtaLightSection from './CtaLightSection';
import ContactSplitLayout from './ContactSplitLayout';
import OfficeInfoCards from './OfficeInfoCards';
import MapEmbedSection from './MapEmbedSection';
import RequirementsSection from './RequirementsSection';
import BenefitsGrid from './BenefitsGrid';
import ApplicationFormSection from './ApplicationFormSection';

export const sectionMap: Record<string, React.ComponentType<{ data: any }>> = {
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
  town_list: ServiceAreas,
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
};
