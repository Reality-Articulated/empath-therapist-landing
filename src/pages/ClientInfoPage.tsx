import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Clock, Phone, Smartphone, MessageSquare, Lock, Zap, ChevronDown, Star, DollarSign, TrendingUp } from 'lucide-react';
import logo from '../../public/empath-logo.png';
import toast, { Toaster } from 'react-hot-toast';
import posthog from 'posthog-js';
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { Link } from 'react-router-dom';

// Declare YouTube API types
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    twq?: (...args: any[]) => void;
  }
}

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
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left text-lg font-medium text-slate-900 hover:text-slate-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-slate-600 leading-relaxed">
        {answer}
      </div>
      </motion.div>
    </div>
  );
};

const ValueCalculator = () => {
  const [sessionCost, setSessionCost] = useState(175);
  const percentage = 0.25;
  const recoveredPerSession = Math.round(sessionCost * percentage);
  const recoveredPerYear = Math.round(recoveredPerSession * 48); // 48 weeks

  return (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6">
                <DollarSign className="w-4 h-4" /> ROI Calculator
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Calculate Your Hidden Savings</h2>
             <p className="text-lg text-slate-600 mb-12">
                Empath eliminates the "catch-up" phase of therapy. So every moment in the session brings you closer to your next breakthrough.
             </p>

             <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10">
                <div className="mb-10">
                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Your Cost Per Session</label>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="text-2xl text-slate-400">$50</span>
                        <input 
                            type="range" 
                            min="50" 
                            max="350" 
                            step="5" 
                            value={sessionCost} 
                            onChange={(e) => setSessionCost(Number(e.target.value))}
                            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <span className="text-2xl text-slate-400">$350+</span>
                    </div>
                    <div className="text-5xl font-bold text-slate-900">${sessionCost}</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center justify-center gap-2 text-blue-800 font-bold mb-2">
                             <Clock className="w-5 h-5" /> Saved Per Session
                        </div>
                        <div className="text-3xl font-bold text-blue-600">${recoveredPerSession}</div>
                        <p className="text-sm text-blue-600/80 mt-2">Value unlocked per hour</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                        <div className="flex items-center justify-center gap-2 text-green-800 font-bold mb-2">
                             <TrendingUp className="w-5 h-5" /> Yearly Value
                        </div>
                         <div className="text-3xl font-bold text-green-600">${recoveredPerYear.toLocaleString()}</div>
                         <p className="text-sm text-green-600/80 mt-2">Worth of reclaimed time</p>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100">
                     <p className="text-slate-500 text-sm">
                        *Based on eliminating the 15 minutes (25%) typically spent summarizing the past week.
                     </p>
                </div>
             </div>
        </div>
    </section>
  );
};

