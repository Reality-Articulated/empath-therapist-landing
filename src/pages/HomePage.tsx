import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import howitworksPng from '../../public/howitworks.png';
import whyitworksPng from '../../public/whyitworks.png';
import howitworksWebp from '../../public/optimized/howitworks.webp';
import whyitworksWebp from '../../public/optimized/whyitworks.webp';

import { 
  Brain, 
  Clock, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  LineChart, 
  Heart,
  ChevronRight,
  X
} from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

// Add new animation variants
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const pulseAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5,
      yoyo: Infinity,
      repeatDelay: 5
    }
  }
};

// Section component with animation
interface AnimatedSectionProps {
  children: React.ReactNode;
  className: string;
  delay?: number;
}

const AnimatedSection = ({ children, className, delay = 0 }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delay, duration: 0.6, ease: "easeOut" }
        }
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function HomePage() {
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Clock,
      title: "3-Minute Client Review",
      description: "Quick, comprehensive insights into client progress between sessions."
    },
    {
      icon: Smartphone,
      title: "Client Mobile App",
      description: "Easy logging of mood, activities, and thoughts with voice or text entries."
    },
    {
      icon: LineChart,
      title: "Health Integration",
      description: "Seamless connection with popular wearables for sleep and activity data."
    },
    {
      icon: Heart,
      title: "Deeper Connection",
      description: "Build stronger therapeutic relationships with data-driven insights."
    }
  ];

  // Add breathing animation for mindfulness effect
  const breathingAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex-grow overflow-hidden">
      {/* Hero Section */}
      <AnimatedSection className="bg-gradient-to-b from-slate-50 via-gray-50 to-white py-32 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-96 h-96 bg-slate-200/20 rounded-full absolute -top-20 -left-20 blur-3xl"></div>
          <div className="w-96 h-96 bg-indigo-100/20 rounded-full absolute top-40 -right-20 blur-3xl"></div>
          {/* Add subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-12 leading-tight">
                <div className="relative">
                  <span className="text-slate-900 font-extralight tracking-tight">
                    Meet Parts of Your Client
                  </span>
                </div>
                
                <div className="mt-2 md:mt-3 relative inline-flex flex-col">
                  <span className="text-slate-800 font-medium relative z-10 tracking-tight">
                    You Haven't Yet Met
                  </span>
                  <motion.div 
                    className="absolute -bottom-2 left-0 h-[1px] w-0 bg-gradient-to-r from-slate-400 to-slate-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Empath gives therapists a 3-minute catch-up on what their client has been feeling, thinking, 
              and going through BETWEEN sessions.

              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  onClick={() => setShowCalendar(true)}
                  className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center group cursor-pointer font-light tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Book a demo call with our team"
                >
                  Book a Demo Call
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to="/advisory" className="px-8 py-4 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center group cursor-pointer font-light tracking-wide" aria-label="Learn about joining our advisory board">
                    Join Advisory Board
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="mt-16 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center px-5 py-2.5 bg-green-50 rounded-full border border-green-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full mr-3"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm text-slate-600 font-light">Currently in early access. Help shape the future of therapy tools.</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Calendar Modal */}
      {showCalendar && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-modal-title"
        >
          <motion.div 
            className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="calendar-modal-title" className="text-2xl font-light text-slate-900">Schedule a Demo</h2>
              <motion.button 
                onClick={() => setShowCalendar(false)}
                className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors cursor-pointer"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                aria-label="Close calendar"
              >
                <X size={20} aria-hidden="true" />
              </motion.button>
            </div>
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ciL9GVqgrLt07RkxMMYq-0szLXts_yaQ6M7oa0l6Egx-c1gM_1ayZa6kBmPgtXZZgZDs69oxz?gv=true" 
              style={{ border: 0 }} 
              width="100%" 
              height="600" 
              frameBorder="0"
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}

      {/* 30-Day Implementation Timeline */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={fadeIn}
              className="text-center mb-16"
            >
              <p className="text-xl text-slate-600 font-light mb-4">Understanding all parts of your clients shouldn't take months</p>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900">
                30 Days With Empath
              </h2>
            </motion.div>
            
            {/* Simple Timeline */}
            <div className="mb-16 max-w-2xl mx-auto">
              <div className="relative">
                {/* Timeline track */}
                <div className="absolute left-0 right-0 top-4 h-[1px] bg-slate-200"></div>
                
                {/* Animated progress */}
                <motion.div 
                  className="absolute left-0 top-4 h-[1px] bg-gradient-to-r from-slate-300 to-slate-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  viewport={{ once: true }}
                />
                
                {/* Timeline markers */}
                <div className="relative flex justify-between">
                  {/* Day 0 */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-300"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    </motion.div>
                    <motion.span 
                      className="text-xs text-slate-500 mt-2 font-light"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Day 0
                    </motion.span>
                  </div>
                  
                  {/* Phase 1 */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-300 shadow-sm"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm text-slate-600 font-light">1</span>
                    </motion.div>
                    <motion.span 
                      className="text-xs text-slate-500 mt-2 font-light"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      Phase 1
                    </motion.span>
                  </div>
                  
                  {/* Phase 2 */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-300 shadow-sm"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm text-slate-600 font-light">2</span>
                    </motion.div>
                    <motion.span 
                      className="text-xs text-slate-500 mt-2 font-light"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.1 }}
                      viewport={{ once: true }}
                    >
                      Phase 2
                    </motion.span>
                  </div>
                  
                  {/* Phase 3 */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-300 shadow-sm"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm text-slate-600 font-light">3</span>
                    </motion.div>
                    <motion.span 
                      className="text-xs text-slate-500 mt-2 font-light"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.4 }}
                      viewport={{ once: true }}
                    >
                      Phase 3
                    </motion.span>
                  </div>
                  
                  {/* Day 30 */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-300"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                    </motion.div>
                    <motion.span 
                      className="text-xs text-slate-500 mt-2 font-light"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.7 }}
                      viewport={{ once: true }}
                    >
                      Day 30
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Timeline cards with clinical phase design */}
            <div className="space-y-8">
              {/* Phase 1 - Onboarding */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 font-light">
                      01
                    </div>
                    <div className="h-full w-px bg-slate-100 mt-4"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="mb-2">
                      <span className="text-sm text-slate-500 font-light">Days 1-5</span>
                      <h3 className="text-xl font-light text-slate-900 mt-1">Instant Value</h3>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">Boost your brand:</strong> Send clients your own custom-branded therapy app</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">Differentiate your practice:</strong> Offer technology most therapists can't provide</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">5-minute setup:</strong> Start enhancing client experience immediately</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Phase 2 - Data Collection */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 font-light">
                      02
                    </div>
                    <div className="h-full w-px bg-slate-100 mt-4"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="mb-2">
                      <span className="text-sm text-slate-500 font-light">Days 6-20</span>
                      <h3 className="text-xl font-light text-slate-900 mt-1">Start Identifying Patterns</h3>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">Beyond sessions:</strong> 2 weeks of continuous data vs. just 2 hour-long meetings</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">Complete picture:</strong> Track sleep, activity, and emotion patterns automatically</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">3-minute reviews:</strong> Get a complete client update before each session</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Phase 3 - Full Integration */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 font-light">
                      03
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-sm text-slate-500 font-light">Days 21-30</span>
                      <h3 className="text-xl font-light text-slate-900 mt-1">Full Integration & Optimization</h3>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">50% lower drop-offs:</strong> Keep clients engaged when they feel truly understood</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">More productive sessions:</strong> Skip the catch-up, dive into what matters</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-600 font-light"><strong className="font-medium">Higher client satisfaction:</strong> Provide care that feels personalized and insightful</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Empath Works */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-16 text-slate-900"
          >
            How Empath Transforms Therapy
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={slideInLeft}
              className="relative order-2 md:order-1"
            >
              <picture>
                <source srcSet={whyitworksWebp} type="image/webp" />
                <img 
                  src={whyitworksPng} 
                  alt="Empath System Diagram"
                  className="rounded-lg shadow-md relative z-10"
                  width="1200"
                  height="675"
                  loading="lazy"
                />
              </picture>
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="space-y-8 order-1 md:order-2"
            >
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-light mb-4 text-slate-900">Bridging the Gap Between Sessions</h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed font-light">
                  Every client has parts that seek change and parts that resist it. You only meet one side in therapy. 
                  Empath reveals the complete picture by capturing what happens when clients face their real-world triggers:
                </p>
                <div className="space-y-6">
                  <motion.div 
                    variants={slideInRight}
                    className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <p className="flex items-start">
                      <span className="flex-shrink-0 text-emerald-600 font-medium text-sm bg-emerald-50 px-3 py-1 rounded">Perception</span>
                      <span className="text-slate-600 ml-4 leading-relaxed font-light">
                        Our client app captures real-world avoidance, resistance patterns, and defensive behaviors as they happen—the parts that don't show up in sessions.
                      </span>
                    </p>
                  </motion.div>
                  <motion.div 
                    variants={slideInRight}
                    className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <p className="flex items-start">
                      <span className="flex-shrink-0 text-blue-600 font-medium text-sm bg-blue-50 px-3 py-1 rounded">Cognition</span>
                      <span className="text-slate-600 ml-4 leading-relaxed font-light">
                        Our AI transforms complex client data into actionable clinical insights, revealing patterns invisible to traditional methods.
                      </span>
                    </p>
                  </motion.div>
                  <motion.div 
                    variants={slideInRight}
                    className="p-6 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <p className="flex items-start">
                      <span className="flex-shrink-0 text-rose-600 font-medium text-sm bg-rose-50 px-3 py-1 rounded">Action</span>
                      <span className="text-slate-600 ml-4 leading-relaxed font-light">
                        You maintain complete therapeutic control, using enhanced insights to deliver more personalized and effective interventions.
                      </span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* The Data Visualization Comparison */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        {/* Simple, clean background */}
        <div className="absolute inset-0 bg-white"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-slate-900">
                Complete Understanding Requires Complete Data
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
                Fragmented sessions only provide glimpses into a client's life requiring a lot of catch-up every session.
              </p>
            </motion.div>
            
            {/* Main visualization comparison */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-8">
              {/* Traditional therapy side */}
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm mb-6 flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl font-light text-slate-900">Weekly Sessions</h3>
                  <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded text-sm font-light">4 sessions per month</span>
                </div>
                
                <div className="relative flex-grow">
                  {/* Session data visualization with improved alignment */}
                  <div className="bg-white rounded-lg border border-slate-200 h-full relative overflow-hidden">
                    {/* Fixed structure for precise alignment */}
                    <div className="grid grid-cols-[120px_1fr] h-full">
                      {/* Week labels column */}
                      <div className="flex flex-col justify-between py-8 px-4 border-r border-slate-100">
                        <div className="flex items-center h-16">
                          <span className="text-sm font-light text-slate-500">Week 1</span>
                        </div>
                        <div className="flex items-center h-16">
                          <span className="text-sm font-light text-slate-500">Week 2</span>
                        </div>
                        <div className="flex items-center h-16">
                          <span className="text-sm font-light text-slate-500">Week 3</span>
                        </div>
                        <div className="flex items-center h-16">
                          <span className="text-sm font-light text-slate-500">Week 4</span>
                        </div>
                      </div>
                      
                      {/* Session dots visualization */}
                      <div className="p-4 relative">
                        {/* Background dots grid */}
                        <div className="grid grid-cols-7 grid-rows-4 gap-3 h-full opacity-5">
                          {Array.from({ length: 28 }, (_, i) => (
                            <div key={`bg-dot-${i}`} className="aspect-square bg-slate-400 rounded-full"></div>
                          ))}
                        </div>
                        
                        {/* Session dots - perfectly aligned with week labels */}
                        <div className="absolute inset-0 p-4">
                          <div className="grid grid-rows-4 h-full gap-3">
                            {/* Week 1 Session */}
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-10 w-10 bg-slate-100 rounded-full">
                                <div className="h-6 w-6 bg-slate-600 rounded-full"></div>
                              </div>
                              <div className="ml-3 bg-slate-50 px-3 py-1 rounded whitespace-nowrap">
                                <span className="text-sm font-light text-slate-600">50-min session</span>
                              </div>
                            </div>
                            
                            {/* Week 2 Session */}
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-10 w-10 bg-slate-100 rounded-full">
                                <div className="h-6 w-6 bg-slate-600 rounded-full"></div>
                              </div>
                              <div className="ml-3 bg-slate-50 px-3 py-1 rounded whitespace-nowrap">
                                <span className="text-sm font-light text-slate-600">50-min session</span>
                              </div>
                            </div>
                            
                            {/* Week 3 Session */}
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-10 w-10 bg-slate-100 rounded-full">
                                <div className="h-6 w-6 bg-slate-600 rounded-full"></div>
                              </div>
                              <div className="ml-3 bg-slate-50 px-3 py-1 rounded whitespace-nowrap">
                                <span className="text-sm font-light text-slate-600">50-min session</span>
                              </div>
                            </div>
                            
                            {/* Week 4 Session */}
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-10 w-10 bg-slate-100 rounded-full">
                                <div className="h-6 w-6 bg-slate-600 rounded-full"></div>
                              </div>
                              <div className="ml-3 bg-slate-50 px-3 py-1 rounded whitespace-nowrap">
                                <span className="text-sm font-light text-slate-600">50-min session</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Missing data indicator */}
                    <motion.div 
                      className="absolute bottom-4 right-4 text-sm text-red-600/60 font-light flex items-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>~90% of client context missed</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Gap in understanding indicator */}
                <motion.div 
                  className="mt-8 bg-red-50 border border-red-100 rounded-lg p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-medium text-red-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The Gap in Understanding
                  </h4>
                  <p className="text-red-700/80 text-sm font-light">
                    You see the motivated client in session, but miss the parts that avoid, resist, and cling to old patterns. 
                    That's where the breakthrough insights are hiding.
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Empath approach */}
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-slate-900 rounded-lg p-6 text-white shadow-sm mb-6 flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl font-light">Empath Approach</h3>
                  <span className="bg-white/10 text-white/90 px-3 py-1 rounded text-sm font-light">Continuous context</span>
                </div>
                
                <div className="relative flex-grow">
                  {/* Experience flow visualization */}
                  <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 h-full relative overflow-hidden">
                    
                    {/* Data collection grid */}
                    <div className="grid grid-cols-7 gap-3 mb-12">
                      {Array.from({ length: 28 }, (_, i) => {
                        // Create a more organic wave-like animation pattern
                        const col = i % 7;
                        const row = Math.floor(i / 7);
                        // Calculate distance from center for radial animation effect
                        const centerCol = 3;
                        const centerRow = 2;
                        const distFromCenter = Math.sqrt(Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2));
                        
                        return (
                          <motion.div 
                            key={`data-${i}`}
                            className="relative"
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              delay: 0.05 * distFromCenter, // Radial wave effect
                              duration: 0.5,
                              type: "spring",
                              stiffness: 100,
                              damping: 12
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                          >
                            <div className="aspect-square bg-slate-700 rounded-full shadow-sm flex items-center justify-center relative z-10">
                              <motion.div
                                className="absolute inset-0 bg-slate-700 rounded-full"
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  opacity: [1, 0.7, 1]
                                }}
                                transition={{ 
                                  duration: 3, 
                                  repeat: Infinity, 
                                  ease: "easeInOut", 
                                  delay: 0.1 * distFromCenter % 2 // Create wave-like pulse patterns
                                }}
                              />
                            </div>
                            
                            {/* Data type indicators with subtle animations */}
                            {i % 5 === 0 && (
                              <motion.div 
                                className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-amber-400 rounded-full border border-white z-20"
                                title="Mood data"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                              />
                            )}
                            {i % 7 === 3 && (
                              <motion.div 
                                className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-indigo-400 rounded-full border border-white z-20"
                                title="Sleep data"
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
                              />
                            )}
                            {i % 6 === 2 && (
                              <motion.div 
                                className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-400 rounded-full border border-white z-20"
                                title="Activity data"
                                animate={{ scale: [1, 1.12, 1] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Data flow to insights visualization with smoother animations */}
                    <div className="relative h-48 mt-8">
                      {/* Animated connections to insights */}
                      <div className="absolute top-0 left-0 w-full">
                        <svg className="w-full h-40" viewBox="0 0 400 100" preserveAspectRatio="none">
                          {/* Generate a series of flowing curves from data to insights */}
                          {Array.from({ length: 12 }, (_, i) => {
                            const startX = 20 + (i * 30);
                            const curveX = 200 + (Math.random() * 40 - 20);
                            const controlY1 = 20 + (Math.random() * 20);
                            const controlY2 = 40 + (Math.random() * 30);
                            
                            return (
                              <motion.path 
                                key={`path-${i}`}
                                d={`M ${startX},10 C ${startX + 40},${controlY1} ${curveX},${controlY2} 320,90`}
                                stroke="#475569"
                                strokeWidth="1"
                                fill="none"
                                strokeDasharray="200"
                                strokeDashoffset="200"
                                initial={{ strokeDashoffset: 200 }}
                                whileInView={{ strokeDashoffset: 0 }}
                                transition={{ 
                                  duration: 1.5,
                                  delay: 0.8 + (i * 0.12),
                                  ease: "easeOut"
                                }}
                                viewport={{ once: true }}
                                strokeOpacity="0.2"
                              />
                            );
                          })}
                          
                          {/* Add animated particles flowing along the paths */}
                          {Array.from({ length: 8 }, (_, i) => {
                            const startX = 40 + (i * 40);
                            const pathId = i % 4;
                            
                            return (
                              <motion.circle
                                key={`particle-${i}`}
                                r="3"
                                fill="#3B82F6"
                                opacity="0.6"
                                initial={{ cx: startX, cy: 10 }}
                                animate={{
                                  cx: [startX, startX + 80, 250, 320],
                                  cy: [10, 30, 50, 90],
                                }}
                                transition={{
                                  duration: 3,
                                  ease: "easeInOut",
                                  repeat: Infinity,
                                  delay: i * 0.5,
                                  repeatDelay: 1
                                }}
                              />
                            );
                          })}
                        </svg>
                      </div>
                      
                      {/* AI Insights visualization */}
                      <motion.div 
                        className="absolute right-6 bottom-0 flex flex-col items-end gap-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                        {/* Repositioned and enhanced "Processing" label */}
                        <motion.div
                          className="text-xs font-light mb-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-slate-200 flex items-center relative z-20"
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ marginRight: "20px" }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-slate-500 rounded-full mr-2"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                          <span className="text-slate-600">Synthesizing client data points into insights</span>
                        </motion.div>
                      
                        <motion.div 
                          className="bg-slate-900 rounded-lg p-4 shadow-lg max-w-xs relative"
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        >
                          {/* Visual data dot indicators showing where data comes from */}
                          <div className="absolute -left-1 -top-1">
                            <motion.div 
                              className="w-3 h-3 bg-amber-400 rounded-full border border-white"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                          </div>
                          <div className="absolute -left-3 top-3">
                            <motion.div 
                              className="w-3 h-3 bg-indigo-400 rounded-full border border-white"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                            />
                          </div>
                          <div className="absolute -left-2 top-8">
                            <motion.div 
                              className="w-3 h-3 bg-blue-400 rounded-full border border-white"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
                            />
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-slate-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <h5 className="font-light text-white flex items-center">
                              3-Minute Catch-up
                              <span className="text-xs text-slate-400 ml-1">(28 data points)</span>
                            </h5>
                          </div>
                          <p className="text-slate-300 text-sm font-light">
                            Client slept better after reducing caffeine intake. Also had a fight with their partner and expressed a lot of detachment toward family after the incident.
                          </p>
                        </motion.div>
                      </motion.div>
                  
                    </div>
                  </div>
                </div>
                
                {/* Benefit indicator */}
                <motion.div 
                  className="mt-8 bg-green-50 border border-green-100 rounded-lg p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-medium text-green-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Understanding All Parts of Your Client
                  </h4>
                  <p className="text-green-700/80 text-sm font-light">
                    Continuous data collection reveals patterns, triggers, and progress that would otherwise remain hidden, enabling more targeted and effective interventions.
                  </p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Key benefits section */}
            <div className="mt-24 max-w-5xl mx-auto">
              <motion.div 
                className="bg-slate-50 rounded-lg p-8 md:p-10 border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-600 rounded-full mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-4">Preserving the Human Element of Therapy</h3>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto font-light">
                    As AI chatbots increasingly position themselves as therapy alternatives, Empath empowers human therapists to maintain the irreplaceable value of a human while also accessing the computational capabilities of AI.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-slate-900 mb-3">From Missed Signals to Clear Patterns</h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      Current therapy misses critical information between sessions. Empath captures the full story, revealing patterns that would otherwise remain hidden.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-slate-900 mb-3">From Preparation to Precision</h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      Spend less time catching up and more time on targeted interventions. Empath's AI analyzes client data, providing you with actionable insights in just 5 minutes.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-slate-900 mb-3">From Anecdotes to Evidence</h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      Replace subjective recollections with deep understanding. Track progress with confidence and make treatment decisions based on complete information.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Summary note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-slate-500 font-light">
                Each phase builds upon the previous, creating a comprehensive understanding of your clients' well-being
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Grid */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4 text-slate-900">
              Designed for Therapists, by Therapists
            </h2>
            <p className="text-center text-slate-600 mt-8 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              We've collaborated with practicing therapists to create tools that enhance your clinical work without disrupting your workflow.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="p-8 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group relative overflow-hidden"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="mb-6 p-4 bg-slate-50 rounded-lg inline-block group-hover:bg-slate-100 transition-colors duration-300 relative z-10">
                  <feature.icon className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light mb-3 text-slate-900 relative z-10">{feature.title}</h3>
                <p className="text-slate-600 font-light relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonial/Quote Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-16 text-slate-900"
          >
            What Therapists Are Saying
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div 
              variants={scaleIn}
              className="relative"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="relative bg-white p-8 md:p-10 rounded-lg shadow-sm border border-slate-200 z-10 h-full flex flex-col">
                <div className="text-2xl text-slate-300 mb-4">"</div>
                <blockquote className="text-lg md:text-xl text-slate-700 font-light leading-relaxed flex-grow">
                  "Great therapy starts with understanding. But currently, therapists only get a glimpse into their clients' lives during hour-long sessions. <br />Empath is bridging this gap by helping clients document their experiences through journaling, health data, and mood tracking between sessions. This gives therapists a more complete picture of their clients' journeys before they meet."
                </blockquote>
                <div className="text-2xl text-slate-300 mt-2 text-right">"</div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="font-medium text-slate-900">Arjun Nanda</p>
                  <p className="text-slate-500 font-light">Psychiatrist  |  Host of The Mental Health Forecast</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="relative"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="relative bg-white p-8 md:p-10 rounded-lg shadow-sm border border-slate-200 z-10 h-full flex flex-col">
                <div className="text-2xl text-slate-300 mb-4">"</div>
                <blockquote className="text-lg md:text-xl text-slate-700 font-light leading-relaxed flex-grow">
                  "Most sessions are spent catching up. Intake forms and assessments only go so far—ongoing life experiences, highs and lows, and even subtle details matter. Empath helps capture this and enhance sessions."
                </blockquote>
                <div className="text-2xl text-slate-300 mt-2 text-right">"</div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="font-medium text-slate-900">Mabel Yiu, LMFT</p>
                  <p className="text-slate-500 font-light"> Marriage and Family Therapist  |  Advisory Board Member</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-16 text-slate-900"
          >
            How Empath Works
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div 
              variants={slideInLeft}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <picture>
                  <source srcSet={howitworksWebp} type="image/webp" />
                  <img 
                    src={howitworksPng} 
                    alt="Empath Dashboard Flow Diagram"
                    className="rounded-lg shadow-md relative z-10"
                    width="1200"
                    height="675"
                    loading="lazy"
                  />
                </picture>
              </motion.div>
            </motion.div>
            <motion.div 
              variants={fadeIn}
              className="relative"
            >
              {/* New timeline implementation with exact positioning */}
              <div className="relative">
                {/* Single continuous vertical line */}
                <div 
                  className="absolute left-[20px] md:left-[20px] top-[10px] h-[calc(100%-20px)] w-[1px] bg-gradient-to-b from-green-400 via-blue-400 to-indigo-400 hidden md:block"
                ></div>
                
                {/* Process steps */}
                <div className="space-y-16">
                  <motion.div 
                    variants={slideInRight} 
                    className="flex items-start"
                  >
                    {/* Circle indicator */}
                    <div className="flex-shrink-0 relative w-10 h-10 bg-green-50 rounded-full flex items-center justify-center border border-green-200 z-10">
                      <span className="text-green-600 font-light">1</span>
                    </div>
                    
                    {/* Content card */}
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                      <h3 className="text-xl font-light mb-3 text-slate-900">Client Data Collection</h3>
                      <p className="text-slate-600 leading-relaxed font-light">
                        Clients use our mobile app to log daily experiences, moods, and activities.
                        Wearable integration provides additional health insights.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={slideInRight} 
                    className="flex items-start"
                  >
                    {/* Circle indicator */}
                    <div className="flex-shrink-0 relative w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200 z-10">
                      <span className="text-blue-600 font-light">2</span>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                      <h3 className="text-xl font-light mb-3 text-slate-900">AI-Powered Analysis</h3>
                      <p className="text-slate-600 leading-relaxed font-light">
                        Our system analyzes patterns and trends, generating meaningful insights
                        about client well-being and progress.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={slideInRight} 
                    className="flex items-start"
                  >
                    {/* Circle indicator */}
                    <div className="flex-shrink-0 relative w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-200 z-10">
                      <span className="text-indigo-600 font-light">3</span>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                      <h3 className="text-xl font-light mb-3 text-slate-900">Therapist Dashboard</h3>
                      <p className="text-slate-600 leading-relaxed font-light">
                        Access organized summaries and visualizations of client data,
                        enabling more informed and effective therapy sessions.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-16 text-slate-900"
          >
            Common Questions
          </motion.h2>
          
          <div className="relative max-w-3xl mx-auto">
            
            <motion.div 
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-4 relative z-10"
            >
              {/* FAQ Item 1 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-light mb-3 text-slate-900 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3">
                      <span className="text-slate-600 font-light text-sm">Q</span>
                    </span>
                    How does Empath protect client privacy?
                  </h3>
                  <p className="text-slate-600 leading-relaxed pl-11 font-light">
                    We take privacy seriously. All data is encrypted, HIPAA-compliant, and only accessible to the therapist and client. Clients have full control over what they share.
                  </p>
                </div>
              </motion.div>
              
              {/* FAQ Item 2 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-light mb-3 text-slate-900 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3">
                      <span className="text-slate-600 font-light text-sm">Q</span>
                    </span>
                    Will this add to my workload?
                  </h3>
                  <p className="text-slate-600 leading-relaxed pl-11 font-light">
                    No—Empath is designed to save you time. Our dashboard provides quick, actionable insights that help you prepare for sessions more efficiently.
                  </p>
                </div>
              </motion.div>
              
              {/* FAQ Item 3 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-light mb-3 text-slate-900 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3">
                      <span className="text-slate-600 font-light text-sm">Q</span>
                    </span>
                    How do clients respond to using the app?
                  </h3>
                  <p className="text-slate-600 leading-relaxed pl-11 font-light">
                    Early feedback suggests clients appreciate the opportunity to reflect between sessions and feel more engaged in their therapy journey.
                  </p>
                </div>
              </motion.div>
              
              {/* FAQ Item 4 - New Item */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-light mb-3 text-slate-900 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3">
                      <span className="text-slate-600 font-light text-sm">Q</span>
                    </span>
                    What makes Empath different from other therapy tools?
                  </h3>
                  <p className="text-slate-600 leading-relaxed pl-11 font-light">
                    Empath is designed specifically to enhance therapeutic relationships, not replace them. Our focus is on providing meaningful insights from real-world data while maintaining the human connection at the core of therapy.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light mb-8 text-white"
          >
            Ready to Transform Your Practice?
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Join therapists who are discovering how Empath helps create deeper connections with clients through data-driven insights.
          </motion.p>
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button 
              onClick={() => setShowCalendar(true)}
              className="px-8 py-4 bg-white text-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center group cursor-pointer font-light"
              variants={fadeIn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Demo
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/advisory" 
                className="px-8 py-4 bg-transparent border border-white/50 text-white rounded-lg hover:bg-white/10 hover:border-white transition-all duration-300 inline-block cursor-pointer font-light"
              >
                Join Advisory Program
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}