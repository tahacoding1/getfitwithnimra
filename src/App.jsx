import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Dumbbell,
  Home,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronUp,
  MessageCircle,
  Award,
  Shield,
  Trophy,
  GraduationCap,
} from 'lucide-react';

// ===================== ANIMATION VARIANTS =====================

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// ===================== REUSABLE HOOKS =====================

function useSectionInView(threshold = 0.15) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

function useTilt(intensity = 15) {
  const [style, setStyle] = useState({});
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(1000px) rotateX(${y * -intensity}deg) rotateY(${x * intensity}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.15s ease-out'
    });
  }, [intensity]);
  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  }, []);
  return { style, handleMouseMove, handleMouseLeave };
}

// ===================== SECTION HEADER =====================

function SectionHeader({ subtitle, title, description }) {
  const [ref, isInView] = useSectionInView();
  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="text-center mb-16"
    >
      <span className="inline-block text-neon text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 border border-neon/20 rounded-full bg-neon/5">
        {subtitle}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

// ===================== 3D TILT CARD =====================

function TiltCard({ children, className = '' }) {
  const tilt = useTilt(12);
  return (
    <div className={className} style={tilt.style} onMouseMove={tilt.handleMouseMove} onMouseLeave={tilt.handleMouseLeave}>
      {children}
    </div>
  );
}

// ===================== NAVBAR =====================

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ FIX 1: Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ FIX 2: Initial viewport check + resize listener
  useEffect(() => {
    // Check on mount - if already desktop, ensure menu is closed
    const checkViewport = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    // Run immediately on mount
    checkViewport();

    // Listen for resize
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = ['About', 'Services', 'Testimonials', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center group-hover:bg-neon/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-neon/20">
            <Dumbbell className="text-neon text-lg" />
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">GetFitWith</span>
            <span className="text-neon font-bold text-lg tracking-tight ml-1">Nimra</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-neutral-400 text-sm font-medium hover:text-neon transition-colors duration-300 relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
          <a href="#contact" className="btn-shine bg-neon text-dark-900 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-neon-dark transition-colors duration-300 hover:shadow-lg hover:shadow-neon/30">
            Get Started
          </a>
        </div>

        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="md:hidden text-white text-2xl p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  onClick={() => setMobileOpen(false)} 
                  className="text-neutral-300 text-base font-medium hover:text-neon transition-colors py-2 border-b border-white/5"
                >
                  {link}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="bg-neon text-dark-900 font-semibold text-center py-3 rounded-full mt-2">
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ===================== HERO SECTION =====================

// ✅ FIX: Move stats outside component (cleaner code)
const heroStats = [
  { number: '500+', label: 'Happy Clients' },
  { number: '8+', label: 'Years Exp.' },
  { number: '98%', label: 'Success Rate' },
];

function Hero() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <section
      id="hero"
      className="relative min-h-auto lg:min-h-screen flex items-start lg:items-center overflow-hidden pt-24 lg:pt-0 pb-16 lg:pb-0"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 hero-grid" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-neon/5 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/[0.02] rounded-full blur-3xl" />
      <div className="absolute top-32 right-[15%] w-16 h-16 border border-neon/10 rounded-lg floating-shape animate-float" />
      <div className="absolute top-[60%] left-[10%] w-10 h-10 border border-neon/10 rounded-full floating-shape animate-float-delayed" />
      <div className="absolute bottom-32 right-[25%] w-12 h-12 border border-neon/10 rounded-lg floating-shape animate-float-slow" style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute top-[40%] right-[8%] w-6 h-6 bg-neon/10 rounded-full animate-pulse" />

      <motion.div style={{ opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center min-h-auto lg:min-h-[calc(100vh-80px)] pt-6 lg:pt-0">
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="order-2 lg:order-1">
            
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 text-neon text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full border border-neon/20 bg-neon/5">
                <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                Certified Personal Trainer
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Transform<br />Your <span className="text-neon neon-text">Body</span><br />& Mind
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-neutral-400 text-base md:text-lg max-w-md leading-relaxed mb-8">
              Personalized fitness training programs at Body Evolution gym, designed to help you achieve your dream physique. Your transformation starts here.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
              <a href="#services" className="btn-shine inline-flex items-center gap-2 bg-neon text-dark-900 font-bold text-sm px-8 py-4 rounded-full hover:bg-neon-dark transition-all duration-300 hover:shadow-xl hover:shadow-neon/30 hover:scale-105">
                Start Your Journey
                <ArrowRight className="text-lg" />
              </a>
              <a href="#about" className="inline-flex items-center gap-2 border border-white/10 text-white font-medium text-sm px-8 py-4 rounded-full hover:border-neon/30 hover:bg-white/5 transition-all duration-300">
                Learn More
              </a>
            </motion.div>

            {/* ✅ FIXED: Using pre-defined array */}
            <motion.div variants={fadeInUp} className="flex gap-8 md:gap-12">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-black text-neon">{stat.number}</div>
                  <div className="text-neutral-500 text-xs font-medium tracking-wide uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
            className="hidden lg:flex order-1 lg:order-2 justify-center lg:justify-end"
          >
            <div className="perspective-container relative">
              <div className="absolute inset-0 bg-neon/10 rounded-3xl blur-3xl scale-90" />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="relative" style={{ transformStyle: 'preserve-3d' }}>
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[480px] rounded-3xl overflow-hidden border border-white/10 neon-border">
                  <img src="public/hero_image.png" alt="Nimra - Fitness Coach" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neon rounded-full animate-pulse" />
                      <div>
                        <div className="text-white font-bold text-sm">GetFitWithNimra</div>
                        <div className="text-neutral-400 text-xs">Available for Training</div>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 border border-neon/20">
                  <div className="text-neon font-black text-xl">4.9★</div>
                  <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Rating</div>
                </motion.div>

                <motion.div animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-white font-black text-xl">500+</div>
                  <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Clients</div>
                </motion.div>

              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mouse icon ONLY on large screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-neon rounded-full" />
        </motion.div>
      </motion.div>

    </section>
  );
}

// ===================== ABOUT SECTION =====================

function About() {
  const [ref, isInView] = useSectionInView();

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          
          {/* LEFT IMAGE */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative overflow-hidden"
          >
            <div className="perspective-container max-w-[520px]">
              
              <TiltCard className="relative rounded-3xl overflow-hidden border border-white/10 neon-border w-full">
                <img
                  src="public/hero_image.png"
                  alt="About Nimra"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />

                <div className="absolute bottom-8 left-8 glass-card rounded-2xl p-6 border border-neon/20">
                  <div className="text-neon font-black text-4xl">8+</div>
                  <div className="text-white font-medium text-sm">
                    Years of
                  </div>
                  <div className="text-neutral-400 text-xs">Experience</div>
                </div>
              </TiltCard>
            </div>

            {/* FIXED BORDER BACKGROUND */}
            <div className="absolute -z-10 top-6 left-6 w-full h-full rounded-3xl border border-neon/10" />
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block text-neon text-xs font-bold tracking-[0.3em] uppercase mb-4">
                About Me
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight"
            >
              Passionate About <br />
              <span className="text-neon">Your Fitness</span> Journey
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6"
            >
              I'm Nimra, a certified personal fitness trainer with over 8 years
              of experience in transforming lives through customized workout
              programs and nutritional guidance. I train at Body Evolution gym,
              where I provide a professional and motivating environment for my
              clients.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8"
            >
              Whether you're a beginner or an advanced athlete, I design
              personalized plans that fit your lifestyle, goals, and body type.
              My approach combines scientific training methods with motivational
              coaching to deliver real results.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {[
                {
                  icon: "🏆",
                  title: "Certified Trainer",
                  desc: "Internationally Certified",
                },
                {
                  icon: "💪",
                  title: "500+ Clients",
                  desc: "Successfully Trained",
                },
                {
                  icon: "🎯",
                  title: "Custom Plans",
                  desc: "Tailored For You",
                },
                {
                  icon: "🥗",
                  title: "Nutrition Guide",
                  desc: "Diet Plans Included",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {item.title}
                    </div>
                    <div className="text-neutral-500 text-xs">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <a
                href="#services"
                className="btn-shine inline-flex items-center gap-2 bg-neon text-dark-900 font-bold text-sm px-8 py-4 rounded-full hover:bg-neon-dark transition-all duration-300 hover:shadow-xl hover:shadow-neon/30"
              >
                Explore Services
                <ArrowRight />
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ===================== CERTIFICATIONS & ACHIEVEMENTS =====================

const certifications = [
  {
    icon: <Trophy className="text-2xl" />,
    name: 'Top Tier Fitness Expert',
    org: 'Body Evolution',
    desc: 'Awarded for exceptional training results and client transformations',
    type: 'award',
  },
  {
    icon: <GraduationCap className="text-2xl" />,
    name: 'Internationally Certified',
    org: 'ISSA — International Sports Sciences Association',
    desc: 'Certified Personal Trainer & Fitness Coach',
    type: 'cert',
  },
  {
    icon: <Shield className="text-2xl" />,
    name: 'Science-Based Training',
    org: 'NASM — National Academy of Sports Medicine',
    desc: 'Certified in corrective exercise and performance training',
    type: 'cert',
  },
  {
    icon: <Award className="text-2xl" />,
    name: 'Precision Nutrition Coach',
    org: 'Precision Nutrition Level 1',
    desc: 'Certified nutrition coach for body composition goals',
    type: 'cert',
  },
  {
    icon: <Sparkles className="text-2xl" />,
    name: 'Elite Performance Coach',
    org: 'ACE — American Council on Exercise',
    desc: 'Advanced health & fitness specialist certification',
    type: 'cert',
  },
];

function Certifications() {
  const [ref, isInView] = useSectionInView();

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          subtitle="Credentials"
          title="Certifications & Achievements"
          description="Backed by world-renowned fitness organizations and recognized for delivering outstanding results."
        />

        {/* Award Card - Featured */}
        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <div className="relative rounded-2xl overflow-hidden border-2 border-neon/30 neon-border">
            <div className="absolute inset-0 bg-gradient-to-r from-neon/10 via-transparent to-neon/5" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-neon/20 border border-neon/30 flex items-center justify-center text-neon animate-pulse-glow flex-shrink-0">
                <Trophy className="text-3xl md:text-4xl" />
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block text-neon text-[10px] font-bold tracking-[0.3em] uppercase mb-2 px-3 py-1 bg-neon/10 rounded-full border border-neon/20">
                  ★ Special Recognition
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2">Top Tier Fitness Expert Award</h3>
                <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                  Honored by <span className="text-neon font-semibold">Body Evolution</span> for consistently delivering exceptional client transformations, maintaining the highest training standards, and being one of the most sought-after trainers at the facility.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certification Logos - Horizontal Scroll */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {certifications.filter(c => c.type === 'cert').map((cert, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <TiltCard className="h-full">
                <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-neon/20 transition-all duration-500 h-full flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center text-neon mb-4 group-hover:bg-neon/20 group-hover:shadow-lg group-hover:shadow-neon/20 transition-all duration-500">
                    {cert.icon}
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1 group-hover:text-neon transition-colors duration-300">{cert.name}</h4>
                  <p className="text-neon/70 text-[11px] font-semibold uppercase tracking-wider mb-2">{cert.org}</p>
                  <p className="text-neutral-500 text-xs leading-relaxed">{cert.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div variants={fadeInUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mt-12 text-center">
          <p className="text-neutral-600 text-xs uppercase tracking-widest mb-4">Trusted & Certified By</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {['ISSA', 'NASM', 'ACE', 'Precision Nutrition', 'Body Evolution'].map((name) => (
              <div key={name} className="flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300">
                <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                  <Shield className="text-white text-xs" />
                </div>
                <span className="text-neutral-400 text-xs font-bold tracking-wider uppercase">{name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===================== SERVICES SECTION =====================

const services = [
  {
    icon: <Dumbbell className="text-2xl" />,
    title: 'Personal Training',
    description: 'One-on-one sessions at Body Evolution gym with customized workout plans tailored to your specific goals, body type, and fitness level.',
    features: ['At Body Evolution Gym', 'Custom Workout Plans', 'Form Correction', 'Progress Tracking'],
    whatsapp: 'Hi Nimra, I\'m interested in Personal Training at Body Evolution. Can you share more details?',
  },
  {
    icon: <Home className="text-2xl" />,
    title: 'Home Training',
    description: 'Get professional female-only training in the comfort of your home. Safe, comfortable environment with minimal equipment needed.',
    features: ['Females Only', 'No Gym Needed', 'Flexible Schedule', 'Equipment Guidance'],
    whatsapp: 'Hi Nimra, I\'m interested in Home Training (Females Only). Can you share more details?',
  },
  {
    icon: <Users className="text-2xl" />,
    title: 'Group Training',
    description: 'High-energy group sessions at Body Evolution gym that motivate and push you beyond limits with like-minded fitness enthusiasts.',
    features: ['At Body Evolution Gym', 'Team Motivation', 'Fun Workouts', 'Social Support'],
    whatsapp: 'Hi Nimra, I\'m interested in Group Training at Body Evolution. Can you share more details?',
  },
  {
    icon: <Globe className="text-2xl" />,
    title: 'Online Coaching',
    description: 'Access expert coaching from anywhere in the world. Available for both male and female clients with virtual sessions and digital programs.',
    features: ['For Both Male & Female', 'Live Sessions on Zoom', 'Video Demos', 'Global Access'],
    whatsapp: 'Hi Nimra, I\'m interested in Online Coaching. Can you share more details?',
  },
  {
    icon: <Sparkles className="text-2xl" />,
    title: 'Nutrition Plan',
    description: 'Scientifically designed meal plans that complement your training and accelerate your transformation results.',
    features: ['Meal Planning', 'Macro Tracking', 'Recipe Guides'],
    whatsapp: 'Hi Nimra, I\'m interested in the Nutrition Plan. Can you share more details?',
  },
  {
    icon: <ArrowRight className="text-2xl" />,
    title: 'Transformation Plan',
    description: 'Complete 12-week body transformation program at Body Evolution gym combining training, nutrition, and lifestyle changes.',
    features: ['At Body Evolution Gym', '12 Week Program', 'Before/After Tracking', 'Full Support'],
    whatsapp: 'Hi Nimra, I\'m interested in the Transformation Plan at Body Evolution. Can you share more details?',
  },
];

function Services() {
  const [ref, isInView] = useSectionInView();

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          subtitle="What I Offer"
          title="My Services"
          description="Comprehensive fitness solutions at Body Evolution gym designed to transform your body and lifestyle with expert guidance."
        />

        <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <TiltCard className="h-full">
                <div className="service-card h-full glass-card rounded-2xl p-8 border border-white/5 hover:border-neon/20 group cursor-pointer flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center text-neon mb-6 group-hover:bg-neon/20 group-hover:shadow-lg group-hover:shadow-neon/20 transition-all duration-500">
                    {service.icon}
                  </div>

                  <h3 className="text-white font-bold text-lg mb-3 tracking-tight group-hover:text-neon transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-5 flex-grow">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="text-neon text-sm flex-shrink-0" />
                        <span className="text-neutral-300 text-xs font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/923001234567?text=${encodeURIComponent(service.whatsapp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine w-full inline-flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 mt-auto"
                  >
                    <MessageCircle className="text-lg" />
                    Ask on WhatsApp
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ===================== TESTIMONIALS SECTION =====================
// Google Reviews from Nimra / Nimra Hamirca at Body Evolution

const testimonials = [
  {
    name: 'Nimra Hamirca',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'Absolutely love training here! The environment at Body Evolution is incredible — professional equipment, clean space, and the trainers are top-notch. I\'ve seen amazing results since I started. Highly recommend to anyone serious about their fitness journey!',
    date: '3 months ago',
  },
  {
    name: 'Nimra',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'Body Evolution is hands down the best gym in Karachi. The staff is super supportive, the ambiance is motivating, and the personal training sessions are worth every penny. My physique has completely transformed in just a few months!',
    date: '1 month ago',
  },
  {
    name: 'Nimra Hamirca',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'I\'ve been to many gyms but Body Evolution stands out. The trainers actually care about your progress. They customize plans according to your body type and goals. The female section is very comfortable and well-maintained. 10/10 recommend!',
    date: '2 weeks ago',
  },
  {
    name: 'Nimra',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'Joining Body Evolution was the best decision I made for my health. Nimra\'s training style is amazing — she pushes you just the right amount. Lost 12kg in 3 months and feeling stronger than ever!',
    date: '1 week ago',
  },
  {
    name: 'Nimra Hamirca',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'The personal attention you get at Body Evolution is unmatched. Nimra tracks every single detail — from my workouts to my diet. It\'s not just a gym, it\'s a complete fitness transformation center.',
    date: '5 months ago',
  },
  {
    name: 'Nimra',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'As a working woman, I needed flexible timings and Body Evolution provided exactly that. The early morning batches are great. Nimra makes sure you never skip a session. Best investment ever!',
    date: '2 months ago',
  },
  {
    name: 'Nimra Hamirca',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'The nutrition guidance along with training at Body Evolution is a game changer. Nimra doesn\'t just train you, she educates you about your body. I understand fitness so much better now.',
    date: '3 weeks ago',
  },
  {
    name: 'Nimra',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'Clean gym, professional trainers, amazing results. Body Evolution has everything you need. Nimra is particularly great with beginners — she makes you feel comfortable from day one.',
    date: '4 months ago',
  },
  {
    name: 'Nimra Hamirca',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'I brought my sister here after my own transformation and she\'s already seeing results in just 4 weeks. Body Evolution and Nimra\'s coaching is genuinely life-changing. Thank you!',
    date: '6 days ago',
  },
  {
    name: 'Nimra',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'The group training sessions at Body Evolution are so much fun! You don\'t even realize you\'re working hard because the energy is incredible. Nimra keeps everyone motivated throughout.',
    date: '6 weeks ago',
  },
  {
    name: 'Nimra Hamirca',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'After trying multiple trainers, I finally found the right one. Nimra understands female fitness needs perfectly. The environment at Body Evolution is so comfortable and professional.',
    date: '1 month ago',
  },
  {
    name: 'Nimra',
    source: 'Google Review — Body Evolution',
    rating: 5,
    text: 'I was skeptical about joining a gym but Body Evolution changed my mind completely. The trial session with Nimra convinced me. Now 6 months in, I\'m in the best shape of my life!',
    date: '3 weeks ago',
  },
];

function Testimonials() {
  const [ref, isInView] = useSectionInView();

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          subtitle="Google Reviews"
          title="What My Clients Say"
          description="Real reviews from Body Evolution's Google page by Nimra and other satisfied clients."
        />

        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Carousel Container */}
          <div className="relative">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Track */}
            <div className="overflow-hidden py-4">
              <div
                className="flex gap-6"
                style={{
                  width: 'max-content',
                  animation: 'smoothScroll 60s linear infinite',
                }}
              >
                {/* First set of cards */}
                {testimonials.map((t, index) => (
                  <div
                    key={`a-${index}`}
                    className="w-[340px] md:w-[400px] flex-shrink-0"
                  >
                    <div className="glass-card rounded-2xl p-7 border border-white/5 hover:border-neon/20 transition-all duration-500 h-full flex flex-col relative group">
                      <div className="quote-mark absolute top-3 right-5">"</div>

                      {/* Google badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                          <span className="text-[10px] font-black text-blue-500">G</span>
                        </div>
                        <span className="text-neutral-500 text-[10px] font-medium uppercase tracking-wider">{t.source}</span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="text-neon text-sm fill-neon" />
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="text-neutral-300 text-sm leading-relaxed mb-6 flex-grow relative z-10">
                        "{t.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-between pt-5 border-t border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center text-neon font-bold text-sm">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{t.name}</div>
                            <div className="text-neutral-500 text-xs">{t.date}</div>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {testimonials.map((t, index) => (
                  <div
                    key={`b-${index}`}
                    className="w-[340px] md:w-[400px] flex-shrink-0"
                  >
                    <div className="glass-card rounded-2xl p-7 border border-white/5 hover:border-neon/20 transition-all duration-500 h-full flex flex-col relative group">
                      <div className="quote-mark absolute top-3 right-5">"</div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                          <span className="text-[10px] font-black text-blue-500">G</span>
                        </div>
                        <span className="text-neutral-500 text-[10px] font-medium uppercase tracking-wider">{t.source}</span>
                      </div>
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="text-neon text-sm fill-neon" />
                        ))}
                      </div>
                      <p className="text-neutral-300 text-sm leading-relaxed mb-6 flex-grow relative z-10">
                        "{t.text}"
                      </p>
                      <div className="flex items-center justify-between pt-5 border-t border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center text-neon font-bold text-sm">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{t.name}</div>
                            <div className="text-neutral-500 text-xs">{t.date}</div>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pause hint */}
          <p className="text-center text-neutral-600 text-xs mt-6 tracking-wide">
            ← Hover to pause →
          </p>
        </motion.div>
      </div>

      {/* Carousel animation */}
      <style>{`
        @keyframes smoothScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .flex[style*="smoothScroll"]:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// ===================== COMMUNITY / SUBSCRIBE SECTION =====================

function Community() {
  const [ref, isInView] = useSectionInView();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center">
          <motion.div variants={fadeInUp}>
            <span className="inline-block text-neon text-xs font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 border border-neon/20 rounded-full bg-neon/5">
              Join The Community
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Stay <span className="text-neon">Connected</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
            Subscribe to get exclusive fitness tips, workout routines, nutrition advice, and special offers delivered straight to your inbox.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition-all duration-300"
              />
              <button type="submit" className="btn-shine bg-neon text-dark-900 font-bold text-sm px-8 py-4 rounded-full hover:bg-neon-dark transition-all duration-300 hover:shadow-xl hover:shadow-neon/30 whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <AnimatePresence>
              {subscribed && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 inline-flex items-center gap-2 text-neon text-sm font-medium">
                  <Check className="text-lg" />
                  Successfully subscribed! Welcome to the community.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
            <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['seed-comm1', 'seed-comm2', 'seed-comm3', 'seed-comm4', 'seed-comm5'].map((seed, i) => (
                <img key={i} src={`https://picsum.photos/seed/${seed}/60/60`} alt="Member" className="w-8 h-8 rounded-full border-2 border-dark-900 object-cover" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-white text-sm font-semibold">1000+ Members</div>
              <div className="text-neutral-500 text-xs">Already joined our community</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ===================== CONTACT SECTION =====================

function Contact() {
  const [ref, isInView] = useSectionInView();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validateField = (field, value) => {
    let error = '';
    if (field === 'name') {
      if (value && !/^[A-Za-z\s]*$/.test(value)) error = 'Only alphabets allowed';
      if (value.length > 0 && value.length < 2) error = 'Name too short';
    }
    if (field === 'email') {
      if (value && !value.includes('@')) error = 'Email must contain @';
      if (value && !/\S+@\S+\.\S+/.test(value)) error = 'Enter a valid email';
    }
    if (field === 'phone') {
      if (value && !/^\d*$/.test(value)) error = 'Only digits allowed';
      if (value.length > 0 && value.length < 5) error = 'Enter a valid number';
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  };

  const handleChange = (field, value) => {
    if (field === 'phone') {
      const filtered = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, phone: filtered }));
      if (filtered) validateField('phone', filtered);
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (value) validateField(field, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);
    if (nameErr || emailErr || phoneErr) return;
    setSent(true);
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    setErrors({});
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border ${errors[field] ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-neon/50 focus:ring-neon/20'} rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-all duration-300`;

  const contactInfo = [
    {
      icon: <Phone className="text-xl" />,
      label: 'Phone',
      value: '+92 300 1234567',
      href: 'tel:+923001234567',
    },
    {
      icon: <Mail className="text-xl" />,
      label: 'Email',
      value: 'info@getfitwithnimra.com',
      href: 'mailto:info@getfitwithnimra.com',
    },
    {
      icon: (
        <svg className="text-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      label: 'Instagram',
      value: '@getfit_with_nimra',
      href: 'https://www.instagram.com/getfit_with_nimra/',
    },
    {
      icon: <MapPin className="text-xl" />,
      label: 'Gym — Body Evolution',
      value: 'Shop No.10, Al Bari Exclusive Towers, Bahadurabad, Karachi',
      href: 'https://www.google.com/maps/search/Body+Evolution+Bahadurabad+Karachi',
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          subtitle="Get In Touch"
          title="Contact Me"
          description="Have questions or ready to start your transformation? Reach out and let's begin your fitness journey together."
        />

        <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid lg:grid-cols-5 gap-10">
          <motion.div variants={fadeInLeft} className="lg:col-span-2 space-y-5">
            {contactInfo.map((info, index) => (
              <a key={index} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-start gap-4 p-5 glass-card rounded-2xl border border-white/5 hover:border-neon/20 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center text-neon group-hover:bg-neon/20 group-hover:shadow-lg group-hover:shadow-neon/20 transition-all duration-500 flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <div className="text-neutral-500 text-xs font-medium uppercase tracking-wider mb-1">{info.label}</div>
                  <div className="text-white font-semibold text-sm leading-relaxed">{info.value}</div>
                </div>
              </a>
            ))}


          </motion.div>

          <motion.div variants={fadeInRight} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-white/5">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-neutral-400 text-xs font-medium uppercase tracking-wider mb-2 block">Your Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Doe" required className={inputClass('name')} />
                  {errors.name && <p className="text-red-400 text-[11px] mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-neutral-400 text-xs font-medium uppercase tracking-wider mb-2 block">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+1 234 567 8900" className={inputClass('phone')} />
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1.5">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-neutral-400 text-xs font-medium uppercase tracking-wider mb-2 block">Email Address *</label>
                  <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="john@example.com" required className={inputClass('email')} />
                  {errors.email && <p className="text-red-400 text-[11px] mt-1.5">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-neutral-400 text-xs font-medium uppercase tracking-wider mb-2 block">Subject</label>
                  <select value={formData.subject} onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition-all duration-300 appearance-none cursor-pointer">
                    <option value="" className="text-neutral-600">Select subject</option>
                    <option value="Personal Training" className="bg-dark-800">Personal Training</option>
                    <option value="Online Coaching" className="bg-dark-800">Online Coaching</option>
                    <option value="Home Training" className="bg-dark-800">Home Training</option>
                    <option value="Group Training" className="bg-dark-800">Group Training</option>
                    <option value="Nutrition Plan" className="bg-dark-800">Nutrition Plan</option>
                    <option value="Transformation Plan" className="bg-dark-800">Transformation Plan</option>
                    <option value="General Inquiry" className="bg-dark-800">General Inquiry</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="text-neutral-400 text-xs font-medium uppercase tracking-wider mb-2 block">Message *</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} placeholder="Tell me about your fitness goals..." className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition-all duration-300 resize-none" />
              </div>
              <button type="submit" className="btn-shine w-full bg-neon text-dark-900 font-bold text-sm py-4 rounded-full hover:bg-neon-dark transition-all duration-300 hover:shadow-xl hover:shadow-neon/30">
                Send Message
              </button>
              <AnimatePresence>
                {sent && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 flex items-center justify-center gap-2 text-neon text-sm font-medium">
                    <Check className="text-lg" />
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ===================== FOOTER =====================

function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="relative pt-20 pb-8">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center">
                <Dumbbell className="text-neon text-lg" />
              </div>
              <div>
                <span className="text-white font-bold text-lg">GetFitWith</span>
                <span className="text-neon font-bold text-lg ml-1">Nimra</span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-4">
              Transforming lives through personalized fitness training and nutrition guidance at Body Evolution gym. Your dream body is just one decision away.
            </p>
            <p className="text-neutral-500 text-xs mb-6">
              📍 Training at <span className="text-neon font-semibold">Body Evolution</span> — Al Bari Exclusive Towers, Bahadurabad, Karachi
            </p>
            <a href="https://www.instagram.com/getfit_with_nimra/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 hover:bg-neon/10 hover:border-neon/20 transition-all duration-300 w-fit">
              <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span className="text-neutral-300 text-sm font-medium">@getfit_with_nimra</span>
            </a>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3">
              {['About', 'Services', 'Testimonials', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block text-neutral-400 text-sm hover:text-neon transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <div className="space-y-3">
              {['Personal Training', 'Home Training', 'Online Coaching', 'Nutrition Plan', 'Transformation'].map((s) => (
                <a key={s} href="#services" className="block text-neutral-400 text-sm hover:text-neon transition-colors duration-300">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs">© 2026 GetFitWithNimra. All rights reserved.</p>
          <p className="text-neutral-600 text-xs">Training at Body Evolution, Karachi</p>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-neon/20 border border-neon/30 rounded-full flex items-center justify-center text-neon hover:bg-neon hover:text-dark-900 transition-all duration-300 z-50 backdrop-blur-sm"
          >
            <ChevronUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

// ===================== MAIN APP =====================

export default function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      <Hero />
      <About />
      <Certifications />
      <Services />
      <Testimonials />
      <Community />
      <Contact />
      <Footer />
    </div>
  );
}