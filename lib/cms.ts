import { cache } from "react";
import type { CMSPage, CMSSection, CMSSeo } from "../types/cms";

const LARAVEL_API_URL = (process.env.LARAVEL_API_URL ?? "").trim();
const CMS_PAGE_ENDPOINT = (process.env.CMS_PAGE_ENDPOINT ?? "/api/pages").trim();
const DEFAULT_HOME_SLUG = (process.env.CMS_HOME_SLUG ?? "home").replace(/^\/+|\/+$/g, "");

function getLaravelApiBaseUrl(): string | null {
  if (!LARAVEL_API_URL) {
    console.error(
      "Missing LARAVEL_API_URL. Set LARAVEL_API_URL in .env.local (for local) or environment variables (staging/prod).",
    );
    return null;
  }

  return LARAVEL_API_URL.replace(/\/+$/g, "");
}

function normalizeSlugPath(slugPath: string): string {
  const normalized = slugPath.trim().replace(/^\/+|\/+$/g, "");
  return normalized || DEFAULT_HOME_SLUG;
}

function buildPageUrl(baseUrl: string, slugPath: string): string {
  const normalized = normalizeSlugPath(slugPath);
  const encodedPath = normalized.split("/").map(encodeURIComponent).join("/");
  const endpoint = CMS_PAGE_ENDPOINT.replace(/^\/+|\/+$/g, "");
  const relativePath = `${endpoint}/${encodedPath}`;
  return new URL(relativePath, `${baseUrl}/`).toString();
}

function isCmsSeo(value: unknown): value is CMSSeo {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.title === "string" && typeof candidate.description === "string";
}

function isCmsSection(value: unknown): value is CMSSection {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.type === "string" &&
    Boolean(candidate.data) &&
    typeof candidate.data === "object" &&
    typeof candidate.is_active === "boolean"
  );
}

function isCmsPage(value: unknown): value is CMSPage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  if (
    typeof candidate.id !== "number" ||
    typeof candidate.slug !== "string" ||
    typeof candidate.template !== "string" ||
    !isCmsSeo(candidate.seo) ||
    !Array.isArray(candidate.sections)
  ) {
    return false;
  }

  return candidate.sections.every((section) => isCmsSection(section));
}

export const getCmsPage = cache(async (slugPath: string): Promise<CMSPage | null> => {
  const baseUrl = getLaravelApiBaseUrl();

  if (!baseUrl) {
    return null;
  }

  const response = await fetch(buildPageUrl(baseUrl, slugPath), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload: unknown = await response.json();

  if (!isCmsPage(payload)) {
    throw new Error("CMS page response does not match the locked page contract.");
  }

  return payload;
});
