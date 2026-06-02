import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBolt, FaShieldAlt, FaSyncAlt, FaTint, FaWhatsapp, FaWind } from 'react-icons/fa';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import ReviewCard from '../components/ReviewCard';
import { useGetProductsQuery } from '../redux/api/productApi';
import { setSeo } from '../utils/seo';

const reviews = [
  { name: 'Aarav', rating: 5, comment: 'The compression fit is serious. Premium finish, no loose stitching, and it holds shape after heavy sessions.' },
  { name: 'Meera', rating: 5, comment: 'Feels elevated enough for travel and strong enough for training. The black and gold detail is perfect.' },
  { name: 'Kabir', rating: 5, comment: 'Fast delivery and the size recommendation on WhatsApp helped me choose correctly.' },
];

const visualCollections = [
  {
    title: 'Train',
    subtitle: 'Compression essentials',
    image: '/media/training-court.jpg',
    to: '/shop',
  },
  {
    title: 'Move',
    subtitle: 'Women in motion',
    image: '/media/football-field.jpg',
    to: '/shop',
  },
  {
    title: 'Live',
    subtitle: 'Off-duty layers',
    image: '/media/street-style.jpg',
    to: '/shop',
  },
];

const values = [
  { icon: FaBolt, title: 'Compression tuned', copy: 'Supportive stretch construction that moves cleanly through every rep.' },
  { icon: FaShieldAlt, title: 'Built to endure', copy: 'Premium everyday fabrics selected for repeat training and recovery.' },
  { icon: FaWhatsapp, title: 'Fit support', copy: 'Real assistance on WhatsApp when you need a sizing recommendation.' },
];

const engineeringFeatures = [
  {
    number: '01',
    icon: FaBolt,
    title: 'Compression Mapping',
    copy: 'Panels are shaped to hold close around the torso and shoulders, so each layer feels supportive without becoming stiff.',
    stat: 'Supportive fit · training-ready',
  },
  {
    number: '02',
    icon: FaTint,
    title: 'Sweat Management',
    copy: 'Quick-dry fabric helps reduce that heavy, saturated feeling through indoor sessions and warmer training days.',
    stat: 'Dry-fit build · gym friendly',
  },
  {
    number: '03',
    icon: FaWind,
    title: 'Breathable Comfort',
    copy: 'The construction is tuned for airflow through warm-ups, working sets, cooldowns, and the journey home.',
    stat: 'Ventilated feel · all-session wear',
  },
  {
    number: '04',
    icon: FaSyncAlt,
    title: 'Shape Retention',
    copy: 'A resilient finish keeps the silhouette composed after repeat training and washing, preserving the premium look.',
    stat: 'Repeat-wear finish · cleaner recovery',
  },
];

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.65, ease: 'easeOut' },
};

