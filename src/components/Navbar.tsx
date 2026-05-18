import { useState, useEffect } from "react";
import { Menu, ChevronRight, Mail, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSiteContent } from "@/hooks/useSiteContent";
import logoDark from "@/assets/brandford-logo.png";
import logoLight from "@/assets/brandford-logo-white.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();
  const { get } = useSiteContent();
  const brandName = get("site.brand.name", "Brandford");
  const brandShort = get("site.brand.short", "B");
  const brandSub = get("site.brand.tagline_small", "Construction");
  const email = get("site.contact.email", "info@brandford.us");
  const addr = `${get("site.contact.address_line1", "5000 Thayer Center Ste C")}, ${get("site.contact.address_line2", "Oakland, MD 21550")}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md border-b border-border/60"
          : "bg-background/85 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${scrolled ? "py-2.5" : "py-3.5"}`}>
        <Link to="/" className="flex items-center shrink-0 group" aria-label={brandName}>
          <img src={logoDark} alt={`${brandName} Construction`} className="h-10 sm:h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`nav-link relative py-2 ${isActive(item.href) ? "text-primary" : ""}`}
            >
              {item.label}
              <span className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-primary origin-left transition-transform duration-300 ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </Link>
          ))}
          <Link
            to="/quote"
            className="ml-2 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-xs font-heading font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Get a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Sheet */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden text-secondary p-2 hover:bg-muted/50 rounded-md transition-colors" aria-label="Open menu">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[340px] sm:w-[400px] bg-secondary p-0 border-l-0 flex flex-col [&>button]:text-primary-foreground [&>button]:hover:text-primary"
          >
            <div className="px-8 pt-10 pb-7">
              <div className="flex items-center">
                <img src={logoLight} alt={brandName} className="h-12 w-auto" />
              </div>
              <div className="w-14 h-[3px] bg-primary mt-5 rounded-full" />
            </div>

            <nav className="flex-1 overflow-y-auto px-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center justify-between px-4 py-4 text-[15px] font-heading font-semibold tracking-wide transition-colors border-b border-primary-foreground/10 ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-primary-foreground hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="bg-primary-foreground/10 text-primary-foreground/70 text-xs font-mono px-1.5 py-0.5 rounded">0{index + 1}</span>
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-8 pb-8 pt-4 space-y-5">
              <div className="space-y-2.5">
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary transition-colors text-xs">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  {email}
                </a>
                <div className="flex items-start gap-3 text-primary-foreground/70 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{addr}</span>
                </div>
              </div>

              <Link
                to="/quote"
                className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3.5 rounded-md text-sm font-heading font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
              >
                Get A Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
};

export default Navbar;
