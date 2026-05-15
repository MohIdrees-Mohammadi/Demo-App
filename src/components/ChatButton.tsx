import { Mail } from "lucide-react";

const EMAIL = "info@brandford.us";
const SUBJECT = "Inquiry from Brandford website";
const BODY = "Hi Brandford,\n\nI'd like to know more about your services.\n\n";

const ChatButton = () => {
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
  return (
    <a
      href={href}
      aria-label="Email us"
      className="fixed bottom-6 right-6 z-[60] group flex items-center gap-2.5 bg-primary text-primary-foreground pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30 pointer-events-none" />
      <Mail className="w-5 h-5 relative" />
      <span className="hidden sm:inline text-sm font-semibold relative">Email Us</span>
    </a>
  );
};

export default ChatButton;
