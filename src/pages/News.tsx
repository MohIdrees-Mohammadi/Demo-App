import Layout from "@/components/Layout";
import NewsSection from "@/components/NewsSection";
import PageBanner from "@/components/PageBanner";
import { WithPageLoader } from "@/components/PageLoader";

const News = () => {
  return (
    <WithPageLoader>
      <Layout>
        <PageBanner title="News & Blogs" breadcrumb="News" />
        <NewsSection />
      </Layout>
    </WithPageLoader>
  );
};

export default News;
