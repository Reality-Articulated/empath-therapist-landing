import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, X, TrendingUp, Users, Lightbulb, BarChart3 } from 'lucide-react';
import { ApplicationForm } from '../components/ApplicationForm';

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

export default function AdvisoryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the Empath Advisory Initiative?",
      answer: "The Empath Advisory Initiative recognizes that therapists are the true experts in mental healthcare. Unlike traditional tech companies, we're putting the power back in therapists' hands by inviting you to directly shape our platform's development. As an advisor, you'll help build tools that enhance—never replace—the therapeutic relationship, while earning equity for your expertise."
    },
    {
      question: "How is Empath different from other therapy 'apps'?",
      answer: "We believe that meaningful mental health solutions can only be built with therapists, not for them. Instead of disrupting therapy, we're empowering therapists with tools they actually want and need. While other platforms focus on session management or in-session tools, we recognize that the real opportunity to support both therapists and clients lies in the time between sessions. Think of it this way: if each client's life is like a TV show, traditional therapy only lets you watch one episode every two weeks. Empath helps you stay connected to your client's full story, providing insights into what happens between sessions. That's why we're offering equity—because if therapists help build it, they should own it."
    },
    {
      question: "How is the equity allocated?",
      answer: "Equity (0.5% to 5%) is distributed on a milestone-based vesting schedule. Advisors earn portions of their equity as they complete feedback cycles or achieve specific milestones over a 1-2 year period."
    },
    {
      question: "What are the requirements for joining?",
      answer: "Participants must use Empath with at least one client for a minimum of a month, provide structured feedback, and maintain ethical standards in data usage and client relationships."
    },
    {
      question: "How much time will I need to commit?",
      answer: "The commitment is flexible, with most feedback sessions taking around 30 minutes, a minimum time commitment of 2 hours per month is expected. Quarterly reviews and feedback sessions are required to fulfill vesting milestones."
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "Earn Ownership",
      description: "Receive equity (0.5% to 5%) based on your contributions and feedback."
    },
    {
      icon: Lightbulb,
      title: "Shape the Future",
      description: "Direct influence over mental health technology that serves therapists."
    },
    {
      icon: BarChart3,
      title: "Enhance Your Practice",
      description: "Build tools that complement your work, not replace your expertise."
    },
    {
      icon: TrendingUp,
      title: "Join a Community",
      description: "Connect with forward-thinking therapists driving innovation."
    }
  ];

  return (
    <div className="flex-grow overflow-hidden pt-20">
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
                Join us in Building Empath
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                You're the expert. Let's build technology that actually serves your practice,
                while earning ownership in what you help create.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  onClick={() => setIsFormOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Interest
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  onClick={() => setIsCalendarOpen(true)}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Call for More Info
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
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
                  <span className="text-sm text-gray-600">Limited spots available for founding advisors</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">Why Join Our Advisory Board?</span>
              <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
            </h2>
            <p className="text-center text-gray-600 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
              Join a community of forward-thinking therapists who are shaping the future of mental health technology.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-100 group relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              >
                {/* Add decorative element */}
                <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-2xl inline-block group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300 relative z-10">
                  <benefit.icon className="w-10 h-10 text-blue-600 group-hover:text-indigo-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-700 transition-colors duration-300 relative z-10">{benefit.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 relative z-10">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">From Advisor to Owner</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-12 relative"
          >
            {/* Add connecting line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-300 via-blue-300 to-red-300 hidden md:block"></div>
            
            <motion.div 
              variants={slideInLeft} 
              className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-x-1"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition-colors duration-300 relative z-10">
                <span className="text-green-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">Express Interest</h3>
                <p className="text-gray-600 leading-relaxed">
                  Apply to join the initiative and begin using Empath with your clients. We'll provide you with early access to our platform and guide you through the onboarding process.
                </p>
                <motion.button
                  onClick={() => setIsFormOpen(true)}
                  className="mt-4 text-green-600 font-medium flex items-center text-sm hover:text-green-700"
                  whileHover={{ x: 5 }}
                >
                  Apply Now <ChevronRight className="ml-1 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              variants={slideInRight} 
              className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-x-1"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-colors duration-300 relative z-10">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-700 transition-colors">Provide Feedback</h3>
                <p className="text-gray-600 leading-relaxed">
                  Share your insights and suggestions to help refine Empath's features and functionality. Your expertise will directly influence our product development roadmap.
                </p>
                <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700 italic">
                    "We value your clinical expertise and will incorporate your feedback into our development process."
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={slideInLeft} 
              className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-x-1"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center group-hover:from-red-200 group-hover:to-red-300 transition-colors duration-300 relative z-10">
                <span className="text-red-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-red-700 transition-colors">Join Advisory Board</h3>
                <p className="text-gray-600 leading-relaxed">
                  Based on your contributions, receive an equity stake and continue shaping Empath's future. Become part of a community of therapists who are redefining mental health technology.
                </p>
                <div className="mt-4 flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-medium">JD</div>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600 font-medium">KT</div>
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-600 font-medium">MS</div>
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-xs text-yellow-600 font-medium">+</div>
                  </div>
                  <span className="ml-3 text-sm text-gray-500">Join our growing community</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* FAQs Section */}
      <AnimatedSection className="py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block mx-auto"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">Frequently Asked Questions</span>
            <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors duration-300 bg-white"
              >
                <button 
                  className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="text-blue-500 mr-2 hidden sm:inline">Q.</span>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-2 text-blue-500"
                  >
                    <ChevronRight className="w-5 h-5 transform rotate-90" />
                  </motion.div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: activeAccordion === index ? 'auto' : 0,
                    opacity: activeAccordion === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-20 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          
          {/* Add animated elements */}
          <motion.div 
            className="absolute top-1/4 left-1/3 w-24 h-24 bg-white/10 rounded-full"
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
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-8 text-white"
          >
            Ready to Shape the Future of Therapy?
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto"
          >
            Join our advisory board and help build technology that truly serves therapists and their clients.
          </motion.p>
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button 
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center group"
              variants={fadeIn}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Interest
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              onClick={() => setIsCalendarOpen(true)}
              variants={fadeIn}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center"
            >
              Book a Call
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

        </div>
      </AnimatedSection>

      {/* Application Form Modal */}
      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Calendar Modal */}
      {isCalendarOpen && (
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
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Schedule a Call</h2>
              <motion.button 
                onClick={() => setIsCalendarOpen(false)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X size={20} />
              </motion.button>
            </div>
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3jqhaaMqcvGyZWjcvhS35k27J8TRGjMafnr_-jG1EVWFdYYnR-kiLCfunh6SHBV6jzBijIU1ij?gv=true" 
              style={{ border: 0 }} 
              width="100%" 
              height="600" 
              frameBorder="0"
              className="rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}