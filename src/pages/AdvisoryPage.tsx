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
                <span className="text-slate-900 font-extralight tracking-tight">
                  Join us in Building Empath
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                You're the expert. Let's build technology that actually serves your practice,
                while earning ownership in what you help create.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  onClick={() => setIsFormOpen(true)}
                  className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center group cursor-pointer font-light tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Interest
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </motion.button>
                <motion.button
                  onClick={() => setIsCalendarOpen(true)}
                  className="px-8 py-4 bg-white text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center group cursor-pointer font-light tracking-wide"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Call for More Info
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </motion.button>
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
                  <span className="text-sm text-slate-600 font-light">Limited spots available for founding advisors</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4 text-slate-900">
              Why Join Our Advisory Board?
            </h2>
            <p className="text-center text-slate-600 mt-8 text-xl max-w-3xl mx-auto leading-relaxed font-light">
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
                className="p-8 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group relative overflow-hidden"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="mb-6 p-4 bg-slate-50 rounded-lg inline-block group-hover:bg-slate-100 transition-colors duration-300 relative z-10">
                  <benefit.icon className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light mb-3 text-slate-900 relative z-10">{benefit.title}</h3>
                <p className="text-slate-600 font-light relative z-10">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-16 text-slate-900"
          >
            From Advisor to Owner
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto relative"
          >
            {/* Process timeline */}
            <div className="relative">
              {/* Single continuous vertical line */}
              <div 
                className="absolute left-[20px] md:left-[20px] top-[10px] h-[calc(100%-20px)] w-[1px] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 hidden md:block"
              ></div>
              
              {/* Process steps */}
              <div className="space-y-16">
                <motion.div 
                  variants={slideInRight} 
                  className="flex items-start"
                >
                  {/* Circle indicator */}
                  <div className="flex-shrink-0 relative w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 z-10">
                    <span className="text-slate-600 font-light">1</span>
                  </div>
                  
                  {/* Content card */}
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                    <h3 className="text-xl font-light mb-3 text-slate-900">Express Interest</h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      Apply to join the initiative and begin using Empath with your clients. We'll provide you with early access to our platform and guide you through the onboarding process.
                    </p>
                    <motion.button
                      onClick={() => setIsFormOpen(true)}
                      className="mt-4 text-slate-700 font-light flex items-center text-sm hover:text-slate-900 cursor-pointer"
                      whileHover={{ x: 2 }}
                    >
                      Apply Now <ChevronRight className="ml-1 w-4 h-4" strokeWidth={1.5} />
                    </motion.button>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={slideInRight} 
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 relative w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 z-10">
                    <span className="text-slate-600 font-light">2</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                    <h3 className="text-xl font-light mb-3 text-slate-900">Provide Feedback</h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      Share your insights and suggestions to help refine Empath's features and functionality. Your expertise will directly influence our product development roadmap.
                    </p>
                    <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <p className="text-sm text-slate-700 italic font-light">
                        "We value your clinical expertise and will incorporate your feedback into our development process."
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={slideInRight} 
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 relative w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 z-10">
                    <span className="text-slate-600 font-light">3</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 ml-4 w-full group hover:-translate-y-1 border border-slate-100">
                    <h3 className="text-xl font-light mb-3 text-slate-900">Join Advisory Board</h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      Based on your contributions, receive an equity stake and continue shaping Empath's future. Become part of a community of therapists who are redefining mental health technology.
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-600 font-light">MY</div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-600 font-light">AN</div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-600 font-light">JS</div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-600 font-light">+</div>
                      </div>
                      <span className="ml-3 text-sm text-slate-500 font-light">Join our growing community</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* FAQs Section */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-16 text-slate-900"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="relative max-w-3xl mx-auto">
            <motion.div 
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-4 relative z-10"
            >
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden"
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <button 
                    className="w-full text-left p-6 flex justify-between items-center focus:outline-none cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-xl font-light text-slate-900 flex items-center">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3">
                        <span className="text-slate-600 font-light text-sm">Q</span>
                      </span>
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-2 text-slate-500"
                    >
                      <ChevronRight className="w-5 h-5 transform rotate-90" strokeWidth={1.5} />
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
                    <div className="p-6 pt-0 border-t border-slate-100">
                      <p className="text-slate-600 leading-relaxed pl-11 font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
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
            Ready to Shape the Future of Therapy?
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Join our advisory board and help build technology that truly serves therapists and their clients.
          </motion.p>
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button 
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-white text-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center group cursor-pointer font-light"
              variants={fadeIn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Interest
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </motion.button>
            <motion.button
              onClick={() => setIsCalendarOpen(true)}
              variants={fadeIn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-transparent border border-white/50 text-white rounded-lg hover:bg-white/10 hover:border-white transition-all duration-300 inline-flex items-center justify-center cursor-pointer font-light"
            >
              Book a Call
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </motion.button>
          </motion.div>

        </div>
      </AnimatedSection>

      {/* Application Form Modal */}
      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-slate-900">Schedule a Call</h2>
              <motion.button 
                onClick={() => setIsCalendarOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors cursor-pointer"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} strokeWidth={1.5} />
              </motion.button>
            </div>
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3jqhaaMqcvGyZWjcvhS35k27J8TRGjMafnr_-jG1EVWFdYYnR-kiLCfunh6SHBV6jzBijIU1ij?gv=true" 
              style={{ border: 0 }} 
              width="100%" 
              height="600" 
              frameBorder="0"
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}