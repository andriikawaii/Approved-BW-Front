"use client";

import type { CMSPage } from "@/types/cms";
import { KitchenRemodelingPageTemplate } from "./KitchenRemodelingPageTemplate";

export function BathroomRemodelingPageTemplate({ page }: { page: CMSPage }) {
  return <KitchenRemodelingPageTemplate page={page} />;
}
