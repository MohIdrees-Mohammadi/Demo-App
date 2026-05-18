import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import logoLight from "@/assets/brandford-logo-white.png";

const DEFAULT_COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_SERVICE_LINKS = [
  { label: "Construction", href: "/services/construction" },
  { label: "Engineering & Design", href: "/services/engineering-design" },
];

const Footer = () => {
  const { get, getJSON } = useSiteContent();
  const brandName = get("site.brand.name", "Brandford");
  const brandShort = get("site.brand.short", "B");
  const tagline = get(
    "site.footer.tagline",
    "Brandford Construction delivers integrated construction and engineering services that keep projects moving efficiently, on schedule, and within budget."
  );
  const addrLine1 = get("site.contact.address_line1", "5000 Thayer Center Ste C");
  const addrLine2 = get("site.contact.address_line2", "Oakland, MD 21550");
  const phone = get("site.contact.phone", "(804) 372-0615");
  const email = get("site.contact.email", "info@brandford.us");
  const ctaText = get(
    "site.footer.cta_text",
    "Tell us about your project and we'll get back to you with pricing and next steps."
  );
  const copyright = get("site.footer.copyright", "© {year} Brandford Construction. All Rights Reserved.").replace(
    "{year}",
    String(new Date().getFullYear())
  );
  const companyLinks = DEFAULT_COMPANY_LINKS;
  const serviceLinks = DEFAULT_SERVICE_LINKS;

  return (
    <footer className="bg-secondary pt-16 sm:pt-20 pb-10 sm:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <img src={logoLight} alt={`${brandName} Construction`} className="h-12 sm:h-14 w-auto" />
            </div>
            <p className="text-xs sm:text-sm text-primary-foreground/55 leading-relaxed mb-6">{tagline}</p>
            <div className="space-y-2.5">
              <p className="flex items-start gap-2 text-xs sm:text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  {addrLine1}
                  <br />
                  {addrLine2}
                </span>
              </p>
              <p className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/60">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                {phone}
              </p>
              <p className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/60">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                {email}
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-5 text-base sm:text-lg uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {(companyLinks || DEFAULT_COMPANY_LINKS).map((link, i) => (
                <li key={`${link.label}-${i}`}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-sm text-primary-foreground/60 hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-primary text-[10px]">//</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-5 text-base sm:text-lg uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {(serviceLinks || DEFAULT_SERVICE_LINKS).map((link, i) => (
                <li key={`${link.label}-${i}`}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-sm text-primary-foreground/60 hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-primary text-[10px]">//</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Card */}
          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-5 text-base sm:text-lg uppercase tracking-wider">Start a Project</h4>
            <div className="bg-primary/15 border border-primary/30 rounded-lg p-5">
              <p className="text-xs text-primary-foreground/75 leading-relaxed mb-4">{ctaText}</p>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Request a Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] sm:text-xs text-primary-foreground/35">{copyright}</p>
          <Link
            to="/admin"
            className="text-[10px] sm:text-xs text-primary-foreground/25 hover:text-primary-foreground/50 transition-colors"
          >
            Admin
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-primary-foreground/5 text-center">
          <p className="text-[11px] sm:text-xs text-primary-foreground/40">
            Developed by{" "}
            <a
              href="https://mohammadi-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Idrees Mohammadi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
