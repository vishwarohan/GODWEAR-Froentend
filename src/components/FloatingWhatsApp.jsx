import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { genericMessage, whatsappUrl } from '../utils/whatsapp';

const FloatingWhatsApp = () => (
  <motion.a
    href={whatsappUrl(genericMessage())}
    target="_blank"
    rel="noreferrer"
    className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-god-whatsapp text-3xl text-white shadow-lg shadow-green-500/25 focus-gold"
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 1.8, repeat: Infinity }}
    aria-label="Chat with us on WhatsApp"
  >
    <FaWhatsapp />
    <span className="pointer-events-none absolute bottom-16 right-0 w-max rounded-lg border border-god-border bg-god-card px-3 py-2 text-xs text-white opacity-0 shadow-dark transition group-hover:opacity-100">
      Chat with us!
    </span>
  </motion.a>
);

export default FloatingWhatsApp;
