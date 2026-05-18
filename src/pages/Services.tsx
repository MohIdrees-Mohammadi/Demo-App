import Layout from "@/components/Layout";
import ServicesSection from "@/components/ServicesSection";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";
import { useSiteContent } from "@/hooks/useSiteContent";
import Seo from "@/components/Seo";

const Services = () => {
  const { get } = useSiteContent();
  return (
    <WithPageLoader>
      <Seo
        title="Services — Construction, Engineering & Design | Brandford"
        description="Explore Brandford's full-service offering: general contracting, structural engineering, detailing, and design across commercial and infrastructure projects."
        path="/services"
      />
      <Layout>
        <PageBanner
          title={get("page.services.title", "Our Services")}
          breadcrumb="Services"
          bannerImage={get("page.services.banner")}
        />
        <ServicesSection />
      </Layout>
    </WithPageLoader>
  );
};

export default Services;

