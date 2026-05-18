import { MessageCircle } from "lucide-react";

const PHONE = "18043720615";
const MESSAGE = "Hi Brandford, I'd like to know more about your services.";

const ChatButton = () => {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  };
  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-[60] group flex items-center gap-2.5 bg-primary text-primary-foreground pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30 pointer-events-none" />
      <MessageCircle className="w-5 h-5 relative" />
      <span className="hidden sm:inline text-sm font-semibold relative">Contact Us</span>
    </a>
  );
};

export default ChatButton;
