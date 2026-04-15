import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";

const Contact = () => {
  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title="Contact Us" breadcrumb="Contact" />
        <ContactSection />
      </Layout>
    </WithPageLoader>
  );
};

export default Contact;
