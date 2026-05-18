import Layout from "@/components/Layout";
import AboutSection from "@/components/AboutSection";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";
import { useSiteContent } from "@/hooks/useSiteContent";
import Seo from "@/components/Seo";

const About = () => {
  const { get } = useSiteContent();
  return (
    <WithPageLoader>
      <Seo
        title="About Brandford Construction — Who We Are"
        description="Brandford Construction is a trusted partner delivering integrated construction and engineering services with safety, quality, and on-time completion."
        path="/about"
      />
      <Layout>
        <PageBanner
          title={get("page.about.title", "About Us")}
          breadcrumb="About"
          bannerImage={get("page.about.banner")}
        />
        <AboutSection />
      </Layout>
    </WithPageLoader>
  );
};

export default About;

