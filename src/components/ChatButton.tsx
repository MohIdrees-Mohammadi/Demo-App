import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "93747877431"; // +93 747 877 431, no plus, no spaces
const WHATSAPP_MESSAGE = "Hi Brandford, I'd like to know more about your services.";

const ChatButton = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-[60] group flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
      <MessageCircle className="w-5 h-5 relative" />
      <span className="hidden sm:inline text-sm font-semibold relative">Chat With Us</span>
    </a>
  );
};

export default ChatButton;
