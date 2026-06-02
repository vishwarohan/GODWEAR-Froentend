import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import { whatsappUrl } from '../utils/whatsapp';
import { setSeo } from '../utils/seo';

const contactItems = [
  { icon: FaPhoneAlt, label: 'Call', value: '+91 80849 11306', href: 'tel:+918084911306' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 80849 11306', href: whatsappUrl('Hi! I would like to discuss a GOD WEAR bulk or team order.') },
  { icon: FaInstagram, label: 'Instagram', value: '@godwearofficial', href: 'https://www.instagram.com/godwearofficial' },
  { icon: FaEnvelope, label: 'Email', value: 'contact@godwear.com', href: 'mailto:contact@godwear.com' },
];

const fieldClass = 'w-full border-b border-god-border bg-transparent py-3 text-sm text-white placeholder:text-white/25 focus:border-god-gold focus:outline-none';
const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  useEffect(() => setSeo('Contact', 'Contact GOD WEAR for bulk, team, gym, and corporate activewear inquiries.'), []);

  const submit = (event) => {
    event.preventDefault();
    const message = `Hi GOD WEAR! I would like to request a bulk quote.

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || 'Not provided'}

Requirement:
${form.message}`;
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden border-b border-god-border bg-[#0b0908] py-16 md:py-24">
      <div className="container-god">
        <motion.header {...reveal} className="max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-god-gold">Contact</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
            <h1 className="font-heading text-6xl leading-[0.9] text-white md:text-8xl">Bulk, Team &amp; Corporate Inquiries</h1>
            <p className="text-sm leading-7 text-god-muted">
              A direct path for teams, coaches, gyms, and corporate buyers. For single products, continue through the shop.
            </p>
          </div>
          <div className="mt-7 h-px w-32 bg-god-gold" />
        </motion.header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div {...reveal}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-god-gold">Reach Us</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-god-muted">
              Tell us your sizes, quantity, delivery city, and timeline. We usually reply within one business day.
            </p>

            <div className="mt-5">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-center gap-4 border-b border-god-border py-4 transition hover:border-god-gold/60">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-god-border bg-white/[0.03] text-god-muted transition group-hover:border-god-gold/60 group-hover:text-god-gold"><Icon /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-god-muted">{label}</span>
                    <span className="mt-1 block truncate text-sm text-gray-200 transition group-hover:text-white">{value}</span>
                  </span>
                  <span className="text-god-muted transition group-hover:text-god-gold">↗</span>
                </a>
              ))}
            </div>

            <div className="mt-9">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-god-gold"><FaClock /> Business Hours</p>
              <div className="mt-5 space-y-3 text-sm">
                <p className="flex justify-between text-god-muted"><span>Monday - Friday</span><span className="text-gray-200">9 AM - 8 PM</span></p>
                <p className="flex justify-between text-god-muted"><span>Saturday</span><span className="text-gray-200">10 AM - 6 PM</span></p>
                <p className="flex justify-between text-god-muted"><span>Sunday</span><span className="text-god-muted">Closed</span></p>
              </div>
            </div>

            <p className="mt-7 flex items-start gap-2 text-sm leading-6 text-god-muted"><FaMapMarkerAlt className="mt-1 shrink-0 text-god-gold" /> 1st floor, Bajrangi Chowk, Deo, Jharkhand 814112</p>
          </motion.div>

          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="border-t border-god-border pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-god-gold">Request a Bulk Quote</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-god-muted">Share your requirement and we will open a pre-filled WhatsApp draft for faster coordination.</p>

            <form onSubmit={submit} className="mt-8 grid gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-god-muted">
                  Full name
                  <input className={fieldClass} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </label>
                <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-god-muted">
                  Work or personal email
                  <input className={fieldClass} type="email" placeholder="team@gym.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </label>
              </div>
              <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-god-muted">
                Phone number (optional)
                <input className={fieldClass} type="tel" placeholder="+91 98XXXXXX98" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </label>
              <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-god-muted">
                What do you need?
                <textarea className={`${fieldClass} min-h-28 resize-y`} placeholder="Team quantity, preferred sizes, delivery city, or customization brief." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </label>
              <button className="btn-gold w-full sm:w-fit">Request Bulk Quote <FaArrowRight /></button>
            </form>

            <div className="mt-7 flex flex-wrap gap-5 text-xs text-god-muted">
              <span className="flex items-center gap-2"><FaShieldAlt /> We use your details only to reply.</span>
              <span className="flex items-center gap-2"><FaClock /> Reply within one business day.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
