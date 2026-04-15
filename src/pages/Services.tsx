import Layout from "@/components/Layout";
import ServicesSection from "@/components/ServicesSection";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";

const Services = () => {
  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title="Our Services" breadcrumb="Services" />
        <ServicesSection />
      </Layout>
    </WithPageLoader>
  );
};

export default Services;
