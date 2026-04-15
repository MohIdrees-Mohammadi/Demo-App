import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { WithPageLoader } from "@/components/PageLoader";

const Index = () => {
  return (
    <WithPageLoader>
      <Layout>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <TestimonialsSection />
      </Layout>
    </WithPageLoader>
  );
};

export default Index;