export default function ClientInfoPage() {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [therapistEmail, setTherapistEmail] = useState('');
  const [inviteSubmitted, setInviteSubmitted] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [noTherapist, setNoTherapist] = useState(false);
  const [signUpUrl, setSignUpUrl] = useState<string | null>(null);
  const [therapistName, setTherapistName] = useState<string | null>(null);
  const [showFlowModal, setShowFlowModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  
  // Constants
  const PHONE_MAIN = '+18883663082';
  const PHONE_MAIN_DISPLAY = '(888) 366-3082';
  
  // Initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const signUpToken = params.get('signUpToken');
      const token = params.get('token');
      const therapistNameParam = params.get('therapistName');
      
      if (signUpToken && token) {
        setSignUpUrl(`https://empath-793bdf3d3ee1.herokuapp.com/sign-up-client/${signUpToken}/${token}`);
        
        // Identify invited user in PostHog
        posthog.identify(token, {
          signUpToken: signUpToken,
          therapistName: therapistNameParam ? decodeURIComponent(therapistNameParam) : null,
          userType: 'invited_client',
          inviteUrl: window.location.href,
          invitedAt: new Date().toISOString()
        });
        
        posthog.capture('invited_client_page_viewed', {
          signUpToken: signUpToken,
          token: token,
          therapistName: therapistNameParam ? decodeURIComponent(therapistNameParam) : null
        });
      } else {
        setSignUpUrl(null);
      }
      setTherapistName(therapistNameParam ? decodeURIComponent(therapistNameParam) : null);
    }
    posthog.capture('client_info_page_viewed');
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.6;
      setShowFloatingCTA(scrollPosition > heroHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // YouTube API
  useEffect(() => {
    if (!document.getElementById('youtube-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {};
      const handleMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange') {
            setIsPlaying(data.info === 1);
          }
        } catch (e) {}
      };
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

  // Invite Logic
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    setInviteSubmitted(false);
    
    // PostHog Variant (Keeping simplified logic for continuity)
    const variantRaw = posthog.getFeatureFlag('client-info-copy-experiment');
    const variant = typeof variantRaw === 'string' ? variantRaw : 'control';
    
    posthog.capture('invite_form_submitted', { 
      user_email: userEmail, 
      therapist_email: therapistEmail, 
      no_therapist: noTherapist,
      variant 
    });
    
    if (!userEmail) {
      setInviteError('Please enter your email.');
      return;
    }
    if (!noTherapist && !therapistEmail) {
      setInviteError('Please enter your therapist\'s email.');
      return;
    }

    try {
      const response = await fetch('/api/client-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          therapistEmail: noTherapist ? null : therapistEmail,
          noTherapist,
          variant,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      toast.success('Request sent! We will be in touch shortly.');
      if (window.twq) {
        window.twq('event', 'tw-onbx0-onbx0', {
          user_email: userEmail,
          therapist_email: noTherapist ? 'No therapist' : therapistEmail,
          no_therapist: noTherapist ? 'Yes' : 'No',
          variant
        });
      }
      setInviteSubmitted(true);
      setUserEmail('');
      setTherapistEmail('');
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
      setInviteError('Something went wrong. Please try again.');
    }
  };

  const isInvited = !!signUpUrl;
  
  const variantRaw = useFeatureFlagVariantKey('client-info-copy-experiment');
  const variant = typeof variantRaw === 'string' ? variantRaw : 'control';

  return (
    <div className="flex-grow bg-white text-slate-900 font-sans selection:bg-blue-100">
            <Toaster position="top-center" />

      {/* --- HEADER / TRUST BAR --- */}
      <div className="bg-slate-50 border-b border-slate-200 py-2 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Empath Logo" className="w-8 h-8" />
            <span className="font-semibold text-slate-900 tracking-tight hidden sm:block">Empath</span>
                </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" /> HIPAA Compliant</span>
            <span className="hidden sm:flex items-center gap-1"><Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" /> Trusted by Therapists</span>
                </div>
              </div>
                  </div>
                  
      {/* --- HERO SECTION --- */}
      <motion.section 
        className="relative pt-16 pb-20 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center max-w-4xl">
          {isInvited && therapistName && (
            <motion.div variants={fadeIn} className="inline-block mb-6 px-4 py-1.5 bg-blue-50 text-blue-800 rounded-full text-sm font-semibold border border-blue-100">
              👋 {therapistName} invited you to Empath
            </motion.div>
          )}

          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Your Therapist Is Missing <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">95% Of Your Life.</span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Most of life happens outside the session. Give your therapist the full map of your life so they can help you navigate better.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col items-center gap-4 mb-12 max-w-md mx-auto">
            {isInvited ? (
              <>
                <button
                  className="w-full px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={() => {
                    setShowFlowModal(true);
                    posthog.capture('hero_primary_cta_clicked', { variant, isInvited: true });
                  }}
                >
                  {therapistName ? `Connect With ${therapistName}` : 'Connect With Therapist'} →
                </button>
                <p className="text-sm text-slate-500 text-center">
                  Your therapist invited you • Setup takes 30 seconds
                </p>
              </>
            ) : (
              <>
                <button
                  className="w-full px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={() => {
                    setShowInviteModal(true);
                    posthog.capture('hero_primary_cta_clicked', { variant, isInvited: false });
                  }}
                >
                  Use with Therapist →
                </button>
                
                <div className="flex items-center gap-4 w-full">
                  <a
                    href={`tel:${PHONE_MAIN}`}
                    className="flex-1 px-8 py-4 bg-white text-slate-900 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-medium flex items-center justify-center shadow-sm"
                    onClick={() => {
                      posthog.capture('hero_call_clicked', { variant });
                    }}
                  >
                    📞 Call to journal
                  </a>
                  <a
                    href={`sms:${PHONE_MAIN}`}
                    className="flex-1 px-8 py-4 bg-white text-slate-900 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 font-medium flex items-center justify-center shadow-sm"
                    onClick={() => {
                      posthog.capture('hero_text_clicked', { variant });
                    }}
                  >
                    💬 Text to journal
                  </a>
                </div>
                
                <p className="text-sm text-slate-500 text-center">
                  No app download required to journal
                </p>
              </>
            )}
          </motion.div>
            </div>
      </motion.section>

      {/* --- THE PROBLEM (Visual) --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <h3 className="text-red-600 font-bold uppercase tracking-wider text-sm mb-2">The Old Way</h3>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">The "Missed Moments"</h4>
                  <p className="text-slate-600 mb-6">
                    You have a breakthrough in the shower on Wednesday. A panic attack on Friday. A fight with your partner on Sunday.
                  </p>
                  <p className="text-slate-600 mb-6 font-medium">
                    By Tuesday at 2 PM? You've forgotten 90% of the context.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-red-800 italic">
                      "So... how was your week?"
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      (You spend 20 mins summarizing instead of working)
                    </p>
          </div>
        </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-200 relative overflow-hidden transform md:scale-105 z-10">
                   <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                   <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-bl-lg">NEW WAY</div>
                   <h3 className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">With Empath</h3>
                   <h4 className="text-2xl font-bold text-slate-900 mb-4">The "Full Picture"</h4>
                   <p className="text-slate-600 mb-6">
                     Something happens. You send a voice note or text to Empath instantly. 
                   </p>
                   <p className="text-slate-600 mb-6 font-medium">
                     We organize these moments into a summary for your therapist.
                   </p>
                   <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                     <p className="text-blue-800 italic">
                       "I know you had a fight with your partner on Sunday. Let's dive straight into that trigger."
                     </p>
                     <p className="text-slate-500 text-sm mt-2">
                       (You start working on deep issues at Minute 1)
                     </p>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </section>

      {/* --- VALUE CALCULATOR --- */}
      <ValueCalculator />

      {/* --- HOW IT WORKS (3 Steps) --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Smartphone className="w-8 h-8 text-white" />,
                color: "bg-blue-600",
                title: "1. Capture The Moment",
                desc: "Feeling anxious? Had a win? Just journal using the app or text/call Empath so the moment does not get lost."
              },
              {
                icon: <Zap className="w-8 h-8 text-white" />,
                color: "bg-violet-600",
                title: "2. Empath Organizes It",
                desc: "We organize your scattered thoughts into clear summary for your therapist."
              },
              {
                icon: <Lock className="w-8 h-8 text-white" />,
                color: "bg-emerald-600",
                title: "3. Therapist Receives It",
                desc: "Your therapist gets a secure summary before your session. They're fully prepared when you walk in."
              }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className={`w-16 h-16 mx-auto ${step.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
            </div>
          
          {/* Video Embed */}
          <div className="mt-20 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video relative">
             {!isPlaying ? (
                <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center cursor-pointer group"
                  onClick={() => {
                    const iframe = document.getElementById('explainerVideo') as HTMLIFrameElement;
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                      setIsPlaying(true);
                      posthog.capture('explainer_video_played');
                    }
                     }}>
                   <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white/20">
                     <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                   <p className="text-white mt-4 font-medium opacity-80">Watch 2 Minute Demo</p>
                </div>
             ) : null}
             <iframe 
                id="explainerVideo"
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/qkCoQ4t7HsQ?enablejsapi=1&controls=1&rel=0&modestbranding=1" 
                title="Empath Demo"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
             ></iframe>
              </div>
            </div>
      </section>

      {/* --- THE OFFER STACK (Grand Slam) --- */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Upgrade Your Therapy For Free</h2>
            <p className="text-xl text-slate-300">
              Your therapist has already covered the cost. You get the premium experience.
            </p>
                </div>
                
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-8">Everything You Get:</h3>
                
                <ul className="space-y-5">
                  {[
                    "Unlimited Voice & Text Journaling",
                    "Secure HIPAA-Compliant Vault",
                    "AI-Powered Clinical Summaries",
                    "Direct Integration with Your Therapist",
                    "Mobile App (iOS) + SMS/Phone Access"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                      <span className="text-lg font-medium text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
            </div>

              <div className="flex flex-col justify-center items-center text-center md:border-l md:border-white/10 md:pl-12">
                <p className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-2">YOUR COST</p>
                <div className="text-6xl font-bold text-white mb-4">$0</div>
                <p className="text-slate-300 text-sm mb-8">(Covered by your therapist)</p>
                
              <button
                  className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                onClick={() => {
                  if (isInvited) {
                    setShowFlowModal(true);
                      posthog.capture('offer_stack_cta_clicked', { variant, isInvited: true });
                  } else {
                    setShowInviteModal(true);
                      posthog.capture('offer_stack_cta_clicked', { variant, isInvited: false });
                  }
                }}
              >
                  {isInvited ? 'Accept Invitation' : 'Get Access Now'}
              </button>
                <p className="mt-4 text-xs text-slate-500">No credit card required. Setup takes 30 seconds.</p>
        </div>
                      </div>
                    </div>
                    </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Don't Just Take Our Word For It</h2>
           <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  quote: "I realized Instagram knew me better than my therapist. Empath fixed that. Now my therapist sees the real me.",
                  author: "Sarah M.",
                  role: "Empath User"
                },
                {
                  quote: "I used to spend half the session remembering what happened. Now we dive deep in the first 5 minutes.",
                  author: "James K.",
                  role: "Empath User"
                },
                {
                  quote: "Finally, a way to capture my anxiety spiraling at 2 AM without waking anyone up. My therapist gets the full picture.",
                  author: "Elena R.",
                  role: "Empath User"
                }
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-slate-900">{t.author}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{t.role}</p>
                    </div>
                    </div>
              ))}
                  </div>
                </div>
      </section>

      {/* --- FAQ / OBJECTIONS --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Questions? We've Got Answers.</h2>
          <div className="space-y-2">
            <FAQItem 
              question="Does this replace my therapy?" 
              answer="Not at all. Empath is a tool that makes your existing therapy better. Think of it like upgrading from a flip phone to a smartphone—same function (communication), but much more powerful." 
            />
            <FAQItem 
              question="Is my data secure?" 
              answer="Yes. We are fully HIPAA compliant. Your data is encrypted at rest and in transit. We hold ourselves to the same standards as your doctor or bank." 
            />
            <FAQItem 
              question="Do I need to download an app?" 
              answer="No! You can start by simply texting or calling our secure line. If you have an iPhone, we do have a great app, but it's optional." 
            />
            <FAQItem 
              question="Will my therapist be annoyed?" 
              answer="Your therapist invited you because they WANT this. They want to understand you better and help you faster. This makes their job easier." 
            />
                      </div>
                    </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <img src={logo} alt="Empath" className="w-12 h-12 mx-auto mb-6 opacity-50 grayscale" />
          <div className="flex justify-center gap-6 text-slate-500 text-sm mb-8">
            <Link to="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900">Terms of Service</Link>
            <a href="mailto:support@myempath.co" className="hover:text-slate-900">Contact Support</a>
                      </div>
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Reality Articulated Inc.</p>
                    </div>
      </footer>

      {/* --- MODALS (Retained Functionality) --- */}

      {/* Invite Modal (For uninvited users) */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
          >
                <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
                </button>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">Get Early Access</h3>
            <p className="text-slate-600 mb-6">Connect with your therapist to start using Empath.</p>

            {inviteSubmitted ? (
              <div className="text-center py-8 bg-green-50 rounded-xl">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">Request Sent!</h4>
                <p className="text-slate-600 text-sm">We'll contact your therapist.</p>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="you@example.com"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                  />
              </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Therapist's Email</label>
                  <input
                    type="email"
                    required={!noTherapist}
                    disabled={noTherapist}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-slate-100 disabled:text-slate-400"
                    placeholder="therapist@example.com"
                    value={therapistEmail}
                    onChange={e => setTherapistEmail(e.target.value)}
                  />
              </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="noTherapist"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    checked={noTherapist}
                    onChange={e => {
                      setNoTherapist(e.target.checked);
                      if(e.target.checked) setTherapistEmail('');
                    }}
                  />
                  <label htmlFor="noTherapist" className="ml-2 text-sm text-slate-600">
                    I don't have a therapist right now
                  </label>
          </div>
          
                {inviteError && <p className="text-red-500 text-sm">{inviteError}</p>}

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                >
                  Request Access
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Flow Modal (For Invited Users / Next Steps) */}
      {showFlowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
          >
            <button 
              onClick={() => setShowFlowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-slate-900 mb-6">One Last Step</h3>
            
            <ol className="space-y-4 mb-8 relative border-l-2 border-slate-100 ml-3 pl-8">
              <li className="relative">
                <span className="absolute -left-[39px] w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                <h4 className="font-bold text-slate-900">Create your secure account</h4>
                <p className="text-sm text-slate-500">We'll link you to {therapistName || 'your therapist'}.</p>
              </li>
              <li className="relative">
                <span className="absolute -left-[39px] w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-sm font-bold">2</span>
                <h4 className="font-bold text-slate-900">Start journaling</h4>
                <p className="text-sm text-slate-500">Download the app or just use SMS/Phone.</p>
              </li>
            </ol>

            <button
              onClick={() => {
                if (signUpUrl) {
                  window.open(signUpUrl, '_blank', 'noopener,noreferrer');
                  posthog.capture('signup_redirect_initiated', { variant });
                  setShowFlowModal(false);
                } else {
                  setShowInviteModal(true);
                  setShowFlowModal(false);
                }
              }}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Continue to Secure Sign Up →
            </button>
          </motion.div>
        </div>
      )}

      {/* Call to Journal Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative text-center"
          >
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
            
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">Journal Instantly</h3>
            <p className="text-slate-600 mb-8">No app needed. Just call or text our secure line to start.</p>

            <div className="grid grid-cols-2 gap-4">
                <a
                  href={`tel:${PHONE_MAIN}`}
                className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                onClick={() => posthog.capture('call_modal_call_clicked')}
              >
                <Phone className="w-8 h-8 text-slate-700 group-hover:text-blue-600 mb-3" />
                <span className="font-bold text-slate-900">Call Now</span>
                </a>
                <a
                  href={`sms:${PHONE_MAIN}`}
                className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                onClick={() => posthog.capture('call_modal_text_clicked')}
              >
                <MessageSquare className="w-8 h-8 text-slate-700 group-hover:text-blue-600 mb-3" />
                <span className="font-bold text-slate-900">Text Now</span>
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400">
                    If you don't have an account, we'll create one for you automatically using your phone number.
                </p>
        </div>
          </motion.div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      {showFloatingCTA && (
        <motion.div
            initial={{ y: 100 }} 
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        >
                <button
                className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold shadow-lg"
                  onClick={() => {
                    if (isInvited) {
                        setShowFlowModal(true);
                    } else {
                    setShowInviteModal(true);
                    }
                  }}
                >
                {isInvited ? 'Accept Invitation' : 'Get Started Free'}
                </button>
        </motion.div>
      )}

       {/* Floating Desktop CTA */}
      {showFloatingCTA && (
        <motion.div
            initial={{ y: -100 }} 
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 z-50 hidden md:flex justify-between items-center shadow-sm"
        >
            <div className="flex items-center gap-3 container mx-auto px-4">
                <img src={logo} className="w-8 h-8" alt="Logo" />
                <span className="font-bold text-slate-900">Empath</span>
                <div className="flex-grow"></div>
              <button
                    className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold shadow hover:bg-slate-800 transition"
                onClick={() => {
                        if (isInvited) {
                  setShowFlowModal(true);
                        } else {
                            setShowInviteModal(true);
                        }
                }}
              >
                    {isInvited ? 'Accept Invitation' : 'Get Started Free'}
              </button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 

