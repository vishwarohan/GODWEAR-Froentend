import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

const HeroBanner = () => (
  <section className="relative min-h-[calc(100svh-108px)] overflow-hidden border-b border-god-border">
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster="/media/training-court.jpg"
      aria-label="GOD WEAR activewear campaign video"
    >
      <source src="/media/godwear-hero.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/25" />
    <div className="absolute inset-0 bg-gradient-to-t from-god-bg via-transparent to-black/30" />

    <div className="container-god relative flex min-h-[calc(100svh-108px)] items-end pb-14 pt-24 md:items-center md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 38 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 border-l-2 border-god-gold pl-3 text-xs font-bold uppercase tracking-[0.28em] text-god-gold"
        >
          <FaPlay className="text-[10px]" /> Engineered for motion
        </motion.div>
        <h1 className="mt-5 font-heading text-7xl leading-[0.9] tracking-wide text-white sm:text-8xl lg:text-[10rem]">
          Wear The
          <span className="block text-god-gold">Power.</span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-gray-200 sm:text-lg">
          Elevated activewear for training, recovery, and the city. Built with discipline. Worn with intent.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/shop" className="btn-gold">Shop New Drop <FaArrowRight /></Link>
          <Link to="/shop?category=Compression%20T-Shirt" className="btn-outline border-white/40 bg-black/15 backdrop-blur-sm">Explore Compression</Link>
        </div>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="absolute bottom-5 right-5 hidden text-right md:block"
    >
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-white">God Wear / 2026</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-god-muted">Performance collection</p>
    </motion.div>
  </section>
);

export default HeroBanner;