const Home = () => {
  const { data: featuredData, isLoading: featuredLoading } = useGetProductsQuery({ featured: true, limit: 8 });
  const { data: latestData, isLoading: latestLoading } = useGetProductsQuery({ limit: 8 });
  useEffect(() => setSeo('Luxury Activewear', 'Shop GOD WEAR premium compression activewear and luxury performance essentials.'), []);
  const featuredProducts = featuredData?.products || featuredData || [];
  const latestProducts = latestData?.products || latestData || [];
  const products = featuredProducts.length ? featuredProducts : latestProducts;
  const isLoading = featuredLoading || latestLoading;

  return (
    <>
      <HeroBanner />

      <div className="overflow-hidden border-b border-god-border bg-god-gold py-3 text-god-bg">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.28em]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 2 }).map((_, loop) => (
            <div key={loop} className="flex gap-10">
              <span>Premium activewear</span><span>/</span><span>Move with intent</span><span>/</span><span>Nationwide shipping</span><span>/</span><span>WhatsApp fit support</span><span>/</span>
            </div>
          ))}
        </motion.div>
      </div>

      <section className="container-god py-14 md:py-20">
        <motion.div {...reveal} className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-god-gold">Shop by energy</p>
            <h2 className="mt-2 font-heading text-5xl md:text-7xl">Built For Every Mode</h2>
          </div>
          <Link to="/shop" className="btn-outline hidden sm:inline-flex">View All <FaArrowRight /></Link>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-3">
          {visualCollections.map((collection, index) => (
            <motion.div key={collection.title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.1 }}>
              <Link to={collection.to} className="group relative block aspect-[4/5] overflow-hidden rounded-xl border border-god-border bg-god-card shadow-dark">
                <img src={collection.image} alt={collection.subtitle} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-god-gold">{collection.subtitle}</p>
                  <div className="mt-1 flex items-end justify-between">
                    <h3 className="font-heading text-6xl text-white">{collection.title}</h3>
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/50 text-white transition group-hover:border-god-gold group-hover:bg-god-gold group-hover:text-god-bg"><FaArrowRight /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-god-border bg-[#12100e] py-14 md:py-20">
        <div className="container-god grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div {...reveal}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-god-gold">The standard</p>
            <h2 className="mt-3 font-heading text-6xl leading-[0.92] md:text-8xl">Focus Is A Uniform.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-god-muted md:text-base">
              GOD WEAR is designed for the hours nobody sees: early sessions, late resets, and the discipline that carries into daily life.
            </p>
            <Link to="/shop" className="btn-gold mt-7">Find Your Fit <FaArrowRight /></Link>
          </motion.div>
          <motion.div {...reveal} className="relative overflow-hidden rounded-xl border border-god-border">
            <img src="/media/football-field.jpg" alt="Athlete wearing GOD WEAR inspired training apparel" className="aspect-[5/4] h-full w-full object-cover" />
            <div className="absolute bottom-0 left-0 border-r border-t border-god-border bg-god-bg/90 px-5 py-4 backdrop-blur">
              <p className="font-heading text-3xl text-god-gold">01 / Everyday performance</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="border-b border-god-border bg-[#100e0c] py-16 md:py-24" aria-labelledby="about-heading">
        <div className="container-god">
          <motion.div {...reveal} className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-god-gold">About GOD WEAR</p>
            <h2 id="about-heading" className="mt-3 font-heading text-6xl leading-[0.9] md:text-8xl">Engineered For The Work.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-god-muted md:text-base">
              GOD WEAR builds premium activewear around the details that matter in motion: fit, breathability, comfort, and the confidence to wear it again tomorrow.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <motion.div {...reveal} className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-god-border bg-god-card shadow-gold">
                <video
                  className="h-full w-full object-cover"
                  src="/media/godwear-hero.mp4"
                  poster="/media/football-field.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="GOD WEAR performance apparel in motion"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-god-gold">SS 2026 · Engineered In India</p>
                  <p className="mt-2 font-heading text-4xl text-white">Performance, Refined.</p>
                </div>
              </div>
            </motion.div>

            <div className="border-b border-god-border">
              {engineeringFeatures.map(({ number, icon: Icon, title, copy, stat }, index) => (
                <motion.article
                  key={title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.08 }}
                  className="group border-t border-god-border py-9 md:py-12"
                >
                  <div className="flex gap-5 md:gap-7">
                    <span className="font-heading text-6xl leading-none text-god-gold/25 transition group-hover:text-god-gold/60 md:text-8xl">{number}</span>
                    <div className="pt-1">
                      <Icon className="text-lg text-god-gold" />
                      <h3 className="mt-3 font-heading text-4xl uppercase leading-none text-white md:text-5xl">{title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-god-muted">{copy}</p>
                      <div className="mt-5 flex items-center gap-3">
                        <span className="h-px w-6 bg-god-gold" />
                        <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-god-gold/80">{stat}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-god py-14 md:py-20">
        <motion.div {...reveal} className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-god-gold">Featured</p>
            <h2 className="mt-2 font-heading text-5xl md:text-7xl">Performance Icons</h2>
          </div>
          <Link to="/shop" className="btn-outline hidden sm:inline-flex">Shop All <FaArrowRight /></Link>
        </motion.div>
        <ProductGrid products={products} isLoading={isLoading} emptyMessage="No products have been added yet. Add products from the admin dashboard." />
      </section>

      <section className="border-y border-god-border bg-god-card/60 py-12">
        <div className="container-god grid gap-7 md:grid-cols-3">
          {values.map(({ icon: Icon, title, copy }, index) => (
            <motion.div key={title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.1 }} className="border-l border-god-gold pl-5">
              <Icon className="text-xl text-god-gold" />
              <h3 className="mt-4 font-heading text-4xl text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-god-muted">{copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-god py-14 md:py-20">
        <motion.div {...reveal}>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-god-gold">Community</p>
          <h2 className="mt-2 font-heading text-5xl md:text-7xl">Tested In Real Life</h2>
        </motion.div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{reviews.map((review) => <ReviewCard key={review.name} review={review} />)}</div>
      </section>

      <section className="relative min-h-[420px] overflow-hidden border-y border-god-border">
        <img src="/media/training-court.jpg" alt="Athletes training together" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <motion.div {...reveal} className="container-god relative flex min-h-[420px] items-center py-14">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-god-gold">New season</p>
            <h2 className="mt-2 font-heading text-6xl leading-[0.92] md:text-8xl">Ready When You Are.</h2>
            <p className="mt-4 text-sm leading-7 text-gray-200">Shop sharp silhouettes built for the gym, the field, and everything after.</p>
            <Link to="/shop" className="btn-gold mt-6">Shop Collection <FaArrowRight /></Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
