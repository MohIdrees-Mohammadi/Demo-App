// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.8" },
  { path: "/careers", changefreq: "weekly", priority: "0.6" },
  { path: "/quote", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
];

async function fetchDynamicEntries(): Promise<SitemapEntry[]> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  const sb = createClient(url, key);
  const out: SitemapEntry[] = [];
  const { data: services } = await sb.from("services").select("slug, updated_at");
  (services ?? []).forEach((s: any) => {
    if (s?.slug) out.push({ path: `/services/${s.slug}`, lastmod: s.updated_at?.slice(0, 10), changefreq: "monthly", priority: "0.7" });
  });
  const { data: projects } = await sb.from("projects").select("slug, updated_at");
  (projects ?? []).forEach((p: any) => {
    if (p?.slug) out.push({ path: `/projects/${p.slug}`, lastmod: p.updated_at?.slice(0, 10), changefreq: "monthly", priority: "0.7" });
  });
  return out;
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ].filter(Boolean).join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const dynamic = await fetchDynamicEntries().catch(() => []);
const entries = [...STATIC_ENTRIES, ...dynamic];
writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
