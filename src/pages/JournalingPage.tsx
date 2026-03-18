import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Shield, 
  Phone, 
  Smartphone, 
  MessageSquare, 
  Zap, 
  ChevronDown, 
  Star, 
  TrendingUp, 
  Camera,
  Mic,
  Brain,
  Heart,
  Activity,
  Calendar,
  Sparkles,
  Lock,
  Download,
  BarChart3,
  FileText,
  Image as ImageIcon,
  MessageCircle
} from 'lucide-react';
import logo from '../../public/empath-logo.png';
import img1 from '../media/IMG_4014.jpg';
import img2 from '../media/IMG_4016.jpg';
import img3 from '../media/IMG_4017.jpg';
import img4 from '../media/Simulator Screenshot - iPhone 17 Pro - 2026-03-15 at 22.59.06.png';
import img5 from '../media/simulator_screenshot_A6B0AF54-EEF6-4CFC-803F-3153AD369F5C.png';
import toast, { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// FAQ Accordion Item Component
const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-stone-200 last:border-b-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left text-lg font-bold text-stone-900 hover:text-[#1b8af1] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-stone-900 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-stone-600 leading-relaxed font-medium">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

export default function JournalingPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const PHONE_MAIN = '+18883663082';
  const APP_STORE_URL = 'https://apps.apple.com/us/app/myempath/id6472873287';

  useEffect(() => {
    posthog.capture('journaling_page_viewed');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.6;
      setShowFloatingCTA(scrollPosition > heroHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAppStoreClick = () => {
    posthog.capture('journaling_page_app_store_clicked');
    window.open(APP_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-grow bg-[#FAF9F6] text-stone-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      <Toaster position="top-center" />
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- HEADER --- */}
      <div className="bg-[#FAF9F6]/90 backdrop-blur-sm border-b-2 border-stone-200 py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-0">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="Empath Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-stone-900 tracking-tight hidden sm:block text-lg">Empath</span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block">Features</a>
            <a href="#how-it-works" className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block">How It Works</a>
            <a href="#faq" className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block">FAQ</a>
            <Link to="/app/blog" className="text-sm font-bold text-stone-600 hover:text-[#1b8af1] transition-colors hidden md:block">Blog</Link>
            <button
              onClick={handleAppStoreClick}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg font-bold text-sm hover:bg-[#1b8af1] transition-colors border-2 border-stone-900"
            >
              Download
            </button>
          </nav>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <motion.section 
        className="relative pt-24 pb-32 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black tracking-tighter text-stone-900 mb-8 leading-[0.95] font-serif">
            Your Mind, <br/>
            <span className="relative inline-block px-4">
              <span className="absolute inset-0 bg-[#1b8af1] -rotate-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"></span>
              <span className="relative text-white">Understood.</span>
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            The AI journaling assistant that captures every thought, analyzes your patterns, and helps you understand yourself better.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col items-center gap-4 mb-16 max-w-md mx-auto">
            <button
              onClick={handleAppStoreClick}
              className="w-full px-8 py-5 bg-stone-900 text-white rounded-xl font-bold text-lg border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1b8af1] transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              Download on App Store
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            
            <div className="flex items-center gap-4 w-full">
              <a
                href={`tel:${PHONE_MAIN}`}
                className="flex-1 px-6 py-4 bg-white text-stone-900 rounded-xl border-2 border-stone-200 hover:border-blue-500 hover:text-[#1b8af1] hover:bg-blue-50 transition-all duration-200 font-bold flex items-center justify-center shadow-sm gap-2"
                onClick={() => posthog.capture('journaling_page_call_clicked')}
              >
                <Phone className="w-4 h-4" /> Call to Journal
              </a>
              <a
                href={`sms:${PHONE_MAIN}`}
                className="flex-1 px-6 py-4 bg-white text-stone-900 rounded-xl border-2 border-stone-200 hover:border-blue-500 hover:text-[#1b8af1] hover:bg-blue-50 transition-all duration-200 font-bold flex items-center justify-center shadow-sm gap-2"
                onClick={() => posthog.capture('journaling_page_text_clicked')}
              >
                <MessageSquare className="w-4 h-4" /> Text to Journal
              </a>
            </div>
            
            <p className="text-sm text-stone-500 text-center flex items-center gap-2 font-medium">
              <CheckCircle className="w-4 h-4 text-[#1b8af1]" /> Free to download • No credit card required
            </p>
          </motion.div>

          {/* App Screenshots */}
          <motion.div variants={fadeIn} className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {[img1, img2, img3, img4, img5].map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:scale-105 transition-all">
                  <img src={img} alt={`App screenshot ${i + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- TRUST BADGES --- */}
      <section className="py-8 bg-white border-b-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-stone-700">
              <Shield className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">HIPAA Secure</span>
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <Brain className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">AI-Powered Insights</span>
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center gap-2 text-stone-700">
              <Star className="w-5 h-5 text-[#1b8af1]" />
              <span className="font-bold text-sm">Loved by Thousands</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 1: CALL TO JOURNAL --- */}
      <section id="features" className="py-24 bg-[#FAF9F6] scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-800 border-2 border-purple-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_#9333ea]">
                    <Mic className="w-4 h-4" /> Voice Journaling
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                    Just Call & Talk
                  </h2>
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed font-medium">
                    Your AI journaling assistant is always ready. Call or text Empath anytime to capture thoughts, feelings, or moments. No typing required.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-purple-200">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-900 mb-1">AI Transcription</h3>
                        <p className="text-stone-600 text-sm font-medium">Perfect accuracy. Your words, captured exactly as you say them.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-blue-200">
                        <Camera className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-900 mb-1">Photos & Images</h3>
                        <p className="text-stone-600 text-sm font-medium">Send photos via text. We'll analyze and understand them automatically.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-green-200">
                        <ImageIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-900 mb-1">Image Transcription</h3>
                        <p className="text-stone-600 text-sm font-medium">Text in images? We'll read and extract it for you.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={`tel:${PHONE_MAIN}`}
                      className="flex-1 px-6 py-4 bg-stone-900 text-white rounded-xl border-2 border-stone-900 hover:bg-[#1b8af1] transition-all font-bold flex items-center justify-center shadow-[4px_4px_0px_0px_#1b8af1] hover:shadow-[2px_2px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] gap-2"
                      onClick={() => posthog.capture('feature_call_clicked')}
                    >
                      <Phone className="w-5 h-5" /> Call Now
                    </a>
                    <a
                      href={`sms:${PHONE_MAIN}`}
                      className="flex-1 px-6 py-4 bg-white text-stone-900 rounded-xl border-2 border-stone-900 hover:bg-blue-50 hover:border-[#1b8af1] transition-all font-bold flex items-center justify-center gap-2"
                      onClick={() => posthog.capture('feature_text_clicked')}
                    >
                      <MessageSquare className="w-5 h-5" /> Text Now
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-8 border-2 border-stone-200">
                    <div className="bg-white rounded-lg p-6 mb-4 border-2 border-stone-900 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#1b8af1] rounded-full flex items-center justify-center">
                          <Mic className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-stone-900">Voice Journal</p>
                          <p className="text-xs text-stone-500">2 minutes ago</p>
                        </div>
                      </div>
                      <p className="text-stone-700 text-sm leading-relaxed italic">
                        "Just had an amazing breakthrough in therapy today. I finally understand why I've been avoiding those difficult conversations..."
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-stone-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4 text-blue-600" />
                        <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Photo Analysis</p>
                      </div>
                      <div className="bg-stone-100 rounded h-32 mb-2 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-stone-300" />
                      </div>
                      <p className="text-xs text-stone-600 font-medium">AI detected: Peaceful outdoor setting, nature walk, sunny day</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 2: MEMORIES & INSIGHTS --- */}
      <section className="py-24 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-800 border-2 border-amber-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#f59e0b]">
                <Sparkles className="w-4 h-4" /> AI Intelligence
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                Remember Everything
              </h2>
              <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                Never lose track of important moments. Our AI organizes and surfaces your memories when you need them most.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 border-2 border-amber-200">
                  <Brain className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Smart Memory Search</h3>
                <p className="text-stone-600 mb-6 leading-relaxed font-medium">
                  Find any moment, any feeling, any insight. Our AI understands context and surfaces exactly what you're looking for.
                </p>
                <ul className="space-y-3">
                  {[
                    'Search by emotion, topic, or date',
                    'AI-powered semantic understanding',
                    'Instant recall of important moments',
                    'Timeline view of your journey'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 border-2 border-purple-200">
                  <Sparkles className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Pattern Recognition</h3>
                <p className="text-stone-600 mb-6 leading-relaxed font-medium">
                  Discover patterns you never noticed. Our AI identifies triggers, cycles, and connections in your experiences.
                </p>
                <ul className="space-y-3">
                  {[
                    'Identify emotional triggers',
                    'Recognize behavioral patterns',
                    'Track progress over time',
                    'Personalized insights & suggestions'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 3: MOOD TRENDS --- */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="bg-white rounded-xl p-6 border-2 border-stone-900 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-stone-900">Mood Trends</h4>
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Last 30 Days</span>
                    </div>
                    
                    {/* Simple visual representation */}
                    <div className="space-y-3 mb-6">
                      {[
                        { label: 'Happy', value: 85, color: 'bg-green-500' },
                        { label: 'Calm', value: 70, color: 'bg-blue-500' },
                        { label: 'Anxious', value: 45, color: 'bg-yellow-500' },
                        { label: 'Sad', value: 20, color: 'bg-purple-500' }
                      ].map((mood, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-stone-600">{mood.label}</span>
                            <span className="text-xs font-bold text-stone-900">{mood.value}%</span>
                          </div>
                          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${mood.color} rounded-full transition-all duration-500`}
                              style={{ width: `${mood.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Insight</span>
                      </div>
                      <p className="text-sm text-blue-800 font-medium">
                        Your mood improves 40% on days you exercise. Consider morning walks!
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 border-2 border-blue-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_#1b8af1]">
                    <BarChart3 className="w-4 h-4" /> Analytics
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                    Track Your Mental Health
                  </h2>
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed font-medium">
                    Beautiful visualizations of your emotional journey. Understand what affects your mood and make informed decisions about your wellbeing.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-stone-900">Daily Mood Tracking</p>
                        <p className="text-sm text-stone-600 font-medium">Automatic sentiment analysis from your journals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-stone-900">Correlation Analysis</p>
                        <p className="text-sm text-stone-600 font-medium">Discover what activities boost your mood</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-stone-900">Long-term Trends</p>
                        <p className="text-sm text-stone-600 font-medium">See your progress over weeks and months</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAppStoreClick}
                    className="px-8 py-4 bg-stone-900 text-white rounded-xl font-bold border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1] hover:shadow-[2px_2px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Start Tracking Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 4: HEALTH TRACKING --- */}
      <section className="py-24 bg-white border-y-2 border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-800 border-2 border-green-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#10b981]">
                <Heart className="w-4 h-4" /> Holistic Health
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                Connect Mind & Body
              </h2>
              <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                Integrate health data from Apple Health to understand how your physical wellbeing affects your mental state.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Activity className="w-7 h-7 text-red-600" />,
                  color: 'red',
                  title: 'Activity & Exercise',
                  desc: 'See how movement impacts your mood and energy levels.',
                  metrics: ['Steps', 'Workouts', 'Active minutes']
                },
                {
                  icon: <Heart className="w-7 h-7 text-pink-600" />,
                  color: 'pink',
                  title: 'Sleep & Recovery',
                  desc: 'Track sleep quality and its effects on your mental clarity.',
                  metrics: ['Sleep duration', 'Sleep quality', 'Heart rate']
                },
                {
                  icon: <Calendar className="w-7 h-7 text-purple-600" />,
                  color: 'purple',
                  title: 'Daily Patterns',
                  desc: 'Discover connections between habits and wellbeing.',
                  metrics: ['Energy levels', 'Stress markers', 'Recovery time']
                }
              ].map((feature, i) => (
                <div key={i} className="bg-[#FAF9F6] p-8 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] hover:shadow-[6px_6px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6 border-2 border-${feature.color}-200`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
                  <p className="text-stone-600 mb-6 font-medium">{feature.desc}</p>
                  <div className="space-y-2">
                    {feature.metrics.map((metric, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
                        <span className="text-sm text-stone-700 font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-stone-900">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 border-2 border-stone-900">
                  <Zap className="w-6 h-6 text-[#1b8af1]" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg mb-2">Automatic Health Insights</h3>
                  <p className="text-stone-600 font-medium">
                    Our AI analyzes your health data alongside your journals to reveal powerful connections. 
                    "Your anxiety decreases 35% on days you sleep 7+ hours" — these insights help you make better choices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 5: AI ASSISTANT --- */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1b8af1] text-white border-2 border-white rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                <Brain className="w-4 h-4" /> AI Powered
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight font-serif">
                Talk to Your Journals
              </h2>
              <p className="text-lg text-stone-300 font-medium max-w-2xl mx-auto">
                Your personal AI companion knows your entire history. Ask questions, gain insights, and get personalized guidance anytime.
              </p>
            </div>

            <div className="bg-[#FAF9F6] rounded-xl p-8 md:p-12 border-2 border-white shadow-[8px_8px_0px_0px_#1b8af1]">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-6">Your AI Companion</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border-2 border-stone-200 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-stone-700 font-medium text-sm italic">
                          "Why do I always feel anxious on Mondays?"
                        </p>
                      </div>
                      <div className="flex items-start gap-3 pl-11">
                        <div className="w-8 h-8 bg-[#1b8af1] rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-stone-900 font-medium text-sm">
                          Based on your journals, you tend to sleep less on Sunday nights and skip breakfast on Monday mornings. This pattern appears in 8 of your last 10 Monday entries.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-stone-200 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-stone-700 font-medium text-sm italic">
                          "What helps me feel better when I'm stressed?"
                        </p>
                      </div>
                      <div className="flex items-start gap-3 pl-11">
                        <div className="w-8 h-8 bg-[#1b8af1] rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-stone-900 font-medium text-sm">
                          Your most effective stress relief: talking to friends (mentioned 23 times), going for walks (18 times), and listening to music (15 times).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-stone-900 text-lg mb-3">Ask Anything</h4>
                      <ul className="space-y-3">
                        {[
                          'Find patterns in your behavior',
                          'Understand your triggers',
                          'Track your progress',
                          'Get personalized suggestions',
                          'Recall specific memories',
                          'Prepare for therapy sessions'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#1b8af1] flex-shrink-0 mt-0.5" />
                            <span className="text-stone-700 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                      <Lock className="w-6 h-6 text-blue-600 mb-3" />
                      <p className="text-sm text-blue-900 font-bold mb-2">100% Private & Secure</p>
                      <p className="text-sm text-blue-800 font-medium">
                        Your conversations are encrypted and never used to train AI models. Your privacy is our priority.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 6: THERAPIST CONNECTION --- */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-800 border-2 border-purple-900 rounded-lg text-xs font-bold uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_#9333ea]">
                <Sparkles className="w-4 h-4" /> Pro Feature
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                Supercharge Your Therapy
              </h2>
              <p className="text-lg text-stone-600 font-medium max-w-2xl mx-auto">
                Connect with your therapist to experience the most in-depth way to share your experiences and unlock deeper insights together.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 md:p-12 rounded-xl border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] mb-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-stone-900 mb-6">Give Your Therapist Access to Your Mind</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed font-medium text-lg">
                    When you connect with your therapist through Empath, they get a complete picture of your week — 
                    not just what you remember to share in session.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-purple-200">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 mb-1">Pre-Session Summaries</h4>
                        <p className="text-stone-600 text-sm font-medium">
                          Your therapist reviews AI-generated summaries before each session. No time wasted on recaps.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-blue-200">
                        <Brain className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 mb-1">Deeper Insights</h4>
                        <p className="text-stone-600 text-sm font-medium">
                          Your therapist spots patterns you might miss and prepares targeted interventions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-green-200">
                        <Zap className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 mb-1">Faster Progress</h4>
                        <p className="text-stone-600 text-sm font-medium">
                          Skip the small talk. Dive straight into meaningful work from minute one.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-xl p-6 border-2 border-stone-900 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Weekly Summary</p>
                        <p className="text-xs text-stone-500">Prepared for your therapist</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-stone-50 rounded p-4 border border-stone-200">
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Mood Overview</p>
                        <p className="text-sm text-stone-700 font-medium">
                          Client experienced increased anxiety mid-week, correlating with work deadlines. 
                          Improved significantly after Friday therapy session.
                        </p>
                      </div>

                      <div className="bg-stone-50 rounded p-4 border border-stone-200">
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Key Moments</p>
                        <ul className="space-y-2">
                          <li className="text-sm text-stone-700 font-medium flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            Tuesday: Breakthrough realization about relationship patterns
                          </li>
                          <li className="text-sm text-stone-700 font-medium flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            Thursday: Practiced new coping strategies successfully
                          </li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded p-4 border-2 border-blue-200">
                        <p className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Suggested Focus</p>
                        <p className="text-sm text-blue-800 font-medium">
                          Explore work-related anxiety patterns and relationship insights from Tuesday.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-stone-900 text-center">
              <h3 className="text-xl font-bold text-stone-900 mb-3">Your Privacy, Your Control</h3>
              <p className="text-stone-600 mb-6 max-w-2xl mx-auto font-medium">
                You choose what to share and when. Connect or disconnect from your therapist at any time. 
                Your data always remains yours.
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  'HIPAA Compliant',
                  'End-to-end Encrypted',
                  'You Control Access',
                  'Disconnect Anytime'
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-stone-700">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 bg-white border-y-2 border-stone-200 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight font-serif">
                Get Started in Minutes
              </h2>
              <p className="text-lg text-stone-600 font-medium">
                No complicated setup. Just download and start journaling.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  icon: <Download className="w-8 h-8 text-white" />,
                  title: 'Download the App',
                  desc: 'Free on the App Store. Set up your account in 30 seconds.'
                },
                {
                  step: '02',
                  icon: <Mic className="w-8 h-8 text-white" />,
                  title: 'Start Journaling',
                  desc: 'Call, text, or use the app. Capture thoughts instantly, anytime.'
                },
                {
                  step: '03',
                  icon: <Sparkles className="w-8 h-8 text-white" />,
                  title: 'Gain Insights',
                  desc: 'Let AI organize your thoughts and reveal patterns automatically.'
                }
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-stone-900 rounded-xl flex items-center justify-center mx-auto mb-6 border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1b8af1]">
                    {step.icon}
                  </div>
                  <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider rounded mb-4">
                    Step {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                  <p className="text-stone-600 font-medium">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button
                onClick={handleAppStoreClick}
                className="inline-flex items-center gap-3 px-8 py-5 bg-stone-900 text-white rounded-xl font-bold text-lg border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1b8af1] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                Download Empath Free
                <span>→</span>
              </button>
              <p className="text-sm text-stone-500 mt-4 font-medium">
                No credit card required • Free forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-stone-900 mb-4 font-serif">What People Are Saying</h2>
            <div className="flex justify-center gap-1 text-[#1b8af1] mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-stone-500 font-medium uppercase tracking-wide text-sm">Featured on the App Store</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "This app has completely changed how I approach therapy. My therapist actually knows what happened in my week now.",
                author: "Alex M.",
                role: "User since 2024"
              },
              {
                quote: "The AI insights are incredible. It spotted patterns I never would have seen on my own.",
                author: "Jordan K.",
                role: "User since 2023"
              },
              {
                quote: "I love that I can just call and talk. It feels so natural, like journaling should have always been this easy.",
                author: "Sam R.",
                role: "User since 2024"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-none border-l-4 border-stone-900 shadow-sm flex flex-col hover:bg-blue-50 hover:border-blue-500 transition-colors">
                <p className="text-stone-700 mb-6 leading-relaxed font-serif text-lg italic flex-grow">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-stone-900">{t.author}</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 bg-white border-t-2 border-stone-200 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-center text-stone-900 mb-12 font-serif">Common Questions</h2>
          <div className="space-y-4">
            <FAQItem 
              question="Is Empath really free?" 
              answer="Yes! Empath is completely free to download and use. All core journaling features, AI transcription, mood tracking, and insights are included at no cost." 
            />
            <FAQItem 
              question="How does the AI work?" 
              answer="Our AI uses advanced natural language processing to transcribe your voice, analyze sentiment, identify patterns, and generate insights. All processing is secure and HIPAA compliant." 
            />
            <FAQItem 
              question="Can I use it without a therapist?" 
              answer="Absolutely! Empath works great as a standalone journaling and self-reflection tool. You can connect with a therapist later if you choose." 
            />
            <FAQItem 
              question="Is my data private and secure?" 
              answer="Yes. All your data is encrypted end-to-end, HIPAA compliant, and never used to train AI models. You control who has access and can delete everything at any time." 
            />
            <FAQItem 
              question="What about Android?" 
              answer="We're currently iOS-only, but you can still journal via phone call or text message from any device! An Android app is in development." 
            />
            <FAQItem 
              question="How do I connect with my therapist?" 
              answer={<>If your therapist uses Empath, they can send you an invite. If not, you can journal privately and share your insights manually, or invite them to join Empath at <a href="/" className="text-[#1b8af1] hover:underline font-bold">empath.com</a>.</>} 
            />
            <FAQItem 
              question="Can I export my journals?" 
              answer="Yes! You can export all your journals, insights, and data at any time. Your data belongs to you, always." 
            />
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-serif">
              Start Understanding Yourself Today
            </h2>
            <p className="text-xl text-stone-300 mb-12 leading-relaxed font-medium">
              Join thousands using Empath to capture thoughts, track patterns, and grow faster.
            </p>
            
            <button
              onClick={handleAppStoreClick}
              className="inline-flex items-center gap-3 px-8 py-5 bg-white text-stone-900 rounded-xl font-bold text-lg border-2 border-white shadow-[6px_6px_0px_0px_#1b8af1] hover:shadow-[4px_4px_0px_0px_#1b8af1] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-6"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              Download Free on App Store
            </button>

            <div className="flex justify-center gap-8 flex-wrap text-sm text-stone-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Free forever
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                30 second setup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#FAF9F6] border-t-2 border-stone-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block p-4 rounded-lg mb-8">
            <img src={logo} alt="Empath" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex justify-center gap-8 text-stone-500 font-bold text-sm mb-8 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link>
            <a href="mailto:support@myempath.co" className="hover:text-stone-900 transition-colors">Support</a>
          </div>
          <p className="text-stone-400 text-xs font-medium">© {new Date().getFullYear()} Reality Articulated Inc.</p>
        </div>
      </footer>

      {/* --- FLOATING CTAs --- */}
      {showFloatingCTA && (
        <>
          {/* Mobile */}
          <motion.div
            initial={{ y: 100 }} 
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-[#FAF9F6] border-t-2 border-stone-200 p-4 z-40 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
          >
            <button
              onClick={handleAppStoreClick}
              className="w-full py-3 bg-stone-900 text-white rounded-lg font-bold shadow-lg border-2 border-stone-900"
            >
              Download Free
            </button>
          </motion.div>

          {/* Desktop */}
          <motion.div
            initial={{ y: -100 }} 
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 bg-[#FAF9F6]/90 backdrop-blur-md border-b-2 border-stone-200 p-4 z-50 hidden md:flex justify-between items-center shadow-sm"
          >
            <div className="flex items-center gap-0 container mx-auto px-4">
              <Link to="/" className="flex items-center gap-0">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src={logo} alt="Empath Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-stone-900 text-lg">Empath</span>
              </Link>
              <div className="flex-grow"></div>
              <button
                onClick={handleAppStoreClick}
                className="px-6 py-2 bg-stone-900 text-white rounded-lg font-bold shadow hover:bg-[#1b8af1] transition border-2 border-stone-900"
              >
                Download Free
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
