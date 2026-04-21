import { useState, useEffect } from "react";
import { Menu, ChevronDown, ChevronRight, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Structural Steel Detailing", href: "/services/structural-steel-detailing" },
      { label: "Miscellaneous Steel Detailing", href: "/services/miscellaneous-steel-detailing" },
      { label: "Connection Design & PE Stamping", href: "/services/connection-design-pe-stamping" },
      { label: "Structural Steel Take Off Services", href: "/services/structural-steel-take-off-services" },
    ],
  },
  { label: "What We Do", href: "/what-we-do" },
  {
    label: "News",
    href: "/news",
    children: [
      { label: "Steel Detailing for Pedestrian Bridges", href: "/news/steel-detailing-for-pedestrian-bridges" },
      { label: "Steel Detailing Change Orders", href: "/news/steel-detailing-change-orders" },
      { label: "Structural Steel Take Off Services", href: "/news/structural-steel-take-off-services" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();

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
          ? "bg-background/90 backdrop-blur-lg shadow-md border-b border-border/60"
          : "bg-background/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${scrolled ? "py-2 md:py-2.5" : "py-3 md:py-4"}`}>
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-secondary leading-tight">
              <span className="text-primary">A</span>cero
              <span className="text-primary">E</span>ngineering
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-xs tracking-[3px] sm:tracking-[4px] uppercase text-steel group-hover:text-primary transition-colors">LLC</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className={`nav-link flex items-center gap-1 py-2 ${isActive(item.href) ? "text-primary" : ""}`}
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
                <span className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-primary origin-left transition-transform duration-300 ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    className="absolute top-full left-0 bg-background shadow-xl min-w-[280px] py-2 border border-border"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className={`block px-5 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary ${
                          isActive(child.href) ? "text-primary bg-primary/5 border-l-primary" : "text-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mobile Sheet */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden text-secondary p-2 hover:bg-muted/50 rounded-md transition-colors">
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[340px] sm:w-[400px] bg-secondary p-0 border-l-0 flex flex-col [&>button]:text-primary-foreground [&>button]:hover:text-primary"
          >
            {/* Header */}
            <div className="px-8 pt-10 pb-7">
              <h2 className="text-2xl font-heading font-bold text-primary-foreground leading-tight">
                <span className="text-primary">A</span>cero
                <span className="text-primary">E</span>ngineering
              </h2>
              <p className="text-[10px] tracking-[4px] uppercase text-primary-foreground/60 mt-1">LLC</p>
              <div className="w-14 h-[3px] bg-primary mt-5 rounded-full" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4">
              {navItems.map((item, index) =>
                item.children ? (
                  <Collapsible key={item.label}>
                    <div className="flex items-center group border-b border-primary-foreground/10">
                      <Link
                        to={item.href}
                        className={`flex-1 px-4 py-4 text-[15px] font-heading font-semibold tracking-wide transition-colors ${
                          isActive(item.href) 
                            ? "text-primary" 
                            : "text-primary-foreground hover:text-primary"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="bg-primary-foreground/10 text-primary-foreground/70 text-xs font-mono px-1.5 py-0.5 rounded">0{index + 1}</span>
                          {item.label}
                        </span>
                      </Link>
                      <CollapsibleTrigger className="p-3 mr-1 bg-primary-foreground/10 text-primary-foreground/70 hover:text-primary-foreground transition-colors rounded-md">
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 [[data-state=open]>&]:rotate-90" />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <div className="ml-12 mr-4 mb-2 border-l-2 border-primary/30 pl-4 space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className={`flex items-center gap-2 py-2.5 text-[13px] font-medium transition-colors ${
                              isActive(child.href)
                                ? "text-primary"
                                : "text-primary-foreground/80 hover:text-primary"
                            }`}
                          >
                            <ArrowRight className="w-3 h-3 shrink-0 text-primary-foreground/50" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block px-4 py-4 text-[15px] font-heading font-semibold tracking-wide transition-colors border-b border-primary-foreground/10 ${
                      isActive(item.href) 
                        ? "text-primary" 
                        : "text-primary-foreground hover:text-primary"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="bg-primary-foreground/10 text-primary-foreground/70 text-xs font-mono px-1.5 py-0.5 rounded">0{index + 1}</span>
                      {item.label}
                    </span>
                  </Link>
                )
              )}
            </nav>

            {/* Footer section */}
            <div className="mt-auto px-8 pb-8 pt-4 space-y-5">
              {/* Contact info */}
              <div className="space-y-2.5">
                <a href="mailto:info@aceroengllc.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary transition-colors text-xs">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  info@aceroengllc.com
                </a>
                <div className="flex items-center gap-3 text-primary-foreground/70 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  Mckinney TX, 75070
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3.5 text-sm font-heading font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
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
