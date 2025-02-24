import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import howitworks from '../../public/howitworks.png';
import whyitworks from '../../public/whyitworks.png';

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
    transition: { duration: 0.6 }
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

  return (
    <div className="flex-grow overflow-hidden">
      {/* Hero Section */}
      <AnimatedSection className="bg-gradient-to-b from-blue-600/5 via-indigo-50/30 to-white py-28 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-96 h-96 bg-blue-400/10 rounded-full absolute -top-20 -left-20 blur-3xl"></div>
          <div className="w-96 h-96 bg-indigo-400/10 rounded-full absolute top-40 -right-20 blur-3xl"></div>
          {/* Add animated particles */}
          <motion.div 
            className="w-4 h-4 bg-blue-400/30 rounded-full absolute top-1/4 left-1/4"
            animate={{ 
              y: [0, -20, 0], 
              opacity: [0.3, 0.8, 0.3] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="w-6 h-6 bg-indigo-400/20 rounded-full absolute top-1/3 right-1/3"
            animate={{ 
              y: [0, -30, 0], 
              opacity: [0.2, 0.6, 0.2] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
          />
          <motion.div 
            className="w-8 h-8 bg-purple-400/20 rounded-full absolute bottom-1/4 right-1/4"
            animate={{ 
              y: [0, -25, 0], 
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ 
              duration: 6, 
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 leading-tight">
                Make Every Client Feel Like <span className="relative inline-block">
                  Your Only Client
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                Empath helps therapists gain deeper insights into clients' experiences between sessions,
                enabling more meaningful connections and effective treatment outcomes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  onClick={() => setShowCalendar(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Demo Call
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to="/advisory" className="px-8 py-4 bg-white text-blue-600 rounded-xl border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center group">
                    Join Advisory Board
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
        >
          <motion.div 
            className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Schedule a Demo</h2>
              <motion.button 
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ciL9GVqgrLt07RkxMMYq-0szLXts_yaQ6M7oa0l6Egx-c1gM_1ayZa6kBmPgtXZZgZDs69oxz?gv=true" 
              style={{ border: 0 }} 
              width="100%" 
              height="600" 
              frameBorder="0"
              className="rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Why Empath Works */}
      <AnimatedSection className="py-28 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">Why Empath Transforms Therapy</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={slideInLeft}
              className="relative order-2 md:order-1"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-60"></div>
              <img 
                src={whyitworks} 
                alt="Empath System Diagram"
                className="rounded-2xl shadow-2xl relative z-10 hover:shadow-blue-200 transition-shadow duration-500"
              />
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="space-y-8 order-1 md:order-2"
            >
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Bridging the Gap Between Sessions</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
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
                      <span className="text-gray-600 ml-4 leading-relaxed">
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
                      <span className="text-gray-600 ml-4 leading-relaxed">
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
                      <span className="text-gray-600 ml-4 leading-relaxed">
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

      {/* The Challenge Analogy */}
      <AnimatedSection className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 transform -skew-y-6"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                If Understanding Your Client Was Like<br/>Understanding a TV Show...
              </h2>
              <motion.div 
                className="relative py-16 my-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 transform -skew-y-2 w-screen left-1/2 -translate-x-1/2 rounded-3xl shadow-xl"></div>
                <div className="relative max-w-3xl mx-auto">
                  <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    Imagine watching "Game of Thrones"<br/>
                    based on just the 1st episode of every season.
                  </p>
                  <p className="text-xl text-gray-600">
                    Just like seeing your client for 1 hour every week or two.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div 
                className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-gray-200 border-2 border-transparent relative overflow-hidden"
                variants={scaleIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {/* Add decorative element */}
                <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
                
                <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-700 relative z-10">
                  <span className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 shadow-inner">
                    <span className="text-gray-500">👥</span>
                  </span>
                  Traditional Approaches:
                </h3>
                <ul className="space-y-6 text-gray-600 relative z-10">
                  <motion.li 
                    className="flex items-start"
                    variants={fadeIn}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-4 mt-1 shadow-sm">
                      <span className="text-gray-500 text-sm">1</span>
                    </span>
                    <p className="text-lg">Will find a streaming platform for you to watch it</p>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    variants={fadeIn}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-4 mt-1 shadow-sm">
                      <span className="text-gray-500 text-sm">2</span>
                    </span>
                    <p className="text-lg">Will schedule the best time for you to watch those episodes</p>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    variants={fadeIn}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-4 mt-1 shadow-sm">
                      <span className="text-gray-500 text-sm">3</span>
                    </span>
                    <p className="text-lg">Other methods often provide only limited overviews of your client's ongoing journey</p>
                  </motion.li>
                </ul>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-2xl shadow-xl relative overflow-hidden"
                variants={scaleIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {/* Add animated elements */}
                <motion.div 
                  className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                
                <h3 className="text-xl font-semibold mb-6 flex items-center text-white relative z-10">
                  <span className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mr-4 shadow-inner">
                    <span className="text-2xl">✨</span>
                  </span>
                  The Empath Approach:
                </h3>
                <p className="text-2xl text-white leading-relaxed relative z-10">
                  We provide a comprehensive overview, capturing the full narrative of your client's experience.
                </p>
                <div className="mt-8 pt-6 border-t border-blue-400 border-opacity-30 relative z-10">
                  <motion.p 
                    className="text-blue-100 text-lg italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Because every detail contributes to a richer understanding.
                  </motion.p>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">Designed for Therapists, by Therapists</span>
              <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
            </h2>
            <p className="text-center text-gray-600 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
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
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-100 group relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              >
                {/* Add decorative element */}
                <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-2xl inline-block group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300 relative z-10">
                  <feature.icon className="w-10 h-10 text-blue-600 group-hover:text-indigo-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-700 transition-colors duration-300 relative z-10">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonial/Quote Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={scaleIn}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl blur-xl opacity-70"></div>
              <div className="relative bg-white p-12 rounded-2xl shadow-xl border border-blue-100 z-10">
                <h2 className="text-2xl font-bold text-center mb-10 relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    What Therapists Are Saying
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                </h2>
                <div className="text-5xl text-blue-300 mb-2 opacity-50 text-center">❝</div>
                <blockquote className="text-2xl italic text-gray-700 text-center font-light leading-relaxed">
                  "As a therapist, I've always wished for a better way to understand what happens between sessions without spending additional time for each client. 
                  The concept behind Empath addresses a real gap in how we provide care."
                </blockquote>
                <div className="text-5xl text-blue-300 mt-2 opacity-50 text-center">❞</div>
                <p className="text-center mt-6 font-medium text-gray-500">- From our advisory board discussions</p>
              </div>
            </div>
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">How Empath Works</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={slideInLeft}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-60"></div>
              <img 
                src={howitworks} 
                alt="Empath Dashboard Flow Diagram"
                className="rounded-2xl shadow-2xl relative z-10 hover:shadow-blue-200 transition-shadow duration-500"
              />
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="space-y-8 relative"
            >
              {/* Add connecting line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-300 via-blue-300 to-red-300 hidden md:block"></div>
              
              <motion.div 
                variants={slideInRight} 
                className="flex items-start space-x-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-x-1"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition-colors duration-300 relative z-10">
                  <span className="text-green-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">Client Data Collection</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Clients use our mobile app to log daily experiences, moods, and activities.
                    Wearable integration provides additional health insights.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={slideInRight} 
                className="flex items-start space-x-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-x-1 md:ml-8"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-colors duration-300 relative z-10">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-700 transition-colors">AI-Powered Analysis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our system analyzes patterns and trends, generating meaningful insights
                    about client well-being and progress.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={slideInRight} 
                className="flex items-start space-x-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-x-1"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center group-hover:from-purple-200 group-hover:to-purple-300 transition-colors duration-300 relative z-10">
                  <span className="text-purple-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-700 transition-colors">Therapist Dashboard</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Access organized summaries and visualizations of client data,
                    enabling more informed and effective therapy sessions.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">Common Questions</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="border-b border-gray-200 pb-6 hover:border-blue-200 transition-colors duration-300"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <span className="text-blue-500 mr-2">Q.</span>
                How does Empath protect client privacy?
              </h3>
              <p className="text-gray-600 leading-relaxed pl-6">
                We take privacy seriously. All data is encrypted, HIPAA-compliant, and only accessible to the therapist and client. Clients have full control over what they share.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="border-b border-gray-200 pb-6 hover:border-blue-200 transition-colors duration-300"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <span className="text-blue-500 mr-2">Q.</span>
                Will this add to my workload?
              </h3>
              <p className="text-gray-600 leading-relaxed pl-6">
                No—Empath is designed to save you time. Our dashboard provides quick, actionable insights that help you prepare for sessions more efficiently.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="border-b border-gray-200 pb-6 hover:border-blue-200 transition-colors duration-300"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <span className="text-blue-500 mr-2">Q.</span>
                How do clients respond to using the app?
              </h3>
              <p className="text-gray-600 leading-relaxed pl-6">
                Early feedback suggests clients appreciate the opportunity to reflect between sessions and feel more engaged in their therapy journey.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-20 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-8 text-white"
          >
            Ready to Explore a New Approach?
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto"
          >
            Discover how Empath can help you enhance your practice with data-driven insights.
          </motion.p>
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button 
              onClick={() => setShowCalendar(true)}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center group"
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
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 inline-block"
              >
                Learn About Advisory Program
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}