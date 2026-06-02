import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { genericMessage, whatsappUrl } from '../utils/whatsapp';

const Footer = () => (
  <footer className="mt-20 border-t border-god-border bg-[#0b0908]">
    <div className="container-god grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div className="flex items-center gap-3">
          <img src="/images/godwear-logo.png" alt="GOD WEAR logo" className="h-14 w-14 rounded-xl border border-god-gold/50 object-cover shadow-gold" />
          <h2 className="font-heading text-4xl text-god-gold">GOD WEAR</h2>
        </div>
        <p className="mt-3 max-w-md text-sm leading-6 text-god-muted">
          Luxury compression wear built for focused training, recovery, and elevated everyday movement.
        </p>
      </div>
      <div>
        <h3 className="font-bold uppercase tracking-[0.18em] text-god-gold">Support</h3>
        <div className="mt-4 grid gap-2 text-sm text-god-muted">
          <span>Shipping across India</span>
          <span>Secure Razorpay checkout</span>
          <span>Easy support via WhatsApp</span>
          <Link className="transition hover:text-god-gold" to="/contact">Bulk and team inquiries</Link>
        </div>
      </div>
      <div>
        <h3 className="font-bold uppercase tracking-[0.18em] text-god-gold">Connect</h3>
        <div className="mt-4 flex gap-3">
          <a className="grid h-11 w-11 place-items-center rounded-xl border border-god-border text-xl hover:border-god-gold" href={whatsappUrl(genericMessage())} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a className="grid h-11 w-11 place-items-center rounded-xl border border-god-border text-xl hover:border-god-gold" href="https://www.instagram.com/godwearofficial" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
