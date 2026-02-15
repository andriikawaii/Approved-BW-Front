import type { Metadata } from 'next';
import CatchAllPage, {
  generateMetadata as catchAllGenerateMetadata,
} from './[...slug]/page';

const rootParams = Promise.resolve({ slug: [] });

export async function generateMetadata(): Promise<Metadata> {
  return catchAllGenerateMetadata({ params: rootParams });
}

export default function HomePage() {
  return CatchAllPage({ params: rootParams });
}
