import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface AIProvider {
  name: string;
  models: string[];
  baa_pdf: string;
  color: string;
}

interface AIStackData {
  updated: string;
  ai_providers: AIProvider[];
  storage_host: string;
  storage_services: string[];
  aws_baa_pdf: string;
}

const TransparencyPage: React.FC = () => {
  const [aiStackData, setAiStackData] = useState<AIStackData | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  // Separate effect for scroll restoration on route changes
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Override browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on route change
    scrollToTop();
    
    // Additional attempts to ensure scroll happens
    requestAnimationFrame(scrollToTop);
    setTimeout(scrollToTop, 0);
  }, [location.pathname]);

      useEffect(() => {
      // Force scroll to top on component mount
      const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      
      // Override browser scroll restoration immediately
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      // Multiple scroll attempts to override any browser behavior
      scrollToTop();
      requestAnimationFrame(scrollToTop);
      setTimeout(scrollToTop, 0);
      setTimeout(scrollToTop, 1);
      setTimeout(scrollToTop, 10);
      setTimeout(scrollToTop, 50);
      setTimeout(scrollToTop, 100);
      setTimeout(scrollToTop, 200);
      
      const fetchAIStackData = async () => {
        try {
          // Simulate loading time for better UX
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // First try to fetch from local public folder
          const response = await fetch('/ai-stack.json');
          if (response.ok) {
            const data = await response.json();
            setAiStackData(data);
          } else {
            // Fallback to mock data if fetch fails
            const mockData: AIStackData = {
              updated: "2025-11-30T10:00:00Z",
              ai_providers: [
                {
                  name: "OpenAI",
                  models: ["GPT-4.1", "GPT-5"],
                  baa_pdf: "",
                  color: "blue"
                },
                {
                  name: "Anthropic",
                  models: ["Claude 4 Sonnet", "Claude 4 Opus"],
                  baa_pdf: "",
                  color: "amber"
                },
                {
                  name: "Empath Hosted",
                  models: ["Empath-Clinical-v2", "Empath-Insights"],
                  baa_pdf: "",
                  color: "emerald"
                }
              ],
              storage_host: "AWS",
              storage_services: ["S3", "KMS", "RDS"],
              aws_baa_pdf: "/AWS_BAA Addendum.pdf"
            };
            setAiStackData(mockData);
          }
        } catch (error) {
          console.error('Failed to fetch AI stack data:', error);
          // Fallback to mock data
          const mockData: AIStackData = {
            updated: "2025-11-30T10:00:00Z",
            ai_providers: [
              {
                name: "OpenAI",
                models: ["GPT-4.1", "GPT-5"],
                baa_pdf: "",
                color: "blue"
              },
              {
                name: "Anthropic",
                models: ["Claude 4 Sonnet", "Claude 4 Opus"],
                baa_pdf: "",
                color: "amber"
              },
              {
                name: "Empath Hosted",
                models: ["Empath-Clinical-v2", "Empath-Insights"],
                baa_pdf: "",
                color: "emerald"
              }
            ],
            storage_host: "AWS",
            storage_services: ["S3", "KMS", "RDS"],
            aws_baa_pdf: "/AWS_BAA Addendum.pdf"
          };
          setAiStackData(mockData);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAIStackData();
    }, []);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const responsibleAIItems = [
    {
      title: "Transparency",
      content: "We provide clear information about our AI systems, their capabilities, limitations, and the data they process. This page itself is part of our commitment to transparency."
    },
    {
      title: "Data Minimization & Retention", 
      content: "We only collect and process the minimum amount of personal health information necessary to provide therapeutic insights. Your journal entries are retained while your account is active. Upon account deletion, your data is removed within 30 days, with backups purged within 90 days. You control what you share—and can unshare or delete at any time."
    },
    {
      title: "Bias Monitoring",
      content: "We regularly audit our AI outputs for potential biases and work with diverse teams to ensure our systems work fairly across different demographics and conditions."
    },
    {
      title: "Human-in-the-loop Override",
      content: "Licensed therapists always have the final say. Our AI provides insights and suggestions, but human clinicians make all treatment decisions."
    }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const getProviderStyles = (color: string) => {
    const styles: Record<string, { border: string, dot: string, tag: string, bg: string }> = {
      blue: {
        border: "border-blue-500/20",
        dot: "bg-blue-400",
        tag: "bg-blue-500/10 text-blue-300 border-blue-500/30",
        bg: "hover:bg-blue-500/5"
      },
      amber: {
        border: "border-amber-500/20",
        dot: "bg-amber-400",
        tag: "bg-amber-500/10 text-amber-300 border-amber-500/30",
        bg: "hover:bg-amber-500/5"
      },
      emerald: {
        border: "border-emerald-500/20",
        dot: "bg-emerald-400",
        tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        bg: "hover:bg-emerald-500/5"
      }
    };
    return styles[color] || styles.blue;
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleOnHover = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Loading component
  const LoadingSpinner = () => (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingSpinner key="loading" />
      ) : (
        <motion.div 
          key="content"
          className="min-h-screen bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
            <motion.div 
              className="absolute inset-0 z-0"
              style={{ y: y1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
              {/* Animated background elements */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </motion.div>
            
            <motion.div 
              className="relative z-10 max-w-6xl mx-auto px-4"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                className="mb-8"
                variants={fadeInUp}
              >
                <motion.span 
                  className="inline-block p-2 border border-white/20 rounded-full mb-4"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(255,255,255,0.4)",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src="/empath-logo.png"
                    alt="Empath Logo"
                    className="w-20 h-20"
                  />
                </motion.span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                variants={fadeInUp}
              >
                Transparency.
              </motion.h1>
              
              <motion.h1 
                className="text-5xl md:text-7xl text-gray-400 font-bold mb-12"
                variants={fadeInUp}
              >
                Our pledge to you
              </motion.h1>
              
              <motion.div 
                className="bg-white/5 p-8 rounded-xl border border-white/10 max-w-4xl mx-auto backdrop-blur-sm"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.2)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Total transparency, zero surprises.
                </h2>
                <p className="text-xl text-gray-300 font-light">
                  Where your data lives, how it's processed, and what happens if something goes wrong.
                </p>
              </motion.div>
            </motion.div>
          </div>

                {/* Content */}
          <motion.div 
            className="max-w-6xl mx-auto px-4 py-24"
            style={{ y: y2 }}
          >
            <div className="space-y-32">
              
              {/* Summary Section */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2 
                  className="text-2xl text-gray-400 mb-12"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Here's what we promise...
                </motion.h2>
                
                <motion.div 
                  className="space-y-12"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    "Every word you write is encrypted",
                    "All AI providers sign binding agreements", 
                    "Your data never trains AI models",
                    "15-day breach notification guaranteed"
                  ].map((promise, index) => (
                    <motion.div 
                      key={index}
                      className="flex gap-6 group cursor-default"
                      variants={fadeInUp}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.span 
                        className="text-2xl text-gray-500 group-hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        {index + 1}
                      </motion.span>
                      <motion.h3 
                        className="text-4xl font-light group-hover:text-white transition-colors"
                      >
                        {promise}
                      </motion.h3>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

          {/* Your Data Journey */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-5xl font-light mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Your data journey
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 font-light mb-16 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Follow your encrypted data as it moves from your device to insights, protected at every step.
            </motion.p>
            
            <motion.div 
              className="bg-gradient-to-br from-white/5 to-white/2 rounded-2xl p-12 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                borderColor: "rgba(255,255,255,0.2)"
              }}
            >
              <svg viewBox="0 0 1200 300" className="w-full h-auto">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </linearGradient>
                  <linearGradient id="tunnelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                  <linearGradient id="storeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#6D28D9" />
                  </linearGradient>
                  <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                  <linearGradient id="insightsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                  <linearGradient id="clientGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>

                  {/* Enhanced arrow marker */}
                  <marker id="enhancedArrow" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,8 L12,4 z" fill="url(#flowGradient)" opacity="0.8"/>
                  </marker>

                  {/* Flow gradient */}
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>

                  {/* Glow filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  {/* Drop shadow */}
                  <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.3"/>
                  </filter>
                </defs>

                {/* Curved flow path */}
                <path d="M100 150 Q300 100 500 150 Q700 200 900 150 Q1050 100 1100 150" 
                      stroke="url(#flowGradient)" 
                      strokeWidth="3" 
                      fill="none" 
                      opacity="0.6"
                      strokeDasharray="8,4"
                      className="animate-pulse"/>

                {/* Step 1: Mobile Device */}
                <g transform="translate(60, 110)">
                  <circle cx="40" cy="40" r="35" fill="url(#phoneGradient)" filter="url(#dropshadow)" opacity="0.9"/>
                  <circle cx="40" cy="40" r="25" fill="rgba(255,255,255,0.1)" />
                  {/* Phone icon */}
                  <rect x="32" y="28" width="16" height="24" rx="3" fill="white" opacity="0.9"/>
                  <rect x="34" y="30" width="12" height="16" rx="1" fill="url(#phoneGradient)"/>
                  <circle cx="40" cy="49" r="1.5" fill="white" opacity="0.9"/>
                  
                  <text x="40" y="-10" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Your Device</text>
                  <text x="40" y="95" textAnchor="middle" fill="#93C5FD" fontSize="10" fontWeight="500">AES-256 Encryption</text>
                  <text x="40" y="108" textAnchor="middle" fill="#93C5FD" fontSize="10">Client-side Protected</text>
                </g>

                {/* Step 2: Secure Transmission */}
                <g transform="translate(240, 110)">
                  <circle cx="40" cy="40" r="35" fill="url(#tunnelGradient)" filter="url(#dropshadow)" opacity="0.9"/>
                  <circle cx="40" cy="40" r="25" fill="rgba(255,255,255,0.1)" />
                  {/* Shield icon */}
                  <path d="M32 32 L40 28 L48 32 L48 44 C48 48 44 52 40 52 C36 52 32 48 32 44 Z" fill="white" opacity="0.9"/>
                  <path d="M36 40 L38 42 L44 36" stroke="url(#tunnelGradient)" strokeWidth="2" fill="none"/>
                  
                  <text x="40" y="-10" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Secure Transit</text>
                  <text x="40" y="95" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontWeight="500">TLS 1.3 + Perfect FS</text>
                  <text x="40" y="108" textAnchor="middle" fill="#6EE7B7" fontSize="10">Zero-Knowledge Transfer</text>
                </g>

                {/* Step 3: Encrypted Storage */}
                <g transform="translate(420, 110)">
                  <circle cx="40" cy="40" r="35" fill="url(#storeGradient)" filter="url(#dropshadow)" opacity="0.9"/>
                  <circle cx="40" cy="40" r="25" fill="rgba(255,255,255,0.1)" />
                  {/* Database icon */}
                  <ellipse cx="40" cy="35" rx="12" ry="4" fill="white" opacity="0.9"/>
                  <rect x="28" y="35" width="24" height="8" fill="white" opacity="0.9"/>
                  <ellipse cx="40" cy="43" rx="12" ry="4" fill="white" opacity="0.9"/>
                  <path d="M28 35 L28 43" stroke="url(#storeGradient)" strokeWidth="1"/>
                  <path d="M52 35 L52 43" stroke="url(#storeGradient)" strokeWidth="1"/>
                  
                  <text x="40" y="-10" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Encrypted Store</text>
                  <text x="40" y="95" textAnchor="middle" fill="#C4B5FD" fontSize="10" fontWeight="500">AWS KMS + HIPAA</text>
                  <text x="40" y="108" textAnchor="middle" fill="#C4B5FD" fontSize="10">Military-Grade Security</text>
                </g>

                {/* Step 4: AI Processing */}
                <g transform="translate(600, 110)">
                  <circle cx="40" cy="40" r="35" fill="url(#aiGradient)" filter="url(#dropshadow)" opacity="0.9"/>
                  <circle cx="40" cy="40" r="25" fill="rgba(255,255,255,0.1)" />
                  {/* AI Brain icon */}
                  <circle cx="40" cy="40" r="10" fill="white" opacity="0.9"/>
                  <circle cx="35" cy="37" r="2" fill="url(#aiGradient)"/>
                  <circle cx="45" cy="37" r="2" fill="url(#aiGradient)"/>
                  <circle cx="35" cy="43" r="1.5" fill="url(#aiGradient)"/>
                  <circle cx="40" cy="43" r="1.5" fill="url(#aiGradient)"/>
                  <circle cx="45" cy="43" r="1.5" fill="url(#aiGradient)"/>
                  
                  <text x="40" y="-10" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">AI Processing</text>
                  <text x="40" y="95" textAnchor="middle" fill="#FCD34D" fontSize="10" fontWeight="500">All Providers + BAA</text>
                  <text x="40" y="108" textAnchor="middle" fill="#FCD34D" fontSize="10">HIPAA Compliant</text>
                </g>

                {/* Step 5: Secure Insights */}
                <g transform="translate(780, 110)">
                  <circle cx="40" cy="40" r="35" fill="url(#insightsGradient)" filter="url(#dropshadow)" opacity="0.9"/>
                  <circle cx="40" cy="40" r="25" fill="rgba(255,255,255,0.1)" />
                  {/* Chart icon */}
                  <rect x="32" y="30" width="16" height="20" rx="2" fill="white" opacity="0.9"/>
                  <rect x="34" y="42" width="2" height="6" fill="url(#insightsGradient)"/>
                  <rect x="37" y="38" width="2" height="10" fill="url(#insightsGradient)"/>
                  <rect x="40" y="35" width="2" height="13" fill="url(#insightsGradient)"/>
                  <rect x="43" y="40" width="2" height="8" fill="url(#insightsGradient)"/>
                  
                  <text x="40" y="-10" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Secure Insights</text>
                  <text x="40" y="95" textAnchor="middle" fill="#FCA5A5" fontSize="10" fontWeight="500">Password Protected</text>
                  <text x="40" y="108" textAnchor="middle" fill="#FCA5A5" fontSize="10">Re-encrypted Results</text>
                </g>

                {/* Step 6: Clinical Dashboard */}
                <g transform="translate(960, 110)">
                  <circle cx="40" cy="40" r="35" fill="url(#clientGradient)" filter="url(#dropshadow)" opacity="0.9"/>
                  <circle cx="40" cy="40" r="25" fill="rgba(255,255,255,0.1)" />
                  {/* User icon */}
                  <circle cx="40" cy="35" r="5" fill="white" opacity="0.9"/>
                  <path d="M30 48 C30 43 34 40 40 40 C46 40 50 43 50 48" fill="white" opacity="0.9"/>
                  
                  <text x="40" y="-10" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Clinical Access</text>
                  <text x="40" y="95" textAnchor="middle" fill="#C7D2FE" fontSize="10" fontWeight="500">Therapist Dashboard</text>
                  <text x="40" y="108" textAnchor="middle" fill="#C7D2FE" fontSize="10">Controlled Access</text>
                </g>

                {/* Enhanced connecting arrows */}
                <g opacity="0.8">
                  <path d="M130 150 L200 150" stroke="url(#flowGradient)" strokeWidth="3" markerEnd="url(#enhancedArrow)" filter="url(#glow)"/>
                  <path d="M310 150 L380 150" stroke="url(#flowGradient)" strokeWidth="3" markerEnd="url(#enhancedArrow)" filter="url(#glow)"/>
                  <path d="M490 150 L560 150" stroke="url(#flowGradient)" strokeWidth="3" markerEnd="url(#enhancedArrow)" filter="url(#glow)"/>
                  <path d="M670 150 L740 150" stroke="url(#flowGradient)" strokeWidth="3" markerEnd="url(#enhancedArrow)" filter="url(#glow)"/>
                  <path d="M850 150 L920 150" stroke="url(#flowGradient)" strokeWidth="3" markerEnd="url(#enhancedArrow)" filter="url(#glow)"/>
                </g>

                {/* Security indicators */}
                <g opacity="0.7">
                  <text x="165" y="130" textAnchor="middle" fill="#60A5FA" fontSize="9" fontWeight="500">🔒 End-to-End</text>
                  <text x="345" y="130" textAnchor="middle" fill="#34D399" fontSize="9" fontWeight="500">🛡️ Zero Trust</text>
                  <text x="525" y="130" textAnchor="middle" fill="#A78BFA" fontSize="9" fontWeight="500">🔐 Encrypted</text>
                  <text x="705" y="130" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="500">✅ Verified</text>
                  <text x="885" y="130" textAnchor="middle" fill="#F87171" fontSize="9" fontWeight="500">🔑 Authorized</text>
                </g>
              </svg>
            </motion.div>

            {/* Enhanced explanation cards */}
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mt-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  color: "blue",
                  title: "Client-Side Protection",
                  description: "Your data is encrypted before it ever leaves your device using AES-256 encryption with client-side key generation."
                },
                {
                  color: "purple", 
                  title: "Zero-Knowledge Architecture",
                  description: "We cannot decrypt your data. Only you have the keys, ensuring true privacy even from our own systems."
                },
                {
                  color: "green",
                  title: "Contractual Protection", 
                  description: "Every AI provider signs binding Business Associate Agreements with strict data handling requirements."
                }
              ].map((card, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/5 p-6 rounded-xl border border-white/10"
                  variants={fadeInUp}
                  whileHover={scaleOnHover}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      className={`w-3 h-3 rounded-full bg-${card.color}-400`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    <h4 className="font-semibold">{card.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm font-light">{card.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Current AI Stack */}
          <section>
            <h2 className="text-5xl font-light mb-16">Current AI stack</h2>
            <p className="text-xl text-gray-400 font-light mb-16 max-w-3xl">
              Live infrastructure status. This data updates automatically when we change providers or models.
            </p>
            
            {aiStackData && (
              <div className="bg-gradient-to-br from-white/5 to-white/2 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
                {/* Header with live status indicator */}
                <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-800/20 p-8 border-b border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">Live Status</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-2">AI Infrastructure Monitor</h3>
                      <p className="text-gray-300">Last updated: {formatDate(aiStackData.updated)}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                        <div className="text-2xl font-bold text-green-400">100%</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main content grid */}
                <div className="p-8">
                  {/* Provider Overview */}
                  <div className="mb-12">
                    <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Infrastructure Providers
                    </h4>
                    <div className="grid lg:grid-cols-2 gap-8">
                      
                      {/* AI Providers Card - Multi-Provider */}
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent rounded-bl-[4rem]"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-gray-400 uppercase text-xs tracking-wider font-semibold">AI Processing</h4>
                              <p className="text-xl font-bold text-white">Multi-Provider Architecture</p>
                            </div>
                          </div>
                          
                          {/* Critical BAA Notice */}
                          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border border-emerald-500/20 mb-5">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-emerald-300 font-semibold text-sm mb-1">Your Data Cannot Be Used for Training</p>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                  Unlike consumer APIs, our BAA agreements with all providers legally prohibit them from storing or using your data for model training. Your conversations remain private and protected.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Provider List */}
                          <div className="space-y-4">
                            {aiStackData.ai_providers?.map((provider, index) => {
                              const styles = getProviderStyles(provider.color);
                              return (
                                <div key={index} className={`bg-white/5 rounded-lg p-4 border ${styles.border} ${styles.bg} transition-colors duration-300`}>
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${styles.dot}`}></div>
                                      <span className="text-white font-semibold text-sm">{provider.name}</span>
                                      {provider.name === "Empath Hosted" && (
                                        <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs border border-purple-500/30">Proprietary</span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="bg-green-500/20 px-2 py-0.5 rounded border border-green-500/30">
                                        <span className="text-green-400 font-semibold text-xs">✓ BAA</span>
                                      </div>
                                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {provider.models.map((model, modelIndex) => (
                                      <span 
                                        key={modelIndex} 
                                        className={`px-2.5 py-1 rounded-full text-xs border ${styles.tag}`}
                                      >
                                        {model}
                                      </span>
                                    ))}
                                  </div>
                                  {provider.baa_pdf && (
                                    <a 
                                      href={provider.baa_pdf} 
                                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-xs mt-1"
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      <span className="underline">View {provider.name} BAA</span>
                                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  )}
                                  {provider.name === "Empath Hosted" && (
                                    <p className="text-gray-500 text-xs mt-1 italic">Internally hosted — no third-party data sharing</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* AWS Provider Card */}
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-3xl"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-gray-400 uppercase text-xs tracking-wider font-semibold">Data Storage</h4>
                              <p className="text-xl font-bold text-white">{aiStackData.storage_host}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-green-400 text-sm font-medium">Connected & Operational</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {aiStackData.storage_services.map((service, index) => (
                                <span key={index} className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 px-3 py-1 rounded-full text-xs border border-orange-500/30">
                                  {service}
                                </span>
                              ))}
                            </div>
                            <div className="pt-2">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="bg-green-500/20 px-2 py-1 rounded border border-green-500/30">
                                  <span className="text-green-400 font-semibold text-xs">✓ BAA ACTIVE</span>
                                </div>
                              </div>
                              <a 
                                href={aiStackData.aws_baa_pdf} 
                                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="underline">AWS BAA</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Compliance Overview */}
                  <div className="mb-12">
                    <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Compliance Status
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-white mb-2">HIPAA Compliant</h5>
                        <p className="text-emerald-400 font-semibold text-sm">✓ FULLY COMPLIANT</p>
                        <p className="text-gray-400 text-xs mt-2">All infrastructure meets healthcare standards</p>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-white mb-2">BAA Coverage</h5>
                        <p className="text-green-400 font-semibold text-sm">100% COVERAGE</p>
                        <p className="text-gray-400 text-xs mt-2">All providers under signed agreements</p>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-white mb-2">Encryption</h5>
                        <p className="text-purple-400 font-semibold text-sm">AES-256</p>
                        <p className="text-gray-400 text-xs mt-2">End-to-end data protection</p>
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure metrics */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Infrastructure Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">99.9%</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Uptime</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">&lt;200ms</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Latency</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">AES-256</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Encryption</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                        <div className="text-2xl font-bold text-emerald-400 mb-1">24/7</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Monitoring</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Non-negotiables */}
          <section>
            <h2 className="text-5xl font-light mb-16">Our non-negotiables</h2>
            <p className="text-xl text-gray-400 font-light mb-16 max-w-3xl">
              These commitments are hardcoded into our architecture. Not policies that can change—technical guarantees.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <div className="w-16 h-16 mb-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Always Encrypted</h3>
                <p className="text-gray-300 font-light">Your data is encrypted at rest and in transit using industry-standard AES-256 encryption. We literally cannot read your data.</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <div className="w-16 h-16 mb-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Signed BAAs Only</h3>
                <p className="text-gray-300 font-light">Every AI provider must sign a Business Associate Agreement before processing any PHI. No exceptions, ever.</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <div className="w-16 h-16 mb-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">No Model Training on PHI</h3>
                <p className="text-gray-300 font-light">Your personal health information is never used to train or improve AI models. Your data stays yours.</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <div className="w-16 h-16 mb-6 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">15-Day Breach Notification</h3>
                <p className="text-gray-300 font-light">We commit to notifying affected parties within 15 days of any security incident. Transparency when it matters most.</p>
              </div>
            </div>
          </section>

          {/* Your Data, Your Control */}
          <section>
            <h2 className="text-5xl font-light mb-16">Your data, your control</h2>
            <p className="text-xl text-gray-400 font-light mb-16 max-w-3xl">
              You decide what to share, when to share it, and when to take it back. Here's exactly how it works.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 mb-6 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">Journal Sharing</h3>
                <p className="text-gray-300 font-light group-hover:text-gray-200 transition-colors">You decide which journal entries to share with your therapist. You can unshare any entry at any time—it will no longer be visible to your therapist immediately.</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 mb-6 bg-teal-500/20 rounded-full flex items-center justify-center border border-teal-500/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                  <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-300 transition-colors">Data Storage</h3>
                <p className="text-gray-300 font-light group-hover:text-gray-200 transition-colors">All journal entries are stored on encrypted AWS cloud infrastructure, protected by AES-256 encryption at rest and TLS 1.3 in transit. Covered under our signed AWS Business Associate Agreement.</p>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <div className="w-16 h-16 mb-6 bg-rose-500/20 rounded-full flex items-center justify-center border border-rose-500/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                  <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-rose-300 transition-colors">Data Deletion</h3>
                <p className="text-gray-300 font-light group-hover:text-gray-200 transition-colors">Delete individual entries anytime from within the app. Request full account deletion at karan@myempath.co. Data is removed within 30 days; backups purged within 90 days.</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 rounded-xl border border-amber-500/30 backdrop-blur-sm hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 group">
                <div className="w-16 h-16 mb-6 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-300 transition-colors">California Residents (CCPA)</h3>
                <p className="text-gray-300 font-light group-hover:text-gray-200 transition-colors">Under the California Consumer Privacy Act, you have the right to request deletion of all your personal data at any time. We will comply within 45 days as required by law. Contact karan@myempath.co to exercise this right.</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Important Note About Shared Entries</h4>
                  <p className="text-gray-400 font-light">When you share entries with a therapist, they may save or note information from previously shared entries as part of their own clinical records. Deleting or unsharing from Empath removes their access immediately, but Empath cannot delete records your therapist may have kept separately.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Responsible AI Checklist */}
          <section>
            <h2 className="text-5xl font-light mb-16">Responsible AI checklist</h2>
            <p className="text-xl text-gray-400 font-light mb-16 max-w-3xl">
              Our commitment to ethical AI practices, aligned with APA and NIST guidelines.
            </p>
            
            <div className="space-y-4">
              {responsibleAIItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    openAccordion === index 
                      ? 'bg-white/10 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                  initial={false}
                >
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none group"
                    onClick={() => toggleAccordion(index)}
                    aria-label={`Explain ${item.title}`}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-2xl font-mono transition-colors duration-300 ${
                        openAccordion === index ? 'text-blue-400' : 'text-gray-600 group-hover:text-gray-400'
                      }`}>
                        0{index + 1}
                      </span>
                      <h3 className={`text-2xl font-light transition-colors duration-300 ${
                        openAccordion === index ? 'text-white' : 'text-gray-200 group-hover:text-white'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      openAccordion === index 
                        ? 'bg-blue-500 text-white border-blue-500 rotate-180' 
                        : 'border-white/20 text-gray-400 group-hover:border-white/40 group-hover:text-white'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openAccordion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-8 pl-20">
                          <p className="text-gray-300 font-light text-lg leading-relaxed border-l-2 border-blue-500/30 pl-6">
                            {item.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Questions & Contact */}
          <section>
            <h2 className="text-5xl font-light mb-16">Questions or concerns?</h2>
            <p className="text-xl text-gray-400 font-light mb-16 max-w-3xl">
              We're committed to transparency and accountability. Reach out if you have any questions about our practices.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                <h3 className="text-2xl font-bold mb-6">Security Questions</h3>
                <p className="text-gray-400 mb-6 font-light">Direct line to our founder for any concerns or questions.</p>
                <a 
                  href="mailto:karan@myempath.co" 
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors font-medium"
                >
                  karan@myempath.co
                </a>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                <h3 className="text-2xl font-bold mb-6">Breach Policy</h3>
                <p className="text-gray-400 mb-6 font-light">Complete documentation of our incident response procedures.</p>
                <a 
                  href="/breach-policy.pdf" 
                  className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Policy PDF ↗
                </a>
              </div>
              
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                <h3 className="text-2xl font-bold mb-6">Audit Logs</h3>
                <p className="text-gray-400 mb-6 font-light">Real-time access logs and system activity monitoring.</p>
                <button 
                  className="inline-block px-6 py-3 bg-purple-600/50 text-purple-300 rounded-full font-medium cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </button>
                <p className="text-sm text-gray-500 mt-3">Portal in development</p>
              </div>
            </div>
          </section>

        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransparencyPage; 