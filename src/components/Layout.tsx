import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatButton from "./ChatButton";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatButton />
    </div>
  );
};

export default Layout;
