import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 sm:pt-20 pb-10 sm:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-heading font-extrabold text-lg shadow-md">
                B
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-primary-foreground uppercase tracking-tight">
                Brandford
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-primary-foreground/55 leading-relaxed mb-6">
              Brandford Construction delivers integrated construction, engineering, and material solutions — keeping projects on schedule and within budget.
            </p>
            <div className="space-y-2.5">
              <p className="flex items-start gap-2 text-xs sm:text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                123 Main Street, Suite 400
              </p>
              <p className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/60">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +93 747 877 431
              </p>
              <p className="flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/60">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                info@brandford.com
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-primary-foreground mb-5 text-base sm:text-lg uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
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
              {[
                { label: "Construction", href: "/services/construction" },
                { label: "Engineering & Design", href: "/services/engineering-design" },
                { label: "Material Supply", href: "/services/material-supply" },
                { label: "Get a Quote", href: "/quote" },
              ].map((link) => (
                <li key={link.label}>
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
              <p className="text-xs text-primary-foreground/75 leading-relaxed mb-4">
                Tell us about your project and we'll get back to you with pricing and next steps.
              </p>
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

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] sm:text-xs text-primary-foreground/35">
            © {new Date().getFullYear()} Brandford Construction. All Rights Reserved.
          </p>
          <Link
            to="/admin"
            className="text-[10px] sm:text-xs text-primary-foreground/25 hover:text-primary-foreground/50 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
