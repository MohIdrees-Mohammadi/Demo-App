import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import CtaSection from "@/components/CtaSection";
import { WithPageLoader } from "@/components/PageLoader";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <WithPageLoader>
      <Seo
        title="Brandford Construction — Engineering & Material Solutions"
        description="Integrated construction, engineering, and material supply. From design and detailing to delivery, we keep projects moving on time and within budget."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Brandford Construction",
            url: "/",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Brandford Construction",
            url: "/",
          },
        ]}
      />
      <Layout>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <FeaturedProjectsSection />
        <CtaSection />
      </Layout>
    </WithPageLoader>
  );
};

export default Index;

