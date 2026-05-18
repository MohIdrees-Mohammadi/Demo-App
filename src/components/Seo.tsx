import { Helmet } from "react-helmet-async";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. "/", "/about", "/services/construction"
  ogType?: "website" | "article";
  jsonLd?: JsonLd;
}

const Seo = ({ title, description, path, ogType = "website", jsonLd }: SeoProps) => {
  const desc = description.length > 160 ? description.slice(0, 157).trimEnd() + "…" : description;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={path} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={path} />
      <meta property="og:type" content={ogType} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
