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
      <AnimatedSection className="bg-gradient-to-b from-teal-50 via-blue-50/30 to-white py-28 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-96 h-96 bg-teal-400/10 rounded-full absolute -top-20 -left-20 blur-3xl"></div>
          <div className="w-96 h-96 bg-purple-400/10 rounded-full absolute top-40 -right-20 blur-3xl"></div>
          {/* Add animated particles with mindfulness breathing effect */}
          <motion.div 
            className="w-8 h-8 bg-blue-400/20 rounded-full absolute top-1/4 left-1/4"
            animate={{ 
              scale: [1, 1.1, 1], 
              opacity: [0.3, 0.7, 0.3] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="w-10 h-10 bg-purple-400/15 rounded-full absolute top-1/3 right-1/3"
            animate={{ 
              scale: [1, 1.15, 1], 
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
          />
          <motion.div 
            className="w-12 h-12 bg-blue-400/15 rounded-full absolute bottom-1/4 right-1/4"
            animate={{ 
              scale: [1, 1.12, 1], 
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-14 leading-tight">
                <div className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-blue-700 leading-tight">
                    Make Every Client Feel Like
                  </span>
                  <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-teal-500/40 to-blue-500/40"></div>
                </div>
                
                <div className="mt-3 md:mt-4 relative inline-flex flex-col">
                  <span className="text-purple-800 font-bold relative z-10 tracking-tight">
                    They Are Your Only Client
                  </span>
                  <motion.div 
                    className="absolute -bottom-3 left-0 h-[6px] w-0 bg-gradient-to-r from-teal-400/80 to-purple-400/80 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute -bottom-3 left-0 h-[6px] bg-gradient-to-r from-teal-400 to-purple-400 rounded-full blur-[2px]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
                Empath helps therapists gain deeper insights into clients' experiences between sessions,
                enabling more meaningful connections and effective treatment outcomes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  onClick={() => setShowCalendar(true)}
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-2xl hover:shadow-lg hover:shadow-teal-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Book a demo call with our team"
                >
                  Book a Demo Call
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to="/advisory" className="px-8 py-4 bg-white text-teal-700 rounded-2xl border-2 border-teal-100 hover:border-teal-200 hover:bg-teal-50 transition-all duration-300 flex items-center justify-center group cursor-pointer" aria-label="Learn about joining our advisory board">
                    Join Advisory Board
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="mt-12 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full mr-2"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm text-gray-600">Currently in early access. Help shape the future of therapy tools.</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Calendar Modal */}
      {showCalendar && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-modal-title"
        >
          <motion.div 
            className="bg-white rounded-3xl p-6 w-full max-w-4xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="calendar-modal-title" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-purple-700">Schedule a Demo</h2>
              <motion.button 
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors cursor-pointer"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
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
              className="rounded-2xl"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Why Empath Works */}
      <AnimatedSection className="py-28 bg-gradient-to-b from-white to-teal-50/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-purple-700">Why Empath Transforms Therapy</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></div>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={slideInLeft}
              className="relative order-2 md:order-1"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl blur-xl opacity-60"></div>
              <picture>
                <source srcSet={whyitworksWebp} type="image/webp" />
                <img 
                  src={whyitworksPng} 
                  alt="Empath System Diagram"
                  className="rounded-3xl shadow-2xl relative z-10 hover:shadow-teal-200 transition-shadow duration-500"
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
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Bridging the Gap Between Sessions</h3>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  Empath creates a continuous therapeutic experience by connecting what happens in sessions with what happens in real life:
                </p>
                <div className="space-y-8">
                  <motion.div 
                    variants={slideInRight}
                    className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-green-400 hover:-translate-y-1"
                    whileHover={{ x: 5 }}
                  >
                    <p className="flex items-start">
                      <span className="flex-shrink-0 text-green-600 font-bold text-lg bg-green-100 px-3 py-1 rounded-lg">Perception</span>
                      <span className="text-gray-700 ml-4 leading-relaxed">
                        Our client app captures real-world experiences as they happen, providing authentic data rather than retrospective recollections.
                      </span>
                    </p>
                  </motion.div>
                  <motion.div 
                    variants={slideInRight}
                    className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-400 hover:-translate-y-1"
                    whileHover={{ x: 5 }}
                  >
                    <p className="flex items-start">
                      <span className="flex-shrink-0 text-blue-600 font-bold text-lg bg-blue-100 px-3 py-1 rounded-lg">Cognition</span>
                      <span className="text-gray-700 ml-4 leading-relaxed">
                        Our AI transforms complex client data into actionable clinical insights, revealing patterns invisible to traditional methods.
                      </span>
                    </p>
                  </motion.div>
                  <motion.div 
                    variants={slideInRight}
                    className="p-6 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-red-400 hover:-translate-y-1"
                    whileHover={{ x: 5 }}
                  >
                    <p className="flex items-start">
                      <span className="flex-shrink-0 text-red-600 font-bold text-lg bg-red-100 px-3 py-1 rounded-lg">Action</span>
                      <span className="text-gray-700 ml-4 leading-relaxed">
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
      <AnimatedSection className="py-28 relative overflow-hidden">
        {/* Simple, clean background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-blue-700 leading-tight">
                Complete Understanding Requires Complete Data
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
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
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md mb-6 flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Weekly Sessions</h3>
                  <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">4 sessions per month</span>
                </div>
                
                <div className="relative flex-grow">
                  {/* Session data visualization with improved alignment */}
                  <div className="bg-white rounded-2xl border-2 border-gray-200 h-full relative overflow-hidden">
                    {/* Fixed structure for precise alignment */}
                    <div className="grid grid-cols-[120px_1fr] h-full">
                      {/* Week labels column */}
                      <div className="flex flex-col justify-between py-8 px-4 border-r border-gray-100">
                        <div className="flex items-center h-16">
                          <span className="text-sm font-medium text-gray-500">Week 1</span>
                        </div>
                        <div className="flex items-center h-16">
                          <span className="text-sm font-medium text-gray-500">Week 2</span>
                        </div>
                        <div className="flex items-center h-16">
                          <span className="text-sm font-medium text-gray-500">Week 3</span>
                        </div>
                        <div className="flex items-center h-16">
                          <span className="text-sm font-medium text-gray-500">Week 4</span>
                        </div>
                      </div>
                      
                      {/* Session dots visualization */}
                      <div className="p-4 relative">
                        {/* Background dots grid */}
                        <div className="grid grid-cols-7 grid-rows-4 gap-3 h-full opacity-10">
                          {Array.from({ length: 28 }, (_, i) => (
                            <div key={`bg-dot-${i}`} className="aspect-square bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                        
                        {/* Session dots - perfectly aligned with week labels */}
                        <div className="absolute inset-0 p-4">
                          <div className="grid grid-rows-4 h-full gap-3">
                            {/* Week 1 Session */}
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
                                <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
                              </div>
                              <div className="ml-3 bg-gray-100 px-3 py-1 rounded-lg whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-600">50-min session</span>
                              </div>
                            </div>
                            
                            {/* Week 2 Session */}
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
                                <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
                              </div>
                              <div className="ml-3 bg-gray-100 px-3 py-1 rounded-lg whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-600">50-min session</span>
                              </div>
                            </div>
                            
                            {/* Week 3 Session */}
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
                                <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
                              </div>
                              <div className="ml-3 bg-gray-100 px-3 py-1 rounded-lg whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-600">50-min session</span>
                              </div>
                            </div>
                            
                            {/* Week 4 Session */}
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full">
                                <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
                              </div>
                              <div className="ml-3 bg-gray-100 px-3 py-1 rounded-lg whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-600">50-min session</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Missing data indicator */}
                    <motion.div 
                      className="absolute bottom-4 right-4 text-sm text-red-500/70 font-medium flex items-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>~90% of client data missed</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Gap in understanding indicator */}
                <motion.div 
                  className="mt-8 bg-red-50 border border-red-100 rounded-xl p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-medium text-red-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The Gap in Understanding
                  </h4>
                  <p className="text-red-700/80 text-sm">
                    With limited data points, therapists miss critical context, hidden patterns, and real-world triggers that occur between sessions.
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
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-6 border border-blue-400 shadow-md mb-6 flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Empath Approach</h3>
                  <span className="bg-blue-400/30 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-400/40">Continuous context</span>
                </div>
                
                <div className="relative flex-grow">
                  {/* Experience flow visualization */}
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-200 p-6 h-full relative overflow-hidden">
                    
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
                            <div className="aspect-square bg-blue-700 rounded-full shadow-md flex items-center justify-center relative z-10">
                              <motion.div
                                className="absolute inset-0 bg-blue-700 rounded-full"
                                animate={{ 
                                  scale: [1, 1.15, 1],
                                  opacity: [1, 0.8, 1],
                                  boxShadow: [
                                    '0 0 0 0 rgba(0,0,0,0)', 
                                    '0 0 0 4px rgba(59,130,246,0.06)', 
                                    '0 0 0 0 rgba(0,0,0,0)'
                                  ] 
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
                                className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border border-white z-20"
                                title="Mood data"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                              />
                            )}
                            {i % 7 === 3 && (
                              <motion.div 
                                className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full border-2 border-white z-20"
                                title="Sleep data"
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
                              />
                            )}
                            {i % 6 === 2 && (
                              <motion.div 
                                className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full border-2 border-white z-20"
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
                                stroke="#3B82F6"
                                strokeWidth="1.5"
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
                                strokeOpacity="0.4"
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
                          className="text-xs font-medium mb-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-blue-100 flex items-center relative z-20"
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ marginRight: "20px" }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-blue-500 rounded-full mr-2"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                          <span className="text-blue-600 font-medium">Synthesizing client data points into insights</span>
                        </motion.div>
                      
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 shadow-lg max-w-xs relative"
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          {/* Visual data dot indicators showing where data comes from */}
                          <div className="absolute -left-1 -top-1">
                            <motion.div 
                              className="w-3 h-3 bg-yellow-400 rounded-full border border-white"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                          </div>
                          <div className="absolute -left-3 top-3">
                            <motion.div 
                              className="w-3 h-3 bg-purple-400 rounded-full border border-white"
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
                            <svg className="w-5 h-5 text-blue-100 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <h5 className="font-medium text-white flex items-center">
                              3-Minute Catch-up
                              <span className="text-xs text-blue-200 ml-1">(28 data points)</span>
                            </h5>
                          </div>
                          <p className="text-blue-50 text-sm">
                            Client slept better after reducing caffeine intake. Also had a fight with their partner and expressed a lot of detachment toward family after the incident.
                          </p>
                        </motion.div>
                      </motion.div>
                  
                    </div>
                  </div>
                </div>
                
                {/* Benefit indicator */}
                <motion.div 
                  className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The Complete Picture
                  </h4>
                  <p className="text-blue-700/80 text-sm">
                    Continuous data collection reveals patterns, triggers, and progress that would otherwise remain hidden, enabling more targeted and effective interventions.
                  </p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Key benefits section */}
            <div className="mt-24 max-w-5xl mx-auto">
              <motion.div 
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-10 shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-600 rounded-full mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Preserving the Human Element of Therapy</h3>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    As AI chatbots increasingly position themselves as therapy alternatives, Empath empowers human therapists to maintain the irreplaceable value of a human while also accessing the computational capabilities of AI.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-3">From Missed Signals to Clear Patterns</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Current therapy misses critical information between sessions. Empath captures the full story, revealing patterns that would otherwise remain hidden.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-3">From Preparation to Precision</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Spend less time catching up and more time on targeted interventions. Empath's AI analyzes client data, providing you with actionable insights in just 5 minutes.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-3">From Anecdotes to Evidence</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Replace subjective recollections with deep understanding. Track progress with confidence and make treatment decisions based on complete information.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Grid */}
      <AnimatedSection className="py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-purple-700">Designed for Therapists, by Therapists</span>
              <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></div>
            </h2>
            <p className="text-center text-gray-700 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
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
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-100 group relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              >
                {/* Add decorative element */}
                <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="mb-6 p-4 bg-teal-50 rounded-2xl inline-block group-hover:bg-gradient-to-br group-hover:from-teal-100 group-hover:to-purple-100 transition-colors duration-300 relative z-10">
                  <feature.icon className="w-10 h-10 text-teal-600 group-hover:text-purple-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-700 transition-colors duration-300 relative z-10">{feature.title}</h3>
                <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300 relative z-10">{feature.description}</p>
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
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-purple-700">What Therapists Are Saying</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></div>
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div 
              variants={scaleIn}
              className="relative"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-100 to-purple-100 rounded-3xl blur-xl opacity-70"></div>
              <div className="relative bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-teal-100 z-10 h-full flex flex-col">
                <motion.div 
                  className="absolute top-0 right-0 w-20 h-20 opacity-5"
                  {...breathingAnimation}
                >
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#71C8C9" d="M51.7,-59.3C67.2,-48.1,80.5,-31.5,83.6,-13.2C86.7,5.1,79.8,25.2,67.8,40.7C55.8,56.2,38.8,67.1,20.1,72.8C1.3,78.6,-19.2,79.1,-36.3,71.1C-53.5,63.1,-67.3,46.5,-75.1,26.9C-82.9,7.2,-84.9,-15.6,-77.6,-34.6C-70.3,-53.6,-53.8,-68.9,-35.9,-79.1C-18,-89.3,1.3,-94.3,19.5,-88.2C37.8,-82.1,36.2,-70.5,51.7,-59.3Z" transform="translate(100 100)" />
                  </svg>
                </motion.div>
                <div className="text-5xl text-teal-300 mb-4 opacity-50">❝</div>
                <blockquote className="text-xl md:text-2xl italic text-gray-700 font-light leading-relaxed flex-grow">
                  "Great therapy starts with understanding. But currently, therapists only get a glimpse into their clients' lives during hour-long sessions. <br />Empath is bridging this gap by helping clients document their experiences through journaling, health data, and mood tracking between sessions. This gives therapists a more complete picture of their clients' journeys before they meet."
                </blockquote>
                <div className="text-5xl text-teal-300 mt-2 opacity-50">❞</div>
                <div className="mt-4 border-t border-teal-100 pt-4">
                  <p className="font-medium text-gray-800">Arjun Nanda</p>
                  <p className="text-gray-500">Psychiatrist  |  Host of The Mental Health Forecast</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="relative"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-teal-100 rounded-3xl blur-xl opacity-70"></div>
              <div className="relative bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-purple-100 z-10 h-full flex flex-col">
                <motion.div 
                  className="absolute top-0 right-0 w-20 h-20 opacity-5"
                  {...breathingAnimation}
                >
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#8B5CF6" d="M45.3,-51.2C59.9,-41.7,73.5,-28.5,78.4,-12.5C83.4,3.5,79.9,22.3,70.1,36.3C60.3,50.3,44.3,59.6,27.7,64.2C11.1,68.9,-6.1,69,-23,65C-39.9,61,-56.5,52.9,-67.3,38.8C-78.1,24.7,-83.2,4.5,-78.9,-13.1C-74.6,-30.6,-61,-45.6,-45.7,-55.2C-30.5,-64.8,-15.2,-69.1,0.3,-69.5C15.9,-69.8,30.7,-60.7,45.3,-51.2Z" transform="translate(100 100)" />
                  </svg>
                </motion.div>
                <div className="text-5xl text-purple-300 mb-4 opacity-50">❝</div>
                <blockquote className="text-xl md:text-2xl italic text-gray-700 font-light leading-relaxed flex-grow">
                  "Most sessions are spent catching up. Intake forms and assessments only go so far—ongoing life experiences, highs and lows, and even subtle details matter. Empath helps capture this and enhance sessions."
                </blockquote>
                <div className="text-5xl text-purple-300 mt-2 opacity-50">❞</div>
                <div className="mt-4 border-t border-purple-100 pt-4">
                  <p className="font-medium text-gray-800">Mabel Yiu, LMFT</p>
                  <p className="text-gray-500"> Marriage and Family Therapist  |  Advisory Board Member</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection className="py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-purple-700">How Empath Works</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></div>
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
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-100 to-purple-100 rounded-2xl blur-xl opacity-60"></div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                {...breathingAnimation}
              >
                <picture>
                  <source srcSet={howitworksWebp} type="image/webp" />
                  <img 
                    src={howitworksPng} 
                    alt="Empath Dashboard Flow Diagram"
                    className="rounded-2xl shadow-2xl relative z-10 hover:shadow-teal-200 transition-shadow duration-500"
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
                  className="absolute left-[24px] md:left-[18px] top-[10px] h-[calc(100%-20px)] w-[3px] bg-gradient-to-b from-green-400 via-teal-400 to-purple-400 hidden md:block"
                ></div>
                
                {/* Process steps */}
                <div className="space-y-20">
                  <motion.div 
                    variants={slideInRight} 
                    className="flex items-start"
                  >
                    {/* Circle indicator */}
                    <div className="flex-shrink-0 relative w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-xl border-[3px] border-white z-10">
                      <span className="text-green-600 font-semibold">1</span>
                    </div>
                    
                    {/* Content card */}
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">Client Data Collection</h3>
                      <p className="text-gray-700 leading-relaxed">
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
                    <div className="flex-shrink-0 relative w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center shadow-xl border-[3px] border-white z-10">
                      <span className="text-teal-600 font-semibold">2</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-700 transition-colors">AI-Powered Analysis</h3>
                      <p className="text-gray-700 leading-relaxed">
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
                    <div className="flex-shrink-0 relative w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-xl border-[3px] border-white z-10">
                      <span className="text-purple-600 font-semibold">3</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-700 transition-colors">Therapist Dashboard</h3>
                      <p className="text-gray-700 leading-relaxed">
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
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-purple-700">Common Questions</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></div>
          </motion.h2>
          
          {/* Add background elements */}
          <div className="relative max-w-3xl mx-auto">
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 bg-teal-50 rounded-full opacity-50 z-0 hidden md:block"
              animate={{ 
                scale: [1, 1.1, 1], 
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-full opacity-50 z-0 hidden md:block"
              animate={{ 
                scale: [1, 1.15, 1], 
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            <motion.div 
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-8 relative z-10"
            >
              {/* FAQ Item 1 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-teal-100 overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="text-teal-600 font-medium">Q</span>
                    </span>
                    How does Empath protect client privacy?
                  </h3>
                  <p className="text-gray-700 leading-relaxed pl-11">
                    We take privacy seriously. All data is encrypted, HIPAA-compliant, and only accessible to the therapist and client. Clients have full control over what they share.
                  </p>
                </div>
              </motion.div>
              
              {/* FAQ Item 2 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-purple-100 overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-medium">Q</span>
                    </span>
                    Will this add to my workload?
                  </h3>
                  <p className="text-gray-700 leading-relaxed pl-11">
                    No—Empath is designed to save you time. Our dashboard provides quick, actionable insights that help you prepare for sessions more efficiently.
                  </p>
                </div>
              </motion.div>
              
              {/* FAQ Item 3 */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-teal-100 overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <span className="text-teal-600 font-medium">Q</span>
                    </span>
                    How do clients respond to using the app?
                  </h3>
                  <p className="text-gray-700 leading-relaxed pl-11">
                    Early feedback suggests clients appreciate the opportunity to reflect between sessions and feel more engaged in their therapy journey.
                  </p>
                </div>
              </motion.div>
              
              {/* FAQ Item 4 - New Item */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-purple-100 overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-medium">Q</span>
                    </span>
                    What makes Empath different from other therapy tools?
                  </h3>
                  <p className="text-gray-700 leading-relaxed pl-11">
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
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-purple-700"></div>
        
        {/* Add animated mindfulness-inspired elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full mix-blend-overlay opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full mix-blend-overlay opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-[60%] left-[60%] w-40 h-40 rounded-full mix-blend-overlay opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-8 text-white"
          >
            Ready to Transform Your Practice?
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl mb-10 text-teal-100 max-w-2xl mx-auto leading-relaxed"
          >
            Join therapists who are discovering how Empath helps create deeper connections with clients through data-driven insights.
          </motion.p>
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button 
              onClick={() => setShowCalendar(true)}
              className="px-8 py-4 bg-white text-teal-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center group cursor-pointer"
              variants={fadeIn}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Demo
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/advisory" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl hover:bg-white/10 transition-all duration-300 inline-block cursor-pointer"
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