import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";
import { useSiteContent } from "@/hooks/useSiteContent";
import Seo from "@/components/Seo";

const Contact = () => {
  const { get } = useSiteContent();
  return (
    <WithPageLoader>
      <Seo
        title="Contact Brandford Construction — Get in Touch"
        description="Have a project in mind? Contact Brandford Construction for quotes, questions, or partnership inquiries. We typically respond within 24 hours."
        path="/contact"
      />
      <Layout>
        <PageBanner
          title={get("page.contact.title", "Contact Us")}
          breadcrumb="Contact"
          bannerImage={get("page.contact.banner")}
        />
        <ContactSection />
      </Layout>
    </WithPageLoader>
  );
};

export default Contact;

