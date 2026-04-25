import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import CtaSection from "@/components/CtaSection";
import { WithPageLoader } from "@/components/PageLoader";

const Index = () => {
  return (
    <WithPageLoader>
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
