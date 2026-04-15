import Layout from "@/components/Layout";
import AboutSection from "@/components/AboutSection";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";

const About = () => {
  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title="About Us" breadcrumb="About" />
        <AboutSection />
      </Layout>
    </WithPageLoader>
  );
};

export default About;
